var SCN=SCN||{};SCN.Config=SCN.Config||{},SCN.Config.platform="shopify",SCN.Config.shopDomain=Shopify.shop,SCN.Backend={appHost:"https://go.beeketing.com",trackerPath:"https://t.beeketing.com",shopScriptPath:"https://scn-prod.s3.amazonaws.com/files/shop/",shopApiKeyScriptPath:"https://scn-prod.s3.amazonaws.com/files/shop/",settingScriptPath:"https://scn-prod.s3.amazonaws.com/files/global/setting",assetsPath:"https://az833648.vo.msecnd.net",baseJsPath:"/dist/js/beeketing.js",assetsVersion:1454504848,restApiBasePath:"https://go.beeketing.com/rest-api/v1"},"undefined"!=typeof SCNDefine&&"undefined"==typeof SCNRequirejs&&(SCNDefine=void 0);var SCNRequirejs,SCNRequire,SCNDefine;if(function(ba){function G(e){return"[object Function]"===K.call(e)}function H(e){return"[object Array]"===K.call(e)}function v(e,t){if(e){var i;for(i=0;i<e.length&&(!e[i]||!t(e[i],i,e));i+=1);}}function T(e,t){if(e){var i;for(i=e.length-1;i>-1&&(!e[i]||!t(e[i],i,e));i-=1);}}function t(e,t){return fa.call(e,t)}function n(e,i){return t(e,i)&&e[i]}function A(e,i){for(var n in e)if(t(e,n)&&i(e[n],n))break}function U(e,i,n,r){return i&&A(i,function(i,o){(n||!t(e,o))&&(!r||"object"!=typeof i||!i||H(i)||G(i)||i instanceof RegExp?e[o]=i:(e[o]||(e[o]={}),U(e[o],i,n,r)))}),e}function u(e,t){return function(){return t.apply(e,arguments)}}function ca(e){throw e}function da(e){if(!e)return e;var t=ba;return v(e.split("."),function(e){t=t[e]}),t}function B(e,t,i,n){return t=Error(t+"\nhttp://SCNRequirejs.org/docs/errors.html#"+e),t.requireType=e,t.requireModules=n,i&&(t.originalError=i),t}function ga(i){function r(e,t,i){var r,o,a,s,u,d,p,c,t=t&&t.split("/"),f=j.map,h=f&&f["*"];if(e){for(e=e.split("/"),o=e.length-1,j.nodeIdCompat&&Q.test(e[o])&&(e[o]=e[o].replace(Q,"")),"."===e[0].charAt(0)&&t&&(o=t.slice(0,t.length-1),e=o.concat(e)),o=e,a=0;a<o.length;a++)s=o[a],"."===s?(o.splice(a,1),a-=1):".."===s&&0!==a&&(1!==a||".."!==o[2])&&".."!==o[a-1]&&a>0&&(o.splice(a-1,2),a-=2);e=e.join("/")}if(i&&f&&(t||h)){o=e.split("/"),a=o.length;e:for(;a>0;a-=1){if(u=o.slice(0,a).join("/"),t)for(s=t.length;s>0;s-=1)if((i=n(f,t.slice(0,s).join("/")))&&(i=n(i,u))){r=i,d=a;break e}!p&&h&&n(h,u)&&(p=n(h,u),c=a)}!r&&p&&(r=p,d=c),r&&(o.splice(0,d,r),e=o.join("/"))}return(r=n(j.pkgs,e))?r:e}function o(e){z&&v(document.getElementsByTagName("script"),function(t){return t.getAttribute("data-requiremodule")===e&&t.getAttribute("data-requirecontext")===k.contextName?(t.parentNode.removeChild(t),!0):void 0})}function a(e){var t=n(j.paths,e);return t&&H(t)&&1<t.length?(t.shift(),k.SCNRequire.undef(e),k.makeRequire(null,{skipMap:!0})([e]),!0):void 0}function s(e){var t,i=e?e.indexOf("!"):-1;return i>-1&&(t=e.substring(0,i),e=e.substring(i+1,e.length)),[t,e]}function d(e,t,i,o){var a,u,d=null,p=t?t.name:null,c=e,f=!0,h="";return e||(f=!1,e="_@r"+(_+=1)),e=s(e),d=e[0],e=e[1],d&&(d=r(d,p,o),u=n(K,d)),e&&(d?h=u&&u.normalize?u.normalize(e,function(e){return r(e,p,o)}):-1===e.indexOf("!")?r(e,p,o):e:(h=r(e,p,o),e=s(h),d=e[0],h=e[1],i=!0,a=k.nameToUrl(h))),i=!d||u||i?"":"_unnormalized"+(I+=1),{prefix:d,name:h,parentMap:t,unnormalized:!!i,url:a,originalName:c,isDefine:f,id:(d?d+"!"+h:h)+i}}function p(e){var t=e.id,i=n(D,t);return i||(i=D[t]=new k.Module(e)),i}function c(e,i,r){var o=e.id,a=n(D,o);!t(K,o)||a&&!a.defineEmitComplete?(a=p(e),a.error&&"error"===i?r(a.error):a.on(i,r)):"defined"===i&&r(K[o])}function f(t,i){var r=t.requireModules,o=!1;i?i(t):(v(r,function(e){(e=n(D,e))&&(e.error=t,e.events.error&&(o=!0,e.emit("error",t)))}),o||e.onError(t))}function h(){R.length&&(v(R,function(e){var t=e[0];"string"==typeof t&&(k.defQueueMap[t]=!0),P.push(e)}),R=[])}function l(e){delete D[e],delete L[e]}function m(e,t,i){var r=e.map.id;e.error?e.emit("error",e.error):(t[r]=!0,v(e.depMaps,function(r,o){var a=r.id,s=n(D,a);s&&!e.depMatched[o]&&!i[a]&&(n(t,a)?(e.defineDep(o,K[a]),e.check()):m(s,t,i))}),i[r]=!0)}function g(){var e,t,i=(e=1e3*j.waitSeconds)&&k.startTime+e<(new Date).getTime(),n=[],r=[],s=!1,u=!0;if(!x){if(x=!0,A(L,function(e){var d=e.map,p=d.id;if(e.enabled&&(d.isDefine||r.push(e),!e.error))if(!e.inited&&i)a(p)?s=t=!0:(n.push(p),o(p));else if(!e.inited&&e.fetched&&d.isDefine&&(s=!0,!d.prefix))return u=!1}),i&&n.length)return e=B("timeout","Load timeout for modules: "+n,null,n),e.contextName=k.contextName,f(e);u&&v(r,function(e){m(e,{},{})}),i&&!t||!s||!z&&!ea||E||(E=setTimeout(function(){E=0,g()},50)),x=!1}}function S(e){t(K,e[0])||p(d(e[0],null,!0)).init(e[1],e[2])}function b(e){var e=e.currentTarget||e.srcElement,t=k.onScriptLoad;return e.detachEvent&&!Y?e.detachEvent("onreadystatechange",t):e.removeEventListener("load",t,!1),t=k.onScriptError,(!e.detachEvent||Y)&&e.removeEventListener("error",t,!1),{node:e,id:e&&e.getAttribute("data-requiremodule")}}function C(){var e;for(h();P.length;){if(e=P.shift(),null===e[0])return f(B("mismatch","Mismatched anonymous SCNDefine() module: "+e[e.length-1]));S(e)}k.defQueueMap={}}var x,y,k,q,E,j={waitSeconds:7,baseUrl:"./",paths:{},bundles:{},pkgs:{},shim:{},config:{}},D={},L={},w={},P=[],K={},O={},F={},_=1,I=1;return q={SCNRequire:function(e){return e.SCNRequire?e.SCNRequire:e.SCNRequire=k.makeRequire(e.map)},exports:function(e){return e.usingExports=!0,e.map.isDefine?e.exports?K[e.map.id]=e.exports:e.exports=K[e.map.id]={}:void 0},module:function(e){return e.module?e.module:e.module={id:e.map.id,uri:e.map.url,config:function(){return n(j.config,e.map.id)||{}},exports:e.exports||(e.exports={})}}},y=function(e){this.events=n(w,e.id)||{},this.map=e,this.shim=n(j.shim,e.id),this.depExports=[],this.depMaps=[],this.depMatched=[],this.pluginMaps={},this.depCount=0},y.prototype={init:function(e,t,i,n){n=n||{},this.inited||(this.factory=t,i?this.on("error",i):this.events.error&&(i=u(this,function(e){this.emit("error",e)})),this.depMaps=e&&e.slice(0),this.errback=i,this.inited=!0,this.ignore=n.ignore,n.enabled||this.enabled?this.enable():this.check())},defineDep:function(e,t){this.depMatched[e]||(this.depMatched[e]=!0,this.depCount-=1,this.depExports[e]=t)},fetch:function(){if(!this.fetched){this.fetched=!0,k.startTime=(new Date).getTime();var e=this.map;if(!this.shim)return e.prefix?this.callPlugin():this.load();k.makeRequire(this.map,{enableBuildCallback:!0})(this.shim.deps||[],u(this,function(){return e.prefix?this.callPlugin():this.load()}))}},load:function(){var e=this.map.url;O[e]||(O[e]=!0,k.load(this.map.id,e))},check:function(){if(this.enabled&&!this.enabling){var i,n,r=this.map.id;n=this.depExports;var o=this.exports,a=this.factory;if(this.inited){if(this.error)this.emit("error",this.error);else if(!this.defining){if(this.defining=!0,1>this.depCount&&!this.defined){if(G(a)){if(this.events.error&&this.map.isDefine||e.onError!==ca)try{o=k.execCb(r,a,n,o)}catch(s){i=s}else o=k.execCb(r,a,n,o);if(this.map.isDefine&&void 0===o&&((n=this.module)?o=n.exports:this.usingExports&&(o=this.exports)),i)return i.requireMap=this.map,i.requireModules=this.map.isDefine?[this.map.id]:null,i.requireType=this.map.isDefine?"SCNDefine":"SCNRequire",f(this.error=i)}else o=a;this.exports=o,this.map.isDefine&&!this.ignore&&(K[r]=o,e.onResourceLoad)&&e.onResourceLoad(k,this.map,this.depMaps),l(r),this.defined=!0}this.defining=!1,this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=!0)}}else t(k.defQueueMap,r)||this.fetch()}},callPlugin:function(){var i=this.map,o=i.id,a=d(i.prefix);this.depMaps.push(a),c(a,"defined",u(this,function(a){var s,h;h=n(F,this.map.id);var m=this.map.name,g=this.map.parentMap?this.map.parentMap.name:null,v=k.makeRequire(i.parentMap,{enableBuildCallback:!0});this.map.unnormalized?(a.normalize&&(m=a.normalize(m,function(e){return r(e,g,!0)})||""),a=d(i.prefix+"!"+m,this.map.parentMap),c(a,"defined",u(this,function(e){this.init([],function(){return e},null,{enabled:!0,ignore:!0})})),(h=n(D,a.id))&&(this.depMaps.push(a),this.events.error&&h.on("error",u(this,function(e){this.emit("error",e)})),h.enable())):h?(this.map.url=k.nameToUrl(h),this.load()):(s=u(this,function(e){this.init([],function(){return e},null,{enabled:!0})}),s.error=u(this,function(e){this.inited=!0,this.error=e,e.requireModules=[o],A(D,function(e){0===e.map.id.indexOf(o+"_unnormalized")&&l(e.map.id)}),f(e)}),s.fromText=u(this,function(n,r){var a=i.name,u=d(a),c=M;r&&(n=r),c&&(M=!1),p(u),t(j.config,o)&&(j.config[a]=j.config[o]);try{e.exec(n)}catch(h){return f(B("fromtexteval","fromText eval for "+o+" failed: "+h,h,[o]))}c&&(M=!0),this.depMaps.push(u),k.completeLoad(a),v([a],s)}),a.load(i.name,v,s,j))})),k.enable(a,this),this.pluginMaps[a.id]=a},enable:function(){L[this.map.id]=this,this.enabling=this.enabled=!0,v(this.depMaps,u(this,function(e,i){var r,o;if("string"==typeof e){if(e=d(e,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap),this.depMaps[i]=e,r=n(q,e.id))return this.depExports[i]=r(this),void 0;this.depCount+=1,c(e,"defined",u(this,function(e){this.undefed||(this.defineDep(i,e),this.check())})),this.errback?c(e,"error",u(this,this.errback)):this.events.error&&c(e,"error",u(this,function(e){this.emit("error",e)}))}r=e.id,o=D[r],!t(q,r)&&o&&!o.enabled&&k.enable(e,this)})),A(this.pluginMaps,u(this,function(e){var t=n(D,e.id);t&&!t.enabled&&k.enable(e,this)})),this.enabling=!1,this.check()},on:function(e,t){var i=this.events[e];i||(i=this.events[e]=[]),i.push(t)},emit:function(e,t){v(this.events[e],function(e){e(t)}),"error"===e&&delete this.events[e]}},k={config:j,contextName:i,registry:D,defined:K,urlFetched:O,defQueue:P,defQueueMap:{},Module:y,makeModuleMap:d,nextTick:e.nextTick,onError:f,configure:function(e){e.baseUrl&&"/"!==e.baseUrl.charAt(e.baseUrl.length-1)&&(e.baseUrl+="/");var t=j.shim,i={paths:!0,bundles:!0,config:!0,map:!0};A(e,function(e,t){i[t]?(j[t]||(j[t]={}),U(j[t],e,!0,!0)):j[t]=e}),e.bundles&&A(e.bundles,function(e,t){v(e,function(e){e!==t&&(F[e]=t)})}),e.shim&&(A(e.shim,function(e,i){H(e)&&(e={deps:e}),!e.exports&&!e.init||e.exportsFn||(e.exportsFn=k.makeShimExports(e)),t[i]=e}),j.shim=t),e.packages&&v(e.packages,function(e){var t,e="string"==typeof e?{name:e}:e;t=e.name,e.location&&(j.paths[t]=e.location),j.pkgs[t]=e.name+"/"+(e.main||"main").replace(ha,"").replace(Q,"")}),A(D,function(e,t){!e.inited&&!e.map.unnormalized&&(e.map=d(t,null,!0))}),(e.deps||e.callback)&&k.SCNRequire(e.deps||[],e.callback)},makeShimExports:function(e){return function(){var t;return e.init&&(t=e.init.apply(ba,arguments)),t||e.exports&&da(e.exports)}},makeRequire:function(a,s){function u(n,r,o){var c,h;return s.enableBuildCallback&&r&&G(r)&&(r.__requireJsBuild=!0),"string"==typeof n?G(r)?f(B("requireargs","Invalid SCNRequire call"),o):a&&t(q,n)?q[n](D[a.id]):e.get?e.get(k,n,a,u):(c=d(n,a,!1,!0),c=c.id,t(K,c)?K[c]:f(B("notloaded",'Module name "'+c+'" has not been loaded yet for context: '+i+(a?"":". Use SCNRequire([])")))):(C(),k.nextTick(function(){C(),h=p(d(null,a)),h.skipMap=s.skipMap,h.init(n,r,o,{enabled:!0}),g()}),u)}return s=s||{},U(u,{isBrowser:z,toUrl:function(e){var t,i=e.lastIndexOf("."),n=e.split("/")[0];return-1!==i&&("."!==n&&".."!==n||i>1)&&(t=e.substring(i,e.length),e=e.substring(0,i)),k.nameToUrl(r(e,a&&a.id,!0),t,!0)},defined:function(e){return t(K,d(e,a,!1,!0).id)},specified:function(e){return e=d(e,a,!1,!0).id,t(K,e)||t(D,e)}}),a||(u.undef=function(e){h();var t=d(e,a,!0),i=n(D,e);i.undefed=!0,o(e),delete K[e],delete O[t.url],delete w[e],T(P,function(t,i){t[0]===e&&P.splice(i,1)}),delete k.defQueueMap[e],i&&(i.events.defined&&(w[e]=i.events),l(e))}),u},enable:function(e){n(D,e.id)&&p(e).enable()},completeLoad:function(e){var i,r,o=n(j.shim,e)||{},s=o.exports;for(h();P.length;){if(r=P.shift(),null===r[0]){if(r[0]=e,i)break;i=!0}else r[0]===e&&(i=!0);S(r)}if(k.defQueueMap={},r=n(D,e),!i&&!t(K,e)&&r&&!r.inited){if(j.enforceDefine&&(!s||!da(s)))return a(e)?void 0:f(B("nodefine","No SCNDefine call for "+e,null,[e]));S([e,o.deps||[],o.exportsFn])}g()},nameToUrl:function(t,i,r){var o,a,s;if((o=n(j.pkgs,t))&&(t=o),o=n(F,t))return k.nameToUrl(o,i,r);if(e.jsExtRegExp.test(t))o=t+(i||"");else{for(o=j.paths,t=t.split("/"),a=t.length;a>0;a-=1)if(s=t.slice(0,a).join("/"),s=n(o,s)){H(s)&&(s=s[0]),t.splice(0,a,s);break}o=t.join("/"),o+=i||(/^data\:|\?/.test(o)||r?"":".js"),o=("/"===o.charAt(0)||o.match(/^[\w\+\.\-]+:/)?"":j.baseUrl)+o}return j.urlArgs?o+((-1===o.indexOf("?")?"?":"&")+j.urlArgs):o},load:function(t,i){e.load(k,t,i)},execCb:function(e,t,i,n){return t.apply(n,i)},onScriptLoad:function(e){("load"===e.type||ia.test((e.currentTarget||e.srcElement).readyState))&&(N=null,e=b(e),k.completeLoad(e.id))},onScriptError:function(e){var t=b(e);return a(t.id)?void 0:f(B("scripterror","Script error for: "+t.id,e,[t.id]))}},k.SCNRequire=k.makeRequire(),k}var e,x,y,D,I,E,N,J,r,O,ja=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,ka=/[^.]\s*SCNRequire\s*\(\s*["']([^'"\s]+)["']\s*\)/g,Q=/\.js$/,ha=/^\.\//;x=Object.prototype;var K=x.toString,fa=x.hasOwnProperty,z=!("undefined"==typeof window||"undefined"==typeof navigator||!window.document),ea=!z&&"undefined"!=typeof importScripts,ia=z&&"PLAYSTATION 3"===navigator.platform?/^complete$/:/^(complete|loaded)$/,Y="undefined"!=typeof opera&&"[object Opera]"===opera.toString(),F={},s={},R=[],M=!1;if("undefined"==typeof SCNDefine){if("undefined"!=typeof SCNRequirejs){if(G(SCNRequirejs))return;s=SCNRequirejs,SCNRequirejs=void 0}"undefined"!=typeof SCNRequire&&!G(SCNRequire)&&(s=SCNRequire,SCNRequire=void 0),e=SCNRequirejs=function(t,i,r,o){var a,s="_";return!H(t)&&"string"!=typeof t&&(a=t,H(i)?(t=i,i=r,r=o):t=[]),a&&a.context&&(s=a.context),(o=n(F,s))||(o=F[s]=e.s.newContext(s)),a&&o.configure(a),o.SCNRequire(t,i,r)},e.config=function(t){return e(t)},e.nextTick="undefined"!=typeof setTimeout?function(e){setTimeout(e,4)}:function(e){e()},SCNRequire||(SCNRequire=e),e.version="2.1.20",e.jsExtRegExp=/^\/|:|\?|\.js$/,e.isBrowser=z,x=e.s={contexts:F,newContext:ga},e({}),v(["toUrl","undef","defined","specified"],function(t){e[t]=function(){var e=F._;return e.SCNRequire[t].apply(e,arguments)}}),z&&(y=x.head=document.getElementsByTagName("head")[0],D=document.getElementsByTagName("base")[0])&&(y=x.head=D.parentNode),e.onError=ca,e.createNode=function(e){var t=e.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script");return t.type=e.scriptType||"text/javascript",t.charset="utf-8",t.async=!0,t},e.load=function(t,i,n){var r,o=t&&t.config||{};if(z)return r=e.createNode(o,i,n),o.onNodeCreated&&o.onNodeCreated(r,o,i,n),r.setAttribute("data-requirecontext",t.contextName),r.setAttribute("data-requiremodule",i),!r.attachEvent||r.attachEvent.toString&&0>r.attachEvent.toString().indexOf("[native code")||Y?(r.addEventListener("load",t.onScriptLoad,!1),r.addEventListener("error",t.onScriptError,!1)):(M=!0,r.attachEvent("onreadystatechange",t.onScriptLoad)),r.src=n,J=r,D?y.insertBefore(r,D):y.appendChild(r),J=null,r;if(ea)try{importScripts(n),t.completeLoad(i)}catch(a){t.onError(B("importscripts","importScripts failed for "+i+" at "+n,a,[i]))}},z&&!s.skipDataMain&&T(document.getElementsByTagName("script"),function(t){return y||(y=t.parentNode),(I=t.getAttribute("data-main"))?(r=I,s.baseUrl||(E=r.split("/"),r=E.pop(),O=E.length?E.join("/")+"/":"./",s.baseUrl=O),r=r.replace(Q,""),e.jsExtRegExp.test(r)&&(r=I),s.deps=s.deps?s.deps.concat(r):[r],!0):void 0}),SCNDefine=function(e,t,i){var n,r;"string"!=typeof e&&(i=t,t=e,e=null),H(t)||(i=t,t=null),!t&&G(i)&&(t=[],i.length&&(i.toString().replace(ja,"").replace(ka,function(e,i){t.push(i)}),t=(1===i.length?["SCNRequire"]:["SCNRequire","exports","module"]).concat(t))),M&&((n=J)||(N&&"interactive"===N.readyState||T(document.getElementsByTagName("script"),function(e){return"interactive"===e.readyState?N=e:void 0}),n=N),n&&(e||(e=n.getAttribute("data-requiremodule")),r=F[n.getAttribute("data-requirecontext")])),r?(r.defQueue.push([e,t,i]),r.defQueueMap[e]=!0):R.push([e,t,i])},SCNDefine.amd={jQuery:!0},e.exec=function(b){return eval(b)},e(s)}}(this),"undefined"==typeof SCN.Loader){var _requirejs;_requirejs="undefined"!=typeof SCNRequirejs?SCNRequirejs:requirejs,SCN.Loader=function(){var e={};return e.loaded=!1,e.apiKey=null,e.load=function(){_requirejs.config({paths:{"global-setting":SCN.Backend.settingScriptPath,"beeketing-sdk":SCN.Loader.getBeeketingSDKPath(),"beeketing-shop-script":SCN.Loader.getShopScriptPath(),"beeketing-main-script":SCN.Loader.getAssetUrl(SCN.Backend.baseJsPath)},shim:{"beeketing-main-script":["beeketing-sdk","beeketing-shop-script","global-setting"]},waitSeconds:30}),_requirejs(["beeketing-main-script"],function(){BeeketingSDK.init(SCN.Config.apiKey,SCN.Backend.restApiBasePath),SCN.Loader.runAfterLoadedMainScript()})},e.getBeeketingSDKPath=function(){return e.getAssetUrl("dist/js/beeketing-sdk/sdk.js")},e.getShopScriptPath=function(){var e;return e=this.apiKey?SCN.Backend.shopApiKeyScriptPath+this.encodeShopDomain(this.apiKey):SCN.Backend.shopScriptPath+this.encodeShopDomain(SCN.Config.shopDomain)},e.getAssetUrl=function(e){var t;return t="string"==typeof e&&e?SCN.Backend.assetsPath+"/"+e.replace(/^\//,"")+"?v="+SCN.Backend.assetsVersion:""},e.addParameterToURL=function(e,t,i){var n=new RegExp("([?&])"+t+"=.*?(&|$)","i"),r=-1!==e.indexOf("?")?"&":"?";return e.match(n)?e.replace(n,"$1"+t+"="+i+"$2"):e+r+t+"="+i},e.encodeShopDomain=function(e){return btoa(e).replace(/\//g,"-")},e.setApiKey=function(e){this.apiKey=e},e}()}"undefined"!=typeof BKShopApiKey&&SCN.Loader.setApiKey(BKShopApiKey),0==SCN.Loader.loaded&&(SCN.Loader.load(),SCN.Loader.loaded=!0);