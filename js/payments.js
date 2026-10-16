/* Pay-by-Zelle instructions box. Shows only when TSB.payments.zelle.recipient is filled in (js/config.js). Nothing is sent anywhere. */
(function(){var P=(window.TSB||{}).payments||{},Z=P.zelle||{};var box=document.querySelector("[data-zelle]");if(!box)return;
if(!Z.recipient){return;}box.hidden=false;
function el(t,x){var e=document.createElement(t);if(x)e.textContent=x;return e}
box.appendChild(el("h3","Pay by Zelle (manual)"));
var p=el("p","Zelle payments are sent from your own bank app and we match them by hand. Send the exact price to ");var b=el("strong",Z.recipient);p.appendChild(b);if(Z.name)p.appendChild(document.createTextNode(" ("+Z.name+")"));p.appendChild(document.createTextNode("."));box.appendChild(p);
var ul=el("ul");["In the memo, write the name of the product.","Email "+(P.supportEmail||"us")+" your name and the date you paid.","Zelle payments between people are usually final, so double-check the address before you send. Only send to the address shown here.",P.deliveryNote||""].forEach(function(t){if(t)ul.appendChild(el("li",t))});box.appendChild(ul);})();
