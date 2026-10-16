/* Which lessons back each troubleshooting tree and game scenario. Each lesson has its own cited Sources list. Used by troubleshooter.js and games.js. Lessons live in the same folder as the pages that load this file. */
window.SOURCE_MAP = {
 "no-cooling-ac": [
  "ac-running-but-not-cooling",
  "capacitors-and-contactors",
  "testing-capacitors-contactors-and-relays-with-a-meter"
 ],
 "no-heat-gas-furnace": [
  "gas-furnace-sequence-of-operation",
  "furnace-short-cycling-why-it-happens",
  "furnace-blowing-cold-air"
 ],
 "short-cycling": [
  "furnace-short-cycling-why-it-happens",
  "steam-boiler-short-cycling-causes"
 ],
 "ice-on-evaporator-coil": [
  "ac-running-but-not-cooling",
  "airflow-and-static-pressure-basics",
  "superheat-and-subcooling-basics"
 ],
 "weak-airflow-or-hot-cold-rooms": [
  "high-limit-trips-and-airflow",
  "airflow-and-static-pressure-basics",
  "ductwork-basics-and-common-problems"
 ],
 "blower-does-not-run": [
  "ecm-blower-motors",
  "airflow-and-static-pressure-basics"
 ],
 "a2l-leak-sensor-fault-or-mitigation-lockout": [
  "a2l-control-boards-and-mitigation",
  "a2l-mitigation-alarm-fault-handling",
  "a2l-leak-detection-sensors"
 ],
 "inverter-outdoor-unit-fault": [
  "inverter-drives-and-variable-speed-compressors",
  "mini-split-basics"
 ],
 "steam-radiator-not-heating": [
  "steam-radiator-air-vents",
  "one-pipe-vs-two-pipe-steam-systems",
  "low-vs-high-pressure-steam"
 ],
 "hot-water-zone-cold": [
  "zone-valves-vs-zone-circulators",
  "zoning-and-zone-dampers-basics",
  "hot-water-no-heat-circulator-zone-valve-and-air-diagnosis"
 ],
 "no-24v-low-voltage": [
  "low-voltage-short-blown-fuse-and-transformer-troubleshooting",
  "relays-transformers-and-24v-control",
  "electrical-basics-for-hvac"
 ],
 "furnace-ignition-lockout": [
  "gas-furnace-sequence-of-operation",
  "furnace-blowing-cold-air",
  "furnace-short-cycling-why-it-happens"
 ],
 "boiler-not-firing": [
  "low-water-cutoff-testing-and-maintenance",
  "boiler-startup-shutdown-and-layup-basics",
  "steam-boiler-short-cycling-causes"
 ],
 "rooftop-unit-not-cooling": [
  "rooftop-unit-basics",
  "rooftop-unit-preventive-maintenance-checklist-what-to-check-and-how-often",
  "rtu-gas-heat-lockouts-and-rooftop-safety"
 ],
 "vrf-indoor-unit-error": [
  "vrf-vrv-basics",
  "a2l-mitigation-alarm-fault-handling",
  "mini-split-basics"
 ],
 "condensate-safety-switch-trips": [
  "pressure-switch-and-inducer-diagnosis",
  "water-leaking-from-ac-or-furnace-condensate-drain"
 ],
 "steam-spitting-water-hammer": [
  "water-hammer-in-steam-and-hot-water",
  "one-pipe-vs-two-pipe-steam-systems",
  "low-vs-high-pressure-steam"
 ],
 "steam-boiler-short-cycle-low-water": [
  "steam-boiler-short-cycling-causes",
  "steam-boiler-pressure-controls-and-gauges",
  "water-hammer-in-steam-and-hot-water"
 ],
 "hydronic-circulator-not-running": [
  "hot-water-no-heat-circulator-zone-valve-and-air-diagnosis",
  "zone-valves-vs-zone-circulators",
  "zoning-and-zone-dampers-basics"
 ],
 "mini-split-not-cooling-fault": [
  "mini-split-basics",
  "mini-split-troubleshooting-checks",
  "mini-split-cleaning-and-maintenance-habits"
 ],
 "heat-pump-outdoor-iced-defrost": [
  "heat-pump-iced-up-normal-defrost-or-problem",
  "defrost-cycle-and-auxiliary-heat",
  "heat-pump-defrost-control-boards-and-sensors"
 ],
 "heat-pump-aux-heat-too-much": [
  "emergency-heat-vs-auxiliary-heat-and-lockouts",
  "defrost-cycle-and-auxiliary-heat",
  "heat-pump-basics"
 ],
 "walk-in-cooler-warm-or-icing": [
  "walk-in-cooler-and-freezer-defrost-evaporator-fan-delay-and-icing",
  "walk-in-cooler-and-commercial-refrigeration-basics",
  "commercial-refrigeration-cold-holding-41-f-and-food-safety-checks"
 ],
 "rooftop-economizer-stuck": [
  "rtu-economizer-fault-diagnosis-and-damper-actuator-checks",
  "rooftop-unit-basics",
  "economizer-settings-changeover-minimum-position-and-low-limit"
 ],
 "vrf-minisplit-no-start-after-outage": [
  "vrf-vrv-basics",
  "mini-split-basics",
  "mini-split-troubleshooting-checks"
 ],
 "smart-thermostat-blank-no-c-wire": [
  "thermostat-blank-or-wrong-temperature",
  "thermostat-wiring-and-smart-thermostats",
  "thermostat-terminal-letters-r-c-w-y-g-explained"
 ],
 "radiant-floor-zone-not-warming": [
  "radiant-floor-heating-basics",
  "zone-valves-vs-zone-circulators",
  "zoning-and-zone-dampers-basics"
 ],
 "steam-boiler-wet-steam-surging-level": [
  "wet-steam-and-carryover-basics",
  "steam-boiler-short-cycling-causes",
  "steam-system-fundamentals"
 ],
 "rtu-supply-fan-low-airflow": [
  "rooftop-unit-basics",
  "belt-drives-and-sheave-basics"
 ],
 "rtu-gas-heat-no-heat": [
  "rtu-gas-heat-section-basics",
  "rtu-gas-heat-lockouts-and-rooftop-safety",
  "rooftop-unit-basics"
 ],
 "furnace-cycles-on-limit-switch": [
  "furnace-short-cycling-why-it-happens",
  "furnace-blowing-cold-air",
  "high-limit-trips-and-airflow"
 ],
 "furnace-flame-lights-then-drops-out": [
  "furnace-short-cycling-why-it-happens",
  "gas-furnace-sequence-of-operation",
  "furnace-blowing-cold-air"
 ],
 "furnace-igniter-does-not-glow": [
  "hot-surface-igniter-care-and-testing",
  "gas-furnace-sequence-of-operation",
  "furnace-no-heat-from-led-code-to-part"
 ],
 "furnace-draft-pressure-switch-wont-close": [
  "pressure-switch-and-inducer-diagnosis",
  "gas-furnace-sequence-of-operation",
  "furnace-no-heat-from-led-code-to-part"
 ],
 "condenser-fan-not-running-compressor-hot": [
  "condenser-fan-motor-and-capacitor-failures",
  "dirty-condenser-and-head-pressure"
 ],
 "cooling-high-head-pressure": [
  "dirty-condenser-and-head-pressure",
  "ac-running-but-not-cooling"
 ],
 "cooling-low-suction-high-superheat": [
  "refrigeration-superheat-checks-and-oil-return",
  "superheat-and-subcooling-basics",
  "undercharge-vs-overcharge-symptom-table"
 ],
 "boiler-relief-valve-drips-pressure-high": [
  "boiler-pressure-too-high-or-too-low-homeowner-guide",
  "steam-boiler-pressure-controls-and-gauges",
  "boiler-safety-valves-and-overpressure-protection"
 ],
 "hydronic-zone-gurgles-air-bound": [
  "zone-valves-vs-zone-circulators",
  "hot-water-no-heat-circulator-zone-valve-and-air-diagnosis",
  "zoning-and-zone-dampers-basics"
 ],
 "zone-valve-motor-not-opening": [
  "zone-valves-vs-zone-circulators",
  "zoning-and-zone-dampers-basics",
  "hot-water-no-heat-circulator-zone-valve-and-air-diagnosis"
 ],
 "heat-pump-heating-poorly-while-running": [
  "heat-pump-basics",
  "heat-pump-iced-up-normal-defrost-or-problem"
 ],
 "heat-pump-outdoor-dead-aux-heat-only": [
  "emergency-heat-vs-auxiliary-heat-and-lockouts",
  "heat-pump-basics",
  "heat-pump-balance-point-and-low-temperature-capacity"
 ],
 "rtu-belt-squeals-or-blower-overloads": [
  "belt-drives-and-sheave-basics",
  "rooftop-unit-basics"
 ],
 "controls-sensor-reads-wrong": [
  "building-automation-basics",
  "bas-sensor-types-calibration-drift-and-setpoint-habits",
  "thermostat-blank-or-wrong-temperature"
 ],
 "controls-valve-hunting": [
  "rtu-economizer-fault-diagnosis-and-damper-actuator-checks",
  "building-automation-basics",
  "economizers-basics"
 ],
 "steam-pressuretrol-set-too-high-vents-spit": [
  "steam-boiler-pressure-controls-and-gauges",
  "steam-radiator-air-vents",
  "steam-main-venting-basics"
 ],
 "reach-in-refrigerator-warm-or-frosted": [
  "commercial-refrigeration-cold-holding-41-f-and-food-safety-checks",
  "walk-in-cooler-and-commercial-refrigeration-basics",
  "reach-in-and-display-case-defrost-and-care"
 ],
 "ice-machine-not-making-ice-or-thin-output": [
  "ice-machine-water-quality-scale-and-sanitizing",
  "ice-machine-freeze-and-harvest-cycle-basics",
  "ice-machine-cycle-three-makers-compared-timers-and-safety-limits"
 ],
 "walk-in-evaporator-ice-buildup-defrost-fault": [
  "walk-in-cooler-and-freezer-defrost-evaporator-fan-delay-and-icing",
  "walk-in-cooler-and-commercial-refrigeration-basics",
  "heat-pump-iced-up-normal-defrost-or-problem"
 ],
 "mini-split-indoor-unit-water-leak": [
  "mini-split-basics",
  "mini-split-troubleshooting-checks",
  "mini-split-cleaning-and-maintenance-habits"
 ],
 "erv-hrv-low-airflow-weak-ventilation": [
  "erv-vs-hrv-what-each-recovers-and-how-to-maintain-them",
  "indoor-air-quality-and-ventilation-basics",
  "ventilation-rates-and-balancing-basics-ashrae-62-2"
 ],
 "hrv-erv-frost-on-core-cold-weather": [
  "erv-vs-hrv-what-each-recovers-and-how-to-maintain-them"
 ],
 "chiller-trips-low-evaporator-temp-freeze": [
  "chiller-startup-shutdown-sequence-and-safeties",
  "chiller-plant-fundamentals"
 ],
 "chiller-flow-switch-or-high-head-trip": [
  "dirty-condenser-and-head-pressure",
  "chiller-startup-shutdown-sequence-and-safeties",
  "chiller-plant-fundamentals"
 ],
 "cooling-tower-high-condenser-water-temp": [
  "cooling-tower-basics",
  "cooling-tower-fan-vfd-staging-and-condenser-water-reset",
  "cooling-tower-legionella-cdc-vs-osha-and-water-management-programs"
 ],
 "steam-trap-cold-or-blowing": [
  "steam-trap-testing-methods-sight-sound-and-temperature",
  "steam-trap-types-and-where-each-fits",
  "steam-traps-explained"
 ],
 "steam-coil-water-hammer-banging": [
  "water-hammer-in-steam-and-hot-water",
  "steam-system-fundamentals",
  "low-vs-high-pressure-steam"
 ],
 "boiler-water-carryover-foaming-scale": [
  "wet-steam-and-carryover-basics",
  "boiler-water-treatment-and-blowdown-basics",
  "why-boilers-blow-down-surface-vs-mud-blowdown-and-automatic-control"
 ],
 "deaerator-feedwater-pump-cavitation-or-trip": [
  "feedwater-deaerators-and-oxygen-basics",
  "pump-cavitation-basics",
  "condensate-return-and-feedwater-basics"
 ],
 "bas-zone-overheats-despite-valve-open": [
  "bas-sensor-types-calibration-drift-and-setpoint-habits",
  "bas-point-types-and-reading-the-graphics"
 ],
 "a2l-mitigation-alarm-active-or-history-response": [
  "a2l-mitigation-alarm-fault-handling",
  "a2l-control-boards-and-mitigation",
  "a2l-leak-detection-sensors"
 ],
 "mini-split-communication-fault-or-indoor-icing-checks": [
  "mini-split-troubleshooting-checks",
  "mini-split-basics",
  "mini-split-cleaning-and-maintenance-habits"
 ],
 "ice-machine-which-stage-fails-freeze-or-harvest": [
  "ice-machine-freeze-and-harvest-cycle-basics",
  "ice-machine-cycle-three-makers-compared-timers-and-safety-limits",
  "ice-machine-water-quality-scale-and-sanitizing"
 ],
 "steam-trap-suspected-failure-two-method-confirm": [
  "steam-trap-testing-methods-sight-sound-and-temperature",
  "steam-trap-types-and-where-each-fits",
  "steam-traps-explained"
 ],
 "chiller-will-not-start-prove-flow-oil-safeties": [
  "chiller-startup-shutdown-sequence-and-safeties",
  "chiller-plant-fundamentals",
  "chiller-plant-daily-rounds-walkthrough"
 ],
 "erv-hrv-weak-airflow-or-frost-check-order": [
  "erv-vs-hrv-what-each-recovers-and-how-to-maintain-them"
 ],
 "thermostat-no-power-24v-circuit-check": [
  "thermostat-blank-or-wrong-temperature",
  "thermostat-wiring-and-smart-thermostats",
  "relays-transformers-and-24v-control"
 ],
 "condenser-fan-no-start-compressor-hums-capacitor-first": [
  "condenser-fan-motor-and-capacitor-failures",
  "capacitors-and-contactors",
  "rtu-refrigerant-circuit-and-compressor-protection"
 ],
 "contactor-chatters-or-will-not-pull-in": [
  "rtu-cooling-sequence-of-operation-and-the-safety-chain",
  "capacitors-and-contactors",
  "testing-capacitors-contactors-and-relays-with-a-meter"
 ],
 "control-fuse-keeps-blowing-find-the-short": [
  "low-voltage-short-blown-fuse-and-transformer-troubleshooting",
  "relays-transformers-and-24v-control",
  "furnace-blowing-cold-air"
 ],
 "ecm-blower-will-not-run-or-wrong-speed-module-vs-motor": [
  "ecm-blower-motors",
  "high-limit-trips-and-airflow",
  "whats-different-modern-vs-older-systems"
 ],
 "meter-reads-nothing-or-wrong-safe-and-right": [
  "multimeter-safety-and-cat-ratings",
  "testing-capacitors-contactors-and-relays-with-a-meter",
  "electrical-basics-for-hvac"
 ],
 "rtu-fan-runs-no-cooling-safety-chain": [
  "rtu-cooling-sequence-of-operation-and-the-safety-chain",
  "rooftop-unit-basics",
  "rtu-gas-heat-lockouts-and-rooftop-safety"
 ],
 "rtu-economizer-warm-humid-or-stuffy": [
  "economizer-settings-changeover-minimum-position-and-low-limit",
  "rtu-economizer-fault-diagnosis-and-damper-actuator-checks",
  "rtu-gas-heat-lockouts-and-rooftop-safety"
 ],
 "tower-basin-slimy-after-idle-legionella-risk": [
  "cooling-tower-fan-fill-drift-and-basin-checks",
  "cooling-tower-legionella-cdc-vs-osha-and-water-management-programs",
  "cooling-tower-basics"
 ],
 "chiller-more-power-same-load-approach-rising": [
  "chiller-approach-temperatures-reading-the-trend",
  "reading-a-chiller-log-what-to-record-and-how-to-trend-approach",
  "chiller-plant-fundamentals"
 ],
 "steam-boiler-cloudy-water-sight-glass-foams": [
  "wet-steam-and-carryover-basics",
  "boiler-water-treatment-and-blowdown-basics",
  "why-boilers-blow-down-surface-vs-mud-blowdown-and-automatic-control"
 ],
 "walk-in-cooler-box-warm-product-at-risk-triage": [
  "walk-in-cooler-and-commercial-refrigeration-basics",
  "commercial-refrigeration-cold-holding-41-f-and-food-safety-checks",
  "walk-in-cooler-and-freezer-defrost-evaporator-fan-delay-and-icing"
 ],
 "walk-in-freezer-defrost-never-ends-or-trips-after-defrost": [
  "walk-in-cooler-and-freezer-defrost-evaporator-fan-delay-and-icing",
  "reading-a-defrost-cycle-on-the-gauges",
  "defrost-cycle-and-auxiliary-heat"
 ],
 "iced-coil-dirty-filter": [
  "how-often-to-change-your-air-filter-and-merv",
  "ac-running-but-not-cooling",
  "heat-pump-iced-up-normal-defrost-or-problem"
 ],
 "furnace-flame-sensor": [
  "flame-sensor-cleaning-and-microamps",
  "flame-safeguard-and-ignition-basics",
  "gas-furnace-sequence-of-operation"
 ],
 "a2l-sensor-lockout": [
  "a2l-leak-detection-sensors",
  "a2l-service-safety-and-tools",
  "a2l-control-boards-and-mitigation"
 ],
 "ecm-blower-no-run": [
  "ecm-blower-motors",
  "high-limit-trips-and-airflow",
  "airflow-and-static-pressure-basics"
 ],
 "inverter-comm-fault": [
  "inverter-drives-and-variable-speed-compressors",
  "mini-split-troubleshooting-checks"
 ],
 "steam-vent-clogged": [
  "steam-radiator-air-vents",
  "one-pipe-vs-two-pipe-steam-systems",
  "steam-main-venting-basics"
 ],
 "hydronic-zone-air": [
  "zone-valves-vs-zone-circulators",
  "zoning-and-zone-dampers-basics",
  "hot-water-no-heat-circulator-zone-valve-and-air-diagnosis"
 ],
 "heat-pump-ice-defrost": [
  "heat-pump-iced-up-normal-defrost-or-problem",
  "defrost-cycle-and-auxiliary-heat",
  "heat-pump-basics"
 ],
 "dead-thermostat-blown-fuse": [
  "low-voltage-short-blown-fuse-and-transformer-troubleshooting",
  "thermostat-blank-or-wrong-temperature",
  "thermostat-wiring-and-smart-thermostats"
 ],
 "furnace-blocked-trap-lockout": [
  "pressure-switch-and-inducer-diagnosis",
  "gas-furnace-sequence-of-operation"
 ],
 "boiler-low-pressure-lockout": [
  "boiler-pressure-too-high-or-too-low-homeowner-guide",
  "steam-boiler-pressure-controls-and-gauges"
 ],
 "rooftop-dirty-condenser-trip": [
  "dirty-condenser-and-head-pressure",
  "rooftop-unit-basics",
  "rooftop-unit-preventive-maintenance-checklist-what-to-check-and-how-often"
 ],
 "vrf-indoor-communication-error": [
  "vrf-vrv-basics",
  "a2l-mitigation-alarm-fault-handling",
  "mini-split-troubleshooting-checks"
 ],
 "condensate-float-switch-trip": [
  "pressure-switch-and-inducer-diagnosis",
  "water-leaking-from-ac-or-furnace-condensate-drain",
  "ac-running-but-not-cooling"
 ],
 "steam-radiator-hammer-pitch": [
  "steam-radiator-air-vents",
  "one-pipe-vs-two-pipe-steam-systems",
  "water-hammer-in-steam-and-hot-water"
 ],
 "steam-boiler-lwco-sediment": [
  "steam-boiler-pressure-controls-and-gauges",
  "low-water-cutoff-testing-and-maintenance",
  "steam-boiler-short-cycling-causes"
 ],
 "hydronic-circulator-capacitor": [
  "hot-water-no-heat-circulator-zone-valve-and-air-diagnosis",
  "zone-valves-vs-zone-circulators"
 ],
 "heat-pump-aux-setback": [
  "emergency-heat-vs-auxiliary-heat-and-lockouts",
  "heat-pump-basics"
 ],
 "walk-in-gasket-icing": [
  "walk-in-cooler-and-freezer-defrost-evaporator-fan-delay-and-icing",
  "walk-in-cooler-and-commercial-refrigeration-basics"
 ],
 "economizer-stuck-open-hot": [
  "rtu-economizer-fault-diagnosis-and-damper-actuator-checks",
  "rooftop-unit-basics",
  "economizers-basics"
 ],
 "minisplit-outage-restart-delay": [
  "mini-split-basics",
  "mini-split-troubleshooting-checks",
  "mini-split-cleaning-and-maintenance-habits"
 ],
 "smart-thermostat-spare-wire": [
  "thermostat-wiring-and-smart-thermostats",
  "thermostat-blank-or-wrong-temperature",
  "thermostat-terminal-letters-r-c-w-y-g-explained"
 ],
 "radiant-outdoor-sensor-in-sun": [
  "radiant-floor-heating-basics",
  "outdoor-reset-and-weather-compensation",
  "mixing-valves-and-injection-mixing-basics"
 ],
 "steam-feeder-set-high-priming": [
  "wet-steam-and-carryover-basics",
  "water-hammer-in-steam-and-hot-water",
  "low-vs-high-pressure-steam"
 ],
 "rtu-glazed-belt-slipping": [
  "belt-drives-and-sheave-basics",
  "rooftop-unit-basics"
 ],
 "rtu-gas-pressure-switch-blocked-vent": [
  "rtu-gas-heat-lockouts-and-rooftop-safety",
  "rtu-gas-heat-section-basics",
  "rooftop-unit-basics"
 ],
 "furnace-igniter-open-circuit": [
  "gas-furnace-sequence-of-operation",
  "hot-surface-igniter-care-and-testing",
  "pressure-switch-and-inducer-diagnosis"
 ],
 "furnace-flame-sensor-coated-dropout": [
  "flame-safeguard-and-ignition-basics",
  "furnace-short-cycling-why-it-happens",
  "flame-sensor-cleaning-and-microamps"
 ],
 "furnace-dirty-filter-high-limit": [
  "furnace-short-cycling-why-it-happens",
  "furnace-blowing-cold-air",
  "high-limit-trips-and-airflow"
 ],
 "furnace-weak-blower-capacitor": [
  "high-limit-trips-and-airflow"
 ],
 "cooling-low-charge-leak-oily-fitting": [
  "ac-running-but-not-cooling",
  "superheat-and-subcooling-basics",
  "epa-608-basics"
 ],
 "cooling-dirty-condenser-high-head": [
  "dirty-condenser-and-head-pressure",
  "ac-running-but-not-cooling",
  "high-limit-trips-and-airflow"
 ],
 "cooling-fan-capacitor-hot-compressor": [
  "condenser-fan-motor-and-capacitor-failures",
  "capacitors-and-contactors",
  "ac-running-but-not-cooling"
 ],
 "cooling-liquid-line-restriction-drier": [
  "ac-running-but-not-cooling",
  "superheat-and-subcooling-basics",
  "undercharge-vs-overcharge-symptom-table"
 ],
 "boiler-seized-circulator-hum": [
  "hot-water-no-heat-circulator-zone-valve-and-air-diagnosis",
  "zone-valves-vs-zone-circulators"
 ],
 "boiler-air-trapped-zone-gurgle": [
  "zone-valves-vs-zone-circulators",
  "hot-water-no-heat-circulator-zone-valve-and-air-diagnosis",
  "radiant-floor-heating-basics"
 ],
 "boiler-waterlogged-tank-relief-drip": [
  "expansion-tanks-and-fill-pressure",
  "boiler-pressure-too-high-or-too-low-homeowner-guide",
  "hot-water-no-heat-circulator-zone-valve-and-air-diagnosis"
 ],
 "boiler-zone-valve-head-burnt-coil": [
  "zone-valves-vs-zone-circulators",
  "zoning-and-zone-dampers-basics"
 ],
 "heatpump-reversing-valve-leaks-by": [
  "reversing-valve-diagnosis-and-o-vs-b",
  "heat-pump-basics",
  "heat-pump-iced-up-normal-defrost-or-problem"
 ],
 "heatpump-defrost-sensor-open-iced": [
  "heat-pump-iced-up-normal-defrost-or-problem",
  "defrost-cycle-and-auxiliary-heat",
  "heat-pump-defrost-control-boards-and-sensors"
 ],
 "heatpump-pitted-contactor-aux-only": [
  "emergency-heat-vs-auxiliary-heat-and-lockouts",
  "capacitors-and-contactors",
  "rtu-cooling-sequence-of-operation-and-the-safety-chain"
 ],
 "heatpump-low-charge-and-dirty-filter-mix": [
  "how-often-to-change-your-air-filter-and-merv",
  "leaks-and-leak-repair-basics",
  "epa-608-basics"
 ],
 "controls-supply-sensor-open-stuck-reading": [
  "bas-sensor-types-calibration-drift-and-setpoint-habits",
  "building-automation-basics",
  "economizers-basics"
 ],
 "controls-chattering-alarm-flood": [
  "bas-alarms-trend-logs-and-how-techs-use-them"
 ],
 "steam-pressuretrol-cranked-up-relief-drips": [
  "steam-boiler-pressure-controls-and-gauges",
  "steam-boiler-short-cycling-causes",
  "low-vs-high-pressure-steam"
 ],
 "steam-lwco-feeder-stuck-no-heat": [
  "wet-steam-and-carryover-basics",
  "low-water-cutoff-testing-and-maintenance"
 ],
 "steam-oily-water-surging-after-cleaning": [
  "wet-steam-and-carryover-basics",
  "steam-boiler-pressure-controls-and-gauges",
  "steam-boiler-short-cycling-causes"
 ],
 "steam-radiator-vent-clogged-cold-end": [
  "steam-radiator-air-vents",
  "one-pipe-vs-two-pipe-steam-systems",
  "steam-main-venting-basics"
 ],
 "reach-in-dirty-condenser-warm-cabinet": [
  "dirty-condenser-and-head-pressure",
  "reach-in-and-display-case-defrost-and-care"
 ],
 "ice-machine-scale-float-switch-low-output": [
  "ice-machine-water-quality-scale-and-sanitizing",
  "ice-machine-cycle-three-makers-compared-timers-and-safety-limits",
  "ice-machine-freeze-and-harvest-cycle-basics"
 ],
 "walk-in-drain-heater-frozen-ice-back": [
  "walk-in-cooler-and-freezer-defrost-evaporator-fan-delay-and-icing",
  "walk-in-cooler-and-commercial-refrigeration-basics",
  "heat-pump-iced-up-normal-defrost-or-problem"
 ],
 "minisplit-clogged-drain-wall-drip": [
  "mini-split-basics",
  "mini-split-troubleshooting-checks",
  "mini-split-cleaning-and-maintenance-habits"
 ],
 "hrv-blocked-hood-frost-weak-airflow": [
  "erv-vs-hrv-what-each-recovers-and-how-to-maintain-them",
  "commercial-kitchen-ventilation-hoods-and-make-up-air-basics"
 ],
 "chiller-freeze-trip-plugged-strainer": [
  "chiller-startup-shutdown-sequence-and-safeties",
  "chiller-plant-fundamentals",
  "chiller-plant-daily-rounds-walkthrough"
 ],
 "chiller-flow-switch-paddle-fouled": [
  "chiller-startup-shutdown-sequence-and-safeties",
  "chiller-plant-fundamentals",
  "chiller-plant-daily-rounds-walkthrough"
 ],
 "cooling-tower-fan-vfd-fault-warm-supply": [
  "cooling-tower-basics",
  "cooling-tower-fan-vfd-staging-and-condenser-water-reset",
  "cooling-tower-legionella-cdc-vs-osha-and-water-management-programs"
 ],
 "steam-trap-blowing-return-banging": [
  "steam-traps-explained",
  "steam-trap-testing-methods-sight-sound-and-temperature",
  "steam-trap-types-and-where-each-fits"
 ],
 "steam-coil-water-hammer-cold-trap": [
  "water-hammer-in-steam-and-hot-water",
  "steam-traps-explained",
  "steam-trap-testing-methods-sight-sound-and-temperature"
 ],
 "boiler-carryover-foaming-low-blowdown": [
  "wet-steam-and-carryover-basics",
  "boiler-water-treatment-and-blowdown-basics",
  "why-boilers-blow-down-surface-vs-mud-blowdown-and-automatic-control"
 ],
 "feedwater-pump-cavitates-deaerator-pressure-drop": [
  "feedwater-deaerators-and-oxygen-basics",
  "condensate-return-and-feedwater-basics",
  "pump-cavitation-basics"
 ],
 "vav-box-airflow-low-hoses-swapped": [
  "vav-boxes-basics",
  "bas-sensor-types-calibration-drift-and-setpoint-habits",
  "airflow-and-static-pressure-basics"
 ],
 "bas-rogue-override-holds-reheat-open": [
  "bas-sensor-types-calibration-drift-and-setpoint-habits",
  "bas-point-types-and-reading-the-graphics",
  "bas-commissioning-checklists-and-functional-testing"
 ],
 "bas-loop-hunting-trend-valve-oscillates": [
  "bas-alarms-trend-logs-and-how-techs-use-them",
  "reading-a-chiller-log-what-to-record-and-how-to-trend-approach",
  "chiller-approach-temperatures-reading-the-trend"
 ],
 "a2l-alarm-sealant-vapors-false-trip": [
  "a2l-mitigation-alarm-fault-handling",
  "a2l-control-boards-and-mitigation",
  "a2l-leak-detection-sensors"
 ],
 "minisplit-install-no-fall-drain-no-test": [
  "mini-split-basics",
  "mini-split-troubleshooting-checks",
  "mini-split-installation-basics-line-set-vacuum-and-commissioning"
 ],
 "minisplit-fault-after-cleaning-wet-board": [
  "mini-split-cleaning-and-maintenance-habits",
  "mini-split-troubleshooting-checks",
  "mini-split-basics"
 ],
 "ice-machine-descale-skipped-hard-water": [
  "ice-machine-water-quality-scale-and-sanitizing",
  "ice-machine-freeze-and-harvest-cycle-basics",
  "ice-machine-cycle-three-makers-compared-timers-and-safety-limits"
 ],
 "reach-in-iced-coil-torn-gasket": [
  "heat-pump-iced-up-normal-defrost-or-problem",
  "reach-in-and-display-case-defrost-and-care",
  "walk-in-cooler-and-freezer-defrost-evaporator-fan-delay-and-icing"
 ],
 "steam-trap-cold-inlet-stalled-under-control-valve": [
  "steam-trap-testing-methods-sight-sound-and-temperature",
  "steam-trap-types-and-where-each-fits",
  "steam-traps-explained"
 ],
 "chiller-startup-condenser-flow-not-proven": [
  "chiller-startup-shutdown-sequence-and-safeties",
  "chiller-plant-fundamentals",
  "chiller-types-air-cooled-vs-water-cooled"
 ],
 "tower-wetbulb-sensor-drift-reset-wrong": [
  "cooling-tower-fan-vfd-staging-and-condenser-water-reset",
  "cooling-tower-basics",
  "cooling-tower-fan-fill-drift-and-basin-checks"
 ],
 "bas-hot-room-alarm-flood-upstream-fault": [
  "bas-alarms-trend-logs-and-how-techs-use-them",
  "bas-sensor-types-calibration-drift-and-setpoint-habits",
  "bas-commissioning-checklists-and-functional-testing"
 ],
 "erv-frost-in-core-weak-airflow-cold-snap": [
  "erv-vs-hrv-what-each-recovers-and-how-to-maintain-them"
 ],
 "furnace-short-cycle-homeowner-filter-blocked-returns": [
  "furnace-short-cycling-why-it-happens",
  "furnace-blowing-cold-air",
  "no-heat-first-checks-homeowner-and-tech-checklist"
 ],
 "ac-leak-clogged-condensate-drain-float-tripped": [
  "water-leaking-from-ac-or-furnace-condensate-drain"
 ],
 "elec-condenser-fan-hums-failed-run-capacitor": [
  "condenser-fan-motor-and-capacitor-failures",
  "capacitors-and-contactors"
 ],
 "elec-contactor-pitted-chattering": [
  "capacitors-and-contactors",
  "rtu-cooling-sequence-of-operation-and-the-safety-chain",
  "ac-running-but-not-cooling"
 ],
 "elec-blown-24v-fuse-shorted-wire": [
  "low-voltage-short-blown-fuse-and-transformer-troubleshooting",
  "thermostat-blank-or-wrong-temperature",
  "relays-transformers-and-24v-control"
 ],
 "elec-no-24v-at-thermostat-bad-transformer": [
  "thermostat-blank-or-wrong-temperature",
  "relays-transformers-and-24v-control",
  "low-voltage-short-blown-fuse-and-transformer-troubleshooting"
 ],
 "elec-thermostat-wrong-terminal-y-w-swap": [
  "thermostat-terminal-letters-r-c-w-y-g-explained",
  "thermostat-wiring-and-smart-thermostats",
  "thermostat-blank-or-wrong-temperature"
 ],
 "elec-ecm-blower-no-start": [
  "ecm-blower-motors",
  "airflow-and-static-pressure-basics",
  "high-limit-trips-and-airflow"
 ],
 "elec-meter-lead-fuse-false-reading": [
  "low-voltage-short-blown-fuse-and-transformer-troubleshooting",
  "testing-capacitors-contactors-and-relays-with-a-meter",
  "multimeter-safety-and-cat-ratings"
 ],
 "elec-ladder-diagram-open-safety": [
  "reading-a-ladder-diagram",
  "electrical-basics-for-hvac"
 ],
 "rtu-warm-air-fan-runs-open-low-pressure-control": [
  "rtu-cooling-sequence-of-operation-and-the-safety-chain",
  "rtu-gas-heat-lockouts-and-rooftop-safety",
  "rtu-startup-and-checkout-basics"
 ],
 "rtu-hot-afternoon-economizer-humid-changeover": [
  "economizer-settings-changeover-minimum-position-and-low-limit",
  "rtu-economizer-fault-diagnosis-and-damper-actuator-checks"
 ],
 "rtu-stuffy-damper-never-opens-minimum-position": [
  "rtu-economizer-fault-diagnosis-and-damper-actuator-checks",
  "economizer-settings-changeover-minimum-position-and-low-limit",
  "economizers-basics"
 ],
 "rtu-sensor-flash-code-mixed-air-sensor": [
  "rooftop-unit-basics",
  "bas-sensor-types-calibration-drift-and-setpoint-habits"
 ],
 "rtu-condenser-fan-stopped-compressor-tripping": [
  "rtu-refrigerant-circuit-and-compressor-protection",
  "rtu-cooling-sequence-of-operation-and-the-safety-chain",
  "condenser-fan-motor-and-capacitor-failures"
 ],
 "plant-tower-slimy-basin-after-idle": [
  "cooling-tower-fan-fill-drift-and-basin-checks",
  "cooling-tower-basics",
  "cooling-tower-legionella-cdc-vs-osha-and-water-management-programs"
 ],
 "plant-chiller-power-up-approach-high": [
  "chiller-approach-temperatures-reading-the-trend",
  "reading-a-chiller-log-what-to-record-and-how-to-trend-approach",
  "chiller-plant-fundamentals"
 ],
 "plant-boiler-cloudy-glass-foams": [
  "wet-steam-and-carryover-basics",
  "boiler-water-treatment-and-blowdown-basics",
  "why-boilers-blow-down-surface-vs-mud-blowdown-and-automatic-control"
 ],
 "refr-walk-in-fan-delay-jumpered-overload-trip": [
  "walk-in-cooler-and-freezer-defrost-evaporator-fan-delay-and-icing",
  "walk-in-cooler-and-commercial-refrigeration-basics"
 ],
 "refr-walk-in-warm-product-door-gasket-operator-decision": [
  "walk-in-cooler-and-commercial-refrigeration-basics",
  "commercial-refrigeration-cold-holding-41-f-and-food-safety-checks",
  "walk-in-cooler-and-freezer-defrost-evaporator-fan-delay-and-icing"
 ]
};
window.SOURCE_TITLES = {
 "economizer-settings-changeover-minimum-position-and-low-limit": "Economizer Settings: Changeover, Minimum Position and Low Limit",
 "walk-in-cooler-and-commercial-refrigeration-basics": "Walk-In Cooler and Commercial Refrigeration Basics",
 "heat-pump-defrost-control-boards-and-sensors": "Heat Pump Defrost Control Boards and Sensors",
 "rtu-gas-heat-section-basics": "RTU Gas Heat Section Basics",
 "expansion-tanks-and-fill-pressure": "Expansion Tanks and Fill Pressure",
 "defrost-cycle-and-auxiliary-heat": "Defrost Cycle and Auxiliary Heat",
 "electrical-basics-for-hvac": "Electrical Basics for HVAC",
 "radiant-floor-heating-basics": "Radiant Floor Heating Basics",
 "reading-a-chiller-log-what-to-record-and-how-to-trend-approach": "Reading a Chiller Log: What to Record and How to Trend Approach",
 "mini-split-installation-basics-line-set-vacuum-and-commissioning": "Mini-Split Installation Basics: Line Set, Vacuum and Commissioning",
 "thermostat-blank-or-wrong-temperature": "Thermostat Blank or Showing the Wrong Temperature",
 "gas-furnace-sequence-of-operation": "Gas Furnace Sequence of Operation",
 "high-limit-trips-and-airflow": "High-Limit Trips and Airflow",
 "boiler-safety-valves-and-overpressure-protection": "Boiler Safety Valves and Overpressure Protection",
 "a2l-leak-detection-sensors": "A2L Leak Detection Sensors",
 "flame-safeguard-and-ignition-basics": "Flame Safeguard and Ignition Basics",
 "airflow-and-static-pressure-basics": "Airflow and Static Pressure Basics",
 "bas-commissioning-checklists-and-functional-testing": "BAS Commissioning: Checklists and Functional Testing",
 "emergency-heat-vs-auxiliary-heat-and-lockouts": "Emergency Heat vs. Auxiliary Heat and Lockout Temperatures",
 "cooling-tower-fan-fill-drift-and-basin-checks": "Cooling Tower Fan, Fill, Drift and Basin Checks",
 "zone-valves-vs-zone-circulators": "Zone Valves vs. Zone Circulators",
 "erv-vs-hrv-what-each-recovers-and-how-to-maintain-them": "ERV vs. HRV: What Each Recovers and How to Maintain Them",
 "low-water-cutoff-testing-and-maintenance": "Low-Water Cutoff Testing and Maintenance",
 "vrf-vrv-basics": "VRF and VRV Basics",
 "furnace-blowing-cold-air": "Why Is My Furnace Blowing Cold Air?",
 "steam-trap-testing-methods-sight-sound-and-temperature": "Steam Trap Testing: Sight, Sound and Temperature",
 "mini-split-cleaning-and-maintenance-habits": "Mini-Split Cleaning and Maintenance Habits",
 "how-often-to-change-your-air-filter-and-merv": "How Often Should I Change My Air Filter? MERV Basics",
 "whats-different-modern-vs-older-systems": "What's Different: Modern vs. Older Systems",
 "superheat-and-subcooling-basics": "Superheat and Subcooling Basics",
 "reach-in-and-display-case-defrost-and-care": "Reach-In and Display Case Defrost, Gaskets, Drains and Coil Care",
 "walk-in-cooler-and-freezer-defrost-evaporator-fan-delay-and-icing": "Walk-In Defrost: Termination, Fan Delay and Icing",
 "bas-point-types-and-reading-the-graphics": "BAS Point Types and Reading the Graphics",
 "water-hammer-in-steam-and-hot-water": "Water Hammer in Steam and Hot Water",
 "rtu-economizer-fault-diagnosis-and-damper-actuator-checks": "RTU Economizer Fault Diagnosis and Damper Actuator Checks",
 "zoning-and-zone-dampers-basics": "Zoning and Zone Dampers Basics",
 "hot-surface-igniter-care-and-testing": "Hot Surface Igniter Care and Testing",
 "flame-sensor-cleaning-and-microamps": "Flame Sensor Cleaning and Microamps",
 "heat-pump-balance-point-and-low-temperature-capacity": "Heat Pump Balance Point and Low-Temperature Capacity",
 "leaks-and-leak-repair-basics": "Leaks and Leak Repair Basics",
 "ice-machine-cycle-three-makers-compared-timers-and-safety-limits": "Ice Machine Cycle: Three Makers Compared",
 "low-voltage-short-blown-fuse-and-transformer-troubleshooting": "Low-Voltage Short, Blown Fuse and Transformer Troubleshooting",
 "pump-cavitation-basics": "Pump Cavitation Basics",
 "chiller-approach-temperatures-reading-the-trend": "Chiller Approach Temperatures: Reading the Trend",
 "capacitors-and-contactors": "Capacitors and Contactors",
 "furnace-short-cycling-why-it-happens": "Why Is My Furnace Short Cycling?",
 "condenser-fan-motor-and-capacitor-failures": "Condenser Fan Motor and Capacitor Failures",
 "boiler-startup-shutdown-and-layup-basics": "Boiler Start-up, Shutdown and Layup Basics",
 "cooling-tower-fan-vfd-staging-and-condenser-water-reset": "Cooling Tower Fan VFDs, Staging and Condenser Water Reset",
 "bas-sensor-types-calibration-drift-and-setpoint-habits": "BAS Sensor Types, Calibration Drift and Setpoint Habits",
 "ac-running-but-not-cooling": "Air Conditioner Running but Not Cooling: What to Check",
 "steam-boiler-pressure-controls-and-gauges": "Steam Boiler Pressure Controls and Gauges",
 "hot-water-no-heat-circulator-zone-valve-and-air-diagnosis": "Hot-Water No-Heat Diagnosis: Circulator, Zone Valve, Air and Pressure",
 "furnace-no-heat-from-led-code-to-part": "No-Heat Furnace: From LED Code to Part",
 "why-boilers-blow-down-surface-vs-mud-blowdown-and-automatic-control": "Why Boilers Blow Down: Surface vs Mud Blowdown and Automatic Control",
 "ductwork-basics-and-common-problems": "Ductwork Basics and Common Problems",
 "bas-alarms-trend-logs-and-how-techs-use-them": "BAS Alarms, Trend Logs and How Techs Use Them",
 "a2l-control-boards-and-mitigation": "A2L Control Boards and Mitigation",
 "wet-steam-and-carryover-basics": "Wet Steam and Carryover Basics",
 "heat-pump-basics": "Heat Pump Basics",
 "reading-a-ladder-diagram": "Reading a Ladder Diagram",
 "testing-capacitors-contactors-and-relays-with-a-meter": "Testing Capacitors, Contactors and Relays with a Meter",
 "mixing-valves-and-injection-mixing-basics": "Mixing Valves and Injection Mixing Basics",
 "boiler-water-treatment-and-blowdown-basics": "Boiler Water Treatment and Blowdown Basics",
 "rtu-startup-and-checkout-basics": "RTU Startup and Checkout Basics",
 "low-vs-high-pressure-steam": "Low-Pressure vs High-Pressure Steam",
 "thermostat-wiring-and-smart-thermostats": "Thermostat Wiring and Smart Thermostats",
 "ventilation-rates-and-balancing-basics-ashrae-62-2": "Ventilation Rates and Balancing Basics (ASHRAE 62.2)",
 "chiller-plant-daily-rounds-walkthrough": "Chiller Plant Daily Rounds: A Walk-Through",
 "cooling-tower-legionella-cdc-vs-osha-and-water-management-programs": "Cooling Tower Legionella: CDC vs OSHA and Water Management Programs",
 "undercharge-vs-overcharge-symptom-table": "Undercharge vs. Overcharge: A Symptom Table",
 "mini-split-basics": "Mini-Split Basics",
 "no-heat-first-checks-homeowner-and-tech-checklist": "No Heat First Checks: Homeowner and Tech Checklist",
 "dirty-condenser-and-head-pressure": "Dirty Condenser and Head Pressure",
 "ice-machine-freeze-and-harvest-cycle-basics": "Ice Machine Basics: The Freeze and Harvest Cycle",
 "chiller-startup-shutdown-sequence-and-safeties": "Chiller Start-Up and Shutdown: Sequence and Safeties",
 "economizers-basics": "Economizers Basics",
 "relays-transformers-and-24v-control": "Relays, Transformers and 24V Control",
 "mini-split-troubleshooting-checks": "Mini-Split Troubleshooting Checks",
 "rooftop-unit-basics": "Rooftop Unit Basics",
 "chiller-plant-fundamentals": "Chiller Plant Fundamentals",
 "building-automation-basics": "Building Automation Basics",
 "feedwater-deaerators-and-oxygen-basics": "Feedwater Deaerators and Oxygen Basics",
 "rooftop-unit-preventive-maintenance-checklist-what-to-check-and-how-often": "Rooftop Unit Preventive Maintenance Checklist: What to Check and How Often",
 "rtu-cooling-sequence-of-operation-and-the-safety-chain": "RTU Cooling Sequence of Operation and the Safety Chain",
 "condensate-return-and-feedwater-basics": "Condensate Return and Feedwater Basics",
 "belt-drives-and-sheave-basics": "Belt Drives and Sheave Basics",
 "refrigeration-superheat-checks-and-oil-return": "Refrigeration Superheat Checks and Oil Return",
 "multimeter-safety-and-cat-ratings": "Multimeter Safety and CAT Ratings",
 "chiller-types-air-cooled-vs-water-cooled": "Chiller Types: Air-Cooled vs. Water-Cooled",
 "vav-boxes-basics": "VAV Boxes Basics",
 "one-pipe-vs-two-pipe-steam-systems": "One-Pipe vs. Two-Pipe Steam Systems",
 "reading-a-defrost-cycle-on-the-gauges": "Reading a Defrost Cycle on the Gauges",
 "water-leaking-from-ac-or-furnace-condensate-drain": "Water Leaking from the AC or Furnace: Condensate Drain Basics",
 "indoor-air-quality-and-ventilation-basics": "Indoor Air Quality and Ventilation Basics",
 "heat-pump-iced-up-normal-defrost-or-problem": "Heat Pump Iced Up in Winter: Normal Defrost or a Problem?",
 "a2l-service-safety-and-tools": "A2L Service Safety and Tools",
 "steam-main-venting-basics": "Steam Main Venting Basics",
 "inverter-drives-and-variable-speed-compressors": "Inverter Drives and Variable-Speed Compressors",
 "pressure-switch-and-inducer-diagnosis": "Pressure Switch and Inducer Diagnosis",
 "rtu-gas-heat-lockouts-and-rooftop-safety": "RTU Gas Heat Lockouts and Rooftop Safety",
 "commercial-kitchen-ventilation-hoods-and-make-up-air-basics": "Commercial Kitchen Ventilation: Hoods and Make-Up Air Basics",
 "a2l-mitigation-alarm-fault-handling": "A2L Mitigation Alarm: What to Do When It Trips",
 "steam-radiator-air-vents": "Steam Radiator Air Vents",
 "outdoor-reset-and-weather-compensation": "Outdoor Reset and Weather Compensation",
 "steam-boiler-short-cycling-causes": "Steam Boiler Short-Cycling: Causes and Where to Look",
 "rtu-refrigerant-circuit-and-compressor-protection": "RTU Refrigerant Circuit and Compressor Protection",
 "boiler-pressure-too-high-or-too-low-homeowner-guide": "Boiler Pressure Too High or Too Low: A Homeowner Guide",
 "steam-system-fundamentals": "Steam System Fundamentals",
 "steam-traps-explained": "Steam Traps Explained",
 "commercial-refrigeration-cold-holding-41-f-and-food-safety-checks": "Cold Holding at 41 F: Food Safety Checks for Refrigeration Techs",
 "thermostat-terminal-letters-r-c-w-y-g-explained": "Thermostat Terminal Letters: R, C, W, Y, G Explained",
 "reversing-valve-diagnosis-and-o-vs-b": "Reversing Valve Diagnosis and the O vs B Setting",
 "ecm-blower-motors": "ECM Blower Motors",
 "cooling-tower-basics": "Cooling Tower Basics",
 "epa-608-basics": "EPA 608 Certification Basics",
 "steam-trap-types-and-where-each-fits": "Steam Trap Types and Where Each Fits",
 "ice-machine-water-quality-scale-and-sanitizing": "Ice Machine Water Quality, Scale and Sanitizing"
};
window.tsbSources = function (id) {
  var m = (window.SOURCE_MAP || {})[id]; if (!m || !m.length) return null;
  var d = document.createElement("div"); d.className = "note";
  var h = document.createElement("strong"); h.textContent = "Sources and background: "; d.appendChild(h);
  d.appendChild(document.createTextNode("this is general method. The facts behind it, and the sources for them, are in these lessons: "));
  m.forEach(function (s, i) {
    if (i) d.appendChild(document.createTextNode("; "));
    var a = document.createElement("a"); a.href = s + ".html"; a.textContent = (window.SOURCE_TITLES || {})[s] || s; d.appendChild(a);
  });
  d.appendChild(document.createTextNode(". Always follow the maker's manual and local rules."));
  return d;
};
