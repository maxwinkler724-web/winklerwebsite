/* More training game content (commercial refrigeration: a walk-in cooler that is warm after defrost with compressor overload trips, and a walk-in with warm product where the door and gasket let heat in). Loads AFTER games-data.js and games-add.js through games-add12.js. General method only. All numbers are examples. The maker's manual, controller instructions and local food rules always govern. */
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
    S("refr-walk-in-fan-delay-jumpered-overload-trip", "Walk-In Warm After Defrost, Compressor Trips",
      "A restaurant manager says the walk-in freezer is soft at the back some mornings, and the compressor has tripped on overload a few times, always after the early defrost.",
      "A walk-in freezer with a remote condensing unit, electric defrost and a timer-style controller. Another tech was here last month. Any numbers are examples only.",
      [
        ["Lock out the condensing unit before opening any panel, check that the inside door release works, and tell the manager you are going into the box", "Power is locked out and verified dead, the door release works and the manager knows."],
        ["Stand at the evaporator after a defrost ends and watch what the fans do", "The evaporator fans start at the instant defrost ends, while the coil is still wet and warm. Warm air blows over the product."],
        ["Check the box and product after defrost with a separate thermometer and a probe, and tell the manager what you find", "Air is several degrees above setpoint right after defrost, and product near the evaporator is soft. You tell the manager, who decides about the food."],
        ["Look at the fan-delay control wiring at the evaporator", "The fan-delay sensor wires have been twisted together with a wire nut, which defeats the delay."],
        ["Measure compressor amps and suction at the moment refrigeration resumes", "Suction spikes and amps jump well above normal for the first minutes, which is consistent with dense vapor reaching the compressor."],
        ["Compare the controller settings, the condenser coil and line voltage with the maker's data", "The defrost duration and termination look right, the condenser is clean and voltage is steady, so the load comes from the fans starting too early."],
        ["Reset the overload, leave the jumper in place and raise the overload setting so the trips stop", "Defeating a control and raising an overload setting hides the problem and risks the compressor. This is unsafe."]
      ],
      [
        ["The fan delay is bypassed, so fans start on a warm coil, warm the product and load the compressor after defrost", "The fans started at once, the sensor wires were jumpered, and amps spiked right after defrost."],
        ["The compressor is failing", "Amps were normal outside the post-defrost window and the condenser and voltage were fine."],
        ["The freezer is low on refrigerant", "Nothing in the readings showed a starved coil. The trouble appeared only after defrost."],
        ["The condenser coil is dirty", "The condenser was clean."]
      ],
      BP,
      "Fan delay protects both the product and the compressor. Restore the control, never leave a jumper in, never raise an overload setting to stop a trip, and tell the operator about any product that warmed. Fan delay settings, such as roughly 20 to 30 F on the coil in one trade article, are examples and the maker's data governs.")
    ,
    S("refr-walk-in-warm-product-door-gasket-operator-decision", "Walk-In Cooler Warm, Product in Question",
      "A cafe owner says the walk-in cooler felt warm this morning and the thermometer on the door read high. She wants to know if the food is okay.",
      "A walk-in cooler with a remote condensing unit. A delivery came yesterday and the door is often propped open during stocking. Any numbers are examples only.",
      [
        ["Lock out power before opening panels, confirm the inside door release works, and note where the owner will be while you work", "Lockout is in place, the release works and the owner knows where you are."],
        ["Look at the door, the closer and the gasket", "The door sags and does not latch on its own, and the gasket is torn at the hinge side with light showing through."],
        ["Read the box air with a separate thermometer", "Air reads about 46 F, a few degrees above what the controller shows, and the unit has been running continuously."],
        ["Check the refrigeration side: evaporator coil, fans, suction pressure and superheat", "The coil is lightly frosted, the fans turn and the readings are within the maker's data. The system is working but cannot keep up."],
        ["Check the condensing unit coil, fan and amps", "The coil is clean, the fan runs and amps are normal."],
        ["Ask the owner about deliveries, door habits, how long the box has run warm and whether anyone has probed the food", "A big warm delivery went in, the door has been propped, and nobody has taken product temperatures. The owner is unsure how long it was warm."],
        ["Tell the owner the food is fine because the box is cooling down again, and leave", "A tech does not certify food. The operator decides under their food-safety plan and the health department. This is unsafe."]
      ],
      [
        ["Warm air from a poor door and gasket, with a heavy warm load, is overloading a working system, and the owner needs to be told plainly about the product", "The refrigeration readings were normal, the door and gasket leaked, and the load was warm."],
        ["The compressor has failed", "The unit runs and the readings are within the data."],
        ["The box is low on refrigerant", "Pressures and superheat were normal for the data."],
        ["The thermostat setpoint is wrong", "The setpoint was right. The box could not keep up with the heat coming in."]
      ],
      BP,
      "A working system can still lose to warm air and warm loads. Fix the door and gasket, report the facts, and let the operator decide about the food. Cold holding is commonly cited at 41 F for the food itself, so check the local code, and remember that air readings are only clues.")
  ]);
})();
