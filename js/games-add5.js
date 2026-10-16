/* More training game content (furnace and split-system cooling faults). Loads AFTER games-data.js and games-add.js through games-add4.js. General method only. Manufacturer procedures and fault tables always govern. */
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
    S("furnace-igniter-open-circuit", "Furnace Inducer Runs but Nothing Lights",
      "The owner says the furnace hums, blows nothing warm, and the house is getting cold. It heated fine last week.",
      "A gas furnace with a hot surface igniter. On a call for heat the inducer runs, the pressure switch closes, and the burners never light.",
      [
        ["Check for a gas smell, a CO alarm, or scorching, and lock out power before opening the panel", "No smell, no alarm, no scorching. Power is locked out for the look."],
        ["Watch one full start sequence from the board", "The inducer runs, the board waits through warm-up, then times out with no flame."],
        ["Look through the sight glass or check the igniter for a glow during warm-up", "The igniter stays dark the whole time."],
        ["Check voltage at the igniter plug during warm-up", "The board sends the rated voltage during the warm-up step."],
        ["With power off, measure resistance across the igniter plug", "The meter reads open (OL)."],
        ["Look at the igniter without handling it more than needed", "A hairline crack runs across the element."],
        ["Jump the gas valve open so gas flows without an igniter", "Unlit gas can collect in the burner area. This is unsafe."]
      ],
      [
        ["The hot surface igniter has cracked and gone open, so it never heats to light the gas", "Voltage reaches the plug, the meter reads open, and the element is visibly cracked."],
        ["The pressure switch has failed", "The inducer runs, the sequence reached the warm-up step, so draft was proven."],
        ["The flame sensor is dirty", "The burners never light, so there is no flame for the sensor to prove."],
        ["The blower motor is bad", "The blower does not start until after flame is proven."]
      ],
      ["c1", "c2", "c3", "c4", "c5"],
      "If voltage reaches the igniter and it stays dark, test it with the power off. Never jump a gas valve open, since the board's job is to prove ignition first.")
    ,
    S("furnace-flame-sensor-coated-dropout", "Furnace Lights, Then Shuts Off and Restarts",
      "The owner says the heat starts, runs a few seconds, quits, and then tries again. It sometimes works on the third try.",
      "A gas furnace. The burners light and the flame looks steady and blue, but the control shuts the gas off after a few seconds and retries.",
      [
        ["Check for a gas smell, a CO alarm, and soot, and lock out power before reaching in", "No smell, no alarm, no soot. Power is locked out."],
        ["Watch the flame and the sequence", "The flame is steady and blue, and the board closes the valve a few seconds after ignition."],
        ["Look at the flame rod with power off", "The rod has a dull film on it, and it sits in the flame as it should."],
        ["Measure the flame signal in microamps, wired in series", "The reading is low and wanders, below the maker's range."],
        ["Check continuity of the rod wire and inspect the ceramic insulator", "The wire is intact and the insulator is not cracked."],
        ["Check resistance from neutral to the burner assembly", "It is a few ohms at most, so the ground path is good."],
        ["Bypass the flame sensor input so the gas valve stays open", "The flame safety is defeated, and the furnace could run with no proof of flame. This is unsafe."]
      ],
      [
        ["A coated flame rod is giving the board too weak a flame signal, so it shuts off the gas", "The flame is fine, the rod is coated, the signal is low, and the wire, insulator, and ground are good."],
        ["The gas valve is leaking through", "The flame is steady and the failure is flame proving, not gas supply."],
        ["The igniter is failing", "The burners light normally each time."],
        ["The limit switch is opening", "The shutoff comes seconds after ignition, with no heat build-up and the blower not yet involved."]
      ],
      ["c1", "c2", "c3", "c4", "c5", "c6"],
      "When a good flame still gets shut off, look at what proves it. Clean the rod lightly, re-measure, and ask why it got dirty. Never bypass flame proving.")
    ,
    S("furnace-dirty-filter-high-limit", "Furnace Shuts Off Early and the Fan Keeps Running",
      "The owner says the house warms slowly. The burners come on for a short time, go off, and the fan blows for a long time before the burners try again.",
      "A gas furnace. The burners light and then shut off after a short run while the blower keeps going. The board shows a limit open fault.",
      [
        ["Check for a gas smell, a CO alarm, and scorch marks, and lock out power before opening panels", "No smell, no alarm, no scorching. Power is locked out."],
        ["Look at the air filter and the registers", "The filter is packed with dust and a few registers are closed."],
        ["Check that the blower wheel is clean and the blower turns", "The wheel is a little dusty and the blower runs at normal speed."],
        ["Measure temperature rise across the furnace and compare it with the nameplate", "The rise is above the nameplate range."],
        ["Measure total external static pressure", "Static pressure is higher than the maker's limit, which fits restricted airflow."],
        ["Replace the filter, open the registers, and run a full cycle", "The burners stay on for a normal cycle and the rise returns to the range."],
        ["Jump across the limit switch so the burners keep running", "The heat exchanger can overheat and crack. This is unsafe."]
      ],
      [
        ["A clogged filter and closed registers restrict airflow, so the heat exchanger overheats and the limit switch opens", "The filter is loaded, the rise and static pressure are high, and a clean filter fixes it."],
        ["The limit switch has failed", "It opens only when airflow is restricted and works after the airflow is fixed."],
        ["The blower motor has failed", "The blower runs at normal speed."],
        ["The gas pressure is far too high", "Airflow was clearly restricted, and the cycle is normal after the filter change."]
      ],
      ["c1", "c2", "c4", "c5", "c6"],
      "A limit switch that keeps opening is doing its job. Check airflow before blaming the switch, and never jump it.")
    ,
    S("furnace-weak-blower-capacitor", "Furnace Blower Starts Slowly and the Limit Trips",
      "The owner says the blower hums for a moment, then runs slowly, and the burners keep shutting off. It has gotten worse over a few weeks.",
      "A gas furnace with a PSC blower motor. The filter was replaced last week. The blower is slow and warm to the touch.",
      [
        ["Lock out power, verify zero volts, and check for a gas smell or CO alarm before opening the blower door", "Power is verified off and there is no smell or alarm."],
        ["Check the filter and registers", "The filter is new and the registers are open."],
        ["Look at the blower run capacitor", "The top of the capacitor is slightly bulged."],
        ["Discharge the capacitor safely and measure it with the leads off", "The reading is well below the microfarad value printed on the label."],
        ["Check voltage to the motor and the blower's running amps once restored", "Voltage is correct, but the motor draws high amps and is warm."],
        ["Spin the wheel by hand with power off and check for rubbing or a tight bearing", "The wheel spins freely and the bearings feel fine."],
        ["Put in a larger capacitor than the label allows so the motor spins faster", "The wrong size can overheat the motor. This is unsafe."]
      ],
      [
        ["A weak blower run capacitor is leaving the motor slow and warm, so too little air reaches the heat exchanger and the limit trips", "The capacitor is bulged and reads well below its label, while voltage is good and the wheel is free."],
        ["The filter is clogged", "It was replaced last week and is clean."],
        ["The blower wheel is seized", "It spins freely by hand."],
        ["The limit switch is the root cause", "It opens because the blower is moving too little air."]
      ],
      ["c1", "c3", "c4", "c5", "c6"],
      "A slow blower can look like a limit problem. Check the capacitor, and replace it with the same microfarad value and at least the same voltage rating.")
    ,
    S("cooling-low-charge-leak-oily-fitting", "Air Conditioner Cools Poorly and the Suction Line Ices",
      "The owner says the air from the vents is barely cool and sometimes the larger copper line outside has frost on it. A tech topped it off last year.",
      "A split-system air conditioner with a TXV. The filter and coil are clean, the blower runs at normal speed, and the unit runs all day.",
      [
        ["Power off and verify, then look for oil spray, damage, or a burning smell, and check that gauges are ready", "No damage or burning smell. Power is off and verified."],
        ["Check the filter, the indoor coil, and the temperature split across the coil", "Filter and coil are clean. The temperature split is low."],
        ["Look at the line set, fittings, and service ports for oil stains", "An oily residue shows at one flare fitting at the indoor coil."],
        ["Connect gauges and read suction and head pressures", "Both pressures are low compared with the maker's data for these temperatures."],
        ["Calculate superheat and subcooling", "Superheat is high and subcooling is low, which fits a low charge."],
        ["Check the fitting with an electronic detector or bubble solution", "A small leak shows at the flare fitting."],
        ["Release a little refrigerant to see what the pressures do", "Venting is against the law and does not fix a leak."]
      ],
      [
        ["The system has lost charge through a leak at an oily fitting, giving low pressures, high superheat, and low subcooling", "Airflow is fine, readings fit a low charge, and the oil stain and detector point to the fitting."],
        ["The filter is clogged", "The filter and coil are clean."],
        ["The system is overcharged", "Overcharge would give high pressures and high subcooling."],
        ["The compressor has failed", "Pressures are low but the compressor is pumping, and the other readings point to a leak."]
      ],
      ["c1", "c2", "c3", "c4", "c5", "c6"],
      "High superheat and low subcooling with clean airflow point to lost charge. Find and repair the leak, recover and weigh in the charge, and remember that EPA Section 608 certification is needed.")
    ,
    S("cooling-dirty-condenser-high-head", "Air Conditioner Runs All Afternoon and Trips Off",
      "The owner says the house will not cool on hot afternoons and the outdoor unit shuts off, then restarts later.",
      "A split system with a TXV. The compressor trips on overload on hot afternoons.",
      [
        ["Open the disconnect and verify off, check for burning smell or leaks, and make sure gauges are ready", "Power is off and verified, with no smell or leaks."],
        ["Look at the condenser coil and its surroundings", "The coil face is matted with cottonwood fluff and grass clippings."],
        ["Check that the condenser fan turns freely at full speed", "The fan runs at normal speed."],
        ["Take head pressure and compare the condensing temperature with outdoor air", "Condensing temperature is far above outdoor air."],
        ["Calculate subcooling and superheat", "Subcooling is high and superheat is near normal."],
        ["Clean the coil per the maker, then recheck head pressure", "Head pressure drops into the expected range."],
        ["Remove charge to lower head pressure", "Removing refrigerant without cause would leave the system undercharged, and venting is against the law."]
      ],
      [
        ["A fouled condenser coil cannot reject heat, so head pressure rises until the unit trips", "The coil is matted, the fan is normal, and cleaning brings head pressure back."],
        ["The condenser fan motor has failed", "The fan runs at normal speed."],
        ["The unit is low on charge", "Pressures and subcooling are high, not low."],
        ["There is a liquid line restriction", "Restrictions do not usually raise head pressure, and cleaning fixed it."]
      ],
      ["c1", "c2", "c3", "c4", "c6"],
      "Look at the outdoor coil before touching the charge. Dirty coils are a leading cause of high head pressure, and cleaning is cheaper and safer than removing refrigerant.")
    ,
    S("cooling-fan-capacitor-hot-compressor", "Outdoor Unit Hums and Is Very Hot to the Touch",
      "The owner says the outdoor unit is noisy and the house is warm. The fan on top is not spinning, but the unit hums.",
      "A split system. The outdoor fan is stopped, and the compressor is running and getting very hot.",
      [
        ["Open the disconnect, verify zero volts, then check for burning smell or water near wiring", "Power is verified off. There is no burning smell and no water."],
        ["Spin the fan blade by hand", "The blade spins freely, so it is not jammed."],
        ["Look at the capacitor", "The fan side of the dual run capacitor is bulged."],
        ["Discharge it safely, then measure each side with the leads off", "The fan side reads far below its label value."],
        ["Check the contactor and the voltage reaching the fan leads when running", "Voltage reaches the fan leads, but it does not start."],
        ["Replace the capacitor with the same microfarad and at least the same voltage rating, then check amps", "The fan starts and both fan and compressor amps are in range."],
        ["Reach in and push the blade with the power on to get it going", "Reaching into a live unit is a shock and injury hazard."]
      ],
      [
        ["The fan side of the run capacitor has failed, so the fan will not start and the compressor overheats", "The blade is free, voltage reaches the motor, and the capacitor is bulged and reads low."],
        ["The fan motor winding is burnt", "The new capacitor brought the fan back to normal amps."],
        ["The contactor is bad", "Voltage reaches the fan leads."],
        ["The unit is low on charge", "An overheating compressor with a stopped fan fits a heat-rejection problem."]
      ],
      ["c1", "c2", "c3", "c4", "c5", "c6"],
      "A stopped condenser fan with a running compressor is urgent. Verify off, discharge, test, and replace the capacitor with the right rating. Shut the unit off until the fan runs.")
    ,
    S("cooling-liquid-line-restriction-drier", "Air Conditioner Cools Slowly and the Indoor Coil Is Partly Frosted",
      "The owner says the cooling got worse after a service visit that opened the system. The air is weakly cool and frost shows on the coil.",
      "A split system with a TXV. The filter is clean and the blower is normal. The system was opened and recharged two weeks ago.",
      [
        ["Power off and verify, then check for oil spray or damage, and make sure gauges are ready", "No oil spray or damage. Power is off and verified."],
        ["Check the filter, coil face, blower, and temperature split", "Filter and blower are fine. The split is low."],
        ["Look for kinks in the liquid line and at the filter drier", "No obvious kink. The drier feels colder on its outlet than its inlet."],
        ["Read suction and head pressure", "Suction is low. Head is normal."],
        ["Calculate superheat and subcooling", "Superheat is high and subcooling is normal to high, which does not fit a simple low charge."],
        ["Measure line temperature across the filter drier with an accurate clamp", "The outlet is clearly colder than the inlet."],
        ["Add more refrigerant to raise the low suction pressure", "Extra charge can push head pressure up and does not clear a restriction."]
      ],
      [
        ["A restricted filter drier is starving the metering device, giving low suction, high superheat, and normal to high subcooling", "The pattern fits a restriction, the temperature drops across the drier, and no leak sign is present."],
        ["The system is simply low on charge", "Subcooling is normal to high, not low."],
        ["The indoor coil is dirty", "The coil and filter are clean."],
        ["The condenser is dirty", "Head pressure is normal."]
      ],
      ["c1", "c2", "c4", "c5", "c6"],
      "Low suction does not always mean low charge. High superheat with normal or high subcooling points to a restriction. Recover, replace the part, and weigh in the charge. EPA Section 608 certification is required.")
  ]);

  window.SEQUENCES = window.SEQUENCES.concat([
    {
      id: "capacitor-safe-replace-order",
      title: "Replacing a Run Capacitor Safely",
      intro: "A sensible order for a run capacitor swap. Follow the equipment manufacturer's procedure.",
      steps: [
        "Open the disconnect and verify zero volts with a tested meter",
        "Photograph the wiring before removing anything",
        "Discharge the capacitor through a proper bleed resistor",
        "Check the old capacitor against the rating on its label",
        "Fit a new one with the same microfarad value and at least the same voltage rating",
        "Reconnect the common, fan, and compressor wires and snug the terminals",
        "Restore power and check fan and compressor amps"
      ],
      why: "Capacitors can hold a shock after power is off, so verify and discharge first. Matching the rating and rechecking amps proves the repair."
    },
    {
      id: "cooling-refrigerant-diagnosis-order",
      title: "Diagnosing a Weak-Cooling Split System",
      intro: "Rule out the easy causes before reading refrigerant numbers. Follow the manufacturer's procedures.",
      steps: [
        "Power off, verify, and make the area safe",
        "Check the filter, indoor coil, and blower",
        "Check the outdoor coil and condenser fan",
        "Verify gauges and thermometers",
        "Take suction and head pressures with line temperatures",
        "Calculate superheat and subcooling and compare with the maker's data",
        "Recover and repair before charging; weigh in the charge"
      ],
      why: "Airflow and heat-rejection faults can look like charge faults, so they are ruled out first. Refrigerant is recovered, never vented."
    }
  ]);

  window.PAIRS = window.PAIRS.concat([
    {
      id: "refrigerant-reading-patterns",
      title: "Reading Patterns for Common Cooling Faults",
      pairs: [
        ["Low charge", "Low suction and head, high superheat, low subcooling"],
        ["Overcharge", "High suction and head, low superheat, high subcooling"],
        ["Liquid line restriction", "Low suction, high superheat, normal to high subcooling"],
        ["Dirty condenser", "High head pressure from poor heat rejection"],
        ["Low evaporator airflow", "Low suction, low superheat, high temperature split"],
        ["Failed condenser fan capacitor", "Fan stopped or slow while the compressor runs hot"]
      ]
    },
    {
      id: "furnace-safety-device-terms",
      title: "Furnace Safety Devices and Their Jobs",
      pairs: [
        ["High-limit switch", "Opens on overheating to protect the heat exchanger"],
        ["Pressure switch", "Proves draft from the inducer before ignition"],
        ["Flame sensor", "Proves the burner flame so the gas stays on"],
        ["Hot surface igniter", "A brittle heating element that lights the gas"],
        ["Flame rollout switch", "Opens if flame leaves the combustion area"],
        ["Run capacitor", "Helps the blower or fan motor start and run"]
      ]
    }
  ]);
})();
