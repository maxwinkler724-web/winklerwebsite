/* More training game content (chiller trips, cooling tower, steam traps and coil water hammer, boiler water carryover, feedwater pump, and BAS faults). Loads AFTER games-data.js and games-add.js through games-add7.js. General method only. Manufacturer procedures and fault tables always govern. */
(function () {
  var K = ["safety", "simple", "simple", "measure", "measure", "deep", "wrong"];
  function S(id, title, customer, setup, c, dx, best, lesson) {
    return {
      id: id, title: title, customer: customer, setup: setup,
      checks: c.map(function (x, i) { return { id: "c" + (i + 1), label: x[0], result: x[1], kind: K[i] }; }),
      diagnoses: dx.map(function (d, i) { return { t: d[0], correct: i === 0, why: d[1] }; }),
      bestPath: best, lesson: lesson
    };
  }
  var BP = ["c1", "c2", "c3", "c4", "c5", "c6"];
  window.SCENARIOS = window.SCENARIOS.concat([
    S("chiller-freeze-trip-plugged-strainer", "Chiller Keeps Tripping on Low Evaporator Temperature",
      "The facility manager says the chiller shuts down a few minutes after starting and shows a freeze fault. Some zones are warm.",
      "A water-cooled chiller on a chilled-water loop with a strainer on the return. The pump runs and the panel shows a low evaporator temperature trip.",
      [
        ["Lock out the chiller before opening any panel, and do not jumper the freeze safety", "The chiller is off and tagged. The freeze safety is intact."],
        ["Read the fault code and the trip history", "Repeated low evaporator temperature trips, each soon after start."],
        ["Look at the pump gauges and the flow reading", "Differential pressure across the strainer is high and flow is below design."],
        ["Compare entering and leaving chilled-water temperatures", "A very large temperature drop across the evaporator, which fits low flow."],
        ["Check the leaving-water setpoint and the load", "Setpoint is at the design value and load is moderate."],
        ["After isolating and relieving pressure, open the strainer", "The basket is packed with debris from recent piping work."],
        ["Raise the freeze trip setting so the chiller stays on", "That disables protection and can split the evaporator. This is unsafe."]
      ],
      [
        ["A plugged strainer cut chilled-water flow, so the evaporator water got too cold and the freeze safety tripped", "High strainer pressure drop, low flow, and large temperature drop."],
        ["The refrigerant charge is low", "Water flow was the clear fault and readings fit it."],
        ["The freeze setting is wrong", "The setting matched the maker's value."],
        ["The condenser is fouled", "The trip was low temperature, not high pressure."]
      ],
      BP,
      "Freeze trips usually start with water flow. Fix the flow, never move the safety.")
    ,
    S("chiller-flow-switch-paddle-fouled", "Chiller Will Not Start and Shows a Flow Fault",
      "The operator says the chiller pump runs, but the chiller will not start. The panel reads no flow.",
      "A chilled-water loop with a paddle-type flow switch in the pipe near the evaporator. The pump is running.",
      [
        ["Lock out and tag out before touching the flow switch wiring", "Power is off and verified. The flow switch contacts are not jumpered."],
        ["Read the panel fault", "No proof of flow. Pump status shows running."],
        ["Check the differential pressure gauge across the pump and evaporator", "Pressure difference is normal, so water is moving."],
        ["With power restored safely, measure whether the switch contacts close when the pump runs", "The contacts stay open even with normal flow."],
        ["Compare the switch type and setting to the chiller maker's instruction", "The switch is the right model and is installed in the right direction."],
        ["With the loop isolated and relieved, remove and inspect the switch paddle", "The paddle is coated with scale and stuck, and cannot swing."],
        ["Jumper the flow switch terminals to start the chiller", "That removes a safety. This is unsafe."]
      ],
      [
        ["The flow switch paddle is stuck with deposits, so the safety stays open though water flows", "Normal differential pressure and an open switch with good flow."],
        ["The pump is not moving water", "Pressure readings show normal flow."],
        ["The chiller control board has failed", "Switch contacts are open at the switch itself."],
        ["The evaporator is frozen", "No freeze fault is shown."]
      ],
      BP,
      "Match what the safety says with a second reading, such as pressure difference. A bad switch is replaced, not jumpered.")
    ,
    S("cooling-tower-fan-vfd-fault-warm-supply", "Cooling Tower Supply Water Is Too Warm on a Hot Day",
      "The operator says condenser water is several degrees warmer than usual and the chiller is near its high-head limit.",
      "A cooling tower with a VFD-driven fan on a hot, humid afternoon. The BAS shows the fan commanded high.",
      [
        ["Lock out the fan before approaching the fan deck, and use fall protection", "The fan is locked out. The deck is dry and guarded."],
        ["Look at the BAS: fan command, tower supply temperature, outdoor conditions", "Fan commanded to full. Supply water is warm. Outdoor humidity is high."],
        ["Observe the fan from the ground before lockout", "The fan is not turning."],
        ["Read the VFD display and fault history", "The drive shows an overcurrent fault from earlier in the day."],
        ["Inspect the motor, belt or gearbox, and fan blades with the fan locked out", "Mechanical parts turn freely and look normal."],
        ["Have a qualified electrician check the motor wiring and drive output", "A damaged motor cable is found and repaired. The drive is reset after the fix."],
        ["Turn up the chiller high-pressure setting so it keeps running on warm water", "That removes protection from the chiller. This is unsafe."]
      ],
      [
        ["A VFD fault stopped the tower fan, so too little air moved over the fill and the condenser water ran warm", "Fan commanded but not turning, and a recorded drive fault."],
        ["The fill is plugged", "Fill was not the reason the fan stopped."],
        ["The basin level is low", "Level was normal."],
        ["The chiller is overcharged", "The cause was upstream at the tower."]
      ],
      BP,
      "Match the command to what the equipment actually does. Fix a drive fault at its cause, not by loosening a chiller safety.")
    ,
    S("steam-trap-blowing-return-banging", "Steam Trap Blows Steam and the Return Line Bangs",
      "The plant operator says a steam plume rises from a condensate return vent and the return piping bangs at times.",
      "A heating coil with a float-and-thermostatic trap piped to a return line. A visible plume comes from the receiver vent.",
      [
        ["Keep clear of hot piping and the plume, and isolate before touching anything", "The area is cordoned off. The trap line is isolated and relieved per site procedure."],
        ["Look at the trap discharge from a safe distance before isolation", "Steady live steam passes the trap, not just a flash."],
        ["Check the temperature on both sides of the trap with a safe tool", "Both sides are near steam temperature."],
        ["Listen with a tool as the site procedure allows", "A continuous rushing sound is present, not clicking."],
        ["Check the return line for back pressure", "Return pressure is higher than normal, which fits steam passing into it."],
        ["Open the trap after cooldown and inspect", "The seat is worn and held open by dirt."],
        ["Plug the vent so the plume stops", "That can overpressurize the receiver. This is unsafe."]
      ],
      [
        ["The trap failed open and is passing live steam into the return, which raises back pressure and can cause hammer", "Continuous rush, hot on both sides, higher return pressure, and a worn seat."],
        ["The coil is leaking", "The trap itself was passing steam."],
        ["The trap is cold and plugged", "It was hot and passing steam."],
        ["The return pump is oversized", "Nothing pointed to the pump."]
      ],
      BP,
      "A blowing trap wastes steam and loads the return. Isolate, replace, and check the line. Never cap a vent.")
    ,
    S("steam-coil-water-hammer-cold-trap", "Steam Coil Bangs Hard When the Valve Opens",
      "The building engineer says the air handler steam coil bangs loudly at start-up and the coil sometimes leaks.",
      "A steam heating coil in an air handler with a control valve, a trap, and a condensate return. The trap line is cold.",
      [
        ["Shut the steam supply slowly and keep clear of the coil and piping", "Steam is off and the coil is isolated. The banging stops."],
        ["Look for leaks at flanges and the coil", "A weeping joint is seen, which means the piping is stressed."],
        ["Check the control valve position at start-up", "The valve snaps open fully onto the cold coil."],
        ["After cool-down, check the trap and its strainer", "The strainer is packed with scale and the trap is cold."],
        ["Check the condensate return pressure", "Return pressure is normal."],
        ["Clean the strainer, check the trap, and slowly warm the coil", "Condensate drains and the banging stops."],
        ["Open the steam valve wide to push the water out", "That can drive a slug through and rupture piping. This is unsafe."]
      ],
      [
        ["Condensate could not leave because the trap was blocked, and a fast valve opening sent steam into cold piping, slugging the water", "Cold trap, plugged strainer, snap-open valve, and relief after cleaning and a slow start."],
        ["The return line pressure is too high", "It was normal."],
        ["The coil has the wrong size trap only", "The strainer block was the main fault."],
        ["The air handler fan is too fast", "Fan speed was not involved."]
      ],
      BP,
      "Water hammer is condensate in motion. Drain the coil, warm up slowly, and never open steam wide to clear it.")
    ,
    S("boiler-carryover-foaming-low-blowdown", "Steam Boiler Is Carrying Water and the Gauge Glass Is Foamy",
      "The operator says steam at the header looks wet, traps spit water, and the level bounces after a load swing.",
      "A steam boiler with a gauge glass, a surface blowdown, and a water-treatment log. The last test sheet is a few weeks old.",
      [
        ["Stay clear of the gauge glass and blowdown lines, and do not jumper any cutoff", "Safeties are intact. Blowdown lines are hot and shielded."],
        ["Watch the level through a full load swing", "The glass shows foam and a bouncing level."],
        ["Read the latest water-test results", "Dissolved solids are above the target range the water-treatment provider set."],
        ["Check the blowdown controls and valves", "The blowdown valve is stuck shut and the timer is off."],
        ["Check condensate returns for contamination", "No oil or contamination seen."],
        ["Have the treatment provider review and adjust per their plan", "Blowdown restored and treatment adjusted. The level steadies."],
        ["Pour a random cleaner into the boiler to stop the foam", "Unapproved chemicals can make foaming worse. This is unsafe."]
      ],
      [
        ["High dissolved solids from too little blowdown made the water foam and carry over into the steam", "High test results, foamy level, and a stuck blowdown valve."],
        ["The pressure limit is set too high", "Pressure was normal."],
        ["The feedwater pump is cavitating", "Pump behavior was normal."],
        ["The steam traps are all failed", "The traps spit because the steam is wet."]
      ],
      BP,
      "Carryover often comes from water chemistry. Check blowdown and the test log, and let the treatment provider set the fix.")
    ,
    S("feedwater-pump-cavitates-deaerator-pressure-drop", "Boiler Feedwater Pump Is Rattling After a Load Drop",
      "The operator says the feed pump sounds like gravel, its discharge pressure swings, and the boiler level is falling.",
      "A deaerator feeding a boiler feedwater pump. The deaerator pressure gauge shows a recent dip.",
      [
        ["Watch the boiler level and be ready to follow the site procedure for low water, and do not bypass the cutoff", "The low-water cutoff is armed. The level is low but above the trip."],
        ["Read the deaerator pressure and tank level", "Pressure dipped after a sudden load drop. Level is still adequate."],
        ["Listen to the pump from a safe distance", "A gravel-like noise and swinging discharge pressure."],
        ["Check the suction strainer differential", "The strainer is clean."],
        ["Check the deaerator steam supply valve and pressure control", "The pressure control valve had closed too far after the load change."],
        ["After the control is corrected and the pump stays stopped until pressure recovers, restart per the maker's steps", "Pump runs quietly and level recovers."],
        ["Throttle the suction valve to quiet the pump", "That worsens cavitation. This is unsafe."]
      ],
      [
        ["Deaerator pressure fell, so hot water flashed at the pump inlet and the pump cavitated", "Pressure dip, gravel noise, clean strainer, and a restored pressure control."],
        ["The suction strainer is plugged", "It was clean."],
        ["The pump motor has failed", "The motor ran and sound was cavitation."],
        ["The boiler has scale", "Scale did not explain the pump noise."]
      ],
      BP,
      "A gravel-noise pump after a pressure dip is often flashing at the inlet. Restore deaerator pressure, and never throttle suction.")
    ,
    S("vav-box-airflow-low-hoses-swapped", "VAV Box Never Reaches Its Airflow Setpoint",
      "The tenant says the office is stuffy. The BAS shows the VAV damper at 100 percent open but airflow stays below setpoint.",
      "A pressure-independent VAV box with a damper actuator, an airflow pickup, and a DDC controller. The supply fan is running.",
      [
        ["Lock out any heat or power before opening the box, and note the BAS point states", "The box is safe to open. No manual override is shown."],
        ["Read airflow, setpoint, and damper position on the BAS", "Damper is fully open, airflow reads far below setpoint."],
        ["Check duct static pressure at the inlet and the supply fan status", "Static pressure and fan speed are normal."],
        ["Measure airflow with a calibrated hood or a trusted traverse", "The real airflow is much higher than the BAS reading."],
        ["Check the pickup tubing to the controller", "The two tubes are swapped at the transducer."],
        ["Correct the tubing and recheck the reading", "Reading matches the hood and the damper modulates."],
        ["Force the damper to full open permanently in the BAS", "That hides the fault and may upset the system balance. This is unsafe."]
      ],
      [
        ["Airflow pickup tubes are reversed, so the controller reads the wrong airflow and holds the damper open", "Real airflow was higher than the reading and swapped tubes were found."],
        ["The supply fan is too slow", "Fan and duct pressure were normal."],
        ["The damper actuator is stuck closed", "The damper was fully open."],
        ["The zone thermostat has failed", "The box setpoint was the issue only through bad feedback."]
      ],
      BP,
      "Compare the BAS reading with an independent measurement. A wrong sensor path can look like a mechanical airflow problem.")
    ,
    S("bas-rogue-override-holds-reheat-open", "A Zone Is Hot Though the BAS Shows It Commanded to Cool",
      "The tenant says the room is hot. The facility manager sees the zone cooling call on the BAS but nothing changes.",
      "A fan-powered VAV box with a hot-water reheat valve. The BAS shows the reheat command as manually set.",
      [
        ["Lock out before opening the box, and avoid hot reheat piping", "The box is safe. The reheat coil piping is hot and shielded."],
        ["Look at the reheat valve point in the BAS", "The valve point shows a manual override at 100 percent, set weeks ago."],
        ["Check the zone temperature and the cooling damper", "Zone is warm and the cooling damper is open."],
        ["Feel the reheat coil piping carefully, or use a probe", "The coil is hot, so the valve is passing hot water."],
        ["Check the override log or ask staff who set it", "A technician set it during testing and did not release it."],
        ["Release the override with approval and watch the valve close", "The valve closes and the zone cools."],
        ["Leave the override on and add more cooling airflow", "This wastes energy and masks the fault. This is unsafe practice."]
      ],
      [
        ["A forgotten manual override held the reheat valve open while the box was calling for cooling", "Override at 100 percent, hot coil, and the zone cooled when released."],
        ["The cooling damper actuator failed", "The damper was open."],
        ["The chiller is down", "Supply air was cool enough."],
        ["The sensor reads wrong", "A handheld check matched the sensor."]
      ],
      BP,
      "Check the override list first when a point does not follow its logic. Release overrides with approval and leave a note.")
    ,
    S("bas-loop-hunting-trend-valve-oscillates", "A Control Valve Swings Open and Shut and the Room Temperature Hunts",
      "The occupant says the room swings warm to cool every few minutes. The BAS trend shows a repeating wave.",
      "A hot-water valve on a zone loop with a PI control loop. The trend graph shows a regular wave in both the valve command and the zone temperature.",
      [
        ["Lock out before touching the actuator, and avoid hot piping", "The actuator is isolated. No exposed live parts."],
        ["Review the trend of valve command, zone temperature, and setpoint", "A steady wave in valve and temperature with a period of several minutes."],
        ["Check for an override or a schedule change", "None found."],
        ["Observe the valve stem when commanded in small steps", "The valve responds smoothly, with no sticking."],
        ["Review the loop gain and integral values compared with the controls contractor's standard", "Gain was recently raised high and the integral time is very short."],
        ["Reduce the gain and lengthen integral time in small steps, with approval, and watch the trend", "The wave settles and the temperature holds near setpoint."],
        ["Replace the valve actuator right away without checking the trend", "The hardware was fine. This wastes time and money."]
      ],
      [
        ["Loop tuning is too aggressive, so the controller overreacts and the valve and temperature hunt", "A regular wave, a healthy valve, and settling after retuning."],
        ["The valve is sticking", "It moved smoothly."],
        ["The sensor is failing", "Readings matched a handheld."],
        ["A forgotten override is in place", "No override was found."]
      ],
      BP,
      "A regular wave in a trend points to tuning first. Change gains in small steps, with approval, and watch the trend.")
  ]);

  window.SEQUENCES = window.SEQUENCES.concat([
    {
      id: "chiller-safety-trip-response-order",
      title: "Responding to a Chiller Safety Trip",
      intro: "A sensible order for a chiller that has tripped on a safety. Follow the chiller maker's manual and site rules.",
      steps: [
        "Read and record the fault code and time before any reset",
        "Check that no one is near moving or hot equipment",
        "Lock out and tag out before opening panels",
        "Check water flow, strainers, and valve positions",
        "Check condenser water or air, and the tower or fans",
        "Look for the cause of the safety, not the safety itself",
        "Reset once, run, and log the readings"
      ],
      why: "A trip is the safety working. Read the code first, find the cause, and never jumper or loosen a safety."
    },
    {
      id: "steam-coil-water-hammer-response-order",
      title: "Responding to Water Hammer at a Steam Coil",
      intro: "A sensible order for banging in a steam coil or condensate line. Follow your site rules and the maker's manuals.",
      steps: [
        "Stop and keep people clear if the banging is violent",
        "Close the steam supply slowly",
        "Let the line cool and isolate and relieve pressure",
        "Check the trap, strainer, and condensate return",
        "Check the control valve opening speed",
        "Look for low points, bad pitch, or lifted drains",
        "Warm up slowly and watch for a repeat"
      ],
      why: "Water hammer is moving condensate. Drain it, find why it collected, and warm up slowly."
    }
  ]);

  window.PAIRS = window.PAIRS.concat([
    {
      id: "plant-and-chiller-fault-clues",
      title: "Chiller, Tower, Steam, and Boiler Water Clues",
      pairs: [
        ["Chiller freeze trip with a very large water temperature drop", "Low chilled-water flow, often a plugged strainer"],
        ["Flow fault with normal differential pressure", "Fouled or stuck flow switch"],
        ["Cooling tower fan commanded high but not turning", "Drive or motor fault"],
        ["Steam trap cold and equipment not heating", "Failed closed, plugged, or no steam supply"],
        ["Steam trap blowing a steady plume", "Failed open trap"],
        ["Foamy gauge glass and wet steam", "High solids or contamination causing carryover"],
        ["Gravel noise at the feedwater pump after a pressure dip", "Cavitation from flashing at the inlet"]
      ]
    },
    {
      id: "bas-symptom-first-check",
      title: "BAS Symptom: First Thing to Check",
      pairs: [
        ["Zone hot with the valve commanded open", "Confirm the actuator really moves"],
        ["VAV damper fully open but airflow low", "Compare the BAS flow reading with a measured value"],
        ["Point ignores its logic", "Look for a manual override"],
        ["Repeating wave in a trend", "Loop tuning gain and integral time"],
        ["Room sensor looks wrong", "Compare with a calibrated handheld meter"],
        ["Controller shows no recent updates", "Network and controller status"]
      ]
    }
  ]);
})();
