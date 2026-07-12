const CACHE="moolsocial-user-test-v2";
const CORE=["./mobile-user-test.html","./manifest.webmanifest","./assets/moolsocial-app-icon.svg","./screens/00-install-app.html","./screens/01-app-splash-first-open.html","./screens/02-first-setup-language-location.html","./screens/03-login-account-handoff.html","./screens/04-universal-focus-shell.html"];
self.addEventListener("install",event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE))));
self.addEventListener("activate",event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key))))));
self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET")return;
  event.respondWith(fetch(event.request).then(response=>{
    const copy=response.clone();
    caches.open(CACHE).then(cache=>cache.put(event.request,copy));
    return response;
  }).catch(()=>caches.match(event.request).then(response=>response||caches.match("./mobile-user-test.html"))));
});
