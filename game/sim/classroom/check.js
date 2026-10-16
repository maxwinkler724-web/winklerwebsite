/* Teacher page: reads saved student card files in this browser only and builds a class table. Uploads nothing. */
(function(){
"use strict";
var M=window.CLASSROOM_MODULES||[],$=function(i){return document.getElementById(i)},rows=[];
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function csvq(s){s=String(s);if(/^[=+\-@\t\r]/.test(s))s="'"+s;return /[",\n]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s}
function summarize(o,file){
 var r={file:file,name:String(o.name||"").slice(0,60),cls:String(o.cls||"").slice(0,40),date:String(o.date||"").slice(0,12),mods:{},done:0,sum:0},sc=(o.scores&&typeof o.scores==="object")?o.scores:{};
 M.forEach(function(m){var d=sc[m.key]||{},n=0;m.calls.forEach(function(c){var s=d[c.id];if(typeof s==="number"&&s>=0&&s<=100){n++;r.sum+=s}});r.mods[m.key]=n;r.done+=n});
 r.avg=r.done?Math.round(r.sum/r.done):0;return r;
}
function render(){
 var tot=M.reduce(function(a,m){return a+m.calls.length},0);
 var h='<div class="tw"><table><tr><th>Name</th><th>Class</th><th>Date</th><th>Done</th><th>Avg best</th>'+M.map(function(m){return'<th title="'+esc(m.name)+'">'+esc(m.key)+'</th>'}).join("")+'<th>File</th></tr>';
 rows.forEach(function(r){h+='<tr><td>'+esc(r.name||"(no name)")+'</td><td>'+esc(r.cls)+'</td><td>'+esc(r.date)+'</td><td>'+r.done+'/'+tot+'</td><td>'+(r.done?r.avg:"-")+'</td>'+M.map(function(m){return'<td>'+r.mods[m.key]+'/'+m.calls.length+'</td>'}).join("")+'<td class="small">'+esc(r.file)+'</td></tr>'});
 h+='</table></div><p class="small">Module columns show calls completed out of the number in that module. Avg best is the average of the best score on each completed call.</p>';
 $("out").innerHTML=rows.length?h:"";$("csv").disabled=!rows.length;
}
$("files").onchange=function(e){
 rows=[];var fs=[].slice.call(e.target.files),left=fs.length,bad=0;
 if(!left){render();return}
 fs.forEach(function(f){var rd=new FileReader();rd.onload=function(){try{var o=JSON.parse(rd.result);if(!o||o.v!==1||typeof o.scores!=="object")throw 0;rows.push(summarize(o,f.name))}catch(x){bad++}if(--left===0){rows.sort(function(a,b){return a.name.localeCompare(b.name)});render();$("msg").textContent=rows.length+" card(s) read"+(bad?"; "+bad+" file(s) were not progress cards and were skipped.":".")}};rd.onerror=function(){bad++;if(--left===0){render()}};rd.readAsText(f)});
};
$("csv").onclick=function(){
 var head=["name","class","date","calls_done","avg_best"].concat(M.map(function(m){return m.key}),["file"]);
 var out=[head.join(",")].concat(rows.map(function(r){return[r.name,r.cls,r.date,r.done,r.avg].concat(M.map(function(m){return r.mods[m.key]}),[r.file]).map(csvq).join(",")}));
 try{var b=new Blob([out.join("\n")+"\n"],{type:"text/csv"}),a=document.createElement("a");a.href=URL.createObjectURL(b);a.download="class-progress.csv";document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},500)}catch(e){$("msg").textContent="Saving a file did not work in this browser."}
};
$("print").onclick=function(){window.print()};
})();
