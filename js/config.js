/* Site settings. Edit before deploying.
   ads.mode: "off"     = no ad boxes, no sponsor gate, no consent banner (safe default, nothing external loads)
             "preview" = shows clearly labeled placeholder boxes and the sponsor gate so you can see the layout
             "live"    = loads the real ad network (fill in client and slots first, and read reports/training-school-pricing-and-ads.md) */
window.TSB = {
  ads: { mode: "off", client: "ca-pub-XXXXXXXXXXXXXXXX", slots: { top: "", mid: "", bottom: "" } },
  /* Google AdSense does not allow ads shown for a preset time before content (pre-roll). The gate below is skipped in "live" mode unless directSponsorOnly is true, meaning the gate shows only a direct sponsor you sold yourself, never AdSense ads. See reports/training-school-pricing-and-ads.md. */
  gate: { enabled: false, seconds: 5, frequencyMinutes: 3, directSponsorOnly: false },
  store: { links: {
    "epa-608-prep-pack": "",
    "nj-black-seal-prep": "",
    "a2l-refrigerants-field-guide": "",
    "field-guide-bundle-6": "",
    "field-guide-bundle-5": "",
    "chillers-cooling-towers-guide": "",
    "rtu-economizers-field-guide": "",
    "steam-prv-field-guide": "",
    "chiller-plant-rounds-guide": "",
    "heat-exchanger-field-guide": "",
    "cooling-tower-field-guide": "",
    "hydronic-pumps-delta-t-guide": "",
    "homeowner-hvac-planner": "",
    "boiler-chiller-daily-logs": "",
    "pm-checklist-pack": "",
    "job-service-ticket-templates": "",
    "superheat-subcooling-worksheet": "",
    "combustion-furnace-startup-record": "",
    "equipment-startup-commissioning-sheet": "",
    "van-inventory-restock-checklist": "",
    "apprentice-hvac-tool-checklist": "",
    "refrigerant-recovery-usage-log": "",
    "customer-equipment-history-cards": "",
    "printables-bundle-wave1": "",
    "hvac-tech-forms-bundle": "",
    "complete-hvac-tech-pack": "",
    "complete-technician-library": "",
    "controls-bas-field-guide": "",
    "boiler-steam-basics-field-guide": "",
    "refrigerant-leak-log": "",
    "facilities-onboarding-bundle": "",
    "sticker-sheet-a": "",
    "sticker-sheet-b": "",
    "poster-p1-printable": "",
    "poster-p2-printable": "",
    "poster-p3-printable": "",
    "poster-p4-printable": ""
  } },
  /* Payments. Square: make a Payment Link per product in your Square dashboard and paste the URL into store.links above (the Buy button then opens Square checkout). No Square code runs on this site. Zelle cannot be automated: fill recipient (the email or phone registered for Zelle) and the box below the Store page appears. */
  payments: { zelle: { recipient: "", name: "" }, supportEmail: "", deliveryNote: "After payment we email your files, usually within one business day." },
  /* Opt-in email signup (js/signup.js). Leave action empty to keep the form switched off. Paste the form-post URL your email service gives you (for example Buttondown or MailerLite) and, if it needs a different field name, change emailField. Never shown on game pages. */
  signup: { action: "", emailField: "email", method: "post" },
  /* Accounts (js/auth.js, account.html). Uses Google Firebase Authentication, free tier: Google sign-in plus email and password. Steps in SETUP-PAYMENTS-ADS-NEWSLETTER.md. Leave enabled false until you paste the Firebase web config. These keys are meant to be public; restrict them in the Firebase console to your site's domain. */
  auth: { enabled: false, firebase: { apiKey: "", authDomain: "", projectId: "", appId: "" } },
  /* Optional PayPal link per product (same keys as store.links), for example a PayPal.me or PayPal payment link with the price filled in. Shown as a second button under Buy. */
  paypal: { links: {} },
  /* lessonGate: when true, lessons tagged "Premium lesson" show only the intro and first section, then a card linking to premium.html. Honor system: no accounts or payments, and the hidden text stays in the page source. Leave false until a real login exists. */
  premium: { enabled: false, url: "premium.html", lessonGate: false },
  /* Affiliate "recommended tools" boxes (js/affiliates.js). Leave url empty until you have joined a program (for example Amazon Associates) and have your own link. A box shows only when at least one item has a url, except in ads.mode "preview", which shows all items as placeholders. Keep affiliate links and ads off every page under game/. Wording of the disclosure follows the FTC's examples; check each program's own required statement (Amazon requires its own Associate statement). */
  affiliates: {
    disclosure: "Paid links: we may earn a commission if you buy through links in this box, at no extra cost to you.",
    groups: {
      meters: { title: "Recommended tools: meters", items: [
        { name: "Digital clamp meter (true RMS, safety rated for the work you do)", url: "" },
        { name: "Digital multimeter with continuity and capacitance", url: "" } ] },
      refrigeration: { title: "Recommended tools: refrigeration", items: [
        { name: "Digital manifold gauge set", url: "" },
        { name: "Micron gauge (vacuum gauge)", url: "" },
        { name: "Two-stage vacuum pump", url: "" } ] },
      combustion: { title: "Recommended tools: combustion and gas safety", items: [
        { name: "Combustion analyzer", url: "" },
        { name: "Personal carbon monoxide monitor", url: "" } ] },
      books: { title: "Recommended reading", items: [
        { name: "Modern Hydronic Heating (John Siegenthaler)", url: "" },
        { name: "The Lost Art of Steam Heating (Dan Holohan)", url: "" } ] }
    }
  }
};
