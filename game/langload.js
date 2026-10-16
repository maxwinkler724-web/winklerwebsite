/* Loads the Spanish strings only when Spanish is chosen, so English players do not download them. */
(function(){var l="en";try{l=localStorage.getItem("fixitvan.lang")}catch(e){}if(l==="es")document.write('<script src="strings.es.js"><\/script>')})();
