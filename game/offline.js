/* Registers the offline helper (sw.js). Only works on https or localhost; otherwise it does nothing. */
if("serviceWorker" in navigator&&/^https?:$/.test(location.protocol)){addEventListener("load",function(){try{navigator.serviceWorker.register("sw.js").catch(function(){})}catch(e){}})}
