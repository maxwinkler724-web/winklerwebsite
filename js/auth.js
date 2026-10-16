/* Account sign-in (Google or email) using Firebase Authentication. Off until TSB.auth.enabled is true and the Firebase keys are filled in (js/config.js).
   Firebase is only loaded on the account page, and only when enabled, so no other site request is made. */
(function () {
  var A = (window.TSB || {}).auth || {};
  var $ = function (id) { return document.getElementById(id); };
  var msg = $("auth-msg");
  function say(t) { msg.textContent = t || ""; }
  var F = A.firebase || {};
  if (!A.enabled || !F.apiKey || !F.projectId) { $("auth-off").hidden = false; return; }
  var V = "10.12.2", base = "https://www.gstatic.com/firebasejs/" + V + "/";
  var friendly = {
    "auth/invalid-credential": "That email and password do not match.",
    "auth/wrong-password": "That email and password do not match.",
    "auth/user-not-found": "That email and password do not match.",
    "auth/email-already-in-use": "An account with that email already exists. Try signing in.",
    "auth/weak-password": "Please use a password with at least 8 characters.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/popup-closed-by-user": "Sign-in was cancelled.",
    "auth/too-many-requests": "Too many tries. Wait a few minutes and try again.",
    "auth/network-request-failed": "Network problem. Check your connection and try again."
  };
  function err(e) { say(friendly[e && e.code] || "Something went wrong. Please try again."); }
  Promise.all([import(base + "firebase-app.js"), import(base + "firebase-auth.js")]).then(function (m) {
    var app = m[0].initializeApp(F), au = m[1], auth = au.getAuth(app);
    auth.useDeviceLanguage();
    function creds() { var e = $("auth-mail").value.trim(), p = $("auth-pass").value; if (!e || p.length < 8) { say("Enter your email and a password of at least 8 characters."); return null; } return [e, p]; }
    $("auth-google").onclick = function () { say(""); au.signInWithPopup(auth, new au.GoogleAuthProvider()).catch(err); };
    $("auth-email").onsubmit = function (ev) { ev.preventDefault(); var c = creds(); if (c) { say(""); au.signInWithEmailAndPassword(auth, c[0], c[1]).catch(err); } };
    $("auth-create").onclick = function () { var c = creds(); if (!c) return; say(""); au.createUserWithEmailAndPassword(auth, c[0], c[1]).then(function (r) { return au.sendEmailVerification(r.user); }).catch(err); };
    $("auth-reset").onclick = function (ev) { ev.preventDefault(); var e = $("auth-mail").value.trim(); if (!e) { say("Type your email above first, then choose Forgot your password."); return; } au.sendPasswordResetEmail(auth, e).then(function () { say("If an account exists for that email, a reset link is on its way."); }).catch(err); };
    $("auth-out").onclick = function () { au.signOut(auth); };
    au.onAuthStateChanged(auth, function (u) {
      $("auth-forms").hidden = !!u; $("auth-in").hidden = !u;
      if (u) { $("auth-who").textContent = u.email || u.displayName || "your account"; $("auth-verify").textContent = (!u.emailVerified && u.providerData[0] && u.providerData[0].providerId === "password") ? "We sent a verification link to your email. Please open it to confirm your address." : ""; say(""); }
    });
  }).catch(function () { $("auth-off").hidden = false; say("Sign-in could not load. Check your connection and try again."); });
})();
