#!/usr/bin/env node
'use strict';
// Read-only inspection of the PUBLIC repository's real GitHub-rendered pages.
// No authentication, write operations, or local preview is used by this audit.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const cp = require('node:child_process');
const { chromium } = require('playwright');
const root = path.resolve(__dirname, '..');
const repo = 'GoGoKo699/Quantum-Permutation-Noise-Limits';
const revision = process.env.SOURCE_SHA || cp.execFileSync('git', ['rev-parse', 'HEAD'], {cwd: root, encoding: 'utf8'}).trim();
if (!/^[a-f0-9]{40}$/.test(revision)) throw new Error('A full source commit SHA is required');
const out = path.resolve(process.env.AUDIT_OUTPUT || path.join(root, 'hosted-math-audit'));
fs.mkdirSync(out, {recursive: true});
const tracked = cp.execFileSync('git', ['ls-files', '*.md'], {cwd: root, encoding: 'utf8'}).trim().split('\n').filter(Boolean);
const selected = process.env.AUDIT_PAGES ? process.env.AUDIT_PAGES.split(',') : tracked;
for (const p of selected) if (!tracked.includes(p)) throw new Error('Untracked audit page: ' + p);
const report = {repository: repo, revision, observed_at_utc: new Date().toISOString(), mode: 'real-github-browser', pages: []};

function expressions(source) {
  const values = [];
  const stripped = source.replace(/^```math[^\n]*\n([\s\S]*?)^```[ \t]*$/gm, (block, tex, offset) => {
    values.push({kind: 'display', tex: tex.trim(), line: source.slice(0, offset).split('\n').length});
    return '\n'.repeat(block.split('\n').length - 1);
  });
  for (const match of stripped.matchAll(/\$`([^`\n]+)`\$|(?<![\\$])\$([^$\n]+?)(?<!\\)\$(?!\$)/g)) {
    values.push({kind: 'inline', tex: match[1] || match[2], line: stripped.slice(0, match.index).split('\n').length});
  }
  return values;
}

(async () => {
  const browser = await chromium.launch({headless: true});
  const context = await browser.newContext({viewport: {width: 1440, height: 1000}, deviceScaleFactor: 1, colorScheme: 'light'});
  try {
    for (const file of selected) {
      const source = fs.readFileSync(path.join(root, file), 'utf8');
      const safe = file.replace(/[^A-Za-z0-9_.-]/g, '__');
      const page = await context.newPage();
      const entry = {path: file, url: `https://github.com/${repo}/blob/${revision}/${file}`, source_sha256: crypto.createHash('sha256').update(source).digest('hex'), expected: expressions(source), errors: []};
      page.on('pageerror', err => entry.errors.push(String(err).slice(0, 500)));
      try {
        const response = await page.goto(entry.url, {waitUntil: 'domcontentloaded', timeout: 60000});
        entry.http_status = response && response.status();
        if (!response || response.status() !== 200) throw new Error('GitHub HTTP ' + entry.http_status);
        const article = page.locator('article.markdown-body').first();
        await article.waitFor({state: 'visible', timeout: 30000});
        // Trigger all lazy mathematics, then wait for delayed iframe/MathJax work.
        await page.evaluate(async () => {
          for (let y = 0; y < document.body.scrollHeight; y += 900) {window.scrollTo(0, y); await new Promise(r => setTimeout(r, 80));}
          window.scrollTo(0, 0);
        });
        await page.waitForTimeout(2500);
        entry.article_text = await article.innerText();
        fs.writeFileSync(path.join(out, safe + '.html'), await article.innerHTML());
        entry.frames = [];
        for (const frame of page.frames()) {
          try {
            const data = await frame.evaluate(() => {
              const body = document.querySelector('article.markdown-body') || document.body;
              const all = [];
              function visit(root) {for (const e of root.querySelectorAll('*')) {all.push(e); if(e.shadowRoot) visit(e.shadowRoot);}}
              visit(body);
              const math = all.filter(e => /^(MATH-RENDERER|MJX-CONTAINER|MATH|MERROR|ANNOTATION)$/.test(e.tagName.toUpperCase()) || e.hasAttribute('data-mjx-error') || e.classList.contains('katex-error'));
              return {
                title: document.title,
                html_length: body.innerHTML.length,
                math: math.map(e => {const b=e.getBoundingClientRect();return {tag:e.tagName, attributes:Object.fromEntries([...e.attributes].map(a=>[a.name,a.value])), text:e.textContent, html:e.outerHTML.slice(0,10000), box:{x:b.x,y:b.y,width:b.width,height:b.height}};}),
                iframes: all.filter(e=>e.tagName==='IFRAME').map(e=>({src:e.src,title:e.title})),
                table_rows: [...body.querySelectorAll('tr')].map(r=>[...r.children].map(c=>c.innerText)),
                html_errors: all.filter(e=>e.hasAttribute('data-mjx-error')||/^(MERROR)$/i.test(e.tagName)||e.classList.contains('katex-error')).map(e=>e.textContent),
              };
            });
            entry.frames.push({url: frame.url(), ...data});
          } catch (err) {entry.frames.push({url: frame.url(), error: String(err)});}
        }
        await article.screenshot({path: path.join(out, safe + '.png'), timeout: 30000});
        if (['README.md', 'learning/WATROUS_BRIDGE.md', 'science/erasure_capacities.md', 'science/symmetric_loss.md'].includes(file)) {
          await page.setViewportSize({width: 760, height: 1000});
          await page.waitForTimeout(300);
          await article.screenshot({path: path.join(out, safe + '-narrow.png'), timeout: 30000});
        }
        const allMath = entry.frames.flatMap(f=>f.math || []);
        entry.hosted_math_nodes = allMath.length;
        entry.hosted_errors = entry.frames.flatMap(f=>f.html_errors || []);
        entry.raw_dollar_lines = entry.article_text.split('\n').filter(line=> /\$[^$\n]+\$/.test(line));
        if (entry.expected.length && !allMath.length) entry.errors.push('No hosted math DOM recovered despite nonempty source expressions');
        if (entry.hosted_errors.length) entry.errors.push('GitHub-rendered math error nodes found');
        console.log(JSON.stringify({path:file,source_expressions:entry.expected.length,hosted_nodes:allMath.length,frame_count:entry.frames.length,hosted_errors:entry.hosted_errors,raw_dollar_lines:entry.raw_dollar_lines,errors:entry.errors}));
      } catch (err) {
        entry.errors.push(String(err));
        await page.screenshot({path: path.join(out, safe + '-failure.png')}).catch(()=>{});
        fs.writeFileSync(path.join(out, safe + '-failure.html'), await page.content());
        console.error(file + ': ' + String(err));
      } finally {
        report.pages.push(entry);
        fs.writeFileSync(path.join(out, 'report.json'), JSON.stringify(report, null, 2) + '\n');
        await page.close();
      }
    }
  } finally {await browser.close();}
  report.finished_at_utc = new Date().toISOString();
  fs.writeFileSync(path.join(out, 'report.json'), JSON.stringify(report, null, 2) + '\n');
  const failures = report.pages.filter(p=>p.errors.length);
  console.log(`Hosted audit recorded ${report.pages.length} pages; ${failures.length} pages require review. Artifacts contain real GitHub DOM and screenshots.`);
  if (failures.length) process.exitCode = 1;
})().catch(err => {console.error(err); process.exitCode = 1;});
