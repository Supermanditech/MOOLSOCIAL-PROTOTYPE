(function () {
  "use strict";

  const setup = (action, steps, route = "74-workspace-operating-setup.html") => ({ action, title: `${action.replace(/^Set up /, "Finish ")} setup`, steps, route });

  window.MoolWorkspaceActivationRegistry = {
    version: "mvp-2026-07-10",
    profiles: {
      fmcg_manufacturer: setup("Set up production", ["Products and capacity", "Materials and sourcing", "Pricing and dispatch"]),
      fmcg_supplier: setup("Set up supply", ["Inventory and availability", "MOQ and price slabs", "Dispatch and buyer areas"]),
      raw_material_supplier: setup("Set up supply", ["Materials and quality grades", "MOQ and price slabs", "Capacity and dispatch"]),
      packaging_supplier: setup("Set up supply", ["Packaging and specifications", "MOQ and custom pricing", "Capacity and dispatch"]),
      grocery_retailer: setup("Set up my shop", ["Products and stock", "Prices and offers", "Counter pickup and delivery"], "74-retail-products-stock-setup.html"),
      general_retailer: setup("Set up my shop", ["Products and stock", "Prices and offers", "Pickup and delivery"], "74-retail-products-stock-setup.html"),
      individual_product_seller: setup("Set up products", ["Products and availability", "Prices and order rules", "Pickup or delivery"], "74-retail-products-stock-setup.html"),
      restaurant: setup("Set up restaurant", ["Menu and prices", "Tables and takeaway", "Kitchen timing and delivery"]),
      cloud_kitchen: setup("Set up kitchen", ["Menu and prices", "Preparation capacity", "Delivery area and timing"]),
      tiffin_provider: setup("Set up tiffin", ["Meal plans and prices", "Schedule and capacity", "Delivery and pause rules"]),
      individual_doctor: setup("Set up practice", ["Consultations and fees", "Slots and practice mode", "Follow-ups and receipts"]),
      clinic: setup("Set up clinic", ["Practitioners and services", "Slots and patient flow", "Follow-ups and receipts"]),
      hospital: setup("Set up hospital", ["Departments and doctors", "Services and appointment flow", "Patient operations and payments"]),
      pharmacy: setup("Set up pharmacy", ["Medicines and refills", "Batch, expiry and stock", "Prescription and delivery rules"]),
      salon: setup("Set up salon", ["Services and prices", "Slots and staff", "Salon or home-visit rules"]),
      home_beauty: setup("Set up services", ["Service menu and prices", "Availability and service area", "Home-visit safety rules"]),
      individual_service: setup("Set up services", ["Services and prices", "Availability and area", "Quotes and completion rules"]),
      bike_captain: setup("Set up my bike", ["Vehicle and service zone", "Go-online availability", "Trips and payout account"], "116-captain-home-availability.html"),
      auto_captain: setup("Set up my auto", ["Vehicle and service zone", "Go-online availability", "Trips and payout account"], "116-captain-home-availability.html"),
      cab_captain: setup("Set up my car", ["Vehicle and service zone", "Ride packages and availability", "Trips and payout account"], "116-captain-home-availability.html"),
      delivery_partner: setup("Set up delivery", ["Movement mode and zone", "Availability and routes", "Proof and item limits"]),
      local_transporter: setup("Set up transport", ["Vehicle and capacity", "Routes and service area", "Quotes, proof and settlement"]),
      fleet_operator: setup("Set up fleet", ["Vehicles and drivers", "Capacity and routes", "Assignments and settlement"]),
      creator_shorts: setup("Set up creator profile", ["Channel and audience", "Shorts and content rights", "Campaigns and payout"], "124-creator-studio-home.html"),
      creator_long: setup("Set up creator profile", ["Channel and audience", "Videos and content rights", "Campaigns and payout"], "124-creator-studio-home.html"),
      creator_multi: setup("Set up creator profile", ["Channels and audience", "Formats and content rights", "Campaigns and payout"], "124-creator-studio-home.html"),
      freelancer: setup("Set up field work", ["Skills and work area", "Availability and proof training", "Assignments and payout"]),
      get_it_done: setup("Set up task work", ["Task types and area", "Availability and proof", "Approval and payout"])
    },
    get(profileId) {
      return this.profiles[profileId] || setup("Continue workspace setup", ["What you provide", "Availability and fulfilment", "Payments and operating rules"]);
    }
  };
})();
