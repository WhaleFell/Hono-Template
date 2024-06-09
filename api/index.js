
export const config = {
	supportsResponseStreaming: true,
	api: {
		badyParse: false,
	},
}
export const dynamic = 'force-dynamic'

var Ee={Stringify:1,BeforeStream:2,Stream:3},Ye=(e,t)=>{let s=new String(e);return s.isEscaped=!0,s.callbacks=t,s};var Y=async(e,t,s,r,n)=>{let o=e.callbacks;if(!o?.length)return Promise.resolve(e);n?n[0]+=e:n=[e];let c=Promise.all(o.map(a=>a({phase:t,buffer:n,context:r}))).then(a=>Promise.all(a.filter(Boolean).map(i=>Y(i,t,!1,r,n))).then(()=>n[0]));return s?Ye(await c,o):c};var Ze="text/plain; charset=UTF-8",Z=(e,t={})=>(Object.entries(t).forEach(([s,r])=>e.set(s,r)),e),E=class{req;env={};_var={};finalized=!1;error=void 0;#t=200;#e;#r=void 0;#s=void 0;#n;#o=!0;layout=void 0;renderer=e=>this.html(e);notFoundHandler=()=>new Response;constructor(e,t){this.req=e,t&&(this.#e=t.executionCtx,this.env=t.env,t.notFoundHandler&&(this.notFoundHandler=t.notFoundHandler))}get event(){if(this.#e&&"respondWith"in this.#e)return this.#e;throw Error("This context has no FetchEvent")}get executionCtx(){if(this.#e)return this.#e;throw Error("This context has no ExecutionContext")}get res(){return this.#o=!1,this.#n||=new Response("404 Not Found",{status:404})}set res(e){if(this.#o=!1,this.#n&&e){this.#n.headers.delete("content-type");for(let[t,s]of this.#n.headers.entries())if(t==="set-cookie"){let r=this.#n.headers.getSetCookie();e.headers.delete("set-cookie");for(let n of r)e.headers.append("set-cookie",n)}else e.headers.set(t,s)}this.#n=e,this.finalized=!0}render=(...e)=>this.renderer(...e);setLayout=e=>this.layout=e;getLayout=()=>this.layout;setRenderer=e=>{this.renderer=e};header=(e,t,s)=>{if(t===void 0){this.#r?this.#r.delete(e):this.#s&&delete this.#s[e.toLocaleLowerCase()],this.finalized&&this.res.headers.delete(e);return}s?.append?(this.#r||(this.#o=!1,this.#r=new Headers(this.#s),this.#s={}),this.#r.append(e,t)):this.#r?this.#r.set(e,t):(this.#s??={},this.#s[e.toLowerCase()]=t),this.finalized&&(s?.append?this.res.headers.append(e,t):this.res.headers.set(e,t))};status=e=>{this.#o=!1,this.#t=e};set=(e,t)=>{this._var??={},this._var[e]=t};get=e=>this._var?this._var[e]:void 0;get var(){return{...this._var}}newResponse=(e,t,s)=>{if(this.#o&&!s&&!t&&this.#t===200)return new Response(e,{headers:this.#s});if(t&&typeof t!="number"){let n=new Headers(t.headers);this.#r&&this.#r.forEach((c,a)=>{a==="set-cookie"?n.append(a,c):n.set(a,c)});let o=Z(n,this.#s);return new Response(e,{headers:o,status:t.status??this.#t})}let r=typeof t=="number"?t:this.#t;this.#s??={},this.#r??=new Headers,Z(this.#r,this.#s),this.#n&&(this.#n.headers.forEach((n,o)=>{o==="set-cookie"?this.#r?.append(o,n):this.#r?.set(o,n)}),Z(this.#r,this.#s)),s??={};for(let[n,o]of Object.entries(s))if(typeof o=="string")this.#r.set(n,o);else{this.#r.delete(n);for(let c of o)this.#r.append(n,c)}return new Response(e,{status:r,headers:this.#r})};body=(e,t,s)=>typeof t=="number"?this.newResponse(e,t,s):this.newResponse(e,t);text=(e,t,s)=>{if(!this.#s){if(this.#o&&!s&&!t)return new Response(e);this.#s={}}return this.#s["content-type"]=Ze,typeof t=="number"?this.newResponse(e,t,s):this.newResponse(e,t)};json=(e,t,s)=>{let r=JSON.stringify(e);return this.#s??={},this.#s["content-type"]="application/json; charset=UTF-8",typeof t=="number"?this.newResponse(r,t,s):this.newResponse(r,t)};html=(e,t,s)=>(this.#s??={},this.#s["content-type"]="text/html; charset=UTF-8",typeof e=="object"&&(e instanceof Promise||(e=e.toString()),e instanceof Promise)?e.then(r=>Y(r,Ee.Stringify,!1,{})).then(r=>typeof t=="number"?this.newResponse(r,t,s):this.newResponse(r,t)):typeof t=="number"?this.newResponse(e,t,s):this.newResponse(e,t));redirect=(e,t)=>(this.#r??=new Headers,this.#r.set("Location",e),this.newResponse(null,t??302));notFound=()=>this.notFoundHandler(this)};var ee=(e,t,s)=>(r,n)=>{let o=-1;return c(0);async function c(a){if(a<=o)throw new Error("next() called multiple times");o=a;let i,h=!1,l;if(e[a]?(l=e[a][0][0],r instanceof E&&(r.req.routeIndex=a)):l=a===e.length&&n||void 0,!l)r instanceof E&&r.finalized===!1&&s&&(i=await s(r));else try{i=await l(r,()=>c(a+1))}catch(u){if(u instanceof Error&&r instanceof E&&t)r.error=u,i=await t(u,r),h=!0;else throw u}return i&&(r.finalized===!1||h)&&(r.res=i),r}};var xe=async(e,t=Object.create(null))=>{let{all:s=!1,dot:r=!1}=t,o=(e instanceof F?e.raw.headers:e.headers).get("Content-Type");return o!==null&&o.startsWith("multipart/form-data")||o!==null&&o.startsWith("application/x-www-form-urlencoded")?et(e,{all:s,dot:r}):{}};async function et(e,t){let s=await e.formData();return s?tt(s,t):{}}function tt(e,t){let s=Object.create(null);return e.forEach((r,n)=>{t.all||n.endsWith("[]")?rt(s,n,r):s[n]=r}),t.dot&&Object.entries(s).forEach(([r,n])=>{r.includes(".")&&(st(s,r,n),delete s[r])}),s}var rt=(e,t,s)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(s):e[t]=[e[t],s]:e[t]=s},st=(e,t,s)=>{let r=e,n=t.split(".");n.forEach((o,c)=>{c===n.length-1?r[o]=s:((!r[o]||typeof r[o]!="object"||Array.isArray(r[o])||r[o]instanceof File)&&(r[o]=Object.create(null)),r=r[o])})};var re=e=>{let t=e.split("/");return t[0]===""&&t.shift(),t},Se=e=>{let{groups:t,path:s}=nt(e),r=re(s);return ot(r,t)},nt=e=>{let t=[];return e=e.replace(/\{[^}]+\}/g,(s,r)=>{let n=`@${r}`;return t.push([n,s]),n}),{groups:t,path:e}},ot=(e,t)=>{for(let s=t.length-1;s>=0;s--){let[r]=t[s];for(let n=e.length-1;n>=0;n--)if(e[n].includes(r)){e[n]=e[n].replace(r,t[s][1]);break}}return e},I={},se=e=>{if(e==="*")return"*";let t=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);return t?(I[e]||(t[2]?I[e]=[e,t[1],new RegExp("^"+t[2]+"$")]:I[e]=[e,t[1],!0]),I[e]):null},at=e=>{try{return decodeURI(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,t=>{try{return decodeURI(t)}catch{return t}})}},ne=e=>{let t=e.url,s=t.indexOf("/",8),r=s;for(;r<t.length;r++){let n=t.charCodeAt(r);if(n===37){let o=t.indexOf("?",r),c=t.slice(s,o===-1?void 0:o);return at(c.includes("%25")?c.replace(/%25/g,"%2525"):c)}else if(n===63)break}return t.slice(s,r)};var He=e=>{let t=ne(e);return t.length>1&&t[t.length-1]==="/"?t.slice(0,-1):t},x=(...e)=>{let t="",s=!1;for(let r of e)t[t.length-1]==="/"&&(t=t.slice(0,-1),s=!0),r[0]!=="/"&&(r=`/${r}`),r==="/"&&s?t=`${t}/`:r!=="/"&&(t=`${t}${r}`),r==="/"&&t===""&&(t="/");return t},U=e=>{if(!e.match(/\:.+\?$/))return null;let t=e.split("/"),s=[],r="";return t.forEach(n=>{if(n!==""&&!/\:/.test(n))r+="/"+n;else if(/\:/.test(n))if(/\?/.test(n)){s.length===0&&r===""?s.push("/"):s.push(r);let o=n.replace("?","");r+="/"+o,s.push(r)}else r+="/"+n}),s.filter((n,o,c)=>c.indexOf(n)===o)},te=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),/%/.test(e)?S(e):e):e,Oe=(e,t,s)=>{let r;if(!s&&t&&!/[%+]/.test(t)){let c=e.indexOf(`?${t}`,8);for(c===-1&&(c=e.indexOf(`&${t}`,8));c!==-1;){let a=e.charCodeAt(c+t.length+1);if(a===61){let i=c+t.length+2,h=e.indexOf("&",i);return te(e.slice(i,h===-1?void 0:h))}else if(a==38||isNaN(a))return"";c=e.indexOf(`&${t}`,c+1)}if(r=/[%+]/.test(e),!r)return}let n={};r??=/[%+]/.test(e);let o=e.indexOf("?",8);for(;o!==-1;){let c=e.indexOf("&",o+1),a=e.indexOf("=",o);a>c&&c!==-1&&(a=-1);let i=e.slice(o+1,a===-1?c===-1?void 0:c:a);if(r&&(i=te(i)),o=c,i==="")continue;let h;a===-1?h="":(h=e.slice(a+1,c===-1?void 0:c),r&&(h=te(h))),s?(n[i]&&Array.isArray(n[i])||(n[i]=[]),n[i].push(h)):n[i]??=h}return t?n[t]:n},Ae=Oe,je=(e,t)=>Oe(e,t,!0),S=decodeURIComponent;var F=class{raw;#t;#e;routeIndex=0;path;bodyCache={};constructor(e,t="/",s=[[]]){this.raw=e,this.path=t,this.#e=s,this.#t={}}param(e){return e?this.getDecodedParam(e):this.getAllDecodedParams()}getDecodedParam(e){let t=this.#e[0][this.routeIndex][1][e],s=this.getParamValue(t);return s?/\%/.test(s)?S(s):s:void 0}getAllDecodedParams(){let e={},t=Object.keys(this.#e[0][this.routeIndex][1]);for(let s of t){let r=this.getParamValue(this.#e[0][this.routeIndex][1][s]);r&&typeof r=="string"&&(e[s]=/\%/.test(r)?S(r):r)}return e}getParamValue(e){return this.#e[1]?this.#e[1][e]:e}query(e){return Ae(this.url,e)}queries(e){return je(this.url,e)}header(e){if(e)return this.raw.headers.get(e.toLowerCase())??void 0;let t={};return this.raw.headers.forEach((s,r)=>{t[r]=s}),t}async parseBody(e){if(this.bodyCache.parsedBody)return this.bodyCache.parsedBody;let t=await xe(this,e);return this.bodyCache.parsedBody=t,t}cachedBody=e=>{let{bodyCache:t,raw:s}=this,r=t[e];if(r)return r;if(!t[e]){for(let n of Object.keys(t))if(n!=="parsedBody")return(async()=>{let o=await t[n];return n==="json"&&(o=JSON.stringify(o)),await new Response(o)[e]()})()}return t[e]=s[e]()};json(){return this.cachedBody("json")}text(){return this.cachedBody("text")}arrayBuffer(){return this.cachedBody("arrayBuffer")}blob(){return this.cachedBody("blob")}formData(){return this.cachedBody("formData")}addValidatedData(e,t){this.#t[e]=t}valid(e){return this.#t[e]}get url(){return this.raw.url}get method(){return this.raw.method}get matchedRoutes(){return this.#e[0].map(([[,e]])=>e)}get routePath(){return this.#e[0].map(([[,e]])=>e)[this.routeIndex].path}};var d="ALL",Ce="all",Pe=["get","post","put","delete","options","patch"],B="Can not add a route since the matcher is already built.",N=class extends Error{};var it=Symbol("composedHandler"),ct=e=>e.text("404 Not Found",404),Te=(e,t)=>"getResponse"in e?e.getResponse():(console.error(e),t.text("Internal Server Error",500)),oe=class{get;post;put;delete;options;patch;all;on;use;router;getPath;_basePath="/";#t="/";routes=[];constructor(e={}){[...Pe,Ce].forEach(r=>{this[r]=(n,...o)=>(typeof n=="string"?this.#t=n:this.addRoute(r,this.#t,n),o.forEach(c=>{typeof c!="string"&&this.addRoute(r,this.#t,c)}),this)}),this.on=(r,n,...o)=>{if(!r)return this;for(let c of[n].flat()){this.#t=c;for(let a of[r].flat())o.map(i=>{this.addRoute(a.toUpperCase(),this.#t,i)})}return this},this.use=(r,...n)=>(typeof r=="string"?this.#t=r:(this.#t="*",n.unshift(r)),n.forEach(o=>{this.addRoute(d,this.#t,o)}),this);let s=e.strict??!0;delete e.strict,Object.assign(this,e),this.getPath=s?e.getPath??ne:He}clone(){let e=new oe({router:this.router,getPath:this.getPath});return e.routes=this.routes,e}notFoundHandler=ct;errorHandler=Te;route(e,t){let s=this.basePath(e);return t?(t.routes.map(r=>{let n;t.errorHandler===Te?n=r.handler:(n=async(o,c)=>(await ee([],t.errorHandler)(o,()=>r.handler(o,c))).res,n[it]=r.handler),s.addRoute(r.method,r.path,n)}),this):s}basePath(e){let t=this.clone();return t._basePath=x(this._basePath,e),t}onError=e=>(this.errorHandler=e,this);notFound=e=>(this.notFoundHandler=e,this);mount(e,t,s){let r,n;s&&(typeof s=="function"?n=s:(n=s.optionHandler,r=s.replaceRequest));let o=n?a=>{let i=n(a);return Array.isArray(i)?i:[i]}:a=>{let i;try{i=a.executionCtx}catch{}return[a.env,i]};r||=(()=>{let a=x(this._basePath,e),i=a==="/"?0:a.length;return h=>{let l=new URL(h.url);return l.pathname=l.pathname.slice(i)||"/",new Request(l,h)}})();let c=async(a,i)=>{let h=await t(r(a.req.raw),...o(a));if(h)return h;await i()};return this.addRoute(d,x(e,"*"),c),this}addRoute(e,t,s){e=e.toUpperCase(),t=x(this._basePath,t);let r={path:t,method:e,handler:s};this.router.add(e,t,[s,r]),this.routes.push(r)}matchRoute(e,t){return this.router.match(e,t)}handleError(e,t){if(e instanceof Error)return this.errorHandler(e,t);throw e}dispatch(e,t,s,r){if(r==="HEAD")return(async()=>new Response(null,await this.dispatch(e,t,s,"GET")))();let n=this.getPath(e,{env:s}),o=this.matchRoute(r,n),c=new E(new F(e,n,o),{env:s,executionCtx:t,notFoundHandler:this.notFoundHandler});if(o[0].length===1){let i;try{i=o[0][0][0][0](c,async()=>{c.res=await this.notFoundHandler(c)})}catch(h){return this.handleError(h,c)}return i instanceof Promise?i.then(h=>h||(c.finalized?c.res:this.notFoundHandler(c))).catch(h=>this.handleError(h,c)):i??this.notFoundHandler(c)}let a=ee(o[0],this.errorHandler,this.notFoundHandler);return(async()=>{try{let i=await a(c);if(!i.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return i.res}catch(i){return this.handleError(i,c)}})()}fetch=(e,...t)=>this.dispatch(e,t[1],t[0],e.method);request=(e,t,s,r)=>{if(e instanceof Request)return t!==void 0&&(e=new Request(e,t)),this.fetch(e,s,r);e=e.toString();let n=/^https?:\/\//.test(e)?e:`http://localhost${x("/",e)}`,o=new Request(n,t);return this.fetch(o,s,r)};fire=()=>{addEventListener("fetch",e=>{e.respondWith(this.dispatch(e.request,e,void 0,e.request.method))})}};var K="[^/]+",k=".*",L="(?:|/.*)",H=Symbol(),ht=new Set(".\\+*[^]$()");function lt(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===k||e===L?1:t===k||t===L?-1:e===K?1:t===K?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var W=class{index;varIndex;children=Object.create(null);insert(e,t,s,r,n){if(e.length===0){if(this.index!==void 0)throw H;if(n)return;this.index=t;return}let[o,...c]=e,a=o==="*"?c.length===0?["","",k]:["","",K]:o==="/*"?["","",L]:o.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/),i;if(a){let h=a[1],l=a[2]||K;if(h&&a[2]&&(l=l.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(l)))throw H;if(i=this.children[l],!i){if(Object.keys(this.children).some(u=>u!==k&&u!==L))throw H;if(n)return;i=this.children[l]=new W,h!==""&&(i.varIndex=r.varIndex++)}!n&&h!==""&&s.push([h,i.varIndex])}else if(i=this.children[o],!i){if(Object.keys(this.children).some(h=>h.length>1&&h!==k&&h!==L))throw H;if(n)return;i=this.children[o]=new W}i.insert(c,t,s,r,n)}buildRegExpStr(){let t=Object.keys(this.children).sort(lt).map(s=>{let r=this.children[s];return(typeof r.varIndex=="number"?`(${s})@${r.varIndex}`:ht.has(s)?`\\${s}`:s)+r.buildRegExpStr()});return typeof this.index=="number"&&t.unshift(`#${this.index}`),t.length===0?"":t.length===1?t[0]:"(?:"+t.join("|")+")"}};var _e=class{context={varIndex:0};root=new W;insert(e,t,s){let r=[],n=[];for(let c=0;;){let a=!1;if(e=e.replace(/\{[^}]+\}/g,i=>{let h=`@\\${c}`;return n[c]=[h,i],c++,a=!0,h}),!a)break}let o=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let c=n.length-1;c>=0;c--){let[a]=n[c];for(let i=o.length-1;i>=0;i--)if(o[i].indexOf(a)!==-1){o[i]=o[i].replace(a,n[c][1]);break}}return this.root.insert(o,t,r,this.context,s),r}buildRegExp(){let e=this.root.buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0,s=[],r=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(n,o,c)=>typeof o<"u"?(s[++t]=Number(o),"$()"):(typeof c<"u"&&(r[Number(c)]=++t),"")),[new RegExp(`^${e}`),s,r]}};var qe=[],ut=[/^$/,[],Object.create(null)],ke=Object.create(null);function Le(e){return ke[e]??=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,s)=>s?`\\${s}`:"(?:|/.*)")}$`)}function dt(){ke=Object.create(null)}function ft(e){let t=new _e,s=[];if(e.length===0)return ut;let r=e.map(h=>[!/\*|\/:/.test(h[0]),...h]).sort(([h,l],[u,p])=>h?1:u?-1:l.length-p.length),n=Object.create(null);for(let h=0,l=-1,u=r.length;h<u;h++){let[p,g,f]=r[h];p?n[g]=[f.map(([y])=>[y,Object.create(null)]),qe]:l++;let m;try{m=t.insert(g,l,p)}catch(y){throw y===H?new N(g):y}p||(s[l]=f.map(([y,v])=>{let _=Object.create(null);for(v-=1;v>=0;v--){let[w,M]=m[v];_[w]=M}return[y,_]}))}let[o,c,a]=t.buildRegExp();for(let h=0,l=s.length;h<l;h++)for(let u=0,p=s[h].length;u<p;u++){let g=s[h][u]?.[1];if(!g)continue;let f=Object.keys(g);for(let m=0,y=f.length;m<y;m++)g[f[m]]=a[g[f[m]]]}let i=[];for(let h in c)i[h]=s[c[h]];return[o,i,n]}function O(e,t){if(e){for(let s of Object.keys(e).sort((r,n)=>n.length-r.length))if(Le(s).test(t))return[...e[s]]}}var ae=class{name="RegExpRouter";middleware;routes;constructor(){this.middleware={[d]:Object.create(null)},this.routes={[d]:Object.create(null)}}add(e,t,s){let{middleware:r,routes:n}=this;if(!r||!n)throw new Error(B);r[e]||[r,n].forEach(a=>{a[e]=Object.create(null),Object.keys(a[d]).forEach(i=>{a[e][i]=[...a[d][i]]})}),t==="/*"&&(t="*");let o=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){let a=Le(t);e===d?Object.keys(r).forEach(i=>{r[i][t]||=O(r[i],t)||O(r[d],t)||[]}):r[e][t]||=O(r[e],t)||O(r[d],t)||[],Object.keys(r).forEach(i=>{(e===d||e===i)&&Object.keys(r[i]).forEach(h=>{a.test(h)&&r[i][h].push([s,o])})}),Object.keys(n).forEach(i=>{(e===d||e===i)&&Object.keys(n[i]).forEach(h=>a.test(h)&&n[i][h].push([s,o]))});return}let c=U(t)||[t];for(let a=0,i=c.length;a<i;a++){let h=c[a];Object.keys(n).forEach(l=>{(e===d||e===l)&&(n[l][h]||=[...O(r[l],h)||O(r[d],h)||[]],n[l][h].push([s,o-i+a+1]))})}}match(e,t){dt();let s=this.buildAllMatchers();return this.match=(r,n)=>{let o=s[r]||s[d],c=o[2][n];if(c)return c;let a=n.match(o[0]);if(!a)return[[],qe];let i=a.indexOf("",1);return[o[1][i],a]},this.match(e,t)}buildAllMatchers(){let e=Object.create(null);return[...Object.keys(this.routes),...Object.keys(this.middleware)].forEach(t=>{e[t]||=this.buildMatcher(t)}),this.middleware=this.routes=void 0,e}buildMatcher(e){let t=[],s=e===d;return[this.middleware,this.routes].forEach(r=>{let n=r[e]?Object.keys(r[e]).map(o=>[o,r[e][o]]):[];n.length!==0?(s||=!0,t.push(...n)):e!==d&&t.push(...Object.keys(r[d]).map(o=>[o,r[d][o]]))}),s?ft(t):null}};var ie=class{name="SmartRouter";routers=[];routes=[];constructor(e){Object.assign(this,e)}add(e,t,s){if(!this.routes)throw new Error(B);this.routes.push([e,t,s])}match(e,t){if(!this.routes)throw new Error("Fatal error");let{routers:s,routes:r}=this,n=s.length,o=0,c;for(;o<n;o++){let a=s[o];try{r.forEach(i=>{a.add(...i)}),c=a.match(e,t)}catch(i){if(i instanceof N)continue;throw i}this.match=a.match.bind(a),this.routers=[a],this.routes=void 0;break}if(o===n)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,c}get activeRouter(){if(this.routes||this.routers.length!==1)throw new Error("No active router has been determined yet.");return this.routers[0]}};var ce=class{methods;children;patterns;order=0;name;params=Object.create(null);constructor(e,t,s){if(this.children=s||Object.create(null),this.methods=[],this.name="",e&&t){let r=Object.create(null);r[e]={handler:t,possibleKeys:[],score:0,name:this.name},this.methods=[r]}this.patterns=[]}insert(e,t,s){this.name=`${e} ${t}`,this.order=++this.order;let r=this,n=Se(t),o=[];for(let i=0,h=n.length;i<h;i++){let l=n[i];if(Object.keys(r.children).includes(l)){r=r.children[l];let p=se(l);p&&o.push(p[1]);continue}r.children[l]=new ce;let u=se(l);u&&(r.patterns.push(u),o.push(u[1])),r=r.children[l]}r.methods.length||(r.methods=[]);let c=Object.create(null),a={handler:s,possibleKeys:o.filter((i,h,l)=>l.indexOf(i)===h),name:this.name,score:this.order};return c[e]=a,r.methods.push(c),r}gHSets(e,t,s,r){let n=[];for(let o=0,c=e.methods.length;o<c;o++){let a=e.methods[o],i=a[t]||a[d],h=Object.create(null);i!==void 0&&(i.params=Object.create(null),i.possibleKeys.forEach(l=>{let u=h[i.name];i.params[l]=r[l]&&!u?r[l]:s[l]??r[l],h[i.name]=!0}),n.push(i))}return n}search(e,t){let s=[];this.params=Object.create(null);let n=[this],o=re(t);for(let a=0,i=o.length;a<i;a++){let h=o[a],l=a===i-1,u=[];for(let p=0,g=n.length;p<g;p++){let f=n[p],m=f.children[h];m&&(m.params=f.params,l===!0?(m.children["*"]&&s.push(...this.gHSets(m.children["*"],e,f.params,Object.create(null))),s.push(...this.gHSets(m,e,f.params,Object.create(null)))):u.push(m));for(let y=0,v=f.patterns.length;y<v;y++){let _=f.patterns[y],w={...f.params};if(_==="*"){let X=f.children["*"];X&&(s.push(...this.gHSets(X,e,f.params,Object.create(null))),u.push(X));continue}if(h==="")continue;let[M,ve,q]=_,R=f.children[M],Re=o.slice(a).join("/");if(q instanceof RegExp&&q.test(Re)){w[ve]=Re,s.push(...this.gHSets(R,e,f.params,w));continue}(q===!0||q instanceof RegExp&&q.test(h))&&typeof M=="string"&&(w[ve]=h,l===!0?(s.push(...this.gHSets(R,e,w,f.params)),R.children["*"]&&s.push(...this.gHSets(R.children["*"],e,w,f.params))):(R.params=w,u.push(R)))}}n=u}return[s.sort((a,i)=>a.score-i.score).map(({handler:a,params:i})=>[a,i])]}};var he=class{name="TrieRouter";node;constructor(){this.node=new ce}add(e,t,s){let r=U(t);if(r){for(let n of r)this.node.insert(e,n,s);return}this.node.insert(e,t,s)}match(e,t){return this.node.search(e,t)}};var b=class extends oe{constructor(e={}){super(e),this.router=e.router??new ie({routers:[new ae,new he]})}};var A=class extends Error{res;status;constructor(e=500,t){super(t?.message,{cause:t?.cause}),this.res=t?.res,this.status=e}getResponse(){return this.res?new Response(this.res.body,{status:this.status,headers:this.res.headers}):new Response(this.message,{status:this.status})}};var $e=e=>{e.onError((t,s)=>{if(t instanceof A){s.status(t.status);let r=t.res?.headers;return s.json({error:t.message||t.res?.statusText},t.status,r?Object.fromEntries(r):{})}return console.error(`${t}`),s.json({error:`Error Occur ${t}`},500)}),e.notFound(t=>t.json({error:`Not Found ${t.req.raw.url}`},404))};var pt={deno:"Deno",bun:"Bun",workerd:"Cloudflare-Workers",node:"Node.js"},De=()=>{let e=globalThis;if(typeof navigator<"u"&&typeof navigator.userAgent=="string"){for(let[s,r]of Object.entries(pt))if(mt(r))return s}return typeof e?.EdgeRuntime=="string"?"edge-light":e?.fastly!==void 0?"fastly":e?.process?.release?.name==="node"?"node":"other"},mt=e=>navigator.userAgent.startsWith(e);var yt=e=>{let t=new URL(e);return new Headers({"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",Origin:t.host,Referer:t.origin,Accept:"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7","Accept-Encoding":"gzip, deflate, br","Accept-Language":"en-US,en;q=0.9","Cache-Control":"no-cache",Pragma:"no-cache",Connection:"keep-alive","Upgrade-Insecure-Requests":"1"})};function gt(e){return e!==null&&typeof e=="object"}function le(...e){let t={};for(let s of e){if(!gt(s))throw new TypeError("All arguments must be of type object");let r=new Headers(s);for(let[n,o]of r.entries())o===void 0||o==="undefined"?delete t[n]:t[n]=o}return new Headers(t)}var V=async(e,t,s=8e3)=>{let n=0,o,c=le(yt(e),t?.headers?t.headers:{});for(console.log(`[customFetch] ${e} Fetching data...`);n<3;)try{let a=await Promise.race([fetch(e,{...t,headers:c,keepalive:!0}),new Promise((i,h)=>setTimeout(()=>h("TIMEOUT"),s))]);if(a)return a;n++}catch(a){a=a,console.error(`[customFetch] ${e} Failed to fetch data: ${a} and retrying...`),n++}throw new Error(`[customFetch] ${e} Failed to fetch data after ${n} retries reason: ${o}`)};var wt=/^[\w!#$%&'*.^`|~+-]+$/,bt=/^[ !#-:<-[\]-~]*$/,ue=(e,t)=>e.trim().split(";").reduce((r,n)=>{n=n.trim();let o=n.indexOf("=");if(o===-1)return r;let c=n.substring(0,o).trim();if(t&&t!==c||!wt.test(c))return r;let a=n.substring(o+1).trim();return a.startsWith('"')&&a.endsWith('"')&&(a=a.slice(1,-1)),bt.test(a)&&(r[c]=S(a)),r},{});var Me=(e,t,s)=>{let r=e.req.raw.headers.get("Cookie");if(typeof t=="string"){if(!r)return;let o=t;return s==="secure"?o="__Secure-"+t:s==="host"&&(o="__Host-"+t),ue(r,o)[o]}return r?ue(r):{}};var Fe=(e,t)=>new Response(e,{headers:{"Content-Type":t}}).formData();var de=(e,t)=>async(s,r)=>{let n={},o=s.req.header("Content-Type");switch(e){case"json":if(!o||!/^application\/([a-z-\.]+\+)?json/.test(o)){let a=`Invalid HTTP header: Content-Type=${o}`;throw new A(400,{message:a})}try{n=await s.req.json()}catch{let a="Malformed JSON in request body";throw new A(400,{message:a})}break;case"form":{if(!o)break;if(s.req.bodyCache.formData){n=await s.req.bodyCache.formData;break}try{let a=await s.req.arrayBuffer(),i=await Fe(a,o),h={};i.forEach((l,u)=>{u.endsWith("[]")?h[u]===void 0?h[u]=[l]:Array.isArray(h[u])&&h[u].push(l):h[u]=l}),n=h,s.req.bodyCache.formData=i}catch(a){let i="Malformed FormData request.";throw i+=a instanceof Error?` ${a.message}`:` ${String(a)}`,new A(400,{message:i})}break}case"query":n=Object.fromEntries(Object.entries(s.req.queries()).map(([a,i])=>i.length===1?[a,i[0]]:[a,i]));break;case"param":n=s.req.param();break;case"header":n=s.req.header();break;case"cookie":n=Me(s);break}let c=await t(n,s);if(c instanceof Response)return c;s.req.addValidatedData(e,c),await r()};var vt=class{initApp;constructor(e){this.initApp=e?.initApp}createApp=()=>{let e=new b;return this.initApp&&this.initApp(e),e};createMiddleware=e=>e;createHandlers=(...e)=>e.filter(t=>t!==void 0)},Ie=e=>new vt(e);var Ue=Ie(),fe=de("query",(e,t)=>typeof e.url!="string"?t.json({error:`Invalid URL ${e.url}`},400):{url:e.url}),ps=Ue.createMiddleware(async(e,t)=>{await t(),console.log("[delHeaderLengthMiddleware] Deleting Content-Length header..."),e.res.headers.delete("content-length"),e.res.headers.delete("content-encoding")}),Be=Ue.createMiddleware(async(e,t)=>{e.res.headers.set("Access-Control-Allow-Origin","*"),e.res.headers.set("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,OPTIONS"),e.res.headers.set("Access-Control-Allow-Headers","Content-Type"),await t()});var j=new b;j.get("/ping",e=>e.text("pong",200));j.get("/runtime",e=>e.json({runtime:De()}));j.all("/proxy",fe,async e=>{let t=e.req.valid("query").url;console.log(`[defaultRoute] Fetching data from ${t}...`);let s=await V(t,{headers:le(e.req.raw.headers,{"Accept-Encoding":"identity"}),method:e.req.method});return e.newResponse(s.body,s.status,Object.fromEntries(s.headers))});j.get("/down",fe,async e=>{let t=e.req.valid("query").url;console.log(`[defaultRoute] Fetching data from ${t}...`);let s=await V(t,{headers:e.req.raw.headers,method:e.req.method});return e.newResponse(s.body,s.status,Object.fromEntries(s.headers))});j.get("/speedtest",async e=>{let t="https://github.com/AaronFeng753/Waifu2x-Extension-GUI/releases/download/v2.21.12/Waifu2x-Extension-GUI-v2.21.12-Portable.7z",s=await V(t,{headers:e.req.raw.headers,method:e.req.method});return console.log(`[defaultRoute] Speedtest from ${t}...`),e.newResponse(s.body,s.status,Object.fromEntries(s.headers))});var Ne=j;var C=new b({strict:!1});C.use(Be);C.get("/",e=>{let s=new URL(e.req.url).origin;return e.json({message:"Hello World! This is NodeJS Hono web framework template!",hostname:s})});$e(C);C.route("/",Ne);import{Http2ServerRequest as Ke}from"http2";import{Readable as Rt}from"stream";import Ct from"crypto";var G=class extends Error{static name="RequestError";constructor(e,t){super(e,t)}},Et=e=>e instanceof G?e:new G(e.message,{cause:e}),xt=global.Request,z=class extends xt{constructor(e,t){typeof e=="object"&&P in e&&(e=e[P]()),typeof t?.body?.getReader<"u"&&(t.duplex??="half"),super(e,t)}},St=(e,t,s,r)=>{let n=[],o=s.rawHeaders;for(let a=0;a<o.length;a+=2){let{[a]:i,[a+1]:h}=o;i.charCodeAt(0)!==58&&n.push([i,h])}let c={method:e,headers:n,signal:r.signal};return e==="GET"||e==="HEAD"||(c.body=Rt.toWeb(s)),new z(t,c)},P=Symbol("getRequestCache"),Ht=Symbol("requestCache"),me=Symbol("incomingKey"),ye=Symbol("urlKey"),pe=Symbol("abortControllerKey"),Ve=Symbol("getAbortController"),Q={get method(){return this[me].method||"GET"},get url(){return this[ye]},[Ve](){return this[P](),this[pe]},[P](){return this[pe]||=new AbortController,this[Ht]||=St(this.method,this[ye],this[me],this[pe])}};["body","bodyUsed","cache","credentials","destination","headers","integrity","mode","redirect","referrer","referrerPolicy","signal","keepalive"].forEach(e=>{Object.defineProperty(Q,e,{get(){return this[P]()[e]}})});["arrayBuffer","blob","clone","formData","json","text"].forEach(e=>{Object.defineProperty(Q,e,{value:function(){return this[P]()[e]()}})});Object.setPrototypeOf(Q,z.prototype);var Ot=(e,t)=>{let s=Object.create(Q);s[me]=e;let r=(e instanceof Ke?e.authority:e.headers.host)||t;if(!r)throw new G("Missing host header");let n=new URL(`${e instanceof Ke||e.socket&&e.socket.encrypted?"https":"http"}://${r}${e.url}`);if(n.hostname.length!==r.length&&n.hostname!==r.replace(/:\d+$/,""))throw new G("Invalid host header");return s[ye]=n.href,s};function ge(e,t){if(e.locked)throw new TypeError("ReadableStream is locked.");if(t.destroyed){e.cancel();return}let s=e.getReader();return t.on("close",r),t.on("error",r),s.read().then(o,r),s.closed.finally(()=>{t.off("close",r),t.off("error",r)});function r(c){s.cancel(c).catch(()=>{}),c&&t.destroy(c)}function n(){s.read().then(o,r)}function o({done:c,value:a}){try{if(c)t.end();else if(!t.write(a))t.once("drain",n);else return s.read().then(o,r)}catch(i){r(i)}}}var Ge=e=>{let t={},s=[];for(let[r,n]of e)r==="set-cookie"?s.push(n):t[r]=n;return s.length>0&&(t["set-cookie"]=s),t["content-type"]??="text/plain; charset=UTF-8",t},We=Symbol("responseCache"),$=Symbol("getResponseCache"),D=Symbol("cache"),J=global.Response,T=class ze{#t;#e;[$](){return delete this[D],this[We]||=new J(this.#t,this.#e)}constructor(t,s){if(this.#t=t,s instanceof ze){let r=s[We];if(r){this.#e=r,this[$]();return}else this.#e=s.#e}else this.#e=s;if(typeof t=="string"||typeof t?.getReader<"u"){let r=s?.headers||{"content-type":"text/plain; charset=UTF-8"};r instanceof Headers&&(r=Ge(r)),this[D]=[s?.status||200,t,r]}}};["body","bodyUsed","headers","ok","redirected","status","statusText","trailers","type","url"].forEach(e=>{Object.defineProperty(T.prototype,e,{get(){return this[$]()[e]}})});["arrayBuffer","blob","clone","formData","json","text"].forEach(e=>{Object.defineProperty(T.prototype,e,{value:function(){return this[$]()[e]()}})});Object.setPrototypeOf(T,J);Object.setPrototypeOf(T.prototype,J.prototype);var we=Reflect.ownKeys(new J).find(e=>typeof e=="symbol"&&e.toString()==="Symbol(state)");we||console.warn("Failed to find Response internal state key");function At(e){if(!we)return;e instanceof T&&(e=e[$]());let t=e[we];return t&&t.body||void 0}var jt="x-hono-already-sent",Pt=global.fetch;typeof global.crypto>"u"&&(global.crypto=Ct);global.fetch=(e,t)=>(t={compress:!1,...t},Pt(e,t));var Tt=/^no$/i,_t=/^(application\/json\b|text\/(?!event-stream\b))/i,qt=()=>new Response(null,{status:400}),Qe=e=>new Response(null,{status:e instanceof Error&&(e.name==="TimeoutError"||e.constructor.name==="TimeoutError")?504:500}),be=(e,t)=>{let s=e instanceof Error?e:new Error("unknown error",{cause:e});s.code==="ERR_STREAM_PREMATURE_CLOSE"?console.info("The user aborted a request."):(console.error(e),t.headersSent||t.writeHead(500,{"Content-Type":"text/plain"}),t.end(`Error: ${s.message}`),t.destroy(s))},Je=(e,t)=>{let[s,r,n]=e[D];if(typeof r=="string")n["Content-Length"]=Buffer.byteLength(r),t.writeHead(s,n),t.end(r);else return t.writeHead(s,n),ge(r,t)?.catch(o=>be(o,t))},kt=async(e,t,s={})=>{if(e instanceof Promise)if(s.errorHandler)try{e=await e}catch(o){let c=await s.errorHandler(o);if(!c)return;e=c}else e=await e.catch(Qe);if(D in e)return Je(e,t);let r=Ge(e.headers),n=At(e);if(n)n.length&&(r["content-length"]=n.length),t.writeHead(e.status,r),typeof n.source=="string"||n.source instanceof Uint8Array?t.end(n.source):n.source instanceof Blob?t.end(new Uint8Array(await n.source.arrayBuffer())):await ge(n.stream,t);else if(e.body){let{"transfer-encoding":o,"content-encoding":c,"content-length":a,"x-accel-buffering":i,"content-type":h}=r;if(o||c||a||i&&Tt.test(i)||!_t.test(h))t.writeHead(e.status,r),await ge(e.body,t);else{let l=await e.arrayBuffer();r["content-length"]=l.byteLength,t.writeHead(e.status,r),t.end(new Uint8Array(l))}}else r[jt]||(t.writeHead(e.status,r),t.end())},Lt=(e,t={})=>(t.overrideGlobalObjects!==!1&&global.Request!==z&&(Object.defineProperty(global,"Request",{value:z}),Object.defineProperty(global,"Response",{value:T})),async(s,r)=>{let n,o;try{if(o=Ot(s,t.hostname),r.on("close",()=>{s.errored&&o[Ve]().abort(s.errored.toString())}),n=e(o,{incoming:s,outgoing:r}),D in n)return Je(n,r)}catch(c){if(n)return be(c,r);if(t.errorHandler){if(n=await t.errorHandler(o?c:Et(c)),!n)return}else o?n=Qe(c):n=qt()}try{return kt(n,r,t)}catch(c){return be(c,r)}}),Xe=e=>Lt(e.fetch);var ks=Xe(C);export{ks as default};
