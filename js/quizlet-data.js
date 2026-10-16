/* Trade Study Bench: free mini-quizzes. Original questions; 'a' = index of the correct option. Practice only; manufacturer instructions and local rules govern. DRAFT: owner review pending. */
window.QUIZLETS = {
 blackseal: {title:"NJ Black Seal boiler basics", q:[
  {q:"A boiler's water level may be dangerously low. What is the best first response?",o:["Feed water quickly","Shut off the fuel and do not feed water","Raise the firing rate","Open the bottom blowdown"],a:1,e:"Cold water on overheated metal can cause failure, so firing stops first and the boiler cools before inspection."},
  {q:"What does the siphon on a steam pressure gauge do?",o:["Raises accuracy","Keeps live steam off the gauge element with a water seal","Removes air from the boiler","Lowers pressure"],a:1,e:"The trapped condensate shields the gauge from steam heat."},
  {q:"Why is it unacceptable to put a stop valve between a boiler and its safety valve?",o:["It would slow the boiler warm-up","It could isolate the valve and defeat overpressure protection","It increases scale","It makes the valve chatter"],a:1,e:"Nothing may be able to cut the safety valve off from the boiler."},
  {q:"Flue gas shows much more oxygen than normal. What does that suggest?",o:["Too little air","Too much excess air carrying heat up the stack","Low water","A cracked section"],a:1,e:"High oxygen means extra air, which wastes heat."},
  {q:"The burner locks out on flame failure. What is the right approach?",o:["Reset repeatedly until it lights","Check the cause, reset once, investigate if it repeats","Jumper the flame detector","Shorten the purge"],a:1,e:"Repeated resets and bypasses risk a furnace explosion."},
  {q:"What does pre-purge accomplish?",o:["It tests the feed pump","It clears unburned fuel from the furnace before ignition","It cools the stack","It sets the water level"],a:1,e:"Moving air through the furnace prevents a delayed-ignition explosion."},
  {q:"High dissolved solids in boiler water mainly lead to which problem?",o:["Foaming and carryover","Faster purging","Lower stack temperature","Colder feedwater"],a:0,e:"Concentrated solids make water foam and carry over into the steam."},
  {q:"You smell gas in the boiler room. What do you do first?",o:["Look for the leak","Flip lights to see better","Leave, then call for help from outside","Relight the pilot"],a:2,e:"People first. Do not use switches, and do not hunt for the source."}
 ]},
 prv: {title:"Steam PRV station", q:[
  {q:"What is the main job of a steam pressure reducing station?",o:["Make steam","Drop supply pressure to a steady, lower working pressure","Remove condensate from the boiler","Measure flow"],a:1,e:"It protects downstream equipment rated for lower pressure."},
  {q:"A downstream gauge reads zero. What should you do before loosening a flange?",o:["Loosen it, the gauge says zero","Confirm zero at a vent or drain, opened slowly, after isolation","Tighten the packing","Open the bypass"],a:1,e:"A plugged gauge line can read zero while the pipe is still under pressure."},
  {q:"Why does a drip leg and trap sit ahead of the PRV?",o:["To add moisture","To give the valve dry steam and avoid seat erosion","To raise pressure","To silence the valve"],a:1,e:"Wet steam erodes seats and destabilizes control."},
  {q:"Downstream pressure rises above setpoint with no load. What is most likely?",o:["The strainer is too clean","A leaking valve seat","The gauge is too new","The bypass is working"],a:1,e:"A seat that does not close tightly lets pressure creep up."},
  {q:"The downstream relief valve lifts again and again. What is the right response?",o:["Raise its set pressure","Cap the discharge","Find the cause, such as a leaking PRV","Gag the valve"],a:2,e:"Adjusting or blocking a relief hides a real overpressure problem."},
  {q:"Why must a cold steam line be warmed slowly?",o:["To save steam","To avoid water hammer from steam meeting cold condensate","To raise setpoint","To test the traps"],a:1,e:"Fast admission into cold, wet pipe can rupture fittings."},
  {q:"Why is the bypass valve treated with caution?",o:["It is noisy","It can send full supply pressure downstream","It needs oil","It is always closed"],a:1,e:"Only trained staff use it, per procedure."},
  {q:"Where should a pilot's sensing line connect?",o:["Directly after an elbow","A stable, straight downstream run away from turbulence","Upstream of the strainer","Into the relief discharge"],a:1,e:"A turbulent or plugged sensing point makes the valve hunt."}
 ]},
 chiller: {title:"Chiller plant rounds", q:[
  {q:"Why record outdoor conditions and load with each reading?",o:["It fills the log","A reading without context cannot be trended","The chiller requires it","To set alarms"],a:1,e:"The same machine looks very different at light and heavy load."},
  {q:"How is condenser approach calculated?",o:["Entering minus leaving chilled water","Refrigerant saturation temperature minus leaving condenser-water temperature","Wet bulb minus dry bulb","Oil temperature minus bearing temperature"],a:1,e:"It is a measure of how well the condenser transfers heat."},
  {q:"Condenser approach is slowly rising over weeks. What might be happening?",o:["Fouled tubes or air in the machine","A new pump","Lower outdoor temperature","Cleaner water"],a:0,e:"Fouling or non-condensables are the usual suspects, so check treatment and cleaning history."},
  {q:"Chilled-water delta-T falls while flow rises. Where is the problem likely to be?",o:["Inside the compressor","In the system, such as leaking coil valves or bypass","In the oil sump","In the refrigerant monitor"],a:1,e:"Water is moving without doing much work, which points at the load side."},
  {q:"A refrigerant monitor alarm sounds in the machine room. What do you do?",o:["Silence it and finish rounds","Leave, then report","Open the machine","Reset the chiller"],a:1,e:"Leaks can displace oxygen. Leave first and report."},
  {q:"Rounds are observation only. You think a part needs touching. What next?",o:["Adjust it quickly","Stop and follow lockout/tagout and site procedure","Skip it","Ask no one"],a:1,e:"Anything beyond normal controls needs the site energy-control procedure."},
  {q:"Make-up water use is climbing without explanation. What could it indicate?",o:["A leak, tower overflow, or blowdown fault","Perfect operation","A cold day","Low delta-T"],a:0,e:"Hidden water loss shows up in the make-up meter."},
  {q:"Two sensors that should agree differ by a lot. What is the best next step?",o:["Average them","Verify with a calibrated meter","Ignore the higher one","Reset the plant"],a:1,e:"Disagreeing sensors usually mean one is failing or wrongly placed."}
 ]},
 hx: {title:"Heat exchangers", q:[
  {q:"Before servicing a heat exchanger, what must be isolated?",o:["The hot side only","Both fluid circuits, plus condensate return on steam units","Only electrical power","Nothing if it is off"],a:1,e:"The unit has two separate circuits and each needs lockout and verification."},
  {q:"Pressure drop is rising at the same flow. What is the likely cause?",o:["Narrowing passages from deposits or debris","Cleaner plates","Lower viscosity","A wider approach only"],a:0,e:"More restriction at the same flow means fouling or plugging."},
  {q:"Hot-side and cold-side heat transfer calculations disagree by a large amount. What should you suspect?",o:["A sensor error, wrong flow, heat loss or an internal leak","A perfect unit","A new gasket","Low ambient"],a:0,e:"By energy balance the two sides should roughly match."},
  {q:"Why record a baseline after commissioning or cleaning?",o:["For appearance","So later readings can be compared at similar flow and load","The gasket requires it","To avoid isolation"],a:1,e:"Without a baseline you can only guess whether it is fouled."},
  {q:"Which cleaning method is wrong for plates?",o:["Soft brush and low-pressure water","Chemicals approved for plate and gasket materials","A wire brush","Clean in place per the manual"],a:2,e:"Hard tools scratch plates and invite corrosion and fouling."},
  {q:"A brazed plate unit is badly fouled. What are the options?",o:["Open it with a wrench","Chemical circulation or backflushing, or replacement","Weld it open","Ignore it"],a:1,e:"Brazed and welded units cannot be opened."},
  {q:"Glycol shows up in a loop where it does not belong. What does this suggest?",o:["Normal mixing","A leak between the two fluids","A cold day","Air in the system"],a:1,e:"Isolate and notify, especially if a potable or critical system could be affected."},
  {q:"Steam heat exchanger: condensate is backing up and heat transfer drops. Why?",o:["Tubes are flooded due to a trap or condensate problem","Steam is too dry","The shell is too clean","The fan is off"],a:0,e:"Flooded surface cannot condense steam effectively."}
 ]},
 tower: {title:"Cooling tower", q:[
  {q:"What is a tower's approach?",o:["Water in minus water out","Leaving water temperature minus outdoor wet bulb","Dry bulb minus wet bulb","Basin level"],a:1,e:"Range is the temperature drop; approach is closeness to wet bulb."},
  {q:"Which outdoor condition limits tower performance most?",o:["Wind direction","Wet bulb temperature","Barometer reading only","Roof color"],a:1,e:"Humid air has less ability to take up evaporation."},
  {q:"Which are the three ways a tower loses water?",o:["Evaporation, drift, blowdown","Evaporation, leaks, fan speed","Drift, splash, fill","Blowdown, make-up, level"],a:0,e:"Make-up water replaces all three."},
  {q:"What does more blowdown do?",o:["Raises cycles of concentration","Lowers concentration but uses more water and chemicals","Stops corrosion","Cools the basin"],a:1,e:"Blowdown is the lever for mineral build-up."},
  {q:"How are people mainly exposed to Legionella from a tower?",o:["Drinking water","Breathing mist or fine droplets","Touching fill","Skin contact with the basin"],a:1,e:"Drift eliminators and a water-management plan reduce this risk."},
  {q:"You find stagnant water in an idle cell. What do you do?",o:["Nothing, it is idle","Report it and follow the site water-management plan","Hose it down","Turn the fan on"],a:1,e:"An idle tower is not safe by being idle, and hosing makes mist."},
  {q:"Gearbox oil looks milky. What is the right step?",o:["Run it and watch","Report it; water may be getting in","Add more oil","Ignore it"],a:1,e:"Milky oil suggests water ingress. Do not run it to see."},
  {q:"Before cold weather, what should you do about freeze protection?",o:["Assume heaters work","Test basin heaters, heat trace and controls","Turn the fans up","Fill the basin more"],a:1,e:"Protection that was never tested may not work when needed."}
 ]},
 pumps: {title:"Hydronic pumps and delta-T", q:[
  {q:"If flow doubles for the same heat load, delta-T will:",o:["Double","Halve","Stay the same","Go negative"],a:1,e:"Heat moved, flow and delta-T are tied together."},
  {q:"Which is a common cause of low delta-T?",o:["Control valves stuck open or leaking through","Clean coils","Low pump speed only","A new strainer"],a:0,e:"Water moves without doing useful work."},
  {q:"Pump cavitation sounds most like:",o:["A hiss","Gravel","A whistle","A click"],a:1,e:"Blocked suction, air or low suction pressure are common causes."},
  {q:"What does the expansion tank do in a closed loop?",o:["Adds heat","Gives expanding water somewhere to go via an air cushion","Removes air","Filters debris"],a:1,e:"Without it, pressure would climb and the relief valve would open."},
  {q:"Water comes out of an expansion tank's air valve. What does that mean?",o:["Normal operation","The diaphragm has failed","The precharge is perfect","The tank is empty"],a:1,e:"The tank should be replaced."},
  {q:"Strainer pressure drop is climbing above its clean baseline. What is that telling you?",o:["The strainer needs cleaning","The pump is too big","The loop is balanced","Nothing"],a:0,e:"Never remove the screen permanently to cure it."},
  {q:"A cold room is not warming. What do you check before raising pump speed?",o:["Nothing, speed fixes it","Air, closed or stuck valves, dirty strainers, small emitters","The roof","Outdoor sensor only"],a:1,e:"More flow rarely fixes a cold room and wastes power."},
  {q:"A good habit when balancing is to:",o:["Change several valves at once","Record positions first and change one thing at a time","Close all valves","Skip notes"],a:1,e:"Closing one branch affects all the others."}
 ]},
 epa608: {title:"EPA 608 essentials", q:[
  {q:"Who may take recovered refrigerant without reclaiming it first?",o:["Any other customer","Equipment owned by the same owner","Any technician","Nobody"],a:1,e:"Going to a different owner requires reclaiming."},
  {q:"Which certification type does not exist?",o:["Type I","Type II","Type IV","Universal"],a:2,e:"The types are I, II, III and Universal."},
  {q:"Type I covers appliances with a charge of:",o:["5 lb or less, factory sealed","Any size","Over 200 lb","Low-pressure only"],a:0,e:"Small appliances such as household units."},
  {q:"Which class is R-410A in?",o:["Low-pressure","Medium-pressure","High-pressure","Not regulated"],a:2,e:"R-22, R-410A and R-404A are high-pressure."},
  {q:"Low-pressure appliances are recovered to which level?",o:["0 psig","25 mm Hg absolute","10 psig","Atmospheric"],a:1,e:"Low-pressure chillers need a deep vacuum."},
  {q:"What gas should you use to pressure test a system?",o:["Compressed air","Oxygen","Dry nitrogen through a regulator","Refrigerant vapor"],a:2,e:"Oxygen and air can be explosive with oil."},
  {q:"Why are zeotropic blends charged as liquid?",o:["It is faster","Vapor charging lets the blend separate","The system is empty","It saves oil"],a:1,e:"Fractionation changes the blend composition."},
  {q:"Does a 608 certification expire?",o:["Every 3 years","Every 5 years","Never","With each employer"],a:2,e:"There is no renewal requirement."}
 ]}
};
