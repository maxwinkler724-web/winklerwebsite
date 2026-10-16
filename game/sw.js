/* Offline support for Fix-It Van and the Service Call Simulator. Saves this site's own game files on the device so they open without a connection after the first visit.
   It only ever fetches files from this same site. It sends nothing and stores nothing about the player. Bump V when the file list changes. */
var V="game-v3";
var CORE=["./", "index.html", "game.css", "jobs.js", "strings.es.js", "i18n.js", "game.js", "langload.js", "offline.js", "guide.html", "guia.html", "sim/", "sim/about.html", "sim/sources.html", "sim/art.js", "sim/boiler.html", "sim/boiler.js", "sim/circuit.js", "sim/condensing.html", "sim/condensing.js", "sim/cooling.html", "sim/cooling.js", "sim/ecm.html", "sim/ecm.js", "sim/generic.js", "sim/heatpump.html", "sim/heatpump.js", "sim/i18n.js", "sim/index.html", "sim/langload.js","sim/offline.js", "sim/minisplit.html", "sim/minisplit.js", "sim/refrig.html", "sim/refrig.js", "sim/rtu.html", "sim/rtu.js", "sim/sim.css", "sim/sim.js", "sim/steam.html", "sim/steam.js", "sim/steamhx.html", "sim/steamhx.js", "sim/strings.es.js", "sim/wiring.js"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(V).then(function(c){return Promise.all(CORE.map(function(u){return c.add(u).catch(function(){})}))}).then(function(){return self.skipWaiting()}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==V}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){
 var r=e.request;if(r.method!=="GET"||new URL(r.url).origin!==location.origin)return;
 e.respondWith(caches.open(V).then(function(c){return c.match(r,{ignoreSearch:true}).then(function(hit){
  var net=fetch(r).then(function(res){if(res&&res.ok)c.put(r,res.clone());return res}).catch(function(){return hit});
  return hit||net})}));
});
