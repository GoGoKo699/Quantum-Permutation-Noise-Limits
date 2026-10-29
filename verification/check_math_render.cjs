#!/usr/bin/env node
'use strict';
// Syntax/coverage checks precede the separate real-GitHub browser audit.
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const {ROOT,trackedPages,checkSource,mathJax}=require('./math_source.cjs');
const renderer=mathJax();
let displays=0,inline=0,maxWidth=0;
for(const file of trackedPages()){
  const source=fs.readFileSync(path.join(ROOT,file),'utf8');
  for(const expression of checkSource(file,source)){
    const display=expression.kind==='display';
    if(display)displays++;else inline++;
    const mml=renderer.mml(expression.tex,display);
    if(/<merror\b|data-mjx-error/.test(mml))throw new Error(`${file}:${expression.line}: MathJax rejected expression`);
    const svg=renderer.svg(expression.tex,display);
    if(/data-mjx-error/.test(svg))throw new Error(`${file}:${expression.line}: SVG conversion failed`);
    if(display){
      const match=svg.match(/viewBox="([^"]+)"/);
      if(!match)throw new Error(`${file}:${expression.line}: no SVG dimensions`);
      const [,,w,h]=match[1].split(/\s+/).map(Number);
      if(!Number.isFinite(w)||!Number.isFinite(h)||w<=0)throw new Error('Invalid math dimensions');
      maxWidth=Math.max(maxWidth,w/1000);
      if(w>48000||h>w*3)throw new Error(`${file}:${expression.line}: suspicious display geometry`);
    }
  }
}
if(displays!==67||inline!==402)throw new Error('Incomplete source coverage');

// Negative regression checks for the three defects observed on the live host.
const readme=fs.readFileSync(path.join(ROOT,'README.md'),'utf8');
const raw=readme.replace('$`n`$','$n$');
assert.notEqual(raw,readme);
assert.throws(()=>checkSource('README.md',raw),/Unprotected inline/);
const model=fs.readFileSync(path.join(ROOT,'science/model.md'),'utf8');
const blocked=model.replace('\\mathrm{Tr}','\\operatorname{Tr}');
assert.notEqual(blocked,model);
assert.throws(()=>checkSource('science/model.md',blocked),/GitHub rejected operatorname/);
const bridge=fs.readFileSync(path.join(ROOT,'learning/WATROUS_BRIDGE.md'),'utf8');
const splitTable=bridge.replace('\\vert ','|');
assert.notEqual(splitTable,bridge);
assert.throws(()=>checkSource('learning/WATROUS_BRIDGE.md',splitTable),/Inline TeX bar/);

const replacement=fs.readFileSync(path.join(ROOT,'science/replacement_noise.md'),'utf8');
const truncated=replacement.replace('\\lt q','<q');
assert.notEqual(truncated,replacement);
assert.throws(()=>checkSource('science/replacement_noise.md',truncated),/Raw less-than/);
console.log(`PASS: ${displays} displays and ${inline} protected inline expressions; no known GitHub-blocked macros or raw table bars; maximum width ${maxWidth.toFixed(2)} em.`);
console.log('This source test is not a hosted-rendering certificate; run hosted_math_audit.cjs for that.');
