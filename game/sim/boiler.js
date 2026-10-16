(function(){
"use strict";
/* Boiler Diagnosis Simulator: residential gas hot-water (hydronic) boiler with zone valves. Illustrative values, plain JS, no network. */
var GATE={enabled:false,freeScenarios:["circulator"]};
var $=function(i){return document.getElementById(i)};
var save={done:{}};try{var sv=localStorage.getItem("hvacsim.boiler.v1");if(sv)save=JSON.parse(sv)||save}catch(e){}
function persist(){try{localStorage.setItem("hvacsim.boiler.v1",JSON.stringify(save))}catch(e){}}
/* 12 psi cold fill is illustrative: no manufacturer source found, check the maker's instructions. 135 F minimum return and 40 F limit are from Burnham V11H and HP600 manuals.
   System: cast-iron gas boiler, 30 psi relief valve, 12 psi cold fill, 12 psi expansion-tank precharge, two zone valves, baseboard and radiators.
   p = hot system pressure (psi), pc = cold pressure, sup/ret = supply/return temp (F). Illustrative. */
var V={
 ok:{pc:12,p:18,sup:180,ret:160},
 circulator:{pc:12,p:20,sup:195,ret:118},
 airlock:{pc:12,p:18,sup:180,ret:165},
 expansion:{pc:14,p:30,sup:180,ret:160},
 fillvalve:{pc:3,p:5,sup:180,ret:160},
 zonevalve:{pc:12,p:18,sup:190,ret:160},
 tankloc:{pc:8,p:11,sup:180,ret:160},
 tees:{pc:12,p:18,sup:150,ret:136}
};
var SC=[
 {id:"circulator",f:"circulator",need:["circ"],t:"Boiler hot, no heat in the house",cust:"Mrs. Delgado",story:"The boiler is loud and very hot but every radiator is cold. It clicks off and on.",
  hints:["Compare supply and return temperatures after a few minutes, then check the circulator.","The supply is far hotter than the return, so water is not moving. The circulator has power but the shaft may be stuck."],
  why:"A hot boiler with a cold system and a very large supply-to-return difference (about 77 F here against a normal 20 F) means the water is not circulating. The circulator had 120 V at its terminals but the rotor was seized. With power off and the isolation flanges closed, replace the circulator, purge the air and verify normal flow."},
 {id:"airlock",f:"airlock",need:["purge","vent"],t:"Cold upstairs radiators and gurgling",cust:"Mr. Park",story:"First floor is warm. The second floor baseboard is cold and the pipes gurgle.",
  hints:["Check pressure, then feel the first-floor and second-floor piping.","System pressure is normal. The circulator runs. Air collects at the high point."],
  why:"Normal pressure and a running circulator with one cold upper zone and gurgling point to trapped air. The automatic air vent at the high point was stuck closed. Replace the vent and purge the zone by flushing water through the bleeder until the air stops. Do not just bleed it repeatedly without fixing the vent."},
 {id:"expansion",f:"expansion",need:["exptank"],t:"Relief valve dripping",cust:"The Haddads",story:"The relief valve drips when the boiler runs and stops when it cools down.",
  hints:["Read the pressure cold and hot. Then check the expansion tank.","Pressure climbs from 14 to 30 psi. Press the air valve on the tank."],
  why:"Heated water expands. The expansion tank's air cushion absorbs it. This tank had lost its air (the bladder failed and water came from the air valve), so pressure rose to the 30 psi relief setting. Replacing the relief valve would not fix the cause. Replace the tank and set its precharge to match the fill pressure (12 psi) before it goes on the system."},
 {id:"fillvalve",f:"fillvalve",need:["fillvalve"],t:"Low pressure and noise",cust:"Ms. Romano",story:"The pressure gauge reads almost nothing and the baseboards gurgle and tick.",
  hints:["Compare the pressure gauge with the fill valve inlet pressure.","The house supply is 60 psi but the system sits near 3 psi. Water is not getting through the fill valve."],
  why:"A hydronic system needs about 12 psi cold. The pressure-reducing fill valve was clogged with debris and not passing water. Replace the fill valve and set it to 12 psi cold. Do not hand-fill a hot, nearly dry boiler: cold water on hot cast iron can crack the sections. Burnham manuals say not to introduce return water more than 40 F colder than the idle boiler, and to keep return water at about 135 F or higher."},
 {id:"zonevalve",f:"zonevalve",need:["zvmotor"],t:"One zone never heats",cust:"Mr. Sullivan",story:"The upstairs thermostat clicks but the upstairs never warms. The downstairs is fine.",
  hints:["Is the upstairs zone valve getting 24 V when its thermostat calls?","The valve has 24 V but never opens, and the body opens fine by hand."],
  why:"The upstairs thermostat called and the zone valve motor had its 24 V, but it never drove the valve open. The valve body moved freely by hand, so the motor head was the failed part. Power off, replace the motor, and check that the end switch starts the circulator when the valve opens."},
 {id:"tankloc",f:"tankloc",need:["movetank","setfeed","purge"],t:"Air in the pipes every week, circulator hums",cust:"Mrs. Okafor",story:"I bleed the radiators every week and the air comes back. The circulator hums and rumbles. A plumber added a second zone last year.",
  hints:["Read the cold pressure, then work out the pressure at the top of the system.","Look at where the expansion tank is piped compared with the circulator."],
  why:"The expansion tank was piped on the circulator's discharge side, and the fill valve was set low. With the circulator running, parts of the system dropped below atmospheric pressure, so the float vent and fittings pulled air in. In this example the top of the system (about 15 ft above the gauge) saw only about 1.5 psi, below the 5 psi minimum often used as a rule of thumb. Fix: move the tank to the circulator inlet side, set the feed valve so the top of the system holds at least 5 psi (about 12 psi at the gauge for 15 ft), then purge the air and vent the circulator. Bleeding every week treats the symptom only. Source: Caleffi Idronics 2 (maker publication); the numbers here are practice examples."},
 {id:"tees",f:"tees",need:["restore|hsep"],t:"Supply temperature drops when the second zone starts",cust:"Mr. Brennan",story:"When the upstairs zone pump starts, the supply temperature falls and the boiler loop and zone loop seem to fight. A contractor reworked the piping last month.",
  hints:["Watch the supply temperature as the zone starts, then look closely at the piping where the boiler loop meets the zone loop.","The two tees are no longer close together. Look for bends and offsets between them."],
  why:"Closely spaced tees let the boiler loop and the zone loop share a very short common pipe, so each pump does its own job. The rework added elbows and an offset between the tees, so the zone circulator pulled flow through the boiler loop and mixed cooler water into the supply. Fix: restore a short, straight common section (tees close together, no fittings between them), or install a hydraulic separator. Caleffi notes that field offsets and bends often break the principle. No exact spacing figure is stated here: follow the maker's instructions. Numbers are practice examples."}
];
var PARTS=[
 {id:"tstat",l:"Thermostats",x:500,y:20,w:90,h:56},
 {id:"disc",l:"Boiler switch",x:500,y:96,w:90,h:46},
 {id:"aqua",l:"Aquastat / control",x:330,y:20,w:130,h:56},
 {id:"boiler",l:"Boiler and burner",x:30,y:20,w:150,h:90},
 {id:"gauge",l:"Pressure / temp gauge",x:200,y:20,w:110,h:56},
 {id:"relief",l:"Relief valve",x:200,y:96,w:110,h:46},
 {id:"expt",l:"Expansion tank",x:30,y:130,w:120,h:60},
 {id:"fill",l:"Fill valve",x:170,y:160,w:110,h:50},
 {id:"circ",l:"Circulator",x:30,y:230,w:120,h:56},
 {id:"pipes",l:"Supply and return piping",x:170,y:230,w:140,h:56},
 {id:"zv1",l:"Zone valve, 1st floor",x:340,y:200,w:130,h:50},
 {id:"zv2",l:"Zone valve, 2nd floor",x:340,y:260,w:130,h:50},
 {id:"vent",l:"Air vent / bleeder",x:340,y:330,w:130,h:50},
 {id:"rad",l:"2nd-floor baseboard",x:170,y:310,w:140,h:50}
];
var REP=[
 {id:"circ",l:"Replace circulator",c:260},{id:"zvmotor",l:"Replace zone valve motor",c:70},
 {id:"vent",l:"Replace automatic air vent",c:22},{id:"purge",l:"Purge air from the zone",c:0},
 {id:"exptank",l:"Replace expansion tank, precharge to 12 psi",c:75},{id:"relief",l:"Replace relief valve",c:55},
 {id:"fillvalve",l:"Replace fill valve, set to 12 psi cold",c:48},{id:"plug",l:"Cap the relief valve discharge",c:0},
 {id:"movetank",l:"Move the expansion tank to the circulator inlet side",c:140},{id:"setfeed",l:"Set the feed valve so the top of the system holds 5 psi or more",c:0},{id:"restore",l:"Re-pipe the tees close together with a short straight common section",c:120},{id:"hsep",l:"Install a hydraulic separator",c:340},
 {id:"zvbody",l:"Replace zone valve body",c:190},{id:"boilerr",l:"Replace the boiler",c:5400}
];
var S=null;
function fixed(a){return a.split("|").some(function(x){return S.done[x]})}
function active(){return S.sc.need.every(fixed)?null:S.sc.f}
function vals(){var f=active();return f===null?V.ok:V[f]}
function fmt(v,u){return(typeof v==="number"?(Math.abs(v)<10?v.toFixed(1):Math.round(v)):v)+(u?" "+u:"")}
function add(msg,cls){S.log.push(msg);var li=document.createElement("li");li.textContent=msg;if(cls)li.className=cls;$("log").appendChild(li)}
function pen(key,pts,msg){if(S.pen[key])return;S.pen[key]=pts;add(msg+" ("+(-pts)+")","badc")}
function show(id){["menu","work","report"].forEach(function(x){$(x).classList.toggle("hidden",x!==id)})}
function rd(v,u,e){return'<div class="reading">'+fmt(v,u)+'</div><p class="small">'+e+"</p>"}
var T={
 gauge:{c:"gauge",l:"Read pressure and temperature gauge (running)",k:"run",fn:function(){var v=vals();S.sawG=true;return'<div class="reading">'+Math.round(v.p)+' psi</div> <div class="reading">'+Math.round(v.sup)+' F supply</div><p class="small">Cold fill should be about 12 psi. Hot pressure normally rises to about 18 to 20 psi. Relief valve opens at 30 psi.</p>'}},
 cold:{c:"gauge",l:"Read system pressure with the boiler cold",k:"any",fn:function(){return rd(vals().pc,"psi","Cold fill target: about 12 psi")}},
 ret:{c:"pipes",l:"Supply and return pipe temperatures (running)",k:"run",fn:function(){var v=vals();S.sawT=true;return rd(v.sup+" F / "+v.ret+" F","","Supply and return. A normal difference at the boiler is about 20 F")}},
 feel:{c:"pipes",l:"Feel pipes on 1st and 2nd floor (running)",k:"run",fn:function(){var f=active();if(!S.ppe){pen("burn",10,"You touched hot piping without gloves");}return f==="airlock"?"First floor piping is hot. Second floor piping is lukewarm and you hear water and air gurgling.":f==="circulator"?"Boiler outlet is too hot to hold. The return near the boiler is cool. House piping is cold.":f==="zonevalve"?"First floor piping is hot. The second floor feed is cold and silent.":f==="tankloc"?"Piping is warm. You hear air moving at the top floor and the pump hums.":f==="tees"?"The boiler-loop return gets hotter and the zone supply stays only warm when the zone pump runs.":"Both floors' piping is hot to the touch."}},
 circv:{c:"circ",l:"Voltage at circulator terminals (live, calling)",k:"live",fn:function(){return rd(118,"VAC","About 120 VAC when the zone calls")}},
 circs:{c:"circ",l:"Try to spin the circulator shaft by hand (power off)",k:"dead",fn:function(){return active()==="circulator"?"The shaft will not turn. It is seized.":"The shaft spins freely."}},
 zvv:{c:"zv2",l:"Voltage at 2nd-floor zone valve motor (live, 2nd floor calling)",k:"live",fn:function(){return rd(24.2,"VAC","About 24 VAC when it calls")}},
 zvm:{c:"zv2",l:"Open the 2nd-floor valve by hand lever",k:"any",fn:function(){return active()==="zonevalve"?"The lever moves easily and the valve body flows freely. The motor is not driving it.":"The valve opens and closes normally."}},
 zv1v:{c:"zv1",l:"Check 1st-floor zone valve operation",k:"any",fn:function(){return"First-floor valve opens when its thermostat calls."}},
 expv:{c:"expt",l:"Press the tank air valve (Schrader)",k:"any",fn:function(){return active()==="expansion"?"Water spits out of the air valve. The bladder has failed.":"Air only. The tank holds its precharge."}},
 expp:{c:"expt",l:"Tank precharge with a gauge (system pressure off)",k:"dead",fn:function(){return active()==="expansion"?"No air: nothing to read. Water came out of the valve.":active()==="tankloc"?rd(8,"psi","Precharge equals the low cold fill pressure here. The tank itself is fine."):rd(12,"psi","Precharge should equal the cold fill pressure, about 12 psi")}},
 fi:{c:"fill",l:"Fill valve inlet (house water) pressure",k:"any",fn:function(){return rd(60,"psi","City water pressure at the valve inlet")}},
 fo:{c:"fill",l:"Fill valve outlet pressure (system)",k:"any",fn:function(){return rd(vals().pc,"psi","Fill valve should hold the system near 12 psi")}},
 rv:{c:"relief",l:"Inspect relief valve",k:"any",fn:function(){var f=active();return f==="expansion"?"There is mineral crust at the outlet and it is damp. It opened at 30 psi.":"Dry and clean."}},
 av:{c:"vent",l:"Inspect the automatic air vent",k:"any",fn:function(){return active()==="airlock"?"The vent is stuck closed and crusted. No air or water comes out.":"The vent cap is loose and it passes air normally."}},
 rd:{c:"rad",l:"Feel 2nd-floor baseboard",k:"run",fn:function(){var f=active();return f==="airlock"?"The baseboard is cold at the top and slightly warm at the bottom. You can hear air.":f==="zonevalve"?"The baseboard is cold.":"The baseboard is warm to hot."}},
 sw:{c:"disc",l:"Voltage at boiler switch, load side",k:"any",fn:function(){if(!S.power)S.dead=true;return rd(S.power?118:0,"VAC",S.power?"About 120 VAC":"0 V: de-energized. Safe to proceed with electrical tests.")}},
 aq:{c:"aqua",l:"Read aquastat setting and display",k:"any",fn:function(){return rd("180 / 160","F","High limit about 180 F, low about 160 F. Settings look reasonable")}},
 tankpos:{c:"expt",l:"Check where the expansion tank connects",k:"any",fn:function(){return active()==="tankloc"?"The tank tee is on the circulator discharge side, after the pump.":"The tank connects on the inlet (suction) side of the circulator, close to the boiler."}},
 toph:{c:"gauge",l:"Work out pressure at the top of the system (15 ft above the gauge, cold)",k:"any",fn:function(){var t=Math.round((vals().pc-0.433*15)*10)/10;return rd(t,"psi","Gauge reading minus about 0.433 psi per foot of height. Many references want at least 5 psi at the top.")}},
 aira:{c:"vent",l:"Hold a wet finger at the float vent cap while the circulator runs",k:"run",fn:function(){return active()==="tankloc"?"The vent pulls air in instead of releasing it. You feel suction.":"The vent is quiet and passes air out only."}},
 circa:{c:"circ",l:"Listen to the circulator running",k:"run",fn:function(){return active()==="tankloc"?"It hums and rumbles. Air is in the pump volute.":active()==="circulator"?"It hums but the shaft does not turn.":"It runs smoothly and quietly."}},
 teep:{c:"pipes",l:"Inspect the piping where the boiler loop meets the zone loop",k:"any",fn:function(){return active()==="tees"?"The two tees are about 14 inches apart with two elbows and an offset in the pipe between them.":"The two tees are close together on a short, straight common pipe with no fittings between."}},
 supz:{c:"pipes",l:"Watch the supply temperature as the second zone starts",k:"run",fn:function(){return active()==="tees"?rd("180 to 150","F","The supply sags 30 F when the zone pump starts. Water is being pulled through the boiler loop."):rd("180 to 178","F","The supply holds steady when the zone starts.")}},
 calc:{c:"gauge",l:"Verify system: pressure and supply/return difference",k:"calc",fn:function(){var v=vals();return'<div class="reading">'+Math.round(v.p)+' psi</div> <div class="reading">dT '+Math.round(v.sup-v.ret)+' F</div><p class="small">Targets: 12 psi cold, 18 to 20 psi hot, dT about 20 F, all zones heating.</p>'}}
};
function dial(){return ""}
function renderMenu(){
 show("menu");var h='<h2>Choose a call</h2><p>A residential gas hot-water boiler with two zone valves. Find why the house is not heating, fix the real cause, and verify. First call is a free demo.</p><div class="grid">';
 SC.forEach(function(s,i){var lock=GATE.enabled&&GATE.freeScenarios.indexOf(s.id)<0,st=save.done[s.id];
  h+='<div class="card"><strong>'+s.t+'</strong><br><span class="small">'+s.cust+'</span><br><span class="small">Best: '+(st?st+"/100":"not yet")+'</span><br>'+(lock?'<span class="small">Premium call (placeholder gate)</span>':'<button class="btn" data-i="'+i+'">Start call</button>')+"</div>"});
 h+='</div><p class="small">Pressures and temperatures are typical residential values for illustration. Always follow the boiler maker\'s instructions and local code.</p>';
 $("menu").innerHTML=h;$("menu").querySelectorAll("button[data-i]").forEach(function(b){b.onclick=function(){start(+b.dataset.i)}});
}
function start(i){
 S={sc:SC[i],power:true,panel:false,call:false,ppe:false,ran:false,done:{},pen:{},tests:0,hints:0,costs:0,wrong:0,dead:false,vrun:false,sel:null,log:[],gok:false,sawG:false,sawT:false};
 show("work");$("log").innerHTML="";
 add("Work order: "+S.sc.t+". "+S.sc.cust+": "+S.sc.story);
 add("Put on PPE, set the thermostats to call for heat, run the boiler and gather data before touching parts.");
 drawUnit();renderBar();renderComp();renderRepair();$("meter").innerHTML='<strong>Meter</strong><br><span class="small">Choose a test to see a reading.</span>';
}
function renderBar(){
 var b=$("bar");b.innerHTML="";function chip(l,on,fn){var c=document.createElement("button");c.className="chip "+(on?"on":"off");c.textContent=l+": "+(on?"ON":"OFF");c.setAttribute("aria-pressed",on);c.onclick=fn;b.appendChild(c)}
 chip("PPE (glasses, gloves)",S.ppe,function(){S.ppe=!S.ppe;add(S.ppe?"PPE on.":"PPE off.");renderBar()});
 chip("Boiler switch",S.power,function(){S.power=!S.power;if(!S.power)S.dead=false;add(S.power?"Boiler switch ON.":"Boiler switch OFF. Verify dead with a meter before touching electrical parts.");renderBar()});
 chip("Thermostats calling for heat",S.call,function(){S.call=!S.call;add(S.call?"Both thermostats set to call for heat.":"Thermostats satisfied.");renderBar()});
 chip("Control cover open",S.panel,function(){S.panel=!S.panel;add(S.panel?"Control cover removed. Live terminals exposed if power is on.":"Cover back on.");renderBar()});
}
function drawUnit(){
 var s='<rect x="10" y="10" width="310" height="300" rx="8" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="6 4"/><text x="165" y="330" text-anchor="middle" font-size="12" fill="currentColor">Boiler room</text><rect x="320" y="190" width="170" height="210" rx="8" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="6 4"/><text x="405" y="418" text-anchor="middle" font-size="12" fill="currentColor">Upstairs and zones</text>';
 PARTS.forEach(function(p){s+='<g class="part" id="p-'+p.id+'" role="button" tabindex="0" aria-label="'+p.l+'"><rect x="'+p.x+'" y="'+p.y+'" width="'+p.w+'" height="'+p.h+'" rx="6"/><text x="'+(p.x+p.w/2)+'" y="'+(p.y+p.h/2+4)+'" text-anchor="middle">'+p.l+'</text></g>'});
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
 function out(h){m.innerHTML="<strong>"+t.l+"</strong><br>"+(typeof h==="string"&&h.charAt(0)!=="<"?"<p>"+h+"</p>":h)}
 if(t.k==="dead"){
  if(S.power){pen("liveohm",10,"Hands-on or resistance test with power on");out('<p class="badc">Pull the boiler switch first.</p>');return}
  if(!S.dead&&t.c==="circ")pen("nodead",5,"You did not verify the circuit was dead first");
  out(t.fn());return}
 if(t.k==="run"){
  if(active()==="circulator"&&!S.ran){}
  if(!S.power||!S.call||!S.ran){out("<p>The boiler must be running. Switch on, call for heat, then use Run boiler 10 min.</p>");return}
  out(t.fn());return}
 if(t.k==="live"){
  if(!S.power){out("<p>Boiler switch is off. Live tests need power on and the thermostats calling.</p>");return}
  if(!S.call){out("<p>Set the thermostats to call for heat first.</p>");return}
  if(!S.panel){out("<p>Remove the control cover to reach the terminals.</p>");return}
  if(!S.ppe)pen("liveppe",10,"You worked in a live panel without PPE");
  out(t.fn());return}
 if(t.k==="calc"){if(S.ran&&S.call&&S.power){var v=vals(),dt=v.sup-v.ret;out(t.fn());if(active()===null&&v.p>=17&&v.p<=21&&dt>=15&&dt<=25)S.gok=true}else out("<p>Run the boiler first.</p>");return}
 out(t.fn());
}
function runCycle(){
 if(!S.power){add("The boiler switch is off. Nothing can run.");return}
 if(!S.call){add("Set the thermostats to call for heat.");return}
 S.ran=true;var f=active();
 if(f===null){add("After 10 minutes the boiler cycles normally, both zones heat, supply is about 20 F above return and pressure holds near 18 psi.","good");if(!S.panel)S.vrun=true;else add("The cover is off. Replace it and run the verification again.","warnc");return}
 var L={circulator:"The burner fires and the boiler gets very hot and noisy. The circulator hums. The radiators stay cold and the burner short-cycles.",airlock:"First floor heats. The second floor stays cold, with gurgling and a little knocking.",expansion:"The boiler heats the house but the pressure gauge climbs and the relief valve starts to drip.",fillvalve:"The boiler fires but the gauge barely moves off zero. Pipes tick and gurgle.",zonevalve:"First floor heats. Upstairs calls for heat and you hear a click, but nothing opens.",tankloc:"The pump hums and the system gurgles. Air collects again at the top floor radiators and the vent hisses in air.",tees:"The first zone heats. When the second zone starts, the supply temperature sags and the boiler loop and zone loop seem to fight each other."};
 add(L[f],"warnc");
}
function renderRepair(){
 $("repair").innerHTML='<label for="rsel" class="small">Repair or replace</label><div class="row"><select id="rsel">'+REP.map(function(x){return'<option value="'+x.id+'">'+x.l+(x.c?" ($"+x.c+")":"")+"</option>"}).join("")+'<option value="csd1">Post-service safety test: low-water cutoff and high limit, record set point and trip value</option>'+'</select><button class="btn" id="rdo">Do it</button></div>';
 $("rdo").onclick=function(){doRepair($("rsel").value)};
}
function csdTest(){
 if(active()!==null){add("Fix the fault first, then test the safety devices.","warnc");return}
 if(!S.ran||!S.power||!S.call){add("Run the boiler first: the safety tests need it firing, with power on and calling for heat.","warnc");return}
 if(S.csd){add("Already done.");return}
 S.csd=1;add("Post-service test: with the burner firing, the low-water cutoff was tested at its test valve and locked the burner out at the cutoff point until manually reset. The high limit was tested and tripped just above its set point, then stayed off until manually reset. Written on the invoice: cutoff point, high limit set point 180 F, trip 182 F (examples).","good");
}
function doRepair(id){
 if(id==="csd1"){csdTest();return}
 var r=REP.filter(function(x){return x.id===id})[0];
 if(S.power){pen("liverepair",20,"You worked on a live boiler");add("Switch the boiler off before repairs.","badc");return}
 if(S.done[id]){add("Already done.");return}
 if(id==="plug"){pen("plug",40,"You capped a relief valve discharge. That is a serious safety violation: a boiler with a blocked relief valve can rupture");return}
 S.done[id]=1;S.costs+=r.c;
 var need=S.sc.need.some(function(n){return n.split("|").indexOf(id)>=0});
 if(need){add("Done: "+r.l+".","good")}else{S.wrong+=r.c;pen("wrong_"+id,15,"Unnecessary: "+r.l+" (the customer pays $"+r.c+")")}
}
function hint(){var h=S.sc.hints;if(S.hints>=h.length){add("No more hints.");return}add("Hint: "+h[S.hints],"warnc");S.hints++;pen("hint"+S.hints,5,"Hint used")}
function finish(){
 var ok=active()===null;
 var score=100;Object.keys(S.pen).forEach(function(k){score-=S.pen[k]});
 if(S.tests>14)score-=Math.min(15,S.tests-14);
 var checks=[["PPE worn",S.ppe],["Relief valve never capped",!S.pen.plug],["Root cause found",ok],["Verified: pressure and temperature difference in range",S.gok],["Verified with cover on and running",S.vrun],["Post-service safety test recorded (NJ advisory)",!!S.csd]];
 if(!ok)score=Math.min(score,25);else{if(!S.gok)score-=10;if(!S.vrun)score-=10;if(!S.csd)score-=5}
 score=Math.max(0,Math.min(100,Math.round(score)));
 if(ok&&(!save.done[S.sc.id]||save.done[S.sc.id]<score)){save.done[S.sc.id]=score;persist()}
 var grade=score>=90?"Master tech":score>=75?"Journeyman":score>=50?"Apprentice":"Needs more practice";
 $("report").innerHTML="<h2>"+(ok?"Call complete":"Call not finished")+"</h2><p><strong>Score "+score+"/100, "+grade+"</strong></p><div class='tw'><table><tr><th>Check</th><th>Result</th></tr>"+checks.map(function(c){return"<tr><td>"+c[0]+"</td><td class='"+(c[1]?"good":"badc")+"'>"+(c[1]?"Yes":"No")+"</td></tr>"}).join("")+"</table></div><p>Tests run: "+S.tests+". Parts and labor billed: $"+S.costs+(S.wrong?" (of which $"+S.wrong+" were not needed)":"")+".</p><h3>What was wrong</h3><p>"+S.sc.why+"</p><h3>Post-service safety test</h3><p>New Jersey's Bureau of Boiler and Pressure Vessel Compliance advisory (Sept. 6, 2023) says boilers must be tested after maintenance or repair, following ASME CSD-1 Part CM-100, with device operability and set points written in a log, invoice or other record. Penalties under N.J.A.C. 12:90-9.1 start at $500. The CSD-1 text itself is paywalled and not taught here: test the way the boiler maker's manual says, with a qualified person. Set points and trip values in this sim are examples."+(S.csd?" You ran the test and recorded the set points and trip values.":" You did not run or record the test, so an inspector would write up the invoice (minus 5).")+"</p><p class='small'>Educational simulation only. Boilers are pressure vessels: follow manufacturer instructions, local code and licensing rules.</p><p><button class='btn' id='again'>Back to calls</button></p>";
 show("report");$("again").onclick=renderMenu;$("again").focus();
}
$("runCycle").onclick=runCycle;$("hint").onclick=hint;$("finish").onclick=finish;
renderMenu();
try{window.SIMDATA=window.SIMDATA||{};window.SIMDATA["boiler"]={SC:SC,REP:(typeof REP!=="undefined"?REP:[]),PARTS:PARTS}}catch(e){}
})();
