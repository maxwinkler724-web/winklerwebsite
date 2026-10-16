/* Mini-quiz engine. Data: window.QUIZLETS. Textual DOM only. */
(function(){
 var Q=window.QUIZLETS,app=document.getElementById("quizlet-app");if(!app||!Q)return;
 function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x)e.textContent=x;return e}
 function clr(n){while(n.firstChild)n.removeChild(n.firstChild)}
 function shuffle(a){a=a.slice();for(var j=a.length-1;j>0;j--){var k=Math.floor(Math.random()*(j+1)),t=a[j];a[j]=a[k];a[k]=t}return a}
 var L="ABCD",set=[],i=0,score=0,answered=false,miss=[],cur="";
 function menu(){clr(app);app.appendChild(el("h2","","Choose a quiz"));
  var g=el("div","chips");g.setAttribute("role","group");
  Object.keys(Q).forEach(function(id){var b=el("button","chip",Q[id].title+" ("+Q[id].q.length+" free questions)");b.type="button";b.onclick=function(){begin(id)};g.appendChild(b)});
  app.appendChild(g);
  app.appendChild(el("p","small","Free sample questions only. The full banks are part of the paid study packs (premium tier, coming soon)."));
  app.appendChild(el("p","small","Your score is not saved or sent anywhere."))}
 function mix(q){var idx=shuffle(q.o.map(function(_,k){return k}));return{q:q.q,e:q.e,o:idx.map(function(k){return q.o[k]}),a:idx.indexOf(q.a)}}
 function begin(id){cur=id;set=shuffle(Q[id].q).map(mix);i=0;score=0;miss=[];show()}
 function show(){clr(app);if(i>=set.length)return done();
  var q=set[i];answered=false;
  var h=el("p","small",Q[cur].title+" · Question "+(i+1)+" of "+set.length);app.appendChild(h);
  var card=el("div","fieldcard");var qh=el("h3","",q.q);qh.tabIndex=-1;card.appendChild(qh);
  var fb=el("div");fb.setAttribute("aria-live","polite");
  var btns=[];
  q.o.forEach(function(o,k){var b=el("button","chip",L[k]+") "+o);b.type="button";b.style.display="block";b.style.margin="8px 0";b.style.textAlign="left";btns.push(b);
   b.onclick=function(){if(answered)return;answered=true;var ok=k===q.a;if(ok)score++;else miss.push(q);
    btns.forEach(function(x,n){x.disabled=true;if(n===q.a)x.style.fontWeight="700"});
    b.setAttribute("aria-label",L[k]+") "+o+(ok?" (your answer, correct)":" (your answer, incorrect)"));
    clr(fb);fb.appendChild(el("p","note",(ok?"Correct. ":"Not quite. The answer is "+L[q.a]+". ")+q.e));
    var nx=el("button","btn",i+1<set.length?"Next question":"See results");nx.type="button";nx.onclick=function(){i++;show()};fb.appendChild(nx);nx.focus()};
   card.appendChild(b)});
  card.appendChild(fb);app.appendChild(card);qh.focus()}
 function done(){clr(app);var h=el("h2","","Results: "+score+" of "+set.length);h.tabIndex=-1;app.appendChild(h);
  app.appendChild(el("p","","This is a practice set written for this site. It is not a real exam and does not predict your result."));
  if(miss.length){app.appendChild(el("h3","","Review these"));var ul=el("ul");miss.forEach(function(q){ul.appendChild(el("li","",q.q+" Answer: "+L[q.a]+") "+q.o[q.a]+". "+q.e))});app.appendChild(ul)}
  else app.appendChild(el("p","","No misses. Nice work."));
  var b=el("button","btn","Choose another quiz");b.type="button";b.onclick=menu;app.appendChild(b);var r=el("button","btn ghost","Retry this quiz");r.type="button";r.onclick=function(){begin(cur)};app.appendChild(document.createTextNode(" "));app.appendChild(r);h.focus()}
 menu();
})();
