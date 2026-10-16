/* Student progress card. Reads best scores that the simulator saved in this browser (localStorage). Sends nothing. The typed name is not stored. */
(function(){
"use strict";
var M=window.CLASSROOM_MODULES||[],$=function(i){return document.getElementById(i)};
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function read(m){var d={};try{var v=localStorage.getItem(m.save);if(v){var o=JSON.parse(v);if(o&&o.done)d=o.done}}catch(e){}return d}
function grade(s){return s>=90?"Master tech":s>=75?"Journeyman":s>=50?"Apprentice":"Needs more practice"}
var snap=null;
function collect(){
 var scores={},tot=0,done=0,sum=0;
 M.forEach(function(m){var d=read(m);scores[m.key]={};m.calls.forEach(function(c){tot++;var s=d[c.id];if(typeof s==="number"){scores[m.key][c.id]=Math.round(s);done++;sum+=s}})});
 return{scores:scores,total:tot,done:done,avg:done?Math.round(sum/done):0};
}
function render(){
 snap=collect();var h='<div class="panel"><h2 style="margin-top:0">Service Call Simulator: progress card</h2>';
 h+='<p><strong>Name:</strong> '+esc($("nm").value||"__________________")+' &nbsp; <strong>Class:</strong> '+esc($("cl").value||"__________")+' &nbsp; <strong>Date:</strong> '+esc($("dt").value||"__________")+'</p>';
 h+='<p><strong>Calls completed:</strong> '+snap.done+' of '+snap.total+' &nbsp; <strong>Average of best scores:</strong> '+(snap.done?snap.avg+"/100 ("+grade(snap.avg)+")":"none yet")+'</p></div>';
 h+='<div class="tw"><table class="cardtbl"><tr><th>Module</th><th>Call</th><th>Best score</th></tr>';
 M.forEach(function(m){var sc=snap.scores[m.key],dn=Object.keys(sc).length;
  m.calls.forEach(function(c,i){h+='<tr>'+(i===0?'<td rowspan="'+m.calls.length+'"><strong>'+esc(m.name)+'</strong><br><span class="small">'+dn+' of '+m.calls.length+' done</span></td>':'')+'<td>'+esc(c.t)+'</td><td class="s">'+(typeof sc[c.id]==="number"?sc[c.id]+"/100":"not yet")+'</td></tr>'})});
 h+='</table></div><p class="small">Scores come from this device\'s browser, so this card is an honor-system record. Your teacher may ask you to replay a call or explain a worksheet answer.</p>';
 $("card").innerHTML=h;
}
function msg(t){$("msg").textContent=t}
$("print").onclick=function(){render();window.print()};
$("refresh").onclick=function(){render();msg("Scores refreshed from this device.")};
["nm","cl","dt"].forEach(function(i){$(i).addEventListener("input",render)});
$("save").onclick=function(){
 render();
 var out={v:1,app:"Trade Study Bench Service Call Simulator",name:$("nm").value||"",cls:$("cl").value||"",date:$("dt").value||"",saved:new Date().toISOString().slice(0,10),done:snap.done,total:snap.total,scores:snap.scores};
 var nm=($("nm").value||"student").replace(/[^A-Za-z0-9_-]+/g,"_").slice(0,30)||"student";
 try{var b=new Blob([JSON.stringify(out,null,1)],{type:"application/json"}),a=document.createElement("a");a.href=URL.createObjectURL(b);a.download="progress-card-"+nm+".json";document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},500);msg("Card file saved to your downloads. Hand it in as your teacher asks.")}
 catch(e){msg("Saving a file did not work in this browser. Print the card instead.")}
};
$("clear").onclick=function(){
 if(!window.confirm("Clear the saved simulator scores on this device? Save or print your card first. This cannot be undone."))return;
 M.forEach(function(m){try{localStorage.removeItem(m.save)}catch(e){}});render();msg("Scores on this device were cleared.");
};
render();
})();
