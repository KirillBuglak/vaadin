//todo #This is the service for offline handling

try {
    self["workbox:core:7.0.0"] && _()
} catch {}
const M = (s,...e)=>{
    let t = s;
    return e.length > 0 && (t += ` :: ${JSON.stringify(e)}`),
    t
}
  , O = M;
class l extends Error {
    constructor(e, t) {
        const a = O(e, t);
        super(a),
        this.name = e,
        this.details = t
    }
}
const W = new Set
  , f = {
    googleAnalytics: "googleAnalytics",
    precache: "precache-v2",
    prefix: "workbox",
    runtime: "runtime",
    suffix: typeof registration < "u" ? registration.scope : ""
}
  , R = s=>[f.prefix, s, f.suffix].filter(e=>e && e.length > 0).join("-")
  , S = s=>{
    for (const e of Object.keys(f))
        s(e)
}
  , N = {
    updateDetails: s=>{
        S(e=>{
            typeof s[e] == "string" && (f[e] = s[e])
        }
        )
    }
    ,
    getGoogleAnalyticsName: s=>s || R(f.googleAnalytics),
    getPrecacheName: s=>s || R(f.precache),
    getPrefix: ()=>f.prefix,
    getRuntimeName: s=>s || R(f.runtime),
    getSuffix: ()=>f.suffix
};
function j(s, e) {
    const t = new URL(s);
    for (const a of e)
        t.searchParams.delete(a);
    return t.href
}
async function H(s, e, t, a) {
    const i = j(e.url, t);
    if (e.url === i)
        return s.match(e, a);
    const n = Object.assign(Object.assign({}, a), {
        ignoreSearch: !0
    })
      , r = await s.keys(e, n);
    for (const c of r) {
        const o = j(c.url, t);
        if (i === o)
            return s.match(c, a)
    }
}
let g;
function B() {
    if (g === void 0) {
        const s = new Response("");
        if ("body"in s)
            try {
                new Response(s.body),
                g = !0
            } catch {
                g = !1
            }
        g = !1
    }
    return g
}
class F {
    constructor() {
        this.promise = new Promise((e,t)=>{
            this.resolve = e,
            this.reject = t
        }
        )
    }
}
async function q() {
    for (const s of W)
        await s()
}
const z = s=>new URL(String(s),location.href).href.replace(new RegExp(`^${location.origin}`), "");
function T(s) {
    return new Promise(e=>setTimeout(e, s))
}
function U(s, e) {
    const t = e();
    return s.waitUntil(t),
    t
}
async function $(s, e) {
    let t = null;
    if (s.url && (t = new URL(s.url).origin),
    t !== self.location.origin)
        throw new l("cross-origin-copy-response",{
            origin: t
        });
    const a = s.clone()
      , n = {
        headers: new Headers(a.headers),
        status: a.status,
        statusText: a.statusText
    }
      , r = B() ? a.body : await a.blob();
    return new Response(r,n)
}
function Q() {
    self.addEventListener("activate", ()=>self.clients.claim())
}
try {
    self["workbox:precaching:7.0.0"] && _()
} catch {}
const G = "__WB_REVISION__";
function J(s) {
    if (!s)
        throw new l("add-to-cache-list-unexpected-type",{
            entry: s
        });
    if (typeof s == "string") {
        const n = new URL(s,location.href);
        return {
            cacheKey: n.href,
            url: n.href
        }
    }
    const {revision: e, url: t} = s;
    if (!t)
        throw new l("add-to-cache-list-unexpected-type",{
            entry: s
        });
    if (!e) {
        const n = new URL(t,location.href);
        return {
            cacheKey: n.href,
            url: n.href
        }
    }
    const a = new URL(t,location.href)
      , i = new URL(t,location.href);
    return a.searchParams.set(G, e),
    {
        cacheKey: a.href,
        url: i.href
    }
}
class Y {
    constructor() {
        this.updatedURLs = [],
        this.notUpdatedURLs = [],
        this.handlerWillStart = async({request: e, state: t})=>{
            t && (t.originalRequest = e)
        }
        ,
        this.cachedResponseWillBeUsed = async({event: e, state: t, cachedResponse: a})=>{
            if (e.type === "install" && t && t.originalRequest && t.originalRequest instanceof Request) {
                const i = t.originalRequest.url;
                a ? this.notUpdatedURLs.push(i) : this.updatedURLs.push(i)
            }
            return a
        }
    }
}
class Z {
    constructor({precacheController: e}) {
        this.cacheKeyWillBeUsed = async({request: t, params: a})=>{
            const i = (a == null ? void 0 : a.cacheKey) || this._precacheController.getCacheKeyForURL(t.url);
            return i ? new Request(i,{
                headers: t.headers
            }) : t
        }
        ,
        this._precacheController = e
    }
}
try {
    self["workbox:strategies:7.0.0"] && _()
} catch {}
function m(s) {
    return typeof s == "string" ? new Request(s) : s
}
class X {
    constructor(e, t) {
        this._cacheKeys = {},
        Object.assign(this, t),
        this.event = t.event,
        this._strategy = e,
        this._handlerDeferred = new F,
        this._extendLifetimePromises = [],
        this._plugins = [...e.plugins],
        this._pluginStateMap = new Map;
        for (const a of this._plugins)
            this._pluginStateMap.set(a, {});
        this.event.waitUntil(this._handlerDeferred.promise)
    }
    async fetch(e) {
        const {event: t} = this;
        let a = m(e);
        if (a.mode === "navigate" && t instanceof FetchEvent && t.preloadResponse) {
            const r = await t.preloadResponse;
            if (r)
                return r
        }
        const i = this.hasCallback("fetchDidFail") ? a.clone() : null;
        try {
            for (const r of this.iterateCallbacks("requestWillFetch"))
                a = await r({
                    request: a.clone(),
                    event: t
                })
        } catch (r) {
            if (r instanceof Error)
                throw new l("plugin-error-request-will-fetch",{
                    thrownErrorMessage: r.message
                })
        }
        const n = a.clone();
        try {
            let r;
            r = await fetch(a, a.mode === "navigate" ? void 0 : this._strategy.fetchOptions);
            for (const c of this.iterateCallbacks("fetchDidSucceed"))
                r = await c({
                    event: t,
                    request: n,
                    response: r
                });
            return r
        } catch (r) {
            throw i && await this.runCallbacks("fetchDidFail", {
                error: r,
                event: t,
                originalRequest: i.clone(),
                request: n.clone()
            }),
            r
        }
    }
    async fetchAndCachePut(e) {
        const t = await this.fetch(e)
          , a = t.clone();
        return this.waitUntil(this.cachePut(e, a)),
        t
    }
    async cacheMatch(e) {
        const t = m(e);
        let a;
        const {cacheName: i, matchOptions: n} = this._strategy
          , r = await this.getCacheKey(t, "read")
          , c = Object.assign(Object.assign({}, n), {
            cacheName: i
        });
        a = await caches.match(r, c);
        for (const o of this.iterateCallbacks("cachedResponseWillBeUsed"))
            a = await o({
                cacheName: i,
                matchOptions: n,
                cachedResponse: a,
                request: r,
                event: this.event
            }) || void 0;
        return a
    }
    async cachePut(e, t) {
        const a = m(e);
        await T(0);
        const i = await this.getCacheKey(a, "write");
        if (!t)
            throw new l("cache-put-with-no-response",{
                url: z(i.url)
            });
        const n = await this._ensureResponseSafeToCache(t);
        if (!n)
            return !1;
        const {cacheName: r, matchOptions: c} = this._strategy
          , o = await self.caches.open(r)
          , d = this.hasCallback("cacheDidUpdate")
          , p = d ? await H(o, i.clone(), ["__WB_REVISION__"], c) : null;
        try {
            await o.put(i, d ? n.clone() : n)
        } catch (u) {
            if (u instanceof Error)
                throw u.name === "QuotaExceededError" && await q(),
                u
        }
        for (const u of this.iterateCallbacks("cacheDidUpdate"))
            await u({
                cacheName: r,
                oldResponse: p,
                newResponse: n.clone(),
                request: i,
                event: this.event
            });
        return !0
    }
    async getCacheKey(e, t) {
        const a = `${e.url} | ${t}`;
        if (!this._cacheKeys[a]) {
            let i = e;
            for (const n of this.iterateCallbacks("cacheKeyWillBeUsed"))
                i = m(await n({
                    mode: t,
                    request: i,
                    event: this.event,
                    params: this.params
                }));
            this._cacheKeys[a] = i
        }
        return this._cacheKeys[a]
    }
    hasCallback(e) {
        for (const t of this._strategy.plugins)
            if (e in t)
                return !0;
        return !1
    }
    async runCallbacks(e, t) {
        for (const a of this.iterateCallbacks(e))
            await a(t)
    }
    *iterateCallbacks(e) {
        for (const t of this._strategy.plugins)
            if (typeof t[e] == "function") {
                const a = this._pluginStateMap.get(t);
                yield n=>{
                    const r = Object.assign(Object.assign({}, n), {
                        state: a
                    });
                    return t[e](r)
                }
            }
    }
    waitUntil(e) {
        return this._extendLifetimePromises.push(e),
        e
    }
    async doneWaiting() {
        let e;
        for (; e = this._extendLifetimePromises.shift(); )
            await e
    }
    destroy() {
        this._handlerDeferred.resolve(null)
    }
    async _ensureResponseSafeToCache(e) {
        let t = e
          , a = !1;
        for (const i of this.iterateCallbacks("cacheWillUpdate"))
            if (t = await i({
                request: this.request,
                response: t,
                event: this.event
            }) || void 0,
            a = !0,
            !t)
                break;
        return a || t && t.status !== 200 && (t = void 0),
        t
    }
}
class k {
    constructor(e={}) {
        this.cacheName = N.getRuntimeName(e.cacheName),
        this.plugins = e.plugins || [],
        this.fetchOptions = e.fetchOptions,
        this.matchOptions = e.matchOptions
    }
    handle(e) {
        const [t] = this.handleAll(e);
        return t
    }
    handleAll(e) {
        e instanceof FetchEvent && (e = {
            event: e,
            request: e.request
        });
        const t = e.event
          , a = typeof e.request == "string" ? new Request(e.request) : e.request
          , i = "params"in e ? e.params : void 0
          , n = new X(this,{
            event: t,
            request: a,
            params: i
        })
          , r = this._getResponse(n, a, t)
          , c = this._awaitComplete(r, n, a, t);
        return [r, c]
    }
    async _getResponse(e, t, a) {
        await e.runCallbacks("handlerWillStart", {
            event: a,
            request: t
        });
        let i;
        try {
            if (i = await this._handle(t, e),
            !i || i.type === "error")
                throw new l("no-response",{
                    url: t.url
                })
        } catch (n) {
            if (n instanceof Error) {
                for (const r of e.iterateCallbacks("handlerDidError"))
                    if (i = await r({
                        error: n,
                        event: a,
                        request: t
                    }),
                    i)
                        break
            }
            if (!i)
                throw n
        }
        for (const n of e.iterateCallbacks("handlerWillRespond"))
            i = await n({
                event: a,
                request: t,
                response: i
            });
        return i
    }
    async _awaitComplete(e, t, a, i) {
        let n, r;
        try {
            n = await e
        } catch {}
        try {
            await t.runCallbacks("handlerDidRespond", {
                event: i,
                request: a,
                response: n
            }),
            await t.doneWaiting()
        } catch (c) {
            c instanceof Error && (r = c)
        }
        if (await t.runCallbacks("handlerDidComplete", {
            event: i,
            request: a,
            response: n,
            error: r
        }),
        t.destroy(),
        r)
            throw r
    }
}
class h extends k {
    constructor(e={}) {
        e.cacheName = N.getPrecacheName(e.cacheName),
        super(e),
        this._fallbackToNetwork = e.fallbackToNetwork !== !1,
        this.plugins.push(h.copyRedirectedCacheableResponsesPlugin)
    }
    async _handle(e, t) {
        const a = await t.cacheMatch(e);
        return a || (t.event && t.event.type === "install" ? await this._handleInstall(e, t) : await this._handleFetch(e, t))
    }
    async _handleFetch(e, t) {
        let a;
        const i = t.params || {};
        if (this._fallbackToNetwork) {
            const n = i.integrity
              , r = e.integrity
              , c = !r || r === n;
            a = await t.fetch(new Request(e,{
                integrity: e.mode !== "no-cors" ? r || n : void 0
            })),
            n && c && e.mode !== "no-cors" && (this._useDefaultCacheabilityPluginIfNeeded(),
            await t.cachePut(e, a.clone()))
        } else
            throw new l("missing-precache-entry",{
                cacheName: this.cacheName,
                url: e.url
            });
        return a
    }
    async _handleInstall(e, t) {
        this._useDefaultCacheabilityPluginIfNeeded();
        const a = await t.fetch(e);
        if (!await t.cachePut(e, a.clone()))
            throw new l("bad-precaching-response",{
                url: e.url,
                status: a.status
            });
        return a
    }
    _useDefaultCacheabilityPluginIfNeeded() {
        let e = null
          , t = 0;
        for (const [a,i] of this.plugins.entries())
            i !== h.copyRedirectedCacheableResponsesPlugin && (i === h.defaultPrecacheCacheabilityPlugin && (e = a),
            i.cacheWillUpdate && t++);
        t === 0 ? this.plugins.push(h.defaultPrecacheCacheabilityPlugin) : t > 1 && e !== null && this.plugins.splice(e, 1)
    }
}
h.defaultPrecacheCacheabilityPlugin = {
    async cacheWillUpdate({response: s}) {
        return !s || s.status >= 400 ? null : s
    }
};
h.copyRedirectedCacheableResponsesPlugin = {
    async cacheWillUpdate({response: s}) {
        return s.redirected ? await $(s) : s
    }
};
class ee {
    constructor({cacheName: e, plugins: t=[], fallbackToNetwork: a=!0}={}) {
        this._urlsToCacheKeys = new Map,
        this._urlsToCacheModes = new Map,
        this._cacheKeysToIntegrities = new Map,
        this._strategy = new h({
            cacheName: N.getPrecacheName(e),
            plugins: [...t, new Z({
                precacheController: this
            })],
            fallbackToNetwork: a
        }),
        this.install = this.install.bind(this),
        this.activate = this.activate.bind(this)
    }
    get strategy() {
        return this._strategy
    }
    precache(e) {
        this.addToCacheList(e),
        this._installAndActiveListenersAdded || (self.addEventListener("install", this.install),
        self.addEventListener("activate", this.activate),
        this._installAndActiveListenersAdded = !0)
    }
    addToCacheList(e) {
        const t = [];
        for (const a of e) {
            typeof a == "string" ? t.push(a) : a && a.revision === void 0 && t.push(a.url);
            const {cacheKey: i, url: n} = J(a)
              , r = typeof a != "string" && a.revision ? "reload" : "default";
            if (this._urlsToCacheKeys.has(n) && this._urlsToCacheKeys.get(n) !== i)
                throw new l("add-to-cache-list-conflicting-entries",{
                    firstEntry: this._urlsToCacheKeys.get(n),
                    secondEntry: i
                });
            if (typeof a != "string" && a.integrity) {
                if (this._cacheKeysToIntegrities.has(i) && this._cacheKeysToIntegrities.get(i) !== a.integrity)
                    throw new l("add-to-cache-list-conflicting-integrities",{
                        url: n
                    });
                this._cacheKeysToIntegrities.set(i, a.integrity)
            }
            if (this._urlsToCacheKeys.set(n, i),
            this._urlsToCacheModes.set(n, r),
            t.length > 0) {
                const c = `Workbox is precaching URLs without revision info: ${t.join(", ")}
This is generally NOT safe. Learn more at https://bit.ly/wb-precache`;
                console.warn(c)
            }
        }
    }
    install(e) {
        return U(e, async()=>{
            const t = new Y;
            this.strategy.plugins.push(t);
            for (const [n,r] of this._urlsToCacheKeys) {
                const c = this._cacheKeysToIntegrities.get(r)
                  , o = this._urlsToCacheModes.get(n)
                  , d = new Request(n,{
                    integrity: c,
                    cache: o,
                    credentials: "same-origin"
                });
                await Promise.all(this.strategy.handleAll({
                    params: {
                        cacheKey: r
                    },
                    request: d,
                    event: e
                }))
            }
            const {updatedURLs: a, notUpdatedURLs: i} = t;
            return {
                updatedURLs: a,
                notUpdatedURLs: i
            }
        }
        )
    }
    activate(e) {
        return U(e, async()=>{
            const t = await self.caches.open(this.strategy.cacheName)
              , a = await t.keys()
              , i = new Set(this._urlsToCacheKeys.values())
              , n = [];
            for (const r of a)
                i.has(r.url) || (await t.delete(r),
                n.push(r.url));
            return {
                deletedURLs: n
            }
        }
        )
    }
    getURLsToCacheKeys() {
        return this._urlsToCacheKeys
    }
    getCachedURLs() {
        return [...this._urlsToCacheKeys.keys()]
    }
    getCacheKeyForURL(e) {
        const t = new URL(e,location.href);
        return this._urlsToCacheKeys.get(t.href)
    }
    getIntegrityForCacheKey(e) {
        return this._cacheKeysToIntegrities.get(e)
    }
    async matchPrecache(e) {
        const t = e instanceof Request ? e.url : e
          , a = this.getCacheKeyForURL(t);
        if (a)
            return (await self.caches.open(this.strategy.cacheName)).match(a)
    }
    createHandlerBoundToURL(e) {
        const t = this.getCacheKeyForURL(e);
        if (!t)
            throw new l("non-precached-url",{
                url: e
            });
        return a=>(a.request = new Request(e),
        a.params = Object.assign({
            cacheKey: t
        }, a.params),
        this.strategy.handle(a))
    }
}
let C;
const v = ()=>(C || (C = new ee),
C);
try {
    self["workbox:routing:7.0.0"] && _()
} catch {}
const x = "GET"
  , y = s=>s && typeof s == "object" ? s : {
    handle: s
};
class b {
    constructor(e, t, a=x) {
        this.handler = y(t),
        this.match = e,
        this.method = a
    }
    setCatchHandler(e) {
        this.catchHandler = y(e)
    }
}
class te extends b {
    constructor(e, t, a) {
        const i = ({url: n})=>{
            const r = e.exec(n.href);
            if (r && !(n.origin !== location.origin && r.index !== 0))
                return r.slice(1)
        }
        ;
        super(i, t, a)
    }
}
class ae {
    constructor() {
        this._routes = new Map,
        this._defaultHandlerMap = new Map
    }
    get routes() {
        return this._routes
    }
    addFetchListener() {
        self.addEventListener("fetch", e=>{
            const {request: t} = e
              , a = this.handleRequest({
                request: t,
                event: e
            });
            a && e.respondWith(a)
        }
        )
    }
    addCacheListener() {
        self.addEventListener("message", e=>{
            if (e.data && e.data.type === "CACHE_URLS") {
                const {payload: t} = e.data
                  , a = Promise.all(t.urlsToCache.map(i=>{
                    typeof i == "string" && (i = [i]);
                    const n = new Request(...i);
                    return this.handleRequest({
                        request: n,
                        event: e
                    })
                }
                ));
                e.waitUntil(a),
                e.ports && e.ports[0] && a.then(()=>e.ports[0].postMessage(!0))
            }
        }
        )
    }
    handleRequest({request: e, event: t}) {
        const a = new URL(e.url,location.href);
        if (!a.protocol.startsWith("http"))
            return;
        const i = a.origin === location.origin
          , {params: n, route: r} = this.findMatchingRoute({
            event: t,
            request: e,
            sameOrigin: i,
            url: a
        });
        let c = r && r.handler;
        const o = e.method;
        if (!c && this._defaultHandlerMap.has(o) && (c = this._defaultHandlerMap.get(o)),
        !c)
            return;
        let d;
        try {
            d = c.handle({
                url: a,
                request: e,
                event: t,
                params: n
            })
        } catch (u) {
            d = Promise.reject(u)
        }
        const p = r && r.catchHandler;
        return d instanceof Promise && (this._catchHandler || p) && (d = d.catch(async u=>{
            if (p)
                try {
                    return await p.handle({
                        url: a,
                        request: e,
                        event: t,
                        params: n
                    })
                } catch (I) {
                    I instanceof Error && (u = I)
                }
            if (this._catchHandler)
                return this._catchHandler.handle({
                    url: a,
                    request: e,
                    event: t
                });
            throw u
        }
        )),
        d
    }
    findMatchingRoute({url: e, sameOrigin: t, request: a, event: i}) {
        const n = this._routes.get(a.method) || [];
        for (const r of n) {
            let c;
            const o = r.match({
                url: e,
                sameOrigin: t,
                request: a,
                event: i
            });
            if (o)
                return c = o,
                (Array.isArray(c) && c.length === 0 || o.constructor === Object && Object.keys(o).length === 0 || typeof o == "boolean") && (c = void 0),
                {
                    route: r,
                    params: c
                }
        }
        return {}
    }
    setDefaultHandler(e, t=x) {
        this._defaultHandlerMap.set(t, y(e))
    }
    setCatchHandler(e) {
        this._catchHandler = y(e)
    }
    registerRoute(e) {
        this._routes.has(e.method) || this._routes.set(e.method, []),
        this._routes.get(e.method).push(e)
    }
    unregisterRoute(e) {
        if (!this._routes.has(e.method))
            throw new l("unregister-route-but-not-found-with-method",{
                method: e.method
            });
        const t = this._routes.get(e.method).indexOf(e);
        if (t > -1)
            this._routes.get(e.method).splice(t, 1);
        else
            throw new l("unregister-route-route-not-registered")
    }
}
let w;
const se = ()=>(w || (w = new ae,
w.addFetchListener(),
w.addCacheListener()),
w);
function K(s, e, t) {
    let a;
    if (typeof s == "string") {
        const n = new URL(s,location.href)
          , r = ({url: c})=>c.href === n.href;
        a = new b(r,e,t)
    } else if (s instanceof RegExp)
        a = new te(s,e,t);
    else if (typeof s == "function")
        a = new b(s,e,t);
    else if (s instanceof b)
        a = s;
    else
        throw new l("unsupported-route-type",{
            moduleName: "workbox-routing",
            funcName: "registerRoute",
            paramName: "capture"
        });
    return se().registerRoute(a),
    a
}
function ie(s, e=[]) {
    for (const t of [...s.searchParams.keys()])
        e.some(a=>a.test(t)) && s.searchParams.delete(t);
    return s
}
function *ne(s, {ignoreURLParametersMatching: e=[/^utm_/, /^fbclid$/], directoryIndex: t="index.html", cleanURLs: a=!0, urlManipulation: i}={}) {
    const n = new URL(s,location.href);
    n.hash = "",
    yield n.href;
    const r = ie(n, e);
    if (yield r.href,
    t && r.pathname.endsWith("/")) {
        const c = new URL(r.href);
        c.pathname += t,
        yield c.href
    }
    if (a) {
        const c = new URL(r.href);
        c.pathname += ".html",
        yield c.href
    }
    if (i) {
        const c = i({
            url: n
        });
        for (const o of c)
            yield o.href
    }
}
class re extends b {
    constructor(e, t) {
        const a = ({request: i})=>{
            const n = e.getURLsToCacheKeys();
            for (const r of ne(i.url, t)) {
                const c = n.get(r);
                if (c) {
                    const o = e.getIntegrityForCacheKey(c);
                    return {
                        cacheKey: c,
                        integrity: o
                    }
                }
            }
        }
        ;
        super(a, e.strategy)
    }
}
function ce(s) {
    const e = v()
      , t = new re(e,s);
    K(t)
}
function L(s) {
    return v().getCacheKeyForURL(s)
}
function V(s) {
    return v().matchPrecache(s)
}
function oe(s) {
    v().precache(s)
}
function le(s, e) {
    oe(s),
    ce(e)
}
class de extends b {
    constructor(e, {allowlist: t=[/./], denylist: a=[]}={}) {
        super(i=>this._match(i), e),
        this._allowlist = t,
        this._denylist = a
    }
    _match({url: e, request: t}) {
        if (t && t.mode !== "navigate")
            return !1;
        const a = e.pathname + e.search;
        for (const i of this._denylist)
            if (i.test(a))
                return !1;
        return !!this._allowlist.some(i=>i.test(a))
    }
}
const ue = {
    cacheWillUpdate: async({response: s})=>s.status === 200 || s.status === 0 ? s : null
};
class fe extends k {
    constructor(e={}) {
        super(e),
        this.plugins.some(t=>"cacheWillUpdate"in t) || this.plugins.unshift(ue),
        this._networkTimeoutSeconds = e.networkTimeoutSeconds || 0
    }
    async _handle(e, t) {
        const a = []
          , i = [];
        let n;
        if (this._networkTimeoutSeconds) {
            const {id: o, promise: d} = this._getTimeoutPromise({
                request: e,
                logs: a,
                handler: t
            });
            n = o,
            i.push(d)
        }
        const r = this._getNetworkPromise({
            timeoutId: n,
            request: e,
            logs: a,
            handler: t
        });
        i.push(r);
        const c = await t.waitUntil((async()=>await t.waitUntil(Promise.race(i)) || await r)());
        if (!c)
            throw new l("no-response",{
                url: e.url
            });
        return c
    }
    _getTimeoutPromise({request: e, logs: t, handler: a}) {
        let i;
        return {
            promise: new Promise(r=>{
                i = setTimeout(async()=>{
                    r(await a.cacheMatch(e))
                }
                , this._networkTimeoutSeconds * 1e3)
            }
            ),
            id: i
        }
    }
    async _getNetworkPromise({timeoutId: e, request: t, logs: a, handler: i}) {
        let n, r;
        try {
            r = await i.fetchAndCachePut(t)
        } catch (c) {
            c instanceof Error && (n = c)
        }
        return e && clearTimeout(e),
        (n || !r) && (r = await i.cacheMatch(t)),
        r
    }
}
class he extends k {
    constructor(e={}) {
        super(e),
        this._networkTimeoutSeconds = e.networkTimeoutSeconds || 0
    }
    async _handle(e, t) {
        let a, i;
        try {
            const n = [t.fetch(e)];
            if (this._networkTimeoutSeconds) {
                const r = T(this._networkTimeoutSeconds * 1e3);
                n.push(r)
            }
            if (i = await Promise.race(n),
            !i)
                throw new Error(`Timed out the network response after ${this._networkTimeoutSeconds} seconds.`)
        } catch (n) {
            n instanceof Error && (a = n)
        }
        if (!i)
            throw new l("no-response",{
                url: e.url,
                error: a
            });
        return i
    }
}
importScripts("sw-runtime-resources-precache.js");
self.skipWaiting();
Q();
let A = [{
    url: ".",
    revision: "90d2124c1756a749abba4be47e3d0f81"
}, {
    url: "VAADIN/build/FlowBootstrap-CHUuW4WK.js",
    revision: "86c7b60228bd60b898bd22f12bb25dd6"
}, {
    url: "VAADIN/build/FlowClient-BZ2ixoyw.js",
    revision: "0edf40db2b012272c780faeab1a30432"
}, {
    url: "VAADIN/build/generated-flow-imports-BPkgl0wl.js",
    revision: "f65ef5201aac997ce19dd2a5354e4744"
}, {
    url: "VAADIN/build/indexhtml-D246mmY6.js",
    revision: "c000e7f2363472c55c35ffc2238cde2f"
}, {
    url: "VAADIN/build/vaadin-accordion-eed3b794-DbiMcAlL.js",
    revision: "be7be27156697655641c95349ef76495"
}, {
    url: "VAADIN/build/vaadin-accordion-heading-c0acdd6d-vcUeGZmd.js",
    revision: "6366e3d210472def9838aa5e23746bfa"
}, {
    url: "VAADIN/build/vaadin-accordion-panel-616e55d6-fIN2bLEf.js",
    revision: "c181cd83452978e56e7b1bb89fe06436"
}, {
    url: "VAADIN/build/vaadin-app-layout-e56de2e9-BeVhAVhq.js",
    revision: "e45d97e2c0ee4b2ad5aed71ea89a9491"
}, {
    url: "VAADIN/build/vaadin-avatar-7599297d-6HzlZjiV.js",
    revision: "fc8056682ceed89d7f1226442137f350"
}, {
    url: "VAADIN/build/vaadin-big-decimal-field-e51def24-1w4sdrS1.js",
    revision: "0b4b3f98683705bdd1ecfb1d18271f7c"
}, {
    url: "VAADIN/build/vaadin-board-828ebdea-B90ASUG2.js",
    revision: "4ce959215af1d25a899167ddc7d5bf33"
}, {
    url: "VAADIN/build/vaadin-board-row-c70d0c55-DmY0Z9ND.js",
    revision: "629d677932f97b78e5b0078d355631c4"
}, {
    url: "VAADIN/build/vaadin-button-2511ad84-tSwQmcMQ.js",
    revision: "fd50a211ec7f44dba627fe6799bda12a"
}, {
    url: "VAADIN/build/vaadin-chart-5192dc15-DDuu9RpN.js",
    revision: "e8de71b200898de16e0a483a1e8e6546"
}, {
    url: "VAADIN/build/vaadin-checkbox-4e68df64-8BGksEAk.js",
    revision: "4511628c8eef5bf7a0381f0f5206fe19"
}, {
    url: "VAADIN/build/vaadin-checkbox-group-a7c65bf2-CDsJAbLC.js",
    revision: "28cac617e783c4c954bd9b71ee8659c2"
}, {
    url: "VAADIN/build/vaadin-combo-box-96451ddd-B72pkMk0.js",
    revision: "6797c7c9581f1125b5da47666818e041"
}, {
    url: "VAADIN/build/vaadin-confirm-dialog-4d718829-BExRvL3g.js",
    revision: "4d84b61568fb0820582cea2c3f748843"
}, {
    url: "VAADIN/build/vaadin-cookie-consent-46c09f8b-IURI5KQ6.js",
    revision: "f7429e92fb6f6807398ec8b108a15f7c"
}, {
    url: "VAADIN/build/vaadin-crud-8d161a22-DC8QWWlH.js",
    revision: "5483efa95679b00a8c0d4917f731aec0"
}, {
    url: "VAADIN/build/vaadin-custom-field-42c85b9e-Csyt_cMe.js",
    revision: "e4a207ca8e364a5e91081bda71d851cc"
}, {
    url: "VAADIN/build/vaadin-date-picker-f2001167-CL-UE9mu.js",
    revision: "92533ebcc08761645a54460087244f48"
}, {
    url: "VAADIN/build/vaadin-date-time-picker-c8c047a7-DPRjkSok.js",
    revision: "25e3c93016efa65b573f737d1d0a395b"
}, {
    url: "VAADIN/build/vaadin-details-bf336660-BbdKeD_D.js",
    revision: "b80336b3637bf525a71c82650858f99f"
}, {
    url: "VAADIN/build/vaadin-details-summary-351a1448-D0SsY-OQ.js",
    revision: "9c57748c2d9b43e9a6591ffcd9a7322f"
}, {
    url: "VAADIN/build/vaadin-dialog-53253a08-CNHx9Wel.js",
    revision: "5fa1681291969b3cf248f04d9a8992e0"
}, {
    url: "VAADIN/build/vaadin-email-field-d7a35f04-BhFgVLip.js",
    revision: "3a80eda5ba3697ce0c0b88de85b177d9"
}, {
    url: "VAADIN/build/vaadin-form-layout-47744b1d-DwfVWDDj.js",
    revision: "f668156a9f3d350e876c383621bd4b54"
}, {
    url: "VAADIN/build/vaadin-grid-0a4791c2-vmLyfhwd.js",
    revision: "47f26d1457845fc19e8ac5aad0e2a335"
}, {
    url: "VAADIN/build/vaadin-grid-pro-ff415555-Dxo6UauA.js",
    revision: "2f71a2522994153f3fa4f7a5cf6b4077"
}, {
    url: "VAADIN/build/vaadin-horizontal-layout-3193943f-DTP665OW.js",
    revision: "c37f8a6ec78fec61f4851273e8d1692c"
}, {
    url: "VAADIN/build/vaadin-icon-601f36ed-DT8pOmU6.js",
    revision: "c89ce8c12b5e96f191ed9c0bca70d20c"
}, {
    url: "VAADIN/build/vaadin-integer-field-85078932-BR5NzMIA.js",
    revision: "91c0013ff8bf59256c8798976d1ff222"
}, {
    url: "VAADIN/build/vaadin-list-box-d7a8433b-B550TMcT.js",
    revision: "945e0f4b4e07fa4ebd63c9d5c3776470"
}, {
    url: "VAADIN/build/vaadin-login-form-638996c6-kY2uxvfU.js",
    revision: "df2cedb3b17de9f8c20b102cf2de53b6"
}, {
    url: "VAADIN/build/vaadin-login-overlay-f8a5db8a-B5B4MJWt.js",
    revision: "08acc00c9b82b77e3b9f9ccc4f3100bd"
}, {
    url: "VAADIN/build/vaadin-map-d40a0116-g5_CHnZn.js",
    revision: "97b20303f1a649e036eb39c238fdc2d1"
}, {
    url: "VAADIN/build/vaadin-menu-bar-3f5ab096-HOzgL0Wb.js",
    revision: "1a914f9a6ccf05728c7cbe74a2a59d1f"
}, {
    url: "VAADIN/build/vaadin-message-input-996ac37c-VhjD2Njb.js",
    revision: "75647a717bb27374c0182e8885371417"
}, {
    url: "VAADIN/build/vaadin-message-list-70a435ba-VkRzigKh.js",
    revision: "7485b542e95708e33f97884d0d43653d"
}, {
    url: "VAADIN/build/vaadin-multi-select-combo-box-a3373557-D7NRwfsc.js",
    revision: "b44e46398288dedbdaa0edd06212c769"
}, {
    url: "VAADIN/build/vaadin-notification-bd6eb776-Be2lkVHs.js",
    revision: "24694b3f8b4474e0fd400b0c8fa1c9d4"
}, {
    url: "VAADIN/build/vaadin-number-field-cb3ee8b2-C6C78ctA.js",
    revision: "581aaa8ae374b386bd7413d0ae44d12d"
}, {
    url: "VAADIN/build/vaadin-password-field-d289cb18-Dhfk-n8H.js",
    revision: "ab6a17e856525291240cdbc0c9b3fbf6"
}, {
    url: "VAADIN/build/vaadin-progress-bar-309ecf1f-lMjm1e-O.js",
    revision: "88ce47341cdc03edd2a00f17b7a7f0df"
}, {
    url: "VAADIN/build/vaadin-radio-group-88b5afd8-DlUWeV-g.js",
    revision: "da6afe1cc94e3c0226031c885889caf6"
}, {
    url: "VAADIN/build/vaadin-rich-text-editor-8cd892f2-CrLSi0AV.js",
    revision: "0ce2c540800ebd259f499a80f48ff3a6"
}, {
    url: "VAADIN/build/vaadin-scroller-35e68818-DuZJdR4v.js",
    revision: "a4c971d50b0a676eb09da85f25231eaf"
}, {
    url: "VAADIN/build/vaadin-select-df6e9947-BbHwgGd8.js",
    revision: "9b7c7756b5909ce56c34e61c49c0969c"
}, {
    url: "VAADIN/build/vaadin-side-nav-ba80d91d-DYa99SQL.js",
    revision: "8ba6207deef75e2ee033301aacc352b4"
}, {
    url: "VAADIN/build/vaadin-side-nav-item-34918f92-M2LB33eO.js",
    revision: "35727a622b6bfc78e5380fae01c062bf"
}, {
    url: "VAADIN/build/vaadin-split-layout-80c92131-C1_ciVdD.js",
    revision: "9f1083fa3895ed020dd58a5a6e8cfcb0"
}, {
    url: "VAADIN/build/vaadin-spreadsheet-59d8c5ef-CCcDaNAz.js",
    revision: "f6a9b3de6a4dc53723fb23fe48e0e5db"
}, {
    url: "VAADIN/build/vaadin-tab-aaf32809-Bpkixaa4.js",
    revision: "daff1c76afb2164c0a4b074aa3685596"
}, {
    url: "VAADIN/build/vaadin-tabs-d9a5e24e-T0ygg5bM.js",
    revision: "9bded5e441a4b1dadaaf545a054b54e5"
}, {
    url: "VAADIN/build/vaadin-tabsheet-dd99ed9a-DOqePtzS.js",
    revision: "c0e58da5fe81cc1a63ae659edcd31942"
}, {
    url: "VAADIN/build/vaadin-text-area-83627ebc-Dyg3ziV2.js",
    revision: "1b30e5a6e9237ee2b89c80c676db6862"
}, {
    url: "VAADIN/build/vaadin-text-field-0b3db014-DB_JT4VS.js",
    revision: "241508c08f05c549e8ce9ed21eb348a4"
}, {
    url: "VAADIN/build/vaadin-time-picker-715ec415-DUoFSImp.js",
    revision: "d956835c6637cb3b4f08a2038b2708e6"
}, {
    url: "VAADIN/build/vaadin-upload-d3c162ed-B1yu4NWW.js",
    revision: "c8baee897cab8dcecff72ebfc16a4fdc"
}, {
    url: "VAADIN/build/vaadin-vertical-layout-ad4174c4-UHJ5qgF7.js",
    revision: "0a595a564205bd9e36f2a1f067a73ff1"
}, {
    url: "VAADIN/build/vaadin-virtual-list-96896203-DloYjVD-.js",
    revision: "8e81d63701bb159b0cb24c6ce042c2a6"
}]
  , be = A.findIndex(s=>s.url === ".") >= 0;
