/* Furnace wiring (ladder) diagram. Shows what a healthy furnace reads at each stage.
   Reference only: it never shows the fault. Local only, no network. */
(function(){
 var NS="http://www.w3.org/2000/svg";
 var STAGES=[
  ["Idle","Thermostat satisfied. Power on, nothing running."],
  ["Call for heat","Thermostat closes R to W. The board starts the inducer."],
  ["Draft proven","Inducer is up to speed and the pressure switch closes."],
  ["Igniter warm-up","Igniter gets 120 V and heats for about 20 seconds."],
  ["Trial for ignition","Igniter off. The board opens the gas valve with 24 V and checks for flame."],
  ["Heating","Flame proven (a few microamps). After the delay the blower starts."]
 ];
 var cur=1;
 function el(n,a,t){var e=document.createElementNS(NS,n);for(var k in a)e.setAttribute(k,a[k]);if(t!=null)e.textContent=t;return e}
 // each item: type, x,y, label, state(s)->[closed/on, volts text]
 function v(x,u){return x+" "+(u||"V")}
 var LINE=[
  {y:90,label:"Inducer",sw:"Inducer relay",f:function(s){return[s>=1,s>=1?"0 V":"120 V",s>=1?"120 V":"0 V"]}},
  {y:160,label:"Igniter",sw:"Igniter relay",f:function(s){return[s===3,s===3?"0 V":"120 V",s===3?"120 V":"0 V"]}},
  {y:230,label:"Blower",sw:"Blower relay",f:function(s){return[s>=5,s>=5?"0 V":"120 V",s>=5?"120 V":"0 V"]}}
 ];
 var LOW=[
  {y:90,label:"Thermostat (R to W)",f:function(s){return[s>=1,s>=1?"0 V":"24 V"]}},
  {y:140,label:"High limit",f:function(){return[true,"0 V"]}},
  {y:190,label:"Pressure switch",f:function(s){return[s>=2,s>=2?"0 V":(s>=1?"24 V":"0 V")]}},
  {y:240,label:"Gas valve (board relay)",f:function(s){return[s>=4,s>=4?"24 V":"0 V"]}},
  {y:290,label:"Flame sensor signal",f:function(s){return[s>=4,s>=4?"2 to 6 uA":"0 uA"]}}
 ];
 function draw(){
  var sv=document.getElementById("wd");if(!sv)return;sv.innerHTML="";
  sv.appendChild(el("text",{x:20,y:24,"class":"wdt wdh"},"120 VAC line side"));
  sv.appendChild(el("text",{x:330,y:24,"class":"wdt wdh"},"24 VAC control side (transformer)"));
  // rails
  sv.appendChild(el("line",{x1:40,y1:40,x2:40,y2:270,"class":"wdl"}));sv.appendChild(el("line",{x1:290,y1:40,x2:290,y2:270,"class":"wdl"}));
  sv.appendChild(el("text",{x:40,y:36,"class":"wdt wds","text-anchor":"middle"},"L1"));sv.appendChild(el("text",{x:290,y:36,"class":"wdt wds","text-anchor":"middle"},"N"));
  LINE.forEach(function(r){
   var st=r.f(cur),closed=st[0];
   sv.appendChild(el("line",{x1:40,y1:r.y,x2:98,y2:r.y,"class":"wdl"+(closed?" hot":"")}));
   sv.appendChild(el("line",{x1:98,y1:r.y,x2:closed?118:114,y2:closed?r.y:r.y-14,"class":"wdl"+(closed?" hot":"")}));
   sv.appendChild(el("line",{x1:118,y1:r.y,x2:150,y2:r.y,"class":"wdl"+(closed?" hot":"")}));
   sv.appendChild(el("text",{x:108,y:r.y+22,"class":"wdt wds","text-anchor":"middle"},r.sw+": "+(closed?"closed":"open")));
   sv.appendChild(el("text",{x:108,y:r.y+36,"class":"wdt wds","text-anchor":"middle"},"across contacts "+st[1]));
   sv.appendChild(el("rect",{x:150,y:r.y-16,width:90,height:32,rx:6,"class":"wdb"+(st[2]!=="0 V"?" on":"")}));
   sv.appendChild(el("text",{x:195,y:r.y+4,"class":"wdt","text-anchor":"middle"},r.label));
   sv.appendChild(el("line",{x1:240,y1:r.y,x2:290,y2:r.y,"class":"wdl"+(st[2]!=="0 V"?" hot":"")}));
   sv.appendChild(el("text",{x:195,y:r.y+30,"class":"wdt wds","text-anchor":"middle"},"load "+st[2]));
  });
  // low voltage
  sv.appendChild(el("line",{x1:340,y1:40,x2:340,y2:320,"class":"wdl"}));sv.appendChild(el("text",{x:340,y:36,"class":"wdt wds","text-anchor":"middle"},"R"));
  sv.appendChild(el("line",{x1:580,y1:40,x2:580,y2:320,"class":"wdl"}));sv.appendChild(el("text",{x:580,y:36,"class":"wdt wds","text-anchor":"middle"},"C"));
  LOW.forEach(function(r){
   var st=r.f(cur),on=st[0];
   sv.appendChild(el("line",{x1:340,y1:r.y,x2:400,y2:r.y,"class":"wdl"+(on?" hot":"")}));
   sv.appendChild(el("rect",{x:400,y:r.y-14,width:110,height:28,rx:6,"class":"wdb"+(on?" on":"")}));
   sv.appendChild(el("text",{x:455,y:r.y+4,"class":"wdt wds","text-anchor":"middle"},r.label));
   sv.appendChild(el("line",{x1:510,y1:r.y,x2:580,y2:r.y,"class":"wdl"+(on?" hot":"")}));
   sv.appendChild(el("text",{x:455,y:r.y+26,"class":"wdt wds","text-anchor":"middle"},(on?"closed/on":"open/off")+" , reads "+st[1]));
  });
  sv.appendChild(el("text",{x:20,y:360,"class":"wdt wds"},"Orange wire = energized path at this stage. Voltages shown are for a healthy furnace."));
  sv.appendChild(el("text",{x:20,y:378,"class":"wdt wds"},"R is 24 V through the 3 A fuse; C is common."));
  sv.appendChild(el("text",{x:20,y:396,"class":"wdt wds"},"Series rule: an open switch in a 24 V chain drops all 24 V across itself."));
  var c=document.getElementById("wdcap");if(c)c.textContent=STAGES[cur][0]+": "+STAGES[cur][1];
 }
 function build(){
  var host=document.getElementById("fur");if(!host||document.getElementById("wdwrap"))return;
  var d=document.createElement("details");d.id="wdwrap";d.className="panel";
  d.innerHTML='<summary><strong>Wiring diagram (ladder)</strong></summary><p class="small">A reference like the diagram on the furnace door. Pick a stage to see what a healthy furnace reads. Use it to decide which part to test next.</p><div class="row" id="wdst" role="group" aria-label="Sequence stage"></div><p id="wdcap" class="small" aria-live="polite"></p><svg id="wd" viewBox="0 0 600 405" role="img" aria-label="Ladder wiring diagram of a gas furnace showing expected voltages by stage"></svg>';
  host.parentNode.appendChild(d);
  var b=document.getElementById("wdst");
  STAGES.forEach(function(s,i){var x=document.createElement("button");x.className="chip";x.textContent=(i)+" "+s[0];x.setAttribute("aria-pressed",i===cur?"true":"false");x.onclick=function(){cur=i;[].forEach.call(b.children,function(c,j){c.setAttribute("aria-pressed",j===cur?"true":"false")});draw()};b.appendChild(x)});
  draw();
 }
 build();
})();
