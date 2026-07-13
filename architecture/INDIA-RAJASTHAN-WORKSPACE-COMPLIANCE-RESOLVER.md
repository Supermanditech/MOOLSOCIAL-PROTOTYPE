# MoolSocial India And Rajasthan Workspace Compliance Resolver

Status: LOCKED COMPLIANCE INPUT FOR SCREEN 71 AND WORKSPACE ACTIVATION

Last updated: 10 July 2026 IST

## 1. Resolver Order

Every workspace resolves proof in this order:

```text
MoolSocial personal KYC and account-control policy
India national statutory requirements
Rajasthan state requirements
Local-body, premises, capacity and vehicle conditions
Profile-specific professional or product requirements
Operational settlement and safety checks
```

Requirements are labelled separately:

```text
Required - blocks profile review or activation
Platform check - mandatory MoolSocial identity, authorization or safety proof
Required, add later allowed - creates a visible pending state and reminders
If applicable - shown with its legal condition and does not block until applicability is established
Optional - may strengthen the profile but is not represented as a universal legal requirement
```

## 2. Personal KYC And GST Product Policy

Personal KYC is mandatory for every individual and for every owner or authorized operator acting for a business.

For a business workspace, MoolSocial requests a GST certificate as a business-verification policy. If it is unavailable, the user may submit with `GST_PENDING`. My Work and Chat continue reminders until one of the following occurs:

```text
GST certificate is verified
MoolSocial compliance review records that GST registration is not presently applicable
The workspace is closed or rejected
```

This pending policy must not be described as proof that GST law requires registration for every Indian business. Statutory GST liability is determined under applicable GST law.

## 3. Rajasthan Launch Overlays

- Doctors: Rajasthan Medical Council/NMC registration; Clinical Establishment registration for covered physical practices; qualification/specialty claim verification.
- Clinics and hospitals: Clinical Establishment registration, registered practitioner roster, biomedical-waste authorization/arrangement where applicable, Fire NOC where applicable.
- Pharmacies: applicable Rajasthan retail drug-sale licence and registered pharmacist; establishment and GST checks as applicable.
- Restaurants, cloud kitchens, tiffin and grocery food businesses: FoSCoS registration/licence appropriate to kind of business and eligibility; establishment, fire and GST checks where applicable.
- FMCG manufacturing: factory licence when covered, RSPCB approvals when categorized, Legal Metrology manufacturer/packer registration for covered pre-packaged commodities, and product-specific FSSAI or cosmetic licence.
- Shops, salons and commercial establishments: Rajasthan Shops and Commercial Establishments registration when covered.
- Captains and transport: driving licence, RC, insurance, PUC, permit/service authorization and fitness according to vehicle classification and use; establishment registration where applicable.
- Creators, freelancers, home-service providers and Get It Done providers: personal KYC, payout ownership, GST when applicable, and role-specific platform safety or capability verification. No invented professional licence.

## 4. Official Sources

- Rajasthan Medical Council: https://rmc.rajasthan.gov.in/
- Clinical Establishments Division, MoHFW: https://clinicalestablishments.mohfw.gov.in/en/state-and-uts-rules-and-notification
- FSSAI FoSCoS: https://foscos.fssai.gov.in/
- Rajasthan Drug Control services: https://rajniveshtest.rajasthan.gov.in/Home/Services/1047
- Rajasthan Pharmacy Council: https://rajasthanpharmacycouncil.in/rpc/index.aspx
- Rajasthan Shops and Commercial Establishments: https://labour.rajasthan.gov.in/RulesShop.aspx/ben_list.aspx
- Rajasthan Factories and Boilers: https://rajfab.rajasthan.gov.in/web/ProceduresFactory.htm
- Rajasthan State Pollution Control Board: https://environment.rajasthan.gov.in/content/environment/en/rajasthan-state-pollution-control-board/clearances.html
- Rajasthan biomedical-waste authorization: https://environment.rajasthan.gov.in/content/environment/en/rajasthan-state-pollution-control-board/information/WasteManagement/Bio-MedicalWasteManagement.html
- Rajasthan Transport Department: https://transport.rajasthan.gov.in/content/transportportal/en/transport/howtoget/vehicle-registration/needAndProcess.html
- Legal Metrology, Department of Consumer Affairs: https://consumeraffairs.nic.in/organisation-and-units/division/legal-metrology/registration-certificates-of-packaged-commodities
- GST registration guidance: https://tutorial.gst.gov.in/userguide/registration/Apply_for_Registration_Normal_Taxpayer.htm
- Udyam official portal: https://www.udyamregistration.gov.in/default.aspx

## 5. Maintenance Rule

Compliance rules are versioned data, not hard-coded screen copy. Before production launch and after any regulatory change, legal/compliance owners must validate the resolver against the competent authority. Expiry, suspension, geography, establishment type, turnover, capacity, worker count, product category and vehicle use can change applicability.
