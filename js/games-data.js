/* Training game content. General method only. Manufacturer procedures and fault tables always govern. */

window.SCENARIOS = [
  {
    "id": "iced-coil-dirty-filter",
    "title": "AC Not Cooling, Ice on the Coil",
    "customer": "The air from the vents has gotten warm and weak over the last few days. Now there is ice on the pipe going outside.",
    "setup": "The system is running but the airflow at the registers feels weak. You can see frost on the indoor coil line.",
    "checks": [
      { "id": "c1", "label": "Shut the system off at the thermostat and let the ice melt", "result": "The system stops and the ice begins to melt. You can now inspect safely without running a frozen coil.", "kind": "safety" },
      { "id": "c2", "label": "Inspect the air filter", "result": "The filter is packed with dust and lint and barely lets light through.", "kind": "simple" },
      { "id": "c3", "label": "Check that supply and return registers are open and unblocked", "result": "All registers are open. Nothing is blocking the returns.", "kind": "simple" },
      { "id": "c4", "label": "Look at the indoor coil face and blower wheel once the unit is off and locked out", "result": "The coil face has a layer of dust, and the blower wheel has some buildup.", "kind": "measure" },
      { "id": "c5", "label": "Measure airflow-related readings per the manufacturer's method after the filter is changed", "result": "With a clean filter and a thawed coil, airflow readings improve toward normal.", "kind": "measure" },
      { "id": "c6", "label": "Recover the refrigerant and replace the indoor coil", "result": "That is a big, costly job, and nothing found so far points to a failed coil.", "kind": "deep" },
      { "id": "c7", "label": "Add refrigerant right away to stop the icing", "result": "Adding refrigerant without finding a cause hides the real problem and can overcharge the system.", "kind": "wrong" }
    ],
    "diagnoses": [
      { "t": "Restricted airflow from a dirty filter and coil caused the coil to freeze", "correct": true, "why": "Low airflow lets the coil get too cold and freeze. Fix the airflow, thaw the coil, then confirm normal operation." },
      { "t": "The compressor has failed", "correct": false, "why": "A failed compressor would not normally leave you with a running system and a frozen coil. Nothing here points to it." },
      { "t": "The thermostat is wired wrong", "correct": false, "why": "A wiring mistake would cause control problems, not a coil covered in ice with a clogged filter." },
      { "t": "The outdoor fan motor is bad", "correct": false, "why": "The outdoor fan does not explain weak airflow and ice on the indoor coil." }
    ],
    "bestPath": ["c1", "c2", "c4"],
    "lesson": "Ice is usually a symptom, not the cause. Turn the system off to thaw it, then look for what restricted airflow before you touch the refrigerant side."
  },
  {
    "id": "furnace-flame-sensor",
    "title": "Furnace Lights, Then Shuts Off",
    "customer": "The furnace starts up, the burners light, and then everything shuts off after a few seconds. It keeps trying and quitting.",
    "setup": "The inducer runs, the burners ignite, and the flame goes out shortly after. The control board shows a flame-related fault when you check the LED.",
    "checks": [
      { "id": "c1", "label": "Turn off power and gas supply as needed, and check for gas odor or venting problems before working", "result": "No gas odor. The vent looks intact and clear. It is safe to continue.", "kind": "safety" },
      { "id": "c2", "label": "Check the board LED and compare the flash code with the manufacturer fault table", "result": "The code points to a loss of flame or a flame sensing issue.", "kind": "simple" },
      { "id": "c3", "label": "Check the furnace filter and the thermostat call", "result": "The filter is a little dirty but not blocking the unit. The thermostat call is steady.", "kind": "simple" },
      { "id": "c4", "label": "Inspect the flame sensor rod and its wire connection with power off", "result": "The rod has a dark coating on it, and the connection is snug.", "kind": "measure" },
      { "id": "c5", "label": "Clean the sensor gently per the manufacturer and confirm the unit holds flame through a full cycle", "result": "After cleaning, the burners stay lit and the furnace runs a full heating cycle.", "kind": "measure" },
      { "id": "c6", "label": "Replace the heat exchanger", "result": "A very expensive repair, and nothing you found suggests the heat exchanger is the issue.", "kind": "deep" },
      { "id": "c7", "label": "Jumper the flame circuit so the board thinks it sees flame", "result": "That defeats a safety. It could let gas flow with no flame and is never acceptable.", "kind": "wrong" }
    ],
    "diagnoses": [
      { "t": "Dirty flame sensor not proving flame to the control board", "correct": true, "why": "A coated sensor cannot prove flame, so the board closes the gas valve as a safety. Cleaning it restored normal operation." },
      { "t": "The thermostat is failing", "correct": false, "why": "The call stays steady and the burners do light, so the thermostat is doing its job." },
      { "t": "The gas line is empty", "correct": false, "why": "The burners lit, so gas is reaching them." },
      { "t": "The blower motor is seized", "correct": false, "why": "A blower problem would not shut the flame off right after ignition with a flame fault code." }
    ],
    "bestPath": ["c1", "c2", "c4"],
    "lesson": "Never bypass a flame safety. Read the fault, inspect the sensing part, and confirm the fix by watching a full cycle."
  },
  {
    "id": "a2l-sensor-lockout",
    "title": "A2L System Locked Out on a Leak Sensor Fault",
    "customer": "The newer air conditioner stopped cooling, and a fault light is on. A previous visit said it might just need the sensor bypassed.",
    "setup": "The unit uses a refrigerant leak detection sensor and is showing a sensor fault with the system locked out. There is no sign of a leak odor or oil on the lines.",
    "checks": [
      { "id": "c1", "label": "Ventilate the area and follow the manufacturer's safety steps before working on the unit", "result": "The space is ventilated. No signs of a leak. You can proceed with normal care.", "kind": "safety" },
      { "id": "c2", "label": "Read the fault code and look it up in the manufacturer's fault table", "result": "The table lists the code as a sensor communication or sensor circuit fault, not a confirmed leak. (Brands differ in how a sensor fault is handled, so the manual governs.)", "kind": "simple" },
      { "id": "c3", "label": "Check the thermostat and system power", "result": "Power and thermostat call are normal. The lockout is coming from the sensor fault.", "kind": "simple" },
      { "id": "c4", "label": "Inspect the sensor connector and its wiring for damage or a loose plug", "result": "The sensor connector is partly unseated and the plug latch is cracked.", "kind": "measure" },
      { "id": "c5", "label": "After reseating or replacing the connector, verify sensor operation as the manufacturer directs", "result": "The fault clears and the sensor verifies normally per the manufacturer's procedure.", "kind": "measure" },
      { "id": "c6", "label": "Recover all the refrigerant and replace the evaporator coil", "result": "A major job with no evidence of a leak. Not justified by what you found.", "kind": "deep" },
      { "id": "c7", "label": "Bypass or disable the leak sensor so the unit will run", "result": "Defeating a leak-detection safety is unsafe and not allowed. The fault must be fixed, not hidden.", "kind": "wrong" }
    ],
    "diagnoses": [
      { "t": "Sensor wiring or connection fault, found using the manufacturer's fault table", "correct": true, "why": "The table pointed to a sensor circuit fault and the connector was the cause. Repair it and verify operation per the manufacturer." },
      { "t": "Bypass the sensor to restore cooling", "correct": false, "why": "Never bypass a safety. It removes protection that is there for a reason." },
      { "t": "The compressor needs replacing", "correct": false, "why": "Nothing in the fault table or inspection points to the compressor." },
      { "t": "The customer set the thermostat wrong", "correct": false, "why": "The thermostat call was normal. The lockout came from the sensor fault." }
    ],
    "bestPath": ["c1", "c2", "c4"],
    "lesson": "A sensor fault is not proof of a leak, but some makers' units respond to a sensor fault much as they would to a leak (extra ventilation airflow, compressor held off), so stay careful until you rule a leak out. It is never permission to bypass anything. Use the fault table, fix the real cause, and verify per the manufacturer."
  },
  {
    "id": "ecm-blower-no-run",
    "title": "ECM Blower Will Not Run",
    "customer": "The system calls for heat or cooling but no air comes out. The outdoor unit may run, and the house is not changing temperature.",
    "setup": "The thermostat is calling, but the indoor blower is not turning. The motor is a variable-speed ECM type.",
    "checks": [
      { "id": "c1", "label": "Turn off and lock out power before opening the blower compartment", "result": "Power is off and locked out. You can safely look at the motor and wiring.", "kind": "safety" },
      { "id": "c2", "label": "Check the breaker, the service switch, and the door switch", "result": "The breaker and switches are on and the door switch is making contact.", "kind": "simple" },
      { "id": "c3", "label": "Confirm the thermostat is calling for the fan", "result": "The thermostat is calling and the board is receiving the signal.", "kind": "simple" },
      { "id": "c4", "label": "With power restored, check whether the motor is receiving line power as the manufacturer describes", "result": "The motor is receiving power. The problem is not a lack of supply.", "kind": "measure" },
      { "id": "c5", "label": "Check whether the control signal from the board to the motor is present", "result": "No control signal is reaching the motor. A loose signal harness plug is found at the motor.", "kind": "measure" },
      { "id": "c6", "label": "Replace the whole motor and control module right away", "result": "That is an expensive part, and a loose plug was the actual cause.", "kind": "deep" },
      { "id": "c7", "label": "Wire the motor directly to line power to force it to run", "result": "An ECM is meant to be driven by its control signal, not line power alone. Forcing it skips its controls and is unsafe.", "kind": "wrong" }
    ],
    "diagnoses": [
      { "t": "Motor has power but is missing its control signal due to a loose harness connection", "correct": true, "why": "Power was present and signal was not. Reseating the harness restores the signal path." },
      { "t": "The motor has no power because of a tripped breaker", "correct": false, "why": "The breaker was on and the motor was receiving power." },
      { "t": "The air filter is the cause", "correct": false, "why": "A dirty filter reduces airflow but does not stop the blower from turning at all." },
      { "t": "The outdoor unit contactor is welded", "correct": false, "why": "That is an outdoor issue and would not stop the indoor blower from getting its signal." }
    ],
    "bestPath": ["c1", "c2", "c5"],
    "lesson": "With an ECM, split the problem in two: does it have power, and does it have a signal? Many no-run calls are a signal connection."
  },
  {
    "id": "inverter-comm-fault",
    "title": "Inverter Outdoor Unit Communication Fault",
    "customer": "The mini-split indoor unit shows an error and nothing starts. It worked fine until a storm last week.",
    "setup": "The indoor head is powered and displaying a fault. The outdoor unit is not starting.",
    "checks": [
      { "id": "c1", "label": "Turn off and lock out power to both units before touching the wiring", "result": "Both units are de-energized. You can open the covers and inspect connections.", "kind": "safety" },
      { "id": "c2", "label": "Look up the displayed fault code in the manufacturer's table", "result": "The table lists it as an indoor to outdoor communication error.", "kind": "simple" },
      { "id": "c3", "label": "Check that power is present at the disconnect and breaker for both units", "result": "Power is present. This is not a simple supply loss.", "kind": "simple" },
      { "id": "c4", "label": "Inspect the wiring between the indoor and outdoor units at the terminals", "result": "One of the interconnecting wires at the outdoor terminal is loose and corroded.", "kind": "measure" },
      { "id": "c5", "label": "Reconnect the wiring as shown on the manufacturer's diagram and verify the fault clears", "result": "Communication returns, the fault clears, and the outdoor unit starts normally.", "kind": "measure" },
      { "id": "c6", "label": "Replace the outdoor control board", "result": "A costly part, and the loose wire explains the fault without any board failure.", "kind": "deep" },
      { "id": "c7", "label": "Jumper the communication terminals to clear the error", "result": "Jumpering communication lines will not fix the fault, can risk the boards, and hides the real problem.", "kind": "wrong" }
    ],
    "diagnoses": [
      { "t": "Loose interconnecting wiring between indoor and outdoor units", "correct": true, "why": "The code pointed at communication, and a loose, corroded terminal was found. Fixing it restored communication." },
      { "t": "The outdoor control board has failed", "correct": false, "why": "The wiring explains the fault. Do not replace expensive boards before checking connections." },
      { "t": "Refrigerant is overcharged", "correct": false, "why": "An overcharge would not show up as a communication error." },
      { "t": "The remote control batteries are dead", "correct": false, "why": "The indoor head is powered and displaying a communication fault. Batteries are not the issue." }
    ],
    "bestPath": ["c1", "c2", "c4"],
    "lesson": "Communication faults often come down to connections. Check the wiring and terminals against the manufacturer's diagram before blaming a board."
  },
  {
    "id": "steam-vent-clogged",
    "title": "One-Pipe Steam Radiator Will Not Heat",
    "customer": "One radiator stays cold while the others get hot. It also makes no hissing sound like the others do.",
    "setup": "The boiler is running and other radiators are heating. This radiator has an air vent on the side, and the valve at the inlet is open.",
    "checks": [
      { "id": "c1", "label": "Let the system cool and be aware of hot steam and surfaces before touching anything", "result": "You wait for the radiator and vent to cool, avoiding burns before working.", "kind": "safety" },
      { "id": "c2", "label": "Confirm the radiator inlet valve is fully open", "result": "The valve is fully open.", "kind": "simple" },
      { "id": "c3", "label": "Check the thermostat call and whether the boiler is making steam", "result": "The boiler makes steam, and the other radiators prove it is working.", "kind": "simple" },
      { "id": "c4", "label": "Remove the air vent once cool and see whether air can pass through it", "result": "The vent is clogged and will not let air out. Steam cannot enter the radiator while air is trapped.", "kind": "measure" },
      { "id": "c5", "label": "Install a correct replacement vent and watch the radiator fill with steam", "result": "Air escapes, steam fills the radiator, and it heats evenly.", "kind": "measure" },
      { "id": "c6", "label": "Replace the boiler", "result": "A huge expense. Other radiators are heating, so the boiler is not the problem.", "kind": "deep" },
      { "id": "c7", "label": "Remove the vent entirely and leave the port open to let air out", "result": "An open port lets steam and hot water spray out, which is dangerous.", "kind": "wrong" }
    ],
    "diagnoses": [
      { "t": "Clogged air vent is trapping air so steam cannot enter the radiator", "correct": true, "why": "Steam must push air out of the radiator. A blocked vent keeps the air in and the radiator cold." },
      { "t": "The boiler cannot make steam", "correct": false, "why": "Other radiators are heating, so steam is being made." },
      { "t": "The thermostat is set too low", "correct": false, "why": "The other radiators heat from the same call. This one is the exception." },
      { "t": "The pipe is full of refrigerant", "correct": false, "why": "Steam systems do not use refrigerant." }
    ],
    "bestPath": ["c1", "c2", "c4"],
    "lesson": "In a one-pipe steam system, air must get out for steam to get in. A clogged vent is a cheap and common cause of a cold radiator."
  },
  {
    "id": "hydronic-zone-air",
    "title": "Hot-Water Zone Is Cold",
    "customer": "One zone in the house is cold. The other zones are warm, and there is a gurgling sound in the pipes.",
    "setup": "The boiler is running and the other zones heat. The cold zone's pipes sound gurgly and the baseboard is barely warm.",
    "checks": [
      { "id": "c1", "label": "Let hot piping cool and take care around hot water before opening anything", "result": "You let the system cool enough to work without scalding risk.", "kind": "safety" },
      { "id": "c2", "label": "Check the thermostat for that zone and confirm it is calling", "result": "The zone thermostat is calling for heat.", "kind": "simple" },
      { "id": "c3", "label": "Confirm the zone valve or circulator opens when the zone calls", "result": "The zone valve opens and the circulator runs.", "kind": "simple" },
      { "id": "c4", "label": "Listen and feel the zone piping for air and compare it to the working zones", "result": "The zone sounds gurgly, which suggests air trapped in the loop.", "kind": "measure" },
      { "id": "c5", "label": "Purge the air from the zone using the proper purge procedure, then confirm flow returns", "result": "After purging, the gurgling stops and the baseboard warms up.", "kind": "measure" },
      { "id": "c6", "label": "Replace the boiler or all the piping in the zone", "result": "A major cost. A simple purge fixed it, so this was not needed.", "kind": "deep" },
      { "id": "c7", "label": "Open the drain wide and flush hot water onto the floor", "result": "That risks burns and water damage, and does not follow a proper purge procedure.", "kind": "wrong" }
    ],
    "diagnoses": [
      { "t": "Air trapped in the zone loop is blocking circulation", "correct": true, "why": "Air pockets stop water from flowing, so the zone stays cold. Purging removes the air and restores flow." },
      { "t": "The boiler has failed completely", "correct": false, "why": "Other zones are warm, so the boiler is making heat." },
      { "t": "The thermostat is not calling", "correct": false, "why": "The thermostat was calling and the valve opened." },
      { "t": "The house needs a bigger boiler", "correct": false, "why": "Other zones heat fine, so size is not the cause of one cold zone." }
    ],
    "bestPath": ["c1", "c3", "c4"],
    "lesson": "When one hydronic zone is cold and others work, check call, valve, and circulation, then think air in the loop and purge properly."
  },
  {
    "id": "heat-pump-ice-defrost",
    "title": "Heat Pump Ice on the Outdoor Coil",
    "customer": "In cold weather the outdoor unit is covered in ice and the house is not warming up well.",
    "setup": "The heat pump is running in heating. The outdoor coil has a thick coating of ice and the unit looks buried in debris and leaves along one side.",
    "checks": [
      { "id": "c1", "label": "Turn the system off and stay clear of fan blades, and be careful of falling ice and slick footing", "result": "The unit is off. You can safely inspect the outdoor coil area without moving parts or ice hazards.", "kind": "safety" },
      { "id": "c2", "label": "Check around the outdoor unit for blocked airflow such as debris, leaves, or snow", "result": "Leaves and debris are packed against one side, blocking airflow.", "kind": "simple" },
      { "id": "c3", "label": "Check that the indoor filter and indoor airflow are normal", "result": "The indoor filter is acceptable and indoor airflow appears normal.", "kind": "simple" },
      { "id": "c4", "label": "Clear the obstruction and observe whether the unit goes through a defrost cycle as the manufacturer describes", "result": "With airflow restored, the unit enters and completes a defrost cycle and the ice clears.", "kind": "measure" },
      { "id": "c5", "label": "Verify the defrost controls and sensors operate per the manufacturer if ice returns", "result": "Defrost controls operate as described by the manufacturer. No faults found.", "kind": "measure" },
      { "id": "c6", "label": "Replace the outdoor coil or compressor", "result": "A major, costly repair, and nothing found points to a failed coil or compressor.", "kind": "deep" },
      { "id": "c7", "label": "Chip the ice off the coil with a screwdriver", "result": "That can puncture the coil and cause a refrigerant leak. It is the wrong way to remove ice.", "kind": "wrong" }
    ],
    "diagnoses": [
      { "t": "Blocked outdoor airflow, with defrost operation then confirmed per the manufacturer", "correct": true, "why": "Debris blocked the coil. Clearing it and confirming defrost operation fixed the ice build-up." },
      { "t": "The compressor needs to be replaced", "correct": false, "why": "No evidence supports this. Check airflow and defrost operation first." },
      { "t": "The thermostat is too cold", "correct": false, "why": "A thermostat setting does not cause ice on the outdoor coil." },
      { "t": "The customer needs a bigger unit", "correct": false, "why": "Sizing was not shown to be the issue. The coil was blocked." }
    ],
    "bestPath": ["c1", "c2", "c4"],
    "lesson": "Some ice is normal in winter, but heavy ice calls for a check of airflow and defrost operation before anything expensive."
  }
];

