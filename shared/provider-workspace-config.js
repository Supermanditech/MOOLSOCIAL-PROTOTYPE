(function(){
  "use strict";
  const profiles={
    restaurant:{name:"Spice Route Restaurant",type:"Restaurant",requests:"Orders",catalogue:"Menu",unit:"dishes",primary:"Food order",compliance:"FSSAI and premises readiness",capacity:"Kitchen capacity",offer1:"Paneer thali",offer2:"Family meal",next:"Start preparation by 11:25",execute:"Prepare and pack order"},
    cloud_kitchen:{name:"Jodhpur Cloud Kitchen",type:"Cloud Kitchen",requests:"Orders",catalogue:"Menu",unit:"dishes",primary:"Food order",compliance:"FSSAI and kitchen readiness",capacity:"Kitchen capacity",offer1:"North Indian meal",offer2:"Family combo",next:"Start preparation by 11:25",execute:"Prepare and seal order"},
    tiffin_provider:{name:"Maa Ka Tiffin",type:"Tiffin Provider",requests:"Orders",catalogue:"Plans",unit:"meal plans",primary:"Tiffin order",compliance:"Food and kitchen readiness",capacity:"Meal capacity",offer1:"Daily lunch tiffin",offer2:"Monthly meal plan",next:"Confirm today's meal by 11:25",execute:"Prepare scheduled meal"},
    salon:{name:"Aura Salon",type:"Salon",requests:"Bookings",catalogue:"Services",unit:"services",primary:"Salon booking",compliance:"Premises and staff readiness",capacity:"Staff and slots",offer1:"Haircut and finish",offer2:"Premium grooming",next:"Confirm staff and station by 11:25",execute:"Start booked service"},
    individual_doctor:{name:"Dr. Meera Clinic",type:"Doctor",requests:"Appointments",catalogue:"Consultations",unit:"consultations",primary:"Patient appointment",compliance:"Medical registration and practice readiness",capacity:"Consultation slots",offer1:"In-clinic consultation",offer2:"Video follow-up",next:"Review patient reason before 11:25",execute:"Conduct consultation"},
    clinic:{name:"Swasthya Clinic",type:"Clinic",requests:"Appointments",catalogue:"Services",unit:"clinical services",primary:"Patient appointment",compliance:"Clinic and practitioner readiness",capacity:"Doctors and slots",offer1:"General consultation",offer2:"Follow-up consultation",next:"Assign practitioner before 11:25",execute:"Start patient visit"},
    hospital:{name:"City Care Hospital",type:"Hospital",requests:"Appointments",catalogue:"Departments",unit:"departments",primary:"Patient appointment",compliance:"Hospital and practitioner readiness",capacity:"Departments and slots",offer1:"General medicine",offer2:"Diagnostic consultation",next:"Confirm department and doctor",execute:"Start patient appointment"},
    pharmacy:{name:"Mahadev Medical Store",type:"Pharmacy",requests:"Orders",catalogue:"Medicines",unit:"products",primary:"Pharmacy order",compliance:"Drug licence and pharmacist readiness",capacity:"Stock and pharmacist",offer1:"Prescription medicine order",offer2:"Repeat medicine refill",next:"Pharmacist review before 11:25",execute:"Verify prescription and pack"},
    local_transporter:{name:"Marwar Transport",type:"Transporter",requests:"Jobs",catalogue:"Services",unit:"transport services",primary:"Transport job",compliance:"Vehicle and transport readiness",capacity:"Fleet and routes",offer1:"Local goods movement",offer2:"Intercity transport",next:"Assign vehicle and driver",execute:"Start pickup journey"},
    fleet_operator:{name:"Rajputana Fleet Services",type:"Fleet Operator",requests:"Jobs",catalogue:"Services",unit:"fleet services",primary:"Transport job",compliance:"Fleet, driver and transport readiness",capacity:"Vehicles and routes",offer1:"Local fleet movement",offer2:"Scheduled route capacity",next:"Assign vehicle and driver",execute:"Start pickup journey"},
    home_beauty:{name:"Seema Home Beauty",type:"Home Beauty Provider",requests:"Bookings",catalogue:"Services",unit:"beauty services",primary:"Home service booking",compliance:"Identity, skill and home-visit readiness",capacity:"Availability and service area",offer1:"Home beauty visit",offer2:"Premium care session",next:"Confirm travel and kit",execute:"Start home service"},
    individual_service:{name:"Ravi Home Services",type:"Service Provider",requests:"Requests",catalogue:"Services",unit:"services",primary:"Service request",compliance:"Identity and service readiness",capacity:"Availability and area",offer1:"Standard service",offer2:"Premium service",next:"Confirm arrival by 11:25",execute:"Start service"}
  };
  const bindings={
    "provider-name":"name","provider-type":"type","request-label":"requests","catalogue-label":"catalogue","capacity-label":"capacity","compliance-label":"compliance","offer-one":"offer1","offer-two":"offer2","next-action":"next","execution-action":"execute"
  };
  window.MoolProviderWorkspace={
    get(id){return profiles[id]||profiles.individual_service},
    apply(root=document){
      const params=new URLSearchParams(location.search);
      const id=params.get("profile")||"individual_service";
      const p=this.get(id);
      Object.entries(bindings).forEach(([attribute,key])=>root.querySelectorAll(`[data-${attribute}]`).forEach(x=>x.textContent=p[key]));
      root.querySelectorAll("b").forEach(x=>{
        const value=x.textContent.trim();
        if(value.startsWith("Standard service"))x.textContent=value.replace("Standard service",p.offer1);
        if(value.startsWith("Premium service"))x.textContent=value.replace("Premium service",p.offer2);
        if(value==="Confirm arrival by 11:25")x.textContent=p.next;
      });
      root.querySelectorAll("small").forEach(x=>{
        if(x.textContent.trim()==="Confirm arrival or preparation as applicable")x.textContent=p.execute;
      });
      root.querySelectorAll("[data-provider-link]").forEach(x=>{
        const url=new URL(x.getAttribute("href"),location.href);
        url.searchParams.set("profile",id);
        if(params.get("workspace"))url.searchParams.set("workspace",params.get("workspace"));
        x.href=url.href;
      });
      return {id,...p};
    }
  };
})();
