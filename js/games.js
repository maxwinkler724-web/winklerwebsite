/* Troubleshooting games. Data: window.SCENARIOS, window.SEQUENCES, window.PAIRS (js/games-data.js). No dependencies. */
(function () {
  var app = document.getElementById("games-app"); if (!app) return;
  function el(t, c, x) { var e = document.createElement(t); if (c) e.className = c; if (x) e.textContent = x; return e; }
  function clr(n) { while (n.firstChild) n.removeChild(n.firstChild); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function btn(txt, cls, fn) { var b = el("button", cls, txt); b.type = "button"; b.onclick = fn; return b; }
  var tabs = [["Service call", serviceMenu], ["Put in order", orderMenu], ["Match up", matchMenu]];
  var bar = document.getElementById("games-tabs"), body = el("div"); app.appendChild(body);
  tabs.forEach(function (t, i) { var b = btn(t[0], "chip" + (i === 0 ? " on" : ""), function () { [].forEach.call(bar.children, function (x) { x.classList.remove("on"); }); b.classList.add("on"); clr(body); t[1](body); }); bar.appendChild(b); });
  serviceMenu(body);

  /* ---- Service call ---- */
  function serviceMenu(root) {
    clr(root); root.appendChild(el("h2", "", "Service call simulator"));
    root.appendChild(el("p", "", "Pick a call. Choose checks one at a time, then make your diagnosis. Safe, efficient techs score higher."));
    var g = el("div", "tips");
    (window.SCENARIOS || []).forEach(function (s) {
      var b = el("button", "tip treebtn"); b.type = "button"; b.appendChild(el("div", "thumb", "Service call"));
      var d = el("div", "body"); d.appendChild(el("b", "", s.title)); d.appendChild(el("span", "", s.customer)); b.appendChild(d);
      b.onclick = function () { playScenario(root, s); }; g.appendChild(b);
    });
    root.appendChild(g);
  }
  function playScenario(root, s) {
    var done = {}, order = [], pts = 100, log = el("div");
    function draw() {
      clr(root); root.appendChild(el("h2", "", s.title));
      root.appendChild(el("p", "", "Customer: " + s.customer)); root.appendChild(el("p", "small", "On arrival: " + s.setup));
      root.appendChild(el("h3", "", "Your checks"));
      var wrap = el("div", "chips");
      s.checks.forEach(function (c) { if (done[c.id]) return; wrap.appendChild(btn(c.label, "chip", function () { take(c); })); });
      root.appendChild(wrap);
      if (order.length) { var ul = el("ul"); order.forEach(function (id) { var c = s.checks.filter(function (x) { return x.id === id; })[0]; var li = el("li"); li.appendChild(el("b", "", c.label + ": ")); li.appendChild(document.createTextNode(c.result)); ul.appendChild(li); }); root.appendChild(ul); }
      root.appendChild(btn("Make my diagnosis", "btn", diagnose)); root.appendChild(document.createTextNode(" ")); root.appendChild(btn("Back to calls", "btn ghost", function () { serviceMenu(root); }));
    }
    function take(c) {
      done[c.id] = 1; order.push(c.id);
      if (c.kind === "wrong") pts -= 30; else if (c.kind === "deep") pts -= 12; else if (c.kind === "measure") pts -= 4; else pts -= 3;
      if (c.kind === "safety" && order.length === 1) pts += 10;
      draw();
    }
    function diagnose() {
      clr(root); root.appendChild(el("h2", "", "What is your diagnosis?"));
      shuffle(s.diagnoses).forEach(function (d) {
        var b = btn(d.t, "chip", function () { finish(d); }); b.style.display = "block"; b.style.margin = "8px 0"; b.style.textAlign = "left"; root.appendChild(b);
      });
    }
    function finish(d) {
      clr(root); var sc = Math.max(0, pts + (d.correct ? 40 : -20));
      root.appendChild(el("h2", "", d.correct ? "Correct diagnosis" : "Not the best diagnosis"));
      root.appendChild(el("p", "note", d.why));
      var right = s.diagnoses.filter(function (x) { return x.correct; })[0];
      if (!d.correct) root.appendChild(el("p", "", "Better answer: " + right.t + ". " + right.why));
      root.appendChild(el("p", "", "Your score: " + sc + ". You used " + order.length + " checks. An efficient path used " + s.bestPath.length + "."));
      var wrong = order.filter(function (id) { return s.checks.filter(function (c) { return c.id === id; })[0].kind === "wrong"; }).length;
      if (wrong) root.appendChild(el("p", "note", "You took an action that is unsafe or does not help. Never bypass a safety device."));
      var bp = el("ul"); s.bestPath.forEach(function (id) { var c = s.checks.filter(function (x) { return x.id === id; })[0]; bp.appendChild(el("li", "", c.label)); });
      root.appendChild(el("h3", "", "A good path")); root.appendChild(bp);
      root.appendChild(el("p", "", s.lesson || ""));
      var src = window.tsbSources && window.tsbSources(s.id); if (src) root.appendChild(src);
      root.appendChild(btn("Back to calls", "btn", function () { serviceMenu(root); }));
    }
    draw();
  }

  /* ---- Put in order ---- */
  function orderMenu(root) {
    clr(root); root.appendChild(el("h2", "", "Put the steps in order")); root.appendChild(el("p", "", "Tap the steps in the order you would do them."));
    var g = el("div", "tips");
    (window.SEQUENCES || []).forEach(function (q) {
      var b = el("button", "tip treebtn"); b.type = "button"; b.appendChild(el("div", "thumb", "Sequence"));
      var d = el("div", "body"); d.appendChild(el("b", "", q.title)); d.appendChild(el("span", "", q.intro || "")); b.appendChild(d);
      b.onclick = function () { playOrder(root, q); }; g.appendChild(b);
    });
    root.appendChild(g);
  }
  function playOrder(root, q) {
    var pool = shuffle(q.steps), chosen = [];
    function draw() {
      clr(root); root.appendChild(el("h2", "", q.title)); root.appendChild(el("p", "", q.intro || ""));
      root.appendChild(el("h3", "", "Your order")); var ol = el("ol"); chosen.forEach(function (s) { ol.appendChild(el("li", "", s)); }); root.appendChild(ol);
      if (pool.length) { root.appendChild(el("h3", "", "Remaining steps")); pool.forEach(function (s) { var b = btn(s, "chip", function () { chosen.push(s); pool.splice(pool.indexOf(s), 1); draw(); }); b.style.display = "block"; b.style.margin = "8px 0"; b.style.textAlign = "left"; root.appendChild(b); }); }
      else check();
      var n = el("p"); n.appendChild(btn("Start over", "btn ghost", function () { pool = shuffle(q.steps); chosen = []; draw(); })); n.appendChild(document.createTextNode(" ")); n.appendChild(btn("Back", "btn ghost", function () { orderMenu(root); })); root.appendChild(n);
    }
    function check() {
      var ok = 0; chosen.forEach(function (s, i) { if (s === q.steps[i]) ok++; });
      root.appendChild(el("p", "note", ok === q.steps.length ? "Perfect order." : ok + " of " + q.steps.length + " steps are in the right place."));
      root.appendChild(el("h3", "", "Correct order")); var ol = el("ol"); q.steps.forEach(function (s) { ol.appendChild(el("li", "", s)); }); root.appendChild(ol);
      root.appendChild(el("p", "", q.why || ""));
    }
    draw();
  }

  /* ---- Match up ---- */
  function matchMenu(root) {
    clr(root); root.appendChild(el("h2", "", "Match up")); root.appendChild(el("p", "", "Tap a term, then tap its match."));
    var g = el("div", "tips");
    (window.PAIRS || []).forEach(function (p) {
      var b = el("button", "tip treebtn"); b.type = "button"; b.appendChild(el("div", "thumb", "Match"));
      var d = el("div", "body"); d.appendChild(el("b", "", p.title)); b.appendChild(d); b.onclick = function () { playMatch(root, p); }; g.appendChild(b);
    });
    root.appendChild(g);
  }
  function playMatch(root, p) {
    var left = p.pairs.map(function (x, i) { return { t: x[0], i: i }; }), right = shuffle(p.pairs.map(function (x, i) { return { t: x[1], i: i }; }));
    var sel = null, solved = {}, tries = 0;
    function draw() {
      clr(root); root.appendChild(el("h2", "", p.title));
      var cols = el("div", "grid");
      var a = el("div"), b = el("div");
      left.forEach(function (x) { var bt = btn(x.t, "chip" + (solved[x.i] ? " on" : "") + (sel === x ? " on" : ""), function () { if (solved[x.i]) return; sel = x; draw(); }); bt.style.display = "block"; bt.style.margin = "6px 0"; bt.style.textAlign = "left"; a.appendChild(bt); });
      right.forEach(function (y) { var bt = btn(y.t, "chip" + (solved[y.i] ? " on" : ""), function () {
        if (solved[y.i] || !sel) return; tries++; if (sel.i === y.i) { solved[y.i] = 1; } sel = null; draw(); });
        bt.style.display = "block"; bt.style.margin = "6px 0"; bt.style.textAlign = "left"; b.appendChild(bt); });
      cols.appendChild(a); cols.appendChild(b); root.appendChild(cols);
      var n = Object.keys(solved).length;
      root.appendChild(el("p", "small", "Matched " + n + " of " + left.length + " in " + tries + " tries."));
      if (n === left.length) root.appendChild(el("p", "note", "All matched."));
      root.appendChild(btn("Back", "btn ghost", function () { matchMenu(root); }));
    }
    draw();
  }
})();
