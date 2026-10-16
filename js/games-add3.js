/* More training game content. Loads AFTER games-data.js, games-add.js and games-add2.js. General method only. Manufacturer procedures and fault tables always govern. */
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
    S("walk-in-gasket-icing", "Walk-In Cooler Keeps Frosting Up",
      "The kitchen's walk-in cooler runs warm by the end of each week. The cook has to chip frost off the coil and says the defrost timer must be bad.",
      "A walk-in cooler is at 46 degrees F with a heavy frost layer on the evaporator coil. The condensing unit is running and the cooler door is propped for loading.",
      [
        ["Check that the inside door release works and lock out power before reaching near the fans", "The release moves freely and power is locked out. It is safe to look closely."],
        ["Inspect the door gasket and hinges", "The bottom corner of the gasket is torn, and there is a gap where the door does not seat."],
        ["Look at where the frost is heaviest on the coil", "The frost is thickest on the side of the coil nearest the door."],
        ["Review the defrost schedule and watch a defrost run", "Defrost starts on time, the heaters work, and it ends when the coil clears."],
        ["Check the evaporator fan and the condensing unit", "The fans turn freely and the condensing unit runs normally."],
        ["Look at the drain line and pan", "The drain is open and the drain heater is warm."],
        ["Add several extra defrost periods a day and leave the gasket alone", "Frost returns between cycles, and the room is still warm. The leak was not fixed."]
      ],
      [
        ["A torn door gasket is letting warm, humid air in and loading the coil with frost faster than defrost clears it", "Defrost, fans, and drain all work, and the heavy frost is nearest the leak. Fixing the seal removes the moisture source."],
        ["The defrost timer has failed", "You watched a normal defrost run and end properly."],
        ["The evaporator fan motor has failed", "The fans turn freely and move air."],
        ["The compressor is worn out", "The condensing unit runs normally and the evidence points to moisture and a leak."]
      ],
      ["c1", "c2", "c3", "c4"],
      "Frost that keeps coming back is often a moisture problem. Find where humid air gets in before changing the defrost settings, because extra defrost periods do not fix a leak.")
    ,
    S("economizer-stuck-open-hot", "Rooftop Unit Cannot Keep Up on a Hot Day",
      "The office floor is hot every afternoon and the rooftop unit's compressors run all day. The building engineer says the economizer is set to automatic.",
      "A rooftop unit with an economizer. Outdoor air is hot and humid. The compressors run but the supply air is only mildly cool.",
      [
        ["Lock out power before reaching into the damper section and keep hands clear of the blades", "Power is locked out and no one is near the dampers. It is safe to look."],
        ["Look at the outdoor air damper position from the access panel", "The outdoor air damper is wide open even though outdoor air is hotter than the return air."],
        ["Read the controller for the economizer mode and any fault", "It shows 'economizer off, minimum position' but the damper is not at minimum."],
        ["Restore power and, with a second person watching, command the damper closed", "The actuator moves but the damper stays open because the linkage is loose and slipping on the shaft."],
        ["Compare the outdoor air sensor with a trusted thermometer", "The outdoor air sensor agrees with the trusted reading, so the control is making the right decision."],
        ["Check the actuator and linkage with power locked out", "The set screw on the linkage has come loose and the blades are free."],
        ["Reset the compressor safety control and keep running with the damper open", "The compressors strain and trip again because they are cooling too much hot outdoor air."]
      ],
      [
        ["The damper linkage is slipping, so the damper is stuck open and bringing in too much hot outdoor air", "The control is correct and the sensor reads right. The actuator moves but the damper does not follow, which points to the linkage."],
        ["The outdoor air sensor is drifting", "You compared it with a trusted reading and it agreed."],
        ["The compressors are low on refrigerant", "The unit runs, and the extra heat load comes from the open damper."],
        ["The thermostat is set wrongly", "The controller was in the right mode and the damper simply did not follow."]
      ],
      ["c1", "c2", "c4", "c6"],
      "Command the damper and watch it move. A controller screen can say the damper is closed while a loose linkage leaves it open.")
    ,
    S("minisplit-outage-restart-delay", "Mini-Split Dead After the Storm",
      "A storm knocked the power out for an hour. Now the mini-split outdoor unit is silent, and the owner has already flipped the breaker three times.",
      "A ductless heat pump. The indoor unit's light is blinking, the breaker is on, and the disconnect looks clean and dry.",
      [
        ["Look at the outdoor disconnect and breaker for burn marks or water and make sure it is safe", "The disconnect is clean, dry, and tight. The breaker is on and has not been tripping."],
        ["Ask how long it has been since power came back and what the owner did", "The owner has switched the breaker off and on several times in the last few minutes."],
        ["Look at the indoor unit's lights and the remote display", "The light blinks and the display is on, so the indoor unit has control power."],
        ["Check the owner's manual for the restart delay and auto-restart behavior", "The manual says the compressor waits a few minutes after power returns, and restarting power can lengthen the wait."],
        ["Leave the power alone, wait several minutes, and reselect the mode on the remote", "After the wait the outdoor fan starts and the compressor runs normally."],
        ["Check the outdoor unit's board for a stored code", "No fault is recorded."],
        ["Install a larger breaker so it will not trip again", "The breaker never tripped. A larger breaker removes protection and fixes nothing."]
      ],
      [
        ["Normal compressor restart delay, lengthened by repeated power cycling", "The unit has control power, no fault, and starts after a wait. Repeated resets restart the delay."],
        ["The compressor has failed from the surge", "It started and ran normally after the wait."],
        ["The breaker is undersized", "The breaker is not tripping, and a larger one is never the fix."],
        ["The indoor board is burned out", "The indoor unit has power and a normal display."]
      ],
      ["c1", "c3", "c4", "c5"],
      "After an outage, give the unit time. Many have a protection delay, and flipping power again can make you wait longer. Never upsize a breaker.")
    ,
    S("smart-thermostat-spare-wire", "New Smart Thermostat Keeps Going Blank",
      "The owner installed a smart thermostat yesterday. It worked for an hour, then the screen went blank and it keeps restarting.",
      "A cooling and heating system with a new smart thermostat. The old thermostat worked for years. The wires are on R, W, Y, and G only.",
      [
        ["Switch the system off at the breaker before pulling the thermostat off its base", "Power is off and the wires are safe to handle."],
        ["Check whether the thermostat has a battery and whether it needs charging", "This model has no battery, so a battery is not the problem."],
        ["Look at the base: is any wire on the C terminal?", "There is no wire on C. The old thermostat did not need one."],
        ["Look inside the cable for an unused wire", "A blue wire is tucked behind the wall plate, unused."],
        ["At the equipment, look for the common terminal on the control board", "The blue wire is also tucked behind a wire tie and not connected to anything at the board."],
        ["Connect the blue wire to C at the thermostat and to the common terminal at the board, then restore power", "The thermostat powers up steadily and stays on through a full heating call."],
        ["Replace the control board before looking at the wires", "A new board cannot fix a missing common wire, and it is an expensive guess."]
      ],
      [
        ["The thermostat has no common wire and cannot get steady power, and a spare wire can be used for it", "The unused blue wire was added to C at both ends and the thermostat stayed on."],
        ["The thermostat's battery is dead", "This model has no battery."],
        ["The transformer has failed", "The transformer powered the old thermostat and the new thermostat after the wiring change."],
        ["The new thermostat is defective", "It works properly with a steady C wire."]
      ],
      ["c1", "c3", "c4", "c6"],
      "Smart thermostats often need a common wire. Look for a spare wire before buying parts, and connect it at both ends with power off.")
  ]);

  window.SEQUENCES = window.SEQUENCES.concat([
    {
      id: "walk-in-warm-check-order",
      title: "Checking a Walk-In Cooler That Is Running Warm",
      intro: "A sensible order, starting with the easy and safe checks. Follow the manufacturer's procedures.",
      steps: [
        "Confirm the inside door release works and lock out power before reaching near fans or heaters",
        "Look at doors, gaskets, hinges, and how product is stacked",
        "Look at the evaporator coil for ice and the airflow it has",
        "Check that the evaporator fans run and the condenser is clean",
        "Check that defrost starts, clears the coil, and ends",
        "Only then look at pressures, superheat, and sealed-system causes"
      ],
      why: "Doors, airflow, and defrost are common causes and cost the least to check. Sealed-system work comes last."
    },
    {
      id: "no-c-wire-power-order",
      title: "Getting a Smart Thermostat Powered Without a C Wire",
      intro: "Work from safety to the fix, and check the result at the end.",
      steps: [
        "Turn the system off at the breaker or system switch",
        "Pull the thermostat off its base and check the wire labels",
        "Look for a wire already on C and for an unused spare in the cable",
        "Connect a spare wire to C at the thermostat and the common terminal at the equipment",
        "If there is no spare, use the maker's adapter or kit, or have a new wire run",
        "Restore power and check that the thermostat powers up and stays on"
      ],
      why: "Power goes off before any wire is touched, and the last step confirms the fix."
    }
  ]);

  window.PAIRS = window.PAIRS.concat([
    {
      id: "walk-in-cooler-parts",
      title: "Walk-In Cooler Parts and Their Jobs",
      pairs: [
        ["Evaporator coil", "The cold coil inside the box that absorbs heat from the air"],
        ["Defrost heater", "Melts frost off the coil in an electric defrost system"],
        ["Termination sensor", "Ends defrost when the coil has warmed enough"],
        ["Fail-safe timer", "Ends defrost by time if the termination device fails"],
        ["Drain line heater", "Keeps defrost water from refreezing in the drain"],
        ["Door gasket", "Seals the door so warm humid air stays out"]
      ]
    },
    {
      id: "economizer-terms",
      title: "Rooftop Economizer Terms",
      pairs: [
        ["Economizer", "Uses outdoor air to help cool the building when conditions allow"],
        ["Minimum position", "Keeps the outdoor air damper from closing fully so ventilation continues"],
        ["Actuator", "The motor that moves the damper"],
        ["Linkage", "Connects the actuator to the damper blades"],
        ["Changeover setting", "The outdoor condition at which free cooling is allowed"],
        ["Blade and jamb seals", "Reduce air leakage when the damper is closed"]
      ]
    }
  ]);
})();
