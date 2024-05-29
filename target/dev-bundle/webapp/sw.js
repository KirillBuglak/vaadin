try{self["workbox:core:7.0.0"]&&_()}catch{}const M=(s,...e)=>{let t=s;return e.length>0&&(t+=` :: ${JSON.stringify(e)}`),t},O=M;class l extends Error{constructor(e,t){const a=O(e,t);super(a),this.name=e,this.details=t}}const S=new Set,h={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:typeof registration<"u"?registration.scope:""},R=s=>[h.prefix,s,h.suffix].filter(e=>e&&e.length>0).join("-"),W=s=>{for(const e of Object.keys(h))s(e)},N={updateDetails:s=>{W(e=>{typeof s[e]=="string"&&(h[e]=s[e])})},getGoogleAnalyticsName:s=>s||R(h.googleAnalytics),getPrecacheName:s=>s||R(h.precache),getPrefix:()=>h.prefix,getRuntimeName:s=>s||R(h.runtime),getSuffix:()=>h.suffix};function k(s,e){const t=new URL(s);for(const a of e)t.searchParams.delete(a);return t.href}async function F(s,e,t,a){const i=k(e.url,t);if(e.url===i)return s.match(e,a);const n=Object.assign(Object.assign({},a),{ignoreSearch:!0}),r=await s.keys(e,n);for(const c of r){const o=k(c.url,t);if(i===o)return s.match(c,a)}}let g;function B(){if(g===void 0){const s=new Response("");if("body"in s)try{new Response(s.body),g=!0}catch{g=!1}g=!1}return g}class H{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}async function q(){for(const s of S)await s()}const G=s=>new URL(String(s),location.href).href.replace(new RegExp(`^${location.origin}`),"");function T(s){return new Promise(e=>setTimeout(e,s))}function U(s,e){const t=e();return s.waitUntil(t),t}async function Q(s,e){let t=null;if(s.url&&(t=new URL(s.url).origin),t!==self.location.origin)throw new l("cross-origin-copy-response",{origin:t});const a=s.clone(),i={headers:new Headers(a.headers),status:a.status,statusText:a.statusText},n=e?e(i):i,r=B()?a.body:await a.blob();return new Response(r,n)}function Y(){self.addEventListener("activate",()=>self.clients.claim())}try{self["workbox:precaching:7.0.0"]&&_()}catch{}const $="__WB_REVISION__";function z(s){if(!s)throw new l("add-to-cache-list-unexpected-type",{entry:s});if(typeof s=="string"){const n=new URL(s,location.href);return{cacheKey:n.href,url:n.href}}const{revision:e,url:t}=s;if(!t)throw new l("add-to-cache-list-unexpected-type",{entry:s});if(!e){const n=new URL(t,location.href);return{cacheKey:n.href,url:n.href}}const a=new URL(t,location.href),i=new URL(t,location.href);return a.searchParams.set($,e),{cacheKey:a.href,url:i.href}}class J{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:a})=>{if(e.type==="install"&&t&&t.originalRequest&&t.originalRequest instanceof Request){const i=t.originalRequest.url;a?this.notUpdatedURLs.push(i):this.updatedURLs.push(i)}return a}}}class Z{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:t,params:a})=>{const i=(a==null?void 0:a.cacheKey)||this._precacheController.getCacheKeyForURL(t.url);return i?new Request(i,{headers:t.headers}):t},this._precacheController=e}}try{self["workbox:strategies:7.0.0"]&&_()}catch{}function m(s){return typeof s=="string"?new Request(s):s}class X{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new H,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const a of this._plugins)this._pluginStateMap.set(a,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){const{event:t}=this;let a=m(e);if(a.mode==="navigate"&&t instanceof FetchEvent&&t.preloadResponse){const r=await t.preloadResponse;if(r)return r}const i=this.hasCallback("fetchDidFail")?a.clone():null;try{for(const r of this.iterateCallbacks("requestWillFetch"))a=await r({request:a.clone(),event:t})}catch(r){if(r instanceof Error)throw new l("plugin-error-request-will-fetch",{thrownErrorMessage:r.message})}const n=a.clone();try{let r;r=await fetch(a,a.mode==="navigate"?void 0:this._strategy.fetchOptions);for(const c of this.iterateCallbacks("fetchDidSucceed"))r=await c({event:t,request:n,response:r});return r}catch(r){throw i&&await this.runCallbacks("fetchDidFail",{error:r,event:t,originalRequest:i.clone(),request:n.clone()}),r}}async fetchAndCachePut(e){const t=await this.fetch(e),a=t.clone();return this.waitUntil(this.cachePut(e,a)),t}async cacheMatch(e){const t=m(e);let a;const{cacheName:i,matchOptions:n}=this._strategy,r=await this.getCacheKey(t,"read"),c=Object.assign(Object.assign({},n),{cacheName:i});a=await caches.match(r,c);for(const o of this.iterateCallbacks("cachedResponseWillBeUsed"))a=await o({cacheName:i,matchOptions:n,cachedResponse:a,request:r,event:this.event})||void 0;return a}async cachePut(e,t){const a=m(e);await T(0);const i=await this.getCacheKey(a,"write");if(!t)throw new l("cache-put-with-no-response",{url:G(i.url)});const n=await this._ensureResponseSafeToCache(t);if(!n)return!1;const{cacheName:r,matchOptions:c}=this._strategy,o=await self.caches.open(r),d=this.hasCallback("cacheDidUpdate"),p=d?await F(o,i.clone(),["__WB_REVISION__"],c):null;try{await o.put(i,d?n.clone():n)}catch(u){if(u instanceof Error)throw u.name==="QuotaExceededError"&&await q(),u}for(const u of this.iterateCallbacks("cacheDidUpdate"))await u({cacheName:r,oldResponse:p,newResponse:n.clone(),request:i,event:this.event});return!0}async getCacheKey(e,t){const a=`${e.url} | ${t}`;if(!this._cacheKeys[a]){let i=e;for(const n of this.iterateCallbacks("cacheKeyWillBeUsed"))i=m(await n({mode:t,request:i,event:this.event,params:this.params}));this._cacheKeys[a]=i}return this._cacheKeys[a]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const a of this.iterateCallbacks(e))await a(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if(typeof t[e]=="function"){const a=this._pluginStateMap.get(t);yield n=>{const r=Object.assign(Object.assign({},n),{state:a});return t[e](r)}}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,a=!1;for(const i of this.iterateCallbacks("cacheWillUpdate"))if(t=await i({request:this.request,response:t,event:this.event})||void 0,a=!0,!t)break;return a||t&&t.status!==200&&(t=void 0),t}}class I{constructor(e={}){this.cacheName=N.getRuntimeName(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,a=typeof e.request=="string"?new Request(e.request):e.request,i="params"in e?e.params:void 0,n=new X(this,{event:t,request:a,params:i}),r=this._getResponse(n,a,t),c=this._awaitComplete(r,n,a,t);return[r,c]}async _getResponse(e,t,a){await e.runCallbacks("handlerWillStart",{event:a,request:t});let i;try{if(i=await this._handle(t,e),!i||i.type==="error")throw new l("no-response",{url:t.url})}catch(n){if(n instanceof Error){for(const r of e.iterateCallbacks("handlerDidError"))if(i=await r({error:n,event:a,request:t}),i)break}if(!i)throw n}for(const n of e.iterateCallbacks("handlerWillRespond"))i=await n({event:a,request:t,response:i});return i}async _awaitComplete(e,t,a,i){let n,r;try{n=await e}catch{}try{await t.runCallbacks("handlerDidRespond",{event:i,request:a,response:n}),await t.doneWaiting()}catch(c){c instanceof Error&&(r=c)}if(await t.runCallbacks("handlerDidComplete",{event:i,request:a,response:n,error:r}),t.destroy(),r)throw r}}class f extends I{constructor(e={}){e.cacheName=N.getPrecacheName(e.cacheName),super(e),this._fallbackToNetwork=e.fallbackToNetwork!==!1,this.plugins.push(f.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){const a=await t.cacheMatch(e);return a||(t.event&&t.event.type==="install"?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,t){let a;const i=t.params||{};if(this._fallbackToNetwork){const n=i.integrity,r=e.integrity,c=!r||r===n;a=await t.fetch(new Request(e,{integrity:e.mode!=="no-cors"?r||n:void 0})),n&&c&&e.mode!=="no-cors"&&(this._useDefaultCacheabilityPluginIfNeeded(),await t.cachePut(e,a.clone()))}else throw new l("missing-precache-entry",{cacheName:this.cacheName,url:e.url});return a}async _handleInstall(e,t){this._useDefaultCacheabilityPluginIfNeeded();const a=await t.fetch(e);if(!await t.cachePut(e,a.clone()))throw new l("bad-precaching-response",{url:e.url,status:a.status});return a}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[a,i]of this.plugins.entries())i!==f.copyRedirectedCacheableResponsesPlugin&&(i===f.defaultPrecacheCacheabilityPlugin&&(e=a),i.cacheWillUpdate&&t++);t===0?this.plugins.push(f.defaultPrecacheCacheabilityPlugin):t>1&&e!==null&&this.plugins.splice(e,1)}}f.defaultPrecacheCacheabilityPlugin={async cacheWillUpdate({response:s}){return!s||s.status>=400?null:s}};f.copyRedirectedCacheableResponsesPlugin={async cacheWillUpdate({response:s}){return s.redirected?await Q(s):s}};class ee{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:a=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new f({cacheName:N.getPrecacheName(e),plugins:[...t,new Z({precacheController:this})],fallbackToNetwork:a}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){const t=[];for(const a of e){typeof a=="string"?t.push(a):a&&a.revision===void 0&&t.push(a.url);const{cacheKey:i,url:n}=z(a),r=typeof a!="string"&&a.revision?"reload":"default";if(this._urlsToCacheKeys.has(n)&&this._urlsToCacheKeys.get(n)!==i)throw new l("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(n),secondEntry:i});if(typeof a!="string"&&a.integrity){if(this._cacheKeysToIntegrities.has(i)&&this._cacheKeysToIntegrities.get(i)!==a.integrity)throw new l("add-to-cache-list-conflicting-integrities",{url:n});this._cacheKeysToIntegrities.set(i,a.integrity)}if(this._urlsToCacheKeys.set(n,i),this._urlsToCacheModes.set(n,r),t.length>0){const c=`Workbox is precaching URLs without revision info: ${t.join(", ")}
This is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(c)}}}install(e){return U(e,async()=>{const t=new J;this.strategy.plugins.push(t);for(const[n,r]of this._urlsToCacheKeys){const c=this._cacheKeysToIntegrities.get(r),o=this._urlsToCacheModes.get(n),d=new Request(n,{integrity:c,cache:o,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:r},request:d,event:e}))}const{updatedURLs:a,notUpdatedURLs:i}=t;return{updatedURLs:a,notUpdatedURLs:i}})}activate(e){return U(e,async()=>{const t=await self.caches.open(this.strategy.cacheName),a=await t.keys(),i=new Set(this._urlsToCacheKeys.values()),n=[];for(const r of a)i.has(r.url)||(await t.delete(r),n.push(r.url));return{deletedURLs:n}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,a=this.getCacheKeyForURL(t);if(a)return(await self.caches.open(this.strategy.cacheName)).match(a)}createHandlerBoundToURL(e){const t=this.getCacheKeyForURL(e);if(!t)throw new l("non-precached-url",{url:e});return a=>(a.request=new Request(e),a.params=Object.assign({cacheKey:t},a.params),this.strategy.handle(a))}}let C;const v=()=>(C||(C=new ee),C);try{self["workbox:routing:7.0.0"]&&_()}catch{}const K="GET",y=s=>s&&typeof s=="object"?s:{handle:s};class b{constructor(e,t,a=K){this.handler=y(t),this.match=e,this.method=a}setCatchHandler(e){this.catchHandler=y(e)}}class te extends b{constructor(e,t,a){const i=({url:n})=>{const r=e.exec(n.href);if(r&&!(n.origin!==location.origin&&r.index!==0))return r.slice(1)};super(i,t,a)}}class ae{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,a=this.handleRequest({request:t,event:e});a&&e.respondWith(a)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&e.data.type==="CACHE_URLS"){const{payload:t}=e.data,a=Promise.all(t.urlsToCache.map(i=>{typeof i=="string"&&(i=[i]);const n=new Request(...i);return this.handleRequest({request:n,event:e})}));e.waitUntil(a),e.ports&&e.ports[0]&&a.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const a=new URL(e.url,location.href);if(!a.protocol.startsWith("http"))return;const i=a.origin===location.origin,{params:n,route:r}=this.findMatchingRoute({event:t,request:e,sameOrigin:i,url:a});let c=r&&r.handler;const o=e.method;if(!c&&this._defaultHandlerMap.has(o)&&(c=this._defaultHandlerMap.get(o)),!c)return;let d;try{d=c.handle({url:a,request:e,event:t,params:n})}catch(u){d=Promise.reject(u)}const p=r&&r.catchHandler;return d instanceof Promise&&(this._catchHandler||p)&&(d=d.catch(async u=>{if(p)try{return await p.handle({url:a,request:e,event:t,params:n})}catch(j){j instanceof Error&&(u=j)}if(this._catchHandler)return this._catchHandler.handle({url:a,request:e,event:t});throw u})),d}findMatchingRoute({url:e,sameOrigin:t,request:a,event:i}){const n=this._routes.get(a.method)||[];for(const r of n){let c;const o=r.match({url:e,sameOrigin:t,request:a,event:i});if(o)return c=o,(Array.isArray(c)&&c.length===0||o.constructor===Object&&Object.keys(o).length===0||typeof o=="boolean")&&(c=void 0),{route:r,params:c}}return{}}setDefaultHandler(e,t=K){this._defaultHandlerMap.set(t,y(e))}setCatchHandler(e){this._catchHandler=y(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new l("unregister-route-but-not-found-with-method",{method:e.method});const t=this._routes.get(e.method).indexOf(e);if(t>-1)this._routes.get(e.method).splice(t,1);else throw new l("unregister-route-route-not-registered")}}let w;const se=()=>(w||(w=new ae,w.addFetchListener(),w.addCacheListener()),w);function x(s,e,t){let a;if(typeof s=="string"){const n=new URL(s,location.href),r=({url:c})=>c.href===n.href;a=new b(r,e,t)}else if(s instanceof RegExp)a=new te(s,e,t);else if(typeof s=="function")a=new b(s,e,t);else if(s instanceof b)a=s;else throw new l("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});return se().registerRoute(a),a}function ie(s,e=[]){for(const t of[...s.searchParams.keys()])e.some(a=>a.test(t))&&s.searchParams.delete(t);return s}function*ne(s,{ignoreURLParametersMatching:e=[/^utm_/,/^fbclid$/],directoryIndex:t="index.html",cleanURLs:a=!0,urlManipulation:i}={}){const n=new URL(s,location.href);n.hash="",yield n.href;const r=ie(n,e);if(yield r.href,t&&r.pathname.endsWith("/")){const c=new URL(r.href);c.pathname+=t,yield c.href}if(a){const c=new URL(r.href);c.pathname+=".html",yield c.href}if(i){const c=i({url:n});for(const o of c)yield o.href}}class re extends b{constructor(e,t){const a=({request:i})=>{const n=e.getURLsToCacheKeys();for(const r of ne(i.url,t)){const c=n.get(r);if(c){const o=e.getIntegrityForCacheKey(c);return{cacheKey:c,integrity:o}}}};super(a,e.strategy)}}function ce(s){const e=v(),t=new re(e,s);x(t)}function L(s){return v().getCacheKeyForURL(s)}function V(s){return v().matchPrecache(s)}function oe(s){v().precache(s)}function le(s,e){oe(s),ce(e)}class de extends b{constructor(e,{allowlist:t=[/./],denylist:a=[]}={}){super(i=>this._match(i),e),this._allowlist=t,this._denylist=a}_match({url:e,request:t}){if(t&&t.mode!=="navigate")return!1;const a=e.pathname+e.search;for(const i of this._denylist)if(i.test(a))return!1;return!!this._allowlist.some(i=>i.test(a))}}const ue={cacheWillUpdate:async({response:s})=>s.status===200||s.status===0?s:null};class he extends I{constructor(e={}){super(e),this.plugins.some(t=>"cacheWillUpdate"in t)||this.plugins.unshift(ue),this._networkTimeoutSeconds=e.networkTimeoutSeconds||0}async _handle(e,t){const a=[],i=[];let n;if(this._networkTimeoutSeconds){const{id:o,promise:d}=this._getTimeoutPromise({request:e,logs:a,handler:t});n=o,i.push(d)}const r=this._getNetworkPromise({timeoutId:n,request:e,logs:a,handler:t});i.push(r);const c=await t.waitUntil((async()=>await t.waitUntil(Promise.race(i))||await r)());if(!c)throw new l("no-response",{url:e.url});return c}_getTimeoutPromise({request:e,logs:t,handler:a}){let i;return{promise:new Promise(r=>{i=setTimeout(async()=>{r(await a.cacheMatch(e))},this._networkTimeoutSeconds*1e3)}),id:i}}async _getNetworkPromise({timeoutId:e,request:t,logs:a,handler:i}){let n,r;try{r=await i.fetchAndCachePut(t)}catch(c){c instanceof Error&&(n=c)}return e&&clearTimeout(e),(n||!r)&&(r=await i.cacheMatch(t)),r}}class fe extends I{constructor(e={}){super(e),this._networkTimeoutSeconds=e.networkTimeoutSeconds||0}async _handle(e,t){let a,i;try{const n=[t.fetch(e)];if(this._networkTimeoutSeconds){const r=T(this._networkTimeoutSeconds*1e3);n.push(r)}if(i=await Promise.race(n),!i)throw new Error(`Timed out the network response after ${this._networkTimeoutSeconds} seconds.`)}catch(n){n instanceof Error&&(a=n)}if(!i)throw new l("no-response",{url:e.url,error:a});return i}}importScripts("sw-runtime-resources-precache.js");self.skipWaiting();Y();let A=[{url:".",revision:"c21ab9f0706743050f0fa67d4361d370"},{url:"VAADIN/build/FlowBootstrap-CHUuW4WK.js",revision:"86c7b60228bd60b898bd22f12bb25dd6"},{url:"VAADIN/build/FlowClient-BZ2ixoyw.js",revision:"0edf40db2b012272c780faeab1a30432"},{url:"VAADIN/build/generated-flow-imports-VzAjFMFk.js",revision:"b2a572a64182b0fe1496fcc121aeff91"},{url:"VAADIN/build/indexhtml-DiHTckF4.js",revision:"2453255ac1a1647ce9144c2c263a3d42"},{url:"VAADIN/build/vaadin-accordion-eed3b794-Dt5CJaRv.js",revision:"7c03dca240d37ed7709edf7b7bfa2322"},{url:"VAADIN/build/vaadin-accordion-heading-c0acdd6d-BmgrDQQi.js",revision:"7e225cdba56befad842ce9d5a9eb4d0d"},{url:"VAADIN/build/vaadin-accordion-panel-616e55d6-CmAM3gED.js",revision:"ee06ad7a893440580b25e115b991ad98"},{url:"VAADIN/build/vaadin-app-layout-e56de2e9-bUO1p_6j.js",revision:"2406b96258e6170406b3f2d9b39f3876"},{url:"VAADIN/build/vaadin-avatar-7599297d-DLDpzP5b.js",revision:"274eaa55897869199520760cb49017c3"},{url:"VAADIN/build/vaadin-big-decimal-field-e51def24-Bbn-UlsC.js",revision:"edbf04ca2c5af0997b0e78cc92b5b26a"},{url:"VAADIN/build/vaadin-board-828ebdea-kJYx9rxd.js",revision:"dc9eb593b646dad3a6edac70a1192393"},{url:"VAADIN/build/vaadin-board-row-c70d0c55-D_Njs49V.js",revision:"6de70857aeee494a12557290c564555c"},{url:"VAADIN/build/vaadin-button-2511ad84-fQqrO4BO.js",revision:"3322e73c492d49983be947933565cbec"},{url:"VAADIN/build/vaadin-chart-5192dc15-CW8jE9LH.js",revision:"45ab3df1fbdbc1b69866ee60fefc284b"},{url:"VAADIN/build/vaadin-checkbox-4e68df64-CQ39rvBH.js",revision:"2c9aea722883bc66bfa1299cc85fbae8"},{url:"VAADIN/build/vaadin-checkbox-group-a7c65bf2-BBhmvChD.js",revision:"f1ce8eb853f03847baf381ddca931f88"},{url:"VAADIN/build/vaadin-combo-box-96451ddd-BIYNGXtT.js",revision:"dad427df75a355877559297d11f2b3aa"},{url:"VAADIN/build/vaadin-confirm-dialog-4d718829-BJBoYmJ8.js",revision:"48159af0c8d3bdaa80d70abf9fa1bcaf"},{url:"VAADIN/build/vaadin-cookie-consent-46c09f8b-DQO_KNKw.js",revision:"934ecd855738666b2c4c9501f64e112d"},{url:"VAADIN/build/vaadin-crud-8d161a22-gMI1K1m2.js",revision:"735ef4da2bbf6b26b8a66a4357b77e0b"},{url:"VAADIN/build/vaadin-custom-field-42c85b9e-v8Uxs66o.js",revision:"0e6a579adbf7e1c7b1af0bceeecf2cc2"},{url:"VAADIN/build/vaadin-date-picker-f2001167-jbVrxcGx.js",revision:"93ef5c32baf3a5184137f42aeaf5704b"},{url:"VAADIN/build/vaadin-date-time-picker-c8c047a7-CrSW454v.js",revision:"e1bfcdbe4209bb1e4d8105c441491366"},{url:"VAADIN/build/vaadin-details-bf336660-DVefmR-p.js",revision:"ef2d7f85e8e760185eef251166d8d825"},{url:"VAADIN/build/vaadin-details-summary-351a1448-BHb_ZYFZ.js",revision:"1ec83a41a50d702254124ce222aca96f"},{url:"VAADIN/build/vaadin-dialog-53253a08-BQPEkdZH.js",revision:"be417ab3ab4c1245fecc8ea210c3fda1"},{url:"VAADIN/build/vaadin-email-field-d7a35f04-a82YzzTC.js",revision:"6de24b0c384afdf23b8cba72a4d9f3f3"},{url:"VAADIN/build/vaadin-form-layout-47744b1d-CnT-pL1v.js",revision:"db88d62ac686a1bceab3c06ef0d18a20"},{url:"VAADIN/build/vaadin-grid-0a4791c2-DRT6_-8W.js",revision:"4cc102212db557d937bc828e99ea88ba"},{url:"VAADIN/build/vaadin-grid-pro-ff415555-BuNsS3_9.js",revision:"84b27be47c75141947bf9b8db15b79fb"},{url:"VAADIN/build/vaadin-horizontal-layout-3193943f-DfGKYUz7.js",revision:"266fca34b9fff75f4548996056f8478d"},{url:"VAADIN/build/vaadin-icon-601f36ed-CQdBVVgq.js",revision:"7aec070dd0cd5af4ce7c36cf16df4f36"},{url:"VAADIN/build/vaadin-integer-field-85078932-C6uXnDIO.js",revision:"395fd2bbcca1023aef79c58dec5bbe63"},{url:"VAADIN/build/vaadin-list-box-d7a8433b-CeeMxomR.js",revision:"c74e686b729ec30d1ac91db101ef78e3"},{url:"VAADIN/build/vaadin-login-form-638996c6-CGo5QKbV.js",revision:"4e2c3deb86b0bf4243ec1eede40628c4"},{url:"VAADIN/build/vaadin-login-overlay-f8a5db8a-DkiLo3wq.js",revision:"146b15be44683fffac9e9cd108c428db"},{url:"VAADIN/build/vaadin-map-d40a0116-CLcCiVIP.js",revision:"734801d9ec783c51fdd17ba931cd65db"},{url:"VAADIN/build/vaadin-menu-bar-3f5ab096-CuD8NUqK.js",revision:"e11d9a361d0be278045fe7955309767d"},{url:"VAADIN/build/vaadin-message-input-996ac37c-DCaSSitl.js",revision:"6db22d12b8567704a9a746213e3487b7"},{url:"VAADIN/build/vaadin-message-list-70a435ba-BvL8jMqD.js",revision:"4d620de9b7ace0ad34090909c43db0da"},{url:"VAADIN/build/vaadin-multi-select-combo-box-a3373557-D31DlCEM.js",revision:"2261b5a00f0a5939428b9214cb15db48"},{url:"VAADIN/build/vaadin-notification-bd6eb776-zNGyI59M.js",revision:"416c31989c2138070c7c58a2e2c024d4"},{url:"VAADIN/build/vaadin-number-field-cb3ee8b2-COgh4fZJ.js",revision:"d43b1de0e32f17b4503408f15a6ed7ab"},{url:"VAADIN/build/vaadin-password-field-d289cb18-C2-4uG6a.js",revision:"9e70356ede5dcbc90eeb5e7466e57a54"},{url:"VAADIN/build/vaadin-progress-bar-309ecf1f-Di4wI_uD.js",revision:"2aed7971c3744cf918ad880a35a202d6"},{url:"VAADIN/build/vaadin-radio-group-88b5afd8-CvT3sPyD.js",revision:"7e749db5e0f5e39be9ab93d31675df28"},{url:"VAADIN/build/vaadin-rich-text-editor-8cd892f2-DKiOVej4.js",revision:"f6e471c84eb83731d0a726c671cc7444"},{url:"VAADIN/build/vaadin-scroller-35e68818-CL-CxMjG.js",revision:"7349777e9daf0f0c6596b7fb0c358fe4"},{url:"VAADIN/build/vaadin-select-df6e9947-ATMAmUMg.js",revision:"5dc98986192bd272a04424fccc2bd70f"},{url:"VAADIN/build/vaadin-side-nav-ba80d91d-eIGU4SgT.js",revision:"ececf8081b513adb779bd11120811f70"},{url:"VAADIN/build/vaadin-side-nav-item-34918f92-BE6SwgS5.js",revision:"9d82b395705a3a002dca389cd5291dbb"},{url:"VAADIN/build/vaadin-split-layout-80c92131-B0PYKwl8.js",revision:"ebcbae5b25236c3942f46e837174b516"},{url:"VAADIN/build/vaadin-spreadsheet-59d8c5ef-D75Bp1v_.js",revision:"78b459474fec1ffa8b64298e631699a7"},{url:"VAADIN/build/vaadin-tab-aaf32809-C3DeKfI8.js",revision:"c533311ea1ec1a9a352278372448c1c5"},{url:"VAADIN/build/vaadin-tabs-d9a5e24e-BxUlLVp6.js",revision:"8e12950a6f61daca2136e820cbed6efe"},{url:"VAADIN/build/vaadin-tabsheet-dd99ed9a-C0wp_pPn.js",revision:"87f6e4c2afe447f99d38ab7ccd711f53"},{url:"VAADIN/build/vaadin-text-area-83627ebc-CYU04-xc.js",revision:"4a83299bbf44ffb455ee89e40499a929"},{url:"VAADIN/build/vaadin-text-field-0b3db014-BYwoctPF.js",revision:"9ecdaf7817a084704ce84cf3399fd65e"},{url:"VAADIN/build/vaadin-time-picker-715ec415-CX4eiwgd.js",revision:"e42b5ff3e67832058f2372b2c6eb1da1"},{url:"VAADIN/build/vaadin-upload-d3c162ed-h4Zes7Cr.js",revision:"69f821462a898671c462b771fae3b202"},{url:"VAADIN/build/vaadin-vertical-layout-ad4174c4-DUl27bwf.js",revision:"9ff0f4c21c28ccedf83c93169e4d7879"},{url:"VAADIN/build/vaadin-virtual-list-96896203-6IbJgvpU.js",revision:"903046f7b6ff51993b9d9d16cf6330a0"}],be=A.findIndex(s=>s.url===".")>=0;var P;(P=self.additionalManifestEntries)!=null&&P.length&&A.push(...self.additionalManifestEntries.filter(s=>s.url!=="."||!be));const pe="offline-stub.html",ge=new URL(self.registration.scope);async function we(s){const e=await s.text();return new Response(e.replace(/<base\s+href=[^>]*>/,`<base href="${self.registration.scope}">`),s)}function me(s){return A.some(e=>L(e.url)===L(`${s}`))}let D=!1;function E(){return{async fetchDidFail(){D=!0},async fetchDidSucceed({response:s}){return D=!1,s}}}const ye=new fe({plugins:[E()]});new he({plugins:[E()]});x(new de(async s=>{async function e(){const a=await V(pe);return a?we(a):void 0}function t(){return s.url.pathname===ge.pathname?e():me(s.url)?V(s.request):e()}if(!self.navigator.onLine){const a=await t();if(a)return a}try{return await ye.handle(s)}catch(a){const i=await t();if(i)return i;throw a}}));le(A);self.addEventListener("message",s=>{var e;typeof s.data!="object"||!("method"in s.data)||s.data.method==="Vaadin.ServiceWorker.isConnectionLost"&&"id"in s.data&&((e=s.source)==null||e.postMessage({id:s.data.id,result:D},[]))});self.addEventListener("push",s=>{var t;const e=(t=s.data)==null?void 0:t.json();e&&self.registration.showNotification(e.title,{body:e.body})});self.addEventListener("notificationclick",s=>{s.notification.close(),s.waitUntil(ve())});async function ve(){const s=new URL("/",self.location.origin).href,t=(await self.clients.matchAll({type:"window"})).find(a=>a.url===s);return t?t.focus():self.clients.openWindow(s)}