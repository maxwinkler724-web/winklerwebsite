/* "Print this lesson" button for lesson pages. Print layout rules are in css/style.css (@media print). */
(function(){var h=document.querySelector("main h1");if(!h||!window.print)return;
var b=document.createElement("button");b.type="button";b.className="btn ghost printbtn";b.textContent="Print this lesson";
b.addEventListener("click",function(){window.print();});
var p=document.createElement("p");p.className="printwrap";p.appendChild(b);h.parentNode.insertBefore(p,h.nextSibling);
var f=document.createElement("p");f.className="printonly";f.textContent="Trade Study Bench. Educational use only: follow manufacturer instructions, local code and your employer's rules. Printed from "+location.hostname+location.pathname;document.body.appendChild(f);})();
