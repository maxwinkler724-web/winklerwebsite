/* Store buy buttons. Put each product's URL in js/config.js under store.links (keys match data-buy). Empty = button stays inactive. */
(function(){var L=((window.TSB||{}).store||{}).links||{};
document.querySelectorAll("[data-buy]").forEach(function(a){var u=L[a.getAttribute("data-buy")];
if(u){a.href=u;a.rel="noopener";a.textContent="Buy now";a.removeAttribute("aria-disabled");}
else{a.addEventListener("click",function(e){e.preventDefault();});}});})();
