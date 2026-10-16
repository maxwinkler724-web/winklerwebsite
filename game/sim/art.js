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
window.ART={part:function(set,p){var f=A[p.id];if(set==='ac'&&p.id==='blower')f=A.blowerAH;if(set==='furnace'&&p.id==='flue')f=A.flue;
 if(!f)return '';return '<g class="art" transform="translate('+p.x+','+p.y+')" pointer-events="none">'+f(p.w,p.h)+'</g>'},back:back};
})();
