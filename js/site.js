/* Ad slots, sponsor gate, consent banner. Placeholder only: no ad network is loaded unless TSB.ads.mode is "live". */
(function () {
  var C = window.TSB || {}, A = C.ads || { mode: "off" };
  if (A.mode === "off") return;
  var path = location.pathname, inLearn = path.indexOf("/learn/") > -1;
  var base = inLearn ? "../" : "";
  function el(t, c, x) { var e = document.createElement(t); if (c) e.className = c; if (x) e.textContent = x; return e; }
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function sget(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
  function sset(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
  function slot(name, label) {
    var d = el("aside", "adslot"); d.setAttribute("aria-label", "Advertisement");
    if (A.mode === "preview") { d.appendChild(el("span", "", "Advertisement placeholder (" + label + ")")); }
    else { var ins = document.createElement("ins"); ins.className = "adsbygoogle"; ins.style.display = "block"; ins.setAttribute("data-ad-client", A.client); ins.setAttribute("data-ad-slot", (A.slots || {})[name] || ""); ins.setAttribute("data-ad-format", "auto"); ins.setAttribute("data-full-width-responsive", "true"); d.appendChild(ins); }
    return d;
  }
  var main = document.getElementById("main"); if (!main) return;
  var wrap = main.querySelector(".wrap") || main;
  var firstH = wrap.querySelector("h1");
  if (firstH) firstH.parentNode.insertBefore(slot("top", "top banner"), firstH.nextSibling);
  var h2s = wrap.querySelectorAll("h2");
  if (h2s.length > 2) h2s[2].parentNode.insertBefore(slot("mid", "in content"), h2s[2]);
  wrap.appendChild(slot("bottom", "bottom banner"));

  /* consent banner */
  if (!get("tsb_consent")) {
    var b = el("div", "consent"); b.setAttribute("role", "region"); b.setAttribute("aria-label", "Cookie and ad choices");
    b.appendChild(el("span", "", "Ads help keep this site free. Choose how ads and cookies are used. "));
    var a = el("a", "", "Privacy policy"); a.href = base + "privacy.html"; b.appendChild(a); b.appendChild(document.createTextNode(" "));
    var y = el("button", "btn", "Accept"); y.type = "button"; y.onclick = function () { set("tsb_consent", "yes"); b.remove(); };
    var n = el("button", "btn ghost", "Reject non-essential"); n.type = "button"; n.onclick = function () { set("tsb_consent", "no"); b.remove(); };
    b.appendChild(y); b.appendChild(document.createTextNode(" ")); b.appendChild(n); document.body.appendChild(b);
  }
  if (A.mode === "live" && get("tsb_consent") !== null) {
    var s = document.createElement("script"); s.async = true; s.crossOrigin = "anonymous";
    s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + encodeURIComponent(A.client); document.head.appendChild(s);
    window.adsbygoogle = window.adsbygoogle || []; if (get("tsb_consent") === "no") window.adsbygoogle.requestNonPersonalizedAds = 1;
    [].forEach.call(document.querySelectorAll("ins.adsbygoogle"), function () { try { window.adsbygoogle.push({}); } catch (e) {} });
  }

  /* sponsor gate before content pages (not the lesson index) */
  var G = C.gate || {};
  var gated = inLearn && !/\/learn\/(index|start-here)\.html$/.test(path) && !/\/learn\/$/.test(path);
  if (G.enabled && gated && !(A.mode === "live" && !G.directSponsorOnly)) {
    var last = +sget("tsb_gate") || 0, mins = G.frequencyMinutes || 3;
    if (Date.now() - last > mins * 60000) {
      var o = el("div", "gate"); o.setAttribute("role", "dialog"); o.setAttribute("aria-modal", "true"); o.setAttribute("aria-label", "Sponsor message");
      var card = el("div", "gatecard");
      card.appendChild(el("p", "tag", "Sponsor message"));
      card.appendChild(el("h2", "", A.mode === "preview" ? "Ad placeholder" : "Thanks to our sponsors"));
      card.appendChild(el("p", "", "This lesson is free because of ads. Your lesson is loading."));
      var cont = el("button", "btn", "Continue in " + (G.seconds || 5)); cont.type = "button"; cont.disabled = true; card.appendChild(cont);
      if (C.premium) { card.appendChild(document.createTextNode(" ")); var pl = el("a", "btn ghost", "Go ad-free with Premium"); pl.href = base + (C.premium.url || "premium.html"); card.appendChild(pl); }
      o.appendChild(card); document.body.appendChild(o); var left = G.seconds || 5;
      var iv = setInterval(function () { left--; if (left <= 0) { clearInterval(iv); cont.disabled = false; cont.textContent = "Continue to the lesson"; cont.focus(); } else cont.textContent = "Continue in " + left; }, 1000);
      cont.onclick = function () { sset("tsb_gate", String(Date.now())); o.remove(); };
    }
  }
})();