window.SEQUENCES = [
  {
    "id": "lockout-before-panel",
    "title": "Lockout Before Opening a Panel",
    "intro": "Before you open an electrical panel, put the equipment in a safe state in the right order.",
    "steps": [
      "Tell the customer or site contact that the equipment will be shut off",
      "Turn the equipment off at the normal controls",
      "Open the disconnect to remove power",
      "Apply your lock and tag to the disconnect",
      "Test with a meter that power is really off",
      "Open the panel and begin work"
    ],
    "why": "Never trust a switch or a label alone. The OSHA lockout/tagout standard (29 CFR 1910.147) has the same shape: prepare, shut down, isolate, lock and tag, deal with stored energy, then verify before work. Follow your employer's and the manufacturer's procedures."
  },
  {
    "id": "safe-recovery",
    "title": "Safe Recovery Workflow",
    "intro": "Recovery follows a general path of prepare, connect, recover, and verify under EPA rules.",
    "steps": [
      "Confirm you are certified and that the refrigerant type is known",
      "Check that the recovery machine and cylinder are approved for that refrigerant",
      "Wear safety gear and connect hoses to the system and the recovery equipment",
      "Run the recovery as the equipment instructions direct",
      "Reach the evacuation level the rules require for that appliance and verify it before opening the system",
      "Close the valves, disconnect, and keep the records the rules require"
    ],
    "why": "Recovery is regulated. Follow EPA rules, the machine maker's instructions, and keep records."
  },
  {
    "id": "leak-check-approach",
    "title": "Leak Check Approach",
    "intro": "A general method for finding a leak, with awareness of nitrogen hazards.",
    "steps": [
      "Make sure the system is safe to work on and the refrigerant is handled legally",
      "Do a visual check for oil stains, damage, and loose fittings",
      "Use an electronic leak detector or other approved method around joints and components",
      "If pressure testing, use nitrogen with a regulator and follow the manufacturer's limits",
      "Mark each suspected leak and confirm it",
      "Repair the leak and re-test before putting the system back into service"
    ],
    "why": "Nitrogen is a suitable test gas only when you use a regulator and stay within the equipment limits. Never connect bare cylinder pressure to a system, and do not use oxygen or shop compressed air (moisture and oxygen do not belong inside a refrigerant circuit)."
  },
  {
    "id": "a2l-commissioning",
    "title": "Commissioning a New A2L System Sensor",
    "intro": "A general order for confirming a leak sensor is installed and working on a new system.",
    "steps": [
      "Read the manufacturer's installation and commissioning manual",
      "Verify the sensor is mounted and wired as the manual shows",
      "Power the system up and check that no sensor faults are displayed",
      "Verify sensor operation using the manufacturer's test method",
      "Confirm the system responds as the manufacturer describes",
      "Document the results and leave the paperwork with the owner"
    ],
    "why": "Sensors protect people. Verify them exactly as the manufacturer directs, and write down what you did."
  },
  {
    "id": "furnace-no-heat",
    "title": "Furnace No-Heat Check Order",
    "intro": "A sensible order to work through when a gas furnace will not heat.",
    "steps": [
      "Check for gas odor and venting safety before anything else",
      "Confirm the thermostat is set to heat and is calling",
      "Check power at the breaker, switch, and door switch",
      "Check the filter and the airflow path",
      "Read the control board fault code and use the manufacturer's table",
      "Test the part the code points to and repair it"
    ],
    "why": "Safety first, then simple checks, then the fault table. Do not skip to replacing parts."
  },
  {
    "id": "steam-no-heat",
    "title": "Steam Radiator No-Heat Check Order",
    "intro": "A sensible order to work through when a steam radiator stays cold.",
    "steps": [
      "Let the system cool and take care around hot steam and surfaces",
      "Check that the boiler is making steam and other radiators are heating",
      "Confirm the radiator inlet valve is open",
      "Check that the radiator is pitched correctly and not full of water",
      "Check the air vent and clear or replace it if blocked",
      "Run the system and confirm the radiator fills with steam"
    ],
    "why": "Steam needs a path in and a way for air to leave. Start simple, and start with the vent."
  }
];

