(function(e){function t(t){for(var r,c,i=t[0],s=t[1],u=t[2],l=0,f=[];l<i.length;l++)c=i[l],Object.prototype.hasOwnProperty.call(a,c)&&a[c]&&f.push(a[c][0]),a[c]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);p&&p(t);while(f.length)f.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,c=1;c<n.length;c++){var i=n[c];0!==a[i]&&(r=!1)}r&&(o.splice(t--,1),e=u(u.s=n[0]))}return e}var r={},a={app:0},o=[];function c(e){return u.p+"js/"+({}[e]||e)+"."+{"chunk-4ba3999c":"d8340174"}[e]+".js"}var i={};var s={"62ea":function(){return{"./doclight_wasm_bg.js":{__wbindgen_object_drop_ref:function(e){return r["21ff"].exports["k"](e)},__wbindgen_object_clone_ref:function(e){return r["21ff"].exports["j"](e)},__wbg_new0_1dc5063f3422cdfe:function(){return r["21ff"].exports["h"]()},__wbindgen_string_new:function(e,t){return r["21ff"].exports["m"](e,t)},__wbindgen_debug_string:function(e,t){return r["21ff"].exports["i"](e,t)},__wbg_getFullYear_d36bab73ea41bdb6:function(e){return r["21ff"].exports["c"](e)},__wbg_getMonth_230e874babdb45b0:function(e){return r["21ff"].exports["f"](e)},__wbg_getDate_135a9258de93192a:function(e){return r["21ff"].exports["b"](e)},__wbg_getHours_a4567070ccd729ea:function(e){return r["21ff"].exports["d"](e)},__wbg_getMinutes_64a0cad5794f4969:function(e){return r["21ff"].exports["e"](e)},__wbg_getSeconds_8eb60717571f83cf:function(e){return r["21ff"].exports["g"](e)},__wbindgen_throw:function(e,t){return r["21ff"].exports["n"](e,t)},__wbindgen_rethrow:function(e){return r["21ff"].exports["l"](e)}}}}};function u(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(e){var t=[],n=a[e];if(0!==n)if(n)t.push(n[2]);else{var r=new Promise((function(t,r){n=a[e]=[t,r]}));t.push(n[2]=r);var o,l=document.createElement("script");l.charset="utf-8",l.timeout=120,u.nc&&l.setAttribute("nonce",u.nc),l.src=c(e);var f=new Error;o=function(t){l.onerror=l.onload=null,clearTimeout(d);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;f.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",f.name="ChunkLoadError",f.type=r,f.request=o,n[1](f)}a[e]=void 0}};var d=setTimeout((function(){o({type:"timeout",target:l})}),12e4);l.onerror=l.onload=o,document.head.appendChild(l)}var p={"chunk-4ba3999c":["62ea"]}[e]||[];return p.forEach((function(e){var n=i[e];if(n)t.push(n);else{var r,a=s[e](),o=fetch(u.p+""+{"62ea":"c96944b55b227c096254"}[e]+".module.wasm");if(a instanceof Promise&&"function"===typeof WebAssembly.compileStreaming)r=Promise.all([WebAssembly.compileStreaming(o),a]).then((function(e){return WebAssembly.instantiate(e[0],e[1])}));else if("function"===typeof WebAssembly.instantiateStreaming)r=WebAssembly.instantiateStreaming(o,a);else{var c=o.then((function(e){return e.arrayBuffer()}));r=c.then((function(e){return WebAssembly.instantiate(e,a)}))}t.push(i[e]=r.then((function(t){return u.w[e]=(t.instance||t).exports})))}})),Promise.all(t)},u.m=e,u.c=r,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)u.d(n,r,function(t){return e[t]}.bind(null,r));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/doclight/",u.oe=function(e){throw console.error(e),e},u.w={};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],f=l.push.bind(l);l.push=t,l=l.slice();for(var d=0;d<l.length;d++)t(l[d]);var p=f;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"5c0b":function(e,t,n){"use strict";n("9c0c")},"9c0c":function(e,t,n){},cd49:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",[n("v-app-bar",{attrs:{app:"",color:"primary",dark:""}},[n("v-toolbar-title",[e._v("Doclight")]),n("v-spacer"),n("v-btn",{attrs:{icon:"",disabled:0===e.images.length},on:{click:e.downloadPdf}},[n("v-icon",[e._v("save_alt")])],1)],1),n("v-main",[n("v-container",{attrs:{fluid:""}},[n("v-text-field",{attrs:{label:"Document title"},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),n("div",{staticClass:"image-container",class:{"no-overflow-x":e.drawer}},[n("div",{staticClass:"container-padding"}),e._l(e.images,(function(t,r){return n("div",{key:t,staticClass:"image-display"},[n("img",{attrs:{src:t}}),n("v-btn",{attrs:{tile:"",disabled:0===r},on:{click:function(t){return e.swapImageLeft(r)}}},[n("v-icon",[e._v("chevron_left")])],1),n("v-btn",{attrs:{tile:""},on:{click:function(t){return e.deleteImage(r)}}},[n("v-icon",[e._v("clear")])],1),n("v-btn",{attrs:{tile:"",disabled:r===e.images.length-1},on:{click:function(t){return e.swapImageRight(r)}}},[n("v-icon",[e._v("chevron_right")])],1)],1)})),n("div",{staticClass:"container-padding"})],2)],1),n("v-btn",{attrs:{fixed:"",bottom:"",right:"",fab:"",dark:"",color:"primary","aria-label":"Add photo"},on:{click:e.addImage}},[n("v-icon",[e._v("camera_alt")])],1)],1),n("v-snackbar",{attrs:{color:"green"},model:{value:e.snackbars.downloadSuccess,callback:function(t){e.$set(e.snackbars,"downloadSuccess",t)},expression:"snackbars.downloadSuccess"}},[e._v(" Export successful. ")]),n("v-snackbar",{attrs:{color:"red"},model:{value:e.snackbars.downloadError,callback:function(t){e.$set(e.snackbars,"downloadError",t)},expression:"snackbars.downloadError"}},[e._v(" An unexpected error occurred. One or more images may be corrupted. ")]),n("v-snackbar",{attrs:{vertical:"",timeout:"-1"},scopedSlots:e._u([{key:"action",fn:function(t){var r=t.attrs;return[n("v-btn",e._b({attrs:{color:"primary"},on:{click:e.installPwa}},"v-btn",r,!1),[e._v("Yes")]),n("v-btn",e._b({attrs:{text:""},on:{click:e.dismissPwaPrompt}},"v-btn",r,!1),[e._v("No")]),n("v-btn",e._b({attrs:{text:""},on:{click:e.permaDismissPwaPrompt}},"v-btn",r,!1),[e._v("Don't show again")])]}}]),model:{value:e.snackbars.pwaPrompt,callback:function(t){e.$set(e.snackbars,"pwaPrompt",t)},expression:"snackbars.pwaPrompt"}},[e._v(" Install as an app for the best experience! ")])],1)},o=[],c=(n("99af"),n("a434"),n("b0c0"),n("d3b7"),n("3ca3"),n("5cc6"),n("9a8c"),n("a975"),n("735e"),n("c1ac"),n("d139"),n("3a7b"),n("d5d6"),n("82f8"),n("e91f"),n("60bd"),n("5f96"),n("3280"),n("3fcc"),n("ca91"),n("25a1"),n("cd26"),n("3c5d"),n("2954"),n("649e"),n("219c"),n("170b"),n("b39a"),n("72f7"),n("ddb0"),n("2b3d"),n("b85c")),i=(n("96cf"),n("1da1")),s=n("d4ec"),u=n("bee2"),l=n("262e"),f=n("2caf"),d=n("9ab4"),p=n("1b40"),b=n.e("chunk-4ba3999c").then(n.bind(null,"434c")),v=b,m=function(e){Object(l["a"])(n,e);var t=Object(f["a"])(n);function n(){var e;return Object(s["a"])(this,n),e=t.apply(this,arguments),e.drawer=null,e.name="",e.images=[],e.snackbars={downloadSuccess:!1,downloadError:!1,pwaPrompt:!1},e.pwaEvent=null,e}return Object(u["a"])(n,[{key:"created",value:function(){var e=this,t=new Date;this.name="".concat(t.getMonth()+1,"-").concat(t.getDate(),"-").concat(t.getFullYear()," ")+"".concat(t.getHours(),":")+"".concat(t.getMinutes()<10?"0":"").concat(t.getMinutes()),localStorage.getItem("doclight:pwaPromptDontShow")||window.addEventListener("beforeinstallprompt",(function(t){t.preventDefault(),e.pwaEvent=t,e.snackbars.pwaPrompt=!0}))}},{key:"addImage",value:function(){var e=this,t=document.createElement("input");t.type="file",t.accept="image/jpeg",t.setAttribute("capture","environment"),t.style.display="none",t.addEventListener("input",(function(){var n;null!==t&&void 0!==t&&null!==(n=t.files)&&void 0!==n&&n[0]&&e.images.push(URL.createObjectURL(t.files[0]))})),document.body.appendChild(t),t.click(),t.remove()}},{key:"swapImageLeft",value:function(e){var t=this.images[e-1];this.$set(this.images,e-1,this.images[e]),this.$set(this.images,e,t)}},{key:"swapImageRight",value:function(e){var t=this.images[e+1];this.$set(this.images,e+1,this.images[e]),this.$set(this.images,e,t)}},{key:"deleteImage",value:function(e){URL.revokeObjectURL(this.images.splice(e,1)[0])}},{key:"createPdf",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){var t,n,r,a,o,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,v;case 2:t=e.sent,n=t.PdfJob.new(),r=Object(c["a"])(this.images),e.prev=5,r.s();case 7:if((a=r.n()).done){e.next=20;break}return o=a.value,e.t0=n,e.t1=Uint8Array,e.next=13,fetch(o);case 13:return e.next=15,e.sent.arrayBuffer();case 15:e.t2=e.sent,e.t3=new e.t1(e.t2),e.t0.add_image.call(e.t0,e.t3);case 18:e.next=7;break;case 20:e.next=25;break;case 22:e.prev=22,e.t4=e["catch"](5),r.e(e.t4);case 25:return e.prev=25,r.f(),e.finish(25);case 28:return e.prev=28,i=n.create_pdf(),e.abrupt("return",new Blob([i],{type:"application/pdf"}));case 33:return e.prev=33,e.t5=e["catch"](28),console.error(e.t5),e.abrupt("return",null);case 37:case"end":return e.stop()}}),e,this,[[5,22,25,28],[28,33]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"downloadPdf",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){var t,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.createPdf();case 2:t=e.sent,t?(n=document.createElement("a"),n.href=URL.createObjectURL(t),n.download="".concat(this.name,".pdf"),n.style.display="none",document.body.appendChild(n),n.click(),n.remove(),this.snackbars.downloadSuccess=!0):this.snackbars.downloadError=!0;case 4:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"installPwa",value:function(){var e;this.snackbars.pwaPrompt=!1,null===(e=this.pwaEvent)||void 0===e||e.prompt()}},{key:"dismissPwaPrompt",value:function(){this.snackbars.pwaPrompt=!1}},{key:"permaDismissPwaPrompt",value:function(){this.snackbars.pwaPrompt=!1,localStorage.setItem("doclight:pwaPromptDontShow","f")}}]),n}(p["b"]);m=Object(d["a"])([Object(p["a"])({})],m);var g=m,h=g,w=(n("5c0b"),n("2877")),_=n("6544"),k=n.n(_),y=n("7496"),x=n("40dc"),P=n("8336"),j=n("a523"),O=n("132d"),S=n("f6c4"),E=n("2db4"),A=n("2fa4"),I=n("8654"),L=n("2a7f"),R=Object(w["a"])(h,a,o,!1,null,null,null),D=R.exports;k()(R,{VApp:y["a"],VAppBar:x["a"],VBtn:P["a"],VContainer:j["a"],VIcon:O["a"],VMain:S["a"],VSnackbar:E["a"],VSpacer:A["a"],VTextField:I["a"],VToolbarTitle:L["a"]});var C=n("9483");Object(C["a"])("".concat("/doclight/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});var M=n("f309"),V=n("fcf4");r["a"].use(M["a"]);var $=new M["a"]({icons:{iconfont:"md"},theme:{themes:{light:{primary:V["a"].indigo}}}});r["a"].config.productionTip=!1,new r["a"]({vuetify:$,render:function(e){return e(D)}}).$mount("#app")}});
//# sourceMappingURL=app.c47bd337.js.map