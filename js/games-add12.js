/* More training game content (plant water: a slimy cooling tower basin after a long idle, a chiller using more power with a rising condenser approach, and a steam boiler with cloudy water and a foaming sight glass). Loads AFTER games-data.js and games-add.js through games-add11.js. General method only. All numbers are examples. No chemical doses are given. Water-treatment programs, limits and the manufacturer's procedures always govern. */
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
    S("plant-tower-slimy-basin-after-idle", "Slimy Tower Basin After a Long Idle",
      "A facility manager says the cooling tower has sat idle for months, the basin smells musty and the water looks slimy. The chiller needs to start tomorrow.",
      "A cooling tower with a basin, a standby pump and a chemical feed system. The manager cannot find a cleaning log. The water feels warm. Any numbers here are examples, and no chemical doses are given.",
      [
        ["Before anyone reaches in, lock out and tag the tower fans and pumps, and confirm the respirator and chemical protective gear your site program requires are on", "The fans and pumps are locked and tagged, and the crew is in the gear the program requires."],
        ["Look at the basin and fill from a safe spot", "There is a slimy film on the walls, some sludge on the floor and a musty smell. The fill looks stained."],
        ["Check the chemical feed tank, pump and controller", "The tank is empty, the pump is off and the controller shows an alarm. The treatment has been off since the shutdown."],
        ["Look for dead legs, a standby pump line and a bypass line, and ask when they were last flushed", "The standby pump line and a bypass branch have held still water the whole time. Nobody has flushed them."],
        ["Ask for the water-management program and the inspection, cleaning and test log", "There is no written program, and the last log entry is from before the shutdown."],
        ["Look at the drift eliminators and where the tower sits relative to an air intake", "The eliminators are in place, but the tower is fairly close to a fresh-air intake. Raise it with the owner."],
        ["Start the pumps and fans tonight, spray the basin down with a hose to wash the slime away and carry on", "Starting a dirty, untreated tower and spraying the basin can make breathable mist. This is unsafe. A water-treatment professional and a program come first."]
      ],
      [
        ["The tower is untreated and dirty after the idle period, so slime and Legionella risk are real, and it needs a cleaning and treatment plan from a water-treatment professional", "The feed was off, the basin was slimy, the lines held stagnant water and there was no program or log."],
        ["The odor is only a cosmetic problem", "Warm, slimy, untreated water is the kind where bacteria can grow, so it is not just cosmetic."],
        ["The chiller needs a bigger tower", "Nothing in the findings points to capacity. The tower is dirty and untreated."],
        ["The drift eliminators are the only cause", "The eliminators were in place. The slime came from standing, untreated water."]
      ],
      BP,
      "A warm, slimy tower that sat idle is a health risk. Lock out, protect yourselves, find the dead legs and the missing program, and bring in a water-treatment professional before restart. Public agencies describe the growth range and the cleaning frequency slightly differently, so follow the program you have. No doses are given here.")
    ,
    S("plant-chiller-power-up-approach-high", "Chiller Draws More Power at the Same Load",
      "The building engineer says the chiller is using more power than it did last summer for the same cooling load, and the tower fans are running flat out.",
      "A water-cooled chiller with a cooling tower and a condenser-water loop. The commissioning log is on file. The weather and the load are about the same as in the baseline entry. All numbers are examples.",
      [
        ["Before any water-box, strainer or tube work, lock out the chiller and the condenser-water pump, and take readings from safe positions only", "The lockout plan is set, and readings are taken from the control panel and the gauges while the machine runs."],
        ["Pull the commissioning log and record today's readings at about the same load", "The log has entering and leaving water temperatures, refrigerant pressures and saturation temperatures, and amps. Today's load is close to the baseline's load."],
        ["Compare entering condenser-water temperature with the baseline", "The entering condenser water is warmer than in the baseline at the same load, and the tower fans are at full speed."],
        ["Inspect the tower fan, drive, fill, nozzles and basin level", "Fill is lightly scaled and the basin has some sludge. Fans and belts are fine, and the air path is clear."],
        ["Compare condenser-water flow and the pressure drop across the condenser with the baseline", "Flow is close to the baseline. The pressure drop across the condenser is higher than the log's value."],
        ["Look at the water-treatment records and ask when the condenser tubes were last cleaned", "Several months of testing and blowdown entries are missing, and the tubes have not been inspected for two seasons."],
        ["Reset the high-head cutout higher so the machine stops tripping and spending the power", "Raising a safety setting to hide the problem is unsafe and does not fix it. Never defeat a safety control."]
      ],
      [
        ["Fouled condenser tubes and weak water treatment are raising the approach and the head pressure, so the machine uses more power at the same load", "The inlet water was warmer, the pressure drop was higher than the log and the treatment record had gaps."],
        ["The compressor motor is failing", "The extra power tracks the higher head. Nothing pointed to a motor fault."],
        ["The chilled-water pump is the problem", "Nothing in the readings put the cause on the chilled-water side."],
        ["The tower fans are too small", "The fans were running at full speed because the water was warm. The fill and tubes were dirty."]
      ],
      BP,
      "Compare the machine with its own baseline at the same load. A rising condenser approach and higher power point at fouled tubes, tower fill or treatment. No alarm number is given here, because limits come from the maker and the commissioning log.")
    ,
    S("plant-boiler-cloudy-glass-foams", "Cloudy Boiler Water and a Foaming Glass",
      "The plant operator says the steam boiler's water looks cloudy and the sight glass has been foaming all week. A trap down the line is also spitting water.",
      "A small steam boiler with a surface blowdown valve, a conductivity controller, a softener on the makeup and a plant water-treatment specification. All numbers are examples.",
      [
        ["Stay clear of the hot gauge glass and its drain, confirm the level is visible and holding, and do not feed any cold water into the boiler", "Water is visible in the glass and holds roughly steady with foam on top. No water is being added by hand."],
        ["Look at the water and the glass from a safe spot", "The water is cloudy, and the glass foams when steam demand rises."],
        ["Read the plant's specification for the conductivity limit and blowdown method", "The spec names a conductivity limit and a blowdown controller setting. Use the plant's own numbers."],
        ["Take a cooled sample by the plant's safe method and read the conductivity", "The reading is above the plant's control limit."],
        ["Check the blowdown valve and controller", "The surface blowdown valve is stuck partly closed, and the controller is set to run."],
        ["Check the softener, makeup supply and condensate return, and look downstream", "The softener is working. A few traps downstream are wet and a line is knocking, which is consistent with carryover."],
        ["Pour cold water straight into the boiler to dilute the cloudy water quickly", "Cold water into a boiler that may be hot or low can crack metal and is unsafe. Follow the plant's spec and the maker's procedure."]
      ],
      [
        ["The surface blowdown valve is partly stuck, so solids build up above the plant's limit, the water foams and carryover begins", "Conductivity was above the limit, the valve was stuck and wet traps downstream point to carryover."],
        ["The sight glass is faulty", "The glass was showing real foam from the water, not a glass fault."],
        ["The softener is exhausted", "The softener was working."],
        ["The boiler is out of water", "Water was visible and steady in the glass."]
      ],
      BP,
      "High solids cause foaming and carryover and waste fuel. Compare the conductivity with the plant's limit, restore blowdown and retest, and never feed cold water to a boiler that may be low. The limits come from the plant's own specification.")
  ]);
})();
