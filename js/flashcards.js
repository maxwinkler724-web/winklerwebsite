(function(){var D=window.CARDS608,app=document.getElementById("cards-app");if(!app||!D)return;
 var deck=D.free,i=0,flip=false;
 function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x)e.textContent=x;return e}
 function draw(){while(app.firstChild)app.removeChild(app.firstChild);
  app.appendChild(el("p","small","Card "+(i+1)+" of "+deck.length+" (free deck). "+D.premium.length+" more cards are part of the premium tier, coming soon."));
  var c=el("button","fieldcard treebtn",flip?deck[i][1]:deck[i][0]);c.type="button";c.style.padding="24px";c.style.fontSize="1.2rem";c.setAttribute("aria-label",(flip?"Answer: ":"Question: ")+(flip?deck[i][1]:deck[i][0])+". Press to flip.");c.onclick=function(){flip=!flip;draw()};app.appendChild(c);
  var n=el("p");var p=el("button","btn ghost","Previous");p.type="button";p.onclick=function(){i=(i+deck.length-1)%deck.length;flip=false;draw()};
  var x=el("button","btn","Next");x.type="button";x.onclick=function(){i=(i+1)%deck.length;flip=false;draw()};
  n.appendChild(p);n.appendChild(document.createTextNode(" "));n.appendChild(x);app.appendChild(n)}
 draw()})();
