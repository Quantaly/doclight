(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21a3c8"],{bb3e:function(e,n,o){"use strict";o.r(n);var t,r=function(){return Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/))};function i(e,n){void 0===n&&(n={});var o=n.registrationOptions;void 0===o&&(o={}),delete n.registrationOptions;var i=function(e){var o=[],t=arguments.length-1;while(t-- >0)o[t]=arguments[t+1];n&&n[e]&&n[e].apply(n,o)};"serviceWorker"in navigator&&t.then((function(){r()?(s(e,i,o),navigator.serviceWorker.ready.then((function(e){i("ready",e)})).catch((function(e){return c(i,e)}))):(a(e,i,o),navigator.serviceWorker.ready.then((function(e){i("ready",e)})).catch((function(e){return c(i,e)})))}))}function c(e,n){navigator.onLine||e("offline"),e("error",n)}function a(e,n,o){navigator.serviceWorker.register(e,o).then((function(e){n("registered",e),e.waiting?n("updated",e):e.onupdatefound=function(){n("updatefound",e);var o=e.installing;o.onstatechange=function(){"installed"===o.state&&(navigator.serviceWorker.controller?n("updated",e):n("cached",e))}}})).catch((function(e){return c(n,e)}))}function s(e,n,o){fetch(e).then((function(t){404===t.status?(n("error",new Error("Service worker not found at "+e)),d()):-1===t.headers.get("content-type").indexOf("javascript")?(n("error",new Error("Expected "+e+" to have javascript content-type, but received "+t.headers.get("content-type"))),d()):a(e,n,o)})).catch((function(e){return c(n,e)}))}function d(){"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){return c(emit,e)}))}"undefined"!==typeof window&&(t="undefined"!==typeof Promise?new Promise((function(e){return window.addEventListener("load",e)})):{then:function(e){return window.addEventListener("load",e)}}),i("".concat("/doclight/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}})}}]);
//# sourceMappingURL=chunk-2d21a3c8.bb045256.js.map