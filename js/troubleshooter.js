/* Interactive troubleshooting trees and chart. Data: js/troubleshooting-data.js (window.TREES, window.CHART). No dependencies. */
(function () {
  var T = window.TREES || [], C = window.CHART || [];
  var root = document.getElementById("tree-app"), chart = document.getElementById("chart-body");
  function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt) e.textContent = txt; return e; }
  function clear(n) { while (n.firstChild) n.removeChild(n.firstChild); }
  var cur = null, path = [];
  function pick() {
    clear(root); cur = null; path = [];
    root.appendChild(el("h2", "", "Choose a symptom"));
    var g = el("div", "tips");
    T.forEach(function (t) {
      var b = el("button", "tip treebtn"); b.type = "button";
      b.appendChild(el("div", "thumb", "Troubleshoot"));
      var body = el("div", "body"); body.appendChild(el("b", "", t.title)); body.appendChild(el("span", "", t.intro || ""));
      b.appendChild(body); b.onclick = function () { start(t); }; g.appendChild(b);
    });
    root.appendChild(g);
  }
  function start(t) { cur = t; path = [t.start]; render(); root.scrollIntoView(); }
  function render() {
    clear(root);
    var node = cur.nodes[path[path.length - 1]];
    root.appendChild(el("h2", "", cur.title));
    root.appendChild(el("p", "small", "Step " + path.length + (node.result ? " (result)" : "")));
    var card = el("div", "fieldcard"); card.setAttribute("role", "region"); card.setAttribute("aria-live", "polite");
    if (node.result) {
      card.appendChild(el("h3", "", node.result));
      card.appendChild(el("p", "", node.likely || ""));
      if (node.steps && node.steps.length) { var ul = el("ul"); node.steps.forEach(function (s) { ul.appendChild(el("li", "", s)); }); card.appendChild(ul); }
      if (node.safety) card.appendChild(el("p", "note", "Safety: " + node.safety));
      card.appendChild(el("p", "small", "General method only. Follow the manufacturer's procedures and your site's safety rules."));
      var src = window.tsbSources && window.tsbSources(cur.id); if (src) card.appendChild(src);
    } else {
      card.appendChild(el("h3", "", node.q));
      if (node.why) card.appendChild(el("p", "small", "Why: " + node.why));
      var wrap = el("div", "chips");
      node.opts.forEach(function (o) {
        var b = el("button", "chip", o.t); b.type = "button";
        b.onclick = function () { path.push(o.next); render(); }; wrap.appendChild(b);
      });
      card.appendChild(wrap);
    }
    root.appendChild(card);
    var nav = el("p");
    if (path.length > 1) { var back = el("button", "btn ghost", "Back"); back.type = "button"; back.onclick = function () { path.pop(); render(); }; nav.appendChild(back); nav.appendChild(document.createTextNode(" ")); }
    var re = el("button", "btn ghost", "Choose a different symptom"); re.type = "button"; re.onclick = pick; nav.appendChild(re);
    root.appendChild(nav);
  }
  function drawChart() {
    if (!chart) return;
    clear(chart);
    C.forEach(function (r) {
      var tr = el("tr");
      var a = el("td"); a.appendChild(el("strong", "", r.symptom)); if (r.safety) a.appendChild(el("div", "small", "Safety: " + r.safety));
      var b = el("td"), ul = el("ul");
      r.causes.forEach(function (c) { var li = el("li"); li.appendChild(el("b", "", c.cause + ": ")); li.appendChild(document.createTextNode(c.check)); ul.appendChild(li); });
      b.appendChild(ul); tr.appendChild(a); tr.appendChild(b); chart.appendChild(tr);
    });
  }
  if (root) { if (T.length) pick(); else root.appendChild(el("p", "", "Trees are loading.")); }
  drawChart();
})();
