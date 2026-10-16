/* Premium lesson gate (honor system). Off unless TSB.premium.lessonGate is true in js/config.js.
   On a lesson tagged "Premium lesson" it keeps the intro and first section, hides the rest and shows a card linking premium.html.
   A static site cannot truly lock content: the hidden text is still in the page source until a real login exists. */
(function () {
  var P = (window.TSB || {}).premium || {};
  if (!P.lessonGate) return;
  var tag = document.querySelector("main .tag");
  if (!tag || !/premium lesson/i.test(tag.textContent)) return;
  var wrap = document.querySelector("main .wrap");
  if (!wrap) return;
  var h2s = [].filter.call(wrap.children, function (e) { return e.tagName === "H2"; });
  if (h2s.length < 2) return;
  var cut = h2s[1], hold = document.createElement("div");
  hold.id = "premium-locked"; hold.hidden = true;
  var rest = [], n = cut;
  while (n) { rest.push(n); n = n.nextSibling; }
  cut.parentNode.insertBefore(hold, cut);
  rest.forEach(function (x) { hold.appendChild(x); });
  var card = document.createElement("div");
  card.className = "card premcard"; card.setAttribute("role", "region"); card.setAttribute("aria-label", "Premium lesson");
  var base = location.pathname.indexOf("/learn/") > -1 ? "../" : "";
  card.innerHTML = "<span class=\"tag\">Premium lesson</span><h2 style=\"margin-top:.3em\">The rest of this lesson is in the premium tier</h2><p>You have read the introduction and first section. Premium includes the full lesson, the field card and the sources list.</p><p><a class=\"btn\" href=\"" + base + (P.url || "premium.html") + "\">See premium</a></p>";
  hold.parentNode.insertBefore(card, hold);
})();
