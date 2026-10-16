/* Automatic download links on thanks.html. Off unless TSB.delivery.enabled is true and apiBase is set (js/config.js).
   Stripe sends buyers here with ?session_id=...; the delivery Worker checks with Stripe that the payment is paid and returns short-lived links. */
(function(){var D=(window.TSB||{}).delivery||{};if(!D.enabled||!D.apiBase)return;
var q=new URLSearchParams(location.search),o=q.get("session_id");if(!o)return;
var man=document.getElementById("manual"),box=document.getElementById("auto"),msg=document.getElementById("auto-msg"),list=document.getElementById("auto-list");
if(!box)return;box.hidden=false;
function fail(t){msg.textContent=t;}
fetch(D.apiBase.replace(/\/$/,"")+"/api/files?session="+encodeURIComponent(o)).then(function(r){return r.json().then(function(j){return{s:r.status,j:j};});}).then(function(x){
 if(x.s===200&&x.j.items){if(man)man.hidden=true;msg.textContent="Your payment is confirmed. Download your files:";
  x.j.items.forEach(function(it){var ul=document.createElement("ul");it.files.forEach(function(f){var li=document.createElement("li"),a=document.createElement("a");a.href=f.url;a.textContent=f.name;a.rel="noopener";li.appendChild(a);ul.appendChild(li);});list.appendChild(ul);});}
 else if(x.s===402)fail("Stripe has not confirmed this payment yet. Wait a minute and reload this page. If it still does not appear, write to us and we will send your files by hand.");
 else fail("We could not find files for this order automatically. Write to us with the name on the order and we will send them by hand.");
}).catch(function(){fail("The download service did not answer. Write to us with the name on the order and we will send your files by hand.");});})();
