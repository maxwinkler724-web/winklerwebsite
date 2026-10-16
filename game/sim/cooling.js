(function(){
"use strict";
/* Cooling Diagnosis Simulator: R-410A split system with TXV. Illustrative values, plain JS, no network. */
var GATE={enabled:false,freeScenarios:["lowcharge"]};
var $=function(i){return document.getElementById(i)};
var save={done:{}};try{var sv=localStorage.getItem("hvacsim.cool.v1");if(sv)save=JSON.parse(sv)||save}catch(e){}
function persist(){try{localStorage.setItem("hvacsim.cool.v1",JSON.stringify(save))}catch(e){}}
/* R-410A saturation: psig -> F, points from a published PT chart (BPA residential PTCS essentials), linear between */
var PT=[[50,1.5],[60,8.6],[70,15.1],[80,21],[90,26.4],[100,31.2],[110,35.5],[120,40.5],[130,44.7],[140,48.7],[150,52.5],[160,56.2],[170,59.8],[180,63.1],[190,66.4],[200,69.5],[210,72.6],[220,75.5],[230,78.4],[240,81.1],[250,83.8],[260,86.4],[270,88.9],[280,91.4],[290,93.8],[300,96.2],[320,100.7],[340,105.1],[360,109.2],[380,113.1],[400,117],[420,120.7],[440,124.2],[460,127.7],[480,131],[500,134],[520,137.3],[540,140.4]];
function sat(p){if(p<=PT[0][0])return PT[0][1];for(var i=1;i<PT.length;i++){if(p<=PT[i][0]){var a=PT[i-1],b=PT[i];return a[1]+(b[1]-a[1])*(p-a[0])/(b[0]-a[0])}}return PT[PT.length-1][1]}
var V={
 ok:{suc:125,sl:52.6,head:365,ll:100,amps:15.8,sup:57},
 lowcharge:{suc:95,sl:55,head:300,ll:94,amps:12.1,sup:65},
 dirtycond:{suc:135,sl:57,head:440,ll:108,amps:19.6,sup:60},
 lowair:{suc:105,sl:36.5,head:335,ll:96,amps:13.2,sup:48},
 overcharge:{suc:140,sl:58,head:440,ll:102,amps:19,sup:59},
 condfan:{suc:145,sl:62,head:500,ll:118,amps:22.4,sup:61},
 kink:{suc:98,sl:57,head:345,ll:96,llx:78,amps:11.2,sup:66},
 txvclosed:{suc:62,sl:50,head:300,ll:88,amps:11.8,sup:68},
 restrict:{suc:100,sl:56,head:340,ll:83,amps:11,sup:66}
};
var SC=[
 {id:"kink",f:"kink",need:["recoverall","linefix","charge"],t:"Topped off twice, still weak and sweaty",cust:"Ms. Brooks",story:"Weak cooling and a cold, sweaty spot on the line. The last tech topped it off twice.",
  hints:["Superheat is high and suction is low. Compare liquid line temperature at the condenser with the temperature at the TXV inlet.","Subcooling at the condenser looks normal, but the liquid line drops in temperature before the TXV."],
  why:"High superheat with low suction pressure can look like undercharge, but an undercharge shows low subcooling. Here subcooling at the condenser was normal while the liquid line was much colder at the TXV inlet, with flash gas past a crimp in the line set. That is a restriction upstream of the metering device. Recover, remove the crimp or replace the section, evacuate and weigh in the nameplate charge. Topping off to chase pressure would have overcharged it.",
  src:"Danfoss TXV guidance; ClimateMaster TXV diagnostic bulletin."},
 {id:"txvclosed",f:"txvclosed",need:["recoverall","txv","charge"],t:"Frosted valve, someone added refrigerant",cust:"Mr. Singh",story:"Cooling struggles and the little valve at the indoor coil is frosted. The last tech added refrigerant.",
  hints:["Check airflow, charge and bulb mounting first. Then do the bulb response test.","Warming the bulb should raise suction pressure while the compressor runs."],
  why:"Low suction with very high superheat can come from low charge or from a failed (closed) TXV, a lost bulb charge or a plugged strainer. Calculate superheat and subcooling, check airflow and bulb mounting (clamped to the suction line, pasted and insulated), then do the bulb response test: warming the bulb should raise suction pressure and chilling it should lower it. This bulb did neither, so the valve was bad. Recover the refrigerant before replacing it.",
  src:"ClimateMaster TXV bulletin; Danfoss TXV guidance (bulb placement, insulation, settling time after adjustment)."},
 {id:"lowcharge",f:"lowcharge",need:["leak","charge"],ok:["recoverall"],t:"Weak cooling, ice on the line",cust:"Mrs. Rivera",story:"The house won't cool below 80 and there was ice on the pipe outside last night.",
  hints:["Run the system, connect gauges and read both pressures. Then compare line temperatures with the PT chart.","Low suction, high superheat and low subcooling. Refrigerant is only lost through a leak."],
  why:"Low suction pressure, high superheat (about 26 F) and low subcooling (about 2 F) together point to a low charge. Charge is only lost through a leak, so find and repair it first, then recover, evacuate and weigh in the nameplate charge. Adding refrigerant by gauge feel without fixing the leak is wasteful and illegal to vent."},
 {id:"dirtycond",f:"dirtycond",need:["coil"],t:"Runs all day, high bill",cust:"Mr. Chen",story:"It runs constantly and the outdoor unit is very hot.",
  hints:["Check the amps and head pressure, then look at the outdoor coil.","High head, high subcooling, high amps."],
  why:"High head pressure, high subcooling and high compressor amps with normal superheat point to poor heat rejection at the condenser. The coil was matted with cottonwood and dirt. Clean it from the inside out with the power off. Do not adjust the charge."},
 {id:"lowair",f:"lowair",need:["filter"],t:"Ice on the indoor coil",cust:"Ms. Patel",story:"Air from the registers is weak and the pipe at the air handler is frosted.",
  hints:["Very low superheat and a large temperature drop across the coil point to airflow.","Check the filter and the evaporator coil."],
  why:"Low suction pressure with very low superheat (about 3 F), a large supply-air temperature drop and ice on the coil point to low airflow over the evaporator, not low charge. The filter was clogged. Adding refrigerant would have made it worse."},
 {id:"overcharge",f:"overcharge",need:["recover"],t:"High pressures after a recharge",cust:"Mr. Okafor",story:"Someone topped it off last week. Now it cools but trips on high pressure now and then.",
  hints:["Compare subcooling with the 10 F target.","Subcooling is about 22 F while the coil is clean."],
  why:"High head pressure, high subcooling (about 22 F) and slightly low superheat with a clean coil and good airflow indicate too much refrigerant. Recover excess charge, weighing what you remove, until subcooling reaches the 10 F target."},
 {id:"condfan",f:"condfan",need:["fancap"],t:"Humming outdoor unit",cust:"The Garcias",story:"The outdoor unit hums and gets very hot but the fan blades do not move.",
  hints:["Check whether the condenser fan is turning, and amps.","Fan hums but does not turn. Test the fan run capacitor with power off, discharged."],
  why:"A fan motor that hums and does not turn usually has a weak run capacitor (here about 2.8 uF against a 5 uF rating). With no airflow the head pressure rises and the compressor may trip on overload. Disconnect and discharge before touching a capacitor."},
 {id:"restrict",f:"restrict",need:["recoverall","drier","charge"],t:"Cold spot on a copper line",cust:"Ms. Brooks",story:"Weak cooling, and a frosty spot on a line near the outdoor unit.",
  hints:["Superheat is very high and suction is low, but subcooling is also high.","Feel for a temperature drop across the filter drier."],
  why:"High superheat with low suction pressure and high subcooling, plus a frosty drier, points to a liquid-line restriction. Recover the refrigerant, replace the filter drier, evacuate and weigh in the nameplate charge. Never vent refrigerant."}
];
var PARTS=[
 {id:"tstat",l:"Thermostat",x:500,y:20,w:90,h:56},
 {id:"disc",l:"Disconnect",x:500,y:96,w:90,h:46},
 {id:"fan",l:"Condenser fan",x:30,y:20,w:120,h:60},
 {id:"cond",l:"Condenser coil",x:30,y:96,w:120,h:90},
 {id:"comp",l:"Compressor",x:170,y:96,w:110,h:70},
 {id:"cap",l:"Capacitors",x:170,y:180,w:110,h:44},
 {id:"ports",l:"Service ports",x:170,y:30,w:110,h:50},
 {id:"drier",l:"Filter drier",x:30,y:240,w:120,h:44},
 {id:"sline",l:"Suction line",x:170,y:240,w:130,h:44},
 {id:"evap",l:"Evaporator coil",x:340,y:200,w:130,h:70},
 {id:"filter",l:"Air filter",x:340,y:290,w:130,h:44},
 {id:"blower",l:"Air handler / supply",x:340,y:350,w:130,h:50},
 {id:"leak",l:"Leak check (fittings)",x:30,y:310,w:120,h:50},
 {id:"txvp",l:"TXV and bulb",x:330,y:150,w:130,h:40}
];
var REP=[
 {id:"coil",l:"Wash condenser coil inside out",c:0},{id:"filter",l:"Replace air filter",c:12,panel:false},
 {id:"fancap",l:"Replace fan run capacitor",c:28},{id:"fanmotor",l:"Replace condenser fan motor",c:165},
 {id:"leak",l:"Repair leak at indoor flare fitting",c:15},{id:"recoverall",l:"Recover all refrigerant to a recovery cylinder",c:0},
 {id:"drier",l:"Replace filter drier",c:35},{id:"linefix",l:"Remove the crimp: replace that section of line",c:55},{id:"charge",l:"Evacuate, then weigh in nameplate charge",c:60},
 {id:"recover",l:"Recover excess charge to 10 F subcooling (weigh it)",c:0},
 {id:"topoff",l:"Add refrigerant by gauge feel (no scale)",c:40},
 {id:"txv",l:"Replace TXV",c:140},{id:"compressor",l:"Replace compressor",c:900},{id:"blower",l:"Replace blower motor",c:280}
];
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

var T={
 gauge:{c:"ports",l:"Read manifold gauges (system running)",k:"run",need:"g",fn:function(){var v=vals();S.sawG=true;S.g={suc:v.suc,head:v.head};
   return'<div class="row">'+dial(v.suc,150,"Low psig")+dial(v.head,600,"High psig")+'</div><p class="small">PT chart: low side saturation '+fmt(sat(v.suc),"F")+', high side saturation '+fmt(sat(v.head),"F")+".</p>"}},
 sl:{c:"sline",l:"Suction line temperature near the outdoor service valve",k:"run",fn:function(){var v=vals();S.sawS=true;return rd(v.sl,"F","Compare with low-side saturation temperature")}},
 ll:{c:"drier",l:"Liquid line temperature at the condenser outlet",k:"run",fn:function(){var v=vals();S.sawL=true;return rd(v.ll,"F","Compare with high-side saturation temperature")}},
 llx:{c:"drier",l:"Liquid line temperature at the TXV inlet",k:"run",fn:function(){var v=vals();return rd(v.llx||v.ll,"F","Should be within a few degrees of the condenser outlet. A big drop means flash gas")}},
 cr:{c:"drier",l:"Inspect the liquid line routing",k:"any",fn:function(){return active()==="kink"?"The liquid line is crimped where it passes behind the wall bracket, with frost just past the crimp.":"The line set is straight and unobstructed."}},
 txr:{c:"txvp",l:"Bulb response test: warm it, then chill it (running)",k:"run",fn:function(){return active()==="txvclosed"?"Warming the bulb in your hand does not raise suction pressure. Chilling it in ice water does not lower it. The valve is not responding.":"Warming raises suction pressure and ice water lowers it. The valve responds. Let it settle 10 to 15 minutes after any change."}},
 txm:{c:"txvp",l:"Inspect TXV, equalizer line and bulb mounting",k:"any",fn:function(){return active()==="txvclosed"?"The bulb is clamped on the suction line, pasted and insulated correctly. The valve body and equalizer line are frosted.":"Bulb is clamped, pasted and insulated. No frost on the valve."}},
 drv:{c:"drier",l:"Feel temperature drop across the filter drier",k:"run",fn:function(){return active()==="restrict"?"The outlet is far colder than the inlet and has frost on it.":"Inlet and outlet feel the same."}},
 calc:{c:"ports",l:"Calculate superheat and subcooling",k:"calc",fn:function(){
   if(!S.sawG||!S.sawS||!S.sawL)return"Read the gauges, the suction line and the liquid line first.";
   var v=vals(),sh=v.sl-sat(v.suc),sc=sat(v.head)-v.ll;S.calc={sh:sh,sc:sc,f:active()};
   return'<div class="reading">SH '+Math.round(sh)+' F</div> <div class="reading">SC '+Math.round(sc)+' F</div><p class="small">Superheat = suction line temp minus low-side saturation. Subcooling = high-side saturation minus liquid line temp. Targets: superheat 8 to 14 F, subcooling about 10 F (7 to 13).</p>'}},
 disc:{c:"disc",l:"Voltage at disconnect, load side",k:"any",fn:function(){if(!S.power)S.dead=true;return rd(S.power?238:0,"VAC",S.power?"About 240 VAC":"0 V: de-energized. Safe to proceed with electrical tests.")}},
 amb:{c:"comp",l:"Outdoor ambient temperature",k:"any",fn:function(){return rd(95,"F","Ambient at the unit")}},
 amps:{c:"comp",l:"Compressor amps (clamp, running)",k:"run",fn:function(){return rd(vals().amps,"A","Nameplate RLA 18 A")}},
 ret:{c:"blower",l:"Return and supply air temperatures",k:"run",fn:function(){var v=vals();return"Return 75 F, supply "+Math.round(v.sup)+" F, delta T "+Math.round(75-v.sup)+" F (typical range about 16 to 22 F)."}},
 fanv:{c:"fan",l:"Is the condenser fan turning? (running)",k:"run",fn:function(){return active()==="condfan"?"The motor hums but the blades are not turning.":"The fan is turning normally."}},
 cv:{c:"cond",l:"Inspect condenser coil",k:"any",fn:function(){return active()==="dirtycond"?"The coil is matted with cottonwood and dirt.":"The coil looks clean."}},
 ev:{c:"evap",l:"Inspect evaporator coil",k:"any",fn:function(){var f=active();return f==="lowair"?"Ice is building on the coil and the suction line.":f==="lowcharge"?"Light frost near the coil outlet.":"The coil is clean and wet only from normal condensation."}},
 fv:{c:"filter",l:"Inspect air filter",k:"any",fn:function(){return active()==="lowair"?"The filter is packed with dust and almost black.":"The filter is light and clean."}},
 capf:{c:"cap",l:"Fan capacitor microfarads (power off, discharged)",k:"dead",fn:function(){return active()==="condfan"?rd(2.8,"uF","Rated 5 uF, plus or minus 6 percent"):rd(5.1,"uF","Rated 5 uF, plus or minus 6 percent")}},
 capc:{c:"cap",l:"Compressor capacitor microfarads (power off, discharged)",k:"dead",fn:function(){return rd(34.8,"uF","Rated 35 uF, plus or minus 6 percent")}},
 leakd:{c:"leak",l:"Electronic leak detector at flares, service valves and coil",k:"any",fn:function(){return S.sc.f==="lowcharge"&&!S.done.leak?"Detector alarms at the indoor coil flare fitting.":"No leak indications."}}
};
function rd(v,u,e){return'<div class="reading">'+fmt(v,u)+'</div><p class="small">'+e+"</p>"}
function renderMenu(){
 show("menu");var h='<h2>Choose a call</h2><p>Same system, different faults. Use gauges, temperatures and amps to find the cause, fix it properly, then verify with superheat and subcooling. First call is a free demo.</p><div class="grid">';
 SC.forEach(function(s,i){var lock=GATE.enabled&&GATE.freeScenarios.indexOf(s.id)<0,st=save.done[s.id];
  h+='<div class="card"><strong>'+s.t+'</strong><br><span class="small">'+s.cust+'</span><br><span class="small">Best: '+(st?st+"/100":"not yet")+'</span><br>'+(lock?'<span class="small">Premium call (placeholder gate)</span>':'<button class="btn" data-i="'+i+'">Start call</button>')+"</div>"});
 h+='</div><p class="small">Saturation values come from a published R-410A pressure-temperature chart. Fault readings are illustrative. Related lessons: <a href="../../learn/pressure-temperature-basics.html">pressure-temperature basics</a>, <a href="../../learn/refrigerant-recovery-recycle-reclaim.html">recovery, recycle, reclaim</a>, <a href="../../learn/leaks-and-leak-repair-basics.html">leaks and leak repair</a>.</p>';
 $("menu").innerHTML=h;$("menu").querySelectorAll("button[data-i]").forEach(function(b){b.onclick=function(){start(+b.dataset.i)}});
}
function start(i){
 S={sc:SC[i],power:true,panel:false,call:false,ppe:false,gauges:false,ran:false,done:{},pen:{},tests:0,hints:0,costs:0,wrong:0,dead:false,vrun:false,leaky:false,calc:null,sel:null,log:[],sawG:false,sawS:false,sawL:false,gok:false,charged:false};
 show("work");$("log").innerHTML="";
 add("Work order: "+S.sc.t+". "+S.sc.cust+": "+S.sc.story);
 add("Put on PPE, connect gauges, set the thermostat to cool, run the system and gather data before touching parts.");
 drawUnit();renderBar();renderComp();renderRepair();$("meter").innerHTML='<strong>Meter</strong><br><span class="small">Choose a test to see a reading.</span>';
}
function renderBar(){
 var b=$("bar");b.innerHTML="";function chip(l,on,fn){var c=document.createElement("button");c.className="chip "+(on?"on":"off");c.textContent=l+": "+(on?"ON":"OFF");c.setAttribute("aria-pressed",on);c.onclick=fn;b.appendChild(c)}
 chip("PPE (glasses, gloves)",S.ppe,function(){S.ppe=!S.ppe;add(S.ppe?"PPE on.":"PPE off.");renderBar()});
 chip("Disconnect",S.power,function(){S.power=!S.power;if(!S.power)S.dead=false;add(S.power?"Disconnect closed (power on).":"Disconnect pulled. Verify dead with a meter before touching electrical parts.");renderBar()});
 chip("Thermostat calling for cooling",S.call,function(){S.call=!S.call;add(S.call?"Thermostat set to COOL below room temperature.":"Thermostat satisfied.");renderBar()});
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
  if(!S.power||!S.call||!S.ran){out("<p>The system must be running. Close the disconnect, call for cooling, then use Run cooling 10 min.</p>");return}
  if(t.need==="g"&&!S.gauges){out("<p>Connect the gauges first.</p>");return}
  out(t.fn());return}
 if(t.k==="calc"){if(S.ran&&S.call&&S.power){var r=t.fn();out(r);if(S.calc&&active()===null&&S.calc.sh>=8&&S.calc.sh<=14&&S.calc.sc>=7&&S.calc.sc<=13)S.gok=true}else out("<p>The system must be running.</p>");return}
 out(typeof t.fn()==="string"?"<p>"+t.fn()+"</p>":t.fn());
}
function runCycle(){
 if(!S.power){add("The disconnect is open. Nothing can run.");return}
 if(!S.call){add("Set the thermostat to call for cooling.");return}
 S.ran=true;var f=active();
 if(f===null){add("After 10 minutes the system runs smoothly and the house is cooling. Supply air is about 18 F cooler than return.","good");if(!S.panel)S.vrun=true;else add("The panel is off. Replace it and run the verification again.","warnc");return}
 var L={kink:"Cooling is weak. A cold, sweaty spot with frost shows on the liquid line behind the air handler.",txvclosed:"Cooling struggles. The valve at the indoor coil is frosted and the suction line is warm.",lowcharge:"After 10 minutes the supply air is only about 10 F cooler than return. The suction line looks frosty near the coil.",dirtycond:"The outdoor unit is very hot to the touch and the compressor is running loudly. Supply air is cool but not great.",lowair:"Airflow from the registers is weak. Frost forms on the indoor coil and the supply air is very cold.",overcharge:"It cools but the outdoor unit is loud and hot and the compressor works hard.",condfan:"The compressor runs, the outdoor unit hums and gets very hot, and cooling fades.",restrict:"Cooling is weak and a cold spot with frost shows on a copper line."};
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
 if((id==="drier"||id==="linefix"||id==="txv")&&!S.done.recoverall){pen("vent",30,"You opened the refrigerant circuit without recovering. That vents refrigerant, which is illegal");return}
 if(id==="leak"&&!S.done.recoverall&&false){return}
 if(id==="charge"){
  if(S.sc.f==="lowcharge"&&!S.done.leak){pen("leakycharge",20,"You charged a system that still leaks");S.done.charge=1;S.leaky=true;add("Charge was weighed in but the leak is still open. It will be low again.","badc");S.costs+=r.c;S.wrong+=r.c;return}
  if(S.sc.f==="restrict"&&!S.done.drier){add("Replace the restriction before charging.");return}
  if(S.sc.f==="kink"&&!S.done.linefix){add("Remove the restriction before charging.");return}
  if(S.sc.f==="txvclosed"&&!S.done.txv){add("Replace the TXV before charging.");return}}
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
 if(!ok)score=Math.min(score,25);else{if(!S.gok)score-=10;if(!S.vrun)score-=10}
 score=Math.max(0,Math.min(100,Math.round(score)));
 if(ok&&(!save.done[S.sc.id]||save.done[S.sc.id]<score)){save.done[S.sc.id]=score;persist()}
 var grade=score>=90?"Master tech":score>=75?"Journeyman":score>=50?"Apprentice":"Needs more practice";
 $("report").innerHTML="<h2>"+(ok?"Call complete":"Call not finished")+"</h2><p><strong>Score "+score+"/100, "+grade+"</strong></p><div class='tw'><table><tr><th>Check</th><th>Result</th></tr>"+checks.map(function(c){return"<tr><td>"+c[0]+"</td><td class='"+(c[1]?"good":"badc")+"'>"+(c[1]?"Yes":"No")+"</td></tr>"}).join("")+"</table></div><p>Tests run: "+S.tests+". Parts and labor billed: $"+S.costs+(S.wrong?" (of which $"+S.wrong+" were not needed)":"")+".</p><h3>What was wrong</h3><p>"+S.sc.why+"</p><p class='small'>Educational simulation only. Handling refrigerant requires EPA 608 certification. Never vent refrigerant.</p><p><button class='btn' id='again'>Back to calls</button></p>";
 show("report");$("again").onclick=renderMenu;$("again").focus();
}
$("runCycle").onclick=runCycle;$("hint").onclick=hint;$("finish").onclick=finish;
/* verify-dead: reading the disconnect line with the meter */
renderMenu();
try{window.SIMDATA=window.SIMDATA||{};window.SIMDATA["cooling"]={SC:SC,REP:(typeof REP!=="undefined"?REP:[]),PARTS:PARTS}}catch(e){}
})();