var P;
(P = self.additionalManifestEntries) != null && P.length && A.push(...self.additionalManifestEntries.filter(s=>s.url !== "." || !be));
const pe = "."
  , ge = new URL(self.registration.scope);
async function we(s) {
    const e = await s.text();
    return new Response(e.replace(/<base\s+href=[^>]*>/, `<base href="${self.registration.scope}">`),s)
}
function me(s) {
    return A.some(e=>L(e.url) === L(`${s}`))
}
let D = !1;
function E() {
    return {
        async fetchDidFail() {
            D = !0
        },
        async fetchDidSucceed({response: s}) {
            return D = !1,
            s
        }
    }
}
const ye = new he({
    plugins: [E()]
});
new fe({
    plugins: [E()]
});
K(new de(async s=>{
    async function e() {
        const a = await V(pe);
        return a ? we(a) : void 0
    }
    function t() {
        return s.url.pathname === ge.pathname ? e() : me(s.url) ? V(s.request) : e()
    }
    if (!self.navigator.onLine) {
        const a = await t();
        if (a)
            return a
    }
    try {
        return await ye.handle(s)
    } catch (a) {
        const i = await t();
        if (i)
            return i;
        throw a
    }
}
));
le(A);
self.addEventListener("message", s=>{
    var e;
    typeof s.data != "object" || !("method"in s.data) || s.data.method === "Vaadin.ServiceWorker.isConnectionLost" && "id"in s.data && ((e = s.source) == null || e.postMessage({
        id: s.data.id,
        result: D
    }, []))
}
);
self.addEventListener("push", s=>{
    var t;
    const e = (t = s.data) == null ? void 0 : t.json();
    e && self.registration.showNotification(e.title, {
        body: e.body
    })
}
);
self.addEventListener("notificationclick", s=>{
    s.notification.close(),
    s.waitUntil(ve())
}
);
async function ve() {
    const s = new URL("/",self.location.origin).href
      , t = (await self.clients.matchAll({
        type: "window"
    })).find(a=>a.url === s);
    return t ? t.focus() : self.clients.openWindow(s)
}
