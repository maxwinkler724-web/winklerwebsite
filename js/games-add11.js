/* More training game content (rooftop units: warm air with the fan running and an open low-pressure control, hot humid afternoons from a wrong economizer changeover, a stuffy space with a closed minimum damper, a mixed-air sensor flash code, and a stopped condenser fan with a weak capacitor and worn contactor). Loads AFTER games-data.js and games-add.js through games-add10.js. General method only. All numbers are examples. Manufacturer procedures and wiring diagrams always govern. */
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
    S("rtu-warm-air-fan-runs-open-low-pressure-control", "Roof Unit Blows Warm Air, Fan Runs",
      "The store manager says the rooftop unit is blowing warm air. The indoor fan runs all the time, but the space never cools.",
      "A rooftop unit with one compressor stage. The thermostat is in Cool and set well below room temperature. The unit's diagram shows the compressor contactor fed through a series chain of low-pressure, high-pressure and discharge-line safety controls. All numbers here are examples.",
      [
        ["Before opening any panel, open the disconnect, lock and tag it, and prove it dead with a meter you have checked on a known source. Wear fall protection near the roof edge", "The disconnect is locked and tagged, the meter proved the unit dead, and you are clear of the roof edge."],
        ["Look at the outside of the unit and the thermostat setting from a safe spot", "Cool mode, the setpoint is well below room temperature, the indoor blower is moving air, and the filters look clean."],
        ["Listen at the outdoor section with panels closed after power is restored by a trained person", "The contactor is not pulled in. Neither the compressor nor the outdoor fan runs."],
        ["Measure the call for cooling at the unit's Y terminal and C", "About 24 V AC is present, so the thermostat is asking for cooling."],
        ["Measure across each safety control in the series chain, one at a time, with a rated meter", "Across the low-pressure control the meter reads close to the full control voltage. The high-pressure control and the discharge thermostat read close to zero."],
        ["Look for why the low-pressure control is open, including airflow, coil condition, outdoor temperature and signs of a leak", "Airflow and the coil look normal. It is a cool morning, and the unit's manual allows a reset only after a low-ambient check. Oil staining at a fitting suggests a possible leak, which a certified tech must confirm."],
        ["Jumper across the low-pressure control so the compressor will start and see if it cools", "A safety control is open for a reason, and jumpering it can run the compressor with no refrigerant or oil return. This is unsafe."]
      ],
      [
        ["The low-pressure control is open, so the compressor contactor never pulls in and the fan keeps running", "Y was present, the contactor was out, and the full voltage sat across the low-pressure control."],
        ["The compressor has failed", "The compressor was never being asked to run because the contactor was not pulled in."],
        ["The thermostat is not calling for cooling", "24 V AC was present at Y and C."],
        ["The contactor coil is bad", "The coil was not receiving voltage, so the open control upstream is the problem."]
      ],
      BP,
      "Read the safety chain before blaming the compressor. A warm, fan-only call can be an open pressure control. Find why it is open and never jumper it.")
    ,
    S("rtu-hot-afternoon-economizer-humid-changeover", "Too Hot and Humid in the Afternoon, Cool in the Morning",
      "A school office says the room is comfortable first thing in the morning but gets warm and sticky every afternoon. Cooling seems to run all day.",
      "A rooftop unit with a dry-bulb economizer and a changeover dial. The site is in a humid area. The damper is partly open on a muggy afternoon. All numbers are examples.",
      [
        ["Open the disconnect, lock and tag it, and prove it dead with a meter you have checked on a known source before you reach into the damper section", "The unit is locked out and proven dead. You also keep your hands clear of the sharp blade edges and the linkage."],
        ["Look at the damper position and listen for the actuator with power restored by a trained person, then read what the controller shows", "The outdoor-air damper is nearly fully open at mid-afternoon, and the unit is cooling hard."],
        ["Look at the changeover setting on the economizer controller", "The dial is set for a dry climate. In the sampled example, that lets the economizer run on warm, humid outdoor air."],
        ["Measure the mixed-air temperature and the outdoor-air temperature with a handheld meter", "Mixed air is within a couple of degrees F of outdoor temperature, so the damper really is letting in mostly outdoor air."],
        ["Compare the outdoor sensor reading with a handheld meter at the same spot", "The outdoor sensor agrees with the handheld reading, so the sensor is not the cause."],
        ["Check that the damper moves by hand and by command, and look at the actuator and linkage", "The damper moves freely and follows its command, so the mechanics are fine."],
        ["Charge the system with refrigerant because cooling is slow in the afternoon", "Adding refrigerant without checking the economizer setting is a guess and risks overcharge. This is not safe or correct."]
      ],
      [
        ["The changeover setting is wrong for the climate, so the economizer lets humid outdoor air in on warm afternoons", "The dial was set for a dry climate, the damper was nearly open, and sensors and mechanics checked out."],
        ["The outdoor sensor has failed", "It agreed with the handheld meter."],
        ["The damper actuator is stuck", "It moved freely and followed its command."],
        ["The refrigerant charge is low", "Mixed air tracked outdoor air, which shows the open damper, not the charge, is feeding the load."]
      ],
      BP,
      "Check the changeover setting and the sensor before you touch the charge. A damper that opens on humid air brings in moisture and load. Treat any numbers in this call as examples.")
    ,
    S("rtu-stuffy-damper-never-opens-minimum-position", "Always Stuffy, Damper Never Opens",
      "An office manager says the room is stuffy all day. Workers get drowsy, and the air never seems fresh.",
      "A rooftop unit with an economizer and a minimum-position setting. A small CO2 reading, taken by the building contractor, is above what the owner wants. All numbers are examples.",
      [
        ["Open the disconnect, lock and tag it, and prove it dead with a meter you have checked on a known source before reaching into the damper section", "The unit is locked out and proven dead, and you keep clear of the sharp blades."],
        ["Look at the outdoor-air damper while the building is occupied and the unit is running", "The outdoor-air damper stays fully closed, even at its minimum."],
        ["Move the damper by hand with the unit locked out", "The damper moves freely and the linkage is tight."],
        ["Check the actuator voltage and signal with the unit running", "The actuator gets power and a signal, and it moves when the signal changes."],
        ["Look at the minimum-position setting and the occupied schedule", "The minimum-position setting is at zero. The schedule says the building is occupied."],
        ["Measure outdoor-air percentage after raising the minimum from a mixed-air, return-air and outdoor-air temperature reading", "After the change, the damper opens and the calculated outdoor-air percentage matches the design value in the drawings."],
        ["Prop the damper open permanently with a stick to get fresh air", "That is not controlled, wastes energy and can freeze the coil in cold weather. It is unsafe."]
      ],
      [
        ["The minimum position is set too low, so the damper never admits ventilation air", "The mechanics and actuator were fine and the setting was zero."],
        ["The actuator has failed", "It moved when signaled."],
        ["The damper is jammed", "It moved freely by hand."],
        ["The supply blower is too small", "The blower was not the problem. The outdoor-air path was closed."]
      ],
      BP,
      "Do not set minimum position by feel. Measure the outdoor-air percentage and compare it with the design. Numbers here are examples.")
    ,
    S("rtu-sensor-flash-code-mixed-air-sensor", "Controller Shows a Sensor Flash Code",
      "The maintenance lead says the rooftop controller keeps flashing a code and the economizer is not working.",
      "A rooftop unit whose controller shows a mixed-air sensor fault. One maker's example uses a count of 8 flashes for a mixed-air sensor and a reference voltage of about 5 V with the sensor unplugged. Your unit's manual may differ. All numbers are examples.",
      [
        ["Open the disconnect, lock and tag it, and prove it dead before you unplug anything", "The unit is locked out and proven dead before you touch the sensor plug."],
        ["Look up the flash code in the unit's manual", "The code count matches the mixed-air sensor fault in the manual."],
        ["Look at the sensor, its plug and the visible wiring", "The sensor is in the mixed-air section and the plug is seated. No wire looks cut or burned."],
        ["With power restored by a trained person, measure the sensor input voltage with the sensor connected, then unplugged", "With the sensor unplugged the board reads about 5 V, which matches the example reference. With the sensor connected, the voltage is far from what the chart expects."],
        ["With power off and the sensor unplugged, measure the circuit resistance of the sensor wires", "The wire resistance is low and steady and there is no shorting to ground, so the wiring is good."],
        ["Test the sensor itself against the maker's chart at a known temperature", "The sensor's resistance is open or far off the chart, so the sensor has failed."],
        ["Jumper the sensor terminals together so the code clears", "A false sensor value can drive the damper wrongly and may defeat a freeze or low-limit protection. This is unsafe."]
      ],
      [
        ["The mixed-air sensor has failed open, and the wiring and board are fine", "The board's reference voltage was normal, the wiring was good and the sensor was off the chart."],
        ["The sensor wiring is broken", "The wire resistance was low and steady."],
        ["The control board has failed", "The board's reference voltage was normal."],
        ["The damper actuator is bad", "The code named the sensor circuit, and the actuator was not the cause."]
      ],
      BP,
      "Check voltage first, then the wiring, then the sensor. That order avoids replacing a good part. Numbers in this call are examples from one maker.")
    ,
    S("rtu-condenser-fan-stopped-compressor-tripping", "Condenser Fan Stopped and the Compressor Trips",
      "A restaurant owner says the unit ran for a while, then the compressor shut off. A tech nearby says the outdoor fan is not turning.",
      "A rooftop unit with a single outdoor fan motor and run capacitor. The contactor feeds both the compressor and the fan. All numbers are examples.",
      [
        ["Open the disconnect, lock and tag it, and prove it dead with a meter you have checked on a known source. Discharge the capacitor by your approved method before touching terminals", "The disconnect is locked and tagged, the meter proved the unit dead, and the capacitor is discharged."],
        ["Look at the outdoor fan and listen with power restored by a trained person while the contactor is pulled in", "The contactor is pulled in, but the fan is not turning. The compressor hums and trips on overload."],
        ["With power off, turn the fan blade by hand", "The blade spins freely, so the bearings are not seized."],
        ["Measure the run capacitor with a capacitance meter, separate from the circuit", "The reading is about 15 percent below the printed rating. The label tolerance is tighter than that."],
        ["Look at the contactor contacts and measure the voltage drop across the closed contacts with a rated meter", "The contacts are pitted. In the example, the drop across closed contacts is 0.4 V, higher than the trade rule of thumb under 0.1 V."],
        ["Ask why the parts failed: heat, a loose connection, a dirty coil or a stuck fan, and check the fan motor windings", "A loose connection and a dirty coil raised the load. The fan motor windings read normal."],
        ["Replace the compressor right away because it keeps tripping", "A tripping compressor is often protecting itself from a fan or capacitor problem. Replacing it without checking cheaper parts first is wasteful and unsafe."]
      ],
      [
        ["A weak run capacitor and a pitted contactor are keeping the fan from running, so the compressor overheats and trips", "The blade was free, the capacitor read low and the contactor dropped extra voltage."],
        ["The fan motor bearings are seized", "The blade turned freely by hand."],
        ["The compressor has failed outright", "The compressor only tripped when the fan stopped. Check the cheap parts first."],
        ["The thermostat is bad", "The contactor pulled in, so the call for cooling was reaching the unit."]
      ],
      BP,
      "Contactor and capacitor are cheap fixes to check before a compressor swap. Numbers in this call are examples. The 10 percent and 0.1 V figures are trade rules of thumb, not maker specs.")
  ]);
})();
