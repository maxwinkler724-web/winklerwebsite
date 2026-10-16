/* More training game content. Loads AFTER games-data.js and games-add.js. General method only. Manufacturer procedures and fault tables always govern. */
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
    S("steam-radiator-hammer-pitch", "Radiator Bangs and Spits Every Morning",
      "Every morning when the heat comes on, the radiator in the front room bangs and spits water out of the little vent on its side.",
      "A one-pipe steam radiator is cool at the start of the cycle. The boiler is running normally and other radiators are quiet.",
      [
        ["Let the radiator and vent cool and keep people clear of hot parts before you touch anything", "Everything is cool and the room is clear. It is safe to look closely."],
        ["Look at the supply valve on the radiator", "The valve is only partly open, with the handle stuck halfway."],
        ["Check the radiator with a level", "The radiator leans slightly away from the supply valve, so water can pool at the far end."],
        ["Open the valve fully and look at the vent", "The vent is clean and working. With the valve fully open, more steam reaches the radiator."],
        ["Shim the feet so the radiator slopes toward the valve and watch the next heating cycle", "The bang stops and no water spits from the vent."],
        ["Replace the boiler", "The boiler works and the other radiators are quiet."],
        ["Plug the vent so water cannot spit out", "A plugged vent traps air and stops steam from filling the radiator. It does not fix the cause."]
      ],
      [
        ["A partly closed valve and a radiator sloping the wrong way trapped water and caused the bang and spit", "Opening the valve and restoring the slope let water drain back and steam fill the radiator."],
        ["The boiler is making wet steam in the whole house", "Other radiators are quiet, which points at this radiator."],
        ["The thermostat is set too high", "A high setpoint would not cause hammer in one radiator."],
        ["The relief valve is leaking", "Nothing in the story points to the relief valve."]
      ],
      ["c1", "c2", "c3"],
      "In a one-pipe radiator, steam and condensate share one pipe. A full-open valve and a slight slope toward it let water drain back instead of banging."),
    S("steam-boiler-lwco-sediment", "Steam Boiler Keeps Shutting Off",
      "The boiler fires for a minute or two, then shuts off. A little red light comes on at the boiler.",
      "The boiler is cool enough to approach. A low-water indicator is showing on the control.",
      [
        ["Check for gas smell, CO alarm, leaks, and steam before approaching the boiler", "No gas smell, no CO alarm, and no leaks. It is safe to continue."],
        ["Read the gauge glass", "The water in the glass looks to be at a normal level."],
        ["Read the control's indicator and compare with the manufacturer's table", "The control is reporting a low-water condition even though the glass shows water."],
        ["Follow the manufacturer's procedure to flush the low-water cutoff", "Rusty sediment comes out with the water."],
        ["Restore power and watch a full cycle", "The boiler runs a full cycle and the cutoff stays satisfied."],
        ["Replace the whole boiler", "The boiler works. Nothing found so far says the boiler is at fault."],
        ["Jumper across the low-water cutoff so the boiler keeps firing", "That defeats a safety control. Never do this."]
      ],
      [
        ["A sediment-fouled low-water cutoff was tripping on a normal water level", "Flushing the cutoff cleared the sediment and the boiler ran normally."],
        ["The boiler really has too little water", "The gauge glass shows a normal level."],
        ["The thermostat is defective", "The boiler responds to the call and then shuts off from a control fault."],
        ["The pressure control is set too low", "The control is reporting low water, not low pressure."]
      ],
      ["c1", "c3", "c4"],
      "A low-water indicator with a normal gauge glass may point to a dirty cutoff. Flush it by the manufacturer's procedure, and never jumper it out."),
    S("hydronic-circulator-capacitor", "Zone Is Cold and the Pump Is Silent",
      "One zone in the house has been cold since last night. The other zones are fine and the pipes feel lukewarm.",
      "The thermostat is calling, the zone valve is open, and the circulator for that zone is quiet.",
      [
        ["Switch off and lock out power before opening the pump's terminal box", "Power is off and locked out. It is safe to look at the pump."],
        ["Check that the thermostat calls and the zone valve end switch has closed", "The call is present and the end switch is closed."],
        ["Check the system's fill pressure and look for air or leaks near the pump", "The pressure is normal. There are no leaks and no air noise."],
        ["Restore power and check for line voltage at the circulator terminals while the call is on", "Line voltage is present at the pump, but the pump does not turn."],
        ["With power off, spin the shaft by hand per the manufacturer", "The shaft turns freely. The pump's start capacitor tests weak."],
        ["Replace the boiler", "The boiler heats and the other zones work."],
        ["Jump the pump's wires straight to line voltage to make it run", "That skips the control and the pump's protection. Never do this."]
      ],
      [
        ["A weak start capacitor in the circulator", "Voltage reached a free-turning pump that would not start, and the capacitor tested weak."],
        ["No call is reaching the panel", "The call and the end switch were both confirmed."],
        ["The zone is full of air", "No air noise and normal pressure."],
        ["The pump shaft is seized", "The shaft turned freely."]
      ],
      ["c1", "c2", "c4"],
      "Work down the chain: call, relay, voltage, then the pump itself. Voltage at a free-turning pump that does not start points at the pump's start parts."),
    S("heat-pump-aux-setback", "Electric Bills Jumped With the Heat Pump",
      "Our electric bill nearly doubled this month and the heat seems to come from the strip heater a lot.",
      "The thermostat shows heat mode. The weather has been cool but not extremely cold.",
      [
        ["Switch off and lock out power before opening the air handler, and look for burn marks or smell", "No burn marks and no smell. The wiring looks sound."],
        ["Look at the thermostat mode and the setpoint history", "The mode is normal heat. The owner drops the setpoint 8 degrees at night."],
        ["Check the aux settings on the thermostat", "The aux heat is set to come on whenever the room is more than 1 degree below the setpoint."],
        ["Measure the outdoor unit's operation and the discharge air temperature in heat", "The outdoor unit runs normally and the discharge temperature is as the manufacturer shows."],
        ["Set a smaller setback and change the aux stage settings per the manufacturer, then watch the morning recovery", "The heat pump now recovers alone, with strip heat staying off."],
        ["Replace the outdoor unit", "The outdoor unit works as it should."],
        ["Disconnect the strip heat and its limit control", "Removing the limit is unsafe and leaves the home without backup heat. Never do this."]
      ],
      [
        ["A large night setback and aggressive aux settings were calling strip heat on during recovery", "The heat pump works fine. Smaller setbacks and better aux settings cut the strip heat."],
        ["The heat pump compressor has failed", "The outdoor unit runs normally and the air is warm."],
        ["The thermostat is in emergency heat", "The thermostat showed normal heat."],
        ["The outdoor temperature sensor is bad", "Nothing found points to a sensor problem."]
      ],
      ["c1", "c2", "c3"],
      "Strip heat is normal in deep cold and during recovery from a big setback. Smaller setbacks and correct aux settings let the heat pump do the work.")
  ]);

  window.SEQUENCES = window.SEQUENCES.concat([
    {
      id: "heat-pump-defrost-sequence",
      title: "A Typical Heat Pump Defrost Cycle",
      intro: "In heating, the outdoor coil can frost over. Models differ, so use the manufacturer's defrost sequence.",
      steps: [
        "Frost builds on the cold outdoor coil",
        "The control decides defrost is needed from its timer and sensor",
        "The reversing valve switches the system to cooling mode",
        "The outdoor fan stops while the coil warms and the frost melts",
        "Indoor heat strips may come on to keep the air from feeling cold",
        "The sensor shows the coil is clear and the unit returns to heating"
      ],
      why: "Knowing the normal order helps you tell normal defrost from a cycle that never ends or never starts."
    },
    {
      id: "circulator-no-run-check",
      title: "Finding Why a Zone Pump Will Not Run",
      intro: "Work from the call toward the pump, using safe meter habits.",
      steps: [
        "Lock out line voltage and look for water, burn marks, or smell",
        "Confirm the thermostat is calling for heat",
        "Confirm the zone valve opens and its end switch closes",
        "Restore power and check line voltage at the pump terminals",
        "With power off, check that the pump shaft turns freely",
        "Check the pump's capacitor and motor before replacing it"
      ],
      why: "Checking in order from the call to the pump keeps you from replacing a pump that only lacked a signal."
    }
  ]);

  window.PAIRS = window.PAIRS.concat([
    {
      id: "heat-pump-terms",
      title: "Heat Pump Terms",
      pairs: [
        ["Reversing valve", "Switches the flow so the system can heat or cool"],
        ["Defrost cycle", "Melts frost off the outdoor coil in heating"],
        ["Auxiliary heat", "Electric heat that helps when the heat pump alone cannot keep up"],
        ["Balance point", "The outdoor temperature where the heat pump output matches the home's need"],
        ["Emergency heat", "A mode that runs the backup heat and skips the heat pump"],
        ["Setback", "Letting the thermostat setpoint drop for a period"]
      ]
    },
    {
      id: "steam-boiler-parts",
      title: "Steam Boiler Parts and Their Jobs",
      pairs: [
        ["Gauge glass", "Shows the water level in the boiler"],
        ["Low-water cutoff", "Stops firing if the water gets too low"],
        ["Pigtail", "A looped pipe that protects the pressure gauge and control from live steam"],
        ["Pressuretrol", "Controls steam pressure by turning the burner on and off"],
        ["Radiator air vent", "Lets air out so steam can fill the radiator"],
        ["Condensate", "Water formed when steam gives up its heat"]
      ]
    }
  ]);
})();
