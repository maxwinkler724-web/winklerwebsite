/* More training game content (hot-water boiler faults, heat pump faults, rooftop economizer linkage, and controls basics). Loads AFTER games-data.js and games-add.js through games-add5.js. General method only. Manufacturer procedures and fault tables always govern. */
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
    S("boiler-seized-circulator-hum", "Boiler Fires but One Zone Stays Cold and the Pump Hums",
      "The owner says the boiler runs and the pipes near it get hot, but the radiators in the zone stay cold. There is a low hum by the pump.",
      "A gas hot-water boiler with a wet-rotor circulator. The zone calls, the boiler fires, and the circulator hums without turning.",
      [
        ["Check for gas smell, leaks, and hot surfaces, and lock out power before touching the pump", "No gas smell, no leaks. The pump body is warm. Power is locked out."],
        ["Look at the thermostat, zone valve, and boiler for an error", "The zone is calling. The boiler is firing and the supply pipe near the boiler is hot."],
        ["Feel the pipes on each side of the pump", "Pipe on the boiler side is hot. Pipe past the pump is cool."],
        ["Measure voltage at the pump terminals during a call", "The rated voltage is present at the terminals."],
        ["Measure current draw at the pump", "Current is higher than the nameplate figure, which fits a pump trying to turn and not moving."],
        ["With power locked out and the pump isolated as the maker allows, turn the shaft with the maker's method", "The rotor will not turn. There is grit and scale on the shaft."],
        ["Keep the boiler firing hard against a pump that is not moving water", "The boiler can overheat and trip its limit, and scald hazards rise. This is unsafe."]
      ],
      [
        ["The circulator rotor is seized by debris or scale, so it hums and moves no water", "Voltage is present, current is high, and the rotor will not turn."],
        ["The zone thermostat has failed", "The call is present and the boiler fires."],
        ["The boiler gas valve has failed", "The boiler fires and the supply pipe is hot."],
        ["The expansion tank is waterlogged", "That would show as pressure swings, not a humming pump."]
      ],
      ["c1", "c2", "c3", "c4", "c5", "c6"],
      "A pump that hums with correct voltage and high amps is trying to turn. Isolate and check the shaft by the maker's method, replace the pump or cartridge, then ask why the debris got there. Never run the boiler hard without flow.")
    ,
    S("boiler-air-trapped-zone-gurgle", "Top Floor Radiators Are Cold and the Pipes Gurgle",
      "The owner says the upstairs radiators have been cold for days and there is a gurgling sound in the walls.",
      "A closed hot-water system with a diaphragm expansion tank, an air separator, and a fill valve. The boiler runs normally and the pump is turning.",
      [
        ["Check for leaks, wet floors, and hot surfaces before working near the piping", "No leaks and no pooling. Pipes near the boiler are hot to the touch, so care is needed."],
        ["Read the pressure gauge with the system cool", "Pressure is a little below the cold fill value the label shows."],
        ["Listen at the circulator and the upstairs zone", "Swishing at the pump and a gurgle in the upstairs loop."],
        ["Feel the radiators from bottom to top in the upstairs zone", "Bottom is warm, top and the last radiators are cold."],
        ["Check the expansion tank air side with the tank isolated and drained as the maker allows", "Only air comes out and the pressure is near the cold fill value. The tank is fine."],
        ["Look for a leak at valve stems, fittings, and the fill valve", "A weeping air vent cap is found on an upstairs radiator and the fill valve is closed."],
        ["Keep adding fresh water every day to hold the pressure up", "This brings in fresh air and hides a leak. It is not a fix."]
      ],
      [
        ["Air is trapped in the upstairs loop, drawn in by low pressure through a weeping vent, and the loop needs purging", "The pressure is low, the top is cold, there is gurgling, and the tank is good."],
        ["The circulator is seized", "The pump is turning and moving some water."],
        ["The expansion tank is waterlogged", "Only air came from the stem and the pressure is stable."],
        ["The boiler is undersized", "The boiler runs normally and the lower floors are warm."]
      ],
      ["c1", "c2", "c3", "c4", "c5", "c6"],
      "Cold at the top with gurgling often means trapped air. Fix the leak that let it in, restore the cold fill pressure, and purge a cool system by the maker's steps.")
    ,
    S("boiler-waterlogged-tank-relief-drip", "Boiler Relief Valve Drips Every Time It Heats Up",
      "The owner says there is a wet spot under the pipe by the boiler, and the gauge needle goes way up whenever the heat runs.",
      "A hot-water boiler with a diaphragm expansion tank and a relief valve with a discharge pipe. Everything else runs.",
      [
        ["Check for heavy discharge, steam, or scalding hazards. Keep clear of the discharge pipe and let the boiler cool before working", "A slow drip only. No steam, no heavy flow. The boiler is cooled."],
        ["Read the gauge cold and then during a heat-up", "Cold pressure is at the normal fill value. It climbs well past normal when heated."],
        ["Check that the fill valve is closed and the pressure holds steady with the boiler off", "Pressure holds steady cold, so the fill valve is not passing."],
        ["Tap the expansion tank and compare top and bottom", "The whole tank sounds dull and feels heavy."],
        ["With the boiler off, the tank isolated, and pressure relieved as the maker allows, press the air valve stem", "Water comes out of the air valve."],
        ["Check the relief valve rating against the boiler nameplate", "The rating is correct and the valve is not defective."],
        ["Screw a cap on the relief valve discharge to stop the drip", "A capped relief valve can let the boiler overpressure. This is unsafe."]
      ],
      [
        ["The expansion tank diaphragm has failed and the tank is waterlogged, so heat-up pressure spikes and the relief valve drips", "Water out of the air valve, normal cold pressure, and big pressure jump on heating."],
        ["The relief valve is defective", "The valve rating is right and it only lifts when the pressure spikes."],
        ["The fill valve is passing water", "Pressure held steady cold."],
        ["The circulator is oversized", "That would not cause the tank to hold water."]
      ],
      ["c1", "c2", "c3", "c5", "c6"],
      "A relief valve that drips is a messenger, not the problem. Check the tank air side and the fill valve first. Replace the tank, set its air side to the cold fill pressure, and never cap a relief valve.")
    ,
    S("boiler-zone-valve-head-burnt-coil", "Bedroom Zone Is Cold and the Boiler Never Starts for It",
      "The owner says the bedroom zone has not heated since last night. The living room zone works fine.",
      "A hot-water boiler with zone valves. The bedroom thermostat is calling, but the bedroom zone valve never opens and the boiler does not respond to that call.",
      [
        ["Lock out power before removing the zone valve cover or touching wiring", "Power is locked out and verified at the valve terminals."],
        ["Look at the thermostat and the call", "The bedroom thermostat is calling. The living room zone is idle and satisfied."],
        ["Feel and watch the zone valve for movement", "The valve lever does not move and the head is cold."],
        ["Restore power and measure 24 volts at the zone valve thermostat terminals during the call", "24 volts is present."],
        ["Lock out again and measure coil resistance on the valve head", "The meter reads open on the coil."],
        ["Check the valve body by hand using the maker's method for the manual lever", "The valve body moves freely by the maker's method, so it is not stuck."],
        ["Jumper the end switch so the pump runs against a closed valve", "Running the pump against a closed valve can harm it and does not heat the zone. Do not do this."]
      ],
      [
        ["The zone valve head (motor) coil has burnt open, so the valve never opens and its end switch never starts the boiler", "24 volts reaches the head, the coil is open, and the body is free."],
        ["The transformer has failed", "24 volts is present at the valve."],
        ["The zone valve body is jammed with debris", "The body moves freely by hand."],
        ["The bedroom thermostat has failed", "It is calling and the voltage is present."]
      ],
      ["c1", "c2", "c4", "c5", "c6"],
      "If voltage reaches the zone valve and nothing moves, test the head with power off. Replace it with the same model and never jump the end switch.")
    ,
    S("heatpump-reversing-valve-leaks-by", "Heat Pump Is Lukewarm in Winter but Cools Fine in Summer",
      "The owner says the heat pump blows barely warm air this winter, and it never gets the house warm. The aux heat comes on a lot.",
      "An air-source heat pump in heating mode at a cold outdoor temperature. The airflow is good and the outdoor coil is not iced.",
      [
        ["Check for burning smell, water near electrical parts, and lock out power for any panel work", "No smell, no water. Power is locked out for panel work."],
        ["Check the filter and registers", "The filter is clean and registers are open."],
        ["Look at the outdoor coil", "The coil is clean and not iced."],
        ["Measure compressor amps and compare with the nameplate", "Amps are lower than expected."],
        ["Compare pipe temperatures on each side of the reversing valve", "The difference is larger than a healthy valve would show, as if hot and cold gas are mixing."],
        ["Cycle to cooling and back to heating and watch pressures", "The valve shifts, but the pressures do not separate as they should."],
        ["Add refrigerant until the suction pressure looks right", "Extra charge does not fix a leaking valve and can overcharge the system. Do not do this."]
      ],
      [
        ["The reversing valve is leaking internally, mixing hot and cold refrigerant and cutting heat output", "The valve shifts, amps are low, airflow and charge checks are normal, and temperatures across the valve are far apart."],
        ["The filter is clogged", "The filter is clean."],
        ["The outdoor coil is iced", "The coil is clear."],
        ["The thermostat is set wrong", "The valve shifts when commanded and the call is normal."]
      ],
      ["c1", "c2", "c3", "c4", "c5", "c6"],
      "Rule out airflow, defrost, and charge first. If the valve shifts but pressures do not separate and the temperatures across it differ, suspect an internal leak. Recover refrigerant before opening the circuit. EPA Section 608 certification is required.")
    ,
    S("heatpump-defrost-sensor-open-iced", "Heat Pump Outdoor Coil Is a Block of Ice",
      "The owner says the outdoor unit looks like a block of ice and the house is cold, even though the unit is running.",
      "An air-source heat pump in heating mode on a cold, damp day. The outdoor unit runs but the coil is heavily iced and the board shows a defrost fault.",
      [
        ["Check for burning smell and loose electrical parts, and lock out power before touching wiring", "No smell. Power is locked out for the wiring look."],
        ["Look at the outdoor coil and fan", "Ice covers the whole coil. The fan is blocked by frost and runs slowly."],
        ["Read the control board fault code and the defrost status", "No defrost cycle has started in hours."],
        ["Check airflow indoors and the filter", "Indoor airflow is normal."],
        ["With power off, inspect the defrost sensor wiring and its mounting", "The sensor is mounted on the coil and the wires are intact. The connector is not damaged."],
        ["Measure the sensor against the maker's chart or switch temperature", "The sensor reads open in the cold, as if it never calls for defrost."],
        ["Chip the ice off with a screwdriver to get the unit going again", "Fins and tubing can be punctured. This is not a repair and risks leaking refrigerant."]
      ],
      [
        ["The defrost sensor has failed open, so the control never starts a defrost and the coil ices over", "Ice covers the coil, no defrost starts, and the sensor tests bad."],
        ["The unit is low on charge", "Low charge may ice a coil but the sensor check clearly fails."],
        ["The indoor filter is clogged", "Airflow indoors is normal."],
        ["The contactor has failed", "The outdoor unit is running."]
      ],
      ["c1", "c2", "c3", "c5", "c6"],
      "Ice that never clears in heat mode points to the defrost chain. Check the code, the wires, and then the sensor against the maker's chart. Replace the failed part after you have looked at the whole system. Never chip ice with tools.")
    ,
    S("heatpump-pitted-contactor-aux-only", "Heat Pump Never Starts Outside but Backup Heat Works",
      "The owner says the outdoor unit has not run in two days, and the house only warms with the electric heat. The bill is up.",
      "An air-source heat pump. The thermostat calls for heat and the indoor blower and strips run, but the outdoor unit stays silent.",
      [
        ["Check the disconnect and breaker, look for burnt smells, and lock out power before opening the panel", "The breaker is on, no smell. Power is locked out for the look."],
        ["Check the thermostat mode", "It is set to normal heat, not emergency heat."],
        ["Look at the outdoor unit and listen during a call", "No hum, no fan, no click from the contactor."],
        ["Restore power and measure 24 volts at the contactor coil during a call", "24 volts is present."],
        ["Measure line voltage on the contactor's line side and load side", "Line side has full voltage. Load side has voltage on one pole only."],
        ["Lock out again and look at the contacts", "Two contacts are badly pitted and partly welded, the third is burnt through."],
        ["Bridge across the contactor with a screwdriver to start the unit", "This bypasses all control and can cause shock or equipment damage. Never do this."]
      ],
      [
        ["The contactor contacts are burnt and pitted, so the outdoor unit does not get full line voltage", "The coil has 24 volts, but the load side is dead or partial and the contacts are damaged."],
        ["The thermostat is set to emergency heat", "It is set to normal heat."],
        ["The transformer has failed", "24 volts reaches the coil."],
        ["The compressor has locked up", "The compressor is not receiving full line voltage, so it cannot be judged yet."]
      ],
      ["c1", "c2", "c4", "c5", "c6"],
      "If the coil has voltage and the load side does not, look at the contacts with power off. Replace the contactor with the correct rating, then look for what made it fail, such as a bad capacitor or a short cycling system. Never bridge a contactor.")
    ,
    S("heatpump-low-charge-and-dirty-filter-mix", "Heat Pump Cannot Keep Up and the Filter Looks Terrible",
      "The owner says the heat pump runs all day and the house is cold. They have not changed the filter in a long while.",
      "An air-source heat pump in heating mode. The filter is badly loaded, and there is also a slow refrigerant leak at an outdoor fitting.",
      [
        ["Check for burning smell and water near electrical parts, and lock out power before panel work", "No smell, no water. Power is locked out for panel work."],
        ["Look at the filter and the registers", "The filter is packed solid and several registers are closed."],
        ["Replace the filter, open the registers, and run again", "The supply air improves a little but heat is still weak."],
        ["Read pressures and line temperatures in heating mode and compare with the maker's chart", "Pressures and subcooling are lower than the chart shows, a low charge pattern."],
        ["Check the outdoor fittings for oil", "Oil residue at a flare fitting."],
        ["Use a leak detector at the fitting", "A small leak is found at the flare."],
        ["Top off the charge to get it working today", "Topping off a leaking system is not allowed and does not fix the leak. Never do this."]
      ],
      [
        ["A clogged filter was hurting airflow, and a refrigerant leak has also left the system low on charge", "The filter fix only helped partly, and the readings and leak test show a real low charge."],
        ["The reversing valve is leaking by", "A charge shortage and a leak explain the readings."],
        ["The defrost sensor has failed", "The coil is not iced."],
        ["The contactor is burnt", "The outdoor unit runs."]
      ],
      ["c1", "c2", "c3", "c4", "c5", "c6"],
      "Fix the cheap airflow problem first, then check charge. Find and repair the leak, recover as needed, and weigh in the charge. Never top off a leaking system. EPA Section 608 certification is required.")
    ,
    S("controls-supply-sensor-open-stuck-reading", "Building System Shows Minus 40 and Calls for Full Heat",
      "The facility manager says one air handler is blasting heat on a mild day. The control screen shows a supply air temperature of minus 40.",
      "A building automation system with a duct temperature sensor on a supply air handler. The graphic reads an extreme low value and the heating valve is driven wide open.",
      [
        ["Isolate power to the control circuit before touching the sensor terminals", "Control power is isolated and verified."],
        ["Compare the screen value with a handheld thermometer in the duct", "The screen shows an extreme low value while the duct air is about normal."],
        ["Check whether other sensors on the same controller read normally", "Other sensors on that controller read normally."],
        ["With the sensor disconnected, measure its resistance", "The meter reads open (OL)."],
        ["Check the wiring from the sensor to the controller for continuity", "A conductor is broken at a splice in the duct wall."],
        ["Compare the repaired reading with the handheld", "After repair the screen matches the handheld within a small difference."],
        ["Override the heating valve closed and leave it that way", "That hides the fault and can cause freezing or comfort problems. It does not fix the sensor."]
      ],
      [
        ["A broken sensor wire (open circuit) gives a stuck extreme reading, so the loop thinks the air is cold and drives the heat wide open", "Other inputs are fine, the sensor reads open, and the break is at a splice."],
        ["The heating valve actuator is stuck", "The command is the result of the false reading."],
        ["The controller has failed", "Other sensors read normally."],
        ["The sensor is out of calibration by a few degrees", "The reading is an extreme value, which points to an open, not drift."]
      ],
      ["c1", "c2", "c3", "c4", "c5", "c6"],
      "A reading pinned at an extreme means open or shorted. Check at the sensor and at the controller to find where the break is, repair it, and confirm against a trusted handheld. Do not just override the output.")
    ,
    S("controls-chattering-alarm-flood", "Operator Screen Fills With Hundreds of Alarms Every Night",
      "The operator says the alarm screen fills with the same high temperature alarm over and over every night, and the real alarms are getting buried.",
      "A building automation system with a high zone temperature alarm that triggers and clears many times an hour overnight. The zone temperature hovers right at the alarm limit.",
      [
        ["Check whether any alarm is about a life safety or safety device before changing anything", "The flood is one repeating comfort alarm, and no safety alarm is buried in it."],
        ["Look at the alarm history for the pattern", "The same point goes in and out of alarm dozens of times a night."],
        ["Trend the zone temperature overnight", "The temperature wanders just above and below the alarm limit."],
        ["Look at the alarm setup for deadband and delay", "There is no deadband and no delay on that alarm."],
        ["Compare the alarm limit with the normal overnight setback", "The limit sits right at the unoccupied setback value."],
        ["Check that the sensor itself is accurate", "The sensor matches a handheld, so the temperature is real."],
        ["Disable the alarm completely so the screen goes quiet", "That could hide a real fault. Suppression needs a reason, testing, and a record."]
      ],
      [
        ["The alarm limit is set at the normal setback temperature with no deadband or delay, so it chatters", "The temperature is real, wanders around the limit, and the alarm has no deadband or delay."],
        ["The zone sensor has failed", "The sensor matches the handheld."],
        ["The air handler is broken", "The temperature is within the setback range."],
        ["The network is dropping out", "The alarm history shows clean values, not lost communication."]
      ],
      ["c1", "c2", "c3", "c4", "c5", "c6"],
      "A chattering alarm needs a limit away from normal values, a deadband, and sometimes a delay. Fix it with the operator's approval and a record, and do not simply turn it off.")
  ]);

  window.SEQUENCES = window.SEQUENCES.concat([
    {
      id: "boiler-relief-valve-drip-response-order",
      title: "Responding to a Dripping Boiler Relief Valve",
      intro: "A sensible order for a closed hot-water boiler. Follow the boiler maker's procedure and local rules.",
      steps: [
        "Keep clear of the discharge and make sure it is not a heavy flow or steam",
        "Turn the boiler off and let it cool",
        "Read the pressure gauge cold, then watch it during a heat-up",
        "Check the fill valve for water passing",
        "Check the expansion tank air side with the tank isolated and pressure relieved",
        "Replace or reset the failed part (tank, fill valve) and set the cold fill pressure",
        "Replace the relief valve only if it is still faulty, with the same rating"
      ],
      why: "The relief valve is a safety device and the symptom, not the cause. Tank and fill valve are checked first, and the valve is never capped."
    },
    {
      id: "controls-bad-reading-diagnosis-order",
      title: "Checking a Control Input That Reads Wrong",
      intro: "A sensible order for a building controls input. Follow the site's and the manufacturer's procedures.",
      steps: [
        "Isolate control power and make the area safe",
        "Compare the displayed value with a trusted handheld",
        "Decide whether the value is stuck, steady off, or jumping",
        "Measure the sensor with it disconnected and compare with its table",
        "Check wiring and terminals, then mounting and contact",
        "Check input type, scale, and offset in the controller",
        "Replace the failed part, verify the reading, and record the change"
      ],
      why: "The reading pattern points to the likely fault. Testing at the sensor and at the controller finds where the break is without guessing."
    }
  ]);

  window.PAIRS = window.PAIRS.concat([
    {
      id: "hydronic-fault-clue-terms",
      title: "Hot-Water Heating Fault Clues",
      pairs: [
        ["Pump hums, rotor will not turn", "Seized circulator rotor from debris or scale"],
        ["Gurgling and a cold top floor", "Trapped air in the loop"],
        ["Relief valve drips when heating", "Waterlogged expansion tank or fill valve passing"],
        ["Water out of the tank air valve", "Failed expansion tank diaphragm"],
        ["24 volts at the head, valve does not move", "Failed zone valve head"],
        ["Boiler never starts for one zone", "Zone valve end switch not closing"]
      ]
    },
    {
      id: "heat-pump-and-controls-fault-terms",
      title: "Heat Pump and Controls Fault Clues",
      pairs: [
        ["Coil iced and no defrost ever starts", "Failed defrost sensor or control"],
        ["Low amps and temperatures mixing across the valve", "Leaking reversing valve"],
        ["24 volts at the coil, dead load side", "Burnt or pitted contactor contacts"],
        ["Sensor reads pinned at an extreme", "Open or shorted sensor or wire"],
        ["Valve opens and closes repeatedly", "Loop hunting from tuning, noise, or a sticking actuator"],
        ["Same alarm repeating all night", "Alarm limit with no deadband or delay"]
      ]
    }
  ]);
})();
