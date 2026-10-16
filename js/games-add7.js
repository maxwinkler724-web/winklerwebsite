/* More training game content (steam boiler simulator faults, commercial refrigeration, mini-split and ventilation faults, and NJ license decisions). Loads AFTER games-data.js and games-add.js through games-add6.js. General method only. Manufacturer procedures and fault tables always govern. Licensing items are summary-level and local rules and the licensing agency always govern. */
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
    S("steam-pressuretrol-cranked-up-relief-drips", "Steam Boiler Gauge Is Way Up and the Relief Valve Drips",
      "The owner says the house is hot, the radiator vents spit water, and the relief valve is dripping. The gauge needle looks very high.",
      "A one-pipe residential steam boiler with a pressure limit control, a sight glass, and a relief valve piped to the floor. The boiler keeps firing.",
      [
        ["Keep clear of the relief discharge, and shut the boiler off at its switch before touching controls", "A slow drip only, no heavy steam. The boiler is off and the gauge starts to fall."],
        ["Read the gauge and the sight glass", "Pressure was far above the usual low-pressure range. Water level is at the normal mark."],
        ["Look at the label on the control and the system type", "A one-pipe steam system. The maker's guidance is for a low cut-in and small differential."],
        ["With power locked out and verified off, read the pressuretrol cut-in and differential", "Both are set far above the maker's guidance. Someone turned them up."],
        ["Test that the burner shuts off as the manual describes by moving the setting below pressure", "The burner shuts off properly. The control works but was set too high."],
        ["Check the main vents and radiator vents for blockage", "Vents work and open to pass air."],
        ["Screw a cap on the relief valve discharge to stop the drip", "A capped relief valve can let the boiler overpressure. This is unsafe."]
      ],
      [
        ["The pressure limit was set far too high, so the boiler builds excess pressure and lifts the relief valve", "The control works but its settings are far above the maker's guidance."],
        ["The relief valve is defective", "It is only lifting because pressure is high."],
        ["The water level is too low", "The sight glass shows the normal level."],
        ["The radiator vents are all clogged", "The vents open to pass air."]
      ],
      ["c1", "c2", "c3", "c4", "c5", "c6"],
      "High pressure on a low-pressure steam system usually means the limit was raised. Reset it to the maker's range, test it, and fix cold radiators at the vents and pitch. Never cap the relief valve.")
    ,
    S("steam-lwco-feeder-stuck-no-heat", "Steam Boiler Is Locked Out and the Sight Glass Is Nearly Empty",
      "The owner says there is no heat, a red light is on at the boiler, and the water feeder has been unreliable.",
      "A one-pipe steam boiler with a low-water cutoff and an auto water feeder. The burner is off and a lockout light is on.",
      [
        ["Make sure the boiler stays off, and keep clear of hot surfaces and the gauge glass", "The boiler is off. Surfaces are hot. The sight glass is nearly empty."],
        ["Read the sight glass and the pressure gauge", "Water is almost out of the bottom of the glass. Pressure is zero."],
        ["Look at the low-water cutoff indicator", "The cutoff has shut the burner off, which is its job."],
        ["Look at the feeder float and valve with the boiler cold", "The float is stuck and the valve never opens."],
        ["Check that the feeder supply valve is open and the line has water", "Supply is open and the line has pressure."],
        ["After repairing the feeder, add water slowly with the boiler cold and watch the level reach the normal line", "The level rises to the middle of the glass and the cutoff clears after its delay."],
        ["Pour cold water in quickly while the boiler is still hot", "Thermal shock can crack boiler sections. This is unsafe."]
      ],
      [
        ["A stuck auto feeder let the water drop and the low-water cutoff correctly shut the boiler down", "Glass nearly empty, cutoff tripped, and feeder float stuck."],
        ["The thermostat has failed", "The boiler lock out is from low water."],
        ["The pressure limit control is bad", "Pressure is zero and the burner is off for another reason."],
        ["The relief valve has failed", "No discharge was found."]
      ],
      ["c1", "c2", "c3", "c4", "c5", "c6"],
      "A low-water lockout is the safety working. Fix why the water was lost, refill with a cooled boiler, and test the cutoff as the maker describes. Never jumper the cutoff.")
    ,
    S("steam-oily-water-surging-after-cleaning", "Steam Boiler Level Bounces and Radiators Spit After a Cleaning",
      "The owner says the water in the glass jumps up and down and the radiators spit wet steam. It began after a cleaner was used in the boiler.",
      "A one-pipe steam boiler with a sight glass. Pressure is in the normal low range and the burner cycles normally.",
      [
        ["Keep clear of the gauge glass and hot piping while the boiler steams", "Gauge glass is hot. Steam and hot water are present."],
        ["Read the pressure gauge", "Pressure is normal and low."],
        ["Look at the water in the sight glass", "The water looks oily and brown, and the level bounces."],
        ["Check the water level against the maker's normal line", "The level is at the normal line when the boiler is cold."],
        ["Check the pressure control setting", "Settings are within the maker's range."],
        ["Ask what was put in the boiler, and check against the maker's water-quality guidance", "A cleaner and stop-leak product were added. The maker does not allow foaming agents or petroleum-based stop-leak."],
        ["Turn the pressure up to push the water through", "More pressure makes it worse and can lift the relief valve. This is unsafe."]
      ],
      [
        ["Oil and contaminants on the water made the boiler carry water into the steam piping", "Oily water, bouncing level, and normal pressure and setting."],
        ["The pressure limit is set too high", "Pressure and settings are normal."],
        ["The feeder is overfilling", "The level is at the normal line when cold."],
        ["The radiators are pitched wrong", "Spitting is at every vent, not one radiator."]
      ],
      ["c1", "c2", "c3", "c4", "c5", "c6"],
      "Wet steam with normal pressure points to dirty water. Let the boiler cool, skim and flush as the maker describes, and avoid additives the maker forbids.")
    ,
    S("steam-radiator-vent-clogged-cold-end", "One Steam Radiator Stays Cold From the Middle On",
      "The owner says the back bedroom radiator heats only near the pipe. All the others are fine.",
      "A one-pipe steam system. Boiler pressure is normal and the other radiators heat well.",
      [
        ["Keep your hands off the hot radiator and the valve while the boiler runs", "The near end is hot. Use a glove or an infrared reading."],
        ["Check that the radiator supply valve is fully open", "The valve is fully open."],
        ["Feel the radiator from the inlet to the far end", "Hot near the inlet, cold from the middle to the far end."],
        ["Listen and feel at the air vent", "Nothing passes through the vent."],
        ["Look at the pitch of the radiator", "It slopes slightly toward the supply valve, which is right."],
        ["With the system cool, inspect the vent", "The vent is clogged with paint and rust."],
        ["Open the main steam vent line to atmosphere to see if it fixes it", "That is not the fix and steam can burn. This is unsafe."]
      ],
      [
        ["The air vent on that radiator is clogged, so air cannot leave and steam cannot fill it", "The inlet is hot, the far end is cold, and nothing passes through the vent."],
        ["The boiler pressure control is wrong", "Other radiators heat well."],
        ["The radiator is pitched backwards", "The pitch is toward the supply valve."],
        ["The boiler is undersized", "Other radiators fill normally."]
      ],
      ["c1", "c2", "c3", "c4", "c5", "c6"],
      "In one-pipe steam, steam enters only as fast as air leaves. A cold end often means a bad vent. Replace it with the right type and recheck.")
    ,
    S("reach-in-dirty-condenser-warm-cabinet", "Restaurant Reach-In Cooler Runs All Day and Is Warm",
      "The kitchen manager says the reach-in beside the fryer runs constantly and the food is warm. It was fine last month.",
      "A self-contained reach-in refrigerator with a condenser behind a front grille and an evaporator fan inside. Nothing has been opened yet.",
      [
        ["Unplug the cabinet and check the label for the refrigerant type and any fire warning", "Unplugged. The label shows a non-flammable refrigerant."],
        ["Check the temperature setting and that the door closes", "Setting is normal. Door closes and the gasket seals."],
        ["Look at the area around the cabinet", "The cabinet is tight against the fryer line and warm."],
        ["Look at the condenser coil", "The coil is caked with grease and lint."],
        ["After cleaning, plug it in and check the fans", "Both condenser and evaporator fans run."],
        ["Watch the cabinet temperature fall over time", "The cabinet pulls down to normal over the next hour."],
        ["Add refrigerant to see if it gets colder", "Adding refrigerant without finding a fault is wrong, and refrigerant work needs EPA 608 certification."]
      ],
      [
        ["A greasy, blocked condenser could not reject heat, so the cabinet ran long and warm", "Coil caked, tight spot, and normal after cleaning."],
        ["The refrigerant charge is low", "It cooled normally after the coil was cleaned."],
        ["The evaporator fan motor is dead", "Both fans run."],
        ["The door gasket has failed", "The gasket seals."]
      ],
      ["c1", "c2", "c3", "c4", "c5", "c6"],
      "Clean the condenser first, with the unit unplugged. Dirty condensers cause many warm-cabinet calls. Do not charge a system until a real fault is found.")
    ,
    S("ice-machine-scale-float-switch-low-output", "Ice Machine Makes Little Ice and Stalls in Fill",
      "The bar manager says the ice machine makes much less than it used to and sometimes stops with water in the tank.",
      "An air-cooled modular ice machine with a float switch, a water inlet valve, and a clean cycle. Water is hard in this area.",
      [
        ["Set the control to OFF and turn off and lock out the power supply before reaching in", "Power is off and locked out. A control switch alone may not de-energize all loads."],
        ["Check that the control is on ICE, the water valve is open, and the bin is not full", "Controls and valve are right. The bin has room."],
        ["Look at the air filter and the condenser", "Both are clean and the room is normal."],
        ["Check the water supply pressure and the inlet screen", "Pressure is fine and the screen is clear."],
        ["Watch the float switch and read the open or closed state with the tank empty and full", "It sticks in the middle. White scale is on it."],
        ["Look at the evaporator and spray parts", "Scale is on the evaporator and the spray tubes are dirty."],
        ["Open the refrigeration circuit and add refrigerant", "Nothing points to the sealed system. Opening it without cause is wrong and needs EPA 608 certification."]
      ],
      [
        ["Scale on the float switch and evaporator is reducing output and stalling the fill", "Float sticks with scale, spray parts are dirty, and air and water supply are fine."],
        ["The condenser is dirty", "The condenser is clean."],
        ["The water supply valve is closed", "The valve is open and pressure is fine."],
        ["The compressor has failed", "The machine does make some ice."]
      ],
      ["c1", "c2", "c3", "c4", "c5", "c6"],
      "Clean scale with the maker's approved cleaner and cycle, rinse well, and set a cleaning schedule that fits local water. Consider water treatment.")
    ,
    S("walk-in-drain-heater-frozen-ice-back", "Walk-In Cooler Coil Keeps Icing Over Even Though Defrost Runs",
      "The cook says the walk-in warms up every few days, and there is ice on the coil and the floor under it.",
      "A walk-in with an electric-defrost evaporator, a drain line to the outside, and a drain pan heater. The compressor runs normally.",
      [
        ["Lock out the power before reaching near the fans and heaters, and stay off wet floors", "Power is locked out and verified. The floor is wet and icy."],
        ["Check that the door shuts and the gasket seals", "The door and gasket are good."],
        ["Check that stock is not blocking the coil and the fans run", "Stock is clear and the fans run."],
        ["Look at the defrost schedule and see that defrost starts", "Defrost is called on schedule and the heaters come on."],
        ["Check the drain pan and drain line during and after defrost", "Melted water stands in the pan and the drain line is frozen."],
        ["Check the drain pan heater and line heater circuit with power locked out", "The drain heater element is open."],
        ["Chip the ice off the coil with a screwdriver", "Ice tools can puncture the coil and release refrigerant. This is unsafe."]
      ],
      [
        ["A failed drain heater froze the drain, so melt water spilled back and refroze on the coil", "Defrost runs, the drain is frozen, and the drain heater is open."],
        ["The door gasket is torn", "The gasket is good."],
        ["The evaporator fan is failed", "The fans run."],
        ["The compressor is failing", "It runs normally."]
      ],
      ["c1", "c2", "c3", "c4", "c5", "c6"],
      "If defrost runs and ice remains, follow the water: the drain and its heater. Thaw safely and replace the drain heater with the exact part.")
    ,
    S("minisplit-clogged-drain-wall-drip", "Mini-Split Drips Down the Wall in Cooling",
      "The owner says water runs down the wall below the indoor unit on hot days and the carpet is damp.",
      "A ductless mini-split indoor unit mounted high on a wall with a drain hose out the back. The system cools and the filter is clean.",
      [
        ["Turn the unit off, shut off power at the disconnect, and keep water away from electrical parts", "Power is off. Water is near the unit but not in the electrical box."],
        ["Check that the leak happens in cooling and not in heating", "The leak happens in cooling only."],
        ["Look at the filters and coil", "Filters are clean and the coil is not frozen."],
        ["Check that the indoor unit is level and mounted as the maker requires", "The unit is level."],
        ["Look at the drain hose for kinks and slope", "The hose has a sag that holds water."],
        ["Remove the drain hose and look for a blockage", "The hose is clogged with slime and debris."],
        ["Pour the water into the unit's electronics to check the pump", "Water on electronics is a hazard. This is wrong."]
      ],
      [
        ["The drain hose is clogged and sagging, so the pan backs up and spills", "Cooling-only leak, clean filter, level unit, and a blocked hose."],
        ["The refrigerant charge is low", "The coil is not frozen."],
        ["The unit is not level", "The unit is level."],
        ["The filter is clogged", "The filter is clean."]
      ],
      ["c1", "c2", "c3", "c4", "c5", "c6"],
      "A leak only in cooling with a good coil points at the drain. Clear and re-slope the hose. If the coil is frozen, check airflow and charge first, using a certified technician.")
    ,
    S("hrv-blocked-hood-frost-weak-airflow", "Ventilator Moves Little Air and Frosts Up in Winter",
      "The owner says the heat recovery ventilator hums but the house is stuffy, and the control light looks normal. It started in the first cold snap.",
      "A heat recovery ventilator with filters, a core, and outdoor hoods with bird screens. The unit has a defrost cycle.",
      [
        ["Disconnect all power sources before opening the unit, and confirm it is off", "Power is off. The unit has two power sources and both are off."],
        ["Check the control setting and fan speed", "The control is on and the speed is normal."],
        ["Look at the outdoor hoods from the ground", "Both hood screens are covered with frost and lint."],
        ["Look at the filters", "Filters are lightly dirty."],
        ["Look at the core for frost or ice", "Heavy frost on the core, more than the small amount seen before defrost."],
        ["Check that airflows are balanced and the ducts are not crushed", "Airflow is unbalanced because one hood is blocked. Ducts are fine."],
        ["Chip the ice off the core with a tool", "The core can be damaged. This is wrong."]
      ],
      [
        ["Blocked hoods choked and unbalanced the airflow, so the core frosts and the defrost cannot keep up", "Hoods covered, airflow unbalanced, and heavy frost."],
        ["The control board has failed", "The control is on and the speed is normal."],
        ["The house is too airtight", "The hood blockage explains the weak airflow."],
        ["The duct is crushed", "Ducts are fine."]
      ],
      ["c1", "c2", "c3", "c4", "c5", "c6"],
      "Weak airflow and frost often start at the outdoor hoods. Clear them, clean filters by the maker's method, let the core melt, and have the airflow balanced.")
  ]);

  window.SEQUENCES = window.SEQUENCES.concat([
    {
      id: "steam-low-water-lockout-response-order",
      title: "Responding to a Steam Boiler Low-Water Lockout",
      intro: "A sensible order for a low-pressure steam boiler. Follow the boiler maker's manual and local rules.",
      steps: [
        "Keep the burner off and stay clear of hot surfaces",
        "Read the sight glass and the pressure gauge",
        "Confirm the low-water cutoff is tripped and leave it alone",
        "Let the boiler cool before adding any water",
        "Find why the water was lost: the feeder, a leak, or a closed supply",
        "Fix the cause, then refill slowly to the normal line",
        "Test the low-water cutoff as the maker describes and record it"
      ],
      why: "A lockout is the safety doing its job. Add water only to a cooled boiler, fix the loss, and test the cutoff. Never jumper it."
    },
    {
      id: "ice-machine-no-ice-check-order",
      title: "Checking an Ice Machine That Makes No Ice",
      intro: "A sensible order for a commercial ice machine. Follow the maker's service manual.",
      steps: [
        "Turn off and lock out the power supply",
        "Check the control and mode switches, bin sensor, and water valve",
        "Check the water supply, inlet screen, and float switch",
        "Check the air filter, condenser, and room temperature",
        "Look for scale and run the maker's clean cycle",
        "Check codes, sensors, and the pump",
        "Refer sealed-system work to a certified technician"
      ],
      why: "Most no-ice calls are water, air, or cleaning problems, so those are checked before sealed-system work."
    }
  ]);

  window.PAIRS = window.PAIRS.concat([
    {
      id: "nj-which-license-do-i-need",
      title: "NJ: Which License Fits the Job?",
      pairs: [
        ["Running a low-pressure steam heating plant above the size limits while the building is occupied", "Boiler operator license (black seal) from the state boiler bureau"],
        ["Working as a master HVACR contractor or using that title", "State HVACR master contractor license"],
        ["Replacing a switch or box on the line side of the electrical disconnect", "A licensed electrician"],
        ["Connecting or disconnecting potable water", "A licensed plumber, not HVACR work alone"],
        ["Running a company that does HVACR work", "Register the company and employ a bona fide representative (BFR) who holds the HVACR license"],
        ["Inspecting a boiler or large refrigeration plant", "State bureau or authorized inspector, not the operator"]
      ]
    },
    {
      id: "steam-simulator-fault-clues",
      title: "Steam Boiler Fault Clues",
      pairs: [
        ["Gauge reads far above normal and the relief valve drips", "Pressure limit set too high"],
        ["Sight glass nearly empty and burner locked out", "Low-water cutoff tripped, often from a failed feeder"],
        ["One radiator cold from the middle outward", "Clogged radiator air vent"],
        ["Bang when heat starts and a valve leaks", "Radiator pitched away from the supply valve"],
        ["Bouncing level and spitting vents at normal pressure", "Oily or dirty water making wet steam"],
        ["Cold water poured into a hot boiler", "Thermal shock risk that can crack sections"]
      ]
    }
  ]);
})();
