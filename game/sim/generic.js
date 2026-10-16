(function(){
"use strict";
/* Generic service-call engine for the extra simulator modules. Config comes from window.SIMCFG (see each module's data file). Plain JS, no network, saves on device only. */
var C=window.SIMCFG,$=function(i){return document.getElementById(i)};
var GATE={enabled:false,freeScenarios:[C.scenarios[0].id]};
var save={done:{}};try{var sv=localStorage.getItem("hvacsim."+C.key+".v1");if(sv)save=JSON.parse(sv)||save}catch(e){}
function persist(){try{localStorage.setItem("hvacsim."+C.key+".v1",JSON.stringify(save))}catch(e){}}
var S=null,SC=C.scenarios,T=C.tests,PARTS=C.parts,REP=C.repairs;
function fixed(a){return a.split("|").some(function(x){return S.done[x]})}
function active(){return S.sc.need.every(fixed)?null:S.sc.f}
function vals(){var f=active();return f===null||!C.V[f]?C.V.ok:C.V[f]}
function fmt(v,u){return(typeof v==="number"?(Math.abs(v)<10?v.toFixed(1):Math.round(v)):v)+(u?" "+u:"")}
function rd(v,u,e){return'<div class="reading">'+fmt(v,u)+'</div><p class="small">'+e+"</p>"}
function add(msg,cls){S.log.push(msg);var li=document.createElement("li");li.textContent=msg;if(cls)li.className=cls;$("log").appendChild(li)}
function pen(key,pts,msg){if(S.pen[key])return;S.pen[key]=pts;add(msg+" ("+(-pts)+")","badc")}
function show(id){["menu","work","report"].forEach(function(x){$(x).classList.toggle("hidden",x!==id)})}
C.ctx={S:function(){return S},active:active,vals:vals,rd:rd,fmt:fmt,pen:pen,add:add};
function renderMenu(){
 show("menu");var h='<h2>Choose a call</h2><p>'+C.intro+' First call is a free demo.</p><div class="grid">';
 SC.forEach(function(s,i){var lock=GATE.enabled&&GATE.freeScenarios.indexOf(s.id)<0,st=save.done[s.id];
  h+='<div class="card"><strong>'+s.t+'</strong><br><span class="small">'+s.cust+'</span><br><span class="small">Best: '+(st?st+"/100":"not yet")+'</span><br>'+(lock?'<span class="small">Premium call (placeholder gate)</span>':'<button class="btn" data-i="'+i+'">Start call</button>')+"</div>"});
 h+='</div><p class="small">'+C.foot+'</p>';
 $("menu").innerHTML=h;$("menu").querySelectorAll("button[data-i]").forEach(function(b){b.onclick=function(){start(+b.dataset.i)}});
}
function start(i){
 S={sc:SC[i],power:true,panel:false,call:false,ppe:false,ran:false,done:{},pen:{},tests:0,hints:0,costs:0,wrong:0,dead:false,vrun:false,sel:null,log:[],gok:false,x:{}};
 show("work");$("log").innerHTML="";
 add("Work order: "+S.sc.t+". "+S.sc.cust+": "+S.sc.story);add(C.startNote);
 drawUnit();renderBar();renderComp();renderRepair();$("meter").innerHTML='<strong>Meter</strong><br><span class="small">Choose a test to see a reading.</span>';
}
function renderBar(){
 var b=$("bar");b.innerHTML="";function chip(l,on,fn){var c=document.createElement("button");c.className="chip "+(on?"on":"off");c.textContent=l+": "+(on?"ON":"OFF");c.setAttribute("aria-pressed",on);c.onclick=fn;b.appendChild(c)}
 chip(C.ppeLabel||"PPE (glasses, gloves)",S.ppe,function(){S.ppe=!S.ppe;add(S.ppe?"PPE on.":"PPE off.");renderBar()});
 chip(C.powerLabel,S.power,function(){S.power=!S.power;if(!S.power)S.dead=false;add(S.power?C.powerLabel+" ON.":C.powerLabel+" OFF. Lock it out and verify dead with a meter before touching electrical parts.");renderBar()});
 chip(C.callLabel,S.call,function(){S.call=!S.call;add(S.call?C.callLabel+": ON.":C.callLabel+": satisfied.");renderBar()});
 chip(C.panelLabel,S.panel,function(){S.panel=!S.panel;add(S.panel?C.panelLabel+": removed. Live parts exposed if power is on.":C.panelLabel+": back on.");renderBar()});
}
function drawUnit(){
 var s=C.outline||"";
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
  if(S.power){pen("liveohm",10,"Hands-on or resistance test with power on");out('<p class="badc">Lock out the power first.</p>');return}
  if(!S.dead)pen("nodead",5,"You did not verify the circuit was dead first");
  if(t.bleed&&!S.x.bled)pen("bleed",5,"You touched the outdoor board before its capacitors discharged");
  if(!S.panel&&!t.open){out("<p>Remove the cover to reach this part.</p>");return}
  out(t.fn(active(),S));return}
 if(t.k==="run"){
  if(!S.power||!S.call||!S.ran){out("<p>It must be running. Power on, call, then use the run button.</p>");return}
  out(t.fn(active(),S));return}
 if(t.k==="live"){
  if(!S.power){out("<p>Power is off. Live tests need power on and a call.</p>");return}
  if(!S.call){out("<p>Start a call first.</p>");return}
  if(!S.panel){out("<p>Remove the cover to reach the terminals.</p>");return}
  if(!S.ppe)pen("liveppe",10,"You worked in a live panel without PPE");
  out(t.fn(active(),S));return}
 if(t.k==="calc"){if(S.ran&&S.call&&S.power){out(C.verifyHtml(vals()));if(active()===null&&C.verify(vals()))S.gok=true}else out("<p>Run it first.</p>");return}
 if(t.k==="vdead"){if(!S.power)S.dead=true;out(t.fn(active(),S));return}
 out(t.fn(active(),S));
}
function runCycle(){
 if(!S.power){add("Power is off. Nothing can run.");return}
 if(!S.call){add("Start a call first.");return}
 S.ran=true;var f=active();
 if(f===null){add(C.okRun,"good");if(!S.panel)S.vrun=true;else add("The cover is off. Replace it and run the verification again.","warnc");return}
 add(S.sc.run||C.runText[f],"warnc");
}
function renderRepair(){
 $("repair").innerHTML='<label for="rsel" class="small">Repair or replace</label><div class="row"><select id="rsel">'+REP.map(function(x){return'<option value="'+x.id+'">'+x.l+(x.c?" ($"+x.c+")":"")+"</option>"}).join("")+(C.csd?'<option value="csd1">'+C.csd.l+"</option>":"")+'</select><button class="btn" id="rdo">Do it</button></div>';
 $("rdo").onclick=function(){doRepair($("rsel").value)};
}
function csdTest(){
 if(active()!==null){add("Fix the fault first, then test the safety devices.","warnc");return}
 if(!S.ran||!S.power||!S.call){add("Run the boiler first: the safety tests need it firing, with power on and calling for heat.","warnc");return}
 if(S.csd){add("Already done.");return}
 S.csd=1;add(C.csd.log,"good");
}
function doRepair(id){
 if(id==="csd1"&&C.csd){csdTest();return}
 var r=REP.filter(function(x){return x.id===id})[0];
 if(r.bad){pen("bad_"+id,r.bad[0],r.bad[1]);return}
 if(!r.live){
  if(S.power){pen("liverepair",20,"You worked on a live system");add("Lock out the power before repairs.","badc");return}
  if(!S.dead)pen("noverify",5,"You did not verify the circuit was dead first")}
 if(S.done[id]){add("Already done.");return}
 if(r.pre&&!fixed(r.pre)){add(r.preMsg||"Do the earlier step first.","warnc");return}
 S.done[id]=1;S.costs+=r.c;
 var need=S.sc.need.some(function(n){return n.split("|").indexOf(id)>=0})||(S.sc.ok&&S.sc.ok.indexOf(id)>=0);
 if(need){add("Done: "+r.l+".","good")}else{S.wrong+=r.c;pen("wrong_"+id,r.wrongPts||15,"Unnecessary: "+r.l+(r.c?" (the customer pays $"+r.c+")":""))}
}
function hint(){var h=S.sc.hints;if(S.hints>=h.length){add("No more hints.");return}add("Hint: "+h[S.hints],"warnc");S.hints++;pen("hint"+S.hints,5,"Hint used")}
function finish(){
 var ok=active()===null;
 var score=100;Object.keys(S.pen).forEach(function(k){score-=S.pen[k]});
 if(S.tests>14)score-=Math.min(15,S.tests-14);
 var noBad=!Object.keys(S.pen).some(function(k){return k.indexOf("bad_")===0});
 var checks=[["PPE worn",S.ppe],[C.badCheck,noBad],["Root cause found",ok],[C.verifyLabel,S.gok],["Verified with cover on and running",S.vrun]];
 if(S.sc.doNothing){checks[3]=["No parts replaced",S.wrong===0];checks[4]=["Explained the delays to the customer",!!S.done[S.sc.need[0]]]}
 if(C.csd&&!S.sc.doNothing)checks.push(["Post-service safety test recorded (NJ advisory)",!!S.csd]);
 if(S.sc.record){checks.push(["As-found and final settings recorded",!!S.done.record]);if(ok&&!S.done.record)score-=5}
 if(!ok)score=Math.min(score,25);else if(!S.sc.doNothing){if(!S.gok)score-=10;if(!S.vrun)score-=10;if(C.csd&&!S.csd)score-=5}
 score=Math.max(0,Math.min(100,Math.round(score)));
 if(ok&&(!save.done[S.sc.id]||save.done[S.sc.id]<score)){save.done[S.sc.id]=score;persist()}
 var grade=score>=90?"Master tech":score>=75?"Journeyman":score>=50?"Apprentice":"Needs more practice";
 $("report").innerHTML="<h2>"+(ok?"Call complete":"Call not finished")+"</h2><p><strong>Score "+score+"/100, "+grade+"</strong></p><div class='tw'><table><tr><th>Check</th><th>Result</th></tr>"+checks.map(function(c){return"<tr><td>"+c[0]+"</td><td class='"+(c[1]?"good":"badc")+"'>"+(c[1]?"Yes":"No")+"</td></tr>"}).join("")+"</table></div><p>Tests run: "+S.tests+". Parts and labor billed: $"+S.costs+(S.wrong?" (of which $"+S.wrong+" were not needed)":"")+".</p><h3>What was wrong</h3><p>"+S.sc.why+"</p>"+(C.csd&&!S.sc.doNothing?"<h3>Post-service safety test</h3><p>New Jersey's Bureau of Boiler and Pressure Vessel Compliance advisory (Sept. 6, 2023) says boilers must be tested after maintenance or repair, following ASME CSD-1 Part CM-100, with device operability and set points written in a log, invoice or other record. Penalties under N.J.A.C. 12:90-9.1 start at $500. The CSD-1 text itself is paywalled and not taught here: test the way the boiler maker's manual says, with a qualified person. Set points and trip values in this sim are examples."+(S.csd?" You ran the test and recorded the set points and trip values.":" You did not run or record the test, so an inspector would write up the invoice (minus 5).")+"</p>":"")+(S.sc.src?"<p class='small'>Source basis: "+S.sc.src+"</p>":"")+"<p class='small'>"+C.safety+"</p><p><button class='btn' id='again'>Back to calls</button></p>";
 show("report");$("again").onclick=renderMenu;$("again").focus();
}
$("runCycle").onclick=runCycle;$("hint").onclick=hint;$("finish").onclick=finish;
renderMenu();
})();
