#!/usr/bin/env node
'use strict';
// Exact source-to-MathML comparison in a browser visiting the actual public
// GitHub host. No local preview, injected CSS, sign-in, or repository writes.
const fs=require('node:fs');
const path=require('node:path');
const cp=require('node:child_process');
const {chromium}=require('playwright');
const {ROOT,trackedPages,checkSource,mathJax,sha256}=require('./math_source.cjs');
const repo='GoGoKo699/Quantum-Permutation-Noise-Limits';
const revision=process.env.SOURCE_SHA||cp.execFileSync('git',['rev-parse','HEAD'],{cwd:ROOT,encoding:'utf8'}).trim();
if(!/^[a-f0-9]{40}$/.test(revision))throw new Error('Pin the full source commit');
const out=path.resolve(process.env.AUDIT_OUTPUT||path.join(ROOT,'hosted-math-audit'));
fs.mkdirSync(out,{recursive:true});
const pages=trackedPages();
const compiler=mathJax();
const report={repository:repo,revision,observed_at_utc:new Date().toISOString(),mode:'real-github-browser',pages:[]};

// Executed in the real GitHub page. Normalization ignores ONLY layout spaces,
// transparent row/style wrappers and attributes unrelated to symbol meaning.
function inspect(root,expected){
  function canonical(e){
    const tag=e.localName;
    if(['mi','mo','mn','mtext'].includes(tag)){
      const text=e.textContent.trim();
      return text?[[tag,text,e.getAttribute('mathvariant')||'']]:[];
    }
    if(tag==='mspace')return [];
    const children=[...e.children].flatMap(canonical);
    if(['math','mrow','mstyle','semantics'].includes(tag))return children;
    return [[tag,children]];
  }
  function geometry(math){
    const boxes=[...math.querySelectorAll('mi,mo,mn,mtext')].map(e=>e.getBoundingClientRect()).filter(b=>b.width&&b.height);
    if(!boxes.length)return null;
    const l=Math.min(...boxes.map(b=>b.left)),r=Math.max(...boxes.map(b=>b.right));
    const t=Math.min(...boxes.map(b=>b.top)),b=Math.max(...boxes.map(b=>b.bottom));
    return {width:r-l,height:b-t,available_width:root.clientWidth,overflow:r-l>root.clientWidth+4,collapsed:b-t>Math.max(200,3*(r-l))};
  }
  const nodes=[...root.querySelectorAll('math-renderer')];
  const comparisons=expected.map((x,i)=>{
    const element=nodes[i];
    const math=element&&element.querySelector('math');
    if(!math)return {index:i,line:x.line,kind:x.kind,tex:x.tex,match:false,error:element?element.textContent:'Missing math-renderer'};
    const parsed=new DOMParser().parseFromString(x.mml,'application/xml');
    if(parsed.querySelector('parsererror'))return {index:i,match:false,error:'Invalid expected MathML XML'};
    const want=JSON.stringify(canonical(parsed.documentElement)),got=JSON.stringify(canonical(math));
    return {index:i,line:x.line,kind:x.kind,tex:x.tex,match:want===got,expected_signature:want,actual_signature:got,geometry:geometry(math)};
  });
  const copy=root.cloneNode(true);
  for(const node of copy.querySelectorAll('math-renderer'))node.remove();
  const unrendered=(copy.textContent.match(/\$[^$\n]+\$/g)||[]);
  const errors=[...root.querySelectorAll('math-renderer .flash-error, math-renderer merror, [data-mjx-error], .katex-error')].map(e=>e.textContent.trim());
  return {renderers:nodes.length,native_math:root.querySelectorAll('math-renderer math').length,comparisons,unrendered,errors,table_columns:[...root.querySelectorAll('tr')].map(r=>r.children.length)};
}
function tableColumns(source){
  const prose=source.replace(/^```[^\n]*\n[\s\S]*?^```[ \t]*$/gm,'');
  return prose.split('\n').filter(l=>l.startsWith('|')&&!/^\|[\s:|\-]+$/.test(l)).map(l=>l.split('|').length-2);
}

