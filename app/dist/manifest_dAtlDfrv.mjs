import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import { p as NOOP_MIDDLEWARE_HEADER, q as decodeKey } from './chunks/astro/server_DPWbZoSU.mjs';
import 'clsx';
import 'cookie';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/robertovicario/Documents/Projects/robertovicario.github.io/app/","cacheDir":"file:///Users/robertovicario/Documents/Projects/robertovicario.github.io/app/node_modules/.astro/","outDir":"file:///Users/robertovicario/Documents/Projects/robertovicario.github.io/app/dist/","srcDir":"file:///Users/robertovicario/Documents/Projects/robertovicario.github.io/app/src/","publicDir":"file:///Users/robertovicario/Documents/Projects/robertovicario.github.io/app/public/","buildClientDir":"file:///Users/robertovicario/Documents/Projects/robertovicario.github.io/app/dist/client/","buildServerDir":"file:///Users/robertovicario/Documents/Projects/robertovicario.github.io/app/dist/server/","adapterName":"","routes":[{"file":"file:///Users/robertovicario/Documents/Projects/robertovicario.github.io/app/dist/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/robertovicario/Documents/Projects/robertovicario.github.io/app/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-manifest":"manifest_dAtlDfrv.mjs","/Users/robertovicario/Documents/Projects/robertovicario.github.io/app/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_DnWN4fn9.mjs","/Users/robertovicario/Documents/Projects/robertovicario.github.io/app/src/react/SkillsList.tsx":"_astro/SkillsList.gEEQi-AK.js","/Users/robertovicario/Documents/Projects/robertovicario.github.io/app/src/react/LetterGlitch.tsx":"_astro/LetterGlitch.CFjSPS8y.js","@astrojs/react/client.js":"_astro/client.Dgl87wPk.js","/Users/robertovicario/Documents/Projects/robertovicario.github.io/app/src/includes/navbar.astro?astro&type=script&index=0&lang.ts":"_astro/navbar.astro_astro_type_script_index_0_lang.Djob3Eu8.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/robertovicario/Documents/Projects/robertovicario.github.io/app/src/includes/navbar.astro?astro&type=script&index=0&lang.ts","const c=document.getElementById(\"main-nav\"),h=1e3;let a=null;function m(){if(window.scrollY>0){c?.classList.add(\"scrolling\");const s=Math.min(window.scrollY/h,1),e=1-Math.pow(1-s,4),t=528,n=window.innerWidth*.8,o=n-(n-t)*e;window.innerWidth>=768&&c?.style.setProperty(\"width\",`${o}px`)}else c?.classList.remove(\"scrolling\"),c?.style.setProperty(\"width\",\"80%\");a=null}window.addEventListener(\"scroll\",()=>{a||(a=requestAnimationFrame(m))},{passive:!0});document.querySelectorAll('a[href^=\"#\"]').forEach(s=>{s.addEventListener(\"click\",function(e){e.preventDefault();const t=e.currentTarget,n=t.getAttribute(\"href\")?.substring(1)||\"\",o=document.getElementById(n);document.querySelectorAll(\"nav a\").forEach(r=>r.classList.remove(\"active\")),t.classList.add(\"active\"),o&&o.scrollIntoView({behavior:\"smooth\"})})});document.addEventListener(\"DOMContentLoaded\",()=>{const s=document.querySelectorAll(\"section[id]\"),e=document.querySelectorAll(\"nav a[href^='#']\"),t={threshold:.6},n=i=>{i.forEach(l=>{if(l.isIntersecting){e.forEach(v=>v.classList.remove(\"active\"));const u=l.target.getAttribute(\"id\"),d=document.querySelector(`nav a[href=\"#${u}\"]`);d&&d.classList.add(\"active\")}})},o=new IntersectionObserver(n,t);s.forEach(i=>o.observe(i));const r=document.querySelector('nav a[href=\"#home\"]');r&&r.classList.add(\"active\")});"]],"assets":["/file:///Users/robertovicario/Documents/Projects/robertovicario.github.io/app/dist/index.html"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"cbIrnJUEjqyilKcJorgyIlSSdFmx3ZbnzUVSamMGvaA="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
