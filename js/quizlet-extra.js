/* Trade Study Bench: extra free quiz questions (load after quizlet-data.js). Original questions; 'a' = index of the correct option. Practice only. DRAFT: owner review pending. */
(function () {
 var Q = window.QUIZLETS;
 if (!Q) return;
 function add(id, qs) { if (Q[id]) Array.prototype.push.apply(Q[id].q, qs); }
 add("blackseal", [
  {q:"A low-water cutoff keeps nuisance-tripping. Which action is acceptable?",o:["Jumper it until the shift ends","Find out why it trips and fix the cause","Raise the water level well above normal","Cover the control"],a:1,e:"A cutoff is the backstop against low water. Bypassing it, even briefly, removes that protection."},
  {q:"Sludge piles up in the float chamber of a cutoff. What can result?",o:["The float jams and may never drop","Faster response","Lower stack temperature","Better sensing"],a:0,e:"A stuck float cannot signal low water, so the burner keeps firing."},
  {q:"Which gas is both colorless and odorless yet dangerous from poor combustion?",o:["Carbon monoxide","Steam","Nitrogen","Oxygen"],a:0,e:"You cannot smell it, so alarms and flue-gas testing matter."},
  {q:"The flame fails on a hot furnace. What must come before a relight attempt?",o:["Opening the fuel valve wider","A full purge","Skipping the ignition trial","Raising the setpoint"],a:1,e:"Unburned fuel may have collected, and purging clears it."},
  {q:"A safety valve weeps below its set pressure. The proper response is to:",o:["Tighten it with a wrench","Hang a weight on the lever","Log it and have a qualified shop repair it","Cap the discharge pipe"],a:2,e:"Tightening or gagging defeats overpressure protection."},
  {q:"Falling pH in the condensate return most likely points to:",o:["Dissolved carbon dioxide forming carbonic acid","Too much scavenger","Hardness","Higher stack temperature"],a:0,e:"Carbonic acid attacks return piping."}
 ]);
 add("epa608", [
  {q:"Who is covered by the federal venting prohibition?",o:["Only certified technicians","Anyone, owners and technicians alike","Only commercial owners","Only recovery-machine operators"],a:1,e:"The ban is not limited to people holding a certification."},
  {q:"How is the net weight of refrigerant in a cylinder found?",o:["Tare weight alone","Gross weight minus tare weight","Gross weight plus tare weight","Hose length times pressure"],a:1,e:"Tare is the empty cylinder, so the difference is the refrigerant."},
  {q:"You open a system and cannot tell what refrigerant it holds. Best next step?",o:["Assume it is R-22","Vent a little to find out","Stop, identify it, and keep it separate","Blend it with R-410A"],a:2,e:"Unknown or mixed refrigerant contaminates other stock and may need reclaiming."},
  {q:"What injury is likely if liquid refrigerant sprays on bare skin?",o:["Frostbite from rapid boiling","A heat burn","No injury","Only a mild rash"],a:0,e:"Boiling off draws heat from tissue, so goggles and gloves are needed."},
  {q:"A shutoff valve placed near the end of a service hose mainly helps to:",o:["Raise the pressure","Limit refrigerant released when the hose is disconnected","Cool the oil","Identify the refrigerant"],a:1,e:"The valve keeps the hose contents in the hose."},
  {q:"GWP is a measure of:",o:["Toxicity","Flammability","Ozone depletion","Heat-trapping ability compared with carbon dioxide"],a:3,e:"A higher GWP means the gas traps more heat per unit released."}
 ]);
})();
