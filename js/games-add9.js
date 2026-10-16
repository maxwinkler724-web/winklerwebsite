/* More training game content (A2L alarm handling, mini-split install and cleaning, ice machine, reach-in defrost, steam trap testing, chiller start-up, tower VFD reset, BAS trends, ERV/HRV, and homeowner furnace and drain calls). Loads AFTER games-data.js and games-add.js through games-add8.js. General method only. Manufacturer procedures and fault tables always govern. */
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
    S("a2l-alarm-sealant-vapors-false-trip", "Air Handler Blower Running With No Call and a Flashing Board",
      "The homeowner says the indoor fan came on by itself, the cooling stopped, and a light on the air handler is flashing. Someone was finishing the closet this week.",
      "An A2L split system air handler with a refrigerant detection board. The blower is running with no thermostat call and the compressor is off.",
      [
        ["Treat the alarm as possibly real: ventilate the space, keep sparks and flame away, and do not jumper or unplug the sensor", "The area is ventilated and no ignition sources are nearby. The detection system stays connected and powered."],
        ["Read the board light pattern and note active versus past codes before touching anything", "The light shows an active refrigerant alarm. A photo of the label, lights and wiring is taken."],
        ["Ask what was built, painted or sealed near the equipment", "Adhesive and sealant were used in the closet two days ago, and the doors were kept shut."],
        ["Search the coil, flares and fittings with a handheld leak detector that suits the refrigerant, never a flame", "No leak is found at the indoor coil, the line set joints or the service valves."],
        ["Check the sensor harness and plugs for damage or looseness", "The harness is seated and undamaged, and the board is not showing a sensor communication error."],
        ["After the space is ventilated, wait and power-cycle per the manual, then confirm the board releases and all mitigation responses end as described", "The alarm clears once the air is clean, the blower stops, and cooling and heating calls work again."],
        ["Bridge the sensor connection so the unit will run again", "That defeats the safety function and leaves the system with no leak protection. This is unsafe."]
      ],
      [
        ["Solvent or sealant vapors set off the detection board, and the leak search found no refrigerant", "An active alarm, recent adhesives nearby, a clean leak search, intact wiring, and a normal release after ventilation."],
        ["The coil has a real leak that the handheld tool cannot find", "The leak search was clean and the alarm cleared after ventilation, so a live leak is not supported."],
        ["The sensor harness has a communication fault", "The board did not show a communication error and the plugs were seated."],
        ["The sensor is defective and should be bypassed", "Nothing showed a sensor error, and bypassing a safety is never the answer."]
      ],
      BP,
      "Treat every mitigation alarm as possibly real, sort the cause, and verify the response after repair. Never bypass the sensor.")
    ,
    S("minisplit-install-no-fall-drain-no-test", "New Mini-Split Drips Inside the Wall After a Hot Week",
      "The customer says their new ductless unit was installed last month and now water runs down the wall under it when cooling.",
      "A wall-mounted ductless indoor unit with the drain hose routed along the wall and out through a sleeve. The unit cools normally.",
      [
        ["Switch the unit off at the disconnect and keep water away from electrical parts before opening any cover", "Power is off and verified. The wall and the floor below are protected."],
        ["See where the water appears and look at the indoor pan and drain connection", "Water overflows at the lower edge of the unit. The drain pan is full."],
        ["Trace the drain hose along its full path", "A section sags in the wall cavity, and the hose does not fall continuously toward the outlet."],
        ["Pour a measured amount of water into the pan in cooling mode and watch where it goes", "Water drains slowly, collects in the sag, and backs up to the pan."],
        ["Check that the hose is pushed fully on, clamped and supported at intervals", "The hose is on its fitting but is not supported, which allowed the dip."],
        ["Compare the layout with the install manual's drain slope and air-vent guidance, then correct the run and retest", "After re-routing the hose with a continuous fall and supporting it, the water test drains freely."],
        ["Seal the wall opening and hope the drip stops", "Hiding the leak leaves the sag, which keeps filling the pan. This does not fix the cause."]
      ],
      [
        ["The condensate drain hose sags without a continuous fall, so water backs up and overflows the pan", "A full pan, a visible sag, a slow water test, and a clean drain after re-routing."],
        ["The refrigerant line flares are leaking", "Water was condensate from the pan, and the cooling performance was normal."],
        ["The coil is frozen from low airflow", "There was no ice, and the water level matched the blocked drain."],
        ["The outdoor unit is too low on charge", "The unit cooled normally and the problem was water exiting the unit."]
      ],
      BP,
      "A drain with no fall is a service call waiting to happen. Give condensate a continuous slope and test it with water before you leave.")
    ,
    S("minisplit-fault-after-cleaning-wet-board", "Mini-Split Shows an Error After a Cleaning Visit",
      "The owner says a cleaning service washed the indoor unit yesterday. Now it will not run and a light keeps blinking.",
      "A wall-mounted ductless indoor unit that was washed in place. There is a musty smell, and the unit has an error blink.",
      [
        ["Shut off the breaker and wait before removing the front panel; keep water away from the board", "Power is off. The panel is removed with the breaker still off."],
        ["Note the blink pattern and look for water in the cabinet", "A fault blink is shown. There are water drops near the lower part of the cabinet."],
        ["Inspect the circuit board and connectors for moisture, residue or loose plugs", "The board has moisture on one connector, and a plug at the fan motor is slightly loose."],
        ["Let the board and connectors dry completely and reseat the loose plug with power still off", "After drying and reseating, the connectors are dry and fully seated."],
        ["Check the drain pan and hose for free flow", "The pan drains, but the pan has a slimy film that holds water longer."],
        ["Restore power and run the unit while watching the blower wheel and the fault light", "The fault clears, the wheel turns, and the drain flows. The pan is cleaned to cut the musty smell."],
        ["Spray more water inside the cabinet to rinse away the smell", "That puts more water on the board and wiring. This does not help."]
      ],
      [
        ["Water reached the board or a connector during cleaning, and a plug was left loose", "Moisture at a connector, a loose motor plug, and a cleared fault after drying and reseating."],
        ["The compressor in the outdoor unit has failed", "The fault was linked to the indoor unit after cleaning, and normal operation returned."],
        ["The remote control is defective", "The unit showed a real fault code and recovered after the connectors were dried."],
        ["The refrigerant charge is wrong", "Nothing about the charge changed, and a dry board cleared the problem."]
      ],
      BP,
      "After a wet cleaning, a fault usually means water on a board or a loose connector. Power off first, cover boards, and test the drain before leaving.")
    ,
    S("ice-machine-descale-skipped-hard-water", "Ice Machine Makes Small, Thin Ice and Runs Long",
      "The cafe manager says the cube ice machine makes less ice every month. It has not been cleaned in over a year, and the local water is hard.",
      "A cube-type ice machine with a visible white crust on the water distribution parts. Water is supplied through an old inlet filter.",
      [
        ["Turn the machine off, remove the ice from the bin, follow lockout steps, and wear gloves and eye protection", "Power is off and tagged. The bin is empty and gloves and eye protection are on."],
        ["Look at the evaporator, spray tubes and float for white crust", "The plate and spray holes have heavy scale. Some spray holes are clogged."],
        ["Ask when the machine was last cleaned and how the water is treated", "No cleaning record exists, and the old filter has not been changed."],
        ["Measure how long the freeze cycle runs compared with the maker's example for this model", "The freeze cycle is much longer than the maker's example, which fits an insulated, scaled plate."],
        ["Check refrigerant-side basics: condenser airflow and a clean air filter", "The air filter and condenser are clean, and airflow is fine."],
        ["Run the maker-approved descaler, then the separate sanitizer step, then rinse and check for chemical smell before making ice", "After descaling, sanitizing, soaking the listed parts with a nylon brush and rinsing, ice size and cycle time improve."],
        ["Clean it with vinegar and a household cleaner because it is on hand", "The maker's sheet warns against unapproved chemicals and mixing. This is unsafe and may harm the machine."]
      ],
      [
        ["Mineral scale from hard, untreated water has insulated the plate and clogged the spray, so freezing is slow and ice is thin", "Heavy crust, a long freeze cycle, clean condenser airflow, and recovery after the descale and sanitize routine."],
        ["The compressor is failing", "The condenser and airflow were fine, and cleaning restored output."],
        ["The refrigerant is overcharged", "The visible scale and cycle time pointed to a water-side problem."],
        ["The bin thermostat setting is wrong", "The machine ran long and made thin ice, not an early shutoff."]
      ],
      BP,
      "Descale, then sanitize, then rinse, with the maker's chemicals. Hard water means shorter intervals and a proper filter.")
    ,
    S("reach-in-iced-coil-torn-gasket", "Reach-In Cooler Is Warm and the Coil Is Covered in Frost",
      "The cafe cook says the reach-in cooler for dairy has been warming up all week, with water on the floor in front and fog on the door frame.",
      "A reach-in cooler with an evaporator behind a panel and a gasket on each door. The unit runs nearly all the time.",
      [
        ["Lock out power before opening the evaporator panel", "Power is off and tagged. The panel is opened safely."],
        ["Look at the evaporator coil and the drain", "A thick layer of frost covers the coil, and the drain pan area has standing water."],
        ["Check the door gaskets with the paper test and look for tears or warped spots", "The paper slides out easily at one corner, and the gasket is torn there."],
        ["Check that the cabinet is level and that the door switch stops the evaporator fans when the door is open", "The cabinet is level and the switch works."],
        ["Verify the defrost clock and the termination sensor operate as the manual describes", "Defrost starts on time and ends on the sensor, and the clock is correct."],
        ["Thaw the coil, clear the drain, replace the torn gasket, and confirm temperature recovery and fan restart delay", "After thawing and replacing the gasket, the coil stays clear and the cabinet pulls down."],
        ["Chip the frost off the coil with a screwdriver", "Fins and tubing can be punctured. This is unsafe and risks a refrigerant leak."]
      ],
      [
        ["A torn gasket lets humid room air in, which turns to frost on the coil and chokes the airflow", "A thick frost layer, a failed paper test at one corner, and normal defrost controls."],
        ["The defrost timer has failed", "Defrost started and ended as the manual describes."],
        ["The condenser is dirty", "The symptoms were frost, water and fog, not high head pressure."],
        ["The evaporator fan motor is bad", "The fans turned, and airflow choked by frost, not a dead motor, was the issue."]
      ],
      BP,
      "Moisture is the enemy of reach-ins. Check the gasket, drain and defrost together before replacing parts.")
    ,
    S("steam-trap-cold-inlet-stalled-under-control-valve", "Steam Trap Looks Cold but Replacements Did Not Help",
      "The facility lead says a trap on a heating coil has been replaced twice because it runs cold, and the coil still heats poorly.",
      "A steam coil with a modulating control valve upstream, a strainer, a trap, and a return line. A handheld temperature gun and an ultrasonic tester are available.",
      [
        ["Follow site permit and lockout rules, wear heat-rated gloves and eye protection, and stay out of the discharge path", "Permit approved. Protective gear is on and the position is clear of discharge."],
        ["Check the coil load and the control valve position", "The control valve is modulating near its low end because the heat demand is light."],
        ["Read the trap inlet temperature with the temperature gun", "The inlet side is cooler than steam temperature, and the trap is cold on the outlet."],
        ["Use ultrasound to listen to the trap", "The trap is nearly silent, with no leak sound."],
        ["Look at the strainer, check valve and bypass valve around the trap", "The strainer is clean, the bypass is closed, and the check valve is open."],
        ["Compare steam pressure at the coil with the trap's rating and the control valve behavior", "At low load the coil pressure is low, so condensate cannot push out and the trap stalls."],
        ["Replace the trap a third time because it is cold", "Temperature alone cannot prove a trap has failed, and a new trap will not cure a stall. This does not help."]
      ],
      [
        ["The coil is stalling under the modulating control valve at low load, so the trap is not bad", "A cold, silent trap plus a low-end valve position and low coil pressure. Replacement traps changed nothing."],
        ["The trap has failed open", "A failed open trap would be noisy and hot with live steam."],
        ["The strainer is plugged", "The strainer was clean."],
        ["The trap is the wrong size and needs to be larger", "Nothing showed a sizing problem, and the stall matched the low load."]
      ],
      BP,
      "Use two methods, then check the equipment around the trap. A stall under a control valve can look like a bad trap.")
    ,
    S("chiller-startup-condenser-flow-not-proven", "Chiller Will Not Start in Spring and Shows a Condenser Flow Fault",
      "The plant operator says the chilled-water pump is running, but the chiller refuses to start and the panel complains about condenser flow.",
      "A water-cooled chiller starting for the first time this season. The tower is filled and the oil heater has been on for a day.",
      [
        ["Follow lockout and tagout rules before touching the flow switches or wiring, and do not jumper any safety", "Power is off and tagged. No safeties are jumpered."],
        ["Read the panel fault and confirm the start order: oil ready, tower ready, chilled-water flow, then condenser-water flow", "The fault says no condenser flow proven. The chilled-water pump is running."],
        ["Check that the condenser-water pump started and see its status", "The condenser pump was left off at its starter."],
        ["Check isolation valves and strainer on the condenser loop", "A condenser isolation valve is partly closed from the winter layup."],
        ["Open the valve fully, start the condenser pump, and watch the pressure difference across the condenser", "Pressure difference rises and flow is verified at the gauge."],
        ["Confirm both flow switches prove flow to the controller, then allow the start and log first-run readings as a baseline", "The compressor start is permitted. Entering and leaving water temperatures and amps are logged."],
        ["Jumper the condenser flow switch so the chiller starts", "That removes a safety and risks high head pressure. This is unsafe."]
      ],
      [
        ["The condenser-water side was not proven, because the pump was off and a layup valve was partly closed", "The fault named condenser flow, the pump was off, a valve was closed, and the start worked once flow was proven."],
        ["The chilled-water flow switch is stuck", "The fault was for condenser flow, not chilled water."],
        ["The oil heater has failed", "The oil had been warmed and no oil fault was shown."],
        ["The compressor motor is bad", "The compressor was never allowed to start because flow was not proven."]
      ],
      BP,
      "Prove water first, then run the compressor. The start sequence is built so that flow comes before the compressor.")
    ,
    S("tower-wetbulb-sensor-drift-reset-wrong", "Condenser Water Reset Is Holding the Tower Fans at High Speed",
      "The energy manager says the tower fans stay near full speed on mild days and the condenser water supply never matches its reset setpoint.",
      "A plant with a variable-speed tower fan, a condenser water reset sequence tied to outdoor wet-bulb, and a BAS trend. The outdoor wet-bulb sensor is on a sunny wall.",
      [
        ["Follow the site lockout rules before working on the fan drive or the basin area, and do not defeat the drive or chiller limits", "Fan drive is locked out for the physical check and no limits are changed."],
        ["Trend the condenser water supply, its setpoint and the fan speed", "Supply stays above the setpoint while fan speed stays high."],
        ["Compare the BAS outdoor wet-bulb reading with a calibrated handheld meter", "The BAS reading is several degrees lower than the handheld reading, because the sensor is in the sun."],
        ["Check the fill, basin and bypass valve for fouling or sticking", "The fill and bypass valve are normal."],
        ["Check the chiller's minimum entering condenser water setting against the setpoint", "The setpoint is above the chiller's minimum, so the limit is not the problem."],
        ["Move or shield the sensor and recalibrate it, then trend the reset and fan response through a range of conditions", "The setpoint tracks the real wet-bulb and fan speed falls to match."],
        ["Lock the tower fan at a fixed speed", "This overrides the control sequence and wastes energy. It does not fix the sensor."]
      ],
      [
        ["The wet-bulb sensor reads wrong, so the reset target is set too cold and the fans run harder than needed", "A reading that disagrees with the handheld, sound tower hardware, and normal operation after the sensor is fixed."],
        ["The tower fill is fouled", "The fill and bypass checked fine."],
        ["The chiller minimum limit is holding the setpoint", "The setpoint was above the chiller's minimum."],
        ["The fan VFD has failed", "The drive responded and followed the commanded speed."]
      ],
      BP,
      "A reset sequence is only as good as its sensors. A setpoint the water never reaches is a clue.")
    ,
    S("bas-hot-room-alarm-flood-upstream-fault", "BAS Floods the Operator With Hot-Room Alarms Overnight",
      "The building operator says the system sent dozens of hot room alarms at 3 a.m. and the day shift doesn't know where to start.",
      "A BAS with zone temperature alarms, trend logs for air handler status, supply fan command, and a chilled-water valve. Many zones on one air handler alarmed.",
      [
        ["Follow site procedure, use the BAS only as you are authorized to, and do not change alarm limits or logging settings without permission", "Authorized access is confirmed. No limits or settings are changed."],
        ["Sort the alarms by time and see which equipment serves the alarming zones", "Nearly every alarming zone is served by one air handler."],
        ["Pull the trend of that air handler's fan status and supply fan command", "The fan status dropped to off shortly before the first alarm while the command stayed on."],
        ["Look at the interval of the trend and tighten it temporarily if the data is too coarse", "A short interval for status shows the exact moment of the stop. The tighter interval is restored after the work."],
        ["Compare command versus feedback on the fan and check for a drive or motor fault", "The drive shows a fault that tripped the fan."],
        ["After the cause is fixed and the drive resets per the maker's steps, trend again to prove it held and note the pattern in the log", "The fan runs, supply temperature recovers, and the hot room alarms clear."],
        ["Raise the zone alarm limit so the alarms stop", "That hides the problem and treats the alarm as the fault. This does not help."]
      ],
      [
        ["An upstream air handler fan failure caused many downstream zone alarms", "Most alarming zones share one unit, the fan status fell while the command stayed on, and the drive showed a fault."],
        ["Each zone has its own sensor problem", "The alarms came from one equipment source, and zones recovered after the fan was fixed."],
        ["The alarm limits are set too low", "The temperatures were truly rising, so the alarms were valid."],
        ["The trend log is broken", "The trend showed the stop clearly once examined."]
      ],
      BP,
      "Alarm says look. Trend says where. Find the upstream cause and consider suppressing the downstream flood.")
    ,
    S("erv-frost-in-core-weak-airflow-cold-snap", "ERV Airflow Dropped in a Cold Snap and the Filter Has Not Been Changed",
      "The homeowner says the ventilator is barely moving air, the windows have started to fog, and a drip appears at the unit during the cold snap.",
      "A heat or energy recovery ventilator in a cold climate with a filter on each stream, a core, outdoor hoods and a drain connection. Outdoor air is well below freezing.",
      [
        ["Turn off power at the disconnect before opening the unit", "Power is off and verified. The unit is opened safely."],
        ["Look at the filters, the core and the outdoor hoods", "The filters are heavily loaded, and the outdoor hood has snow packed against it."],
        ["Check for frost or ice on the core and in the drain pan", "A frost layer is on the core's cold face and the drain line has ice at the connection."],
        ["Find out how this unit handles frost: preheat, bypass, or a defrost mode, and whether it is working", "The unit uses a defrost mode that cycles, but long cycles are happening because the airflow is poor."],
        ["Measure supply and exhaust airflow against the commissioned target", "Both flows are well below the target, and the exhaust is lower than supply."],
        ["Clear the hood, replace the filters, thaw the core and drain, restore power, and re-measure airflow", "Airflow returns near the target and frost does not return."],
        ["Move the balancing dampers by eye without any measurement", "Dampers need a measurement tool. This can leave the house pressurized or depressurized."]
      ],
      [
        ["Restricted filters and a blocked hood reduced airflow, so frost formed on the core and the unit had trouble ventilating", "Loaded filters, a packed hood, frost on the core, low measured flow, and a restored flow after cleaning."],
        ["The ERV core is the wrong type for this climate and must be replaced", "Nothing showed a core design fault, and cleaning restored operation."],
        ["The house needs a dehumidifier instead of ventilation", "Window fog followed the weak ventilation and frost, and airflow fixed it."],
        ["The exhaust fan motor has failed", "The fans ran, but flow was restricted."]
      ],
      BP,
      "Know the unit's frost scheme before diagnosing weak airflow, check filters and hoods, and balance only with a measured flow.")
    ,
    S("furnace-short-cycle-homeowner-filter-blocked-returns", "My Furnace Turns On and Off Every Few Minutes",
      "The homeowner says, \"The furnace starts, runs a few minutes, shuts off, and starts again. The house is not getting warm. A light blinks on it.\"",
      "A gas furnace in a home. The homeowner has never changed the filter. The thermostat is on the hall wall. No carbon monoxide alarm is sounding and no gas smell is reported.",
      [
        ["Ask if anyone smells gas or hears a CO alarm. If so, everyone leaves and the utility or 911 is called from outside", "No gas smell, no CO alarm, and everyone is fine. It is safe to continue."],
        ["Note the run time, whether the fan keeps going after the burners stop, and what the blinking light does", "The burners stop after a few minutes while the fan keeps blowing, and the light blinks a limit-type pattern."],
        ["Look at the air filter", "The filter is dark gray and no light shines through it."],
        ["Check that supply registers and return grilles are open and unblocked", "Two returns are blocked by a rug and a box."],
        ["Check the thermostat setting, batteries and location", "It is set to Heat, batteries are fine, and it is not near a heat source."],
        ["Replace the filter, clear the returns, and watch a full heating cycle for run length and the light", "The furnace runs full cycles and the limit light does not return."],
        ["Jumper out the high-limit switch so the burners stay on", "That defeats a safety and can crack the heat exchanger, which can leak carbon monoxide. This is unsafe."]
      ],
      [
        ["A clogged filter and blocked returns heated the furnace until the high-limit switch shut the burners off early", "Gray filter, blocked returns, fan continuing after burners stop, and full cycles after correcting airflow."],
        ["The thermostat is faulty", "The thermostat was set properly and was not near a heat source."],
        ["The furnace is oversized and needs to be replaced", "A load calculation was not needed, because normal cycles returned once airflow was fixed."],
        ["The gas valve has failed", "The burners did light and the shutoff matched a limit pattern."]
      ],
      BP,
      "A furnace that stops early is usually protecting itself. Start with airflow, never defeat the limit, and put safety before the diagnosis.")
    ,
    S("ac-leak-clogged-condensate-drain-float-tripped", "Water on the Floor by My Indoor Unit and the AC Stopped",
      "The homeowner says, \"There is a puddle by the indoor unit. The AC quit cooling and will not restart. It smells musty.\"",
      "A split-system air handler in a utility closet with a primary drain line, a capped vent tee, and a float switch in the pan. The weather is hot and humid.",
      [
        ["Switch the system off at the thermostat and the equipment switch, keep water away from electrical parts, and ask about gas smell or a CO alarm", "Power is off. Nobody smells gas and there is no CO alarm. The wet area is kept clear of wiring."],
        ["Note where the water is and whether it is condensate and not hot water or a pipe leak", "The water is cold, clear and under the pan area. There is no steam or burning smell."],
        ["Look at the end of the drain line outside", "The outlet is dry and has slime and dirt at the opening."],
        ["Check the pan and the float switch", "The pan is full to the float level, and the float switch has opened, which shut the system off."],
        ["Check the filter and look for ice on the coil", "The filter is dirty. The coil has no ice now but looks wet."],
        ["Clear the line (power off), replace the filter, empty the pan, reset the system, and watch the drain run during cooling", "Water flows freely, the float resets, and cooling returns."],
        ["Jumper the float switch so the system will run while the line stays clogged", "That removes overflow protection and invites water damage. This is unsafe."]
      ],
      [
        ["A clogged condensate drain line backed up and the pan float switch shut the AC off", "A dry outlet with slime, a full pan, an open float, and normal cooling after the line was cleared."],
        ["The refrigerant lines are leaking water", "The water was cold condensate, and nothing showed a refrigerant leak."],
        ["The coil is frozen because of low refrigerant", "No ice was found, and the clogged line explained the water."],
        ["A hot water pipe is leaking", "The water was cold with no steam or burning smell."]
      ],
      BP,
      "Condensation is normal. Standing water is not. Clear the drain, change the filter, and never bypass the float switch.")
  ]);
})();
