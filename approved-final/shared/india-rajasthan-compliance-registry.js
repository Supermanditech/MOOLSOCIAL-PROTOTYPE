(function () {
  "use strict";

  const sources = {
    rmc: {
      authority: "Rajasthan Medical Council",
      url: "https://rmc.rajasthan.gov.in/"
    },
    clinicalEstablishment: {
      authority: "Clinical Establishments Division, MoHFW",
      url: "https://clinicalestablishments.mohfw.gov.in/en/state-and-uts-rules-and-notification"
    },
    fssai: {
      authority: "FSSAI FoSCoS",
      url: "https://foscos.fssai.gov.in/"
    },
    drugControlRajasthan: {
      authority: "Rajasthan Drug Control Organization",
      url: "https://rajniveshtest.rajasthan.gov.in/Home/Services/1047"
    },
    cosmeticRajasthan: {
      authority: "Rajasthan Medical and Health Department",
      url: "https://rajswasthya.rajasthan.gov.in/link/food_safety/procedure/Procedure%20to%20obtain%20Cosmetic%20Manufacturing%20License.pdf"
    },
    pharmacyCouncil: {
      authority: "Rajasthan Pharmacy Council",
      url: "https://rajasthanpharmacycouncil.in/rpc/index.aspx"
    },
    shopsRajasthan: {
      authority: "Rajasthan Labour Department",
      url: "https://labour.rajasthan.gov.in/RulesShop.aspx/ben_list.aspx"
    },
    factoriesRajasthan: {
      authority: "Rajasthan Factories and Boilers Inspection Department",
      url: "https://rajfab.rajasthan.gov.in/web/ProceduresFactory.htm"
    },
    pollutionRajasthan: {
      authority: "Rajasthan State Pollution Control Board",
      url: "https://environment.rajasthan.gov.in/content/environment/en/rajasthan-state-pollution-control-board/clearances.html"
    },
    biomedicalWaste: {
      authority: "Rajasthan State Pollution Control Board",
      url: "https://environment.rajasthan.gov.in/content/environment/en/rajasthan-state-pollution-control-board/information/WasteManagement/Bio-MedicalWasteManagement.html"
    },
    legalMetrology: {
      authority: "Department of Consumer Affairs",
      url: "https://consumeraffairs.nic.in/organisation-and-units/division/legal-metrology/registration-certificates-of-packaged-commodities"
    },
    transportRajasthan: {
      authority: "Rajasthan Transport Department",
      url: "https://transport.rajasthan.gov.in/content/transportportal/en/transport/howtoget/vehicle-registration/needAndProcess.html"
    },
    rajasthanSingleWindow: {
      authority: "Rajasthan Single Window Clearance System",
      url: "https://swcs.rajasthan.gov.in/Forms.aspx"
    },
    gst: {
      authority: "Goods and Services Tax Network",
      url: "https://tutorial.gst.gov.in/userguide/registration/Apply_for_Registration_Normal_Taxpayer.htm"
    },
    udyam: {
      authority: "Ministry of MSME",
      url: "https://www.udyamregistration.gov.in/default.aspx"
    }
  };

  const rule = (id, label, level, source, condition, evidence) => ({
    id,
    label,
    level,
    authority: source ? sources[source].authority : "MoolSocial verification",
    sourceUrl: source ? sources[source].url : "",
    condition: condition || "",
    evidence: evidence || "Verifiable certificate, number or record"
  });

  const rules = {
    identity: rule("identity", "Personal KYC of owner or operator", "platform", null, "Mandatory for every individual and every authorized business operator", "Verified identity KYC and authorization"),
    settlement: rule("settlement", "Settlement account ownership", "platform", null, "Required before payouts or collections", "Verified bank or payment account"),
    gst: rule("gst", "GST registration", "conditional", "gst", "When registration is applicable or a GSTIN is declared", "GSTIN and legal-name match"),
    gstBusiness: rule("gst-business", "GST certificate", "pending", "gst", "Required by MoolSocial for a verified business workspace. If unavailable, onboarding may continue with GST pending and recurring reminders; statutory liability remains governed by GST law", "GST certificate, GSTIN and legal-name match"),
    udyam: rule("udyam", "Udyam registration", "optional", "udyam", "Optional MSME identity; never treated as a universal operating licence", "Udyam Registration Number"),
    shopsRajasthan: rule("shops-rj", "Rajasthan Shops and Commercial Establishments registration", "conditional", "shopsRajasthan", "For establishments covered by the Rajasthan Act", "Registration certificate and establishment address"),
    factoryRajasthan: rule("factory-rj", "Rajasthan factory registration and licence", "conditional", "factoriesRajasthan", "When the premises and worker/power threshold are covered by factory law", "Factory licence and registered premises"),
    pollutionRajasthan: rule("pollution-rj", "RSPCB Consent to Establish / Operate", "conditional", "pollutionRajasthan", "When the activity falls within a consent category", "Valid CTE/CTO number and category"),
    legalMetrologyPacker: rule("legal-metrology-packer", "Manufacturer or packer registration", "conditional", "legalMetrology", "For covered pre-packaged commodities", "Rule 27 registration or applicable state record"),
    fssai: rule("fssai", "FSSAI registration or licence", "required", "fssai", "Required for the enabled food-business activity; licence type follows FoSCoS eligibility", "14-digit FSSAI number and premises/KOB match"),
    cosmeticManufacturing: rule("cosmetic-mfg", "Cosmetic manufacturing licence", "conditional", "cosmeticRajasthan", "When manufacturing products regulated as cosmetics", "Applicable manufacturing or loan-licence record"),
    doctorRegistration: rule("doctor-registration", "Medical practitioner registration", "required", "rmc", "Required for an individual medical practitioner", "RMC/NMC registration number and registered qualification"),
    clinicalEstablishment: rule("clinical-establishment-rj", "Clinical Establishment registration", "conditional", "clinicalEstablishment", "Required for a physical clinic, hospital, dispensary or other covered clinical establishment in Rajasthan, including a single-doctor establishment", "Registration number, category and address"),
    practitionerRoster: rule("practitioner-roster", "Registered practitioner roster", "required", "rmc", "Required for clinic or hospital publication", "Practitioner registration numbers and authorization"),
    biomedicalWaste: rule("biomedical-waste-rj", "Bio-medical waste authorization / service arrangement", "conditional", "biomedicalWaste", "When the healthcare facility generates bio-medical waste", "Authorization or authorized facility arrangement"),
    fireNoc: rule("fire-noc-rj", "Fire NOC", "conditional", "rajasthanSingleWindow", "When required by building use, capacity, local body or fire-safety rules", "Valid local fire-safety approval"),
    drugRetailLicence: rule("drug-retail-rj", "Retail drug-sale licence", "required", "drugControlRajasthan", "Required before listing or selling medicines", "Applicable Forms 20/21 and any linked licence"),
    registeredPharmacist: rule("registered-pharmacist-rj", "Registered pharmacist", "required", "pharmacyCouncil", "Required for licensed pharmacy operation", "Rajasthan Pharmacy Council registration and appointment"),
    drivingLicence: rule("driving-licence", "Driving licence", "required", "transportRajasthan", "Required for the selected vehicle and service class", "Valid licence and class authorization"),
    vehicleRegistration: rule("vehicle-registration", "Vehicle registration certificate", "required", "transportRajasthan", "Required when a vehicle is used", "RC and owner/operator authorization"),
    vehicleInsurance: rule("vehicle-insurance", "Vehicle insurance", "required", "transportRajasthan", "Required when a vehicle is used", "Valid policy for the vehicle and use"),
    transportPermit: rule("transport-permit", "Passenger or goods transport permit", "conditional", "transportRajasthan", "When a transport permit or service authorization applies to the vehicle/use", "Valid permit/authorization and operating area"),
    fitnessCertificate: rule("fitness-certificate", "Transport-vehicle fitness certificate", "conditional", "transportRajasthan", "For vehicles classified as transport vehicles", "Valid fitness certificate"),
    puc: rule("puc", "Pollution Under Control certificate", "required", "transportRajasthan", "Required for the motor vehicle where applicable", "Valid PUC certificate"),
    motorTransportEstablishment: rule("motor-transport-workers-rj", "Motor Transport Workers establishment registration", "conditional", "rajasthanSingleWindow", "When the operator is an establishment covered by the Motor Transport Workers law", "Establishment registration"),
    professionalCredential: rule("professional-credential", "Professional skill or qualification proof", "platform", null, "Required when MoolSocial publishes a regulated or skill-specific claim", "Certificate, registration or verified work sample"),
    creatorRights: rule("creator-rights", "Content rights and disclosure acceptance", "platform", null, "Required before creator publication and monetisation", "Rights declaration and policy acceptance"),
    taskCapability: rule("task-capability", "Enabled work capability and proof readiness", "platform", null, "Required for funded field work or Get It Done", "Training, sample proof or capability verification")
  };

  const base = ["identity", "settlement", "gst"];
  const businessProfiles = new Set([
    "fmcg_manufacturer", "fmcg_supplier", "raw_material_supplier", "packaging_supplier",
    "grocery_retailer", "general_retailer", "restaurant", "cloud_kitchen", "tiffin_provider",
    "clinic", "hospital", "pharmacy", "salon", "local_transporter", "fleet_operator"
  ]);
  const profileRules = {
    fmcg_manufacturer: [...base, "factoryRajasthan", "pollutionRajasthan", "legalMetrologyPacker", "udyam"],
    fmcg_supplier: [...base, "shopsRajasthan", "udyam"],
    raw_material_supplier: [...base, "shopsRajasthan", "pollutionRajasthan", "udyam"],
    packaging_supplier: [...base, "shopsRajasthan", "legalMetrologyPacker", "udyam"],
    grocery_retailer: [...base, "shopsRajasthan", "fssai", "udyam"],
    general_retailer: [...base, "shopsRajasthan", "udyam"],
    individual_product_seller: [...base, "shopsRajasthan"],
    restaurant: [...base, "fssai", "shopsRajasthan", "fireNoc", "udyam"],
    cloud_kitchen: [...base, "fssai", "shopsRajasthan", "fireNoc", "udyam"],
    tiffin_provider: [...base, "fssai", "shopsRajasthan", "udyam"],
    individual_doctor: ["identity", "doctorRegistration", "clinicalEstablishment", "professionalCredential", "settlement", "gst"],
    clinic: ["identity", "clinicalEstablishment", "practitionerRoster", "biomedicalWaste", "fireNoc", "settlement", "gst"],
    hospital: ["identity", "clinicalEstablishment", "practitionerRoster", "biomedicalWaste", "fireNoc", "settlement", "gst"],
    pharmacy: ["identity", "drugRetailLicence", "registeredPharmacist", "shopsRajasthan", "settlement", "gst"],
    salon: [...base, "shopsRajasthan", "professionalCredential", "udyam"],
    home_beauty: [...base, "professionalCredential"],
    individual_service: [...base, "professionalCredential"],
    bike_captain: ["identity", "drivingLicence", "vehicleRegistration", "vehicleInsurance", "transportPermit", "fitnessCertificate", "puc", "settlement", "gst"],
    auto_captain: ["identity", "drivingLicence", "vehicleRegistration", "vehicleInsurance", "transportPermit", "fitnessCertificate", "puc", "settlement", "gst"],
    cab_captain: ["identity", "drivingLicence", "vehicleRegistration", "vehicleInsurance", "transportPermit", "fitnessCertificate", "puc", "settlement", "gst"],
    delivery_partner: ["identity", "drivingLicence", "vehicleRegistration", "vehicleInsurance", "puc", "taskCapability", "settlement", "gst"],
    local_transporter: ["identity", "drivingLicence", "vehicleRegistration", "vehicleInsurance", "transportPermit", "fitnessCertificate", "puc", "settlement", "gst"],
    fleet_operator: ["identity", "vehicleRegistration", "vehicleInsurance", "transportPermit", "fitnessCertificate", "puc", "motorTransportEstablishment", "settlement", "gst"],
    creator_shorts: ["identity", "creatorRights", "settlement", "gst"],
    creator_long: ["identity", "creatorRights", "settlement", "gst"],
    creator_multi: ["identity", "creatorRights", "settlement", "gst"],
    freelancer: ["identity", "taskCapability", "settlement", "gst"],
    get_it_done: ["identity", "taskCapability", "settlement", "gst"]
  };

  const variantRules = {
    packaged_food: ["fssai"],
    snacks_bakery: ["fssai"],
    beverages: ["fssai"],
    personal_care: ["cosmeticManufacturing"],
    home_care: [],
    hygiene_baby_paper: []
  };

  function resolve(profileId, variantId, geography) {
    const configuredIds = [...(profileRules[profileId] || base), ...(variantRules[variantId] || [])];
    const ids = configuredIds.filter((id) => id !== "gst");
    ids.push(businessProfiles.has(profileId) ? "gstBusiness" : "gst");
    const unique = [...new Set(ids)];
    const items = unique.map((id) => rules[id]).filter(Boolean);
    return {
      country: geography?.country || "IN",
      state: geography?.state || "RJ",
      jurisdictionLabel: geography?.state === "RJ" || !geography?.state ? "India · Rajasthan" : "India",
      profileType: businessProfiles.has(profileId) ? "business" : "individual",
      items,
      blockingItems: items.filter((item) => item.level === "required" || item.level === "platform"),
      conditionalItems: items.filter((item) => item.level === "conditional"),
      reminderItems: items.filter((item) => item.level === "pending"),
      optionalItems: items.filter((item) => item.level === "optional")
    };
  }

  window.MoolIndiaCompliance = { version: "india-rj-2026-07-10", sources, rules, resolve };
})();
