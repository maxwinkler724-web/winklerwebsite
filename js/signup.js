/* Opt-in email signup form. Fills every <form data-tsb-signup>. Switched off until TSB.signup.action is set in js/config.js. */
(function(){var cfg=(window.TSB||{}).signup||{};var on=!!cfg.action;
document.querySelectorAll("form[data-tsb-signup]").forEach(function(f,i){
var id="su"+i;f.className="signup";
f.innerHTML='<strong>Get the HVAC events, deadlines and new lessons list by email</strong>'+
'<p class="note" style="margin:8px 0">Optional, about every two weeks: dated events and compliance deadlines with source links, a few short news items in our own words, and one tip. We use your address only for this, never sell or share it, and every email has an unsubscribe link. See the <a href="'+(f.getAttribute("data-root")||"")+'privacy.html">privacy page</a>.</p>'+
'<label for="'+id+'">Email address</label> <input id="'+id+'" type="email" name="'+(cfg.emailField||"email")+'" autocomplete="email" required placeholder="you@example.com"> '+
'<p style="margin:8px 0"><input id="'+id+'c" type="checkbox" required> <label for="'+id+'c">Yes, email me this list. I can unsubscribe any time.</label></p>'+
'<button class="btn" type="submit">Sign up for the email list</button>'+
'<p class="note" role="status" style="margin:8px 0">'+(on?"":"Signup opens soon. This form is switched off for now.")+'</p>';
if(on){f.action=cfg.action;f.method=cfg.method||"post";}
else{f.addEventListener("submit",function(e){e.preventDefault();});f.querySelectorAll("input,button").forEach(function(x){x.disabled=true;});}
});})();
