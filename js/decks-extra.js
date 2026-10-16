/* Trade Study Bench: extra free flashcards (load after decks-data.js). Original wording. General method only; manufacturer instructions and local rules govern. DRAFT: owner review pending. */
(function () {
 var D = window.DECKS;
 if (!D) return;
 function add(id, cards) {
  var d = D[id];
  if (!d) return;
  Array.prototype.push.apply(d.free, cards);
  d.premiumCount = Math.max(0, (d.premiumCount || 0) - cards.length);
 }
 add("blackseal", [
  ["Why is it never acceptable to jumper out a low-water cutoff that keeps tripping?","The trips are a warning. Find and fix the cause. A bypassed cutoff removes protection against the worst failure a boiler can have."],
  ["What commonly makes a float-type low-water cutoff stick?","Sludge settling in the float chamber. Regular flushing and testing keep the float free to drop."],
  ["How can scale on a probe-type cutoff mislead the control?","Scale coats the probe, so it can keep sensing 'water present' when the level has really dropped."],
  ["A safety valve is weeping below its set pressure. What now?","Log it and have a qualified shop repair it. Do not crank it down, gag it or hang weight on it."],
  ["What is the point of a manual-reset high-limit control?","After it trips, a person must go look and reset it, so the cause gets investigated instead of ignored."],
  ["What does a deaerator do for a boiler plant?","It strips dissolved oxygen out of the feedwater before it reaches the boiler, cutting pitting corrosion."],
  ["Condensate returns show falling pH. Likely culprit?","Dissolved carbon dioxide forming carbonic acid, which eats return piping."],
  ["Oil shows up in the condensate return. What is the right move?","Trace the source and keep the oil out of the boiler. Oil coats heating surfaces, foams and causes overheating."],
  ["Why can't you rely on your nose to detect carbon monoxide?","It has no color or smell. Detectors and flue-gas analysis are how you know."],
  ["What should happen to the burner if draft is lost?","It should shut down. Without draft, combustion products can spill into the boiler room."],
  ["Flame fails on a hot furnace. Can you relight right away?","No. Complete a full purge first, since unburned fuel may have collected in the hot chamber."],
  ["Where should blowdown water be sent?","To a tank or sump that tempers it. Very hot discharge can injure people and damage drains."],
  ["On a cold steam startup, when is the boiler vent closed?","When steam comes out of it, showing the air has been driven out."],
  ["A pressure gauge needle does not return to zero when pressure is off. What do you conclude?","Treat the gauge as suspect and compare it with a test gauge. It could be misleading you."],
  ["After blowing down a gauge glass, the level comes back slowly. What does that suggest?","A plugged or restricted connection, so the glass may be showing a false level. Clear it before trusting it."]
 ]);
 add("epa608", [
  ["What does GWP tell you about a refrigerant?","How strongly it traps heat in the atmosphere compared with carbon dioxide."],
  ["Which law directs EPA to phase down HFC production and use?","The AIM Act of 2020. Section 608 covers service practices; the AIM Act covers the phasedown."],
  ["Why fit shutoff valves near the ends of service hoses?","So the hose contents stay in the hose and releases at connection and disconnection stay small."],
  ["How do you find the refrigerant actually in a cylinder?","Weigh it and subtract the cylinder's empty (tare) weight from the gross weight."],
  ["Does the venting ban apply only to certified techs?","No. It applies to everyone, owners and technicians alike."],
  ["You find a system with a mystery refrigerant. What first?","Stop, identify it, and keep it away from other refrigerants. Never charge it or mix it into another cylinder on a guess."],
  ["Liquid refrigerant hits bare skin. What injury is likely?","Frostbite, because the liquid boils off fast and pulls heat from the tissue. Wear goggles and gloves."],
  ["Why keep POE oil containers sealed?","POE absorbs moisture from the air quickly, and moisture harms oil and components."],
  ["What safety class does isobutane (R-600a) carry?","A3, highly flammable. Treat servicing it as a flammable-refrigerant job."],
  ["Who may buy refrigerant such as R-410A in most cases?","Certified technicians, with only limited exceptions."]
 ]);
})();