(async()=>{
  const browser=await chromium.launch({headless:true});
  const context=await browser.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:1,colorScheme:'light'});
  try{
    for(const file of pages){
      const source=fs.readFileSync(path.join(ROOT,file),'utf8');
      const expected=checkSource(file,source).map(e=>({...e,mml:compiler.mml(e.tex,e.kind==='display')}));
      const safe=file.replace(/[^A-Za-z0-9_.-]/g,'__');
      const entry={path:file,url:`https://github.com/${repo}/blob/${revision}/${file}`,source_sha256:sha256(source),expected_count:expected.length,display_count:expected.filter(e=>e.kind==='display').length,inline_count:expected.filter(e=>e.kind==='inline').length,errors:[],viewports:[]};
      const page=await context.newPage();
      try{
        const response=await page.goto(entry.url,{waitUntil:'domcontentloaded',timeout:60000});
        entry.http_status=response&&response.status();
        if(entry.http_status!==200)throw new Error('HTTP '+entry.http_status);
        const article=page.locator('article.markdown-body').first();
        await article.waitFor({state:'visible',timeout:30000});
        await page.evaluate(async()=>{
          for(let y=0;y<document.body.scrollHeight;y+=900){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,70));}
          window.scrollTo(0,0);
        });
        await page.waitForTimeout(2000);
        for(const width of [1440,760]){
          await page.setViewportSize({width,height:1000});
          await page.evaluate(()=>window.scrollTo(0,0));
          await page.waitForTimeout(400);
          const result=await article.evaluate(inspect,expected);
          const failures=result.comparisons.filter(c=>!c.match);
          const layout=result.comparisons.filter(c=>c.kind==='display'&&c.geometry&&(c.geometry.overflow||c.geometry.collapsed));
          const tableMatch=JSON.stringify(result.table_columns)===JSON.stringify(tableColumns(source));
          if(result.renderers!==expected.length||result.native_math!==expected.length)entry.errors.push(`${width}px: source/rendered coverage ${expected.length}/${result.renderers}/${result.native_math}`);
          if(failures.length)entry.errors.push(`${width}px: ${failures.length} source-to-MathML mismatches`);
          if(result.unrendered.length)entry.errors.push(`${width}px: raw unrendered dollar formulas`);
          if(result.errors.length)entry.errors.push(`${width}px: GitHub errors: ${result.errors.join('; ')}`);
          if(layout.length)entry.errors.push(`${width}px: ${layout.length} overflowed or collapsed displays`);
          if(!tableMatch)entry.errors.push(`${width}px: Markdown table column loss`);
          const comparisons=result.comparisons.map(c=>({...c,expected_signature:c.expected_signature?sha256(c.expected_signature):null,actual_signature:c.actual_signature?sha256(c.actual_signature):null}));
          entry.viewports.push({width,...result,comparisons,table_match:tableMatch,layout_failures:layout.map(x=>x.index)});
          await page.screenshot({path:path.join(out,`${safe}-${width}.png`),fullPage:true,timeout:30000});
          if(width===1440){
            fs.writeFileSync(path.join(out,safe+'.html'),await article.innerHTML());
            fs.writeFileSync(path.join(out,safe+'-failures.json'),JSON.stringify(failures,null,2));
          }
        }
        console.log(JSON.stringify({path:file,expected:expected.length,rendered:entry.viewports.map(v=>v.native_math),matching:entry.viewports.map(v=>v.comparisons.filter(c=>c.match).length),errors:entry.errors}));
      }catch(error){
        entry.errors.push(String(error));
        await page.screenshot({path:path.join(out,safe+'-failure.png'),fullPage:true}).catch(()=>{});
        console.error(file+': '+String(error));
      }finally{
        report.pages.push(entry);
        fs.writeFileSync(path.join(out,'report.json'),JSON.stringify(report,null,2)+'\n');
        await page.close();
      }
    }
  }finally{await browser.close();}
  report.finished_at_utc=new Date().toISOString();
  report.passed=report.pages.length===pages.length&&report.pages.every(p=>!p.errors.length);
  report.expression_count=report.pages.reduce((s,p)=>s+p.expected_count,0);
  fs.writeFileSync(path.join(out,'report.json'),JSON.stringify(report,null,2)+'\n');
  console.log(`${report.passed?'PASS':'FAIL'}: actual GitHub at ${revision}: ${report.pages.length} pages; ${report.expression_count} source expressions; desktop and narrow viewport comparisons.`);
  if(!report.passed)process.exitCode=1;
})().catch(error=>{console.error(error);process.exitCode=1;});
