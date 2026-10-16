(function(){
"use strict";
/* Heat Pump Diagnosis Simulator: R-410A air-source heat pump in heating mode. Illustrative values, plain JS, no network. */
var GATE={enabled:false,freeScenarios:["revvalve"]};
var $=function(i){return document.getElementById(i)};
var save={done:{}};try{var sv=localStorage.getItem("hvacsim.hp.v1");if(sv)save=JSON.parse(sv)||save}catch(e){}
function persist(){try{localStorage.setItem("hvacsim.hp.v1",JSON.stringify(save))}catch(e){}}
/* R-410A saturation: psig -> F, points from a published PT chart (BPA residential PTCS essentials), linear between */
var PT=[[50,1.5],[60,8.6],[70,15.1],[80,21],[90,26.4],[100,31.2],[110,35.5],[120,40.5],[130,44.7],[140,48.7],[150,52.5],[160,56.2],[170,59.8],[180,63.1],[190,66.4],[200,69.5],[210,72.6],[220,75.5],[230,78.4],[240,81.1],[250,83.8],[260,86.4],[270,88.9],[280,91.4],[290,93.8],[300,96.2],[320,100.7],[340,105.1],[360,109.2],[380,113.1],[400,117],[420,120.7],[440,124.2],[460,127.7],[480,131],[500,134],[520,137.3],[540,140.4]];
function sat(p){if(p<=PT[0][0])return PT[0][1];for(var i=1;i<PT.length;i++){if(p<=PT[i][0]){var a=PT[i-1],b=PT[i];return a[1]+(b[1]-a[1])*(p-a[0])/(b[0]-a[0])}}return PT[PT.length-1][1]}
var V={
 ok:{suc:78,sl:31,head:330,ll:93,amps:15.2,sup:104},
 revvalve:{suc:135,sl:52,head:190,ll:62,amps:11,sup:60},
 defsensor:{suc:52,sl:14,head:250,ll:78,amps:12,sup:84},
 lowcharge:{suc:55,sl:25,head:255,ll:82,amps:11.5,sup:88},
 dirtyfilter:{suc:80,sl:30,head:410,ll:98,amps:19,sup:122},
 defshort:{suc:70,sl:28,head:300,ll:90,amps:14,sup:92},
 contactor:{suc:118,sl:35,head:118,ll:35,amps:0,sup:100}
};
var SC=[
 {id:"wait",f:"wait",need:["explain"],doNothing:1,t:"New heat pump won't restart",cust:"Mr. Tanaka",story:"I turned it off and on and nothing happened. I'm sure it's broken.",
  hints:["Is there a fault code? Check the control's timers.","Compressors have a built-in off-delay."],
  why:"Nothing was wrong. The control enforces a delay (about 5 minutes on one maker's board) between compressor off and on, the fan waits about 20 seconds after defrost, and defrost only starts when the outdoor air is below about 50 F, the timer interval (about 90 minutes default on that board, with options) has elapsed and the coil is near freezing. The customer short-cycled the thermostat. Replacing the board or compressor would have cost money and fixed nothing. A forced-defrost or bypass jumper is a test aid only.",
  src:"Carrier 25HNB6 heat pump manual (one maker's example timings, shown as about)."},
 {id:"defshort",f:"defshort",need:["resensor"],t:"Steaming, defrosts every 15 minutes",cust:"The Whitfields",story:"The whole street can hear the whoosh. It defrosts all the time and the house is never warm.",
  hints:["Note the defrost interval and how long it lasts. What tells the board to defrost?","Look at the defrost sensor's position."],
  why:"Defrost starting about every 15 minutes and ending in seconds points to the control or the sensor: a bad control, a bad sensor, wrong sensor placement, or wind preventing normal termination. Here the sensor was hanging out of its well on the wrong tube. Reposition and secure it, shield the unit from wind without blocking coil airflow, and check refrigerant distribution if the coil frosts unevenly.",
  src:"Trane defrost control installation sheet."},
 {id:"revvalve",f:"revvalve",need:["recoverall","revvalve","charge"],t:"Blowing cool air in heating mode",cust:"Mr. Alvarez",story:"It is 35 F outside. The thermostat is set to heat but the vents blow cool air and the outdoor unit runs.",
  hints:["Run it, read both pressures and compare them with a normal heating system. Then check what the reversing valve coil is doing.","The coil has no voltage, which is right for heating. But the suction and discharge pressures are too close together and the two valve lines feel almost the same temperature."],
  why:"In heating the reversing valve coil is not energized on this system, so no voltage there is normal. Pressures that are too close together (high suction, low head), a very low temperature rise across the compressor and cool air at the registers mean the valve is leaking internally and is stuck between positions. The valve must be replaced: recover the refrigerant, braze in the new valve, evacuate and weigh in the nameplate charge. Never vent refrigerant."},
 {id:"defsensor",f:"defsensor",need:["defsensor"],t:"Outdoor unit covered in ice",cust:"Ms. Kowalski",story:"The outdoor coil is a block of ice, the house is cold, and the unit never seems to defrost.",
  hints:["Look at the outdoor coil, then at suction pressure and superheat.","Check the defrost sensor with power off. A cold sensor should read a definite resistance, not open."],
  why:"A heat pump collects frost in cold, damp weather and defrosts by briefly reversing the cycle. The defrost sensor on the outdoor coil tells the control when to do that. This sensor read open, so the control never started defrost and the coil iced over. That caused very low suction pressure and high superheat. Replace the sensor, then let the unit run a defrost cycle."},
 {id:"lowcharge",f:"lowcharge",need:["leak","charge"],ok:["recoverall"],t:"Weak heat, runs a lot",cust:"The Nguyens",story:"Heat is lukewarm and the aux heat comes on a lot. The system was topped off twice in two years.",
  hints:["Read gauges and temperatures, then calculate superheat and subcooling.","Low suction, high superheat and low subcooling. Only a leak removes refrigerant."],
  why:"Low suction pressure, high superheat (about 20 F) and low subcooling (about 3 F) point to a low charge. Charge is only lost through a leak, here a bad Schrader core at the outdoor service valve. Repair the leak first, then recover, evacuate and weigh in the nameplate charge. Topping off again would just repeat the problem."},
 {id:"dirtyfilter",f:"dirtyfilter",need:["filter"],t:"Heat trips on high pressure",cust:"Mr. O'Brien",story:"The heat shuts off after a few minutes and the vents feel weak.",
  hints:["Compare head pressure and subcooling with normal, then check airflow.","In heating the indoor coil is the condenser. Check the filter."],
  why:"In heating the indoor coil rejects heat. A clogged filter cuts airflow, so head pressure and subcooling rise and the supply air runs very hot. The fix is airflow, not refrigerant. Never adjust the charge to cover an airflow problem."},
 {id:"contactor",f:"contactor",need:["contactor"],t:"Outdoor unit silent, huge electric bill",cust:"Ms. Washington",story:"The house is warm but the bill doubled. The outdoor unit never starts and the vents blow hot air.",
  hints:["Is the outdoor unit running? Check the thermostat call, then voltage at the contactor coil and load side.","Coil has 24 V but the load side stays at 0 V."],
  why:"The contactor coil had 24 V and was pulling in, but the contacts were pitted and passed no voltage to the compressor and fan. The system fell back on electric aux heat, which costs far more than a working heat pump. Verify power is off, replace the contactor, and confirm the compressor and fan run."}
];
var PARTS=[
 {id:"tstat",l:"Thermostat",x:500,y:20,w:90,h:56},
 {id:"disc",l:"Disconnect",x:500,y:96,w:90,h:46},
 {id:"contactor",l:"Contactor",x:330,y:20,w:120,h:56},
 {id:"defrost",l:"Defrost sensor / board",x:330,y:96,w:130,h:60},
 {id:"fan",l:"Outdoor fan",x:30,y:20,w:120,h:60},
 {id:"cond",l:"Outdoor coil",x:30,y:96,w:120,h:90},
 {id:"comp",l:"Compressor",x:170,y:96,w:110,h:70},
 {id:"cap",l:"Capacitors",x:170,y:180,w:110,h:44},
 {id:"ports",l:"Service ports",x:170,y:30,w:110,h:50},
 {id:"revv",l:"Reversing valve",x:30,y:240,w:120,h:44},
 {id:"sline",l:"Suction line",x:170,y:240,w:130,h:44},
 {id:"evap",l:"Indoor coil",x:340,y:200,w:130,h:70},
 {id:"filter",l:"Air filter",x:340,y:290,w:130,h:44},
 {id:"blower",l:"Air handler / supply",x:340,y:350,w:130,h:50},
 {id:"leak",l:"Leak check (fittings)",x:30,y:310,w:120,h:50}
];
var REP=[
 {id:"filter",l:"Replace air filter",c:12},{id:"resensor",l:"Reposition and secure the defrost sensor",c:0},{id:"explain",l:"Wait 5 minutes, then explain the built-in delays to the customer",c:0,live:1},{id:"contactor",l:"Replace contactor",c:45},
 {id:"defsensor",l:"Replace defrost sensor",c:40},{id:"defboard",l:"Replace defrost control board",c:150},
 {id:"revvalve",l:"Replace reversing valve",c:380},{id:"leak",l:"Repair leak at service valve core",c:15},
 {id:"recoverall",l:"Recover all refrigerant to a recovery cylinder",c:0},{id:"charge",l:"Evacuate, then weigh in nameplate charge",c:60},
 {id:"topoff",l:"Add refrigerant by gauge feel (no scale)",c:40},{id:"fancap",l:"Replace fan run capacitor",c:28},
 {id:"compressor",l:"Replace compressor",c:900},{id:"txv",l:"Replace TXV",c:140}
];
var T={
 gauge:{c:"ports",l:"Read manifold gauges (system running)",k:"run",need:"g",fn:function(){var v=vals();S.sawG=true;S.g={suc:v.suc,head:v.head};
   return'<div class="row">'+dial(v.suc,150,"Low psig")+dial(v.head,600,"High psig")+'</div><p class="small">PT chart: low side saturation '+fmt(sat(v.suc),"F")+', high side saturation '+fmt(sat(v.head),"F")+". In heating the outdoor coil is the evaporator.</p>"}},
 sl:{c:"sline",l:"Suction line temperature near the outdoor service valve",k:"run",fn:function(){var v=vals();S.sawS=true;return rd(v.sl,"F","Compare with low-side saturation temperature")}},
 ll:{c:"cond",l:"Liquid line temperature at the outdoor service valve",k:"run",fn:function(){var v=vals();S.sawL=true;return rd(v.ll,"F","Compare with high-side saturation temperature")}},
 calc:{c:"ports",l:"Calculate superheat and subcooling",k:"calc",fn:function(){
   if(!S.sawG||!S.sawS||!S.sawL)return"Read the gauges, the suction line and the liquid line first.";
   var v=vals(),sh=v.sl-sat(v.suc),sc=sat(v.head)-v.ll;S.calc={sh:sh,sc:sc,f:active()};
   return'<div class="reading">SH '+Math.round(sh)+' F</div> <div class="reading">SC '+Math.round(sc)+' F</div><p class="small">Superheat = suction line temp minus low-side saturation. Subcooling = high-side saturation minus liquid line temp. Targets here: superheat 8 to 14 F, subcooling about 10 F (7 to 13).</p>'}},
 disc:{c:"disc",l:"Voltage at disconnect, load side",k:"any",fn:function(){if(!S.power)S.dead=true;return rd(S.power?238:0,"VAC",S.power?"About 240 VAC":"0 V: de-energized. Safe to proceed with electrical tests.")}},
 amb:{c:"comp",l:"Outdoor ambient temperature",k:"any",fn:function(){return rd(35,"F","Ambient at the unit. Damp and cold: frost likely")}},
 amps:{c:"comp",l:"Compressor amps (clamp, running)",k:"run",fn:function(){return rd(vals().amps,"A","Nameplate RLA 18 A")}},
 ret:{c:"blower",l:"Return and supply air temperatures",k:"any",fn:function(){var v=vals();return"Return 70 F, supply "+Math.round(v.sup)+" F. A heat pump typically raises air about 20 to 30 F."}},
 revv:{c:"revv",l:"Voltage at reversing valve coil (live, heating)",k:"live",fn:function(){return rd(0,"VAC","Heating: not energized on this system (energized in cooling). Zero is normal")}},
 revt:{c:"revv",l:"Feel the valve lines: compressor discharge vs suction",k:"run",fn:function(){return active()==="revvalve"?"The discharge line is only mildly warm and the suction line is nearly the same temperature. The valve is leaking by.":"The discharge line is hot and the suction line is cool, with a big difference."}},
 dint:{c:"defrost",l:"Watch the defrost interval and length (running)",k:"run",fn:function(){return active()==="defshort"?"Defrost starts about every 15 minutes (the board's timer options are about 30, 60, 90 or 120) and ends after about 8 seconds. The fan keeps running during defrost.":active()==="wait"?"No defrost is due. Outdoor air is above about 50 F or the timer has not elapsed.":"Defrost is infrequent and runs its full cycle."}},
 dsv:{c:"defrost",l:"Inspect the defrost sensor position",k:"any",fn:function(){return active()==="defshort"?"The sensor has slipped out of its well and is hanging on the wrong tube.":"The sensor sits in its well, secured on the correct tube."}},
 tmr:{c:"defrost",l:"Read the board's fault codes and delay timers",k:"any",fn:function(){return active()==="wait"?"No fault code. A compressor off-delay timer (about 5 minutes) is active. Fan waits about 20 seconds after defrost.":"No fault codes."}},
 wnd:{c:"cond",l:"Check wind and exposure at the outdoor coil",k:"any",fn:function(){return active()==="defshort"?"The unit sits on the windy side of the house with no shield. Wind is also a factor, but the sensor is the main problem.":"No unusual wind exposure."}},
 defs:{c:"defrost",l:"Defrost sensor resistance (power off)",k:"dead",fn:function(){return active()==="defsensor"?["OL","","A cold 10k sensor should read a definite value, roughly 20k to 30k ohms near freezing"]:[26,"kohm","Healthy: roughly 20k to 30k ohms near freezing"]}},
 cc:{c:"contactor",l:"Contactor coil voltage (live, thermostat calling)",k:"live",fn:function(){return rd(24.3,"VAC","About 24 VAC when calling")}},
 cl:{c:"contactor",l:"Contactor load-side voltage (live, thermostat calling)",k:"live",fn:function(){return active()==="contactor"?rd(0,"VAC","Coil has 24 V but nothing comes out. Expected about 240 VAC"):rd(238,"VAC","About 240 VAC")}},
 fanv:{c:"fan",l:"Is the outdoor fan turning? (running)",k:"run",fn:function(){return"The fan is turning normally."}},
 cv:{c:"cond",l:"Inspect outdoor coil",k:"any",fn:function(){var f=active();return f==="defsensor"?"The coil is encased in a solid block of ice. The fan is running.":"The coil has light frost and some melted drips, which is normal for 35 F."}},
 ev:{c:"evap",l:"Inspect indoor coil",k:"any",fn:function(){return active()==="dirtyfilter"?"Coil is clean but covered in dust from the filter bypass.":"The coil is clean."}},
 fv:{c:"filter",l:"Inspect air filter",k:"any",fn:function(){return active()==="dirtyfilter"?"The filter is packed with dust and almost black.":"The filter is light and clean."}},
 capf:{c:"cap",l:"Compressor capacitor microfarads (power off, discharged)",k:"dead",fn:function(){return rd(34.9,"uF","Rated 35 uF, plus or minus 6 percent")}},
 leakd:{c:"leak",l:"Electronic leak detector at service valves and flares",k:"any",fn:function(){return S.sc.f==="lowcharge"&&!S.done.leak?"Detector alarms at the outdoor liquid service valve core.":"No leak indications."}}
};
var S=null;
function fixed(a){return a.split("|").some(function(x){return S.done[x]})}
function active(){return S.sc.need.every(fixed)&&!S.leaky?null:S.sc.f}
function vals(){var f=active();return f===null?V.ok:V[f]}
function fmt(v,u){return(typeof v==="number"?(Math.abs(v)<10?v.toFixed(1):Math.round(v)):v)+(u?" "+u:"")}
function add(msg,cls){S.log.push(msg);var li=document.createElement("li");li.textContent=msg;if(cls)li.className=cls;$("log").appendChild(li)}
function pen(key,pts,msg){if(S.pen[key])return;S.pen[key]=pts;add(msg+" ("+(-pts)+")","badc")}
function show(id){["menu","work","report"].forEach(function(x){$(x).classList.toggle("hidden",x!==id)})}
function dial(v,max,lab){var a=Math.PI*(1-Math.min(v,max)/max),x=60+44*Math.cos(a),y=64-44*Math.sin(a);
 return'<svg viewBox="0 0 120 80" width="150" role="img" aria-label="'+lab+' '+Math.round(v)+' psig" style="background:none;border:0"><path d="M16 64 A44 44 0 0 1 104 64" fill="none" stroke="currentColor" stroke-width="3"/><line x1="60" y1="64" x2="'+x.toFixed(1)+'" y2="'+y.toFixed(1)+'" stroke="#e2562f" stroke-width="3"/><circle cx="60" cy="64" r="4" fill="currentColor"/><text x="60" y="78" text-anchor="middle" font-size="10" fill="currentColor">'+lab+' '+Math.round(v)+'</text></svg>'}

function rd(v,u,e){return'<div class="reading">'+fmt(v,u)+'</div><p class="small">'+e+"</p>"}
function renderMenu(){
 show("menu");var h='<h2>Choose a call</h2><p>Same heat pump, different faults, in winter heating mode. Use gauges, temperatures, amps and voltages to find the cause, fix it properly, then verify. First call is a free demo.</p><div class="grid">';
 SC.forEach(function(s,i){var lock=GATE.enabled&&GATE.freeScenarios.indexOf(s.id)<0,st=save.done[s.id];
  h+='<div class="card"><strong>'+s.t+'</strong><br><span class="small">'+s.cust+'</span><br><span class="small">Best: '+(st?st+"/100":"not yet")+'</span><br>'+(lock?'<span class="small">Premium call (placeholder gate)</span>':'<button class="btn" data-i="'+i+'">Start call</button>')+"</div>"});
 h+='</div><p class="small">Saturation values come from a published R-410A pressure-temperature chart. Fault readings are illustrative. Related lessons: <a href="../../learn/pressure-temperature-basics.html">pressure-temperature basics</a>, <a href="../../learn/refrigerant-recovery-recycle-reclaim.html">recovery, recycle, reclaim</a>, <a href="../../learn/leaks-and-leak-repair-basics.html">leaks and leak repair</a>.</p>';
 $("menu").innerHTML=h;$("menu").querySelectorAll("button[data-i]").forEach(function(b){b.onclick=function(){start(+b.dataset.i)}});
}
function start(i){
 S={sc:SC[i],power:true,panel:false,call:false,ppe:false,gauges:false,ran:false,done:{},pen:{},tests:0,hints:0,costs:0,wrong:0,dead:false,vrun:false,leaky:false,calc:null,sel:null,log:[],sawG:false,sawS:false,sawL:false,gok:false,charged:false};
 show("work");$("log").innerHTML="";
 add("Work order: "+S.sc.t+". "+S.sc.cust+": "+S.sc.story);
 add("Put on PPE, connect gauges, set the thermostat to heat, run the system and gather data before touching parts.");
 drawUnit();renderBar();renderComp();renderRepair();$("meter").innerHTML='<strong>Meter</strong><br><span class="small">Choose a test to see a reading.</span>';
}
function renderBar(){
 var b=$("bar");b.innerHTML="";function chip(l,on,fn){var c=document.createElement("button");c.className="chip "+(on?"on":"off");c.textContent=l+": "+(on?"ON":"OFF");c.setAttribute("aria-pressed",on);c.onclick=fn;b.appendChild(c)}
 chip("PPE (glasses, gloves)",S.ppe,function(){S.ppe=!S.ppe;add(S.ppe?"PPE on.":"PPE off.");renderBar()});
 chip("Disconnect",S.power,function(){S.power=!S.power;if(!S.power)S.dead=false;add(S.power?"Disconnect closed (power on).":"Disconnect pulled. Verify dead with a meter before touching electrical parts.");renderBar()});
 chip("Thermostat calling for heating",S.call,function(){S.call=!S.call;add(S.call?"Thermostat set to HEAT above room temperature.":"Thermostat satisfied.");renderBar()});
 chip("Gauges connected",S.gauges,function(){if(!S.gauges&&!S.ppe)pen("gaugeppe",10,"You connected gauges without glasses and gloves (liquid refrigerant can cause frostbite)");S.gauges=!S.gauges;add(S.gauges?"Manifold connected to the service ports.":"Gauges removed.");renderBar()});
 chip("Outdoor panel open",S.panel,function(){S.panel=!S.panel;add(S.panel?"Outdoor control panel removed.":"Panel back on.");renderBar()});
}
function drawUnit(){
 var s=(window.ART?ART.back("ac"):'')+'<rect x="10" y="10" width="290" height="300" rx="8" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="6 4"/><text x="155" y="328" text-anchor="middle" font-size="12" fill="currentColor">Outdoor unit</text><rect x="320" y="190" width="170" height="220" rx="8" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="6 4"/><text x="405" y="428" text-anchor="middle" font-size="12" fill="currentColor">Indoor air handler</text>';
 PARTS.forEach(function(p){s+=(window.ART?ART.part("ac",p):'')+'<g class="part'+(window.ART&&ART.part("ac",p)?' art':'')+'" id="p-'+p.id+'" role="button" tabindex="0" aria-label="'+p.l+'"><rect x="'+p.x+'" y="'+p.y+'" width="'+p.w+'" height="'+p.h+'" rx="6"/><text x="'+(p.x+p.w/2)+'" y="'+(window.ART&&ART.part("ac",p)?(p.h>=44?p.y+p.h-5:p.y+p.h+12):p.y+p.h/2+4)+'" text-anchor="middle">'+p.l+'</text></g>'});
 $("fur").innerHTML=s;
 PARTS.forEach(function(p){var g=$("p-"+p.id);function go(){S.sel=p.id;document.querySelectorAll("svg .part").forEach(function(x){x.classList.remove("sel")});g.classList.add("sel");renderComp()}
  g.addEventListener("click",go);g.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();go()}})});
}
function renderComp(){
 var c=$("comp"),p=PARTS.filter(function(x){return x.id===S.sel})[0];
 if(!p){c.innerHTML="<strong>No part selected.</strong><br>Select a part to see its tests.";return}
 c.innerHTML="<strong>"+p.l+"</strong>";
 Object.keys(T).filter(function(k){return T[k].c===p.id}).forEach(function(k){var b=document.createElement("button");b.className="test";b.textContent=T[k].l;b.onclick=function(){doTest(k)};c.appendChild(b)});
 if(!c.querySelector(".test")){var n=document.createElement("p");n.className="small";n.textContent="No tests here. Try the neighbouring parts.";c.appendChild(n)}
}
function doTest(k){
 var t=T[k],m=$("meter");S.tests++;
 function out(h){m.innerHTML="<strong>"+t.l+"</strong><br>"+h}
 if(t.k==="dead"){
  if(S.power){pen("liveohm",10,"Capacitor or resistance test on a live circuit");out('<p class="badc">Meter fuse blown. Pull the disconnect first.</p>');return}
  if(!S.dead){pen("nodead",5,"You did not verify the circuit was dead first")}
  if(!S.panel){out("<p>Remove the outdoor panel to reach the capacitors.</p>");return}
  out(t.fn());return}
 if(t.k==="run"){
  if(active()==="contactor"&&S.ran){out("<p>The compressor and fan are not running. Only the indoor aux heat strips are on.</p>");return}
  if(!S.power||!S.call||!S.ran){out("<p>The system must be running. Close the disconnect, call for heating, then use Run heating 10 min.</p>");return}
  if(t.need==="g"&&!S.gauges){out("<p>Connect the gauges first.</p>");return}
  out(t.fn());return}
 if(t.k==="live"){
  if(!S.power){out("<p>The disconnect is open. Live voltage tests need power on and the thermostat calling.</p>");return}
  if(!S.call){out("<p>Set the thermostat to call for heating first.</p>");return}
  if(!S.panel){out("<p>Remove the outdoor panel to reach the terminals.</p>");return}
  if(!S.ppe)pen("liveppe",10,"You worked in a live panel without PPE");
  out(t.fn());return}
 if(t.k==="calc"){if(active()==="contactor"){out("<p>The compressor is not running, so there is nothing to calculate yet.</p>");return}if(S.ran&&S.call&&S.power){var r=t.fn();out(r);if(S.calc&&active()===null&&S.calc.sh>=8&&S.calc.sh<=14&&S.calc.sc>=7&&S.calc.sc<=13)S.gok=true}else out("<p>The system must be running.</p>");return}
 out(typeof t.fn()==="string"?"<p>"+t.fn()+"</p>":t.fn());
}
function runCycle(){
 if(!S.power){add("The disconnect is open. Nothing can run.");return}
 if(!S.call){add("Set the thermostat to call for heating.");return}
 S.ran=true;var f=active();
 if(f===null){add("After 10 minutes the heat pump runs smoothly and the house is warming. Supply air is about 34 F warmer than return.","good");if(!S.panel)S.vrun=true;else add("The panel is off. Replace it and run the verification again.","warnc");return}
 var L={wait:"You switch it off and on. Nothing starts. There is no fault code and the control shows a delay timer counting down.",defshort:"It goes into defrost about every 15 minutes, ends in seconds, the fan runs during defrost and the house never warms.",revvalve:"The outdoor unit runs but the air from the vents is cool, only a few degrees below room temperature.",defsensor:"The outdoor fan runs but airflow is blocked by ice. Heat from the vents is weak and fading. No defrost cycle starts.",lowcharge:"Warm air is weak, only about 18 F above return. The aux heat strips cut in often.",dirtyfilter:"Very hot air from weak vents. The system shuts off on high pressure after a few minutes.",contactor:"The indoor blower and aux heat strips run. The outdoor unit stays silent."};
 add(L[f],"warnc");
}
function renderRepair(){
 $("repair").innerHTML='<label for="rsel" class="small">Repair or replace</label><div class="row"><select id="rsel">'+REP.map(function(x){return'<option value="'+x.id+'">'+x.l+(x.c?" ($"+x.c+")":"")+"</option>"}).join("")+'</select><button class="btn" id="rdo">Do it</button></div>';
 $("rdo").onclick=function(){doRepair($("rsel").value)};
}
function doRepair(id){
 var r=REP.filter(function(x){return x.id===id})[0];
 if(S.power){pen("liverepair",20,"You worked on a live system");add("Pull the disconnect before repairs.","badc");return}
 if(S.done[id]){add("Already done.");return}
 if(id==="revvalve"&&!S.done.recoverall){pen("vent",30,"You opened the refrigerant circuit without recovering. That vents refrigerant, which is illegal");return}
 if(id==="leak"&&!S.done.recoverall&&false){return}
 if(id==="charge"){
  if(S.sc.f==="lowcharge"&&!S.done.leak){pen("leakycharge",20,"You charged a system that still leaks");S.done.charge=1;S.leaky=true;add("Charge was weighed in but the leak is still open. It will be low again.","badc");S.costs+=r.c;S.wrong+=r.c;return}
  if(S.sc.f==="revvalve"&&!S.done.revvalve){add("Replace the reversing valve before charging.");return}}
 S.done[id]=1;S.costs+=r.c;
 var need=S.sc.need.some(function(n){return n.split("|").indexOf(id)>=0})||(S.sc.ok&&S.sc.ok.indexOf(id)>=0);
 if(id==="topoff"){pen("topoff",20,"Topping off by gauge feel instead of weighing the charge");S.wrong+=r.c;return}
 if(need){add("Done: "+r.l+".","good")}else{S.wrong+=r.c;pen("wrong_"+id,15,"Unnecessary: "+r.l+" (the customer pays $"+r.c+")")}
 if(id==="leak"&&S.leaky){S.leaky=false}
 if(id==="leak"&&S.done.charge&&!S.leaky){delete S.done.charge;add("Leak repaired. Now recover, evacuate and weigh in the charge again.","warnc")}
}
function hint(){var h=S.sc.hints;if(S.hints>=h.length){add("No more hints.");return}add("Hint: "+h[S.hints],"warnc");S.hints++;pen("hint"+S.hints,5,"Hint used")}
function finish(){
 var ok=active()===null;
 var score=100;Object.keys(S.pen).forEach(function(k){score-=S.pen[k]});
 if(S.tests>14)score-=Math.min(15,S.tests-14);
 var checks=[["PPE worn",S.ppe],["No refrigerant vented or topped off",!S.pen.vent&&!S.pen.topoff],["Root cause found",ok],["Verified: superheat and subcooling in range after repair",S.gok],["Verified with panel on and running",S.vrun]];
 if(S.sc.doNothing){checks[3]=["No parts replaced",S.wrong===0];checks[4]=["Explained the delays to the customer",!!S.done.explain]}
 if(!ok)score=Math.min(score,25);else if(!S.sc.doNothing){if(!S.gok)score-=10;if(!S.vrun)score-=10}
 score=Math.max(0,Math.min(100,Math.round(score)));
 if(ok&&(!save.done[S.sc.id]||save.done[S.sc.id]<score)){save.done[S.sc.id]=score;persist()}
 var grade=score>=90?"Master tech":score>=75?"Journeyman":score>=50?"Apprentice":"Needs more practice";
 $("report").innerHTML="<h2>"+(ok?"Call complete":"Call not finished")+"</h2><p><strong>Score "+score+"/100, "+grade+"</strong></p><div class='tw'><table><tr><th>Check</th><th>Result</th></tr>"+checks.map(function(c){return"<tr><td>"+c[0]+"</td><td class='"+(c[1]?"good":"badc")+"'>"+(c[1]?"Yes":"No")+"</td></tr>"}).join("")+"</table></div><p>Tests run: "+S.tests+". Parts and labor billed: $"+S.costs+(S.wrong?" (of which $"+S.wrong+" were not needed)":"")+".</p><h3>What was wrong</h3><p>"+S.sc.why+"</p><p class='small'>Educational simulation only. Handling refrigerant requires EPA 608 certification. Never vent refrigerant.</p><p><button class='btn' id='again'>Back to calls</button></p>";
 show("report");$("again").onclick=renderMenu;$("again").focus();
}
$("runCycle").onclick=runCycle;$("hint").onclick=hint;$("finish").onclick=finish;
/* verify-dead: reading the disconnect line with the meter */
renderMenu();
try{window.SIMDATA=window.SIMDATA||{};window.SIMDATA["heatpump"]={SC:SC,REP:(typeof REP!=="undefined"?REP:[]),PARTS:PARTS}}catch(e){}
})();
