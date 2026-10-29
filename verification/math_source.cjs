'use strict';
const fs = require('node:fs');
const path = require('node:path');
const cp = require('node:child_process');
const crypto = require('node:crypto');
const ROOT = path.resolve(__dirname, '..');
const COUNTS = {
  'README.md': [2,28], 'learning/MILESTONES.md':[0,0],
  'learning/WATROUS_BRIDGE.md':[0,25], 'learning/WORKED_EXAMPLES.md':[3,32],
  'references/RELATED_WORK.md':[0,5], 'science/README.md':[3,11],
  'science/classical_contrast.md':[7,19], 'science/erasure_capacities.md':[14,65],
  'science/interpretation.md':[2,29], 'science/model.md':[6,45],
  'science/replacement_noise.md':[12,48], 'science/schur_reduction.md':[5,41],
  'science/symmetric_loss.md':[13,36], 'verification/README.md':[0,18]
};
function trackedPages(){return cp.execFileSync('git',['ls-files','*.md'],{cwd:ROOT,encoding:'utf8'}).trim().split('\n').filter(Boolean);}
function expressions(source, allowLegacy=false){
  const result=[];
  const blank=s=>s.replace(/[^\n]/g,' ');
  let rest=source.replace(/^```math[^\n]*\n([\s\S]*?)^```[ \t]*$/gm,(whole,tex,start)=>{
    result.push({kind:'display',tex:tex.trim(),start,line:source.slice(0,start).split('\n').length});return blank(whole);
  });
  rest=rest.replace(/\$`([^`\n]+)`\$/g,(whole,tex,start)=>{
    result.push({kind:'inline',tex,start,line:source.slice(0,start).split('\n').length});return blank(whole);
  });
  if(allowLegacy)rest=rest.replace(/(?<![\\$])\$([^$\n]+?)(?<!\\)\$(?!\$)/g,(whole,tex,start)=>{
    result.push({kind:'inline',tex,start,line:source.slice(0,start).split('\n').length});return blank(whole);
  });
  if(!allowLegacy && /(?<!\\)\$/.test(rest.replace(/`[^`\n]*`/g,'')))throw new Error('Unprotected inline dollar expression');
  return result.sort((a,b)=>a.start-b.start);
}
function checkSource(file,source){
  const list=expressions(source);
  if(/^\s*\$\$\s*$/m.test(source))throw new Error('Legacy display delimiters: '+file);
  for(const item of list){
    if(/\\operatorname\b/.test(item.tex))throw new Error('GitHub rejected operatorname: '+file+':'+item.line);
    if(item.kind==='inline' && item.tex.includes('|'))throw new Error('Inline TeX bar can split Markdown table: '+file+':'+item.line);
  }
  const counts=[list.filter(x=>x.kind==='display').length,list.filter(x=>x.kind==='inline').length];
  if(!COUNTS[file]||JSON.stringify(counts)!==JSON.stringify(COUNTS[file]))throw new Error('Expression coverage changed in '+file+': '+counts);
  return list;
}
function mathJax(){
  const {mathjax}=require('mathjax-full/js/mathjax.js');
  const {TeX}=require('mathjax-full/js/input/tex.js');
  const {SVG}=require('mathjax-full/js/output/svg.js');
  const {liteAdaptor}=require('mathjax-full/js/adaptors/liteAdaptor.js');
  const {RegisterHTMLHandler}=require('mathjax-full/js/handlers/html.js');
  const {AllPackages}=require('mathjax-full/js/input/tex/AllPackages.js');
  const {SerializedMmlVisitor}=require('mathjax-full/js/core/MmlTree/SerializedMmlVisitor.js');
  const {STATE}=require('mathjax-full/js/core/MathItem.js');
  const adaptor=liteAdaptor();RegisterHTMLHandler(adaptor);
  const doc=mathjax.document('',{InputJax:new TeX({packages:AllPackages,tags:'none'}),OutputJax:new SVG({fontCache:'none'})});
  const visitor=new SerializedMmlVisitor();
  return {
    mml:(tex,display)=>visitor.visitTree(doc.convert(tex,{display,end:STATE.CONVERT})),
    svg:(tex,display)=>adaptor.outerHTML(doc.convert(tex,{display}))
  };
}
function sha256(text){return crypto.createHash('sha256').update(text).digest('hex');}
module.exports={ROOT,COUNTS,trackedPages,expressions,checkSource,mathJax,sha256};
