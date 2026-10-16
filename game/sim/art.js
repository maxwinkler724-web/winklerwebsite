/* Realistic part illustrations for the simulator diagrams. Original vector drawings (no third-party art).
   ART.part(set,p) returns SVG drawn inside the part's box, or "" if the part has no drawing yet.
   ART.back(set) returns the equipment backdrop. Labels stay real text so the Spanish beta keeps working. */
(function(){
function R(x,y,w,h,f,rx,s,sw){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+(rx||0)+'" fill="'+f+'"'+(s?' stroke="'+s+'" stroke-width="'+(sw||1)+'"':'')+'/>'}
function C(x,y,r,f,s,sw){return '<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+f+'"'+(s?' stroke="'+s+'" stroke-width="'+(sw||1)+'"':'')+'/>'}
function E(x,y,rx,ry,f,s,sw){return '<ellipse cx="'+x+'" cy="'+y+'" rx="'+rx+'" ry="'+ry+'" fill="'+f+'"'+(s?' stroke="'+s+'" stroke-width="'+(sw||1)+'"':'')+'/>'}
function L(a,b,c,d,s,sw,x){return '<line x1="'+a+'" y1="'+b+'" x2="'+c+'" y2="'+d+'" stroke="'+s+'" stroke-width="'+(sw||1)+'"'+(x||'')+'/>'}
function P(d,f,s,sw){return '<path d="'+d+'" fill="'+f+'" stroke="'+(s||'none')+'" stroke-width="'+(sw||1)+'"/>'}
var CU='#c77b3a',CUD='#8f4f1f',BR='#d4a93c',ST='#aab4bd',STD='#6d7882',BK='#222a30',WH='#f2f2ee';
function wheel(w,h){var r=Math.min(w,h)/2-2,cx=w/2,cy=h/2,s=C(cx,cy,r,'#cfd6dc',STD,1.5),i;
 for(i=0;i<16;i++){var a=i*Math.PI/8;s+=L(cx+Math.cos(a)*r*.35,cy+Math.sin(a)*r*.35,cx+Math.cos(a)*r*.95,cy+Math.sin(a)*r*.95,STD,2.5)}
 return s+C(cx,cy,r*.35,'#eef1f3',STD,1.5)+C(cx,cy,r*.1,STD)}
function fan(w,h){var r=h/2-1,cx=w/2,cy=h/2,s=C(cx,cy,r,'#dfe5e9',BK,2),i;
 for(i=0;i<4;i++){var a=i*Math.PI/2+.5;s+=P('M'+cx+' '+cy+' Q'+(cx+Math.cos(a)*r)+' '+(cy+Math.sin(a)*r*.2+Math.sin(a+1)*r*.6)+' '+(cx+Math.cos(a+.9)*r*.9)+' '+(cy+Math.sin(a+.9)*r*.9)+' Z','#4b5660')}
 s+=C(cx,cy,r*.9,'none',BK,1)+C(cx,cy,r*.6,'none',BK,1)+C(cx,cy,r*.3,'none',BK,1);
 for(i=0;i<8;i++){var b=i*Math.PI/4;s+=L(cx,cy,cx+Math.cos(b)*r,cy+Math.sin(b)*r,BK,1)}
 return s+C(cx,cy,r*.14,BK)}
var A={
tstat:function(w,h){return R(1,1,w-2,h-2,WH,8,'#9aa',2)+C(w/2,h*.5,Math.min(w,h)*.33,'#e6e8ea','#aab',2)+R(w*.33,h*.38,w*.34,h*.24,'#1d3040',3)+'<text x="'+w/2+'" y="'+(h*.56)+'" text-anchor="middle" font-size="11" font-weight="700" fill="#7fe0ff" stroke="none">72</text>'},
disc:function(w,h){return R(2,2,w-4,h-4,'#9aa4ad',3,STD,2)+R(w*.12,h*.12,w*.76,h*.76,'#b9c1c8',2,STD,1)+R(w*.3,h*.2,w*.4,h*.6,'#d33',3,'#711',1)+L(w*.5,h*.28,w*.5,h*.72,'#fff',2)},
switch:function(w,h){return R(2,2,w-4,h-4,'#e3e0d6',3,'#99a',2)+R(w*.35,h*.15,w*.3,h*.7,'#fff',3,'#99a',1)+R(w*.4,h*.2,w*.2,h*.3,'#555',2)+C(w/2,h*.9,1.5,'#777')},
flue:function(w,h){return R(2,h*.15,w-4,h*.7,'#8d98a1',3,STD,1.5)+R(w*.2,0,w*.06,h,'#6d7882')+R(w*.74,0,w*.06,h,'#6d7882')+C(w*.5,h*.5,h*.28,'#222','#999',1.5)},
inducer:function(w,h){var cx=h/2+4,cy=h/2;return R(cx,cy-h*.18,w-cx-2,h*.36,'#8f9aa3',3,STD,1.5)+C(cx,cy,h/2-2,'#a7b2bb',STD,2)+C(cx,cy,h/2-12,'#c9d1d7',STD,1)+C(cx,cy,5,STD)+R(w*.6,cy-h*.28,w*.4-3,h*.56,'#2b3138',6)+L(w*.65,cy-h*.2,w*.65,cy+h*.2,'#555',1.5)+L(w*.75,cy-h*.2,w*.75,cy+h*.2,'#555',1.5)},
pswitch:function(w,h){var cx=w/2,cy=h/2;return C(cx,cy,h/2-2,'#c8cfd5',STD,2)+C(cx,cy,h/2-9,'#aeb7be',STD,1)+R(0,h*.38,w*.14,h*.24,'#2e8bd6',2)+R(w*.86,h*.38,w*.14,h*.24,'#2e8bd6',2)+L(cx,2,cx-8,-2,'#d33',2)+R(cx-4,0,8,5,'#333')},
board:function(w,h){var s=R(1,1,w-2,h-2,'#1f7a4a',3,'#0d4a2b',2),i;
 s+=R(w*.08,h*.12,w*.3,h*.26,BK,2)+R(w*.5,h*.12,w*.4,h*.2,'#e8e3d0',2,'#999',1)+R(w*.08,h*.55,w*.5,h*.3,'#dfe4e6',2,'#999',1);
 for(i=0;i<8;i++)s+=R(w*.1+i*w*.06,h*.6,w*.04,h*.2,'#b08a2e');
 s+=R(w*.68,h*.5,w*.24,h*.3,'#d9d4c0',3,'#888',1)+L(w*.7,h*.65,w*.9,h*.65,'#c33',2)+C(w*.45,h*.2,3,'#e33')+C(w*.55,h*.45,2,'#4d4');
 return s},
limit:function(w,h){return R(w*.1,h*.15,w*.8,h*.7,'#c3cbd1',3,STD,1.5)+C(w*.5,h*.5,h*.28,'#9aa4ad',STD,1.5)+R(w*.12,h*.4,w*.1,h*.2,BR)+R(w*.78,h*.4,w*.1,h*.2,BR)},
valve:function(w,h){return R(0,h*.38,w*.18,h*.26,BR,2,'#8a6a1e',1)+R(w*.82,h*.38,w*.18,h*.26,BR,2,'#8a6a1e',1)+R(w*.16,h*.25,w*.68,h*.55,'#b8892a',4,'#7a5a14',1.5)+R(w*.28,0,w*.18,h*.3,BK,3)+R(w*.56,h*.05,w*.14,h*.25,'#888',2)+C(w*.63,h*.55,h*.14,'#8a6a1e','#5a420e',1)+L(w*.4,h*.5,w*.5,h*.5,'#5a420e',2)},
igniter:function(w,h){return R(w*.1,h*.55,w*.8,h*.35,'#d8d2c0',2,'#998',1)+P('M'+w*.35+' '+h*.6+' L'+w*.35+' '+h*.15+' L'+w*.5+' '+h*.1+' L'+w*.65+' '+h*.15+' L'+w*.65+' '+h*.6+' Z','#8b8f93','#555',1)+R(w*.4,h*.2,w*.2,h*.4,'#f97316',1)},
sensor:function(w,h){return R(w*.05,h*.55,w*.3,h*.3,'#c8cdd1',2,STD,1)+R(w*.35,h*.62,w*.55,h*.1,'#d7dde1',1,STD,1)+L(w*.9,h*.67,w*.9,h*.12,'#c9d0d5',3)+R(w*.12,h*.25,w*.12,h*.3,'#e8e3d0',2,'#998',1)},
blower:function(w,h){var s=R(1,1,w-2,h-2,'#7f8a93',6,STD,2);var r=h/2-4;s+=C(w*.35,h/2,r,'#cfd6dc','#556',1.5);var i;for(i=0;i<14;i++){var a=i*Math.PI/7;s+=L(w*.35+Math.cos(a)*r*.4,h/2+Math.sin(a)*r*.4,w*.35+Math.cos(a)*r*.95,h/2+Math.sin(a)*r*.95,'#667',2)}
 return s+C(w*.35,h/2,r*.35,'#eef1f3','#556',1)+R(w*.62,h*.2,w*.34,h*.6,'#2b3138',5)+L(w*.72,h*.28,w*.72,h*.72,'#555',1.5)+L(w*.82,h*.28,w*.82,h*.72,'#555',1.5)},
cap:function(w,h){var s='',n=w>90?2:1,i,cw=w/n;for(i=0;i<n;i++){var x=i*cw+cw*.15,ww=cw*.7;s+=R(x,h*.15,ww,h*.75,'#c9d1d6',h*.3,'#6d7882',1.5)+R(x+ww*.15,0,ww*.25,h*.2,BR)+R(x+ww*.6,0,ww*.25,h*.2,BR)+L(x+ww*.2,h*.4,x+ww*.8,h*.4,'#9aa4ad',1)}
 return s},
filter:function(w,h){var s=R(1,1,w-2,h-2,'#b9a67c',2,'#6b5a34',2),i,n=Math.max(6,Math.floor(w/9));for(i=0;i<n;i++){var x=4+i*(w-8)/n;s+=P('M'+x+' 4 L'+(x+(w-8)/n/2)+' '+(h-4)+' L'+(x+(w-8)/n)+' 4','none','#e9e5d6',2)}return s},
rollout:function(w,h){return R(w*.08,h*.2,w*.5,h*.6,'#c3cbd1',3,STD,1.5)+C(w*.33,h*.5,h*.22,'#d33','#811',1.5)+R(w*.58,h*.4,w*.34,h*.2,'#8d98a1',2)+R(w*.88,h*.3,w*.06,h*.4,BR)},
trap:function(w,h){return '<path d="M'+w*.12+' 2 L'+w*.12+' '+h*.7+' Q'+w*.12+' '+(h-3)+' '+w*.3+' '+(h-3)+' L'+w*.5+' '+(h-3)+' Q'+w*.66+' '+(h-3)+' '+w*.66+' '+h*.7+' L'+w*.66+' '+h*.3+' L'+w*.95+' '+h*.3+'" fill="none" stroke="#e9eef2" stroke-width="'+h*.28+'" stroke-linecap="round"/><path d="M'+w*.12+' 2 L'+w*.12+' '+h*.7+' Q'+w*.12+' '+(h-3)+' '+w*.3+' '+(h-3)+' L'+w*.5+' '+(h-3)+' Q'+w*.66+' '+(h-3)+' '+w*.66+' '+h*.7+' L'+w*.66+' '+h*.3+' L'+w*.95+' '+h*.3+'" fill="none" stroke="#8aa" stroke-width="1"/>'+R(w*.08,h*.55,w*.1,h*.2,'#4aa3e0',1)},
/* outdoor condenser and indoor coil set */
fan:fan,
cond:function(w,h){var s=R(0,0,w,h,'#c4cdd4',3,STD,2),i;for(i=4;i<w-3;i+=4)s+=L(i,3,i,h-3,'#8f9aa3',1);for(i=0;i<5;i++)s+=C(6,8+i*(h-16)/4,3.5,CU,CUD,1);return s},
comp:function(w,h){return R(w*.18,h*.12,w*.64,h*.8,'#2f3a3f',h*.3,'#111',2)+E(w*.5,h*.2,w*.3,h*.1,'#46535a')+R(w*.42,0,w*.16,h*.14,CU)+R(w*.74,h*.2,w*.26,h*.1,CU)+R(w*.0,h*.45,w*.2,h*.1,CU)+R(w*.36,h*.45,w*.28,h*.28,'#1b1f22',3,'#555',1)+C(w*.43,h*.55,2,BR)+C(w*.5,h*.55,2,BR)+C(w*.57,h*.55,2,BR)},
ports:function(w,h){var s='',i;for(i=0;i<2;i++){var x=w*.12+i*w*.46;s+=R(x,h*.45,w*.3,h*.22,BR,2,'#8a6a1e',1)+R(x+w*.08,h*.12,w*.14,h*.36,i?'#1e6fd6':'#d33',2)+R(x+w*.1,h*.7,w*.1,h*.25,CU)}return s},
drier:function(w,h){return R(w*.12,h*.2,w*.76,h*.6,'#c9a063',h*.3,CUD,1.5)+R(0,h*.38,w*.14,h*.24,CU)+R(w*.86,h*.38,w*.14,h*.24,CU)+R(w*.15,h*.3,w*.06,h*.4,'#d8d8d0')},
sline:function(w,h){return R(0,h*.3,w,h*.4,'#2a2f33',h*.2)+L(w*.3,h*.3,w*.3,h*.7,'#555',1)+L(w*.6,h*.3,w*.6,h*.7,'#555',1)+R(w*.9,h*.2,w*.1,h*.6,CU)},
evap:function(w,h){var s=P('M'+w*.5+' 2 L'+(w-3)+' '+(h-3)+' L3 '+(h-3)+' Z','#c4cdd4',STD,2),i;for(i=1;i<8;i++){var y=2+i*(h-5)/8,half=(y-2)/(h-5)*(w/2-3);s+=L(w*.5-half,y,w*.5+half,y,'#8f9aa3',1)}
 return s+L(w*.5,2,w*.5,h-3,'#8f9aa3',1)+C(w*.5,5,3,CU,CUD,1)+R(3,h-8,w-6,5,CU,1)},
leak:function(w,h){return R(0,h*.38,w*.4,h*.24,CU)+R(w*.6,h*.38,w*.4,h*.24,CU)+R(w*.34,h*.28,w*.32,h*.44,'#d5b052',3,'#8a6a1e',1.5)+C(w*.5,h*.15,3,'#bfe9ff','#4aa3e0',1)+C(w*.58,h*.05,2,'#bfe9ff','#4aa3e0',1)+C(w*.42,h*.85,3,'#bfe9ff','#4aa3e0',1)},
txvp:function(w,h){return R(w*.1,h*.3,w*.3,h*.4,'#d1a640',3,'#8a6a1e',1.5)+R(w*.4,h*.2,w*.12,h*.2,BK)+'<path d="M'+w*.42+' '+h*.6+' C'+w*.6+' '+h*.9+' '+w*.7+' 0 '+w*.82+' '+h*.4+'" fill="none" stroke="#8d98a1" stroke-width="1.5"/>'+R(w*.8,h*.2,w*.16,h*.5,'#c3cbd1',3,STD,1.5)},
contactor:function(w,h){return R(w*.1,h*.08,w*.8,h*.84,BK,4,'#000',1)+R(w*.2,h*.2,w*.6,h*.2,'#3a444b',2)+C(w*.28,h*.12,3,BR)+C(w*.5,h*.12,3,BR)+C(w*.72,h*.12,3,BR)+C(w*.28,h*.88,3,BR)+C(w*.5,h*.88,3,BR)+C(w*.72,h*.88,3,BR)+R(w*.25,h*.5,w*.5,h*.22,'#d6d6cc',2)},
defrost:function(w,h){return R(1,1,w*.7,h-2,'#1f7a4a',3,'#0d4a2b',2)+R(w*.1,h*.2,w*.25,h*.3,BK,2)+R(w*.4,h*.2,w*.25,h*.5,WH,2)+C(w*.8,h*.5,5,'#2a2a2a','#555',1)+L(w*.7,h*.5,w*.78,h*.5,'#c33',2)+L(w*.7,h*.6,w*.78,h*.6,'#333',2)},
revv:function(w,h){return R(w*.26,h*.3,w*.5,h*.4,'#c9a063',h*.2,CUD,1.5)+R(w*.4,0,w*.22,h*.32,BK,3)+R(0,h*.14,w*.3,h*.1,CU)+R(w*.7,h*.14,w*.3,h*.1,CU)+R(0,h*.75,w*.3,h*.1,CU)+R(w*.7,h*.75,w*.3,h*.1,CU)}
};
A.blowerAH=function(w,h){return R(1,1,w-2,h-2,'#7f8a93',5,STD,2)+wheel(w*.55,h).replace(/^/,'<g transform="translate('+w*.05+',0)">')+'</g>'+R(w*.66,h*.2,w*.28,h*.6,'#2b3138',5)};

/* boiler, mini-split and rooftop unit parts */
A.aqua=function(w,h){return R(1,1,w-2,h-2,'#7d8790',4,'#445',1.5)+C(w*.3,h*.5,h*.3,'#e7eaec','#556',1.5)+L(w*.3,h*.5,w*.3+h*.18,h*.3,'#c22',2)+R(w*.55,h*.22,w*.38,h*.18,'#2a2f33',2)+R(w*.55,h*.55,w*.38,h*.2,'#d9d9cf',2)+C(w*.6,h*.88,2.5,BR)+C(w*.75,h*.88,2.5,BR)+C(w*.9,h*.88,2.5,BR)};
A.boiler=function(w,h){return R(w*.2,0,w*.2,h*.18,'#555',2)+R(w*.12,h*.15,w*.76,h*.85,'#a32b22',5,'#5a1410',2)+R(w*.12,h*.15,w*.76,h*.12,'#7d1f19')+R(w*.24,h*.38,w*.52,h*.42,'#2b2f33',3,'#111',1.5)+C(w*.5,h*.59,h*.14,'#444','#888',1.5)+R(w*.82,h*.45,w*.06,h*.3,BR)+R(w*.04,h*.5,w*.1,h*.12,BR)};
A.gauge=function(w,h){var r=h/2-3,cx=w/2,cy=h/2;return C(cx,cy,r,'#f4f4ee','#555',3)+C(cx,cy,r-5,'none','#999',1)+P('M'+(cx-r*.7)+' '+(cy+r*.5)+' A'+r*.85+' '+r*.85+' 0 1 1 '+(cx+r*.7)+' '+(cy+r*.5),'none','#444',1.5)+L(cx,cy,cx+r*.5,cy-r*.45,'#c22',2)+C(cx,cy,3,'#333')+R(cx-5,h-6,10,6,BR)};
A.relief=function(w,h){return R(w*.3,h*.4,w*.4,h*.55,BR,3,'#8a6a1e',1.5)+R(w*.42,h*.15,w*.16,h*.3,'#b8892a',2,'#8a6a1e',1)+L(w*.5,h*.2,w*.85,h*.08,'#555',3)+R(w*.12,h*.55,w*.2,h*.22,BR)+R(w*.4,h*.9,w*.2,h*.1,'#c77b3a')};
A.expt=function(w,h){var rx=Math.min(w,h)*.34;return E(w*.5,h*.55,rx*1.1,h*.42,'#2d6cc0','#123c78',2)+E(w*.5,h*.25,rx*.7,h*.1,'#4a86d6')+R(w*.45,0,w*.1,h*.16,'#222',1)+R(w*.46,h*.9,w*.08,h*.1,BR)};
A.fill=function(w,h){return R(0,h*.42,w*.22,h*.22,BR,2)+R(w*.78,h*.42,w*.22,h*.22,BR,2)+R(w*.2,h*.28,w*.6,h*.5,'#b8892a',h*.15,'#7a5a14',1.5)+R(w*.4,0,w*.2,h*.3,'#222',3)+L(w*.5,h*.1,w*.9,h*.1,'#c22',3)};
A.circ=function(w,h){return R(0,h*.55,w*.22,h*.22,'#9aa4ad',2,STD,1)+R(w*.78,h*.55,w*.22,h*.22,'#9aa4ad',2,STD,1)+R(w*.18,h*.4,w*.64,h*.5,'#3b6fb0',4,'#123c78',1.5)+R(w*.34,0,w*.32,h*.45,'#c9c9c0',4,'#777',1.5)+R(w*.4,h*.1,w*.2,h*.12,'#2a2f33',1)};
A.pipes=function(w,h){return R(0,h*.2,w,h*.22,CU,h*.1,CUD,1)+R(0,h*.58,w,h*.22,'#9a6a3a',h*.1,CUD,1)+R(w*.08,h*.12,w*.1,h*.36,'#c33',2)+R(w*.08,h*.5,w*.1,h*.36,'#2e8bd6',2)+P('M'+w*.5+' '+h*.2+' l'+w*.06+' '+h*.1+' l-'+w*.06+' 0 z','#c33')};
A.zv1=A.zv2=function(w,h){return R(w*.08,h*.5,w*.84,h*.28,'#c9a063',4,CUD,1.5)+R(w*.28,h*.05,w*.44,h*.5,'#f2f2ee',5,'#999',1.5)+R(w*.4,h*.12,w*.2,h*.1,'#333',1)+R(0,h*.55,w*.12,h*.18,CU)+R(w*.88,h*.55,w*.12,h*.18,CU)};
A.vent=function(w,h){return R(w*.38,h*.35,w*.24,h*.55,BR,3,'#8a6a1e',1.5)+R(w*.28,h*.12,w*.44,h*.28,'#b8892a',6,'#7a5a14',1.5)+R(w*.44,0,w*.12,h*.15,'#222',1)+R(w*.46,h*.88,w*.08,h*.12,BR)};
A.rad=function(w,h){var s=R(0,h*.3,w,h*.5,'#e7e3d8',3,'#998',1.5),i;for(i=6;i<w-4;i+=6)s+=L(i,h*.34,i,h*.76,'#c9c4b4',1);return s+R(0,h*.5,w,h*.1,CU)};
/* mini-split */
A.obrd=function(w,h){return R(1,1,w-2,h-2,'#1f7a4a',3,'#0d4a2b',2)+R(w*.08,h*.15,w*.26,h*.3,BK,2)+R(w*.4,h*.15,w*.5,h*.15,'#e8e3d0',2)+R(w*.08,h*.6,w*.84,h*.22,'#d9d4c0',2,'#888',1)+C(w*.2,h*.71,3,BR)+C(w*.4,h*.71,3,BR)+C(w*.6,h*.71,3,BR)+C(w*.8,h*.71,3,BR)};
A.cable=function(w,h){return '<path d="M2 '+h*.3+' C'+w*.4+' '+h*.1+' '+w*.5+' '+h*.9+' '+(w-2)+' '+h*.7+'" fill="none" stroke="#2a2f33" stroke-width="'+h*.22+'" stroke-linecap="round"/><path d="M2 '+h*.3+' C'+w*.4+' '+h*.1+' '+w*.5+' '+h*.9+' '+(w-2)+' '+h*.7+'" fill="none" stroke="#c33" stroke-width="2"/>'+R(0,h*.2,w*.1,h*.2,BR)+R(w*.9,h*.6,w*.1,h*.2,BR)};
A.flare=function(w,h){return R(w*.05,h*.35,w*.35,h*.3,BR,3,'#8a6a1e',1.5)+R(w*.6,h*.35,w*.35,h*.3,BR,3,'#8a6a1e',1.5)+R(w*.4,h*.2,w*.2,h*.6,'#c3cbd1',3,STD,1)+R(w*.08,h*.1,w*.1,h*.28,BK,2)+R(w*.7,h*.1,w*.1,h*.28,BK,2)};
A.ibrd=A.obrd;A.ocoil=A.cond;A.ofan=A.fan;
A.sens=function(w,h){return L(w*.2,h*.2,w*.2,h*.7,'#333',2)+E(w*.2,h*.78,5,7,'#2a2a2a','#555',1)+L(w*.6,h*.2,w*.6,h*.6,'#333',2)+R(w*.5,h*.6,w*.2,h*.3,'#d9d9cf',3,'#888',1)};
A.icoil=function(w,h){var s=R(1,h*.15,w-2,h*.7,'#c4cdd4',3,STD,1.5),i;for(i=5;i<w-3;i+=5)s+=L(i,h*.18,i,h*.82,'#8f9aa3',1);return s+R(1,h*.1,w-2,5,CU)};
A.filt=function(w,h){return A.filter(w,h)};
A.ifan=function(w,h){var s=R(1,h*.15,w-2,h*.7,'#eef1f3',h*.3,STD,1.5),i;for(i=6;i<w-4;i+=6)s+=L(i,h*.2,i-3,h*.8,'#9aa4ad',2);return s};
A.disp=function(w,h){return R(w*.28,1,w*.44,h-2,WH,8,'#999',2)+R(w*.34,h*.1,w*.32,h*.3,'#1d3040',2)+C(w*.42,h*.62,3,'#c33')+C(w*.58,h*.62,3,'#555')+C(w*.5,h*.8,3,'#555')};
/* rooftop unit */
A.ctrl=function(w,h){return R(w*.1,h*.08,w*.8,h*.84,'#5c6670',4,'#333',1.5)+R(w*.2,h*.2,w*.4,h*.28,'#1d3040',2)+'<text x="'+w*.4+'" y="'+h*.4+'" text-anchor="middle" font-size="10" font-weight="700" fill="#7fe0ff" stroke="none">63F</text>'+C(w*.76,h*.34,5,'#eee','#999',1)+R(w*.2,h*.6,w*.6,h*.2,'#d9d9cf',2)+C(w*.3,h*.7,2.5,BR)+C(w*.5,h*.7,2.5,BR)+C(w*.7,h*.7,2.5,BR)};
A.act=function(w,h){return R(w*.15,h*.12,w*.5,h*.7,'#2a2f33',6,'#000',1.5)+R(w*.65,h*.4,w*.3,h*.18,'#aab4bd',2)+R(w*.2,h*.2,w*.18,h*.12,'#ccc',1)+L(w*.4,h*.82,w*.4,h,BK,3)};
A.link=function(w,h){return R(w*.04,h*.55,w*.9,h*.1,'#8d98a1',2,STD,1)+C(w*.08,h*.6,h*.14,'#6d7882',STD,1)+C(w*.9,h*.6,h*.14,'#6d7882',STD,1)+L(w*.08,h*.6,w*.25,h*.2,'#8d98a1',4)+C(w*.25,h*.2,h*.1,'#555')};
A.damp=function(w,h){var s=R(1,1,w-2,h-2,'#8d98a1',2,STD,2),i,n=6;for(i=0;i<n;i++){var y=6+i*(h-12)/n;s+=P('M6 '+(y+(h-12)/n*.7)+' L'+(w-6)+' '+y+' L'+(w-6)+' '+(y+4)+' L6 '+(y+(h-12)/n*.7+4)+' Z','#c3cbd1',STD,1)}return s};
A.oas=function(w,h){return L(w*.5,h*.12,w*.5,h*.75,'#333',3)+R(w*.4,h*.7,w*.2,h*.25,'#c3cbd1',3,STD,1.5)+C(w*.5,h*.1,5,'#2a2a2a','#666',1)+L(w*.1,h*.85,w*.9,h*.85,'#999',1)};
A.mas=function(w,h){return R(w*.1,h*.2,w*.8,h*.3,'#9aa4ad',2,STD,1)+L(w*.5,h*.5,w*.5,h*.95,'#333',2)+R(w*.4,h*.4,w*.2,h*.2,'#d9d9cf',2,'#888',1)+'<path d="M'+w*.15+' '+h*.35+' q'+w*.1+' -'+h*.2+' '+w*.2+' 0 t'+w*.2+' 0 t'+w*.2+' 0" fill="none" stroke="#3b6fb0" stroke-width="1.5"/>'};
A.enth=function(w,h){return R(w*.2,h*.12,w*.6,h*.7,'#e7e3d8',5,'#999',1.5)+C(w*.5,h*.4,h*.22,'#fff','#aab',1.5)+'<path d="M'+w*.5+' '+h*.25+' q'+w*.1+' '+h*.14+' 0 '+h*.2+' q-'+w*.1+' -'+h*.06+' 0 -'+h*.2+'" fill="#4aa3e0"/>'+R(w*.4,h*.8,w*.2,h*.12,'#777')};
A.mech=function(w,h){return R(w*.06,h*.2,w*.4,h*.7,'#c4cdd4',3,STD,1.5)+R(w*.56,h*.15,w*.38,h*.75,'#2f3a3f',h*.25,'#111',1.5)+L(w*.46,h*.4,w*.56,h*.4,CU,3)+L(w*.46,h*.7,w*.56,h*.7,CU,3)};
A.bld=function(w,h){return P('M'+w*.1+' '+h*.45+' L'+w*.5+' '+h*.08+' L'+w*.9+' '+h*.45+' Z','#a32b22','#5a1410',1.5)+R(w*.2,h*.45,w*.6,h*.5,'#e9dfc9',1,'#8a7a55',1.5)+R(w*.44,h*.62,w*.14,h*.33,'#7a5a14',1)+R(w*.26,h*.55,w*.12,h*.14,'#8ec5ee',1)+R(w*.64,h*.55,w*.12,h*.14,'#8ec5ee',1)};

/* condensing boiler, steam boiler, ECM blower, refrigeration and steam heat exchanger parts */
A['condensing.ctrl']=A['ecm.ctrl']=function(w,h){return R(w*.06,h*.08,w*.88,h*.84,'#39434c',5,'#111',1.5)+R(w*.14,h*.2,w*.5,h*.34,'#1d3040',2)+'<text x="'+w*.39+'" y="'+h*.46+'" text-anchor="middle" font-size="11" font-weight="700" fill="#7fe0ff" stroke="none">140F</text>'+C(w*.76,h*.3,5,'#ddd','#888',1)+R(w*.14,h*.65,w*.18,h*.15,'#aab4bd',2)+R(w*.38,h*.65,w*.18,h*.15,'#aab4bd',2)+R(w*.62,h*.65,w*.18,h*.15,'#aab4bd',2)};
A['ecm.ctrl']=function(w,h){return R(w*.1,h*.12,w*.8,h*.76,'#2a2f33',5,'#000',1.5)+R(w*.18,h*.22,w*.4,h*.5,'#d6d6cc',2)+R(w*.66,h*.22,w*.18,h*.14,'#e8e3d0',2)+C(w*.75,h*.6,4,BR)+L(w*.22,h*.4,w*.54,h*.4,'#999',1)+L(w*.22,h*.55,w*.54,h*.55,'#999',1)};
A.flame=function(w,h){return R(w*.05,h*.62,w*.9,h*.18,'#8d98a1',2,STD,1)+L(w*.25,h*.62,w*.25,h*.12,'#c9d0d5',3)+L(w*.5,h*.62,w*.5,h*.2,'#c9d0d5',3)+L(w*.75,h*.62,w*.75,h*.2,'#c9d0d5',3)+R(w*.2,h*.5,w*.1,h*.14,'#e8e3d0',1,'#998',1)+R(w*.45,h*.5,w*.1,h*.14,'#e8e3d0',1,'#998',1)+R(w*.7,h*.5,w*.1,h*.14,'#e8e3d0',1,'#998',1)+P('M'+w*.5+' '+h*.2+' l5 -9 l5 9 z','#2a7de1')};
A.gas=A.valve;
A.burn=function(w,h){var s=R(w*.1,h*.05,w*.8,h*.9,'#aab4bd',8,STD,2),i;for(i=0;i<6;i++)s+='<ellipse cx="'+w*.5+'" cy="'+(h*.2+i*h*.12)+'" rx="'+w*.3+'" ry="'+h*.05+'" fill="none" stroke="#6d7882" stroke-width="3"/>';return s+R(w*.4,h*.02,w*.2,h*.12,'#555',2)};
A.drain=function(w,h){return R(0,h*.28,w,h*.3,'#f1f4f6',h*.12,'#8aa',1.5)+P('M'+w*.3+' '+h*.78+' L'+w*.7+' '+h*.78+' l-6 -5 m6 5 l-6 5','none','#2d7',2)+R(w*.88,h*.55,w*.1,h*.35,'#8aa',2)+C(w*.93,h*.9,2.5,'#4aa3e0')};
A.aps=function(w,h){return R(w*.5,h*.25,w*.4,h*.5,'#c3cbd1',4,STD,1.5)+C(w*.7,h*.5,h*.15,'#9aa4ad',STD,1)+'<path d="M'+w*.5+' '+h*.5+' C'+w*.3+' '+h*.1+' '+w*.2+' '+h*.9+' '+w*.05+' '+h*.5+'" fill="none" stroke="#2e8bd6" stroke-width="4" stroke-linecap="round"/>'+R(w*.86,h*.4,w*.1,h*.2,BR)};
A.anal=function(w,h){return R(w*.3,h*.15,w*.4,h*.7,'#d9dee2',4,STD,1.5)+C(w*.5,h*.5,h*.22,'#222','#aaa',2)+L(w*.5,h*.5,w*.9,h*.25,'#999',2)+C(w*.92,h*.22,3,'#c33')};
A['condensing.vent']=function(w,h){return R(w*.05,h*.35,w*.55,h*.3,'#f1f4f6',h*.1,'#8aa',1.5)+R(w*.55,h*.1,w*.3,h*.8,'#f1f4f6',4,'#8aa',1.5)+L(w*.6,h*.2,w*.8,h*.2,'#aab',1)+L(w*.6,h*.4,w*.8,h*.4,'#aab',1)+L(w*.6,h*.6,w*.8,h*.6,'#aab',1)+R(w*.88,h*.05,w*.1,h*.9,'#c9b99a',1)};
A.intake=function(w,h){return R(w*.05,h*.35,w*.55,h*.3,'#f1f4f6',h*.1,'#8aa',1.5)+C(w*.72,h*.5,h*.38,'#f1f4f6','#8aa',1.5)+C(w*.72,h*.5,h*.26,'#888')+R(w*.88,h*.05,w*.1,h*.9,'#c9b99a',1)};
A.plug=function(w,h){var s=R(w*.1,h*.15,w*.8,h*.7,'#e8e8e0',3,'#777',1.5),i;for(i=0;i<8;i++)s+=R(w*.16+i*w*.09,h*.3,w*.06,h*.2,BR)+R(w*.16+i*w*.09,h*.58,w*.06,h*.2,BR);return s};
A.motor=function(w,h){return R(w*.2,h*.18,w*.5,h*.64,'#3a444b',h*.25,'#111',1.5)+R(w*.66,h*.28,w*.18,h*.44,'#2a2f33',3)+R(w*.1,h*.46,w*.12,h*.08,'#aab4bd')+R(w*.84,h*.4,w*.1,h*.2,'#aab4bd')+C(w*.45,h*.5,3,'#777')};
A.coil=A.evap;
A.duct=function(w,h){var s=R(0,h*.15,w*.6,h*.55,'#aab4bd',2,STD,1.5)+R(w*.58,h*.1,w*.4,h*.7,'#f1f1ea',2,'#999',1.5),i;for(i=0;i<6;i++)s+=L(w*.62,h*.18+i*h*.1,w*.94,h*.18+i*h*.1,'#aaa',2);return s+L(w*.1,h*.15,w*.1,h*.7,'#8f9aa3',1)};
A.sp=function(w,h){return C(w*.3,h*.5,h*.36,'#f4f4ee','#555',2.5)+L(w*.3,h*.5,w*.3+h*.2,h*.3,'#c22',2)+R(w*.62,h*.2,w*.08,h*.3,BR)+R(w*.8,h*.2,w*.08,h*.3,BR)+'<path d="M'+(w*.66)+' '+h*.5+' C'+w*.6+' '+h*.9+' '+w*.4+' '+h*.9+' '+(w*.4)+' '+h*.8+'" fill="none" stroke="#2e8bd6" stroke-width="2"/>'};
A.dtim=function(w,h){return R(w*.1,h*.08,w*.8,h*.84,'#cfd6dc',4,STD,1.5)+C(w*.38,h*.5,h*.3,'#f4f4ee','#555',1.5)+L(w*.38,h*.5,w*.38+h*.15,h*.3,'#c22',2)+R(w*.65,h*.2,w*.2,h*.2,'#1d3040',2)+C(w*.75,h*.7,4,BR)};
A.lklog=function(w,h){return R(w*.25,h*.05,w*.5,h*.9,'#b99a62',3,'#6b5a34',1.5)+R(w*.3,h*.15,w*.4,h*.75,WH,1)+R(w*.4,h*.02,w*.2,h*.1,'#777',2)+L(w*.34,h*.3,w*.66,h*.3,'#99a',1)+L(w*.34,h*.45,w*.66,h*.45,'#99a',1)+L(w*.34,h*.6,w*.58,h*.6,'#99a',1)};
A.heat=function(w,h){var s='',i;for(i=0;i<3;i++)s+=R(w*.08,h*.12+i*h*.28,w*.84,h*.14,'#8d98a1',h*.07,STD,1)+R(w*.86,h*.12+i*h*.28,w*.1,h*.14,'#333',2)+L(w*.2,h*.19+i*h*.28,w*.8,h*.19+i*h*.28,'#f97316',2);return s};
A.term=function(w,h){return R(w*.1,h*.35,w*.2,h*.3,'#c3cbd1',3,STD,1)+'<path d="M'+w*.3+' '+h*.5+' C'+w*.5+' '+h*.1+' '+w*.6+' '+h*.9+' '+w*.8+' '+h*.5+'" fill="none" stroke="#333" stroke-width="2"/>'+C(w*.85,h*.5,6,'#2a2a2a','#666',1)};
A.efan=A.fan;A.efan=function(w,h){return fan(w,h)};
A.gask=function(w,h){return R(w*.15,h*.05,w*.7,h*.9,'#dfe5e9',3,STD,2)+R(w*.2,h*.1,w*.6,h*.8,'none',2,'#222',4)+R(w*.78,h*.4,w*.08,h*.2,'#555',2)+L(w*.5,h*.1,w*.5,h*.9,'#bbb',1)};
A.box=function(w,h){return R(w*.1,h*.15,w*.8,h*.7,'#e9eef2',3,STD,1.5)+R(w*.3,h*.3,w*.4,h*.2,'#1d3040',2)+'<text x="'+w*.5+'" y="'+h*.45+'" text-anchor="middle" font-size="10" font-weight="700" fill="#7fe0ff" stroke="none">36F</text>'+L(w*.5,h*.5,w*.5,h*.75,'#333',2)};
A.ice=function(w,h){return R(w*.35,h*.15,w*.3,h*.7,'#2e8bd6',5,'#123c78',1.5)+R(w*.3,h*.1,w*.4,h*.12,'#9aa4ad',2)+R(w*.05,h*.4,w*.3,h*.15,'#aab4bd')+R(w*.65,h*.4,w*.3,h*.15,'#aab4bd')};
A.evpl=function(w,h){var s=R(w*.1,h*.1,w*.8,h*.8,'#cfd6dc',3,STD,1.5),i,j;for(i=0;i<5;i++)for(j=0;j<2;j++)s+=R(w*.16+i*w*.15,h*.2+j*h*.38,w*.11,h*.26,'#eaf6ff',4,'#9cc',1);return s};
A.therm=function(w,h){return C(w*.5,h*.3,h*.18,'#2a2a2a','#666',1.5)+L(w*.5,h*.45,w*.4,h*.95,'#c33',2)+L(w*.5,h*.45,w*.6,h*.95,'#333',2)};
A.bin=function(w,h){return R(w*.3,h*.1,w*.4,h*.35,'#c3cbd1',3,STD,1.5)+L(w*.5,h*.45,w*.5,h*.9,'#8d98a1',3)+R(w*.35,h*.8,w*.3,h*.1,'#aab4bd',2)};
A.tcv=function(w,h){return R(w*.1,h*.5,w*.8,h*.3,'#9aa4ad',4,STD,1.5)+R(w*.4,h*.28,w*.2,h*.25,'#8d98a1',2)+R(w*.28,h*.02,w*.44,h*.3,'#2d6cc0',5,'#123c78',1.5)+R(0,h*.52,w*.12,h*.26,'#6d7882',2)+R(w*.88,h*.52,w*.12,h*.26,'#6d7882',2)};
A.hx=function(w,h){return R(w*.05,h*.15,w*.9,h*.6,'#aab4bd',h*.25,STD,2)+R(w*.02,h*.1,w*.1,h*.7,'#6d7882',2)+R(w*.88,h*.1,w*.1,h*.7,'#6d7882',2)+R(w*.3,0,w*.1,h*.2,'#555')+R(w*.6,h*.72,w*.1,h*.26,'#555')+L(w*.15,h*.4,w*.85,h*.4,'#8f9aa3',2)+L(w*.15,h*.55,w*.85,h*.55,'#8f9aa3',2)};
A.load=function(w,h){return L(w*.3,h*.1,w*.3,h*.8,'#333',3)+C(w*.3,h*.85,6,'#c33')+R(w*.55,h*.25,w*.35,h*.5,'#1d3040',3,'#555',1.5)+'<text x="'+w*.72+'" y="'+h*.58+'" text-anchor="middle" font-size="11" font-weight="700" fill="#7fe0ff" stroke="none">95F</text>'};
A.vb=function(w,h){return R(w*.38,h*.35,w*.24,h*.6,BR,3,'#8a6a1e',1.5)+C(w*.5,h*.28,h*.2,'#b8892a','#7a5a14',1.5)+R(w*.46,0,w*.08,h*.12,'#555')+R(w*.15,h*.6,w*.25,h*.18,BR)+R(w*.6,h*.6,w*.25,h*.18,BR)};
A.strn=function(w,h){return R(w*.08,h*.4,w*.84,h*.3,'#6d7882',4,'#333',1.5)+P('M'+w*.3+' '+h*.4+' L'+w*.6+' '+h*.4+' L'+w*.7+' '+h*.1+' L'+w*.5+' '+h*.1+' Z','#7d8790','#333',1.5)+R(w*.55,h*.7,w*.14,h*.25,BR)+R(w*.42,h*.02,w*.12,h*.1,'#555')};
A.ret=function(w,h){return R(w*.08,h*.2,w*.5,h*.7,'#8d98a1',h*.3,STD,2)+R(w*.62,h*.4,w*.3,h*.4,'#2d6cc0',4,'#123c78',1.5)+L(w*.58,h*.7,w*.62,h*.7,'#555',3)+R(w*.3,0,w*.06,h*.2,'#555')};
A.main=function(w,h){return R(0,h*.2,w,h*.22,'#7d8790',h*.1,'#444',1.5)+R(w*.62,h*.35,w*.1,h*.5,'#7d8790',2,'#444',1)+R(w*.56,h*.8,w*.22,h*.14,'#6d7882',2)+L(w*.1,h*.15,w*.1,h*.3,'#eee',1)};
A.supp=function(w,h){return P('M0 '+h*.55+' L'+w+' '+h*.35,'none','#7d8790',h*.2)+L(w*.3,0,w*.3,h*.55,'#444',2)+L(w*.7,0,w*.7,h*.45,'#444',2)+R(w*.24,h*.38,w*.12,h*.2,'#444',2)+R(w*.64,h*.25,w*.12,h*.2,'#444',2)};
A.iso=function(w,h){return R(0,h*.5,w,h*.2,'#7d8790',4,'#444',1.5)+R(w*.2,h*.15,w*.12,h*.4,'#9aa4ad',2,STD,1)+C(w*.26,h*.12,h*.12,'#c33','#811',1)+R(w*.65,h*.15,w*.12,h*.4,'#9aa4ad',2,STD,1)+C(w*.71,h*.12,h*.12,'#c33','#811',1)+'<path d="M'+w*.1+' '+h*.5+' L'+w*.1+' '+h*.88+' L'+w*.9+' '+h*.88+' L'+w*.9+' '+h*.7+'" fill="none" stroke="#7d8790" stroke-width="5"/>'};
A['steamhx.trap']=function(w,h){return R(w*.25,h*.2,w*.5,h*.6,'#8d98a1',h*.25,STD,2)+R(w*.4,h*.05,w*.2,h*.2,'#6d7882',2)+R(0,h*.4,w*.28,h*.2,'#6d7882',2)+R(w*.72,h*.4,w*.28,h*.2,'#6d7882',2)+C(w*.5,h*.5,h*.14,'#c9d1d7',STD,1)};
A.ptrolp=function(w,h){return R(w*.08,h*.08,w*.84,h*.84,'#6b4a2f',4,'#2b1a0e',1.5)+C(w*.35,h*.45,h*.3,'#e7eaec','#555',1.5)+L(w*.35,h*.45,w*.35+h*.18,h*.3,'#c22',2)+R(w*.62,h*.2,w*.26,h*.2,'#d9d9cf',2)+R(w*.62,h*.55,w*.26,h*.2,'#d9d9cf',2)};
A.glass=function(w,h){return R(w*.42,h*.05,w*.16,h*.9,'#e9f4fb',3,'#789',1.5)+R(w*.43,h*.4,w*.14,h*.55,'#4aa3e0')+R(w*.3,h*0,w*.4,h*.1,BR)+R(w*.3,h*.9,w*.4,h*.1,BR)};
A.lwcop=function(w,h){return C(w*.5,h*.6,h*.3,'#9a6a3a',CUD,2)+R(w*.4,h*.05,w*.2,h*.3,'#c9c9c0',3,'#777',1.5)+R(w*.1,h*.52,w*.18,h*.16,CU)+R(w*.72,h*.52,w*.18,h*.16,CU)+R(w*.44,h*.12,w*.12,h*.1,'#333',1)};
A.feeder=function(w,h){return R(w*.3,h*.1,w*.4,h*.7,'#b8892a',6,'#7a5a14',1.5)+R(w*.2,h*.55,w*.6,h*.2,BR,3)+R(w*.42,0,w*.16,h*.14,'#2a2f33',3)+R(w*.46,h*.8,w*.08,h*.18,BR)};
A.mainv=function(w,h){return R(0,h*.65,w,h*.22,'#7d8790',h*.1,'#444',1.5)+R(w*.42,h*.3,w*.16,h*.4,BR,2,'#8a6a1e',1)+R(w*.36,h*.05,w*.28,h*.3,'#b8892a',8,'#7a5a14',1.5)};
A.rad1=A.rad2=function(w,h){var s='',i,n=Math.floor(w/14);for(i=0;i<n;i++)s+=R(4+i*(w-8)/n,h*.1,(w-8)/n-3,h*.75,'#d8d4c8',5,'#8a8574',1.5);return s+R(0,h*.82,w,h*.08,'#8a8574')};
A.rvp=function(w,h){return R(w*.42,h*.4,w*.16,h*.5,BR,3,'#8a6a1e',1.5)+C(w*.5,h*.3,h*.22,'#b8892a','#7a5a14',1.5)+L(w*.5,h*.1,w*.5,h*.22,'#555',2)+R(w*.1,h*.7,w*.8,h*.18,'#d8d4c8',3,'#8a8574',1)};
A.hart=function(w,h){return '<path d="M'+w*.1+' '+h*.15+' L'+w*.1+' '+h*.75+' L'+w*.9+' '+h*.75+' L'+w*.9+' '+h*.15+'" fill="none" stroke="#7d8790" stroke-width="'+h*.14+'" stroke-linecap="round"/>'+'<path d="M'+w*.1+' '+h*.15+' L'+w*.1+' '+h*.75+' L'+w*.9+' '+h*.75+' L'+w*.9+' '+h*.15+'" fill="none" stroke="#444" stroke-width="1"/>'+R(w*.4,h*.5,w*.2,h*.2,'#555',2)+L(w*.5,h*.05,w*.5,h*.5,'#7d8790',4)};
var FUR='Gas furnace';
function back(set){
 if(set==='furnace'){var s=R(120,20,360,400,'#cdd5db',6,'#4b5660',3)+R(128,28,344,384,'#dde3e8',4,'#aab4bd',1),i;
  /* heat exchanger cells and burner box drawn behind the parts */
  for(i=0;i<4;i++){var x=262+i*50;s+=P('M'+x+' 112 C'+(x+36)+' 118 '+(x-6)+' 160 '+(x+30)+' 206','none','#a85a2a',10)+P('M'+x+' 112 C'+(x+36)+' 118 '+(x-6)+' 160 '+(x+30)+' 206','none','#c9733a',6)}
  s+=R(140,206,330,64,'#8d98a1',3,STD,1.5);
  for(i=0;i<4;i++){s+=R(268+i*50,246,26,18,'#6d7882',2,'#445',1)+P('M'+(272+i*50)+' 246 l4 -8 l4 8 l4 -8 l4 8 z','#2a7de1')}
  s+=R(140,272,330,6,BR,2,'#8a6a1e',1)+R(130,430,0,0,'none');
  s+=R(140,340,330,12,'#aab4bd')+R(140,352,330,3,'#667');
  s+=R(120,20,360,10,'#9aa4ad')+R(120,410,360,10,'#9aa4ad');
  return s}
 if(set==='ac'){
  var u=R(10,10,290,300,'#dde3e8',8,'#4b5660',3),j;for(j=0;j<14;j++)u+=L(18,38+j*18,292,38+j*18,'#cfd6dc',1);
  u+=R(10,10,290,300,'none',8,'#4b5660',3);
  /* refrigerant lines between outdoor unit and indoor coil */
  u+=L(300,262,330,262,CU,4)+L(300,252,340,252,'#2a2f33',7)+P('M300 262 L330 262 L330 230','none',CU,4);
  var ah=R(320,190,170,220,'#c9d1d8',8,'#4b5660',3)+R(326,196,158,208,'#dde3e8',5,'#aab4bd',1)+L(330,336,484,336,'#8d98a1',2);
  return u+ah}
 return ''}
var OK={furnace:1,ac:1,boiler:1,minisplit:1,rtu:1,steam:1,condensing:1,ecm:1,refrig:1,steamhx:1};
window.ART={part:function(set,p){if(!OK[set])return '';var f=A[set+'.'+p.id]||A[p.id];if(set==='ac'&&p.id==='blower')f=A.blowerAH;if(set==='furnace'&&p.id==='flue')f=A.flue;
 if(!f)return '';return '<g class="art" transform="translate('+p.x+','+p.y+')" pointer-events="none">'+f(p.w,p.h)+'</g>'},back:back};
})();
