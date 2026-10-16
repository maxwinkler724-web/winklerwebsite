/* English / Spanish for Fix-It Van. Spanish is a beta and needs native-speaker review.
   The choice is saved on this device only (localStorage "fixitvan.lang"). Nothing is sent anywhere.
   Loads after jobs.js and before game.js: it translates the job data in place and gives game.js a text helper, window.L(). */
(function(){
"use strict";
var LANG="en";try{LANG=localStorage.getItem("fixitvan.lang")==="es"?"es":"en"}catch(e){}
var S=window.VAN_ES||{dict:{},short:{}},D=S.dict;
function L(s){return LANG==="es"&&Object.prototype.hasOwnProperty.call(D,s)?D[s]:s}
window.L=L;window.VAN_LANG=LANG;
function deep(o,skip){
 if(typeof o==="string")return L(o);
 if(Array.isArray(o))return o.map(function(x){return deep(x)});
 if(o&&typeof o==="object"){Object.keys(o).forEach(function(k){if(k!=="id"&&k!=="kind"&&k!=="house")o[k]=deep(o[k])})}
 return o;
}
if(LANG==="es"){
 document.documentElement.lang="es";
 (window.JOBS||[]).forEach(function(j){j.short=S.short[j.id]||j.title;deep(j)});
 var textNode=function(n){var p=n.parentNode;if(!p||/^(SCRIPT|STYLE)$/.test(p.nodeName))return;var v=n.nodeValue,k=v.trim();if(k&&Object.prototype.hasOwnProperty.call(D,k)){n.nodeValue=v.replace(k,D[k])}};
 var attrs=["aria-label","title"];
 var elem=function(e){attrs.forEach(function(a){var v=e.getAttribute&&e.getAttribute(a);if(v&&Object.prototype.hasOwnProperty.call(D,v))e.setAttribute(a,D[v])})};
 var walk=function(r){if(r.nodeType===3){textNode(r);return}if(r.nodeType!==1)return;elem(r);var w=document.createTreeWalker(r,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT),n;while((n=w.nextNode())){if(n.nodeType===3)textNode(n);else elem(n)}};
 var start=function(){
  document.title="Fix-It Van (español) | Trade Study Bench";
  walk(document.body);
  new MutationObserver(function(ms){ms.forEach(function(m){if(m.type==="characterData")textNode(m.target);else if(m.type==="attributes")elem(m.target);else m.addedNodes.forEach(walk)})}).observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:attrs});
 };
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start);else start();
}
function mount(){
 var top=document.querySelector(".top");if(!top)return;
 var box=document.createElement("div");box.className="langsw";box.setAttribute("role","group");box.setAttribute("aria-label",LANG==="es"?"Idioma":"Language");
 [["en","EN","English"],["es","ES","Español"]].forEach(function(l){
  var b=document.createElement("button");b.type="button";b.className="btn alt sm";b.textContent=l[1];
  b.setAttribute("lang",l[0]);b.setAttribute("aria-label",l[1]+" ("+l[2]+")");b.setAttribute("aria-pressed",LANG===l[0]?"true":"false");
  b.addEventListener("click",function(){
   if(LANG===l[0])return;
   var job=document.getElementById("job");
   if(job&&!job.classList.contains("hidden")&&!window.confirm(l[0]==="es"?"Cambiar de idioma reinicia este trabajo. ¿Seguir?":"Changing language restarts this job. Continue?"))return;
   try{localStorage.setItem("fixitvan.lang",l[0])}catch(e){}
   location.reload();
  });
  box.appendChild(b);
 });
 top.appendChild(box);
 if(LANG==="es"){var gl=document.querySelector('a[href="guide.html"]');if(gl)gl.setAttribute("href","guia.html");var n=document.createElement("p");n.className="small betanote";n.setAttribute("role","note");n.textContent="Español (beta): la traducción está en revisión por hablantes nativos. Si algo no se entiende, cambia a EN.";top.insertAdjacentElement("afterend",n)}
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",mount);else mount();
})();
