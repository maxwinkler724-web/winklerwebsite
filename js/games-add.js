/* Additional training game content. Loads AFTER games-data.js. General method only. Manufacturer procedures and fault tables always govern. */
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
  window.SCENARIOS = window.SCENARIOS.concat([
    S("dead-thermostat-blown-fuse", "Thermostat Is Blank After a Storm",
      "The thermostat went blank yesterday and nothing heats or cools. A handyman already put in a new fuse and it burned out again.",
      "The thermostat display is dark. The equipment looks fine from the outside and nothing is running.",
      [
        ["Switch off and lock out power before opening the control panel", "Power is off and locked out. It is safe to look at the control board and transformer."],
        ["Look at the low-voltage fuse on the control board", "The small fuse is blown, with a dark mark inside the glass."],
        ["Check the thermostat cable run where it enters the wall near the outdoor unit", "A staple has pinched the cable and the insulation is cut where two wires touch."],
        ["Disconnect the thermostat wires at the board, fit a correct-rating fuse, and restore power to test", "The fuse survives with the field wires disconnected, so the short is out in the wiring."],
        ["Repair the damaged section and reconnect, then check 24 volts at the thermostat", "With the cable repaired, the thermostat powers up and the system responds."],
        ["Replace the control board", "The board works. Nothing found so far says the board has failed."],
        ["Install a bigger fuse so it stops blowing", "A larger fuse removes the protection and can overheat the transformer. Never do this."]
      ],
      [
        ["A short in the thermostat wiring was blowing the low-voltage fuse", "The fuse survived with the field wires disconnected, and the cut insulation was found. Repairing the wire fixed it."],
        ["The compressor is shorted", "A compressor fault would not blank the thermostat or blow the low-voltage fuse."],
        ["The thermostat batteries are dead", "A fuse that burns out repeatedly points to a short, not a battery problem."],
        ["The gas valve has failed", "Nothing here ties to the gas valve, and the equipment is dark because it has no control power."]
      ],
      ["c1", "c2", "c3"],
      "A blown fuse is a clue, not the problem. Find the short before you put in a new fuse of the correct rating, and never defeat the protection."),
    S("furnace-blocked-trap-lockout", "Furnace Hums, Clicks, and Goes Quiet",
      "The furnace starts up with a humming noise, never lights, and then sits there. It did this twice this morning.",
      "The inducer fan runs for a short while, but the igniter never glows and no burners light. The board flashes a code.",
      [
        ["Check for gas smell, CO alarm, or soot, and shut the unit off before opening panels", "No gas smell and no CO alarm. The unit is off and it is safe to continue."],
        ["Read the board's flash code and compare it with the manufacturer's table", "The code points to a pressure switch that did not close."],
        ["Look at the outside vent terminations and the intake", "Both are clear of snow and debris."],
        ["Inspect the condensate trap and the pressure switch tubing", "The trap is clogged with sludge, and water is backing up toward the pressure tube."],
        ["Clean the trap, drain the tube, and run a full cycle", "After cleaning, the pressure switch closes, the igniter glows, and the burners light normally."],
        ["Replace the inducer motor", "The inducer was running normally. Nothing so far points to it as the problem."],
        ["Jumper across the pressure switch to make the furnace start", "This defeats a safety that proves the vent is working. It can let a furnace run with a blocked vent."]
      ],
      [
        ["A blocked condensate trap and tube kept the pressure switch from closing", "The switch proves the vent is moving air. Water backing up held it open, so the board stopped the start."],
        ["The flame sensor is dirty", "That fault would show after the burners light, and here the sequence stops before ignition."],
        ["The gas supply is shut off", "The igniter never even tried, so the problem is earlier than the gas valve."],
        ["The thermostat is broken", "The furnace responded to the call by starting the inducer, so the call is arriving."]
      ],
      ["c1", "c2", "c4"],
      "When the sequence stops before ignition, follow the safeties in order. A pressure switch is telling you about the vent path, so check that path and never jumper the switch."),
    S("boiler-low-pressure-lockout", "Boiler Is Cold and Showing a Fault",
      "The radiators are cold, the house is dropping in temperature, and the boiler shows a code.",
      "The boiler is powered and there is a call for heat, but the burner will not fire. The display shows a low water or low pressure code.",
      [
        ["Check for gas smell, CO alarm, steam, or active water leaks before touching anything", "No gas or CO. There is a small drip at a pipe joint in the basement, and the boiler is cool to the touch."],
        ["Read the display and confirm the code in the manufacturer's table", "The code says low system pressure and the burner is locked out."],
        ["Read the pressure gauge on the boiler", "The gauge reads near zero, well below the cold-fill value on the label."],
        ["Look over the piping, relief valve discharge, and the expansion tank connection", "A weeping fitting is found, and the relief valve is dry. The tank looks fine."],
        ["Repair the leak, refill to the manufacturer's value, and purge air per the instructions", "Pressure returns to the normal value, the lockout clears, and the burner fires."],
        ["Replace the boiler control", "The control reported correctly. It stopped the burner because the pressure was too low."],
        ["Jumper out the low-water or low-pressure switch to make it fire", "That defeats the protection and could run the boiler dry. Never do it."]
      ],
      [
        ["Low system pressure from a leak locked the boiler out", "The control did its job. Repair the leak, restore pressure the right way, and the burner fires."],
        ["The thermostat is set too low", "A call for heat was present, so the thermostat was asking for heat."],
        ["The burner igniter has failed", "The boiler never reached an ignition try, because it was held off by the low-pressure code."],
        ["The circulator is stuck", "A stuck circulator would not explain a near-zero gauge and the low-pressure code."]
      ],
      ["c1", "c2", "c3"],
      "A lockout is usually the control protecting the boiler. Read the code, confirm it with a gauge, then find and fix the cause rather than defeating the safety."),
    S("rooftop-dirty-condenser-trip", "Rooftop Unit Quits on Hot Afternoons",
      "The store gets warm every hot afternoon, then cools again in the evening. The rooftop unit seems to just stop.",
      "On the roof, the supply fan runs, but the compressor is off and the condenser fans are slowing. A high-pressure fault is in the history.",
      [
        ["Make sure you have safe roof access and fall protection, then lock out power before opening panels", "Roof access is safe and the unit is locked out and verified off."],
        ["Read the unit control fault history", "The history shows repeated high-pressure trips on hot afternoons."],
        ["Look at the condenser coil face and the area around the unit", "The coil is packed with cottonwood fluff and leaves, and a stack of boxes blocks one side."],
        ["Check that condenser fan blades turn freely and the fans are running", "The fans and blades are fine and turn freely."],
        ["Clean the coil per the manufacturer, clear the clearance, and run the unit on a hot day", "With the coil clean and the air path clear, the unit holds a normal discharge pressure and keeps cooling."],
        ["Replace the compressor", "The compressor stops on a protective trip and runs normally once the pressure is under control."],
        ["Bypass the high-pressure switch so the unit keeps running", "That removes a safety that protects the compressor and the system. It is never acceptable."]
      ],
      [
        ["A dirty, blocked condenser coil was raising pressure until the high-pressure safety opened", "Heat could not leave the coil, pressure climbed on hot afternoons, and the safety shut the compressor off."],
        ["The supply fan motor is failing", "The supply fan was running and the fault history names pressure, not the fan."],
        ["The thermostat is set wrong", "The unit tried to cool and was stopped by a safety, not a setting."],
        ["The unit is low on refrigerant", "Low charge would not raise the head pressure that tripped the safety, and nothing found points to a leak."]
      ],
      ["c1", "c2", "c3"],
      "A safety trip is information. Read the history, then fix the reason the pressure rose, which here was a dirty coil and blocked airflow, not the switch."),
    S("vrf-indoor-communication-error", "One Office Unit Shows an Error",
      "One ceiling cassette in the corner office shows a code and will not cool. The rest of the building is fine.",
      "The remote controller shows a communication error for that one indoor unit. The other indoor units and the outdoor unit are running normally.",
      [
        ["Turn power off to the indoor unit and lock it out before opening the cover", "Power is off and locked out. The cover can be opened safely."],
        ["Record the code and look it up in the manufacturer's fault table", "The table says the indoor unit is not communicating with the system."],
        ["Check that the remote controller and the other units are working normally", "Other units cool well, so the outdoor unit and the main bus are working."],
        ["Inspect the communication wires at the indoor unit terminals", "One communication wire has pulled loose from the terminal block."],
        ["Reseat the wire, restore power, and confirm the unit rejoins the system", "The unit communicates again and starts cooling."],
        ["Replace the outdoor unit control board", "Other units work, so the outdoor board is fine."],
        ["Add refrigerant to this indoor unit", "This is a communication fault. Adding refrigerant would not help and can overcharge the system."]
      ],
      [
        ["A loose communication wire at that indoor unit", "Only that unit lost communication, and reseating the wire restored it."],
        ["The outdoor compressor has failed", "The other units are cooling, so the compressor and outdoor unit are working."],
        ["The refrigerant charge is low across the system", "That would affect many units, not only one with a communication error."],
        ["The building is too hot for the system", "The code is about communication, not capacity or load."]
      ],
      ["c1", "c2", "c4"],
      "When only one unit has a communication code and others are fine, start with its wiring and settings before touching the shared parts."),
    S("condensate-float-switch-trip", "Air Conditioner Quit and Water Is in the Pan",
      "The air conditioner stopped cooling and the blower may or may not be running. There was a small water stain on the closet floor.",
      "The thermostat calls for cooling, the outdoor unit is not running, and the secondary drain pan has some water in it.",
      [
        ["Shut off power and make sure no water is touching electrical parts before you work", "Power is off and the wet area is away from the electrical parts. It is safe to continue."],
        ["Look at the float switch on the drain line or pan", "The float switch is lifted and open, which is stopping the system on purpose."],
        ["Check the condensate drain line and trap for flow", "The line is clogged with slime and water backs up when you pour some in."],
        ["Clear the line using the method the manufacturer or site allows, and clean the pan and trap", "The water drains freely and the pan empties."],
        ["Reset the switch, restore power, and run the unit while watching the drain", "The float switch drops back to normal and the unit runs and cools."],
        ["Replace the evaporator coil", "The coil is not leaking. The water came from a blocked drain."],
        ["Jumper out the float switch so the unit keeps running", "That defeats the protection that prevents water damage. It is never acceptable."]
      ],
      [
        ["A clogged condensate drain filled the pan and tripped the float switch", "The switch did its job. Clearing the drain let the water out and the switch reset."],
        ["The outdoor compressor has failed", "The outdoor unit was off because the safety stopped the call, not because the compressor failed."],
        ["The thermostat has no power", "The thermostat was calling for cooling."],
        ["The float switch is wired backwards", "The switch opened because water was rising, so it was working properly."]
      ],
      ["c1", "c2", "c3"],
      "A water safety switch is protecting the house. Find the reason the water is backing up, clear it, and leave the switch in place.")
  ]);

  window.SEQUENCES = window.SEQUENCES.concat([
    {
      id: "furnace-start-sequence",
      title: "Normal Gas Furnace Start Sequence",
      intro: "A typical induced-draft furnace goes through a set order of events. Your furnace may differ, so use the manufacturer's sequence.",
      steps: [
        "The thermostat calls for heat",
        "The inducer starts and the pressure switch proves airflow",
        "The igniter warms up",
        "The gas valve opens and the burners light",
        "The control proves flame with the flame sensor",
        "The blower starts after a short delay"
      ],
      why: "Each step proves the one before it. If the sequence stops, the step where it stops tells you where to look. Never jumper a safety."
    },
    {
      id: "low-voltage-no-power",
      title: "Finding Why the Thermostat Is Dead",
      intro: "Work from the power source toward the thermostat, using safe meter habits.",
      steps: [
        "Lock out line voltage and look for burnt smells or damage",
        "Check the switch, breaker, and connections feeding the transformer",
        "Restore power and measure line voltage into the transformer",
        "Measure about 24 volts AC from the transformer secondary",
        "Check the low-voltage fuse and find the reason if it is blown",
        "Check 24 volts at the thermostat terminals and the wiring"
      ],
      why: "Moving from the source outward splits the problem in half each time and keeps you from replacing a part that works."
    },
    {
      id: "condensate-drain-call",
      title: "Handling a Water Safety Switch Call",
      intro: "A float switch stopped the system. Put the steps in a safe order.",
      steps: [
        "Shut off power and keep water away from electrical parts",
        "Note where the water is and how much there is",
        "Find which switch has opened and confirm it is a safety device",
        "Clear the drain line and clean the pan and trap",
        "Restore power and run the unit while watching the drain",
        "Advise the customer about drain maintenance"
      ],
      why: "Fix the water path, not the switch. The switch protects the building, so leave it in place and working."
    },
    {
      id: "boiler-lockout-response",
      title: "Responding to a Boiler Lockout",
      intro: "A boiler shows a lockout code. Put the response steps in order.",
      steps: [
        "Check for gas smell, CO alarm, steam, or leaks and make the area safe",
        "Read and write down the code",
        "Look up the code in the manufacturer's table",
        "Check the item the code names, such as pressure, water level, or vent",
        "Fix the cause, never the safety",
        "Reset as the manufacturer allows and watch a full cycle"
      ],
      why: "The control stopped for a reason. Read it, confirm it, fix the cause, and only then reset."
    }
  ]);

  window.PAIRS = window.PAIRS.concat([
    {
      id: "controls-and-electrical",
      title: "Controls and Electrical Terms",
      pairs: [
        ["Transformer", "Steps line voltage down to about 24 volts for controls"],
        ["Low-voltage fuse", "Protects the transformer from a short in control wiring"],
        ["Contactor", "An electric switch that powers a compressor or fan motor"],
        ["Capacitor", "Stores energy to help a motor start or run"],
        ["Float switch", "Opens when water rises and stops the system"],
        ["Pressure switch", "Proves a fan or system is making pressure or flow"]
      ]
    },
    {
      id: "gas-heat-parts",
      title: "Gas Heat Parts and What They Do",
      pairs: [
        ["Inducer", "Pulls combustion gases through the heat exchanger and vent"],
        ["Igniter", "Heats up to light the gas"],
        ["Flame sensor", "Proves flame to the control"],
        ["Limit switch", "Opens if the furnace gets too hot"],
        ["Rollout switch", "Opens if flame rolls out of the burner area"],
        ["Gas valve", "Opens to let gas flow when the control allows"]
      ]
    },
    {
      id: "commercial-system-parts",
      title: "Commercial Equipment Parts",
      pairs: [
        ["Rooftop unit", "A packaged cooling and heating unit set on a roof"],
        ["Economizer", "Uses cool outdoor air for free cooling when conditions allow"],
        ["VRF system", "One outdoor unit feeding many indoor units with variable refrigerant flow"],
        ["Low-water cutoff", "Stops a boiler from firing if water is too low"],
        ["Zone valve", "Opens to let hot water flow to one zone"],
        ["Condensate pump", "Moves water from a drain pan to a drain"]
      ]
    }
  ]);
})();
