/* Generic flashcard engine. Data: window.DECKS. Uses textContent only. */
(function(){
 var D=window.DECKS,app=document.getElementById("decks-app");if(!app||!D)return;
 function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x)e.textContent=x;return e}
 function clr(n){while(n.firstChild)n.removeChild(n.firstChild)}
 var ids=Object.keys(D),cur=ids[0],order=[],i=0,flip=false;
 function pick(id,keep){cur=id;order=D[id].free.map(function(_,k){return k});i=0;flip=false;draw(keep)}
 function shuffle(){for(var j=order.length-1;j>0;j--){var k=Math.floor(Math.random()*(j+1)),t=order[j];order[j]=order[k];order[k]=t}i=0;flip=false;draw(true)}
 function move(d){i=(i+d+order.length)%order.length;flip=false;draw(true)}
 function toggle(){flip=!flip;draw(true)}
 function draw(focusCard){
  clr(app);var d=D[cur],card=d.free[order[i]];
  var chips=el("div","chips");chips.setAttribute("role","group");chips.setAttribute("aria-label","Choose a deck");
  ids.forEach(function(id){var b=el("button","chip",D[id].title);b.type="button";b.setAttribute("aria-pressed",id===cur?"true":"false");if(id===cur)b.style.fontWeight="700";b.onclick=function(){pick(id)};chips.appendChild(b)});
  app.appendChild(chips);
  app.appendChild(el("p","small",d.source));
  var more=d.premiumCount>0?d.premiumCount+" more cards are in the paid study pack (premium tier, coming soon).":"The full guide is in the paid study pack (premium tier, coming soon).";
  app.appendChild(el("p","small","Card "+(i+1)+" of "+order.length+" (free deck). "+more));
  var txt=flip?card[1]:card[0];
  var c=el("button","fieldcard treebtn",(flip?"Answer: ":"")+txt);c.type="button";c.id="deck-card";c.style.padding="24px";c.style.fontSize="1.2rem";c.style.width="100%";c.style.textAlign="left";
  c.setAttribute("aria-label",(flip?"Answer: ":"Question: ")+txt+". Press space to flip.");c.onclick=toggle;app.appendChild(c);
  var n=el("p");
  [["Previous","btn ghost",function(){move(-1)}],["Flip","btn ghost",toggle],["Next","btn",function(){move(1)}],["Shuffle","btn ghost",shuffle]].forEach(function(s){var b=el("button",s[1],s[0]);b.type="button";b.onclick=s[2];n.appendChild(b);n.appendChild(document.createTextNode(" "))});
  app.appendChild(n);
  app.appendChild(el("p","small","Keyboard: space flips, left and right arrows move."));
  if(focusCard)c.focus();
 }
 document.addEventListener("keydown",function(e){
  var t=e.target;if(t&&t.tagName==="BUTTON"&&e.key===" "&&t.id!=="deck-card")return;
  if(e.key===" "){e.preventDefault();toggle()}
  else if(e.key==="ArrowRight"){move(1)}
  else if(e.key==="ArrowLeft"){move(-1)}
 });
 pick(cur);
})();
