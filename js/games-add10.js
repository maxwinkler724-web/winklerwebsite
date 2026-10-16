/* More training game content (electrical and controls: failed capacitor, pitted contactor, blown control fuse, dead 24 V at the thermostat, Y and W swap, ECM blower that will not start, false meter reading, and tracing an open safety on a ladder diagram). Loads AFTER games-data.js and games-add.js through games-add9.js. General method only. Manufacturer procedures and wiring diagrams always govern. */
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
    S("elec-condenser-fan-hums-failed-run-capacitor", "Outdoor Fan Hums and Will Not Turn",
      "The homeowner says the house is warm, the outdoor unit hums, and the fan blade does not move. Pushing the blade with a stick made it spin for a bit, someone told them.",
      "A single-phase split air conditioner with a dual-run capacitor that serves the compressor and the condenser fan. The thermostat is calling for cooling.",
      [
        ["Open the disconnect, apply your lock and tag, and prove the power is off with a meter you have first checked on a known live source", "The disconnect is open and locked. The meter proved the unit dead, line to line and each leg to ground, and the meter still works afterward."],
        ["Look at the unit and listen: hum, blade, capacitor can", "The contactor is pulled in, the fan hums without turning, and the top of the capacitor looks slightly domed."],
        ["With power locked off, turn the fan blade by hand", "The blade spins freely with no roughness or stiff spots, so the bearings feel fine."],
        ["Read the rating on the capacitor label and discharge it by your approved method before touching terminals", "The label lists the microfarad and voltage ratings. The capacitor is discharged and the wire positions are photographed."],
        ["Test the capacitor with a capacitance meter, separate from the circuit", "The fan section reads clearly below its rated value, well outside the usual 10 percent guide."],
        ["Check the wiring to the fan and the contactor contacts for looseness or burning", "Connections are tight and clean, so wiring does not explain the hum."],
        ["Give the blade a push by hand with power on to get it going and leave it running", "That puts a hand and tools near a live fan, and it hides a weak capacitor until the motor overheats. This is unsafe."]
      ],
      [
        ["A weak run capacitor is not giving the fan motor the phase shift it needs to start", "Hum without turning, a free blade, a domed top, and a low capacitance reading all fit a failed capacitor."],
        ["The fan motor bearings are seized", "The blade turned freely by hand."],
        ["The contactor coil is bad", "The contactor pulled in and power reached the unit."],
        ["The thermostat is wired wrong", "The call for cooling reached the contactor, so the control circuit is working."]
      ],
      BP,
      "A humming fan with a free blade points at the capacitor. Lock out, prove dead, discharge by your approved method, then test before you replace.")
    ,
    S("elec-contactor-pitted-chattering", "Outdoor Unit Buzzes and Cycles Off and On",
      "The customer says the outdoor unit buzzes loudly, sometimes quits, and sometimes will not shut off when the thermostat is satisfied.",
      "A split system with a single-pole contactor. The thermostat and the 24 V control transformer have been working normally in other rooms of the house.",
      [
        ["Open the disconnect, lock and tag it, and prove the line side and load side are dead with a checked meter", "The outdoor power is off and proven. No one jumpers the contactor closed."],
        ["Listen and watch with the cover off after power is restored by a trained person, or read the history from the owner", "A buzzing or chattering sound comes from the contactor area, and the unit sometimes stays on after the call ends."],
        ["With power locked off, inspect the contacts and the plunger", "The contacts are pitted and burned, and one pair looks welded in a closed position."],
        ["Measure the contactor coil voltage when the thermostat calls, using a meter rated for the location", "The coil sees the control voltage the manufacturer specifies, so the coil is being fed correctly."],
        ["Check resistance of the coil with power off and the coil isolated", "The coil reads a normal winding value, so the coil is intact."],
        ["Look for the cause: loose connections, a weak capacitor, or a motor drawing more current than it should", "A loose wire on the load side has been overheating the contacts."],
        ["File the contacts and put the contactor back so the unit keeps running", "Pitted, burned contacts are a failing part, and filing it or jumpering it closed is unsafe. Replace it with the maker's specified part."]
      ],
      [
        ["The contactor contacts are pitted and burned, and a loose load connection helped wear them", "Buzzing, burnt and welded contacts, a good coil voltage, and a good coil resistance."],
        ["The control transformer is failing", "Coil voltage was normal when the thermostat called."],
        ["The thermostat is stuck calling", "The unit also stayed on because the contacts were welded, which a thermostat does not cause."],
        ["The compressor has failed", "The load-side wiring problem and damaged contacts explain the symptoms without a compressor fault."]
      ],
      BP,
      "A good coil on a contactor with burned contacts means the part is worn out. Fix the cause and match the maker's replacement. Never jumper it closed.")
    ,
    S("elec-blown-24v-fuse-shorted-wire", "Furnace Is Dead and the Thermostat Is Blank",
      "The homeowner says the whole system died a few minutes after the power flickered, and the thermostat screen is blank. A fuse on the board has blown before.",
      "A furnace with a 24 V control transformer and a small automotive-style fuse on the control board. A new thermostat wire was just pulled through the wall.",
      [
        ["Turn off power at the equipment disconnect, lock and tag it, and prove the line side dead before opening the control compartment", "Power is off and verified with a meter that was checked first. The safety switches are not jumpered."],
        ["Look at the control board fuse", "The fuse element is blown."],
        ["Ask what changed and inspect the thermostat wire where it passes through the wall and where it enters the furnace", "A staple has pinched a wire, and bare copper touches the metal cabinet where the cable enters the furnace."],
        ["With power off, check resistance from each thermostat wire to the cabinet ground with the thermostat wires disconnected", "One wire shows a direct path to ground, which fits a short."],
        ["Check the 24 V transformer secondary for damage after the short is cleared", "The transformer is cool, looks normal, and the secondary is not burned."],
        ["Repair the wire, fit the correct replacement fuse, restore power through a trained person, and confirm 24 V at the thermostat", "The fuse holds, 24 V shows at the thermostat, and the screen comes back."],
        ["Put in a larger fuse so it stops blowing", "A bigger fuse lets the short overload the transformer and the wiring. This is unsafe. Find the short."]
      ],
      [
        ["A pinched thermostat wire shorted to the cabinet and blew the control fuse", "Blown fuse, a short to ground on one wire, and a recent wire pull."],
        ["The thermostat is defective", "The short was in the wiring, and the thermostat is blank only because it lost power."],
        ["The circuit board is dead", "The board had no other damage, and it worked once the short was gone."],
        ["The transformer is open", "The transformer looked normal and 24 V returned when the short was fixed."]
      ],
      BP,
      "A repeated blown control fuse means a short. Find and fix the short. A bigger fuse hides the problem and can burn the transformer.")
    ,
    S("elec-no-24v-at-thermostat-bad-transformer", "No Heat or Cool and the Thermostat Is Blank",
      "The homeowner says nothing works, the thermostat screen is blank, and the batteries were just replaced. The furnace door is closed and the breaker is on.",
      "An air handler with a 24 V control transformer. The thermostat is a wired model that gets power from the equipment.",
      [
        ["Turn off the disconnect, lock and tag it, and prove the primary side dead before touching transformer wiring", "The unit is locked out and the primary leads are proven dead with a checked meter."],
        ["Check the simple things first: breaker, equipment switch, door switch, and any condensate float switch", "The breaker is on, the switch is on, and the door panel is seated. The drain pan is dry."],
        ["Look at the board fuse and the transformer for burn marks", "The fuse is intact. The transformer is hot to the touch after having been on, with a darkened side."],
        ["Measure the line voltage at the transformer primary when power is restored by a trained person using a rated meter", "Line voltage is present at the primary."],
        ["Measure the secondary voltage with the thermostat wires disconnected", "The secondary reads about zero volts, where roughly 24 V is expected."],
        ["Check for a short in the control wiring that may have burned the transformer", "The control wiring is clean. No short is found, and the transformer shows signs of age."],
        ["Jumper R to W at the board to get the heat running", "That bypasses the control circuit and does nothing to fix the missing 24 V. This is unsafe."]
      ],
      [
        ["The 24 V control transformer has failed: line voltage reaches the primary but the secondary makes nothing", "Primary voltage is present and the secondary reads about zero with the load disconnected."],
        ["The thermostat batteries are dead", "A wired model without batteries runs from the 24 V circuit, and the owner already replaced the batteries."],
        ["The breaker has tripped", "Line voltage was present at the transformer."],
        ["The thermostat is the fault", "A thermostat cannot explain missing voltage at the transformer secondary."]
      ],
      BP,
      "No 24 V with good line voltage at the primary points to the transformer. Check for a short before you replace it, and match its VA rating.")
    ,
    S("elec-thermostat-wrong-terminal-y-w-swap", "Heat Comes On When the Customer Asks for Cooling",
      "After a new thermostat went in yesterday, the customer says that on a hot day the furnace fires and the air blows warm when set to cool. The outdoor unit never starts.",
      "A gas furnace and a split air conditioner on one thermostat. The installer labeled wires by color and did not photograph the old wiring.",
      [
        ["Turn off the power to the equipment and lock it out before touching the thermostat sub-base or board terminals", "Power to the furnace is off and tagged. No terminals are jumpered."],
        ["Observe the symptom: set the thermostat to cool and note what starts", "The furnace burner sequence starts and the outdoor unit stays off."],
        ["Look at which terminal each wire lands on, and compare with the labels on the furnace board terminals", "The wire at Y on the thermostat goes to W on the board, and the wire at W goes to Y on the board."],
        ["Check for 24 V between R and C at the board", "24 V is present, so the transformer and common are fine."],
        ["With power off, trace each thermostat wire from the thermostat to the board terminal and label it with its terminal", "The two wires are crossed at the thermostat end only, and the wire colors do not follow the old pattern."],
        ["Land the wires so the thermostat terminal matches the equipment terminal, and then confirm both calls", "Cooling now calls for the outdoor contactor and heating calls for the burner, and the blower starts as expected."],
        ["Leave the wires as they are and reverse the thermostat settings so it behaves", "That hides the swap and leaves the system running the wrong equipment. This is unsafe."]
      ],
      [
        ["The Y and W wires are swapped, so the cooling call goes to the heat circuit", "Furnace runs on a cool call, 24 V is fine, and the swap is found at the terminals."],
        ["The transformer is weak", "24 V was present, and the wrong equipment responded."],
        ["The outdoor contactor has failed", "The cooling call never reached the contactor because it went to W."],
        ["The thermostat is defective", "Each wire worked once landed on the right terminal."]
      ],
      BP,
      "Terminals are calls, colors are only a guess. Photograph and label by terminal before disconnecting, and check the equipment board markings.")
    ,
    S("elec-ecm-blower-no-start", "Blower Does Not Run but the Board Is Calling for Fan",
      "The homeowner says the furnace lights, then shuts down because the indoor fan never starts. The motor was replaced last month by another company.",
      "A furnace with an ECM blower motor made of a motor and a module attached by a plug. The control board has a status light.",
      [
        ["Turn off the power, lock and tag it, and prove it dead. Allow the time the manufacturer lists before touching the module", "The furnace is locked out, proven dead, and the wait period has passed. The module is not run on its own."],
        ["Read the status light on the board and check the manufacturer's diagnostics for that unit", "The board shows it is calling for the fan, and no other error is shown."],
        ["Check the control settings, jumpers or menu for the blower", "The settings are in the range the manual lists. Nothing explains a stopped motor."],
        ["Confirm line power at the module plug when power is restored by a trained person using a rated meter", "Line power is present at the module as expected."],
        ["Confirm the control signal reaching the module, using the manufacturer's method or tool", "The board sends the signal on its output, but the module does not seem to respond."],
        ["With power off, check the motor by hand and by the maker's winding check, with the module disconnected", "The shaft turns with its normal magnet indexing, no roughness, and the windings check out. The motor is sound."],
        ["Apply line voltage straight to the motor leads with the module removed to see if it spins", "That is not a test, it can hurt you or the motor, and it bypasses the module. This is unsafe."]
      ],
      [
        ["The ECM module has power and a valid signal but is not driving a good motor, so the module is the likely fault", "Power present, signal present, motor mechanically and electrically sound."],
        ["The motor windings are shorted", "The winding check passed."],
        ["The airflow settings are wrong", "Settings matched the manual."],
        ["The control board is not calling for the fan", "The board showed a fan call and sent a signal."]
      ],
      BP,
      "Prove power, prove signal, then judge the motor. Replace the half that is bad, using the manufacturer's matching rules.")
    ,
    S("elec-meter-lead-fuse-false-reading", "Meter Says Zero Volts but the Panel Smells Hot",
      "A new apprentice says the meter reads zero volts on a circuit that should be live, and that the AC unit is dead. The customer says it was running a minute ago.",
      "A multimeter with a worn lead and a meter jack that may have been used on the current range earlier. The circuit is an outdoor disconnect feeding the condensing unit.",
      [
        ["Treat the circuit as live until proven otherwise. Before any contact, check the meter on a known live source and inspect the leads and jacks", "The meter reads zero on a known live source, so the meter or its leads cannot be trusted."],
        ["Look at the leads for cracks and the plugs for damage, and confirm they are in the voltage jacks", "One lead has a cracked jacket with a bent tip, and the lead sits in the amp jack."],
        ["Compare with a second meter rated for the place you are working", "A second meter, checked on a known live source first, reads full line voltage."],
        ["Check the first meter's fuse with continuity and read the manual for range and jack use", "The meter's internal fuse is open, which fits a past mistake with the probes across a live source on the current range."],
        ["Check that the circuit is really dead only after lockout, using the checked second meter, then check it again against the live source", "Line voltage proved on the live source, then dead after lockout, then the meter proved good again."],
        ["Replace the damaged lead, replace the fuse with the one the maker specifies, and label the meter for repair until then", "The repaired meter reads the known live source correctly."],
        ["Trust the zero reading and reach into the disconnect to save time", "A zero from a faulty meter can mean live parts, and this is unsafe. Always test your meter before and after."]
      ],
      [
        ["The meter has a damaged lead and a blown internal fuse, so its zero reading is false and the circuit is live", "The meter failed on a known source, a second meter read line voltage, and the lead and fuse were bad."],
        ["The circuit really is dead", "The second meter showed full voltage before lockout."],
        ["The disconnect has failed open", "The second meter showed voltage on the line side."],
        ["The apprentice used the wrong sort of meter category", "That matters for safety, but it does not explain the zero on a known live source."]
      ],
      BP,
      "Check the meter on a known live source before and after every dead test. A bad lead or blown fuse can make live look dead.")
    ,
    S("elec-ladder-diagram-open-safety", "Furnace Will Not Start and the Diagram Shows the Reason",
      "The customer says nothing at all happens when the thermostat calls. The thermostat is calling for heat, and the board has 24 V.",
      "A furnace with a ladder diagram on the inside door, showing the heat call rung in series with a limit switch, a rollout switch and a door switch before the gas valve coil.",
      [
        ["Shut off the power, lock and tag it, and prove it dead before opening any panel. Keep every safety switch in place", "Power is off and verified with a checked meter. No safety is jumpered."],
        ["Read the board code or light pattern and the legend on the unit diagram", "The light pattern points to an open safety circuit, and the legend lists the limit, rollout and door switches."],
        ["Find the dead device on the ladder: the gas valve coil rung. List every series contact to the left rail", "Three series contacts are listed: limit, rollout and door, in that order."],
        ["With power restored by a trained person, measure voltage across each series contact one at a time using a rated meter", "Across the limit and the door switch the reading is near zero, but across the rollout switch it reads the full 24 V."],
        ["Match the open contact to the real part: find the rollout switch and see how it resets", "The rollout switch is tripped and needs a manual reset after the cause is found."],
        ["Find why it tripped before resetting it, such as a blocked flue or a burner problem, and fix the cause", "The cause is found and fixed, then the switch is reset, and the unit runs through its sequence."],
        ["Jumper across the open rollout switch so the gas valve will open", "A tripped safety is telling you something is wrong, and jumpering it risks fire. This is unsafe."]
      ],
      [
        ["The rollout safety contact in series with the gas valve coil is open, so the rung cannot complete until the cause is fixed", "A reading of full voltage across one contact shows where the path stops, and it is a safety."],
        ["The gas valve coil is bad", "The coil never received power because the rung was open."],
        ["The thermostat is not calling for heat", "The thermostat was calling and the board had 24 V."],
        ["The door switch is open", "The reading across the door switch was near zero, so it is closed."]
      ],
      BP,
      "Trace backward from the dead device to the open contact. If the open contact is a safety, find and fix the cause. Never jumper it.")
  ]);
})();
