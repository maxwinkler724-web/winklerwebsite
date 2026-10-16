/* Opt-in email signup form. Fills every <form data-tsb-signup>. Switched off until TSB.signup.action is set in js/config.js. */
(function(){var cfg=(window.TSB||{}).signup||{};var on=!!cfg.action;
document.querySelectorAll("form[data-tsb-signup]").forEach(function(f,i){
var id="su"+i;f.className="signup";
f.innerHTML='<strong>Get new lessons by email</strong>'+
'<p class="note" style="margin:8px 0">Optional. We use your address only to send new lessons and study tips, never sell or share it, and every email has an unsubscribe link. See the <a href="'+(f.getAttribute("data-root")||"")+'privacy.html">privacy page</a>.</p>'+
'<label for="'+id+'">Email address</label> <input id="'+id+'" type="email" name="'+(cfg.emailField||"email")+'" autocomplete="email" required placeholder="you@example.com"> '+
'<button class="btn" type="submit">Sign up</button>'+
'<p class="note" role="status" style="margin:8px 0">'+(on?"":"Signup opens soon. This form is switched off for now.")+'</p>';
if(on){f.action=cfg.action;f.method=cfg.method||"post";}
else{f.addEventListener("submit",function(e){e.preventDefault();});var b=f.querySelector("button"),inp=f.querySelector("input");b.disabled=true;inp.disabled=true;}
});})();
