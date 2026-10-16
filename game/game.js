(function(){
"use strict";
var L=window.L||function(x){return x};
/* Gate: placeholder only. No payment processor. Set enabled:true on the live site; the first job stays a free demo. */
var GATE={enabled:false,freeJobs:["igniter"],price:"$9.99 one-time (proposed)"};
var T=40,W=80,H=14,J=window.JOBS;
var snd=true;try{snd=localStorage.getItem("fixitvan.snd")!=="0"}catch(e){}
var ac,calm=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
function tone(f,d,t,v){if(!snd)return;try{ac=ac||new(window.AudioContext||window.webkitAudioContext)();var o=ac.createOscillator(),g=ac.createGain(),n=ac.currentTime;o.type=t||"sine";o.frequency.value=f;o.connect(g);g.connect(ac.destination);g.gain.setValueAtTime(v||.08,n);g.gain.exponentialRampToValueAtTime(.001,n+d);o.start(n);o.stop(n+d)}catch(e){}}
function sfx(k){if(k==="ok"){tone(660,.12);setTimeout(function(){tone(880,.15)},110)}else if(k==="no")tone(180,.25,"triangle",.1);else if(k==="win")[523,659,784,1046].forEach(function(f,i){setTimeout(function(){tone(f,.2)},i*130)});else if(k==="knock"){tone(220,.06,"square",.05);setTimeout(function(){tone(220,.06,"square",.05)},120)}}
var cv=document.getElementById("cv"),cx=cv.getContext("2d");
var sc=document.getElementById("scene"),sx=sc.getContext("2d");
var $=function(i){return document.getElementById(i)};
var save={done:{}};
try{var s=localStorage.getItem("fixitvan.v1");if(s)save=JSON.parse(s)||save}catch(e){}
function persist(){try{localStorage.setItem("fixitvan.v1",JSON.stringify(save))}catch(e){}}
var houses=[
 {x:10,y:3,w:3,h:3,door:[11,6],c:"#e8a87c",name:"Maple Street"},
 {x:10,y:8,w:3,h:3,door:[11,7],c:"#8fb8de",name:"Oak Avenue"},
 {x:1,y:3,w:3,h:3,door:[2,6],c:"#c9a0dc",name:"Pine Court"},
 {x:18,y:3,w:3,h:3,door:[19,6],c:"#9ad0b0",name:"Cedar Lane"},
 {x:1,y:8,w:3,h:3,door:[2,7],c:"#e6d27a",name:"Birch Road"},
 {x:6,y:8,w:3,h:3,door:[7,7],c:"#e49aa8",name:"Elm Street"},
 {x:22,y:3,w:3,h:3,door:[23,6],c:"#b5a0e8",name:"Spruce Drive"},
 {x:22,y:8,w:3,h:3,door:[23,7],c:"#e8b48a",name:"Willow Way"},
 {x:18,y:8,w:3,h:3,door:[19,7],c:"#a0d8e8",name:"Aspen Alley"},
 {x:6,y:3,w:3,h:3,door:[7,6],c:"#f0c0c0",name:"Linden Lane"},
 {x:30,y:3,w:3,h:3,door:[31,6],c:"#c0e0a8",name:"Hazel Hill"},
 {x:30,y:8,w:3,h:3,door:[31,7],c:"#e0b8d8",name:"Cottonwood Ct"},
 {x:34,y:3,w:3,h:3,door:[35,6],c:"#b8d8e8",name:"Frostwood Dr"},
 {x:34,y:8,w:3,h:3,door:[35,7],c:"#e8d8a8",name:"Breezy Blvd"},
 {x:42,y:3,w:3,h:3,door:[43,6],c:"#d8c0a0",name:"Alder Ave"},
 {x:42,y:8,w:3,h:3,door:[43,7],c:"#a8c8b0",name:"Birchwood Pl"},
 {x:46,y:3,w:3,h:3,door:[47,6],c:"#c8b0d0",name:"Chestnut St"},
 {x:54,y:3,w:3,h:3,door:[55,6],c:"#d0b8a0",name:"Hawthorn Way"},
 {x:58,y:3,w:3,h:3,door:[59,6],c:"#a8d0d8",name:"Sycamore St"},
 {x:58,y:8,w:3,h:3,door:[59,7],c:"#d8a8b8",name:"Juniper Lane"},
 {x:66,y:3,w:3,h:3,door:[67,6],c:"#c0d8f0",name:"Snowberry Lane"},
 {x:70,y:3,w:3,h:3,door:[71,6],c:"#f0c8d8",name:"Tulip Terrace"},
 {x:74,y:3,w:3,h:3,door:[75,6],c:"#e8e0a0",name:"Cardinal Court"},
 {x:66,y:8,w:3,h:3,door:[67,7],c:"#d8b890",name:"Maple Hollow"},
 {x:70,y:8,w:3,h:3,door:[71,7],c:"#a0d0e8",name:"Seashell Street"}];
var van={x:11.5*T,y:6.5*T,w:34,h:22,dir:1},keys={},mode="town",near=-1,t0=0;
function road(tx,ty){return ty===6||ty===7||tx===4||tx===5||tx===16||tx===17||tx===28||tx===29||tx===40||tx===41||tx===52||tx===53||tx===64||tx===65||tx===78||tx===79}
function ok(x,y){var hw=van.w/2,hh=van.h/2;
 var p=[[x-hw,y-hh],[x+hw,y-hh],[x-hw,y+hh],[x+hw,y+hh]];
 for(var i=0;i<4;i++){var tx=Math.floor(p[i][0]/T),ty=Math.floor(p[i][1]/T);
  if(tx<0||ty<0||tx>=W||ty>=H||!road(tx,ty))return false}return true}
function stars(){var n=0;for(var k in save.done)n+=save.done[k];return n}
function hud(){var all=Object.keys(save.done).length===J.length;var cb=$("certBtn");if(cb)cb.classList.toggle("hidden",!all);$("hStars").textContent=L("Stars: ")+stars();$("hJobs").textContent=L("Jobs: ")+Object.keys(save.done).length+"/"+J.length}
var cam={x:0,y:0},WW=W*T,WH=H*T;
function resize(){var s=innerWidth<640;cv.width=s?520:880;cv.height=s?420:560}
resize();addEventListener("resize",resize);
function drawTown(ts){
 cam.x=Math.max(0,Math.min(WW-cv.width,van.x-cv.width/2));cam.y=Math.max(0,Math.min(WH-cv.height,van.y-cv.height/2));
 cx.setTransform(1,0,0,1,-Math.round(cam.x),-Math.round(cam.y));
 cx.fillStyle="#9ad07a";cx.fillRect(0,0,WW,WH);
 for(var y=0;y<H;y++)for(var x=0;x<W;x++)if(road(x,y)){cx.fillStyle="#6b6f78";cx.fillRect(x*T,y*T,T,T)}
 cx.strokeStyle="#f6e27a";cx.setLineDash([14,12]);cx.lineWidth=3;
 cx.beginPath();cx.moveTo(0,7*T);cx.lineTo(W*T,7*T);[5,17,29,41,53,65,79].forEach(function(c){cx.moveTo(c*T,0);cx.lineTo(c*T,H*T)});cx.stroke();cx.setLineDash([]);
 [[9,4],[21,4],[9,9],[21,9],[14,10],[26,4],[26,9],[0,12],[12,12],[24,12],[33,4],[33,9],[38,4],[38,9],[45,10],[50,5],[50,10],[33,12],[41,13],[2,1],[8,0],[20,1],[32,0],[43,12]].forEach(function(p){tree(p[0]*T+20,p[1]*T+20)});
 // home garage
 cx.fillStyle="#d44";cx.fillRect(13.5*T,3*T,2*T,2.2*T);cx.fillStyle="#fff";cx.font="bold 14px sans-serif";cx.textAlign="center";cx.fillText(L("GARAGE"),14.5*T,4.3*T);
 houses.forEach(function(h,i){
  cx.fillStyle=h.c;cx.fillRect(h.x*T,h.y*T,h.w*T,h.h*T);
  cx.fillStyle="#b04a3a";cx.beginPath();cx.moveTo(h.x*T-6,h.y*T);cx.lineTo((h.x+h.w/2)*T,h.y*T-26);cx.lineTo((h.x+h.w)*T+6,h.y*T);cx.fill();
  cx.fillStyle="#fff7";cx.fillRect((h.x+.3)*T,(h.y+.4)*T,T*.7,T*.7);cx.fillRect((h.x+h.w-1)*T,(h.y+.4)*T,T*.7,T*.7);
  var below=h.door[1]<h.y;
  cx.fillStyle="#5a3a22";cx.fillRect(h.door[0]*T+8,below?h.y*T:(h.y+h.h-1.1)*T,T-16,T*1.1);
  cx.fillStyle="#000";cx.font="bold 14px sans-serif";cx.textAlign="center";
  cx.fillText(h.name,(h.x+h.w/2)*T,(h.y+h.h)*T+16);
  var d=save.done[J[i].id];
  var bob=calm?0:Math.sin(ts/250)*6;
  var lk=GATE.enabled&&GATE.freeJobs.indexOf(J[i].id)<0;
  cx.font="28px sans-serif";
  if(!d)cx.fillText(lk?"🔒":"⬇️",(h.x+h.w/2)*T,h.y*T-36+bob);
  else cx.fillText("⭐",(h.x+h.w/2)*T,h.y*T-36);
 });
 // van
 cx.save();cx.translate(van.x,van.y);if(van.dir<0)cx.scale(-1,1);
 cx.fillStyle="#fff";cx.fillRect(-17,-11,34,22);cx.fillStyle="#ff6c45";cx.fillRect(-17,-3,34,6);
 cx.fillStyle="#9fd3ff";cx.fillRect(7,-9,8,8);cx.fillStyle="#222";cx.fillRect(-13,8,8,5);cx.fillRect(7,8,8,5);cx.restore();
 if(near>=0){cx.fillStyle="#000a";cx.fillRect(van.x-70,van.y-72,140,26);cx.fillStyle="#fff";cx.font="bold 15px sans-serif";cx.textAlign="center";cx.fillText(L("Press Space to knock"),van.x,van.y-54)}
}
function tree(x,y){cx.fillStyle="#6b4a2b";cx.fillRect(x-3,y,6,14);cx.fillStyle="#2f8f4a";cx.beginPath();cx.arc(x,y,15,0,7);cx.fill()}
var lastDraw=0,lastX=-1,lastY=-1,dirty=true;
function loop(ts){
 if(mode==="town"){
  var sp=3.2,dx=0,dy=0;
  if(keys.ArrowLeft||keys.a||keys.l)dx-=sp;if(keys.ArrowRight||keys.d||keys.r)dx+=sp;
  if(keys.ArrowUp||keys.w||keys.u)dy-=sp;if(keys.ArrowDown||keys.s||keys.dn)dy+=sp;
  if(dx&&ok(van.x+dx,van.y)){van.x+=dx;van.dir=dx>0?1:-1}
  if(dy&&ok(van.x,van.y+dy))van.y+=dy;
  near=-1;var bd=1e9;houses.forEach(function(h,i){var px=(h.door[0]+.5)*T,py=(h.door[1]+.5)*T;
   if(Math.abs(van.x-px)<T*1.1&&Math.abs(van.y-py)<T*1.1){var d=Math.abs(van.x-px)+Math.abs(van.y-py);if(d<bd){bd=d;near=i}}});
  $("knock").disabled=near<0;
  /* Low-end phones: draw about 30 times a second, and only when something changed if motion is reduced. */
  if(calm?(van.x!==lastX||van.y!==lastY||dirty):ts-lastDraw>=30){drawTown(ts);lastDraw=ts;lastX=van.x;lastY=van.y;dirty=false}
 }
 requestAnimationFrame(loop);
}
var keymap={ArrowLeft:"ArrowLeft",ArrowRight:"ArrowRight",ArrowUp:"ArrowUp",ArrowDown:"ArrowDown"};
addEventListener("keydown",function(e){
 var k=e.key.length===1?e.key.toLowerCase():e.key;
 if(k==="s")k="s";
 if(mode==="town"){
  if(k===" "||k==="Enter"){if(near>=0){e.preventDefault();startJob(near)}return}
  if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].indexOf(k)>=0)e.preventDefault();
  keys[k]=true;if(k==="s")keys.ArrowDown=true;
 }else if(mode==="job"&&/^[1-3]$/.test(k)){var b=document.querySelectorAll(".opt")[+k-1];if(b)b.click()}
});
addEventListener("keyup",function(e){var k=e.key.length===1?e.key.toLowerCase():e.key;keys[k]=false;if(k==="s")keys.ArrowDown=false});
document.querySelectorAll(".pad button").forEach(function(b){
 var m={u:"u",d:"dn",l:"l",r:"r"}[b.dataset.d];
 function on(e){e.preventDefault();keys[m]=true}function off(){keys[m]=false}
 b.addEventListener("pointerdown",on);b.addEventListener("pointerup",off);b.addEventListener("pointerleave",off);b.addEventListener("pointercancel",off);
});
$("knock").addEventListener("click",function(){if(near>=0)startJob(near)});
/* ---------- jobs ---------- */
var job,step,miss;
function show(id){dirty=true;["town","job","end","lock","cert"].forEach(function(x){$(x).classList.toggle("hidden",x!==id)})}
function startJob(i){
 job=J[i];sfx("knock");
 if(GATE.enabled&&GATE.freeJobs.indexOf(job.id)<0){mode="lock";show("lock");
  $("lock").innerHTML="<h2>"+L("Premium job")+"</h2><p>"+L("This job is part of the full game. The first job is a free demo.")+"</p><p><strong>"+L(GATE.price)+"</strong></p><p class='small'>"+L("Placeholder only. No payment is connected yet, so nothing can be bought here.")+"</p><button class='btn' id='bk'>"+L("Back to town")+"</button>";
  $("bk").onclick=backToTown;return}
 mode="job";step=0;miss=0;show("job");$("story").textContent=job.story;ask();$("q").focus();
}
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t}return a}
function ask(){
 var s=job.steps[step];$("why").classList.add("hidden");
 var q=$("q");q.innerHTML="";
 var h=document.createElement("p");h.innerHTML="<strong>"+L("Step ")+(step+1)+L(" of ")+job.steps.length+".</strong> ";h.appendChild(document.createTextNode(s.p));q.appendChild(h);
 shuffle(s.o).forEach(function(o,i){
  var b=document.createElement("button");b.className="opt";b.textContent=(i+1)+". "+o.t;
  b.onclick=function(){answer(b,o)};q.appendChild(b)});
 drawScene();$("q").focus();
}
function answer(b,o){
 var w=$("why");w.classList.remove("hidden");
 if(o.ok){
  b.classList.add("good");document.querySelectorAll(".opt").forEach(function(x){x.disabled=true});
  sfx("ok");w.innerHTML="<strong>"+L("Great job!")+"</strong> ";w.appendChild(document.createTextNode(o.why));
  var n=document.createElement("button");n.className="btn";n.style.marginLeft="10px";
  var last=step===job.steps.length-1;n.textContent=L(last?"Finish job":"Next step");
  n.onclick=function(){step++;if(last){finish()}else ask()};
  w.appendChild(document.createElement("br"));w.appendChild(n);n.focus();
  step++;drawScene();step--;
 }else{sfx("no");miss++;b.classList.add("bad");b.disabled=true;
  w.innerHTML="<strong>"+L("Not quite.")+"</strong> ";w.appendChild(document.createTextNode(o.why+L(" Try another one!")))}
}
function finish(){
 var st=miss===0?3:miss<=2?2:1,prev=save.done[job.id]||0;
 if(st>prev)save.done[job.id]=st;persist();hud();mode="end";show("end");sfx("win");
 var all=Object.keys(save.done).length===J.length;
 $("end").innerHTML="<h2>"+L("Job complete!")+"</h2><div class='stars' aria-label='"+st+L(" stars")+"'>"+"⭐".repeat(st)+"</div><p></p><p><strong>"+L("What we learned:")+"</strong> </p>"+
  (all?"<p><strong>"+L("You fixed every call in town!")+"</strong></p>":"")+(all?"<button class='btn' id='cc'>"+L("Get my certificate")+"</button> ":"")+"<button class='btn alt' id='bk'>Back to town</button>";
 $("end").children[2].textContent=L("Mistakes: ")+miss+L(miss?" (that's okay, mistakes help us learn)":" (perfect!)");
 $("end").children[3].appendChild(document.createTextNode(job.lesson));
 $("bk").onclick=backToTown;if($("cc"))$("cc").onclick=openCert;$("bk").focus();
}
function backToTown(){mode="town";show("town");keys={};hud()}
/* ---------- job scene ---------- */
function drawScene(){
 var c=sx,w=sc.width,h=sc.height,p=step/job.steps.length;
 c.fillStyle="#f0e6cf";c.fillRect(0,0,w,h);c.fillStyle="#c9b890";c.fillRect(0,h-40,w,40);
 c.textAlign="center";c.fillStyle="#17324d";c.font="bold 20px sans-serif";c.fillText(job.title,w/2,28);
 if(job.kind==="furnace"){
  var open=step>=3,off=step>=2,fixed=step>=5,closed=step>=6;
  c.fillStyle="#9aa3ad";c.fillRect(300,50,200,170);c.strokeStyle="#333";c.lineWidth=3;c.strokeRect(300,50,200,170);
  if(!closed&&open){c.fillStyle="#2a2a30";c.fillRect(312,62,176,146);
   c.fillStyle=fixed?"#3fbf6b":(step>=3?"#d9a0a0":"#888");c.fillRect(380,170,40,10);
   c.fillStyle="#ff6c45";for(var i=0;i<4;i++)c.fillRect(330+i*38,188,24,8);
   c.fillStyle="#fff";c.font="14px sans-serif";c.fillText(L(fixed?"new igniter":"igniter"),400,160);
  }else{c.fillStyle="#b8c0c8";c.fillRect(312,62,176,146);c.fillStyle="#17324d";c.font="14px sans-serif";c.fillText(L("panel on"),400,140)}
  c.fillStyle=off?"#c0504d":"#2e9e5b";c.fillRect(540,90,70,40);c.fillStyle="#fff";c.font="bold 14px sans-serif";c.fillText(L(off&&step<7?"POWER OFF":"POWER ON"),575,115);
  c.fillStyle="#17324d";c.fillText(L("service switch"),575,148);
 }else{
  var K={filter:["🌬️","Air needs a clear path"],co:["🚨","Safety first!"],heater:["🚿","Hot water, safely"],thermo:["🌡️","Small wires, big comfort"],split:["❄️","Keep the air moving"],drain:["💧","Water has to go somewhere"],outdoor:["🍃","Let the unit breathe"],smoke:["🔔","A small chirp, a big message"],dryer:["🧺","Lint is fuel for fire"],gas:["👃","Leave first, call from outside"],sheater:["🔥","Keep three feet of space"],frozen:["🧊","No flame. Tell a grown-up."],windowac:["💦","Water and plugs do not mix"],generator:["⛈️","Outdoors only, 20 feet away"],powerstrip:["🔌","Warm plugs need a grown-up"],draft:["🪟","Find the draft, skip the flame"],radiator:["♨️","Look, don't touch"],bathfan:["🚿","Let steam out, keep mold away"],fireplace:["🔥","Grown-ups light it, screens guard it"],winter:["🧣","Stay warm, stay safe"],springfilter:["🌷","Fresh air starts with a clean filter"],alarmcheck:["🔋","Test it, never with a flame"],leaves:["🍂","Give it room to breathe"],vacation:["🏖️","Away mode, home mode"]}[job.kind];
  c.font="90px sans-serif";c.fillText(K[0],w/2,150);
  c.font="20px sans-serif";c.fillText(L(K[1]),w/2,200);
 }
 c.fillStyle="#d9c9a8";c.fillRect(20,h-26,w-40,12);c.fillStyle="#2e9e5b";c.fillRect(20,h-26,(w-40)*p,12);
}

var board=$("board");J.forEach(function(j,i){var b=document.createElement("button");b.className="btn alt";b.textContent=houses[i].name+": "+(j.short||j.title.split(" on ")[0].split(" at ")[0]);b.onclick=function(){startJob(i)};board.appendChild(b)});
$("snd").addEventListener("click",function(){snd=!snd;this.textContent=L("Sound: "+(snd?"On":"Off"));this.setAttribute("aria-pressed",snd);try{localStorage.setItem("fixitvan.snd",snd?"1":"0")}catch(e){}if(snd)sfx("ok")});
$("snd").textContent=L("Sound: "+(snd?"On":"Off"));$("snd").setAttribute("aria-pressed",snd);
function openCert(){mode="cert";show("cert");$("cstars").textContent=stars();sfx("win");$("nm").focus()}
$("certBtn").onclick=openCert;
$("nm").addEventListener("input",function(){$("cname").textContent=this.value.trim()||L("A Great Helper")});
$("cprint").onclick=function(){try{window.print()}catch(e){}};
$("cback").onclick=backToTown;
hud();show("town");requestAnimationFrame(loop);
})();
