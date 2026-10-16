/* Renders "recommended tools" boxes where a page has <div data-tsb-recommended="group"></div>. Never include this script on pages under game/. */
(function () {
  var C = window.TSB || {}, F = C.affiliates, nodes = document.querySelectorAll("[data-tsb-recommended]");
  if (!F || !nodes.length) return;
  var preview = C.ads && C.ads.mode === "preview";
  function el(t, c, x) { var e = document.createElement(t); if (c) e.className = c; if (x) e.textContent = x; return e; }
  for (var i = 0; i < nodes.length; i++) {
    var g = (F.groups || {})[nodes[i].getAttribute("data-tsb-recommended")]; if (!g) continue;
    var linked = g.items.filter(function (it) { return it.url; });
    if (!linked.length && !preview) continue;
    var box = el("aside", "affbox"); box.setAttribute("aria-label", g.title);
    box.appendChild(el("h2", "", g.title));
    box.appendChild(el("p", "small affnote", F.disclosure));
    var ul = el("ul");
    g.items.forEach(function (it) {
      var li = el("li");
      if (it.url) { var a = el("a", "", it.name); a.href = it.url; a.rel = "sponsored noopener"; a.target = "_blank"; li.appendChild(a); }
      else if (preview) li.appendChild(document.createTextNode(it.name + " (placeholder: no link yet)"));
      else return;
      ul.appendChild(li);
    });
    box.appendChild(ul);
    nodes[i].appendChild(box);
  }
})();
