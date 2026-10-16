/* Store buy buttons. Put each product's Square Payment Link in js/config.js under store.links (keys match data-buy). Empty = button stays inactive.
   Optional: paypal.links with the same keys adds a "Pay with PayPal" link under the button. */
(function(){var T=window.TSB||{},L=(T.store||{}).links||{},P=(T.paypal||{}).links||{};
document.querySelectorAll("[data-buy]").forEach(function(a){var k=a.getAttribute("data-buy"),u=L[k];
if(u){a.href=u;a.rel="noopener";a.textContent="Buy now";a.removeAttribute("aria-disabled");}
else{a.addEventListener("click",function(e){e.preventDefault();});}
if(P[k]){var p=document.createElement("a");p.className="btn ghost";p.href=P[k];p.rel="noopener";p.textContent="Pay with PayPal";p.style.marginLeft="8px";a.parentNode.insertBefore(p,a.nextSibling);}
var r=document.createElement("span");r.className="small";r.style.display="block";r.style.marginTop="6px";r.innerHTML='<a href="refund.html">Refund policy</a> &middot; <a href="terms.html">Terms</a>';a.parentNode.appendChild(r);});})();
