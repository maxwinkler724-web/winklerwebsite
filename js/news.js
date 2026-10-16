/* Renders window.NEWS (js/news-data.js) on news.html and the home page teaser. Text is set with textContent only. */
(function () {
  var N = window.NEWS || {}, app = document.getElementById("news-app"), teaser = document.getElementById("home-news");
  function el(t, c, x) { var e = document.createElement(t); if (c) e.className = c; if (x) e.textContent = x; return e; }
  function card(it, kind, ht) {
    var d = el("div", "newsitem"), when = it.start ? it.start + (it.end && it.end !== it.start ? " to " + it.end : "") : (it.date || it.provider || "");
    d.appendChild(el("div", "meta", (kind === "events" ? "Event" : kind === "training" ? "Training" : kind === "deadlines" ? "Deadline" : "News") + (when ? " · " + when : "")));
    var h = el(ht || "h3"), a = el("a", "", it.title); a.href = it.source; a.rel = "noopener"; h.appendChild(a); d.appendChild(h);
    if (it.where) d.appendChild(el("p", "small", it.where));
    d.appendChild(el("p", "", it.summary || ""));
    if (it.checked) d.appendChild(el("p", "small", "Checked on " + it.checked + ". Confirm with the source before acting."));
    var s = el("p", "small", "Source: "), l = el("a", "", it.sourceName || it.source); l.href = it.source; l.rel = "noopener"; s.appendChild(l); d.appendChild(s);
    return d;
  }
  function all() { var o = []; ["deadlines", "events", "training", "news"].forEach(function (k) { (N[k] || []).forEach(function (it) { o.push({ k: k, it: it }); }); }); return o; }
  if (app) {
    var up = document.getElementById("news-updated"); if (up) up.textContent = N.updated ? "Updated " + N.updated + "." : "";
    var cur = "all";
    function draw() {
      while (app.firstChild) app.removeChild(app.firstChild);
      var list = all().filter(function (x) { return cur === "all" || x.k === cur; });
      if (!list.length) { app.appendChild(el("p", "note", "Nothing listed here yet. Check back soon.")); return; }
      var g = el("div", "newsrow"); list.forEach(function (x) { g.appendChild(card(x.it, x.k, "h2")); }); app.appendChild(g);
    }
    [].forEach.call(document.querySelectorAll(".chip[data-k]"), function (b) { b.onclick = function () { cur = b.getAttribute("data-k"); [].forEach.call(document.querySelectorAll(".chip[data-k]"), function (c) { c.classList.toggle("on", c === b); }); draw(); }; });
    draw();
  }
  if (teaser) {
    var items = [].concat((N.deadlines || []).slice(0, 1).map(function (i) { return { k: "deadlines", it: i }; }), (N.events || []).slice(0, 2).map(function (i) { return { k: "events", it: i }; })); if (!items.length) return;
    while (teaser.firstChild) teaser.removeChild(teaser.firstChild);
    items.forEach(function (x) { teaser.appendChild(card(x.it, x.k)); });
  }
})();
