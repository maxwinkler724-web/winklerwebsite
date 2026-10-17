(function(){
"use strict";
var KEY="boilerroom.v1";
var SRC={
1:["N.J.A.C. 12:90-3.5, low pressure boiler operator","https://www.law.cornell.edu/regulations/new-jersey/N-J-A-C-12-90-3-5"],
2:["Burnham Commercial, CSD-1 requirements bulletin","https://www.burnhamcommercial.com/wp-content/uploads/2021/05/HP608-CSD-1-Requirements.pdf"],
3:["NJ DOL advisory: reporting boiler incidents and testing boilers after maintenance or repairs","https://www.nj.gov/labor/safetyandhealth/assets/PDFs/Boiler%20and%20Pressure%20Vessel%20Compliance/Advisory%20on%20Reporting%20Boiler%20Incidents%20and%20Testing%20Boilers%20after%20Maintenance%20and%20or%20Repairs%20pdf.pdf"],
4:["Zurich Risk Advisor, hot water heating boiler inspection and maintenance","https://riskadvisor.zurich.com/documents/rt_hot_water_heating-supply_boiler_inspection_and_maintenance.pdf"]
};
var PARTS={
steam:["glass","lwco","gauge","relief","burner","scanner","gas","wetreturn","log"],
hw:["aquastat","circ","gauge","relief","burner","scanner","gas","log"]};
var NAME={glass:"Sight glass (water level)",lwco:"Low-water cutoff",gauge:"Pressure or temperature gauge",relief:"Relief valve",burner:"Burner",scanner:"Flame scanner",gas:"Dual gas valves and test cocks",wetreturn:"Wet return piping",log:"Boiler log",aquastat:"Operating control and high limit",circ:"Circulator pump"};
var TOOL={glass:"Eyes on the gauge glass",lwco:"Checking the cutoff and its reset",gauge:"Reading the gauge",relief:"Looking at the relief valve and its discharge pipe",burner:"Watching a light-off",scanner:"Looking at the scanner lens",gas:"Leak test at the 1/4 in test cock with that valve closed",wetreturn:"Walking the return piping",log:"Reading the boiler log",aquastat:"Reading the control settings",circ:"Checking the circulator"};
var DEF={glass:"Water is at the normal level.",lwco:"Not tripped. Everything looks normal.",gauge:"Steady and in the normal range.",relief:"Dry. Nothing is coming out of the pipe.",burner:"Lights and runs normally.",scanner:"The lens is clean.",gas:"No bubbles. The valve holds tight.",wetreturn:"Dry pipes. No weeping.",log:"Entries are up to date, with set points written down.",aquastat:"The operating control is set well below the high limit. Nothing is tripped.",circ:"Running. Water is moving."};
var F=[
{id:"cb_lwco_lockout",type:"steam",who:"Church sexton",line:"It quit at four and Sunday service is at nine. Father's praying. I'm calling you.",call:"Steam boiler, church",
 title:"Low-water cutoff tripped",looked:"Lower (manual-reset) cutoff tripped, water glass low, condensate return leaking on the floor.",
 R:{glass:"Water is below the low-water cutoff mark.",lwco:"Manual-reset cutoff has tripped. It shut the burner off.",wetreturn:"The wet return is weeping water onto the floor.",burner:"Off. Waiting on the cutoff."},
 test:"Glass level below the cutoff mark. Trace the return: wet return weeping.",
 dx:["Low-water cutoff tripped from a water loss","Flame scanner is dirty","Relief valve will not reseat","Circulator has stopped"],
 fix:"Repair the leak, restore the water line, then manual reset. Blow down to test both cutoffs.",
 bad:["Jumper the cutoff so the heat comes back","Push reset right away and leave"],
 wrong:"Jumpering a safety control is how boilers get destroyed. The cutoff was doing its job.",
 lesson:"A tripped low-water cutoff is the boiler saving itself. Find the water loss before you reset, and never jumper it.",
 src:[2,3],good:"You fixed the leak first, then reset it. The last fellow just pushed the button."},
{id:"cb_hilimit_trip",type:"hw",who:"School custodian",line:"Red light again. The principal's in a parka. The kids think it's funny.",call:"Hot water boiler, school",
 title:"High limit tripped",looked:"Manual-reset high limit tripped, circulator had stopped, operating control set within a few degrees of the limit.",
 R:{aquastat:"The manual-reset high limit is open (tripped). The operating control is set only a few degrees under it.",circ:"Not running. No water is moving.",burner:"Off. The limit is open."},
 test:"Limit open, control settings read, circulator not running.",
 dx:["High limit tripped because flow stopped","Gas valve is leaking","Flame scanner is dirty","Water is low in the boiler"],
 fix:"Restore flow (fix the circulator), set the operating control well below the high limit, then reset.",
 bad:["Turn the high limit up to the maximum","Replace the burner"],
 wrong:"The high limit is the last line before overheating. Raising it hides the problem.",
 lesson:"Fix why it tripped. Never raise the limit to hide the problem. Leave a clear gap between the operating control and the limit.",
 src:[2],good:"Flow is back and the settings make sense. Thank you."},
{id:"cb_scanner_dirty",type:"steam",who:"Property manager",line:"It goes click, whoosh, click, nothing. I've reset it like ten times. Is that bad?",call:"Steam boiler, apartment building",
 title:"Dirty flame scanner",looked:"Flame safeguard locks out on flame failure. The scanner lens is sooty.",
 R:{scanner:"The lens is covered in soot.",burner:"Tries to light, then locks out on flame failure.",lwco:"Not tripped. Water is fine."},
 test:"Lockout code on the safeguard, scanner lens checked by eye.",
 dx:["Dirty flame scanner lens","Low-water cutoff tripped","Gas valve leaking when closed","Relief valve will not reseat"],
 fix:"Clean the scanner lens, reset once, and watch a full light-off. Add a regular scanner check (preferably weekly) to the log.",
 bad:["Keep resetting it until it stays lit","Bypass the flame safeguard"],
 wrong:"A lockout means something is wrong. Resetting again and again only hides it.",
 lesson:"Check flame scanners regularly, preferably at least weekly. A lockout means find the cause before you reset again.",
 src:[4],good:"A dirty little lens? And I check it weekly now? Put it on the clipboard."},
{id:"cb_relief_seat",type:"hw",who:"School custodian",line:"The pipe on top keeps hissing. I put a bucket under it. Then a bigger bucket.",call:"Hot water boiler, school",
 title:"Relief valve will not reseat",looked:"Relief valve weeping after a try-lever test last month.",
 R:{relief:"Water drips from the discharge pipe. Lifting the test lever while running: the valve lifts, but it does not reseat.",aquastat:"Settings normal. Nothing tripped."},
 test:"Lift the test lever while running: valve lifts but does not reseat.",
 dx:["Relief valve is leaking and will not reseat","High limit tripped","Circulator has stopped","Dirty flame scanner"],
 fix:"Replace the relief valve.",
 bad:["Plug or cap the discharge pipe","Hammer on the valve until the drip stops"],
 wrong:"A capped relief valve is a bomb with a lid. Never cap it.",
 lesson:"Test relief valves by lifting the lever while running. If it does not seat properly, or is leaking, replace it. Never cap the discharge.",
 src:[4],good:"Replaced, not capped. Good. The buckets can go."},
{id:"cb_gas_valve_leak",type:"steam",who:"Church sexton",line:"Smells like gas a little when it's off. Only a little. Is a little okay?",call:"Steam boiler, church",
 title:"Gas valve passing when closed",looked:"One of the dual gas valves passing gas when it is closed.",
 R:{gas:"Valve 2 shows bubbles at its test cock while closed. It is passing gas.",burner:"Off, but a faint gas smell near the gas train."},
 test:"Leak test at the 1/4 in test cock with that valve closed: bubbles. (Game version; the real procedure is the burner maker's.)",
 dx:["A gas valve is leaking when closed","Dirty flame scanner","Low-water cutoff tripped","High limit tripped"],
 fix:"Replace the leaking valve, repeat the leak test, and record it.",
 bad:["Close the test cock and leave","Tell them a little smell is normal"],
 wrong:"Dual valves have test cocks so you can prove each one shuts tight. Do not just walk away.",
 lesson:"A leaking valve gets replaced, then retested. In real life a gas smell means everyone leaves and calls the gas utility from outside.",
 src:[2],good:"Replaced and tested. Thank you for taking a little smell seriously."},
{id:"cb_no_record",type:"hw",who:"State inspector",line:"Repair done. Show me what you tested and what you wrote down.",call:"Hot water boiler, after a repair",
 title:"No test or record after the repair",looked:"Repair done. Nothing written down.",
 R:{aquastat:"A new high limit was installed today. Nobody has tested it.",log:"The page is blank. No test results, no set points."},
 test:"Check the boiler log or invoice for test and set point records.",
 dx:["Repair finished with no test and no record","Relief valve will not reseat","Gas valve leaking when closed","Circulator has stopped"],
 fix:"Test every safety device you touched, then record that it works and the set points in the boiler log or on the invoice.",
 bad:["Leave without testing or writing anything","Write down the old set points without checking"],
 wrong:"Untested controls and missing records are how people get hurt.",
 lesson:"After work on a boiler, test the controls and write down the set points. New Jersey points to ASME CSD-1 for this.",
 src:[3],good:"Tested and written down. That is what I wanted to see."}
];
var $=function(i){return document.getElementById(i)};
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
var save={done:[]};
try{var s=JSON.parse(localStorage.getItem(KEY)||"null");if(s&&s.done)save=s}catch(e){}
function store(){try{localStorage.setItem(KEY,JSON.stringify(save))}catch(e){}}
var cur=0,seen={},phase="inspect",order=[];
function pick(){order=F.map(function(f,i){return i});var n=order.filter(function(i){return save.done.indexOf(F[i].id)<0});cur=n.length?n[0]:0;}
function srcLinks(a){return a.map(function(n){return '<a href="'+SRC[n][1]+'" rel="noopener" target="_blank">['+n+'] '+esc(SRC[n][0])+'</a>'}).join("; ")}
/* ---------- scene ---------- */
function scene(f){
 var id=f.id,steam=f.type==="steam";
 var low=id==="cb_lwco_lockout",soot=id==="cb_scanner_dirty",lock=low||soot||id==="cb_hilimit_trip";
 var weep=id==="cb_relief_seat",gasleak=id==="cb_gas_valve_leak",nocirc=id==="cb_hilimit_trip",blank=id==="cb_no_record";
 var o='';
 o+='<rect width="760" height="420" fill="#dfe7ec"/><rect y="378" width="760" height="42" fill="#b4ada0"/>';
 o+='<rect x="0" y="378" width="760" height="4" fill="#8f897d"/>';
 /* boiler */
 o+='<rect x="250" y="110" width="240" height="250" rx="14" fill="#7f8f9c" stroke="#34434f" stroke-width="3"/>';
 o+='<rect x="275" y="190" width="190" height="130" rx="6" fill="#a5b3be" stroke="#34434f" stroke-width="2"/>';
 o+='<text x="370" y="262" text-anchor="middle" font-size="13" fill="#1b2a35" font-weight="700">'+(steam?"STEAM BOILER":"HOT WATER BOILER")+'</text>';
 o+='<text x="370" y="280" text-anchor="middle" font-size="11" fill="#1b2a35">(game picture, not to scale)</text>';
 /* gauge */
 o+='<g data-p="gauge"><line x1="370" y1="110" x2="370" y2="94" stroke="#34434f" stroke-width="6"/><circle cx="370" cy="68" r="28" fill="#fff" stroke="#34434f" stroke-width="3"/><line x1="370" y1="68" x2="'+(lock&&!steam?388:384)+'" y2="'+(lock&&!steam?50:48)+'" stroke="#b3261e" stroke-width="3"/><circle cx="370" cy="68" r="3" fill="#34434f"/><text x="370" y="108" text-anchor="middle" font-size="0"> </text><text x="370" y="22" text-anchor="middle" font-size="11" fill="#1b2a35">Gauge</text></g>';
 /* relief + discharge pipe */
 o+='<g data-p="relief"><rect x="428" y="76" width="26" height="36" rx="4" fill="#c89b3c" stroke="#34434f" stroke-width="2"/><rect x="434" y="62" width="14" height="16" fill="#8f6d1c" stroke="#34434f" stroke-width="2"/><path d="M454 96 H630 V372" fill="none" stroke="#5c6b77" stroke-width="7"/>'+(weep?'<g class="drip"><circle cx="630" cy="386" r="4" fill="#2b6cb0"/><circle cx="630" cy="400" r="3" fill="#2b6cb0"/></g>':'')+'<text x="448" y="56" font-size="11" fill="#1b2a35">Relief valve</text><text x="636" y="215" font-size="11" fill="#1b2a35">Discharge pipe</text></g>';
 /* burner */
 o+='<g data-p="burner"><rect x="120" y="212" width="110" height="86" rx="8" fill="#8b3a2e" stroke="#34434f" stroke-width="2"/><rect x="230" y="246" width="32" height="20" fill="#5c6b77" stroke="#34434f" stroke-width="2"/>'+(lock?'':'<path class="flame" d="M266 256 q14 -16 28 0 q-14 16 -28 0z" fill="#f5a623" stroke="#c2410c"/>')+'<text x="175" y="262" text-anchor="middle" font-size="12" fill="#fff" font-weight="700">BURNER</text></g>';
 /* scanner */
 o+='<g data-p="scanner"><rect x="150" y="190" width="30" height="22" rx="3" fill="'+(soot?'#222':'#cfd8dc')+'" stroke="#34434f" stroke-width="2"/><path d="M165 190 v-20 h-60" fill="none" stroke="#34434f" stroke-width="2"/><text x="105" y="166" font-size="11" fill="#1b2a35">Flame scanner</text></g>';
 /* gas train */
 o+='<g data-p="gas"><path d="M20 340 H200 V298" fill="none" stroke="#c89b3c" stroke-width="8"/>'+
 [60,130].map(function(x,k){var bub=gasleak&&k===1;return '<rect x="'+x+'" y="324" width="40" height="32" rx="5" fill="#3b6ea5" stroke="#34434f" stroke-width="2"/><circle cx="'+(x+20)+'" cy="316" r="5" fill="#d9d9d9" stroke="#34434f" stroke-width="2"/>'+(bub?'<g class="drip"><circle cx="'+(x+27)+'" cy="308" r="3" fill="#fff" stroke="#34434f"/><circle cx="'+(x+14)+'" cy="302" r="2.5" fill="#fff" stroke="#34434f"/></g>':'')+'<text x="'+(x+20)+'" y="376" text-anchor="middle" font-size="11" fill="#1b2a35">Valve '+(k+1)+'</text>'}).join('')+'<text x="20" y="330" font-size="11" fill="#1b2a35">Gas in</text></g>';
 if(steam){
  /* sight glass + lwco */
  var lvl=low?232:176;
  o+='<g data-p="glass"><rect x="490" y="146" width="10" height="4" fill="#34434f"/><rect x="490" y="252" width="10" height="4" fill="#34434f"/><rect x="500" y="140" width="16" height="122" rx="4" fill="#eaf4fb" stroke="#34434f" stroke-width="2"/><rect x="502" y="'+lvl+'" width="12" height="'+(260-lvl)+'" fill="#3b82c4"/><text x="522" y="132" font-size="11" fill="#1b2a35">Sight glass</text></g>';
  o+='<g data-p="lwco"><rect x="530" y="168" width="70" height="66" rx="6" fill="#d8d2c2" stroke="#34434f" stroke-width="2"/><circle cx="565" cy="190" r="9" fill="'+(low?'#c0261d':'#2e7d32')+'" stroke="#34434f" stroke-width="2"/><text x="565" y="222" text-anchor="middle" font-size="11" fill="#1b2a35">Low-water</text><text x="565" y="232" text-anchor="middle" font-size="11" fill="#1b2a35">cutoff</text><path d="M516 200 H530" stroke="#34434f" stroke-width="3"/></g>';
  /* wet return */
  o+='<g data-p="wetreturn"><path d="M490 346 H700 V250" fill="none" stroke="#5c6b77" stroke-width="8"/>'+(low?'<g class="drip"><circle cx="560" cy="362" r="4" fill="#2b6cb0"/><circle cx="560" cy="374" r="3" fill="#2b6cb0"/></g><ellipse cx="560" cy="384" rx="34" ry="5" fill="#6fa3d6"/>':'')+'<text x="500" y="338" font-size="11" fill="#1b2a35">Wet return pipe</text></g>';
 }else{
  o+='<g data-p="aquastat"><rect x="510" y="150" width="96" height="76" rx="6" fill="#d8d2c2" stroke="#34434f" stroke-width="2"/><circle cx="534" cy="178" r="14" fill="#fff" stroke="#34434f" stroke-width="2"/><line x1="534" y1="178" x2="544" y2="170" stroke="#34434f" stroke-width="2"/><circle cx="580" cy="172" r="9" fill="'+(id==="cb_hilimit_trip"?'#c0261d':'#2e7d32')+'" stroke="#34434f" stroke-width="2"/><text x="558" y="212" text-anchor="middle" font-size="11" fill="#1b2a35">Aquastat / limit</text><path d="M490 190 H510" stroke="#34434f" stroke-width="3"/></g>';
  o+='<g data-p="circ"><path d="M490 330 H700 V250" fill="none" stroke="#5c6b77" stroke-width="8"/><circle cx="560" cy="330" r="24" fill="#3b6ea5" stroke="#34434f" stroke-width="2"/>'+(nocirc?'':'<path class="spin" d="M560 316 a14 14 0 1 1 -12 7" fill="none" stroke="#fff" stroke-width="3"/>')+'<text x="560" y="296" text-anchor="middle" font-size="11" fill="#1b2a35">Circulator</text></g>';
 }
 /* log */
 o+='<g data-p="log"><rect x="640" y="60" width="86" height="110" rx="4" fill="#8b6b3d" stroke="#34434f" stroke-width="2"/><rect x="648" y="74" width="70" height="88" fill="#fffdf4"/>'+(blank?'':'<path d="M654 90 h58 M654 102 h58 M654 114 h58 M654 126 h40" stroke="#6b7a86" stroke-width="3"/>')+'<text x="683" y="52" text-anchor="middle" font-size="11" fill="#1b2a35">Boiler log</text></g>';
 return o;
}
/* ---------- UI ---------- */
function render(){
 var f=F[cur];
 $("callno").textContent="Call "+(cur+1)+" of "+F.length+": "+f.call;
 $("who").textContent=f.who+" says:";
 $("line").textContent="“"+f.line+"”";
 $("scene").innerHTML=scene(f);
 $("scene").setAttribute("aria-label","Illustration of the "+f.call.toLowerCase()+". Use the Inspect buttons below to check each part.");
 var ps=PARTS[f.type],h="";
 ps.forEach(function(p){h+='<button type="button" class="ib'+(seen[p]?' seen':'')+'" data-p="'+p+'">'+(seen[p]?'✓ ':'')+esc(NAME[p])+'</button>'});
 $("inspect").innerHTML=h;
 [].forEach.call(document.querySelectorAll("#scene [data-p]"),function(g){
  g.setAttribute("tabindex","-1");g.style.cursor="pointer";g.addEventListener("click",function(){inspect(g.getAttribute("data-p"))});
  if(seen[g.getAttribute("data-p")])g.classList.add("seen");
 });
 $("act").innerHTML="";
 if(phase==="inspect"){
  var n=Object.keys(seen).length;
  $("act").innerHTML='<button type="button" class="go" id="know"'+(n<2?' disabled':'')+'>I know what is wrong</button>'+(n<2?' <span class="hint">Inspect at least two parts first.</span>':'');
  if($("know"))$("know").onclick=function(){phase="dx";render();$("q").focus()};
 }else if(phase==="dx"){
  var opts=f.dx.slice(),right=opts[0];shuffle(opts);
  $("act").innerHTML='<h3 id="qh">What is wrong?</h3>'+opts.map(function(o){return '<button type="button" class="opt" data-ok="'+(o===right?1:0)+'">'+esc(o)+'</button>'}).join("");
  [].forEach.call($("act").querySelectorAll(".opt"),function(b){b.onclick=function(){
   if(b.getAttribute("data-ok")==="1"){phase="fix";$("read").innerHTML="";render();$("q").focus()}
   else{b.disabled=true;$("read").innerHTML='<p><strong>Not quite.</strong> Look again at what the parts told you, then pick another.</p>'}}});
 }else if(phase==="fix"){
  var o2=[f.fix,f.bad[0],f.bad[1]],r2=f.fix;shuffle(o2);
  $("act").innerHTML='<h3 id="qh">Right call. What do you do?</h3>'+o2.map(function(o){return '<button type="button" class="opt" data-ok="'+(o===r2?1:0)+'">'+esc(o)+'</button>'}).join("");
  [].forEach.call($("act").querySelectorAll(".opt"),function(b){b.onclick=function(){
   if(b.getAttribute("data-ok")==="1"){finish(f)}
   else{b.disabled=true;$("read").innerHTML='<p><strong>That is the wrong move.</strong> '+esc(f.wrong)+' Pick another.</p>'}}});
 }
 draw();
}
function shuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t}return a}
function inspect(p){
 var f=F[cur];if(phase!=="inspect"&&phase!=="dx"&&phase!=="fix")return;
 seen[p]=1;
 var r=(f.R&&f.R[p])||DEF[p];
 $("read").innerHTML='<p><strong>'+esc(NAME[p])+'</strong><br><span class="tool">Tool: '+esc(TOOL[p])+'</span><br>'+esc(r)+'</p>';
 var b=document.querySelector('#inspect [data-p="'+p+'"]');
 if(b&&b.textContent.charAt(0)!=="✓")b.textContent="✓ "+NAME[p];
 if(b)b.classList.add("seen");
 var g=document.querySelector('#scene [data-p="'+p+'"]');if(g)g.classList.add("seen");
 if(phase==="inspect"&&Object.keys(seen).length>=2){var k=$("know");if(k){k.disabled=false;var hn=document.querySelector("#act .hint");if(hn)hn.remove()}}
}
function finish(f){
 if(save.done.indexOf(f.id)<0){save.done.push(f.id);store()}
 phase="done";
 $("act").innerHTML='';
 $("read").innerHTML='<p class="goodline"><strong>Fixed.</strong> '+esc(F[cur].who)+': “'+esc(f.good)+'”</p><p>Journal entry added below.</p>';
 var more=save.done.length<F.length;
 $("act").innerHTML='<button type="button" class="go" id="next">'+(more?'Next call':'Start over')+'</button>';
 $("next").onclick=function(){seen={};phase="inspect";if(!more){save.done=[];store();cur=0}else{var r=F.map(function(x,i){return i}).filter(function(i){return save.done.indexOf(F[i].id)<0});cur=r[0]}$("read").innerHTML='<p>Click a part (or its Inspect button) to check it with the right tool.</p>';render();window.scrollTo(0,0)};
 draw();$("next").focus();
}
function draw(){
 var h="",c=0;
 F.forEach(function(f){
  if(save.done.indexOf(f.id)<0){h+='<li class="card locked"><strong>??? Not seen yet</strong></li>';return}
  c++;
  h+='<li class="card"><h3>'+esc(f.title)+'</h3><dl><dt>Looked like</dt><dd>'+esc(f.looked)+'</dd><dt>The test</dt><dd>'+esc(f.test)+'</dd><dt>The fix</dt><dd>'+esc(f.fix)+'</dd><dt>Do not</dt><dd>'+esc(f.bad[0])+'</dd><dt>Lesson</dt><dd>'+esc(f.lesson)+'</dd><dt>Source</dt><dd>'+srcLinks(f.src)+'</dd></dl></li>';
 });
 $("journal").innerHTML=h;
 $("jcount").textContent=c+" of "+F.length+" faults in your journal";
}
pick();$("read").innerHTML='<p>Click a part in the picture, or press its Inspect button, to check it with the right tool.</p>';
var sl="";Object.keys(SRC).forEach(function(k){sl+='<li><a href="'+SRC[k][1]+'" rel="noopener" target="_blank">'+esc(SRC[k][0])+'</a></li>'});$("srclist").innerHTML=sl;
document.getElementById("inspect").addEventListener("click",function(e){var b=e.target.closest("button");if(b)inspect(b.getAttribute("data-p"))});
render();
})();
