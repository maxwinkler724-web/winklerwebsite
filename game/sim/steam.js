(function(){
"use strict";
/* Steam Boiler Diagnosis Simulator: residential low-pressure one-pipe steam system. Illustrative values, plain JS, no network. */
var GATE={enabled:false,freeScenarios:["ptrol"]};
var $=function(i){return document.getElementById(i)};
var save={done:{}};try{var sv=localStorage.getItem("hvacsim.steam.v1");if(sv)save=JSON.parse(sv)||save}catch(e){}
function persist(){try{localStorage.setItem("hvacsim.steam.v1",JSON.stringify(save))}catch(e){}}
/* System: residential low-pressure one-pipe steam boiler. Pressuretrol cut-out about 1.5 to 2 psi, relief valve 15 psi, water level at the middle of the sight glass. p = steam pressure (psi). Illustrative. */
var V={
 ok:{p:1.2,lvl:50},ptrol:{p:9,lvl:50},lwco:{p:0,lvl:5},radvent:{p:1.2,lvl:50},pitch:{p:1.2,lvl:50},skim:{p:2.5,lvl:60},hart:{p:1.5,lvl:30},valves:{p:1.5,lvl:50}
};
var SC=[
 {id:"ptrol",f:"ptrol",need:["setptrol"],t:"Hissing, spitting radiator vents",cust:"Mr. Costa",story:"The house is hot, the radiator vents spit water, and the relief valve drips. The boiler keeps firing and the gauge needle is way up.",
  hints:["Read the pressure gauge and the pressuretrol setting.","A residential steam boiler should run under about 2 psi. This one reads about 9 psi."],
  why:"A low-pressure steam system only needs a pound or two to push steam through the pipes. The pressuretrol cut-out was set to about 9 psi, so the boiler kept firing, the relief valve (15 psi) lifted and the vents spat. Reset the cut-out to about 1.5 psi with a small differential, and confirm the pressure stays low. Do not cap or change the relief valve."},
 {id:"lwco",f:"lwco",need:["feeder"],t:"Boiler locked out, no heat",cust:"Ms. Ivanova",story:"No heat. The boiler is off and a red light is on. The auto-feed has been unreliable.",
  hints:["Look at the sight glass first, then the low-water cut-off and feeder.","The glass is nearly empty. The auto-feeder is not adding water."],
  why:"The low-water cut-off did its job and shut the burner off because the sight glass was almost empty. The auto-feeder had failed and was not making up water. Fix the feeder and bring the water to the middle of the glass in small amounts. Never run the boiler dry, and never pour cold water quickly into a hot, nearly dry cast-iron boiler: it can crack."},
 {id:"radvent",f:"radvent",need:["rvent"],t:"One cold radiator",cust:"Mrs. Fischer",story:"All radiators heat except the one in the back bedroom, which stays cold to the middle.",
  hints:["Feel the radiator and listen at its air vent.","Steam cannot enter if air cannot leave. Check the vent."],
  why:"In a one-pipe steam system, steam enters only as fast as air leaves. The air vent on this radiator was clogged with paint and rust, so the air could not escape and steam never filled it. Replace the vent with the right size for the radiator and check it fills evenly."},
 {id:"pitch",f:"pitch",need:["shim"],t:"Banging and knocking",cust:"The Marchettis",story:"A loud bang each time the heat comes on, and water is leaking from a radiator valve.",
  hints:["Look at how the radiator sits and where the valve is.","The radiator should slope back toward the supply valve so condensate runs back."],
  why:"One-pipe radiators must slope slightly toward the supply valve so condensate drains back down the same pipe. This radiator leaned the wrong way, so water pooled and slugs of steam banged into it and leaked at the valve. Shim the legs to slope toward the valve and check the valve is fully open (never half open)."},
 {id:"skim",f:"skim",need:["skimmed"],t:"Water level bounces, wet steam",cust:"Mr. Ahmed",story:"The water in the glass jumps up and down and radiators spit wet steam. It started after the boiler was cleaned.",
  hints:["Watch the sight glass while the boiler is steaming.","Cleaning left oil and dirt on the water surface."],
  why:"Oil and dirt on the water surface made the boiler prime: it carried water into the steam lines and made the level bounce. The fix is to skim the surface and flush and refill following the maker's instructions, then confirm the level holds steady. Raising the pressure or adding water would not cure it. Very dirty water or pH above about 9 (7 to 9 is cited) also promotes priming, so test it."},
 {id:"hart",f:"hart",need:["reloop","repitch","setlevel","checkph"],t:"Banging in the pipes after a boiler swap",cust:"Mr. DeLuca",story:"A new steam boiler went in last month. Since then the pipes bang and hammer every cold start, and the water level in the glass swings low.",
  hints:["Compare the near-boiler piping with the boiler manual, then sight along the steam main.","Look at the nipple on the Hartford loop and for a low spot in the main."],
  why:"Three problems combined. The new boiler's near-boiler piping did not match the manual, and the Hartford loop return joined the equalizer through a long nipple, which can cause water hammer. The steam main also sagged, so a low spot held water that steam slugged through. The water line sat low. Fix: re-pipe the loop with a close nipple at the height the boiler maker gives (a trade article puts it about 2 inches below the lowest operating waterline: follow the manual), re-pitch the main so it drains (a trade article cites about 1 inch per 20 feet when steam and condensate flow the same way), set the water level near the top of the gauge glass as the maker advises, and check the water pH (7 to 9 is cited). Sources: Holohan in Plumbing & Mechanical (2014) and HeatingHelp (trade articles). A pump-fed return changes the loop rules, so use the maker's drawing. Numbers are practice examples."},
 {id:"valves",f:"valves",need:["openvalve","newvents","flushret"],t:"Spitting radiator valves, rooms that never heat",cust:"The Whitfields",story:"The radiator valves spit and gurgle, and two back rooms never get warm. Someone half closed a few valves to quiet them.",
  hints:["Check the supply valves on the radiators, then the air vents.","Steam and water cannot share a half-closed valve. Also look at how the wet return drains."],
  why:"In a one-pipe steam system the supply valve must be fully open or fully shut, never half closed: a half-closed valve makes steam and returning condensate fight in the same pipe, so it spits and gurgles. Sticky, clogged air valves kept the back radiators from venting, and the wet return was partly blocked with scale, so condensate drained slowly. Fix: open the valves fully, replace the clogged air valves, and flush the return. Sources: Holohan (HeatingHelp, 2014) for the valve rule; a 1929 maker catalog for air valve behavior (historic: use a current maker table for vent sizes). Numbers are practice examples."}
];
var PARTS=[
 {id:"tstat",l:"Thermostat",x:500,y:20,w:90,h:56},
 {id:"disc",l:"Boiler switch",x:500,y:96,w:90,h:46},
 {id:"ptrolp",l:"Pressuretrol",x:330,y:20,w:130,h:56},
 {id:"gauge",l:"Pressure gauge",x:200,y:20,w:110,h:56},
 {id:"boiler",l:"Boiler and burner",x:30,y:20,w:150,h:90},
 {id:"glass",l:"Sight glass",x:200,y:96,w:110,h:46},
 {id:"lwcop",l:"Low-water cut-off",x:30,y:130,w:120,h:56},
 {id:"feeder",l:"Auto water feeder",x:170,y:160,w:110,h:50},
 {id:"relief",l:"Relief valve",x:30,y:230,w:120,h:56},
 {id:"mainv",l:"Main steam vent",x:170,y:230,w:140,h:56},
 {id:"rad1",l:"Radiator 1",x:340,y:200,w:130,h:50},
 {id:"rad2",l:"Radiator 2 (back bedroom)",x:340,y:260,w:130,h:50},
 {id:"rvp",l:"Radiator air vent",x:340,y:330,w:130,h:50},
 {id:"pipes",l:"Steam piping",x:170,y:310,w:140,h:50},
 {id:"hart",l:"Hartford loop",x:30,y:300,w:120,h:56}
];
var REP=[
 {id:"setptrol",l:"Reset pressuretrol cut-out to about 1.5 psi",c:0},{id:"feeder",l:"Replace auto water feeder, bring level to mid-glass",c:210},
 {id:"rvent",l:"Replace radiator air vent",c:18},{id:"shim",l:"Shim radiator legs to slope toward the valve",c:0},
 {id:"skimmed",l:"Skim the surface and flush, refill to mid-glass",c:0},{id:"newrelief",l:"Replace relief valve",c:60},
 {id:"fillhot",l:"Pour cold water quickly into the hot boiler",c:0},{id:"plug",l:"Cap the relief valve discharge",c:0},
 {id:"mainvent",l:"Replace main steam vent",c:42},{id:"reloop",l:"Re-pipe the Hartford loop with a close nipple, at the maker's height",c:180},{id:"repitch",l:"Re-pitch the sagging steam main",c:160},{id:"setlevel",l:"Set the water level near the top of the gauge glass",c:0},{id:"checkph",l:"Test the water pH and treat or flush if it is out of range",c:0},{id:"openvalve",l:"Open the half-closed radiator supply valves fully",c:0},{id:"newvents",l:"Replace the clogged radiator air valves",c:54},{id:"flushret",l:"Flush the partly blocked wet return",c:120},{id:"boilerr",l:"Replace the boiler",c:5800}
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
 gauge:{c:"gauge",l:"Read steam pressure gauge (running)",k:"run",fn:function(){var v=vals();S.sawG=true;return'<div class="reading">'+fmt(v.p,"psi")+'</div><p class="small">A residential low-pressure steam boiler normally runs about 0.5 to 2 psi. Relief valve opens at 15 psi.</p>'}},
 ptr:{c:"ptrolp",l:"Read pressuretrol cut-out setting",k:"any",fn:function(){return active()==="ptrol"?rd("9","psi","Cut-out is set far too high. Typical: about 1.5 psi with a small differential"):rd("1.5","psi","Cut-out about 1.5 psi, differential about 1 psi")}},
 pv:{c:"ptrolp",l:"Voltage at pressuretrol contacts (live, calling)",k:"live",fn:function(){return rd(24,"VAC","Contacts closed while pressure is below cut-out")}},
 sg:{c:"glass",l:"Read the sight glass level",k:"any",fn:function(){var f=active();return f==="lwco"?"The water is almost out of the bottom of the glass. Level is about 5 percent.":f==="skim"?"The water jumps up and down and looks oily and brown. Level bounces around the middle.":f==="hart"?"The water sits low, about 30 percent of the glass, and swings when the banging starts.":"The water is steady at the middle of the glass."}},
 lw:{c:"lwcop",l:"Check the low-water cut-off indicator",k:"any",fn:function(){return active()==="lwco"?"The LWCO has shut the burner off. It is doing its job.":"The LWCO is satisfied."}},
 fd:{c:"feeder",l:"Inspect the auto water feeder",k:"any",fn:function(){return active()==="lwco"?"The float is stuck and the valve never opens. No water is added.":"The feeder float moves freely and the valve works."}},
 rv:{c:"relief",l:"Inspect relief valve",k:"any",fn:function(){return active()==="ptrol"?"It is crusted and damp at the outlet and has been lifting.":"Dry and clean."}},
 mv:{c:"mainv",l:"Listen at the main steam vent",k:"run",fn:function(){return"The main vent passes air quietly at first, then closes when hot."}},
 r1:{c:"rad1",l:"Feel radiator 1 (running)",k:"run",fn:function(){return active()==="valves"?"Radiator 1 heats, but spits and gurgles at the supply valve.":"Radiator 1 heats evenly from the inlet to the far end."}},
 r2:{c:"rad2",l:"Feel radiator 2 and look at its pitch (running)",k:"run",fn:function(){var f=active();if(!S.ppe)pen("burn",10,"You touched a hot radiator without gloves");return f==="radvent"?"Radiator 2 is cold from the middle to the far end. Steam comes only to the inlet and stops.":f==="pitch"?"The radiator leans away from the supply valve. Water sits at the low end and you hear banging.":f==="valves"?"Radiator 2 stays cold past the inlet. The air valve is sticky.":"Radiator 2 heats evenly."}},
 vt:{c:"rvp",l:"Inspect the radiator air vent",k:"any",fn:function(){return active()==="valves"?"The air valves on the back radiators are sticky and clogged. Little air passes.":active()==="radvent"?"The vent is clogged with paint and rust. Nothing passes through.":"The vent opens to pass air and closes with steam."}},
 pp:{c:"pipes",l:"Check steam piping slope and hammer (running)",k:"run",fn:function(){var f=active();return f==="pitch"?"The main is fine. The bangs come from radiator 2.":f==="hart"?"Slugs of water bang through the main at the low spot.":f==="skim"?"Water sprays from the vents with the steam.":"Piping is pitched correctly and quiet."}},
 hl:{c:"hart",l:"Inspect the Hartford loop piping against the boiler manual",k:"any",fn:function(){return active()==="hart"?"The return joins the equalizer through a long nipple and the connection height does not match the manual's drawing.":"A close nipple at the height shown in the manual. The loop matches the maker's drawing."}},
 hm:{c:"pipes",l:"Sight along the steam main for sag and standing water",k:"any",fn:function(){return active()==="hart"?"The main sags about an inch between two hangers. A low spot holds water.":"The main is level and pitched back toward the boiler. No standing water."}},
 ph:{c:"glass",l:"Test the boiler water pH",k:"any",fn:function(){return active()==="skim"?rd(9.6,"","Above the 7 to 9 range cited. Dirty, oily water primes.") :rd(8.4,"","Inside the 7 to 9 range often cited. Check the maker's limits.")}},
 r1v:{c:"rad1",l:"Check radiator 1 supply valve",k:"any",fn:function(){return active()==="valves"?"The valve is about half closed. It spits and gurgles when steam arrives.":"The supply valve is fully open."}},
 r2v:{c:"rad2",l:"Check radiator 2 supply valve",k:"any",fn:function(){return active()==="valves"?"Fully open, but the radiator stays cold at the far end.":"The supply valve is fully open."}},
 wr:{c:"pipes",l:"Look at how the wet return drains",k:"any",fn:function(){return active()==="valves"?"The wet return is partly blocked with scale. Condensate drains slowly and backs up.":"The return drains freely."}},
 sw:{c:"disc",l:"Voltage at boiler switch, load side",k:"any",fn:function(){if(!S.power)S.dead=true;return rd(S.power?118:0,"VAC",S.power?"About 120 VAC":"0 V: de-energized. Safe to proceed with electrical tests.")}},
 calc:{c:"gauge",l:"Verify system: pressure, level and radiators",k:"calc",fn:function(){var v=vals();return'<div class="reading">'+fmt(v.p,"psi")+'</div> <div class="reading">level '+Math.round(v.lvl)+'%</div><p class="small">Targets: about 0.5 to 2 psi, steady water level near the middle of the glass, all radiators heating.</p>'}}
};
function dial(){return ""}
function renderMenu(){
 show("menu");var h='<h2>Choose a call</h2><p>A residential one-pipe steam boiler. Find why the house is not heating or the system is noisy, fix the real cause, and verify. First call is a free demo.</p><div class="grid">';
 SC.forEach(function(s,i){var lock=GATE.enabled&&GATE.freeScenarios.indexOf(s.id)<0,st=save.done[s.id];
  h+='<div class="card"><strong>'+s.t+'</strong><br><span class="small">'+s.cust+'</span><br><span class="small">Best: '+(st?st+"/100":"not yet")+'</span><br>'+(lock?'<span class="small">Premium call (placeholder gate)</span>':'<button class="btn" data-i="'+i+'">Start call</button>')+"</div>"});
 h+='</div><p class="small">Steam pressures and levels are typical residential values for illustration. Always follow the boiler maker\'s instructions and local code.</p>';
 $("menu").innerHTML=h;$("menu").querySelectorAll("button[data-i]").forEach(function(b){b.onclick=function(){start(+b.dataset.i)}});
}
function start(i){
 S={sc:SC[i],power:true,panel:false,call:false,ppe:false,ran:false,done:{},pen:{},tests:0,hints:0,costs:0,wrong:0,dead:false,vrun:false,sel:null,log:[],gok:false,sawG:false,sawT:false};
 show("work");$("log").innerHTML="";
 add("Work order: "+S.sc.t+". "+S.sc.cust+": "+S.sc.story);
 add("Put on PPE, set the thermostat to call for heat, run the boiler and gather data before touching parts.");
 drawUnit();renderBar();renderComp();renderRepair();$("meter").innerHTML='<strong>Meter</strong><br><span class="small">Choose a test to see a reading.</span>';
}
function renderBar(){
 var b=$("bar");b.innerHTML="";function chip(l,on,fn){var c=document.createElement("button");c.className="chip "+(on?"on":"off");c.textContent=l+": "+(on?"ON":"OFF");c.setAttribute("aria-pressed",on);c.onclick=fn;b.appendChild(c)}
 chip("PPE (glasses, gloves)",S.ppe,function(){S.ppe=!S.ppe;add(S.ppe?"PPE on.":"PPE off.");renderBar()});
 chip("Boiler switch",S.power,function(){S.power=!S.power;if(!S.power)S.dead=false;add(S.power?"Boiler switch ON.":"Boiler switch OFF. Verify dead with a meter before touching electrical parts.");renderBar()});
 chip("Thermostat calling for heat",S.call,function(){S.call=!S.call;add(S.call?"Thermostat set to call for heat.":"Thermostats satisfied.");renderBar()});
 chip("Control cover open",S.panel,function(){S.panel=!S.panel;add(S.panel?"Control cover removed. Live terminals exposed if power is on.":"Cover back on.");renderBar()});
}
function drawUnit(){
 var s='<rect x="10" y="10" width="310" height="365" rx="8" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="6 4"/><text x="165" y="393" text-anchor="middle" font-size="12" fill="currentColor">Boiler room</text><rect x="320" y="190" width="170" height="210" rx="8" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="6 4"/><text x="405" y="418" text-anchor="middle" font-size="12" fill="currentColor">Radiators</text>';
 PARTS.forEach(function(p){s+=(window.ART?ART.part("steam",p):'')+'<g class="part'+(window.ART&&ART.part("steam",p)?' art':'')+'" id="p-'+p.id+'" role="button" tabindex="0" aria-label="'+p.l+'"><rect x="'+p.x+'" y="'+p.y+'" width="'+p.w+'" height="'+p.h+'" rx="6"/><text x="'+(p.x+p.w/2)+'" y="'+(window.ART&&ART.part("steam",p)?(p.h>=44?p.y+p.h-5:p.y+p.h+12):p.y+p.h/2+4)+'" text-anchor="middle">'+p.l+'</text></g>'});
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
 if(t.k==="calc"){if(S.ran&&S.call&&S.power){var v=vals();out(t.fn());if(active()===null&&v.p>=0.5&&v.p<=2&&v.lvl>=40&&v.lvl<=60)S.gok=true}else out("<p>Run the boiler first.</p>");return}
 out(t.fn());
}
function runCycle(){
 if(!S.power){add("The boiler switch is off. Nothing can run.");return}
 if(!S.call){add("Set the thermostats to call for heat.");return}
 S.ran=true;var f=active();
 if(f===null){add("After 10 minutes steam fills every radiator evenly at about 1 psi, the water level holds steady and the boiler cycles off on the pressuretrol. Quiet.","good");if(!S.panel)S.vrun=true;else add("The cover is off. Replace it and run the verification again.","warnc");return}
 var L={ptrol:"The boiler keeps firing. Steam pressure climbs, the vents spit and the relief valve lifts and drips.",lwco:"Nothing happens. The burner is locked out on low water.",radvent:"Most radiators heat. The back-bedroom radiator stays cold past the inlet.",pitch:"The system heats, then a loud bang comes from the back bedroom and a valve weeps.",skim:"The water in the glass jumps and the radiators spit wet steam.",hart:"The system heats, then banging and hammering run through the main and the glass level swings low.",valves:"Radiator valves spit and gurgle. The back rooms stay cold."};
 add(L[f],"warnc");
}
function renderRepair(){
 $("repair").innerHTML='<label for="rsel" class="small">Repair or replace</label><div class="row"><select id="rsel">'+REP.map(function(x){return'<option value="'+x.id+'">'+x.l+(x.c?" ($"+x.c+")":"")+"</option>"}).join("")+'<option value="csd1">Post-service safety test: low-water cutoff and high pressure limit, record set point and trip value</option>'+'</select><button class="btn" id="rdo">Do it</button></div>';
 $("rdo").onclick=function(){doRepair($("rsel").value)};
}
function csdTest(){
 if(active()!==null){add("Fix the fault first, then test the safety devices.","warnc");return}
 if(!S.ran||!S.power||!S.call){add("Run the boiler first: the safety tests need it firing, with power on and calling for heat.","warnc");return}
 if(S.csd){add("Already done.");return}
 S.csd=1;add("Post-service test: with the burner firing, the low-water cutoff was tested by draining at the test valve and locked the burner out until manually reset. The high pressure limit was tested and tripped just above its set point, then stayed off until manually reset. Written on the invoice: cutoff point, limit set point 3 psi, trip 3.2 psi (examples).","good");
}
function doRepair(id){
 if(id==="csd1"){csdTest();return}
 var r=REP.filter(function(x){return x.id===id})[0];
 if(S.power){pen("liverepair",20,"You worked on a live boiler");add("Switch the boiler off before repairs.","badc");return}
 if(S.done[id]){add("Already done.");return}
 if(id==="fillhot"){pen("fillhot",25,"You poured cold water quickly into a hot, nearly dry boiler. That can crack cast-iron sections");return}
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
 var checks=[["PPE worn",S.ppe],["Relief valve never capped, no cold shock",!S.pen.plug&&!S.pen.fillhot],["Root cause found",ok],["Verified: pressure and level in range after repair",S.gok],["Verified with cover on and running",S.vrun],["Post-service safety test recorded (NJ advisory)",!!S.csd]];
 if(!ok)score=Math.min(score,25);else{if(!S.gok)score-=10;if(!S.vrun)score-=10;if(!S.csd)score-=5}
 score=Math.max(0,Math.min(100,Math.round(score)));
 if(ok&&(!save.done[S.sc.id]||save.done[S.sc.id]<score)){save.done[S.sc.id]=score;persist()}
 var grade=score>=90?"Master tech":score>=75?"Journeyman":score>=50?"Apprentice":"Needs more practice";
 $("report").innerHTML="<h2>"+(ok?"Call complete":"Call not finished")+"</h2><p><strong>Score "+score+"/100, "+grade+"</strong></p><div class='tw'><table><tr><th>Check</th><th>Result</th></tr>"+checks.map(function(c){return"<tr><td>"+c[0]+"</td><td class='"+(c[1]?"good":"badc")+"'>"+(c[1]?"Yes":"No")+"</td></tr>"}).join("")+"</table></div><p>Tests run: "+S.tests+". Parts and labor billed: $"+S.costs+(S.wrong?" (of which $"+S.wrong+" were not needed)":"")+".</p><h3>What was wrong</h3><p>"+S.sc.why+"</p><h3>Post-service safety test</h3><p>New Jersey's Bureau of Boiler and Pressure Vessel Compliance advisory (Sept. 6, 2023) says boilers must be tested after maintenance or repair, following ASME CSD-1 Part CM-100, with device operability and set points written in a log, invoice or other record. Penalties under N.J.A.C. 12:90-9.1 start at $500. The CSD-1 text itself is paywalled and not taught here: test the way the boiler maker's manual says, with a qualified person. Set points and trip values in this sim are examples."+(S.csd?" You ran the test and recorded the set points and trip values.":" You did not run or record the test, so an inspector would write up the invoice (minus 5).")+"</p><p class='small'>Educational simulation only. Boilers are pressure vessels: follow manufacturer instructions, local code and licensing rules. Never cap or tamper with a relief valve.</p><p><button class='btn' id='again'>Back to calls</button></p>";
 show("report");$("again").onclick=renderMenu;$("again").focus();
}
$("runCycle").onclick=runCycle;$("hint").onclick=hint;$("finish").onclick=finish;
renderMenu();
try{window.SIMDATA=window.SIMDATA||{};window.SIMDATA["steam"]={SC:SC,REP:(typeof REP!=="undefined"?REP:[]),PARTS:PARTS}}catch(e){}
})();
