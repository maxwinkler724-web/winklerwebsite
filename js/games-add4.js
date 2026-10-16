/* More training game content. Loads AFTER games-data.js and games-add.js through games-add3.js. General method only. Manufacturer procedures and fault tables always govern. */
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
    S("radiant-outdoor-sensor-in-sun", "Radiant Floors Run Cool on Cold Days",
      "The owner says the heated floors feel only slightly warm on cold mornings. They are fine in spring and fall.",
      "A boiler feeds a radiant floor through a mixing control with outdoor reset. All zones are cool, the circulators run, and it is 15 degrees F outside.",
      [
        ["Check for leaks near the controls, a gas smell, or CO alarms, and keep clear of hot piping", "No leaks, no gas smell, no alarms. It is safe to look."],
        ["Look at the mixed supply temperature display against the setting", "The mixed supply is following the control's call, but the call is low for this weather."],
        ["Look at where the outdoor sensor is mounted", "The sensor is on a south wall in direct sun and reads well above the air temperature."],
        ["Measure the sensor's resistance and compare it with the maker's chart", "The resistance matches a much warmer temperature than the thermometer shows."],
        ["Check the circulators and zone valves", "All circulators turn and the zone valves open fully."],
        ["Purge every loop looking for air", "Little air comes out, and the loops are noise-free."],
        ["Raise the floor surface temperature limit above the floor maker's rating to force more heat", "The floor gets too hot in places, and the real cause is still there."]
      ],
      [
        ["The outdoor reset sensor is in the sun and reads too warm, so the control makes supply water that is too cool", "The valve and pumps follow the control, and the sensor resistance matches a warmer temperature than the real air."],
        ["The circulators have failed", "They turn normally and water is moving."],
        ["The loops are full of trapped air", "Purging brought out little air and the loops are quiet."],
        ["The floor covering is the problem", "All zones are cool, not one room, and the sensor was clearly wrong."]
      ],
      ["c1", "c2", "c3", "c4"],
      "When every zone is cool and the equipment follows its control, check what the control believes. A sensor in the sun can make it think the weather is milder than it is.")
    ,
    S("steam-feeder-set-high-priming", "Steam Boiler Spits Water Into the Pipes",
      "The building manager says the radiators spit and the boiler's water level jumps around when it fires. Someone raised the water level last year to cover a hot water coil.",
      "A steam boiler with a domestic hot water coil. The gauge glass shows the level well above the maker's normal line, and the level bobs when firing.",
      [
        ["Check for steam leaks, a discharging relief valve, a gas smell, or CO alarms, and keep clear of hot piping", "No leaks and no alarms. It is safe to look at the gauge glass."],
        ["Compare the gauge glass level to the maker's normal water line", "The level sits well above the normal line."],
        ["Look at the water in the glass", "The water is mostly clear with a little surface foam when the burner runs."],
        ["Ask who changed the feeder or pump control and why", "It was raised to keep the domestic hot water coil covered."],
        ["Compare the near-boiler piping to the maker's drawing", "The piping matches the drawing."],
        ["Have the boiler water tested", "The reading is in a normal range."],
        ["Jump the low-water cutoff so the boiler keeps firing through the surging", "The surging does not stop, and a safety device was defeated."]
      ],
      [
        ["The water level was raised above the maker's setting, so water leaves with the steam", "The level is well above the normal line, the piping and water look fine, and the change was made to cover the coil."],
        ["The boiler water is badly contaminated", "The water tested normal and the glass was mostly clear."],
        ["The near-boiler piping is wrong", "It matches the maker's drawing."],
        ["The radiator vents are all failing", "A boiler-side level problem explains it at many radiators."]
      ],
      ["c1", "c2", "c4", "c5"],
      "Wet steam often starts at the boiler. Check the water level against the maker's line before chasing the radiators, and never bypass a low-water cutoff.")
    ,
    S("rtu-glazed-belt-slipping", "Rooftop Unit Has Weak Airflow in the Shop",
      "The shop area is stuffy and the registers blow weakly. The rooftop unit's fan sounds normal and the filters were changed last month.",
      "A belt-driven rooftop unit. The motor runs but airflow at the registers is low.",
      [
        ["Lock out power and wait for the fan to stop before opening the blower access", "Power is locked out and the fan has stopped. The belt guard comes off safely."],
        ["Inspect the belt", "The belt is shiny and glazed, with some cracking, and it moves when pushed by hand."],
        ["Check the filters", "The new filters are clean and seated."],
        ["Compare blower speed with motor speed once safely running again", "The blower turns noticeably slower than the sheave ratio predicts."],
        ["Check the sheave grooves and alignment", "The grooves look worn at the edges and the sheaves are a little out of line."],
        ["Measure total external static pressure", "Static pressure is lower than the fan data expects, which fits a slipping drive."],
        ["Close down the supply damper to make the unit blow harder at the registers", "Nothing improves, and the fan is still not moving the rated air."]
      ],
      [
        ["A worn, glazed, slipping belt on worn sheaves is letting the fan turn slower than the motor", "The belt is glazed and loose, the blower runs slower than expected, and the sheaves are worn."],
        ["The filters are clogged", "They are new and clean."],
        ["The refrigerant charge is low", "The symptom is airflow, and the drive is clearly slipping."],
        ["The thermostat is bad", "The fan runs and the fault is in the drive."]
      ],
      ["c1", "c2", "c4", "c5"],
      "Check the drive before blaming refrigerant or controls. A slipping belt lets the fan run slow while the motor sounds normal. Look at the sheaves too, since worn ones ruin new belts.")
    ,
    S("rtu-gas-pressure-switch-blocked-vent", "Rooftop Unit Has No Gas Heat",
      "The warehouse is cold and the rooftop unit's heat does not come on. The thermostat is calling for heat.",
      "A gas-heat rooftop unit. On a call for heat, the inducer runs but the burners never light, and the board shows a pressure switch fault.",
      [
        ["Check for gas smell, CO alarm, and soot, and lock out power before opening panels", "No gas smell, no alarm, no soot. Power is locked out for the check."],
        ["Confirm the thermostat is calling and read the board's fault code", "It is calling for heat, and the code points to the pressure switch not closing."],
        ["Watch the sequence from the start", "The inducer starts, the switch does not close, and the igniter never comes on."],
        ["Check supply voltage and inducer running amps against the data tag", "Voltage is correct and the inducer draws normal amps."],
        ["Inspect the pressure tubing and port", "The tubing is whole and clear."],
        ["Look at the flue outlet on the roof", "A bird nest is packed into the flue outlet."],
        ["Put a jumper across the pressure switch to get the burners going", "The burners light with a blocked flue, and flue gas can spill. This is unsafe."]
      ],
      [
        ["A blocked flue outlet is keeping the draft too weak for the pressure switch to close", "The inducer and voltage are normal, the tubing is clear, and the outlet is full of nest."],
        ["The gas valve has failed", "The sequence never gets to ignition because the switch is open."],
        ["The inducer motor has failed", "It runs and draws normal amps."],
        ["The flame sensor is dirty", "Flame is never attempted, so the sensor is not yet in play."]
      ],
      ["c1", "c2", "c3", "c4", "c6"],
      "A pressure switch that will not close usually points to something in the vent or the tubing, not the switch. Clear the cause, and never jump a safety.")
  ]);

  window.SEQUENCES = window.SEQUENCES.concat([
    {
      id: "radiant-zone-purge-order",
      title: "Purging Air from a Radiant Floor Zone",
      intro: "A sensible order for flushing one zone at a time. Follow the manufacturer's fill and purge procedure.",
      steps: [
        "Close the shutoff valve between the fill and drain valves",
        "Close the other zones' valves so the flow goes through one zone",
        "Run a hose from the drain valve to a drain or bucket so bubbles are visible",
        "Open the fill and let water run through the zone until it looks clear",
        "Keep it running for a while longer and listen for air",
        "Move on to the next zone and repeat",
        "Close the drain, let the system come up to its cold pressure, then reopen the shutoff valve"
      ],
      why: "Flushing zones one at a time keeps enough flow in each to push air out, and listening confirms the air is gone."
    },
    {
      id: "gas-heat-pressure-switch-order",
      title: "Checking a Pressure Switch That Will Not Close",
      intro: "Look for the cause before touching the switch. Follow the manufacturer's procedures.",
      steps: [
        "Make sure there is no gas smell or CO alarm and read the board's fault code",
        "Check incoming voltage against the data tag",
        "Check the inducer's running amps against its rating",
        "Inspect and clear the pressure tubing",
        "Measure the draft with a manometer and compare it to the switch's closing pressure",
        "On a condensing furnace, check the condensate trap and drain",
        "Only then suspect the switch, board, or wiring"
      ],
      why: "The switch rarely fails on its own, so the cheap checks come first. A switch is never jumped to keep running."
    }
  ]);

  window.PAIRS = window.PAIRS.concat([
    {
      id: "wet-steam-terms",
      title: "Wet Steam Terms",
      pairs: [
        ["Priming", "Liquid water leaving the boiler with the steam and entering the piping"],
        ["Foaming", "A froth on the water surface that makes it hard for steam to separate cleanly"],
        ["Wet steam", "Steam carrying water droplets, so it delivers less heat"],
        ["High water level", "Water sitting close to the steam exit, so it can be carried out"],
        ["Contaminated water", "Oil, grease, and debris that can cause foaming"],
        ["Near-boiler piping", "The maker's header layout that helps dry the steam"]
      ]
    },
    {
      id: "belt-drive-terms",
      title: "Belt Drive Terms on an RTU",
      pairs: [
        ["Drive sheave", "The pulley on the motor shaft"],
        ["Blower pulley", "The pulley on the fan shaft that the belt turns"],
        ["Motor mount adjusters", "Used to set belt tension"],
        ["Belt glazing", "A shiny, hardened belt surface that signals slipping"],
        ["Misalignment", "Sheaves out of line, causing uneven belt wear"],
        ["Adjustable sheave setting", "Changing how far the halves open changes airflow, so it is set by measuring"]
      ]
    }
  ]);
})();
