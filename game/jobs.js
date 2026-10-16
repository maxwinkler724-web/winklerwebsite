/* Job data for Fix-It Van. Plain data: add a job by adding an object here.
   Each step: prompt, helper tip shown after answering, options [{t, ok, why}]. Exactly one ok per step. */
window.JOBS = [
{ id:"igniter", title:"No heat at Maple Street", house:0, kind:"furnace",
  story:"Mrs. Rivera says her furnace will not make heat and the house is chilly. Let's find out why!",
  steps:[
   {p:"First, what do we check before we touch the furnace?", o:[
     {t:"The thermostat: is it set to HEAT and higher than the room?", ok:1, why:"Always check the easy stuff first. The thermostat is set right, so the problem is inside the furnace."},
     {t:"Open the furnace right away", why:"Hold on! Look for easy answers first, like the thermostat, before opening anything."},
     {t:"Hit it with a hammer", why:"Never! Techs use careful tools, not force."}]},
   {p:"We found the problem is inside. Before opening the panel, what comes first?", o:[
     {t:"Turn OFF the power at the furnace service switch", ok:1, why:"Power off first, every time. A furnace has electricity inside that can hurt you."},
     {t:"Just be careful and leave the power on", why:"Careful is not enough. Switch the power off so nothing can shock you."},
     {t:"Ask the cat to hold the wires", why:"The cat says no thanks. Turn the power off yourself."}]},
   {p:"Power is off. Now we open the door panel. What do we look for?", o:[
     {t:"The igniter, a little glowing part that lights the gas", ok:1, why:"Right! Modern furnaces use a hot surface igniter. It glows to light the burners. It is fragile and can crack."},
     {t:"The dishwasher", why:"Wrong room! The igniter is a small part near the burners."},
     {t:"Nothing, just guess", why:"Techs look at the parts carefully, then test them."}]},
   {p:"The igniter looks fine to the eye. How do we know if it is broken?", o:[
     {t:"Test it with a meter (power is still off)", ok:1, why:"A meter measures electricity. A good igniter reads a small number of ohms. This one reads OL, which means open, so it is broken inside."},
     {t:"Touch it with a bare finger", why:"Ouch and no! Fingertip oil also shortens an igniter's life. Use the meter."},
     {t:"Spray it with water", why:"Never mix water and electric parts."}]},
   {p:"The igniter is broken. We turned the gas valve off at the furnace too. How do we install the new one?", o:[
     {t:"Hold it by the base, never touch the glowing tip", ok:1, why:"The tip is brittle. Grip the plastic or ceramic base and match the old part."},
     {t:"Squeeze the tip hard to check it", why:"Oops, that can crack it. Hold the base only."},
     {t:"Bend it to fit", why:"Bending cracks it. Use the exact right part."}]},
   {p:"New igniter is in. Before turning things on, what must go back?", o:[
     {t:"The door panel, put on tight", ok:1, why:"The panel keeps flames and air where they belong, and a safety switch needs it closed."},
     {t:"Leave it off so we can see better", why:"The furnace must be closed up to run safely."},
     {t:"Put it back later, someday", why:"Close it up before testing, always."}]},
   {p:"Time to test! What is the safe order?", o:[
     {t:"Gas on, power on, watch a full heating cycle, sniff for gas smell", ok:1, why:"Watch it light, run, and shut down right. If you ever smell gas, leave and call the gas company from outside."},
     {t:"Turn it on and walk away", why:"Stay and watch the whole cycle. That's how we know it's really fixed."},
     {t:"Skip the test, it will be fine", why:"Testing is part of the job. Always prove it works."}]}
  ],
  lesson:"Remember: power off before opening, use a meter, hold parts the right way, then test the whole cycle. A warm house and happy customer!"},

{ id:"filter", title:"Chilly rooms on Oak Avenue", house:1, kind:"filter",
  story:"Mr. Chen says some rooms barely get warm air. Could something be blocking the air?",
  steps:[
   {p:"Air has to flow through the furnace. What cheap part can block it?", o:[
     {t:"A very dirty air filter", ok:1, why:"A clogged filter is like breathing through a pillow. Less air flows and the furnace can overheat and shut off."},
     {t:"The mailbox", why:"Not the mailbox! The filter sits in the air path."},
     {t:"A sock in the oven", why:"Funny, but the filter is the usual suspect."}]},
   {p:"Before sliding the old filter out, what do we do?", o:[
     {t:"Turn the thermostat OFF", ok:1, why:"That stops the blower while the filter is out, so dust is not pulled into the furnace."},
     {t:"Run it at full blast", why:"Without a filter, dust gets sucked inside. Switch it off first."},
     {t:"Nothing", why:"A quick off keeps the fan from running while we work."}]},
   {p:"The filter has an arrow printed on it. Which way should it point?", o:[
     {t:"Toward the furnace blower (the way air flows)", ok:1, why:"The arrow shows the direction of airflow. It points toward the blower."},
     {t:"Away from the furnace", why:"Backward filters can sag and work badly. Follow the arrow with the air."},
     {t:"Any way, arrows are decoration", why:"Arrows matter. They show airflow direction."}]},
   {p:"New filter in. What do we tell Mr. Chen?", o:[
     {t:"Check the filter every month or two and change it when dirty", ok:1, why:"Regular changes keep air flowing, save energy, and protect the furnace."},
     {t:"Never change it again", why:"Filters fill up. Check them often."},
     {t:"Change it once a decade", why:"Much too long! Every 1 to 3 months is common, depending on the filter."}]}
  ],
  lesson:"A clean filter helps air flow, saves energy, and keeps the furnace from overheating."},

{ id:"co", title:"Beeping alarm on Pine Court", house:2, kind:"co",
  story:"The carbon monoxide (CO) alarm at Pine Court is beeping. Safety first!",
  steps:[
   {p:"CO is a gas you cannot see or smell. The alarm is going off and the family feels dizzy. What do we do?", o:[
     {t:"Get everyone outside into fresh air and call 911", ok:1, why:"People first. Fresh air, then call emergency help from outside. Do not go back in."},
     {t:"Open a window and keep working", why:"Get everyone out first. Safety of people always comes before the repair."},
     {t:"Take the batteries out of the alarm", why:"Never silence or disable a safety alarm. It is doing its job."}]},
   {p:"The fire department says it is safe. Which appliances can make CO?", o:[
     {t:"Gas furnace, water heater, stove, and anything that burns fuel", ok:1, why:"Burning fuel makes CO when there is a problem. That is why vents and checks matter."},
     {t:"Only the television", why:"TVs don't burn fuel. Look at things that burn gas, oil, or wood."},
     {t:"Only refrigerators", why:"Refrigerators don't burn fuel."}]},
   {p:"We should never fix a CO problem by...", o:[
     {t:"Bypassing or removing a safety device", ok:1, why:"Safety devices are there to protect people. Fix the real problem instead."},
     {t:"Cleaning a blocked vent pipe", why:"That's a good fix! The question asks what we should never do."},
     {t:"Replacing a cracked part", why:"That's a good fix! The question asks what we should never do."}]},
   {p:"How do we help this family stay safe in the future?", o:[
     {t:"CO alarms on every level and near bedrooms, tested monthly", ok:1, why:"Test the alarms monthly and replace them when they expire (the date is printed on the back)."},
     {t:"One alarm in the garage only", why:"Put alarms on every level and outside sleeping areas."},
     {t:"No alarms, just hope", why:"Alarms save lives. Always have them."}]}
  ],
  lesson:"CO is invisible. Alarms, yearly furnace checks, and clear vents keep families safe. When the alarm sounds, get out first."},

{ id:"heater", title:"No hot water on Cedar Lane", house:3, kind:"heater",
  story:"The Garcia family has no hot water for showers. Their water heater is electric. Let's check it safely!",
  steps:[
   {p:"Where do we look first for the problem?", o:[
     {t:"Is the heater getting power? Check the breaker and the reset button", ok:1, why:"Easy checks first. A tripped breaker or a tripped reset button is a common reason for cold water."},
     {t:"Take the whole tank apart", why:"That's too much, too soon. Start with the simple checks."},
     {t:"Turn the temperature up to the maximum", why:"Hot water can scald. Never crank it up as a fix."}]},
   {p:"The heater has power but still makes no heat. We want to open the access panel. What first?", o:[
     {t:"Turn off the breaker, then check with a meter that the power is really off", ok:1, why:"Always prove the power is off with a meter. Water heaters run on strong 240 volt power."},
     {t:"Just trust the label on the breaker box", why:"Labels can be wrong. Check with a meter before touching wires."},
     {t:"Wear flip-flops and hurry", why:"Never rush with electricity."}]},
   {p:"The heating element is bad. Before taking it out, what must we do about the water?", o:[
     {t:"Shut off the cold water and drain some water out of the tank", ok:1, why:"The element sits inside the tank. If we don't drain below it, water would pour out."},
     {t:"Nothing, water stays inside by itself", why:"The element is inside the tank, so water would come out of the hole."},
     {t:"Let the tank run over the floor", why:"Use a hose to drain safely."}]},
   {p:"How do we know the old element is bad?", o:[
     {t:"Test it with a meter. A good one reads a small number of ohms, a broken one reads OL (open)", ok:1, why:"The meter shows if electricity can travel through the element. OL means the path is broken."},
     {t:"Lick it", why:"Yuck, and dangerous! Use a meter."},
     {t:"Shake it and listen", why:"A meter tells us the truth."}]},
   {p:"The new element is in. Before turning the power back on, what MUST happen?", o:[
     {t:"Fill the tank completely and let air out of a hot tap first", ok:1, why:"An element heated without water around it burns out in seconds. Full tank first, then power."},
     {t:"Turn the power on while the tank fills", why:"A dry element can burn out fast. Water first."},
     {t:"Skip it, we're late for lunch", why:"Never skip the water. It protects the new part."}]},
   {p:"Power is back on and the water heats. What temperature is a safe setting for homes with kids?", o:[
     {t:"About 120 degrees F, so water cannot scald quickly", ok:1, why:"Water much hotter than that can burn skin in seconds. 120 degrees is a common safe setting."},
     {t:"As hot as it goes", why:"Too hot can burn little hands. About 120 degrees F is a common safe setting."},
     {t:"Ice cold", why:"Then there would be no hot water! About 120 degrees F works."}]}
  ],
  lesson:"Prove power is off, drain before opening the tank, fill before heating, and keep the water at a safe temperature."},

{ id:"thermo", title:"Blank screen on Birch Road", house:4, kind:"thermo",
  story:"Mr. Okafor's thermostat screen is blank and the house is cold. Small wires, big comfort!",
  steps:[
   {p:"The thermostat screen is blank. What is the simplest thing to check first?", o:[
     {t:"The batteries", ok:1, why:"Many thermostats run on batteries. Fresh ones fix a lot of blank screens."},
     {t:"Replace the whole furnace", why:"Way too big! Check the easy part first."},
     {t:"Paint the wall", why:"The wall is fine. Try fresh batteries."}]},
   {p:"New batteries did not help. We need to work on the thermostat wires. What do we do first?", o:[
     {t:"Turn the furnace power off", ok:1, why:"Thermostat wires are low voltage, but a slip can still blow a fuse in the system. Power off first."},
     {t:"Leave everything on and hurry", why:"Touching wires together by mistake can damage the system. Power off."},
     {t:"Cut every wire", why:"Never! The wires are how the thermostat talks to the furnace."}]},
   {p:"Before taking the old thermostat off, what should we do about the wires?", o:[
     {t:"Take a photo and label each wire by its terminal letter", ok:1, why:"The letters (like R, W, Y, G) tell which wire goes where. A photo and labels help us put them back right."},
     {t:"Hope we remember", why:"Wire colors can be misleading. Label the letters and take a photo."},
     {t:"Twist them all together", why:"That would confuse the system. Label each one."}]},
   {p:"Now the new thermostat goes on the wall. How do we install it?", o:[
     {t:"Connect each wire to the matching letter and mount it level", ok:1, why:"Matching letters makes the system work. Level looks neat and helps some models read right."},
     {t:"Match by wire color only", why:"Colors are common but not guaranteed. Match the terminal letters."},
     {t:"Stick it on a window", why:"Sunny windows would fool it. Mount it on an inside wall."}]},
   {p:"Power is back on. How do we test it?", o:[
     {t:"Set it to HEAT, raise the temperature, and listen for the furnace to start", ok:1, why:"The furnace should call for heat and run. That proves the thermostat and wires work."},
     {t:"Set it and walk away", why:"Always watch the system start. That's the proof."},
     {t:"Set it to 95 to make the house warm faster", why:"The house does not warm faster. The furnace works at the same speed until it reaches the setting."}]}
  ],
  lesson:"Check the easy parts first, label the wires, match terminal letters, and always test the system after the job."},

{ id:"split", title:"Warm air on Elm Street", house:5, kind:"split",
  story:"Ms. Patel's mini-split air conditioner is blowing weak, warm air. Let's get it cool again!",
  steps:[
   {p:"What are two simple things that make a mini-split blow weak air?", o:[
     {t:"A dirty indoor filter and a blocked outdoor unit", ok:1, why:"Air has to move easily. Dirt on the filter and leaves or weeds at the outdoor unit block that."},
     {t:"Too many socks", why:"Not socks! Think about airflow: filters and clear space outside."},
     {t:"The moon is out", why:"The moon is not the problem. Dirt and blocked air are."}]},
   {p:"Before opening anything, what do we do?", o:[
     {t:"Turn off power at the outdoor disconnect and the breaker", ok:1, why:"Mini-splits have high voltage inside, even the part on the wall. Power off before opening."},
     {t:"Press the remote's off button only", why:"The remote does not shut off the power inside. Use the disconnect."},
     {t:"Unplug the neighbor's TV", why:"Wrong plug! Turn off this system's disconnect."}]},
   {p:"The indoor filter is full of dust. How do we clean it?", o:[
     {t:"Wash it with water, let it dry fully, then put it back", ok:1, why:"Most mini-split filters are washable. A wet filter can grow mold, so dry it first."},
     {t:"Put it back dirty", why:"A dirty filter is the problem. Clean it."},
     {t:"Run it through the toaster", why:"Silly! Just wash it and let it dry."}]},
   {p:"Outside, the unit is wrapped in weeds. What do we do?", o:[
     {t:"Clear the plants and leaves and keep some space around it", ok:1, why:"The unit needs room to breathe, usually a couple of feet of open space."},
     {t:"Cover it with a blanket", why:"That blocks the air. Keep it clear."},
     {t:"Plant more weeds", why:"Weeds block airflow. Clear them."}]},
   {p:"We think the system may be low on refrigerant. Who may open the refrigerant lines?", o:[
     {t:"Only a technician with EPA 608 certification", ok:1, why:"Refrigerant must be handled by certified techs, because it harms the environment and can hurt people."},
     {t:"Anyone with a wrench", why:"Not anyone! The law says certified techs only."},
     {t:"The customer, with YouTube", why:"Please don't. Refrigerant needs a certified tech."}]},
   {p:"Filter and outdoor unit are clean. Last step: how do we test?", o:[
     {t:"Power on, set it to COOL, and check the air from the vent and the drain", ok:1, why:"Cool air from the vent and water draining outside show that it works."},
     {t:"Wave goodbye and leave", why:"Always test before leaving."},
     {t:"Set it to HEAT in July", why:"Cooling call! Set it to COOL."}]}
  ],
  lesson:"Clean filters and clear space outside keep air moving. Only certified techs open refrigerant lines."},

{ id:"drain", title:"Puddle on Spruce Drive", house:6, kind:"drain",
  story:"Mr. Lee found water near his indoor air conditioner coil and the AC shut itself off. Where did the water come from?",
  steps:[
   {p:"A cooling system pulls moisture out of the air, like a cold glass sweating. Where should that water go?", o:[
     {t:"Down the condensate drain pipe to outside or a drain", ok:1, why:"Right! The drain carries that water away. When it clogs, water backs up and spills."},
     {t:"Back into the house air", why:"The whole point is to take water out of the air. It must drain away."},
     {t:"Nowhere, it evaporates by magic", why:"There is a lot of water on a hot day. It needs a drain."}]},
   {p:"The system has a float switch that shuts it off when the drain pan is full. What does that tell us?", o:[
     {t:"The safety switch worked and the drain is probably clogged", ok:1, why:"The float switch protects the ceiling and floor from water damage. Never bypass it."},
     {t:"The switch is broken, so we jump over it with a wire", why:"Never bypass a safety switch! It is doing its job."},
     {t:"It's nothing, ignore it", why:"The shutoff is a clue. Find out why the pan filled."}]},
   {p:"Before working near the unit and the wet floor, what do we do?", o:[
     {t:"Turn the system power off and keep away from wet outlets and wires", ok:1, why:"Water and electricity are a risky mix. Power off first, and dry the area."},
     {t:"Mop up with the power on", why:"Water near live electrical parts is dangerous. Power off first."},
     {t:"Splash around to see where it goes", why:"Not safe! Power off and stay careful."}]},
   {p:"How do we clear a clogged condensate drain line?", o:[
     {t:"Use a wet-dry vacuum at the drain end, then flush it with clean water", ok:1, why:"Suction pulls out slimy buildup. Flushing checks that water runs freely."},
     {t:"Pour in strong chemicals and walk away", why:"Harsh chemicals can damage pipes and are unsafe. Use suction and water."},
     {t:"Hammer the pipe", why:"That can crack it. Use suction and flushing."}]},
   {p:"Drain is clear. How do we make sure the problem is really fixed?", o:[
     {t:"Run the AC and watch water drain out of the pipe", ok:1, why:"Seeing the water flow out is the proof. The float switch should stay quiet."},
     {t:"Close the panel and hope", why:"Always test. Watch the drain work."},
     {t:"Test it only in winter", why:"The system has to run in cooling mode to make condensate."}]},
   {p:"What can we tell Mr. Lee to help prevent clogs?", o:[
     {t:"Have the drain checked and cleaned during a yearly tune-up", ok:1, why:"Regular maintenance catches buildup early."},
     {t:"Never look at the AC again", why:"A little care prevents big messes."},
     {t:"Pour paint down the drain", why:"No paint! Just keep it clean."}]}
  ],
  lesson:"Cooling makes water, the drain carries it away, and a float switch is a safety device we never bypass."},

{ id:"outdoor", title:"Leafy unit on Willow Way", house:7, kind:"outdoor",
  story:"The outdoor unit at Willow Way is packed with leaves and the air inside is not getting cool. Let's clear the air path!",
  steps:[
   {p:"The outdoor unit gets rid of heat from the house. What does it need?", o:[
     {t:"Lots of clear airflow around it", ok:1, why:"The fan pulls air through the coil to carry heat away. Blocked air means poor cooling."},
     {t:"To be wrapped in a blanket", why:"That traps heat. Give it room to breathe."},
     {t:"To sit in a closet", why:"It needs open air outside."}]},
   {p:"Before reaching toward the unit, what must we do?", o:[
     {t:"Turn off the outdoor disconnect so the fan cannot start", ok:1, why:"A fan can start without warning. Power off keeps fingers safe."},
     {t:"Reach in while it is running", why:"Never! The fan blades are fast and can hurt you."},
     {t:"Hold a stick in the fan", why:"No! Turn the power off."}]},
   {p:"We are removing leaves and trash from the cabinet. What should we wear?", o:[
     {t:"Work gloves, because the metal fins are sharp", ok:1, why:"Coil fins are thin and can cut hands. Gloves help."},
     {t:"Nothing, bare hands are best", why:"Fins can cut. Wear gloves."},
     {t:"Mittens made of ice", why:"Ha! Real work gloves, please."}]},
   {p:"How do we rinse dirt off the coil?", o:[
     {t:"Use a garden hose with gentle water, not a pressure washer", ok:1, why:"A pressure washer bends the thin fins and blocks air. Gentle water is safer."},
     {t:"Use a pressure washer on high", why:"Too strong! It bends the fins."},
     {t:"Scrub with a wire brush", why:"Wire brushes bend the fins. Use gentle water."}]},
   {p:"How much clear space should we keep around the unit?", o:[
     {t:"About two feet on the sides, with nothing hanging over the top", ok:1, why:"Trim bushes and move stuff so air can flow in and out. Check the unit's instructions for exact distances."},
     {t:"None, plants look nice", why:"Plants too close choke the air."},
     {t:"Build a fence right up against it", why:"Keep clearance for airflow and service."}]},
   {p:"Power is on again. How do we test?", o:[
     {t:"Watch the fan spin and check that the indoor air gets cooler", ok:1, why:"A spinning fan and cooler air show the heat is moving out."},
     {t:"Turn it on and leave", why:"Test every job."},
     {t:"Tell the plants goodbye", why:"Nice, but test first!"}]}
  ],
  lesson:"Air carries heat away. Power off before reaching in, wear gloves, rinse gently, and keep space around the unit."},

{ id:"smoke", title:"Chirping alarm on Aspen Alley", house:8, kind:"smoke",
  story:"A smoke alarm at Aspen Alley chirps every minute and the family cannot sleep. It is a tiny sound with a big message.",
  steps:[
   {p:"A smoke alarm that chirps once a minute usually means what?", o:[
     {t:"The battery is low and needs changing", ok:1, why:"The chirp is a gentle warning. Fix it right away, because an alarm without power cannot warn anyone."},
     {t:"It likes to sing", why:"It's a warning. Usually it's the battery."},
     {t:"Nothing, just ignore it", why:"Never ignore it. Change the battery."}]},
   {p:"The alarm is on a high ceiling. How do we reach it safely?", o:[
     {t:"Use a sturdy stepladder on flat floor, with a helper nearby", ok:1, why:"Falls are a big danger. Keep your body centered and use three points of contact."},
     {t:"Stand on a spinning chair", why:"No way! Use a real ladder."},
     {t:"Jump and grab it", why:"Too risky. Use a stable ladder."}]},
   {p:"Time to swap the battery. What do we do?", o:[
     {t:"Use the type of battery the alarm calls for, then hold the test button", ok:1, why:"The right battery matters. The test button should give a loud beep."},
     {t:"Leave the battery out", why:"An alarm with no battery cannot save anyone."},
     {t:"Use any battery that fits", why:"Use the correct type listed on the alarm."}]},
   {p:"We look at the back of the alarm. There is a date. Why?", o:[
     {t:"Alarms wear out and should be replaced about every 10 years", ok:1, why:"Sensors get old. Check the date and replace the whole alarm when it expires."},
     {t:"It is the alarm's birthday cake date", why:"Not quite! The date tells when it should be replaced."},
     {t:"Nobody knows", why:"The manufacture date lets us know when to replace it."}]},
   {p:"If the alarm ever sounds loudly because of smoke, what does the family do?", o:[
     {t:"Get out, stay out, and call 911 from outside", ok:1, why:"Get out first. Never go back in for things."},
     {t:"Hide under the bed", why:"Always leave the building and call for help."},
     {t:"Fan the alarm until it stops", why:"The alarm is warning you. Get out."}]},
   {p:"What is the best way to keep a home protected?", o:[
     {t:"Alarms on every level and in sleeping areas, tested every month", ok:1, why:"Test monthly and make a family exit plan together."},
     {t:"One alarm in the basement only", why:"Put alarms on every level and near bedrooms."},
     {t:"Test them once in 20 years", why:"Monthly tests keep them ready."}]}
  ],
  lesson:"Smoke alarms need power, new batteries when they chirp, replacement every 10 years, and a family plan to get out safely."},

{ id:"dryer", title:"Slow dryer on Linden Lane", house:9, kind:"dryer",
  story:"The Brooks family's clothes take forever to dry, and the laundry room feels hot. Something may be blocking the dryer vent!",
  steps:[
   {p:"What builds up inside a dryer and its vent pipe and can block the air?", o:[
     {t:"Lint, the fluffy bits from clothes", ok:1, why:"Lint is easy to burn. A clogged vent traps heat, wastes energy, and is a real fire risk."},
     {t:"Snow", why:"Not snow! It's lint from clothes."},
     {t:"Pizza", why:"Not pizza! It's lint."}]},
   {p:"Before we pull the dryer away from the wall, what do we do?", o:[
     {t:"Unplug it, and if it is a gas dryer, shut its gas valve too", ok:1, why:"Power and gas off first. Be gentle moving it so the gas line is not bent."},
     {t:"Leave it plugged in", why:"Unplug it so nothing can start."},
     {t:"Run it on high to warm it up", why:"No! It's already too hot. Unplug it."}]},
   {p:"What do we use to clear the vent pipe?", o:[
     {t:"A vent brush and a vacuum", ok:1, why:"A brush loosens lint and the vacuum pulls it out. Clean the lint trap too."},
     {t:"A lit match to burn it out", why:"Never use fire! Lint burns fast. Use a brush and vacuum."},
     {t:"Water from a hose", why:"Water does not belong in a dryer vent. Use a brush and vacuum."}]},
   {p:"The old vent hose is thin plastic foil. What should it be replaced with?", o:[
     {t:"Metal duct, with as few bends as possible", ok:1, why:"Metal does not burn easily and smooth ducts let air flow freely. Plastic or foil can catch lint and fire."},
     {t:"Thin plastic, it is cheaper", why:"Plastic or flimsy foil can trap lint and is a fire risk."},
     {t:"A sock", why:"Not a sock!"}]},
   {p:"Outside, we check the vent cap. What should we see when the dryer runs?", o:[
     {t:"The flap opens and warm air blows out freely", ok:1, why:"That proves the air path is clear all the way outdoors."},
     {t:"The flap stays shut", why:"A shut flap means the air is blocked. Check it again."},
     {t:"Birds nesting inside", why:"Nesting blocks the vent. It should be clear."}]},
   {p:"What habit keeps the dryer safe every day?", o:[
     {t:"Clean the lint trap before or after every load", ok:1, why:"A quick clean each load keeps lint from building up."},
     {t:"Never clean it", why:"Lint builds up fast. Clean the trap often."},
     {t:"Clean it once every ten years", why:"Much too rarely. Every load!"}]}
  ],
  lesson:"Clean lint every load, use metal duct, unplug before working, and never use flame near a dryer vent."},

{ id:"gas", title:"Gas smell on Hazel Hill", house:10, kind:"gas",
  story:"Ms. Novak smells something like rotten eggs in her kitchen. Natural gas has a smell added on purpose so we can notice a leak. Safety comes first!",
  steps:[
   {p:"A smell like rotten eggs may mean a gas leak. What does everyone do first?", o:[
     {t:"Leave the house right away", ok:1, why:"Getting out is the first move. Do not stay to look for the leak."},
     {t:"Search every room for the leak", why:"No! Leave first. Gas can be dangerous."},
     {t:"Light a candle to see better", why:"Never! A flame or spark could ignite gas."}]},
   {p:"On the way out, what should we NOT do?", o:[
     {t:"Flip light switches or use anything that makes a spark or flame", ok:1, why:"A tiny spark could ignite gas. Don't touch switches, lighters, or appliances."},
     {t:"Walk calmly toward the door", why:"That's a good move. The question asks what we should not do."},
     {t:"Take your family with you", why:"That's good! The question asks what not to do."}]},
   {p:"Where do we make the call for help?", o:[
     {t:"From outside, away from the house, to 911 or the gas company's emergency line", ok:1, why:"Call from a safe distance, such as the neighbor's yard. Emergency crews know what to do."},
     {t:"From the kitchen, right by the smell", why:"Get outside first, then call."},
     {t:"We wait to see if it goes away", why:"Never wait. Call for help."}]},
   {p:"When can the family go back inside?", o:[
     {t:"Only after the gas company or fire department says it is safe", ok:1, why:"They have tools to check the air. Do not go back for toys or pets."},
     {t:"After five minutes", why:"No one can tell by waiting. Wait for the pros."},
     {t:"Whenever they feel like it", why:"Wait until the experts say it is safe."}]},
   {p:"Later, a trained tech must repair the leak. How do we find a leak safely?", o:[
     {t:"With approved leak detection tools or leak solution, never a flame", ok:1, why:"Bubble solution or a gas detector shows leaks without risk. Only qualified, licensed people repair gas lines."},
     {t:"With a lighter held near the pipe", why:"Never use a flame to look for gas!"},
     {t:"By sniffing every pipe", why:"Noses are not a safe tool. Use detectors or solution."}]}
  ],
  lesson:"If you smell gas: get out, don't make sparks, call from outside, and wait for the pros. Alarms and annual checks also help keep homes safe."},

{ id:"sheater", title:"Cozy corner on Cottonwood Court", house:11, kind:"sheater",
  story:"A little space heater is keeping Grandpa Joe's room warm, but it sits right next to the curtains. Spot it, stay safe, tell a grown-up!",
  steps:[
   {p:"What is the first thing we notice that could be a problem?", o:[
     {t:"The heater is touching the curtains", ok:1, why:"Heat can ignite cloth. Anything that can burn must stay far from a heater."},
     {t:"The heater is a nice color", why:"Pretty, yes! But the curtains next to it are the danger."},
     {t:"The room smells like cookies", why:"Cookies are fine. Look at what is near the heater."}]},
   {p:"How much clear space should a space heater have around it?", o:[
     {t:"At least three feet (about one big step) on all sides", ok:1, why:"Three feet is a common safety rule for anything that can burn: curtains, bedding, paper, furniture."},
     {t:"A pinky finger's width", why:"Way too close. Keep about three feet."},
     {t:"None, snuggle up to it", why:"Never snuggle with a heater. Keep three feet."}]},
   {p:"Before we move the heater, what do we do?", o:[
     {t:"Switch it off and unplug it, and let it cool", ok:1, why:"A hot heater can burn skin. Switch it off, unplug it, wait for it to cool, then move it."},
     {t:"Grab it while it is hot", why:"Ouch! Let it cool first."},
     {t:"Pour water on it", why:"Never! Water and electricity do not mix."}]},
   {p:"Where should the heater plug in?", o:[
     {t:"Straight into a wall outlet, not a long cord or power strip", ok:1, why:"Heaters pull lots of electricity. Cords and strips can overheat."},
     {t:"Into a long thin extension cord", why:"Thin cords can overheat. Use a wall outlet."},
     {t:"Into a power strip with ten things", why:"Too much on one strip. Use the wall outlet."}]},
   {p:"When should a space heater be turned off?", o:[
     {t:"When nobody is in the room and when going to sleep", ok:1, why:"Never leave a heater running alone. Many fires start when heaters are left on."},
     {t:"Never, it likes to stay on", why:"Turn it off when you leave and at bedtime."},
     {t:"Only when it is broken", why:"Turn it off whenever you leave the room."}]},
   {p:"The heater's cord feels hot or the plug looks scorched. What is the right thing to do?", o:[
     {t:"Unplug it if you safely can and tell a grown-up right away", ok:1, why:"Hot cords or scorch marks are warning signs. A grown-up must decide if it can be used."},
     {t:"Keep using it and say nothing", why:"Always tell a grown-up about warning signs."},
     {t:"Wrap the cord in a blanket", why:"That traps heat. Tell a grown-up."}]}
  ],
  lesson:"Spot it: heater too close to things that burn. Stay safe: three feet of space, wall outlet, off when away. Tell a grown-up about hot cords."},

{ id:"frozen", title:"Frozen faucet on Frostwood Drive", house:12, kind:"frozen",
  story:"It is freezing outside, and the outdoor faucet at Frostwood Drive is covered in ice. No water comes out. Spot it, stay safe, tell a grown-up!",
  steps:[
   {p:"Why can freezing weather hurt water pipes?", o:[
     {t:"Water expands when it freezes and can crack the pipe", ok:1, why:"Ice takes up more space than water. That pressure can split a pipe, and the leak shows up when it thaws."},
     {t:"Pipes get shy in the cold", why:"Ha! The real reason: freezing water expands."},
     {t:"Ice makes pipes sing", why:"The real problem: expanding ice can crack pipes."}]},
   {p:"Which of these should we NEVER use to thaw a frozen pipe?", o:[
     {t:"An open flame like a blowtorch or lighter", ok:1, why:"Flames can start fires inside walls. Never use open flame on pipes."},
     {t:"Warming the room", why:"That is a safe, gentle idea. The question asks what is never safe."},
     {t:"Warm towels", why:"Warm towels are gentle and safe. The question asks what is never safe."}]},
   {p:"We think a pipe inside the wall may have burst because water is dripping. What is the first move?", o:[
     {t:"Tell a grown-up so they can shut off the main water valve", ok:1, why:"The main valve stops the water. A grown-up should do this, then call a licensed plumber."},
     {t:"Hammer on the wall", why:"No! That can make it worse. Tell a grown-up."},
     {t:"Hope it stops", why:"Water damage grows fast. Tell a grown-up."}]},
   {p:"Water is near an outlet. What do we do?", o:[
     {t:"Stay away from it and tell a grown-up", ok:1, why:"Water and electricity are a dangerous combination. Do not touch wet outlets or cords."},
     {t:"Touch it to see if it is wet", why:"Never touch! Stay away and tell a grown-up."},
     {t:"Plug something in", why:"Don't! Stay away from wet outlets."}]},
   {p:"Before the next freeze, what helps protect an outdoor faucet?", o:[
     {t:"Disconnect the garden hose and cover the faucet", ok:1, why:"A hose left on traps water inside. Covers and shutting off the inside valve help too, with a grown-up's help."},
     {t:"Leave the hose on all winter", why:"A connected hose traps water and can freeze."},
     {t:"Paint it black", why:"Paint will not stop freezing. Disconnect the hose and cover it."}]},
   {p:"Who should repair a burst pipe?", o:[
     {t:"A licensed plumber", ok:1, why:"Plumbing repairs need trained, licensed pros to do the job safely and up to code."},
     {t:"A kid with duct tape", why:"Never! Tell a grown-up and call a plumber."},
     {t:"The neighbor's dog", why:"Good doggo, but call a licensed plumber."}]}
  ],
  lesson:"Spot it: ice on pipes or no water in a freeze. Stay safe: no flame, stay away from wet outlets. Tell a grown-up to shut the main valve and call a plumber."},

{ id:"windowac", title:"Dripping window AC on Breezy Boulevard", house:13, kind:"windowac",
  story:"A window air conditioner on Breezy Boulevard is dripping water onto the living room floor. Spot it, stay safe, tell a grown-up!",
  steps:[
   {p:"Why can a window AC make water?", o:[
     {t:"It pulls moisture out of the air and the water must drain somewhere", ok:1, why:"Just like a cold glass sweating, the cooling coil collects water. Most window units drain it out the back."},
     {t:"It is crying because it is hot", why:"Not crying! It removes moisture from the air."},
     {t:"Nobody knows", why:"We know: cooling removes moisture from the air."}]},
   {p:"Water is on the floor near the cord and outlet. What first?", o:[
     {t:"Stay back from the wet area, tell a grown-up, and have them unplug it only if the outlet and floor near it are dry", ok:1, why:"Never touch a plug with wet hands or while standing in water. A grown-up can turn off the breaker if needed."},
     {t:"Grab the cord right away", why:"Not with water around! Stay back and tell a grown-up."},
     {t:"Dance in the puddle", why:"Please don't! Wet floors near electricity are dangerous."}]},
   {p:"Once it is safely unplugged, which way should a window AC tilt slightly?", o:[
     {t:"Slightly to the outside, so water drains out", ok:1, why:"A slight tilt to the outside lets condensation run outdoors, not into the room. Follow the manual for the exact amount."},
     {t:"Slightly inside", why:"Then water would run into the room!"},
     {t:"Upside down", why:"Not upside down! A slight outward tilt is best."}]},
   {p:"What else could make the unit drip inside?", o:[
     {t:"A dirty filter or a blocked drain hole", ok:1, why:"Dirt can block air or the drain. Cleaning the filter helps, with the AC unplugged."},
     {t:"Too many cookies nearby", why:"Cookies are not the cause. Dirty filters and blocked drains are."},
     {t:"Nothing, it is magic", why:"There is always a reason. Check the filter and drain."}]},
   {p:"How should we clean up the water?", o:[
     {t:"Mop it up and dry the floor so nobody slips", ok:1, why:"Wet floors cause slips and can damage wood. Dry the area completely."},
     {t:"Leave it for later", why:"Water on floors can cause falls and damage."},
     {t:"Hide it under a rug", why:"Water under a rug can cause mold. Dry it."}]},
   {p:"The unit still leaks after cleaning. What is the right next step?", o:[
     {t:"Leave it unplugged and tell a grown-up to get it checked or replaced", ok:1, why:"Don't open an AC cabinet. It has electrical parts and sharp metal, and sealed refrigerant that only trained pros handle."},
     {t:"Open the case and poke around", why:"No! There are electrical parts inside. Tell a grown-up."},
     {t:"Plug it back in and hope", why:"Not safe. Leave it unplugged and tell a grown-up."}]}
  ],
  lesson:"Spot it: water by an AC. Stay safe: stay out of the wet area and away from wet cords. Tell a grown-up before anyone touches the plug."},

{ id:"generator", title:"Storm outage on Alder Avenue", house:14, kind:"generator",
  story:"A storm knocked out the power at Alder Avenue. The family wants to run a portable generator. Generators make carbon monoxide, so we spot it, stay safe, and tell a grown-up!",
  steps:[
   {p:"Where is the only safe place to run a portable generator?", o:[
     {t:"Outside, in the open air and well away from the house", ok:1, why:"Generator exhaust has carbon monoxide, the invisible gas. Outdoors and far from the house keeps it from drifting inside."},
     {t:"In the garage with the door open", why:"Never! CO can still build up in a garage and seep into the house."},
     {t:"In the basement, out of the rain", why:"Never! Basements trap CO."}]},
   {p:"About how far from windows, doors and vents should it be?", o:[
     {t:"At least 20 feet, with the exhaust pointing away from the house", ok:1, why:"Distance keeps exhaust from entering openings. Many safety groups suggest at least 20 feet."},
     {t:"Right under a bedroom window", why:"Exhaust could drift in. Keep it 20 feet away."},
     {t:"An arm's length", why:"Too close. Aim for 20 feet."}]},
   {p:"It is raining. How do we keep the generator dry?", o:[
     {t:"Use a proper canopy or cover with open sides, keeping the exhaust clear", ok:1, why:"Water and electricity do not mix. A generator cover helps, but never enclose it."},
     {t:"Wrap it in a blanket", why:"Blankets trap heat and exhaust. Don't."},
     {t:"Move it indoors", why:"Never indoors!"}]},
   {p:"How should the fridge get power from the generator?", o:[
     {t:"With a heavy-duty outdoor extension cord, set up by a grown-up", ok:1, why:"A proper cord handles the power. Never plug a generator into a wall outlet, because power can flow backward onto the lines and hurt utility workers."},
     {t:"Plug the generator into a wall outlet", why:"No! That can backfeed power and hurt line workers. Use a proper cord, or an electrician-installed switch."},
     {t:"Thin wire from the kitchen drawer", why:"Thin wire can overheat. Use a heavy-duty cord."}]},
   {p:"What should be inside the house while the generator runs?", o:[
     {t:"Working carbon monoxide alarms, with fresh batteries", ok:1, why:"CO alarms warn you if any gas gets in. If one sounds, get everyone outside and call 911."},
     {t:"Nothing, we can smell CO", why:"CO has no smell! Alarms are the only warning."},
     {t:"Scented candles", why:"Candles do not detect CO and bring fire risk."}]},
   {p:"The generator needs more gas. What is the safe way to refuel?", o:[
     {t:"Turn it off, let it cool, and have a grown-up refill it", ok:1, why:"Gasoline on a hot engine can catch fire. Cool first, then refill."},
     {t:"Pour while it is running", why:"Never! Spilled gas on a hot engine can ignite."},
     {t:"Use a candle to see", why:"No flames near gasoline!"}]}
  ],
  lesson:"Spot it: generators make invisible carbon monoxide. Stay safe: outdoors, 20 feet away, CO alarms inside. Tell a grown-up to do cords and refueling."},

{ id:"powerstrip", title:"Crowded outlet on Birchwood Place", house:15, kind:"powerstrip",
  story:"At Birchwood Place, a power strip behind the TV is packed with plugs and feels warm. Spot it, stay safe, tell a grown-up!",
  steps:[
   {p:"What is the first warning sign here?", o:[
     {t:"The strip is warm, and many plugs are crowded onto it", ok:1, why:"Warm plugs or strips mean too much electricity is flowing. That can start a fire."},
     {t:"The strip has a nice shape", why:"The shape is fine. A warm strip is not."},
     {t:"The TV is large", why:"A big TV is fine. Look at the warm, crowded strip."}]},
   {p:"What should kids do if they see a hot plug or smell something burning?", o:[
     {t:"Tell a grown-up right away and keep away from it", ok:1, why:"A grown-up can switch off the breaker and decide what to do. Don't pull on hot plugs."},
     {t:"Pour water on it", why:"Never! Water and electricity are a dangerous mix."},
     {t:"Cover it with a pillow", why:"That traps heat. Tell a grown-up."}]},
   {p:"Which of these should NOT share a power strip?", o:[
     {t:"High-power things like space heaters, microwaves and toasters", ok:1, why:"They draw a lot of electricity. They belong straight in a wall outlet."},
     {t:"A lamp", why:"A lamp is fine on a strip. Think of the high-power things."},
     {t:"A phone charger", why:"A charger uses very little power."}]},
   {p:"What about plugging one power strip into another?", o:[
     {t:"Don't do it, it can overload the cord", ok:1, why:"Daisy-chaining strips makes them hot and risky."},
     {t:"Do it, more outlets are better", why:"More outlets means more load on one cord. It is a fire risk."},
     {t:"Only on Tuesdays", why:"Never. Not even Tuesdays!"}]},
   {p:"A cord is under the rug and looks frayed. What do we do?", o:[
     {t:"Unplug it only if it's dry and safe, then tell a grown-up to replace it", ok:1, why:"Damaged cords can spark. Rugs hide heat and damage, so cords should not run under them."},
     {t:"Tape it and keep using it", why:"Tape won't fix a damaged cord."},
     {t:"Chew on it", why:"Yikes, no!"}]},
   {p:"Which strip feature is good to look for?", o:[
     {t:"A built-in circuit breaker and a safety listing mark", ok:1, why:"A breaker switches off if it is overloaded, and listing marks show it passed safety tests."},
     {t:"Glitter", why:"Glitter is nice, but it does not make it safe."},
     {t:"A very long cord", why:"Long thin cords can overheat. Look for breaker and safety listing."}]}
  ],
  lesson:"Spot it: warm, crowded strips. Stay safe: don't plug heaters into strips and don't daisy-chain. Tell a grown-up about hot plugs or damaged cords."},

{ id:"draft", title:"Chilly bedroom on Chestnut Street", house:16, kind:"draft",
  story:"Mia's bedroom at Chestnut Street always feels cold at night, even when the heat is on. Where is the cold coming from? Spot it, stay safe, tell a grown-up!",
  steps:[
   {p:"What can make a room feel cold even when the heat is on?", o:[
     {t:"Drafts around windows and doors", ok:1, why:"Cold air leaks in through gaps and warm air leaks out. Sealing gaps saves energy and keeps rooms comfortable."},
     {t:"Too many socks", why:"Socks help! The issue is air leaking."},
     {t:"The color of the walls", why:"Wall color is not the cause. Look for drafts."}]},
   {p:"How can we find a draft safely?", o:[
     {t:"Feel with a hand or watch a thin strip of tissue move", ok:1, why:"A tissue or a hand shows moving air. Never use candles, matches or incense to check, because they are a fire risk."},
     {t:"Use a candle flame next to the curtains", why:"No flames near curtains! Use a tissue or your hand."},
     {t:"Light a match", why:"Never! Flames are not a safe draft test."}]},
   {p:"We found a gap around the window frame. What helps seal it?", o:[
     {t:"Weatherstripping or caulk, applied by a grown-up", ok:1, why:"These seal small gaps. Grown-ups handle caulk tools and ladders."},
     {t:"Stuff in paper towels and crayons", why:"That is not a lasting seal. Use weatherstripping or caulk."},
     {t:"Leave the gap, it is fine", why:"Gaps waste heat. Seal them."}]},
   {p:"Under the door, cold air slips in. What can we add?", o:[
     {t:"A door sweep or draft stopper", ok:1, why:"A sweep blocks air under the door."},
     {t:"A stack of books", why:"Books fall down and don't seal. Use a sweep."},
     {t:"Nothing", why:"A door sweep is cheap and works."}]},
   {p:"Mia's bed pushes against the warm air vent. What is the right move?", o:[
     {t:"Leave space so air can flow, and never cover a heating vent", ok:1, why:"Blocked vents make the system work harder, and covered heaters can overheat. Keep air moving."},
     {t:"Cover the vent with a blanket", why:"Blocking a vent traps heat and wastes energy. Keep it clear."},
     {t:"Stuff paper in the vent", why:"Paper can burn and blocks airflow."}]},
   {p:"What else keeps a bedroom cozy, without any risk?", o:[
     {t:"Closing curtains at night and wearing warm layers", ok:1, why:"Curtains add a little insulation and layers keep you warm. No heater required."},
     {t:"Setting the thermostat to 99", why:"That wastes energy and doesn't warm faster. Try layers and sealing drafts."},
     {t:"Using the oven to heat the house", why:"Never use an oven as a heater. It is a safety and CO risk."}]}
  ],
  lesson:"Spot it: drafts and blocked vents. Stay safe: test with a tissue, never a flame. Tell a grown-up to seal gaps and use ladders."},
{ id:"radiator", title:"Hot radiator at Hawthorn Way", house:17, kind:"radiator",
  story:"Theo's old radiator is hot and knocks sometimes. His little sister likes to hang her mittens on it. Let's keep everybody safe and warm!",
  steps:[
   {p:"The radiator is very hot. What is the safe thing to do?", o:[
     {t:"Don't touch it and tell a grown-up if it is too hot or leaks", ok:1, why:"Radiators can burn skin. Look, don't touch, and let a grown-up handle problems."},{t:"Touch it to check if it works", why:"Ouch! Hot metal can burn. Use your eyes, not your hands."},{t:"Put your hand in the steam from the valve", why:"Never! Steam can burn badly."}]},
   {p:"Theo's sister hung wet mittens on the radiator. What is wrong?", o:[
     {t:"Things can scorch or catch fire if left on it, so keep cloth and paper away", ok:1, why:"Keep clothes, curtains and paper away from hot surfaces. Dry mittens on a rack instead."},{t:"Nothing, that dries them fast", why:"Cloth left on a hot surface can scorch or burn. Use a drying rack."},{t:"Mittens make it heat the room more", why:"They actually block the heat and can be a fire risk."}]},
   {p:"The radiator bangs loudly when it heats. Who fixes that?", o:[
     {t:"A grown-up or a trained heating tech", ok:1, why:"Banging can mean water or air trapped in the pipes. A tech checks the pitch and the valve."},{t:"A kid with a wrench", why:"Never. Hot pipes and pressure are dangerous. Call a grown-up."},{t:"Nobody, ignore it", why:"Noise is a clue. A tech can find the cause and fix it."}]},
   {p:"Where should furniture go near a radiator?", o:[
     {t:"A few feet away so heat and air can move", ok:1, why:"Giving radiators space helps them heat the room and keeps things from burning."},{t:"Pushed tight against it", why:"Blocking it traps heat and can scorch furniture."},{t:"Covered with a thick blanket", why:"Never cover a heater. It can overheat."}]}
  ],
  lesson:"Spot it: hot surfaces. Stay safe: look, don't touch; keep cloth and paper away. Tell a grown-up about banging or leaks."},
{ id:"bathfan", title:"Steamy bathroom on Sycamore Street", house:18, kind:"bathfan",
  story:"After every shower the mirror at Nina's house stays foggy and there are dark spots on the ceiling. Time to find out why!",
  steps:[
   {p:"Why do bathrooms get damp after a hot shower?", o:[
     {t:"Warm steam turns into water drops on cool surfaces", ok:1, why:"Steam cools on mirrors and walls and turns back into water. Too much moisture can grow mold."},{t:"The shower is broken", why:"The shower is fine. It's the steam that stays in the room."},{t:"The walls are sweating from the sun", why:"It's the steam from the shower, not the sun."}]},
   {p:"What helps clear the moisture?", o:[
     {t:"Run the exhaust fan during and after the shower", ok:1, why:"A bathroom fan pulls damp air out of the house. Let it run for about 20 minutes after showering."},{t:"Close the door and hold your breath", why:"That keeps moisture trapped."},{t:"Turn on the heater and shut the vent", why:"Closing vents traps damp air. Use the fan."}]},
   {p:"The fan is dusty and slow. What is the safe fix?", o:[
     {t:"A grown-up turns the power off, then cleans or replaces it", ok:1, why:"Dust blocks airflow and can be a fire risk. Power must be off before anyone touches a fan or its wiring."},{t:"Spray water on the fan while it runs", why:"Never! Water and electricity don't mix."},{t:"Poke it with a pencil while running", why:"Never put anything into a spinning fan."}]},
   {p:"The dark spots on the ceiling look fuzzy. What should we do?", o:[
     {t:"Tell a grown-up; mold needs to be cleaned the right way", ok:1, why:"Mold can bother noses and lungs. A grown-up can clean small spots and fix the moisture cause."},{t:"Scratch it off with your fingers", why:"Don't touch mold. Tell a grown-up."},{t:"Cover it with a poster", why:"Hiding it doesn't remove the moisture or mold."}]}
  ],
  lesson:"Spot it: moisture and mold. Stay safe: use the fan, not your hands. Tell a grown-up to turn power off before any fan repair."},
{ id:"fireplace", title:"Cozy fireplace on Juniper Lane", house:19, kind:"fireplace",
  story:"Omar's family likes to use their fireplace on cold nights. The kids want to help. Let's learn how to keep a cozy fire safe!",
  steps:[
   {p:"Who should light the fireplace?", o:[
     {t:"A grown-up", ok:1, why:"Fire is a tool for grown-ups. Kids should stay back and watch from a safe distance."},{t:"Any kid with a lighter", why:"Never. Matches and lighters are not toys."},{t:"Nobody, we never use fireplaces", why:"Fireplaces can be used safely when a grown-up is in charge."}]},
   {p:"What goes in front of the fire to catch sparks?", o:[
     {t:"A sturdy screen or glass doors", ok:1, why:"A screen stops sparks and keeps little hands and pets away."},{t:"A cardboard box", why:"Cardboard can burn! Use a metal screen."},{t:"Nothing needed", why:"Sparks can fly. Always use a screen."}]},
   {p:"A fire makes smoke and a gas you can't see or smell. Which alarm protects the family?", o:[
     {t:"A carbon monoxide alarm and a smoke alarm", ok:1, why:"Carbon monoxide is invisible. Alarms warn you in time. Test them monthly."},{t:"A doorbell", why:"A doorbell won't warn about CO or smoke."},{t:"No alarm, just open a window", why:"Alarms are important. Always have working ones."}]},
   {p:"Bedtime. What happens to the fire?", o:[
     {t:"It is fully out, and a grown-up checks it before bed", ok:1, why:"Never leave a fire burning while everyone sleeps. Make sure it is completely out."},{t:"Leave it burning, it's cozy", why:"Unattended fires are dangerous."},{t:"Pour a big bucket of water in", why:"Water can crack parts and make steam. A grown-up knows the safe way to put it out."}]}
  ],
  lesson:"Spot it: fire and CO. Stay safe: grown-ups only, with a screen and working alarms. Make sure the fire is out before bed."},
{ id:"winter", title:"Winter chill on Snowberry Lane", house:20, kind:"winter",
  story:"It is a snowy night and the Okafor family is bundled up on the couch. The heat has stopped and the house is getting chilly. Let's help them stay warm and safe!",
  steps:[
   {p:"The house is cold. What do we check first?", o:[
     {t:"Is the thermostat on HEAT and set higher than the room?", ok:1, why:"The easy things first. A thermostat set wrong is a very common cause."},{t:"Open the furnace and poke around", why:"Not yet! Check the simple things before opening anything."},{t:"Turn on the oven for heat", why:"Never! An oven is not a heater and can make dangerous fumes."}]},
   {p:"The thermostat is fine. The family wants to stay warm while we work. What is a safe way?", o:[
     {t:"Warm clothes, blankets and staying together in one room", ok:1, why:"Layers and blankets keep you warm without any risk. A grown-up decides if it is too cold to stay."},{t:"Light a charcoal grill inside", why:"Never! Charcoal and gas grills make carbon monoxide, which is deadly indoors."},{t:"Use the stove burners all night", why:"Never use a stove as a heater. It is a fire and CO risk."}]},
   {p:"The furnace is off with a blinking light. What do we do before opening it?", o:[
     {t:"Turn the furnace power off first, with a grown-up", ok:1, why:"Power off first, every time. Furnaces have electricity inside."},{t:"Just open it, the light is blinking", why:"Stop! Turn the power off first."},{t:"Spray water to cool it", why:"Never! Water and electricity do not mix."}]},
   {p:"The furnace is working again. What should we check before the family goes to bed?", o:[
     {t:"That the carbon monoxide alarm is working", ok:1, why:"Fuel-burning heat makes a gas you cannot see or smell. A working CO alarm keeps everyone safe."},{t:"That the TV is on", why:"The TV does not protect anyone. Check the CO alarm."},{t:"Nothing, it is warm now", why:"Always check the CO alarm after heating problems."}]}
  ],
  lesson:"Spot it: no heat. Stay safe: blankets and warm clothes, never grills or ovens for heat. Check the CO alarm. Tell a grown-up."},
{ id:"springfilter", title:"Spring-cleaning at Tulip Terrace", house:21, kind:"springfilter",
  story:"It is spring and Priya's family is cleaning the whole house. They want the air to feel fresh. Time to check the air filter!",
  steps:[
   {p:"What does an air filter do?", o:[
     {t:"It catches dust and pollen before they flow through the house", ok:1, why:"A filter traps dust, pet hair and pollen so the system and the air stay cleaner."},{t:"It makes the air warm", why:"The furnace or heat pump does that. A filter catches dust."},{t:"It plays music", why:"Not quite! It catches dust."}]},
   {p:"How can we tell a filter is dirty?", o:[
     {t:"It looks gray and fuzzy and you can't see light through it", ok:1, why:"A packed filter blocks air. Hold it up to the light to check."},{t:"It smells like cookies", why:"Smell is not a good test. Look at it."},{t:"It is shiny", why:"A dirty filter is gray and fuzzy."}]},
   {p:"Before taking the old filter out, what should a grown-up do?", o:[
     {t:"Turn the system off", ok:1, why:"Turn it off so it does not run without a filter and nothing spins while hands are near."},{t:"Leave it running and pull the filter", why:"Turn it off first."},{t:"Take off all the panels", why:"Only the filter door is needed. Never open other panels."}]},
   {p:"How do we put the new filter in?", o:[
     {t:"Match the arrow to the direction the air flows, toward the furnace or air handler", ok:1, why:"The arrow shows airflow direction. Wrong way means it works badly."},{t:"Any way, it does not matter", why:"The arrow matters! It shows airflow direction."},{t:"Tape it on the outside of the vent", why:"Use the filter slot, not tape."}]},
   {p:"How often should families check the filter?", o:[
     {t:"About once a month, and change it when it is dirty", ok:1, why:"Regular checks keep air flowing and save energy."},{t:"Once every ten years", why:"Way too long! Check often."},{t:"Never, it is a lifetime filter", why:"Even good filters need changes. Check monthly."}]}
  ],
  lesson:"Spot it: a gray, dusty filter. Stay safe: power off first, arrow with the airflow. Tell a grown-up to change it about every month."},
{ id:"alarmcheck", title:"Battery check on Cardinal Court", house:22, kind:"alarmcheck",
  story:"The Lopez family's smoke alarm chirps every minute and the CO alarm light looks dim. Let's do a safe alarm check!",
  steps:[
   {p:"A smoke alarm chirps every minute. What does that usually mean?", o:[
     {t:"The battery is low and needs changing", ok:1, why:"A short chirp is a friendly reminder to change the battery."},{t:"It is broken and should be thrown away", why:"Not yet! It probably needs a battery."},{t:"It is telling a joke", why:"Chirps are important! It needs a battery."}]},
   {p:"Who changes the battery?", o:[
     {t:"A grown-up, using a stable step stool", ok:1, why:"Grown-ups handle ladders and batteries. Kids can hold the new battery."},{t:"A kid standing on a chair", why:"Never! Falls are a big risk."},{t:"Nobody, just unplug it", why:"Alarms must stay working. Change the battery."}]},
   {p:"After the new battery is in, how do we check it works?", o:[
     {t:"Press and hold the test button", ok:1, why:"The test button makes the alarm sound to show it works."},{t:"Light a candle under it", why:"Never! No flames to test an alarm."},{t:"Blow on it", why:"The test button is the safe way."}]},
   {p:"The CO alarm shows an end-of-life message. What do we do?", o:[
     {t:"Tell a grown-up to replace the alarm", ok:1, why:"Alarms wear out, often after about 5 to 10 years. Check the date on the label."},{t:"Cover it with tape", why:"Never cover an alarm."},{t:"Ignore it, it is old", why:"Old alarms may not work. Replace it."}]},
   {p:"If the CO alarm goes off for real, what is the safest thing to do?", o:[
     {t:"Go outside to fresh air and tell a grown-up to call for help", ok:1, why:"Fresh air first. Then call for help from outside."},{t:"Open the oven", why:"Never! That makes it worse."},{t:"Hide under a blanket", why:"Go outside right away."}]}
  ],
  lesson:"Spot it: chirps and end-of-life messages. Stay safe: grown-ups use ladders, test buttons only, never flames. If a CO alarm sounds, get outside and call for help."},
{ id:"leaves", title:"Leafy outdoor unit on Maple Hollow", house:23, kind:"leaves",
  story:"In summer the big box outside the Chang family's house is surrounded by leaves and grass. It helps cool the house, but it cannot breathe! Let's clear it safely.",
  steps:[
   {p:"Why does the outdoor unit need space around it?", o:[
     {t:"It needs air to move through it so it can cool the house", ok:1, why:"The unit sends heat outside. Leaves and plants block the air."},{t:"It is shy", why:"Ha! It just needs air to flow."},{t:"So the cat can sleep there", why:"It needs clear space so air can flow."}]},
   {p:"Before cleaning near the unit, what should a grown-up do?", o:[
     {t:"Turn the unit's power off at the outdoor switch", ok:1, why:"Power off first. A fan and electricity are inside."},{t:"Reach in with a stick while it runs", why:"Never! The fan can hurt."},{t:"Turn on the garden hose", why:"Not yet! Power off first."}]},
   {p:"How do we clear it?", o:[
     {t:"Remove leaves and grass by hand with gloves; keep about 2 feet of space around it", ok:1, why:"Gentle clearing keeps the fins safe. Do not use sharp tools."},{t:"Hit the unit with a rake", why:"The thin fins bend easily. Be gentle."},{t:"Pile mulch around it", why:"Mulch blocks air. Keep it clear."}]},
   {p:"What is the thin metal on the sides called, and how do we treat it?", o:[
     {t:"Fins, and we never poke them", ok:1, why:"Fins are thin and sharp and bend easily. Let a grown-up or a tech clean deeply."},{t:"Hooks, and we bend them", why:"Don't bend fins!"},{t:"Toys, and we play with them", why:"Not toys! They are sharp."}]},
   {p:"After clearing, what should a grown-up do?", o:[
     {t:"Turn the power back on and listen for normal sounds", ok:1, why:"A quiet hum and moving air show it is happy."},{t:"Cover it with a tarp", why:"Never cover it while it runs."},{t:"Put a chair on top", why:"Keep it clear."}]}
  ],
  lesson:"Spot it: leaves and blocked air. Stay safe: power off, gloves, never poke the fins. Keep about two feet of space and let a grown-up restore the power."},
{ id:"vacation", title:"Vacation mode mix-up on Seashell Street", house:24, kind:"vacation",
  story:"The Rivers family is back from a trip and the thermostat still says 'Vacation'. The house is too cold and Maya is puzzled. Let's solve the puzzle!",
  steps:[
   {p:"What does vacation or away mode usually do?", o:[
     {t:"It lets the house get warmer or cooler to save energy when nobody is home", ok:1, why:"Away mode saves energy by relaxing the temperature when no one is home."},{t:"It turns the house into a beach", why:"Ha! It just saves energy."},{t:"It locks the doors", why:"No, it only changes the temperature settings."}]},
   {p:"The family is home. What should we check on the thermostat?", o:[
     {t:"The mode and schedule, and set it back to Home", ok:1, why:"The mode needs to match what the family is doing."},{t:"Hit it with a hammer", why:"Never! Use the buttons."},{t:"Open the back and pull wires", why:"Not needed! Use the display."}]},
   {p:"Maya wants it very cold, 50 degrees. Does that cool the house faster?", o:[
     {t:"No, it only runs longer and uses more energy", ok:1, why:"The system cools at one speed. A comfortable setting works best."},{t:"Yes, much faster", why:"It runs at the same speed. Pick a comfy number."},{t:"Yes, and the water gets colder", why:"No! It does not change the pipes."}]},
   {p:"What is a good way to save energy while the family is away on trips?", o:[
     {t:"Use a sensible away setting and a schedule", ok:1, why:"Small changes save energy without making the house uncomfortable."},{t:"Turn the system off in extreme weather", why:"In very hot or cold weather, pipes and pets need protection. Use a sensible setting."},{t:"Leave all windows open", why:"Open windows waste energy and invite weather."}]}
  ],
  lesson:"Spot it: the wrong mode or schedule. Stay safe: use the buttons, not tools. Pick comfortable settings and tell a grown-up to set schedules."}
];
