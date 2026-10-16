/* Refrigerant circuit reference view. Typical R-410A values for a healthy TXV system. Reference only: never shows the active fault. Local only. */
(function(){
 var NS="http://www.w3.org/2000/svg";
 var me=document.currentScript,mode=(me&&me.getAttribute("data-mode"))||"cool";
 var M={
  cool:{title:"Refrigerant circuit (cooling)",hot:"Outdoor coil (condenser)",cold:"Indoor coil (evaporator)",pts:[
   ["1","Compressor inlet","Superheated vapor, about 125 psig, about 53 F"],
   ["2","Compressor discharge","Very hot vapor, about 365 psig"],
   ["3","Condenser outlet","Subcooled liquid, about 365 psig, about 100 F"],
   ["4","After the TXV","Cold liquid-vapor mix, about 125 psig, about 43 F"]],
   ref:"Healthy: superheat about 8 to 14 F, subcooling about 10 F (7 to 13). Heat is picked up indoors and rejected outdoors."},
  heat:{title:"Refrigerant circuit (heating)",hot:"Indoor coil (condenser)",cold:"Outdoor coil (evaporator)",pts:[
   ["1","Compressor inlet","Superheated vapor, about 78 psig, about 31 F"],
   ["2","Compressor discharge","Very hot vapor, about 330 psig"],
   ["3","Indoor coil outlet","Subcooled liquid, about 330 psig, about 93 F"],
   ["4","After the TXV","Cold liquid-vapor mix, about 78 psig, about 20 F"]],
   ref:"Healthy: superheat about 8 to 14 F, subcooling about 10 F. The reversing valve swaps which coil is the condenser. Defrost briefly reverses the cycle."}
 };
 var FAULTS=[["Low charge (leak)","low","low","high","low"],["Overcharge","normal or high","high","normal or low","high"],["Liquid line restriction","low","low to normal","high","high"],["Dirty condenser / low condenser airflow","high","high","normal or low","normal or high"],["Low evaporator airflow","low","low","low","normal or high"]];
 function el(n,a,t){var e=document.createElementNS(NS,n);for(var k in a)e.setAttribute(k,a[k]);if(t!=null)e.textContent=t;return e}
 function build(){
  var host=document.getElementById("fur");if(!host||document.getElementById("rcwrap"))return;
  var m=M[mode]||M.cool;
  var d=document.createElement("details");d.id="rcwrap";d.className="panel";
  d.innerHTML='<summary><strong>'+m.title+'</strong></summary><p class="small">Follow the refrigerant around the loop. Tap a numbered point for what it should be.</p><svg id="rcs" viewBox="0 0 600 330" role="group" aria-label="Refrigerant circuit diagram"></svg><p id="rcp" class="small" aria-live="polite">Select a point.</p><p class="small">'+m.ref+'</p><div class="tw"><table><tr><th>Fault</th><th>Suction pressure</th><th>Head pressure</th><th>Superheat</th><th>Subcooling</th></tr>'+FAULTS.map(function(r){return"<tr><td>"+r.join("</td><td>")+"</td></tr>"}).join("")+'</table></div><p class="small">General patterns for a TXV system. Always confirm with measurements, not one reading.</p>';
  host.parentNode.appendChild(d);
  var sv=document.getElementById("rcs");
  sv.appendChild(el("rect",{x:40,y:40,width:220,height:70,rx:8,"class":"wdb on"}));sv.appendChild(el("text",{x:150,y:80,"class":"wdt","text-anchor":"middle"},m.hot));
  sv.appendChild(el("rect",{x:340,y:220,width:220,height:70,rx:8,"class":"wdb"}));sv.appendChild(el("text",{x:450,y:260,"class":"wdt","text-anchor":"middle"},m.cold));
  sv.appendChild(el("circle",{cx:450,cy:75,r:34,"class":"wdb"}));sv.appendChild(el("text",{x:450,y:79,"class":"wdt wds","text-anchor":"middle"},"Comp-"));sv.appendChild(el("text",{x:450,y:91,"class":"wdt wds","text-anchor":"middle"},"ressor"));
  sv.appendChild(el("rect",{x:60,y:215,width:90,height:36,rx:6,"class":"wdb"}));sv.appendChild(el("text",{x:105,y:238,"class":"wdt wds","text-anchor":"middle"},"TXV (metering)"));
  var P=[[450,41,"1"],[395,100,"2"],[150,40,"3"],[105,215,"4"]];
  // pipes: compressor -> hot coil (discharge), hot coil -> TXV (liquid), TXV -> cold coil, cold coil -> compressor
  sv.appendChild(el("path",{d:"M416 75 H260","class":"wdl hot"}));
  sv.appendChild(el("path",{d:"M40 75 H20 V233 H60","class":"wdl hot"}));
  sv.appendChild(el("path",{d:"M150 233 H340 V255","class":"wdl"}));
  sv.appendChild(el("path",{d:"M560 255 H580 V75 H484","class":"wdl"}));
  var pos=[[600-20-30,66],[330,58],[20,150],[200,215]];
  var labels=[[570,60],[340,62],[10,140],[170,210]];
  labels.forEach(function(p,i){
   var g=el("g",{role:"button",tabindex:"0","aria-label":"Point "+m.pts[i][0]+": "+m.pts[i][1],"class":"rcpt"});
   g.appendChild(el("circle",{cx:p[0]+9,cy:p[1]+9,r:14,"class":"wdb on"}));g.appendChild(el("text",{x:p[0]+9,y:p[1]+14,"class":"wdt wdh","text-anchor":"middle"},m.pts[i][0]));
   function go(){document.getElementById("rcp").textContent="Point "+m.pts[i][0]+", "+m.pts[i][1]+": "+m.pts[i][2]+".";}
   g.addEventListener("click",go);g.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();go()}});
   sv.appendChild(g);
  });
  sv.appendChild(el("text",{x:20,y:318,"class":"wdt wds"},"Flow: 1 compressor, 2 discharge to hot coil, 3 liquid line, 4 TXV to cold coil, back to 1."));
 }
 build();
})();