window.PAIRS = [
  {
    "id": "cooling-symptoms",
    "title": "Cooling Symptoms and Likely Causes",
    "pairs": [
      ["Ice on the indoor coil", "Restricted airflow or a refrigerant-side problem"],
      ["Weak airflow from registers", "Dirty filter or blocked air path"],
      ["Warm air with the outdoor fan not running", "Failed fan motor or capacitor"],
      ["Water leaking near the indoor unit", "Clogged condensate drain"],
      ["Indoor blower runs but outdoor unit does not", "Missing control voltage or a failed outdoor component"],
      ["Breaker trips when the system starts", "Electrical overload or a shorted component"]
    ]
  },
  {
    "id": "refrigerant-classes",
    "title": "Refrigerant Safety Classes in Plain Words",
    "pairs": [
      ["A1", "Low toxicity and does not burn"],
      ["A2L", "Low toxicity and mildly flammable, hard to ignite"],
      ["A3", "Low toxicity and highly flammable"],
      ["B", "Higher toxicity"],
      ["Letter in the class", "Describes toxicity: A is lower, B is higher"],
      ["Number in the class", "Describes flammability: 1 is none, 2L is mild, 3 is high"]
    ]
  },
  {
    "id": "component-jobs",
    "title": "Component and Its Job",
    "pairs": [
      ["ECM", "Variable-speed blower motor driven by a control signal"],
      ["Inverter", "Varies compressor speed to match the load"],
      ["Control board", "Brain that runs the sequence and shows fault codes"],
      ["Steam trap", "Lets condensate pass but holds back live steam"],
      ["PRV", "Pressure relief valve that opens to protect against overpressure"],
      ["Zone valve", "Opens or closes hot-water flow to one area"]
    ]
  },
  {
    "id": "fault-first-check",
    "title": "Fault Clue and First Check",
    "pairs": [
      ["Flame fault code", "Inspect the flame sensor and its connection"],
      ["Communication error between units", "Inspect the wiring between them"],
      ["Sensor fault code on an A2L unit", "Look it up in the manufacturer's fault table"],
      ["No blower on a call for air", "Check power, then the control signal"],
      ["Heavy ice on a heat pump outdoor coil", "Check airflow and obstruction, then defrost operation"],
      ["Cold hydronic zone with gurgling", "Check for air in the zone"]
    ]
  },
  {
    "id": "steam-hydronic-vocab",
    "title": "Steam and Hydronic Vocabulary",
    "pairs": [
      ["One-pipe steam", "Steam and condensate share a single pipe"],
      ["Air vent", "Lets air out of a radiator so steam can enter"],
      ["Water hammer", "Banging caused by steam meeting trapped water"],
      ["Circulator", "Pump that moves hot water through a loop"],
      ["Purge", "Removing air from a hydronic loop"],
      ["Baseboard", "Finned pipe that gives off heat along a wall"]
    ]
  }
];
