/* Practice quiz engine. Data: window.QUIZ608. Free tier shows questions with free=1; the rest are a premium placeholder (no payment wired). */
(function(){
  var Q=window.QUIZ608||[],app=document.getElementById("quiz-app");if(!app)return;
  function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x)e.textContent=x;return e}
  function clr(n){while(n.firstChild)n.removeChild(n.firstChild)}
  var secs=["CORE","TYPE I","TYPE II","TYPE III"],set=[],i=0,score=0,answered=false,miss=[];
  function menu(){clr(app);app.appendChild(el("h2","","Choose a section"));
    var g=el("div","chips");
    secs.forEach(function(s){var all=Q.filter(function(q){return q.s===s}),fr=all.filter(function(q){return q.free});
      var b=el("button","chip",s+" ("+fr.length+" free of "+all.length+")");b.type="button";b.onclick=function(){begin(fr,s)};g.appendChild(b)});
    app.appendChild(g);
    app.appendChild(el("p","small","Free sample questions only. The full bank of "+Q.length+" questions is part of the premium tier (coming soon)."))}
  function shuffle(a){a=a.slice();for(var j=a.length-1;j>0;j--){var k=Math.floor(Math.random()*(j+1)),t=a[j];a[j]=a[k];a[k]=t}return a}
  function begin(qs,name){set=shuffle(qs);i=0;score=0;miss=[];show(name)}
  function show(name){clr(app);if(i>=set.length)return done(name);
    var q=set[i];answered=false;
    app.appendChild(el("p","small",name+" · Question "+(i+1)+" of "+set.length));
    var card=el("div","fieldcard");card.appendChild(el("h3","",q.q));
    var fb=el("div");fb.setAttribute("aria-live","polite");
    q.o.forEach(function(o,k){var b=el("button","chip","ABCD"[k]+") "+o);b.type="button";b.style.display="block";b.style.margin="8px 0";b.style.textAlign="left";
      b.onclick=function(){if(answered)return;answered=true;var ok=k===q.a;if(ok)score++;else miss.push(q);
        clr(fb);fb.appendChild(el("p","note",(ok?"Correct. ":"Not quite. The answer is "+"ABCD"[q.a]+". ")+q.e));
        var nx=el("button","btn",i+1<set.length?"Next question":"See results");nx.type="button";nx.onclick=function(){i++;show(name)};fb.appendChild(nx)};
      card.appendChild(b)});
    card.appendChild(fb);app.appendChild(card)}
  function done(name){clr(app);app.appendChild(el("h2","","Results: "+score+" of "+set.length));
    app.appendChild(el("p","","This is a practice set written for this site. It is not a real exam and does not predict your result."));
    if(miss.length){app.appendChild(el("h3","","Review these"));var ul=el("ul");miss.forEach(function(q){var li=el("li","",q.q+" Answer: "+"ABCD"[q.a]+") "+q.o[q.a]);ul.appendChild(li)});app.appendChild(ul)}
    var b=el("button","btn","Choose another section");b.type="button";b.onclick=menu;app.appendChild(b)}
  menu();
})();
