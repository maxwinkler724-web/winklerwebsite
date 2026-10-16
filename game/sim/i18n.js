/* English / Spanish switch for the simulator. Spanish is a beta and needs native-speaker review.
   The choice is saved on this device only (localStorage "sim.lang"). Nothing is sent anywhere.
   Strings live in strings.es.js (exact English text -> Spanish); the patterns below handle text with numbers in it.
   Anything without a Spanish entry stays in English. */
(function(){
"use strict";
var D=window.ES_DICT||{},LANG="en";
try{LANG=localStorage.getItem("sim.lang")==="es"?"es":"en"}catch(e){}
var PEN={bleed:"Purga sin cerrar la válvula",burn:"Quemadura",fillhot:"Llenado de agua fría en caldera caliente",gaugeppe:"Manómetros sin EPP",hint:"Pista",jumper:"Puente en un dispositivo de seguridad",leakycharge:"Recarga sin reparar la fuga",liveohm:"Ohmios en un circuito con energía",livepanel:"Panel abierto con energía",liveppe:"Trabajo con energía sin EPP",liverepair:"Reparación con energía",nodead:"No se verificó que no hubiera energía",noverify:"No se verificó que no hubiera energía",plug:"Tapón en la válvula de alivio",topoff:"Se añadió refrigerante sin diagnosticar",vent:"Refrigerante venteado"};
var GRADE={"Master tech":"Técnico maestro","Journeyman":"Oficial","Apprentice":"Aprendiz","Needs more practice":"Necesita más práctica"};
function pick(v,inSvg){var i=v.indexOf("|");if(i<0)return v;return inSvg?v.slice(0,i):v.slice(i+1)}
function tr(s,inSvg,depth){
 depth=depth||0;if(depth>4||!s)return s;
 var m,k=s.trim();if(!k)return s;
 if(Object.prototype.hasOwnProperty.call(D,k))return s.replace(k,pick(D[k],inSvg));
 if((m=k.match(/^(.+) \(\$(\d+)\)$/))&&Object.prototype.hasOwnProperty.call(D,m[1]))return s.replace(k,pick(D[m[1]],inSvg)+" ($"+m[2]+")");
 if((m=k.match(/^(.+): (ON|OFF)(\.?)$/))&&depth<4){var bb=tr(m[1],inSvg,depth+1);if(bb!==m[1])return s.replace(k,bb+": "+(m[2]==="ON"?"SÍ":"NO")+m[3])}
 if((m=k.match(/^Tests run: (\d+)\. (Parts billed|Parts and labor billed): \$(\d+)\.$/)))return s.replace(k,"Pruebas realizadas: "+m[1]+". "+(m[2]==="Parts billed"?"Piezas facturadas":"Piezas y mano de obra facturadas")+": $"+m[3]+".");
 if((m=k.match(/^Score (\d+)\/100, (.+)$/)))return s.replace(k,"Puntaje "+m[1]+"/100, "+(GRADE[m[2]]||m[2]));
 if((m=k.match(/^Best: (\d+)\/100$/)))return s.replace(k,"Mejor: "+m[1]+"/100");
 if((m=k.match(/^(\w+?)(\d*): (\d+)$/))&&PEN[m[1]])return s.replace(k,PEN[m[1]]+": "+m[3]);
 if((m=k.match(/^Hint used \((-\d+)\)$/)))return s.replace(k,"Pista usada ("+m[1]+")");
 if(k.indexOf("Work order: ")===0){
  var rest=k.slice(12),from=0,j;
  while((j=rest.indexOf(". ",from))>=0){
   var title=rest.slice(0,j);
   if(Object.prototype.hasOwnProperty.call(D,title)){
    var body=rest.slice(j+2),c=body.indexOf(": ");
    if(c>0)return s.replace(k,"Orden de trabajo: "+pick(D[title])+". "+tr(body.slice(0,c),0,depth+1)+": "+tr(body.slice(c+2),0,depth+1));
   }
   from=j+2;
  }
 }
 if((m=k.match(/^Expected: (.+)$/)))return s.replace(k,"Esperado: "+tr(m[1],inSvg,depth+1));
 if((m=k.match(/^[Aa]bout (.+)$/)))return s.replace(k,(k[0]==="A"?"Unos ":"unos ")+m[1]);
 if((m=k.match(/^(Mr|Mrs|Ms)\. (.+)$/)))return s.replace(k,(m[1]==="Mr"?"Sr. ":"Sra. ")+m[2]);
 var c2=k.indexOf(": ");
 if(c2>0){var a=tr(k.slice(0,c2),inSvg,depth+1),b=tr(k.slice(c2+2),inSvg,depth+1);if(a!==k.slice(0,c2)||b!==k.slice(c2+2))return s.replace(k,a+": "+b)}
 return s;
}
if(LANG==="es"){
 document.documentElement.lang="es";
 var done=new WeakMap();
 var inSvg=function(n){for(var p=n.parentNode;p;p=p.parentNode)if(p.nodeName&&p.nodeName.toLowerCase()==="svg")return true;return false};
 var textNode=function(n){
  var v=n.nodeValue,d=done.get(n);if(d&&d===v)return;
  var p=n.parentNode;if(!p||/^(SCRIPT|STYLE)$/.test(p.nodeName))return;
  var t=tr(v,inSvg(n));if(t!==v){n.nodeValue=t;done.set(n,t)}
 };
 var attrs=["aria-label","title","placeholder"];
 var elem=function(e){attrs.forEach(function(a){var v=e.getAttribute&&e.getAttribute(a);if(v){var t=tr(v,false);if(t!==v)e.setAttribute(a,t)}})};
 var walk=function(root){
  if(root.nodeType===3){textNode(root);return}
  if(root.nodeType!==1)return;
  elem(root);
  var w=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT),n;
  while((n=w.nextNode())){if(n.nodeType===3)textNode(n);else elem(n)}
 };
  /* Spanish labels are longer: shrink or wrap diagram labels so they stay inside their boxes. */
 var fitQueued=false;
 var fitAll=function(){
  fitQueued=false;
  document.querySelectorAll("svg .part text:not([data-fit])").forEach(function(t){
   t.setAttribute("data-fit","1");
   var g=t.parentNode,r=g.querySelector("rect,ellipse");if(!r||!t.getBBox)return;
   var rb=r.getBBox(),tb=t.getBBox(),room=rb.width-8;if(!tb.width||tb.width<=room)return;
   var fs=parseFloat(getComputedStyle(t).fontSize)||12,txt=t.textContent;
   var need=fs*room/tb.width;
   if(need>=9){t.style.fontSize=need.toFixed(1)+"px";return}
   if(rb.height>=30){
    var words=txt.split(" "),lines=[""],cw=tb.width/txt.length*9.5/fs;
    t.style.fontSize="9.5px";
    words.forEach(function(w){var l=lines[lines.length-1],cand=l?l+" "+w:w;if(cand.length*cw>room&&l)lines.push(w);else lines[lines.length-1]=cand});
    if(lines.length<=3&&lines.every(function(l){return l.length*cw<=room+4})){
     var x=t.getAttribute("x"),y=parseFloat(t.getAttribute("y"))-(lines.length-1)*5.5;
     t.setAttribute("y",y);t.textContent="";
     lines.forEach(function(l,i){var ts=document.createElementNS("http://www.w3.org/2000/svg","tspan");ts.setAttribute("x",x);ts.setAttribute("dy",i?"11":"0");ts.textContent=l+(i<lines.length-1?" ":"");t.appendChild(ts)});
     return}
   }
   t.style.fontSize="8.5px";
  });
 };
 var queueFit=function(){if(!fitQueued){fitQueued=true;requestAnimationFrame(fitAll)}};
 var obs=new MutationObserver(function(ms){
  queueFit();
  ms.forEach(function(m){
   if(m.type==="characterData")textNode(m.target);
   else if(m.type==="attributes")elem(m.target);
   else m.addedNodes.forEach(walk);
  });
 });
 var start=function(){
  document.title=tr(document.title)||document.title;
  walk(document.body);queueFit();
  obs.observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:attrs});
 };
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start);else start();
}
document.querySelectorAll(".left").forEach(function(e){e.setAttribute("tabindex","0");e.setAttribute("role","region");e.setAttribute("aria-label",LANG==="es"?"Diagrama (se desplaza)":"Diagram (scrolls)")});
document.querySelectorAll(".log").forEach(function(e){e.setAttribute("tabindex","0");e.setAttribute("aria-label",LANG==="es"?"Notas de servicio (se desplaza)":"Service notes (scrolls)")});
/* Language switch (a real button, 44 px, keyboard reachable). */
function mount(){
 var top=document.querySelector(".top");if(!top)return;
 var box=document.createElement("div");box.className="langsw";box.setAttribute("role","group");
 box.setAttribute("aria-label",LANG==="es"?"Idioma":"Language");
 [["en","EN","English"],["es","ES","Español"]].forEach(function(l){
  var b=document.createElement("button");b.type="button";b.className="btn alt sm";b.textContent=l[1];
  b.setAttribute("lang",l[0]);b.setAttribute("aria-label",l[1]+" ("+l[2]+")");b.setAttribute("aria-pressed",LANG===l[0]?"true":"false");
  b.addEventListener("click",function(){
   if(LANG===l[0])return;
   var working=document.getElementById("work")&&!document.getElementById("work").classList.contains("hidden");
   if(working&&!window.confirm(l[0]==="es"?"Cambiar de idioma reinicia la llamada actual. ¿Continuar?":"Changing language restarts the current call. Continue?"))return;
   try{localStorage.setItem("sim.lang",l[0])}catch(e){}
   location.reload();
  });
  box.appendChild(b);
 });
 top.appendChild(box);
 if(LANG==="es"){
  var note=document.createElement("p");note.className="small betanote";note.setAttribute("role","note");
  note.textContent="Español (beta): traducción en revisión por hablantes nativos. Si algo no se entiende, cambie a EN. Términos clave aparecen con el inglés entre paréntesis.";
  top.insertAdjacentElement("afterend",note);
 }
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",mount);else mount();
window.SIMI18N={lang:LANG,tr:tr};
})();
