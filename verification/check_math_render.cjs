#!/usr/bin/env node
"use strict";
// Source-level MathJax check. GitHub uses MathJax but hosted visual review
// remains a separate requirement.
// Install: npm install --no-save --no-package-lock mathjax-full@3.2.1
const fs=require("node:fs");
const path=require("node:path");
const {mathjax}=require("mathjax-full/js/mathjax.js");
const {TeX}=require("mathjax-full/js/input/tex.js");
const {SVG}=require("mathjax-full/js/output/svg.js");
const {liteAdaptor}=require("mathjax-full/js/adaptors/liteAdaptor.js");
const {RegisterHTMLHandler}=require("mathjax-full/js/handlers/html.js");
const {AllPackages}=require("mathjax-full/js/input/tex/AllPackages.js");
const adaptor=liteAdaptor();RegisterHTMLHandler(adaptor);
const input=new TeX({packages:AllPackages,tags:"none"});
const output=new SVG({fontCache:"none"});
const document=mathjax.document("",{InputJax:input,OutputJax:output});
const root=path.resolve(__dirname,".."),bt=String.fromCharCode(96);
let markdown=[];
function walk(folder){
 for(const e of fs.readdirSync(folder,{withFileTypes:true})){
  if([".git","node_modules",".venv","venv"].includes(e.name))continue;
  const p=path.join(folder,e.name);
  if(e.isDirectory())walk(p);else if(e.isFile()&&e.name.endsWith(".md"))markdown.push(p);
 }
}
walk(root);
let displays=0,inline=0,maxWidth=0;const errors=[];
function render(tex,file,line,display){
 try{
  const node=document.convert(tex,{display});
  const html=adaptor.outerHTML(node);
  if(/<merror\b|data-mjx-error/.test(html))
   errors.push(file+":"+line+": MathJax error: "+tex.slice(0,200));
  if(display){
   const m=html.match(/viewBox="([^"]+)"/);
   if(!m){errors.push(file+":"+line+": missing SVG viewBox");return;}
   const v=m[1].split(/\s+/).map(Number);
   if(v.length!==4||v.some(x=>!Number.isFinite(x))){errors.push(file+":"+line+": invalid viewBox");return;}
   const w=v[2]/1000,h=v[3]/1000;maxWidth=Math.max(maxWidth,w);
   if(w>48)errors.push(file+":"+line+": equation exceeds 48 em ("+w.toFixed(1)+" em)");
   if(h>0&&h>w*3)errors.push(file+":"+line+": anomalously tall equation ("+w.toFixed(1)+" x "+h.toFixed(1)+" em)");
  }
 }catch(e){errors.push(file+":"+line+": "+String(e).slice(0,200));}
}
const mathFence=new RegExp("^"+bt.repeat(3)+"math[ \\t]*\\r?\\n([\\s\\S]*?)^"+bt.repeat(3)+"[ \\t]*$","gm");
const anyFence=new RegExp("^("+bt+"{3,}|~{3,})[^\\n]*\\n[\\s\\S]*?^\\1[ \\t]*$","gm");
for(const filename of markdown){
 const rel=path.relative(root,filename),text=fs.readFileSync(filename,"utf8");
 if(/^\s*\$\$\s*$/m.test(text))errors.push(rel+": obsolete double-dollar math block");
 if(/\\tag\s*\{/.test(text))errors.push(rel+": raw TeX equation tag");
 mathFence.lastIndex=0;let m;
 while((m=mathFence.exec(text))){
  displays++;const line=text.slice(0,m.index).split("\n").length;
  render(m[1].trim(),rel,line,true);
 }
 anyFence.lastIndex=0;
 const plain=text.replace(anyFence,x=>"\n".repeat(x.split("\n").length-1));
 const lines=plain.split("\n");
 for(let n=0;n<lines.length;n++){
  const noCode=lines[n].replace(new RegExp(bt+"[^"+bt+"]*"+bt,"g"),"");
  for(const match of noCode.matchAll(/(?<!\\)\$(?!\s)([^$\n]+?)(?<!\\)\$/g)){
   inline++;render(match[1],rel,n+1,false);
  }
 }
}
if(displays<55)errors.push("Only "+displays+" math display blocks found (expected at least 55)");
if(inline<50)errors.push("Only "+inline+" inline math spans found (expected at least 50)");
if(errors.length){
 console.error("MathJax validation failed:");
 errors.forEach(x=>console.error(" - "+x));
 console.error({displays,inline,maxWidthEm:maxWidth});
 process.exit(1);
}
console.log("PASS: MathJax 3.2.1 rendered "+displays+" displays and "+inline+" inline expressions; maximum display width "+maxWidth.toFixed(2)+" em");
