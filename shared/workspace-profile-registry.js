(function () {
  "use strict";

  const profile = (id, label, config) => ({ id, label, ...config });
  const card = (id, label, description, icon, target) => ({ id, label, description, icon, target });

  window.MoolWorkspaceRegistry = {
    version: "mvp-2026-07-10",
    maxSelectionTaps: 4,
    roots: [
      card("products", "Products & Trade", "Factory, supply, shop or product selling", "boxes", { type: "node", id: "products_mode" }),
      card("food", "Food Business", "Restaurant, cloud kitchen or tiffin", "utensils", { type: "node", id: "food_profiles" }),
      card("health", "Health & Medicine", "Doctor, clinic, hospital or pharmacy", "health", { type: "node", id: "health_profiles" }),
      card("services", "Services & Salon", "Salon, home beauty or local service", "sparkles", { type: "node", id: "services_mode" }),
      card("mobility", "Ride & Transport", "Captain, delivery or goods movement", "vehicle", { type: "node", id: "mobility_mode" }),
      card("create", "Create & Work", "Creator, freelancer or Get It Done", "create", { type: "node", id: "create_mode" })
    ],
    nodes: {
      products_mode: {
        title: "How do you work with products?",
        cards: [
          card("make_products", "Make Products", "Factory, production or processing", "factory", { type: "node", id: "manufacturing_profiles" }),
          card("supply_businesses", "Supply Businesses", "Wholesale, distribution or inputs", "warehouse", { type: "node", id: "supply_profiles" }),
          card("sell_customers", "Sell To Customers", "Shop, dukaan or individual selling", "store", { type: "node", id: "retail_profiles" })
        ]
      },
      manufacturing_profiles: {
        title: "Choose manufacturing profile",
        cards: [
          card("fmcg_manufacturer", "FMCG Manufacturer", "Food, personal care, home care and daily-use goods", "factory", { type: "node", id: "fmcg_segments" })
        ]
      },
      fmcg_segments: {
        title: "Choose your primary FMCG segment",
        note: "More segments can be added inside the workspace.",
        cards: [
          card("packaged_food", "Packaged Food & Staples", "Flour, rice, pulses, oil, spices and packaged staples", "foodPack", { type: "profile", id: "fmcg_manufacturer", variant: "packaged_food" }),
          card("snacks_bakery", "Snacks, Bakery & Confectionery", "Biscuits, namkeen, bakery, sweets and confectionery", "snack", { type: "profile", id: "fmcg_manufacturer", variant: "snacks_bakery" }),
          card("beverages", "Beverages", "Packaged drinks and permitted beverage products", "drink", { type: "profile", id: "fmcg_manufacturer", variant: "beverages" }),
          card("personal_care", "Personal Care", "Hair, skin, oral, bath and grooming products", "personal", { type: "profile", id: "fmcg_manufacturer", variant: "personal_care" }),
          card("home_care", "Home Care", "Laundry, dishwash, surface and household care", "home", { type: "profile", id: "fmcg_manufacturer", variant: "home_care" }),
          card("hygiene_baby_paper", "Hygiene, Baby & Paper", "Personal hygiene, baby care, tissue and paper goods", "hygiene", { type: "profile", id: "fmcg_manufacturer", variant: "hygiene_baby_paper" })
        ]
      },
      supply_profiles: {
        title: "Choose supply profile",
        cards: [
          card("fmcg_supplier", "FMCG Supplier / Distributor", "Supply finished FMCG goods to businesses", "warehouse", { type: "profile", id: "fmcg_supplier" }),
          card("raw_material_supplier", "Raw Material Supplier", "Supply ingredients or production inputs", "materials", { type: "profile", id: "raw_material_supplier" }),
          card("packaging_supplier", "Packaging Supplier", "Supply packs, cartons, labels or containers", "package", { type: "profile", id: "packaging_supplier" })
        ]
      },
      retail_profiles: {
        title: "Choose selling profile",
        cards: [
          card("grocery_retailer", "Grocery / Kirana Shop", "Daily essentials, grocery and household products", "basket", { type: "profile", id: "grocery_retailer" }),
          card("general_retailer", "General Retail Shop / Dukaan", "A physical shop selling supported products", "store", { type: "profile", id: "general_retailer" }),
          card("individual_product_seller", "Individual Product Seller", "Sell your own approved products without a shop", "personProduct", { type: "profile", id: "individual_product_seller" })
        ]
      },
      food_profiles: {
        title: "Choose food business",
        cards: [
          card("restaurant", "Restaurant / Dhaba / Cafe", "Food orders, tables, takeaway and delivery", "utensils", { type: "profile", id: "restaurant" }),
          card("cloud_kitchen", "Cloud Kitchen", "Delivery or takeaway kitchen without customer tables", "kitchen", { type: "profile", id: "cloud_kitchen" }),
          card("tiffin_provider", "Tiffin Provider", "Recurring or scheduled meal plans", "tiffin", { type: "profile", id: "tiffin_provider" })
        ]
      },
      health_profiles: {
        title: "Choose healthcare profile",
        cards: [
          card("individual_doctor", "Individual Doctor", "Your own professional practice and appointments", "doctor", { type: "profile", id: "individual_doctor" }),
          card("clinic", "Clinic", "A healthcare establishment with one or more practitioners", "clinic", { type: "profile", id: "clinic" }),
          card("hospital", "Hospital", "Departments, doctors and hospital operations", "hospital", { type: "profile", id: "hospital" }),
          card("pharmacy", "Medical Store / Pharmacy", "Licensed medicine, refill and pharmacy operations", "pharmacy", { type: "profile", id: "pharmacy" })
        ]
      },
      services_mode: {
        title: "Choose service area",
        cards: [
          card("salon_personal", "Salon & Personal Care", "Salon, parlour or home beauty", "sparkles", { type: "node", id: "salon_profiles" }),
          card("home_local", "Home & Local Services", "Individual services for nearby customers", "tools", { type: "node", id: "local_service_profiles" })
        ]
      },
      salon_profiles: {
        title: "Choose personal-care profile",
        cards: [
          card("salon", "Salon / Parlour", "Operate services from a salon or parlour", "salon", { type: "profile", id: "salon" }),
          card("home_beauty", "Home Beauty Provider", "Provide enabled beauty and occasion services at home", "homeBeauty", { type: "profile", id: "home_beauty" })
        ]
      },
      local_service_profiles: {
        title: "Choose local-service profile",
        cards: [
          card("individual_service", "Individual Service Provider", "Offer an enabled skill or service to customers", "tools", { type: "profile", id: "individual_service" })
        ]
      },
      mobility_mode: {
        title: "What do you move?",
        cards: [
          card("passengers", "Carry Passengers", "Bike, auto or car rides", "vehicle", { type: "node", id: "captain_profiles" }),
          card("orders", "Deliver Orders", "Restaurant, grocery or shop delivery", "delivery", { type: "profile", id: "delivery_partner" }),
          card("goods", "Move Goods", "Porter, goods vehicle or fleet operation", "truck", { type: "node", id: "transport_profiles" })
        ]
      },
      captain_profiles: {
        title: "Choose vehicle profile",
        cards: [
          card("bike_captain", "Bike Captain", "Passenger rides using an eligible bike", "bike", { type: "profile", id: "bike_captain" }),
          card("auto_captain", "Auto Captain", "Passenger rides using an eligible auto", "auto", { type: "profile", id: "auto_captain" }),
          card("cab_captain", "Cab / Car Captain", "Passenger rides using an eligible car", "car", { type: "profile", id: "cab_captain" })
        ]
      },
      transport_profiles: {
        title: "Choose transport profile",
        cards: [
          card("local_transporter", "Local Porter / Goods Transporter", "Move eligible goods locally", "truck", { type: "profile", id: "local_transporter" }),
          card("fleet_operator", "Transport / Fleet Operator", "Operate multiple eligible goods vehicles", "fleet", { type: "profile", id: "fleet_operator" })
        ]
      },
      create_mode: {
        title: "Choose how you work",
        cards: [
          card("content", "Create Content", "Shorts, long videos or multiple formats", "create", { type: "node", id: "creator_profiles" }),
          card("freelance", "Freelance & Field Work", "Complete supported funded work", "briefcase", { type: "profile", id: "freelancer" }),
          card("get_it_done", "Get It Done", "Complete enabled one-off tasks for customers", "task", { type: "profile", id: "get_it_done" })
        ]
      },
      creator_profiles: {
        title: "Choose creator profile",
        cards: [
          card("shorts_creator", "Shorts Creator", "Create and publish short vertical videos", "shorts", { type: "profile", id: "creator_shorts" }),
          card("long_creator", "Long-Form Video Creator", "Create and publish longer videos", "video", { type: "profile", id: "creator_long" }),
          card("multi_creator", "Multi-Format Creator", "Create shorts, long videos and social posts", "media", { type: "profile", id: "creator_multi" })
        ]
      }
    },
    variants: {
      packaged_food: "Packaged Food & Staples",
      snacks_bakery: "Snacks, Bakery & Confectionery",
      beverages: "Beverages",
      personal_care: "Personal Care",
      home_care: "Home Care",
      hygiene_baby_paper: "Hygiene, Baby & Paper"
    },
    profiles: {
      fmcg_manufacturer: profile("fmcg_manufacturer", "FMCG Manufacturer", {
        family: "manufacturing", gstNature: ["Factory / Manufacturing"], supplyType: "goods",
        summary: "Manufacture FMCG products, procure inputs and sell to verified buyers.",
        sell: ["Finished Goods", "Buyer Demand", "Bulk Orders", "Price Slabs", "Dispatch"],
        buy: ["Raw Materials", "Packaging", "Machinery", "Labour", "Logistics"],
        operate: ["Production", "Capacity", "Quality", "Inventory", "Revenue"],
        proof: ["Production location", "Business identity", "GST/Udyam where applicable", "Product segment", "Settlement identity"]
      }),
      fmcg_supplier: profile("fmcg_supplier", "FMCG Supplier / Distributor", {
        family: "wholesale", gstNature: ["Wholesale Business"], supplyType: "goods",
        summary: "Supply finished FMCG inventory to retailers and business buyers.",
        sell: ["Inventory", "Buyer Pools", "MOQ", "Price Slabs", "Dispatch"],
        buy: ["Manufacturer Sources", "Warehouse", "Transport"],
        operate: ["Stock", "Orders", "Quality", "Settlements"],
        proof: ["Business/source identity", "Inventory or authorization", "Dispatch area", "Tax invoice readiness"]
      }),
      raw_material_supplier: profile("raw_material_supplier", "Raw Material Supplier", {
        family: "wholesale", gstNature: ["Wholesale Business", "Factory / Manufacturing"], supplyType: "goods",
        summary: "Supply ingredients or production inputs to manufacturers.",
        sell: ["Materials", "MOQ", "Quality Grades", "Capacity", "Dispatch"],
        buy: ["Source Inputs", "Storage", "Transport"],
        operate: ["Inventory", "Buyer Demand", "Orders", "Invoices"],
        proof: ["Source/business identity", "Material categories", "Quality documents", "Supply capacity"]
      }),
      packaging_supplier: profile("packaging_supplier", "Packaging Supplier", {
        family: "wholesale", gstNature: ["Wholesale Business", "Factory / Manufacturing"], supplyType: "goods",
        summary: "Supply packaging, cartons, labels or containers to businesses.",
        sell: ["Packaging Catalog", "MOQ", "Custom Orders", "Dispatch"],
        buy: ["Materials", "Printing", "Transport"],
        operate: ["Capacity", "Quality", "Orders", "Invoices"],
        proof: ["Business identity", "Packaging categories", "Samples/specifications", "Capacity"]
      }),
      grocery_retailer: profile("grocery_retailer", "Grocery / Kirana Shop", {
        family: "retail", gstNature: ["Retail Business"], supplyType: "goods",
        summary: "Sell grocery and daily essentials while procuring stock from verified sources.",
        sell: ["Products", "Customer Orders", "Counter Pickup", "Home Delivery", "Offers"],
        buy: ["Wholesale Stock", "Source Offers", "Replenishment", "Delivery Support"],
        operate: ["Inventory", "Customers", "QR", "Payments", "Returns"],
        proof: ["Shop identity/location", "Owner/operator authority", "Product categories", "Settlement identity"]
      }),
      general_retailer: profile("general_retailer", "General Retail Shop / Dukaan", {
        family: "retail", gstNature: ["Retail Business"], supplyType: "goods",
        summary: "Operate a supported local shop with sales, procurement and delivery tools.",
        sell: ["Catalog", "Orders", "Pickup", "Delivery", "Offers"],
        buy: ["Wholesale Stock", "Supplier Orders", "Replenishment"],
        operate: ["Inventory", "Customers", "QR", "Money"],
        proof: ["Shop identity/location", "Owner/operator authority", "Supported categories", "Settlement identity"]
      }),
      individual_product_seller: profile("individual_product_seller", "Individual Product Seller", {
        family: "retail", gstNature: ["Retail Business"], supplyType: "goods",
        summary: "Sell approved products as an individual without creating a factory or shop profile.",
        sell: ["Products", "Orders", "Pickup/Delivery", "Customer Chat"],
        buy: ["Supplies", "Packaging", "Delivery"],
        operate: ["Availability", "Payments", "Proof", "Support"],
        proof: ["Identity/KYC", "Product samples", "Source/ownership proof", "Service area", "Payout identity"]
      }),
      restaurant: profile("restaurant", "Restaurant / Dhaba / Cafe", {
        family: "food", gstNature: ["Supplier of services"], supplyType: "both",
        summary: "Operate food orders, tables, takeaway, delivery and ingredient procurement.",
        sell: ["Menu", "Food Orders", "Tables", "Takeaway", "Delivery"],
        buy: ["Ingredients", "Packaging", "Cleaning", "Staff/Delivery"],
        operate: ["Kitchen Capacity", "Guests", "Offers", "Settlements"],
        proof: ["Outlet identity", "Food compliance where applicable", "Menu", "Capacity", "Settlement identity"]
      }),
      cloud_kitchen: profile("cloud_kitchen", "Cloud Kitchen", {
        family: "food", gstNature: ["Supplier of services"], supplyType: "both",
        summary: "Run a delivery/takeaway kitchen with menu, capacity and input procurement.",
        sell: ["Menu", "Delivery Orders", "Takeaway", "Meal Offers"],
        buy: ["Ingredients", "Packaging", "Cleaning", "Delivery"],
        operate: ["Preparation Capacity", "Service Radius", "Orders", "Money"],
        proof: ["Kitchen identity", "Food compliance where applicable", "Menu", "Service radius"]
      }),
      tiffin_provider: profile("tiffin_provider", "Tiffin Provider", {
        family: "food", gstNature: ["Supplier of services"], supplyType: "both",
        summary: "Offer recurring meal plans with scheduled preparation and delivery.",
        sell: ["Meal Plans", "Subscriptions", "Pause/Resume", "Delivery"],
        buy: ["Ingredients", "Packaging", "Delivery"],
        operate: ["Menu Calendar", "Subscriber Capacity", "Orders", "Money"],
        proof: ["Kitchen/provider identity", "Menu plans", "Food compliance where applicable", "Capacity"]
      }),
      individual_doctor: profile("individual_doctor", "Individual Doctor", {
        family: "health", gstNature: ["Supplier of services"], supplyType: "services",
        summary: "Operate your professional appointments, consultations and follow-ups.",
        sell: ["Appointments", "Consultations", "Follow-Ups", "Patient Education"],
        buy: ["Clinic Supplies", "Software/Services"],
        operate: ["Slots", "Patients", "Reports", "Receipts", "Compliance"],
        proof: ["Professional registration", "Specialty", "Practice location/mode", "Settlement identity"]
      }),
      clinic: profile("clinic", "Clinic", {
        family: "health", gstNature: ["Supplier of services"], supplyType: "services",
        summary: "Operate a clinic with practitioners, appointments and patient workflows.",
        sell: ["Appointments", "Services", "Packages", "Follow-Ups"],
        buy: ["Medical Supplies", "Equipment", "Software/Services"],
        operate: ["Practitioners", "Slots", "Patients", "Receipts", "Compliance"],
        proof: ["Establishment identity", "Authorized operator", "Practitioners", "Applicable registrations"]
      }),
      hospital: profile("hospital", "Hospital", {
        family: "health", gstNature: ["Supplier of services"], supplyType: "services",
        summary: "Operate departments, doctors, appointments and hospital service workflows.",
        sell: ["Appointments", "Departments", "Health Services", "Diagnostics"],
        buy: ["Medical Supplies", "Medicines", "Equipment", "Staff/Services"],
        operate: ["Doctors", "Departments", "Patients", "Money", "Compliance"],
        proof: ["Hospital identity", "Authorized operator", "Applicable registrations", "Departments/practitioners"]
      }),
      pharmacy: profile("pharmacy", "Medical Store / Pharmacy", {
        family: "pharmacy", gstNature: ["Retail Business"], supplyType: "goods",
        summary: "Operate licensed medicine/refill orders and compliant procurement.",
        sell: ["Medicine Orders", "Refills", "Prescription Check", "Delivery"],
        buy: ["Authorized Medicine Supply", "Inventory", "Cold Chain"],
        operate: ["Pharmacist Workflow", "Batch/Expiry", "Invoices", "Compliance"],
        proof: ["Pharmacy licence", "Responsible pharmacist", "Licensed premises", "Invoice/prescription workflow"]
      }),
      salon: profile("salon", "Salon / Parlour", {
        family: "services", gstNature: ["Supplier of services"], supplyType: "services",
        summary: "Operate bookings, service packages, customers and salon supplies.",
        sell: ["Services", "Bookings", "Packages", "Memberships"],
        buy: ["Beauty Products", "Tools", "Equipment", "Training"],
        operate: ["Slots", "Customers", "Reviews", "Money"],
        proof: ["Salon/location identity", "Owner/operator authority", "Service menu", "Safety/hygiene readiness"]
      }),
      home_beauty: profile("home_beauty", "Home Beauty Provider", {
        family: "services", gstNature: ["Supplier of services"], supplyType: "services",
        summary: "Provide enabled beauty and occasion services within a verified service area.",
        sell: ["Service Menu", "Home Bookings", "Packages", "Customer Chat"],
        buy: ["Products", "Tools", "Travel Support"],
        operate: ["Availability", "Service Radius", "Safety", "Payouts"],
        proof: ["Identity/KYC", "Skills/menu", "Sample work", "Service area", "Safety readiness"]
      }),
      individual_service: profile("individual_service", "Individual Service Provider", {
        family: "services", gstNature: ["Supplier of services"], supplyType: "services",
        summary: "Offer one or more currently enabled local services to customers.",
        sell: ["Services", "Bookings", "Quotes", "Completion Proof"],
        buy: ["Tools", "Supplies", "Travel Support"],
        operate: ["Availability", "Service Area", "Customers", "Payouts"],
        proof: ["Identity/KYC", "Enabled service family", "Skill/sample proof", "Service area", "Safety readiness"]
      }),
      bike_captain: profile("bike_captain", "Bike Captain", {
        family: "mobility", gstNature: ["Supplier of services"], supplyType: "services",
        summary: "Complete eligible passenger rides using a verified bike.",
        sell: ["Ride Availability", "Trips"], buy: ["Fuel/Maintenance"],
        operate: ["Map", "Pickup/Drop", "Safety", "Earnings", "Support"],
        proof: ["Identity", "Driving licence", "Vehicle RC", "Insurance/permit where applicable", "Service zone"]
      }),
      auto_captain: profile("auto_captain", "Auto Captain", {
        family: "mobility", gstNature: ["Supplier of services"], supplyType: "services",
        summary: "Complete eligible passenger rides using a verified auto.",
        sell: ["Ride Availability", "Trips"], buy: ["Fuel/Maintenance"],
        operate: ["Map", "Pickup/Drop", "Safety", "Earnings", "Support"],
        proof: ["Identity", "Driving licence", "Vehicle RC", "Insurance/permit", "Service zone"]
      }),
      cab_captain: profile("cab_captain", "Cab / Car Captain", {
        family: "mobility", gstNature: ["Supplier of services"], supplyType: "services",
        summary: "Complete eligible passenger rides using a verified car.",
        sell: ["Ride Availability", "Trips", "Eligible Packages"], buy: ["Fuel/Maintenance"],
        operate: ["Map", "Pickup/Drop", "Safety", "Earnings", "Support"],
        proof: ["Identity", "Driving licence", "Vehicle RC", "Insurance/commercial permit", "Service zone"]
      }),
      delivery_partner: profile("delivery_partner", "Delivery Partner", {
        family: "delivery", gstNature: ["Supplier of services"], supplyType: "services",
        summary: "Complete eligible restaurant, grocery and shop deliveries.",
        sell: ["Availability", "Delivery Work"], buy: ["Fuel/Maintenance"],
        operate: ["Pickup", "Drop", "Proof", "Routes", "Payout", "Reliability"],
        proof: ["Identity/KYC", "Movement mode/vehicle", "Service zone", "Proof capability", "Payout identity"]
      }),
      local_transporter: profile("local_transporter", "Local Porter / Goods Transporter", {
        family: "transport", gstNature: ["Supplier of services"], supplyType: "services",
        summary: "Move eligible goods locally within controlled value and custody limits.",
        sell: ["Vehicle Capacity", "Transport Availability", "Trips"], buy: ["Fuel/Maintenance"],
        operate: ["Pickup/Drop", "Proof", "Routes", "Invoices", "Settlements"],
        proof: ["Identity/business", "Vehicle details", "Permits/insurance where applicable", "Service geography"]
      }),
      fleet_operator: profile("fleet_operator", "Transport / Fleet Operator", {
        family: "transport", gstNature: ["Supplier of services"], supplyType: "services",
        summary: "Operate multiple eligible goods vehicles and transport assignments.",
        sell: ["Fleet Capacity", "Transport Contracts", "Assignments"], buy: ["Fuel", "Maintenance", "Drivers"],
        operate: ["Vehicles", "Drivers", "Routes", "Proof", "Invoices", "Settlements"],
        proof: ["Business/operator identity", "Fleet/vehicle details", "Permits/insurance", "Service geography"]
      }),
      creator_shorts: profile("creator_shorts", "Shorts Creator", {
        family: "creator", gstNature: ["Supplier of services"], supplyType: "services",
        summary: "Create short vertical videos, build audience and accept eligible campaigns.",
        sell: ["Shorts", "Audience", "Campaign Conversion"], buy: ["Creator Tools", "Production Support"],
        operate: ["Studio", "Content Library", "Analytics", "Rights", "Payouts"],
        proof: ["Identity", "Short-video sample/page", "Language/category", "Rights/disclosure acceptance", "Payout identity"]
      }),
      creator_long: profile("creator_long", "Long-Form Video Creator", {
        family: "creator", gstNature: ["Supplier of services"], supplyType: "services",
        summary: "Create long-form videos, build channels and accept eligible campaigns.",
        sell: ["Long Videos", "Audience", "Campaign Conversion"], buy: ["Creator Tools", "Production Support"],
        operate: ["Studio", "Content Library", "Analytics", "Rights", "Payouts"],
        proof: ["Identity", "Long-video sample/page", "Language/category", "Rights/disclosure acceptance", "Payout identity"]
      }),
      creator_multi: profile("creator_multi", "Multi-Format Creator", {
        family: "creator", gstNature: ["Supplier of services"], supplyType: "services",
        summary: "Create shorts, long videos and social posts from one creator workspace.",
        sell: ["Shorts", "Long Videos", "Posts", "Audience", "Campaign Conversion"], buy: ["Creator Tools", "Production Support"],
        operate: ["Studio", "Content Library", "Analytics", "Rights", "Payouts"],
        proof: ["Identity", "Content samples/pages", "Formats/language", "Rights/disclosure acceptance", "Payout identity"]
      }),
      freelancer: profile("freelancer", "Freelancer / Field Partner", {
        family: "work", gstNature: ["Supplier of services"], supplyType: "services",
        summary: "Complete supported funded work with clear output, proof and payout rules.",
        sell: ["Skills", "Availability", "Verified Output"], buy: ["Training", "Work Tools"],
        operate: ["Opportunities", "Assignments", "Proof", "Corrections", "Payouts", "Ratings"],
        proof: ["Identity/KYC", "Supported skills", "Location/availability", "Proof training", "Payout identity"]
      }),
      get_it_done: profile("get_it_done", "Get It Done Provider", {
        family: "work", gstNature: ["Supplier of services"], supplyType: "services",
        summary: "Complete enabled one-off customer tasks with tracked proof and approval.",
        sell: ["Task Capability", "Availability", "Local Execution"], buy: ["Travel/Task Inputs"],
        operate: ["Tasks", "Routes", "Proof", "Approval", "Issues", "Payouts"],
        proof: ["Identity/KYC", "Enabled task families", "Operating geography", "Proof capability", "Payout identity"]
      })
    }
  };
})();
