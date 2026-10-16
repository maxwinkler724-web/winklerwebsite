/* Trade Study Bench: electrical and controls flashcards (load after decks-data.js). Original wording. General method only; manufacturer instructions, site procedures and local rules always govern. DRAFT: owner review pending. */
(function () {
 if (!window.DECKS) window.DECKS = {};
 window.DECKS.electrical = {
  title: "HVAC electrical and controls",
  source: "Based on our free Electrical and controls lessons. General concepts only; manufacturer instructions, wiring diagrams, site procedures and local rules always govern.",
  free: [
   ["Voltage, current, resistance: what does each do?","Voltage is the push (volts), current is the flow (amps), resistance holds the flow back (ohms)."],
   ["Ohm's law in one line?","V = I x R. For many simple parts, current rises with voltage and falls as resistance rises."],
   ["Why does a loose, corroded connection get hot?","It adds resistance where there should be almost none, and current through resistance makes heat."],
   ["Line voltage vs low voltage in HVAC?","Line voltage runs motors, compressors and heaters and can kill. Low voltage, commonly 24 V AC, runs the controls."],
   ["What do meter safety category ratings tell you?","Higher categories are built for higher-energy places such as panels and motor circuits. Use a meter rated for where you are working."],
   ["Why do damaged leads or the wrong jack matter?","They can turn a reading into an accident. Use good leads in the correct jacks."],
   ["Which meter functions need power off and the part isolated?","Resistance and continuity. Never measure resistance on a live circuit."],
   ["What is the test-before-touch routine?","Check the meter on a known live source, test the circuit, then check the meter again."],
   ["What is lockout/tagout?","Procedures to shut down and isolate equipment so stored or residual energy cannot be released during work."],
   ["Name a hidden electrical energy source after power is off.","A capacitor, which can hold a charge. Treat it as charged until discharged by an approved method."],
   ["What does a capacitor do in a single-phase motor?","It shifts the current timing in a second winding, creating the rotating field the motor cannot make alone."],
   ["Start capacitor vs run capacitor?","A start capacitor helps get the motor going and drops out. A run capacitor stays in while the motor runs."],
   ["What is a dual-run capacitor?","One can serving the compressor and the condenser fan, with separate terminals for each."],
   ["Clues of a failing capacitor?","Hum with no start, slow start, a fan that needs a push, a bulged top, oil leaks or a burnt smell. These are clues, not proof."],
   ["How do you match a replacement capacitor?","Same microfarads. Voltage rating equal or higher, never lower."],
   ["What is a contactor?","A heavy-duty switch operated by a coil, built for higher current than a relay, used to power the compressor and fan."],
   ["Contactor signs of trouble?","Buzzing or chattering, pitted, burned or stuck contacts, a unit that will not start or will not shut off."],
   ["Should you ever jumper a contactor closed to make a unit run?","No. It bypasses control and protection."],
   ["What does a relay do?","A low-power coil signal switches a separate, higher-power circuit."],
   ["Normally open vs normally closed contact?","NO is open at rest and closes when energized. NC is closed at rest and opens when energized."],
   ["How does a transformer make 24 V?","Power enters the primary and a lower voltage leaves the secondary, with no direct connection between them. The turns ratio sets the voltage ratio."],
   ["What happens if a transformer is overloaded or shorted?","It can burn out. Transformers are rated in VA."],
   ["The control fuse keeps blowing. What now?","Find the short. Do not fit a larger fuse."],
   ["How does a cooling call travel through the 24 V circuit?","R to Y at the thermostat, through the contactor coil, and back to common. The coil closes contacts and line voltage reaches the outdoor unit."],
   ["How are safety switches usually wired in the control circuit?","In series, so if one opens the call cannot complete. An open safety is a clue; never jumper it."],
   ["What is a ladder diagram?","A map of a control circuit with two rails and rungs. Each rung shows the conditions on the left and the coil or load on the right."],
   ["In a ladder rung, what do series and parallel contacts mean?","Series: all must be closed (AND). Parallel branches: any one will do (OR)."],
   ["How do you trace a dead device on a ladder diagram?","Find its rung, work backward through every series contact to the left rail, and find the open one."],
   ["What do thermostat terminals R and C do?","R is the 24 V supply. C is the common, the return path to the transformer."],
   ["What do G, Y and W call for?","G is the indoor fan, Y is cooling or the compressor, W is heat."],
   ["What are O/B and E on a heat pump thermostat?","O/B controls the reversing valve and E is emergency heat. Follow the equipment instructions."],
   ["Are wire colors a reliable guide to terminals?","No. Identify wires by the terminal they land on and photograph and label before disconnecting."],
   ["Why does a smart thermostat want a C wire?","It has a screen and radio and needs steady power. Without a common some try to borrow power through other wires and misbehave."],
   ["PSC vs ECM blower motor?","PSC is an AC induction motor with a run capacitor and tap speeds. ECM is a brushless DC motor run by a control module."],
   ["What two things must an ECM module have to run the motor?","Line power and a valid control signal. Prove both before judging the motor."]
  ],
  premiumCount: 0
 };
})();
