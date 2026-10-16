(function(){
"use strict";
/* Service Call Simulator: gas furnace diagnosis. Plain JS, no network, saves stars on this device only. */
var GATE={enabled:false,freeScenarios:["igniter"]};
var $=function(i){return document.getElementById(i)};
var save={done:{}};try{var sv=localStorage.getItem("hvacsim.v1");if(sv)save=JSON.parse(sv)||save}catch(e){}
function persist(){try{localStorage.setItem("hvacsim.v1",JSON.stringify(save))}catch(e){}}

var PARTS=[
 {id:"tstat",l:"Thermostat",x:500,y:30,w:90,h:60},
 {id:"switch",l:"Service switch",x:500,y:130,w:90,h:50},
 {id:"flue",l:"Flue test port",x:220,y:2,w:110,h:22},
 {id:"inducer",l:"Inducer motor",x:140,y:30,w:110,h:60},
 {id:"pswitch",l:"Pressure sw.",x:262,y:36,w:90,h:44},
 {id:"board",l:"Board + fuse",x:366,y:30,w:104,h:76},
 {id:"limit",l:"High limit",x:280,y:136,w:80,h:36},
 {id:"valve",l:"Gas valve",x:140,y:290,w:110,h:40},
 {id:"igniter",l:"Igniter",x:170,y:222,w:60,h:28},
 {id:"sensor",l:"Flame sensor",x:282,y:222,w:88,h:28},
 {id:"blower",l:"Blower motor",x:150,y:354,w:150,h:56},
 {id:"cap",l:"Run capacitor",x:330,y:362,w:110,h:40},
 {id:"filter",l:"Air filter",x:14,y:330,w:96,h:70},
 {id:"rollout",l:"Rollout switch",x:20,y:236,w:100,h:30},
 {id:"trap",l:"Condensate trap",x:20,y:150,w:100,h:36}
];
var REPAIRS=[
 {id:"wire",l:"Repair pinched thermostat wire",c:0,panel:false},
 {id:"fuse",l:"Replace 3 A fuse",c:8},{id:"hose",l:"Clear pressure-switch tube",c:0},
 {id:"pswitch",l:"Replace pressure switch",c:38},{id:"inducer",l:"Replace inducer motor",c:185},
 {id:"igniter",l:"Replace igniter",c:48},{id:"cleanSensor",l:"Clean flame sensor (fine abrasive pad)",c:0},
 {id:"sensor",l:"Replace flame sensor",c:22},{id:"capacitor",l:"Replace blower run capacitor",c:24},
 {id:"filter",l:"Replace air filter",c:12,panel:false},{id:"blower",l:"Replace blower motor",c:280},
 {id:"valve",l:"Replace gas valve",c:120},{id:"board",l:"Replace control board",c:210},
 {id:"limit",l:"Replace high limit",c:30},{id:"transformer",l:"Replace transformer",c:60},
 {id:"flueclear",l:"Clear the blocked vent termination",c:0,panel:false},{id:"jumper",l:"Jumper out the rollout switch",c:0},
 {id:"tstatbatt",l:"Replace thermostat batteries",c:6,panel:false},
 {id:"clearflue",l:"Clear the blocked vent and flue",c:0,panel:false},{id:"drainclear",l:"Clear and refill the trap; pitch and insulate the drain",c:0},
 {id:"unjumper",l:"Remove the jumper wire from the pressure switch",c:0}
];
var SC=[
 {id:"igniter",f:"igniter",need:["igniter"],t:"Cold house on Maple Street",cust:"Mrs. Rivera",story:"No heat since this morning. The thermostat is calling, the house is 58 degrees.",
  hints:["Run a heat cycle and note where the sequence stops and what the board LED says.","The draft is proven and the board tried to light. Check what lights the gas, with power off."],
  why:"A hot surface igniter that reads open (OL) cannot warm up, so the board tries to ignite and locks out. The 120 V was present, so the fault was the igniter, not the board. Hold igniters by the base and never touch the element."},
 {id:"sensor",f:"sensor",need:["cleanSensor|sensor"],t:"Furnace shuts off after seconds",cust:"Mr. Chen",story:"It lights, then goes out and clicks again a few times, then nothing.",
  hints:["Burners light, so ignition and gas are fine. What proves flame to the board?","Measure flame current in microamps while the burners are lit."],
  why:"Oxide on the flame rod lowers flame current below what the board needs (often under about 1 microamp), so it shuts the gas. Cleaning with a fine abrasive pad, not sandpaper, usually restores a few microamps."},
 {id:"pressure",f:"pressure",need:["hose"],t:"Inducer runs, no heat",cust:"Ms. Patel",story:"I can hear a fan start, then it stops. No flame at all.",
  hints:["The inducer runs. What proves the draft to the board?","Check the voltage across the pressure switch contacts, then look at its tube."],
  why:"The pressure switch stayed open because condensate and debris blocked its tube, so the board never got proof of draft. Replacing a good switch would not have helped. Always check tubes and vent before parts."},
 {id:"inducer",f:"inducer",need:["inducer"],t:"Total silence",cust:"Mr. Okafor",story:"Thermostat calls but I hear nothing from the furnace.",
  hints:["Is power reaching the inducer connector during the call?","120 V present but no rotation points at the motor. Confirm with power off."],
  why:"120 V at the inducer plug with no rotation means the motor itself failed. Its windings read open. The pressure switch also stays open as a result, which is why the board shows the same code as a blocked tube."},
 {id:"fuse",f:"fuse",need:["fuse","wire"],t:"Dead furnace, dead board",cust:"The Garcias",story:"Nothing. No lights, no sound, no heat.",
  hints:["Is power reaching the board? Compare transformer secondary with the board.","The transformer is fine. Check the fuse with power off. Then ask why it blew."],
  why:"The 3 A low-voltage fuse blew because a thermostat wire was pinched in the cabinet and shorted. Replacing only the fuse would blow it again. Find the cause first. Never replace it with a bigger fuse."},
 {id:"filter",f:"filter",need:["filter"],t:"Heat quits after a couple of minutes",cust:"Ms. Brooks",story:"It heats a bit, then shuts off but the fan keeps running.",
  hints:["Burners run at first. What trips them after a short time?","Check the air filter and the high limit."],
  why:"A clogged filter restricts airflow, the heat exchanger overheats, and the high limit shuts the burners. The blower keeps running to cool down. Check the simple airflow causes before replacing a good limit."},
 {id:"rollout",f:"rollout",need:["flueclear"],t:"Heat quits, smells like exhaust",cust:"Mrs. Dubois",story:"The furnace starts, then shuts off after a few seconds. It has done this since the big windstorm.",
  hints:["The LED code is not one of the usual ones. Look at the legend.","A rollout switch opens when flame or heat escapes the combustion chamber. Look for a blocked vent."],
  why:"The flame rollout switch opened because a bird nest blocked the vent termination, so exhaust backed up into the burner area. It is a safety device. Never jumper it out or just reset it: that hides a carbon monoxide hazard. Clear the vent, then verify a normal cycle and test CO."},
 {id:"valve",f:"valve",need:["valve"],t:"Igniter glows, no flame",cust:"Mr. Nowak",story:"I can see the igniter glowing orange but the burners never light.",
  hints:["Igniter and inducer are fine. What opens the gas?","Check for 24 V at the gas valve during trial, then its coil with power off."],
  why:"The igniter glowed and the valve had 24 V, but the coil was open (OL) so the valve never opened. Replacing the board would not help. Shut off the gas, replace the valve, and check for leaks and proper manifold pressure after."},
 {id:"tstat",f:"tstat",need:["tstatbatt"],t:"Dead thermostat, cold house",cust:"Ms. Alvarado",story:"The house is 60 degrees. I turned the thermostat up and nothing happens.",
  hints:["Start at the thermostat before you open the furnace.","Look at the display."],
  why:"A battery-powered thermostat with dead batteries cannot call for heat, so the furnace never started. The most common cause is the simplest. Check at the thermostat first and save the customer a bill for a service call that is not needed."},
 {id:"flue",f:"flue",need:["clearflue"],t:"Fan runs, then nothing",cust:"Mr. Hughes",story:"It hums and the fan runs, but it never lights.",
  hints:["Is the switch open or closed? Measure the draft.","Draft is weak. Look outside at the vent."],
  why:"The pressure switch must close during pre-purge. A manometer showed draft below the switch's closing pressure, and a bird nest in the vent termination was the cause. The switch itself is the least common failure. Check the inducer, tubing, flue and drain before parts. A blocked flue can mean carbon monoxide: never jumper the switch.",
  src:"HVAC School: properly diagnosing a gas furnace pressure switch."},
 {id:"trap",f:"trap",need:["drainclear"],t:"Dies on the coldest mornings",cust:"Ms. Reyes",story:"It works all fall, then won't start on the coldest mornings. It starts later when it warms up.",
  hints:["The switch is not proving at start. What restricts draft in a condensing furnace?","Look at the condensate trap and the drain outside."],
  why:"In a condensing furnace the condensate path can restrict or freeze in cold weather. Water backs into the secondary heat exchanger, draft drops and the pressure switch will not prove. Clear and refill the trap, pitch and insulate the drain or reroute it inside the conditioned space, and add a heat cable only where the maker allows. Do not use boiling water on plastic fittings you will reuse.",
  src:"HVAC School pressure switch article."},
 {id:"jump",f:"jump",need:["unjumper","clearflue"],t:"The last guy put in a wire",cust:"Mr. Baptiste",story:"He said the part was bad and put in a wire. Now it keeps cycling and the CO alarm chirped.",
  hints:["Check the switch with the inducer off.","A bridged switch hides the real problem. Find it outside."],
  why:"A jumpered pressure switch reads closed even when the inducer is off, so the board correctly flags a switch that did not open. The jumper hid a partly blocked vent, which also let carbon monoxide rise. Remove the jumper, clear the blockage, replace the switch only if it tests bad, warn the owner and document it. Never bypass a safety control.",
  src:"HVAC School article (stuck-closed switch example); US Boiler air-proving switch logic."},
 {id:"blower",f:"blower",need:["capacitor"],t:"Burners on, no warm air",cust:"Mr. Lee",story:"The burners come on but no air comes out and then it shuts off.",
  hints:["The filter looks clean. Is the blower getting 120 V when it should run?","You hear a hum. Check the run capacitor with power off."],
  why:"A weak run capacitor (about 1.4 uF against a 7.5 uF rating) lets the motor hum without starting. The limit trips for lack of airflow, a similar symptom to a dirty filter. Discharge capacitors safely before touching them."}
];
var LED=[["6","Pressure switch closed when it should be open"],["5","Flame rollout open"],["1","Flame sense lockout"],["2","High limit open"],["3","Pressure switch not closing"],["4","Ignition failure"]];

var S=null;
function sc(){return S.sc}
function fixed(a){return a.split("|").some(function(x){return S.done[x]})}
function active(){
 var f=S.sc.f;
 if(f==="fuse")return S.done.fuse?null:"fuse";
 return S.sc.need.every(fixed)?null:f;
}
function stage(f){var m={fuse:0,tstat:0,inducer:1,pressure:2,igniter:3.5,valve:3.5,sensor:4,rollout:4.5,flue:2,trap:2,jump:4,blower:5,filter:5};return m[f]===undefined?5:m[f]}
function fmt(v,u){return(typeof v==="number"?(Math.abs(v)<10?v.toFixed(1):Math.round(v)):v)+" "+u}
var T={
 trw:{c:"tstat",l:"Measure R to W at thermostat (live, calling)",k:"live",fn:function(f){return[f==="fuse"?0:24.6,"VAC","22 to 28 VAC"]}},
 wirevis:{c:"tstat",l:"Inspect thermostat wiring (visual)",k:"visual",fn:function(f){return S.sc.f==="fuse"&&!S.done.wire?"One thermostat wire is pinched against the cabinet edge with cracked insulation.":"Thermostat wiring looks intact and neatly routed."}},
 sw:{c:"switch",l:"Voltage at service switch, load side",k:"live",any:true,fn:function(f){return[S.power?118:0,"VAC",S.power?"about 120 VAC":"0 V means dead. Do this before ohm tests."]}},
 xfmr:{c:"board",l:"Transformer secondary (live)",k:"live",fn:function(){return[27,"VAC","24 to 28 VAC"]}},
 brc:{c:"board",l:"Board R to C, after fuse (live)",k:"live",fn:function(f){return[f==="fuse"?0:25.8,"VAC","22 to 28 VAC"]}},
 fuset:{c:"board",l:"3 A fuse continuity (power off)",k:"dead",fn:function(f){return f==="fuse"?["OL","","Good fuse: near 0 ohms"]:[0.2,"ohm","Good fuse: near 0 ohms"]}},
 led:{c:"board",l:"Read board LED",k:"visual",any:true,fn:function(f){return ledText(f)}},
 ind120:{c:"inducer",l:"Inducer connector voltage during call (live)",k:"live",fn:function(f){return[stage(f)>=1?118:0,"VAC","about 120 VAC while energized"]}},
 indr:{c:"inducer",l:"Inducer winding resistance (power off)",k:"dead",fn:function(f){return f==="inducer"?["OL","","Windings: roughly 5 to 40 ohms"]:[14,"ohm","Windings: roughly 5 to 40 ohms"]}},
 psv:{c:"pswitch",l:"Voltage across pressure switch contacts (live)",k:"live",fn:function(f){return[stage(f)>=3?0.1:24.5,"VAC","Closed: near 0 V. Open: about 24 V"]}},
 psvis:{c:"pswitch",l:"Inspect pressure switch tube (power off)",k:"dead",fn:function(f){return f==="pressure"?"The tube holds water and debris. Air cannot pass.":"The tube is clear and dry."}},
 ign120:{c:"igniter",l:"Igniter connector voltage during warm-up (live)",k:"live",fn:function(f){return[stage(f)>=3?118:0,"VAC","about 120 VAC during warm-up"]}},
 ignr:{c:"igniter",l:"Igniter resistance (power off)",k:"dead",fn:function(f){return f==="igniter"?["OL","","Good igniter: tens of ohms"]:[62,"ohm","Good igniter: tens of ohms"]}},
 gv:{c:"valve",l:"Gas valve voltage during trial for ignition (live)",k:"live",fn:function(f){return[stage(f)>=3.5?24.3:0,"VAC","about 24 VAC during trial"]}},
 fs:{c:"sensor",l:"Flame signal in microamps (live, burners lit)",k:"live",fn:function(f){return[f==="sensor"?0.1:(f==="igniter"||f==="valve"||stage(f)<3.5?0:3.4),"uA","Healthy: roughly 2 to 6 uA. Under about 1 uA may lock out"]}},
 lim:{c:"limit",l:"Voltage across high limit (live, after cycle)",k:"live",fn:function(f){return[(f==="filter"||f==="blower")?24.4:0.1,"VAC","Closed: near 0 V. Open: about 24 V"]}},
 blw:{c:"blower",l:"Blower motor voltage after delay (live)",k:"live",fn:function(f){return[stage(f)>=5?118:0,"VAC","about 120 VAC when the blower should run"]}},
 blwv:{c:"blower",l:"Listen to blower compartment",k:"visual",any:true,fn:function(f){return f==="blower"?"A low hum, but the wheel does not turn.":"Blower is quiet when off."}},
 capf:{c:"cap",l:"Capacitance (power off, discharged)",k:"dead",fn:function(f){return f==="blower"?[1.4,"uF","Rated 7.5 uF, plus or minus 6 percent"]:[7.4,"uF","Rated 7.5 uF, plus or minus 6 percent"]}},
 filv:{c:"filter",l:"Inspect air filter",k:"visual",any:true,fn:function(f){return f==="filter"?"The filter is packed with dust and almost black.":"The filter is light gray and in good shape."}},
 valr:{c:"valve",l:"Gas valve coil resistance (power off)",k:"dead",fn:function(f){return f==="valve"?["OL","","Good coil: a few ohms to tens of ohms, not open"]:[28,"ohm","Good coil: a few ohms to tens of ohms, not open"]}},
 tsd:{c:"tstat",l:"Look at the thermostat display",k:"visual",any:true,fn:function(f){return f==="tstat"?"The display is blank. There is no response to the buttons.":"The display is lit and shows a call for heat."}},
 rov:{c:"rollout",l:"Voltage across rollout switch (live, after a cycle)",k:"live",fn:function(f){return[f==="rollout"?24.4:0.1,"VAC","Closed: near 0 V. Open: about 24 V"]}},
 rovis:{c:"rollout",l:"Inspect the vent termination outside",k:"visual",any:true,fn:function(f){return f==="rollout"?"A bird nest is packed into the vent termination. Exhaust cannot leave.":"The vent termination is clear."}},
 drft:{c:"pswitch",l:"Measure draft at the heat exchanger with a manometer (running)",k:"live",fn:function(f){return[f==="flue"?-0.1:f==="trap"?-0.15:-0.55,"in. w.c.","Needs to be stronger than the switch's closing pressure. A healthy draft is about -0.5 in. w.c. (one example)"]}},
 psoff:{c:"pswitch",l:"Voltage across pressure switch with the inducer OFF (live)",k:"live",fn:function(f){return[f==="jump"?0.1:24.5,"VAC","Open (about 24 V) when the inducer is off. Near 0 V means it is closed or bridged"]}},
 trv:{c:"trap",l:"Inspect the condensate trap and drain",k:"visual",any:true,fn:function(f){return f==="trap"?"The trap is partly clogged and the drain line outside is frozen solid. Water is backing up into the secondary heat exchanger.":"The trap is clear and the drain flows."}},
 fov:{c:"flue",l:"Inspect the vent termination outside",k:"visual",any:true,fn:function(f){return f==="flue"?"A bird nest and debris are packed into the vent termination.":f==="jump"?"The vent termination is partly blocked with debris.":"The vent termination is clear."}},
 jv:{c:"pswitch",l:"Inspect pressure switch wiring",k:"visual",any:true,fn:function(f){return f==="jump"?"A short wire jumper bridges the switch terminals. The last tech left it there.":"Wiring is factory. No jumpers."}},
 co:{c:"flue",l:"CO in flue gas (live, burners running)",k:"co",fn:function(f){return f===null&&S.ran?[7,"ppm","Typically under about 100 ppm air-free. Over limits: shut down"]:f==="jump"&&S.ran?[95,"ppm","Elevated and rising: shut down and find the blockage"]:["--","","No steady flame to sample"]}}
};
function ledText(f){var m={inducer:"3 flashes",pressure:"3 flashes",igniter:"4 flashes",valve:"4 flashes",rollout:"5 flashes",flue:"3 flashes",trap:"3 flashes",jump:"6 flashes",tstat:"Steady green: standby, no call for heat.",sensor:"1 flash",filter:"2 flashes",blower:"2 flashes"};
 if(f===null)return"Steady green: normal.";if(f==="fuse")return"No LED at all. The board has no power.";return S.ran?(m[f]||""):"Run a heat cycle first so the board can report."}

function add(msg,cls){S.log.push([msg,cls||""]);var li=document.createElement("li");li.textContent=msg;if(cls)li.className=cls;$("log").appendChild(li);li.scrollIntoView&&li.scrollIntoView({block:"nearest"})}
function pen(key,pts,msg){if(S.pen[key])return;S.pen[key]=pts;add(msg+" ("+(-pts)+")","badc")}

function renderMenu(){
 show("menu");var h='<h2>Choose a call</h2><p>Each call is a different fault on the same gas furnace. Finish with a safe, verified repair. First call is a free demo.</p><div class="grid">';
 SC.forEach(function(s,i){var lock=GATE.enabled&&GATE.freeScenarios.indexOf(s.id)<0;var st=save.done[s.id];
  h+='<div class="card"><strong>'+s.t+'</strong><br><span class="small">'+s.cust+'</span><br><span class="small">Best: '+(st?st+"/100":"not yet")+'</span><br>'+(lock?'<span class="small">Premium call (placeholder gate, no payment connected)</span>':'<button class="btn" data-i="'+i+'">Start call</button>')+'</div>'});
 h+='</div><p><button class="btn alt" id="rand">Random call</button></p><h3>Board LED code legend (this fictional board)</h3><p class="small">Real codes vary by manufacturer. Use the label inside the furnace door.</p><div class="tw"><table><tr><th>Flashes</th><th>Meaning</th></tr>'+LED.map(function(r){return"<tr><td>"+r[0]+"</td><td>"+r[1]+"</td></tr>"}).join("")+"</table></div>";
 $("menu").innerHTML=h;
 $("menu").querySelectorAll("button[data-i]").forEach(function(b){b.onclick=function(){start(+b.dataset.i)}});
 $("rand").onclick=function(){var ok=SC.filter(function(s){return!GATE.enabled||GATE.freeScenarios.indexOf(s.id)>=0});start(SC.indexOf(ok[Math.floor(Math.random()*ok.length)]))};
}
function show(id){["menu","work","report"].forEach(function(x){$(x).classList.toggle("hidden",x!==id)})}
function start(i){
 S={sc:SC[i],power:true,panel:false,call:false,ppe:false,ran:false,done:{},pen:{},log:[],tests:0,hints:0,costs:0,wrong:0,verifiedDead:false,co:false,vrun:false,blownAgain:false,sel:null,seen:{}};
 show("work");$("log").innerHTML="";
 add("Work order: "+S.sc.t+". "+S.sc.cust+": "+S.sc.story);
 add("Safety first: put on glasses and gloves, set the thermostat to call for heat, and work through the sequence of operation.");
 drawFurnace();renderBar();renderComp();renderRepair();renderMeter();
}
function renderBar(){
 var b=$("bar");b.innerHTML="";
 function chip(label,on,fn){var c=document.createElement("button");c.className="chip "+(on?"on":"off");c.textContent=label+": "+(on?"ON":"OFF");c.setAttribute("aria-pressed",on);c.onclick=fn;b.appendChild(c)}
 chip("PPE (glasses, gloves)",S.ppe,function(){S.ppe=!S.ppe;add(S.ppe?"PPE on.":"PPE off.");renderBar()});
 chip("Power (service switch)",S.power,function(){S.power=!S.power;add(S.power?"Service switch ON.":"Service switch OFF. Verify it is dead with the meter before touching parts.");renderBar();renderComp()});
 chip("Door panel open",S.panel,function(){
  if(!S.panel&&S.power&&!S.ppe)pen("livepanel",10,"You opened the panel on a live furnace without PPE.");
  S.panel=!S.panel;add(S.panel?"Door panel removed. Live parts exposed if power is on.":"Door panel back on.");renderBar();renderComp()});
 chip("Thermostat calling for heat",S.call,function(){S.call=!S.call;add(S.call?"Thermostat set to call for heat.":"Thermostat satisfied.");renderBar()});
}
function drawFurnace(){
 var s=(window.ART?ART.back("furnace"):'<rect class="cab" x="120" y="20" width="360" height="400" rx="6"/>')+'<text x="300" y="440" text-anchor="middle" font-size="12" fill="currentColor">Gas furnace, front view</text>';
 PARTS.forEach(function(p){s+=(window.ART?ART.part("furnace",p):'')+'<g class="part'+(window.ART&&ART.part("furnace",p)?' art':'')+'" id="p-'+p.id+'" role="button" tabindex="0" aria-label="'+p.l+'"><rect x="'+p.x+'" y="'+p.y+'" width="'+p.w+'" height="'+p.h+'" rx="6"/><text x="'+(p.x+p.w/2)+'" y="'+(window.ART&&ART.part("furnace",p)?(p.h>=44?p.y+p.h-5:p.y+p.h+12):p.y+p.h/2+4)+'" text-anchor="middle">'+p.l+'</text></g>'});
 $("fur").innerHTML=s;
 PARTS.forEach(function(p){var g=$("p-"+p.id);function go(){S.sel=p.id;document.querySelectorAll("svg .part").forEach(function(x){x.classList.remove("sel")});g.classList.add("sel");renderComp()}
  g.addEventListener("click",go);g.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();go()}})});
}
function renderComp(){
 var c=$("comp"),p=PARTS.filter(function(x){return x.id===S.sel})[0];
 if(!p){c.innerHTML="<strong>No part selected.</strong><br>Select a part on the furnace to see its tests.";return}
 c.innerHTML="<strong>"+p.l+"</strong>";
 Object.keys(T).filter(function(k){return T[k].c===p.id}).forEach(function(k){var b=document.createElement("button");b.className="test";b.textContent=T[k].l;b.onclick=function(){doTest(k)};c.appendChild(b)});
}
function renderMeter(){ $("meter").innerHTML='<strong>Meter</strong><br><span class="small">Choose a test to see a reading.</span>' }
function doTest(k){
 var t=T[k],f=active(),m=$("meter");S.tests++;
 function out(h){m.innerHTML="<strong>"+t.l+"</strong><br>"+h}
 var needPanel=!(t.any||t.k==="co"||t.c==="tstat"||t.c==="filter"||t.c==="switch");
 if(t.k==="visual"){var r=t.fn(f);add(t.l+": "+r);out("<p>"+r+"</p>");return}
 if(t.k==="dead"){
  if(S.power){pen("liveohm",10,"Resistance test on a live circuit");add("Meter protection fuse blew. Never measure ohms on a live circuit.","badc");out('<p class="badc">Meter fuse blown. Turn power off first.</p>');return}
  if(!S.verifiedDead){pen("noverify",5,"You did not verify the circuit was dead first")}
  if(!S.panel&&needPanel){out("<p>Remove the door panel to reach this part.</p>");return}
  var r2=t.fn(f);if(typeof r2==="string"){add(t.l+": "+r2);out("<p>"+r2+"</p>");return}
  add(t.l+": "+fmt(r2[0],r2[1]));out('<div class="reading">'+fmt(r2[0],r2[1])+'</div><p class="small">Expected: '+r2[2]+"</p>");return}
 // live and co
 if(t.k==="co"||t.k==="live"){
  if(!S.power&&k!=="sw"){out("<p>Power is off. Turn the service switch on.</p>");return}
  if(needPanel&&!S.panel){out("<p>Remove the door panel to reach this part.</p>");return}
  if(["sw","xfmr","brc"].indexOf(k)<0&&!S.call){out("<p>The thermostat is not calling for heat, so nothing is energized.</p>");return}
  if(["sw","xfmr","brc","trw"].indexOf(k)<0&&!S.ran){out("<p>Run a heat cycle first. Live readings during a cycle depend on how far the sequence gets.</p>");return}
  if(k==="sw"&&!S.power)S.verifiedDead=true;
  var r3=t.fn(f);if(k==="co"&&typeof r3[0]==="number")S.co=true;
  add(t.l+": "+fmt(r3[0],r3[1]));out('<div class="reading">'+fmt(r3[0],r3[1])+'</div><p class="small">Expected: '+r3[2]+"</p>");
 }
}
function ledForRun(f){return ledText(f)}
function runCycle(){
 if(!S.power){add("Power is off. Nothing can run.");return}
 if(!S.call){add("Set the thermostat to call for heat.");return}
 S.ran=true;
 if(S.sc.f==="fuse"&&S.done.fuse&&!S.done.wire&&!S.blownAgain){S.blownAgain=true;delete S.done.fuse;add("The new fuse blew again the moment the call started. Something is shorting the 24 V circuit. Find the cause.","badc");return}
 var f=active();
 var L={
  fuse:"Call for heat. Nothing happens. The board is dark.",
  inducer:"Call for heat. You hear no inducer motor. After a while the LED flashes 3 times.",
  pressure:"Inducer starts and runs about 30 seconds, then shuts off. LED flashes 3 times. No flame.",
  igniter:"Inducer runs and draft is proven. The igniter does not glow. After the warm-up time the valve opens briefly, no flame, it retries then locks out. LED flashes 4 times.",
  sensor:"Burners light, then go out after about 3 seconds. It retries three times, then locks out. LED flashes once.",
  filter:"Burners light and heat comes on. After about 2 minutes the burners shut off but the blower keeps running. LED flashes 2 times.",
  rollout:"Inducer runs and burners light, then after about 10 seconds the burners shut off. LED flashes 5 times.",
  valve:"Inducer runs, the igniter glows, but no burners light. It retries, then locks out. LED flashes 4 times.",
  tstat:"Nothing happens. The thermostat display is blank and the board LED shows steady standby.",
  flue:"The inducer runs and the pressure switch never closes. No burners light. LED flashes 3 times.",
  trap:"On a cold morning the inducer runs but the pressure switch does not prove. LED flashes 3 times. It sometimes starts later when it warms.",
  jump:"It lights and cycles, shutting off again and again. LED flashes 6 times. The CO alarm chirped overnight.",
  blower:"Burners light. After the delay there is a hum but no air from the registers. After about a minute the burners shut off. LED flashes 2 times."
 };
 if(f===null){add("Call for heat. Inducer starts, pressure switch proves draft, igniter warms 20 s, gas valve opens, flame proven, blower starts after about 40 s, warm air flows. Cycle completes normally.","good");if(!S.panel)S.vrun=true;else add("The door panel is open. Close it and run the verification cycle.","warnc")}
 else add(L[f],"warnc");
}
function renderRepair(){
 var r=$("repair");r.innerHTML='<label for="rsel" class="small">Repair or replace</label><div class="row"><select id="rsel">'+REPAIRS.map(function(x){return'<option value="'+x.id+'">'+x.l+(x.c?" ($"+x.c+")":"")+"</option>"}).join("")+'</select><button class="btn" id="rdo">Do it</button></div>';
 $("rdo").onclick=function(){doRepair($("rsel").value)};
}
function doRepair(id){
 var r=REPAIRS.filter(function(x){return x.id===id})[0];
 if(id==="jumper"){pen("jumper",30,"You bypassed a safety switch. A rollout switch protects against carbon monoxide and fire");add("Never jumper out a safety control.","badc");return}
 if(id!=="tstatbatt"){
 if(S.power){pen("liverepair",20,"You worked on a live furnace");add("Turn the power off before repairs.","badc");return}
 if(!S.verifiedDead)pen("noverify",5,"You did not verify the circuit was dead first")}
 if(r.panel!==false&&!S.panel){add("Remove the door panel first.");return}
 if(S.done[id]){add("Already done.");return}
 S.done[id]=1;S.costs+=r.c;
 var needed=S.sc.need.some(function(n){return n.split("|").indexOf(id)>=0});
 if(needed){add("Done: "+r.l+".","good")}else{S.wrong+=r.c;pen("wrong_"+id,15,"Unnecessary: "+r.l+" (the customer pays $"+r.c+")")}
 if(id==="fuse"&&!S.done.wire)add("Fuse replaced. Ask why it blew before closing up.","warnc");
}
function hint(){var h=S.sc.hints;if(S.hints>=h.length){add("No more hints.");return}add("Hint: "+h[S.hints],"warnc");S.hints++;pen("hint"+S.hints,5,"Hint used")}
function finish(){
 var ok=active()===null&&S.sc.need.every(fixed);
 var score=100;Object.keys(S.pen).forEach(function(k){score-=S.pen[k]});
 if(S.tests>12)score-=Math.min(15,S.tests-12);
 var checks=[["PPE worn",S.ppe],["De-energized verified before ohm tests or repairs",S.verifiedDead],["Root cause found",ok],["Verified with panel closed",S.vrun],["CO checked in flue gas",S.co]];
 if(!ok)score=Math.min(score,25);else{if(!S.vrun)score-=10;if(!S.co)score-=10}
 score=Math.max(0,Math.min(100,Math.round(score)));
 if(ok&&(!save.done[S.sc.id]||save.done[S.sc.id]<score)){save.done[S.sc.id]=score;persist()}
 var grade=score>=90?"Master tech":score>=75?"Journeyman":score>=50?"Apprentice":"Needs more practice";
 var h="<h2>"+(ok?"Call complete":"Call not finished")+"</h2><p><strong>Score "+score+"/100, "+grade+"</strong></p><div class='tw'><table><tr><th>Check</th><th>Result</th></tr>"+
  checks.map(function(c){return"<tr><td>"+c[0]+"</td><td class='"+(c[1]?"good":"badc")+"'>"+(c[1]?"Yes":"No")+"</td></tr>"}).join("")+"</table></div>"+
  "<p>Tests run: "+S.tests+". Parts billed: $"+S.costs+(S.wrong?" (of which $"+S.wrong+" were not needed)":"")+".</p>"+
  "<h3>What was wrong</h3><p>"+S.sc.why+"</p>"+
  (Object.keys(S.pen).length?"<h3>Deductions</h3><ul>"+Object.keys(S.pen).map(function(k){return"<li>"+k.replace(/_/g," ")+": "+S.pen[k]+"</li>"}).join("")+"</ul>":"")+
  "<p class='small'>Educational simulation only. Real work needs training, the manufacturer's instructions and local codes.</p><p><button class='btn' id='again'>Back to calls</button></p>";
 $("report").innerHTML=h;show("report");$("again").onclick=renderMenu;$("again").focus();
}
$("runCycle").onclick=runCycle;$("hint").onclick=hint;$("finish").onclick=finish;
renderMenu();
try{window.SIMDATA=window.SIMDATA||{};window.SIMDATA["furnace"]={SC:SC,REP:(typeof REP!=="undefined"?REP:(typeof REPAIRS!=="undefined"?REPAIRS:[])),PARTS:PARTS}}catch(e){}
})();
