window.Modernizr=function(a,b,c){function d(a){q.cssText=a}function e(a,b){return d(u.join(a+";")+(b||""))}function f(a,b){return typeof a===b}function g(a,b){return!!~(""+a).indexOf(b)}function h(a,b){for(var d in a){var e=a[d];if(!g(e,"-")&&q[e]!==c)return"pfx"!=b||e}return!1}function i(a,b,d){for(var e in a){var g=b[a[e]];if(g!==c)return!1===d?a[e]:f(g,"function")?g.bind(d||b):g}return!1}function j(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+w.join(d+" ")+d).split(" ");return f(b,"string")||f(b,"undefined")?h(e,b):(e=(a+" "+x.join(d+" ")+d).split(" "),i(e,b,c))}var k,l,m={},n=b.documentElement,o="modernizr",p=b.createElement(o),q=p.style,r=b.createElement("input"),s=":)",t={}.toString,u=" -webkit- -moz- -o- -ms- ".split(" "),v="Webkit Moz O ms",w=v.split(" "),x=v.toLowerCase().split(" "),y={svg:"http://www.w3.org/2000/svg"},z={},A={},B={},C=[],D=C.slice,E=function(a,c,d,e){var f,g,h,i,j=b.createElement("div"),k=b.body,l=k||b.createElement("body");if(parseInt(d,10))for(;d--;)h=b.createElement("div"),h.id=e?e[d]:o+(d+1),j.appendChild(h);return f=["&#173;",'<style id="s',o,'">',a,"</style>"].join(""),j.id=o,(k?j:l).innerHTML+=f,l.appendChild(j),k||(l.style.background="",l.style.overflow="hidden",i=n.style.overflow,n.style.overflow="hidden",n.appendChild(l)),g=c(j,a),k?j.parentNode.removeChild(j):(l.parentNode.removeChild(l),n.style.overflow=i),!!g},F=function(b){var c=a.matchMedia||a.msMatchMedia;if(c)return c(b)&&c(b).matches||!1;var d;return E("@media "+b+" { #"+o+" { position: absolute; } }",function(b){d="absolute"==(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle).position}),d},G=function(){function a(a,e){e=e||b.createElement(d[a]||"div"),a="on"+a;var g=a in e;return g||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(a,""),g=f(e[a],"function"),f(e[a],"undefined")||(e[a]=c),e.removeAttribute(a))),e=null,g}var d={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return a}(),H={}.hasOwnProperty;l=f(H,"undefined")||f(H.call,"undefined")?function(a,b){return b in a&&f(a.constructor.prototype[b],"undefined")}:function(a,b){return H.call(a,b)},Function.prototype.bind||(Function.prototype.bind=function(a){var b=this;if("function"!=typeof b)throw new TypeError;var c=D.call(arguments,1),d=function(){if(this instanceof d){var e=function(){};e.prototype=b.prototype;var f=new e,g=b.apply(f,c.concat(D.call(arguments)));return Object(g)===g?g:f}return b.apply(a,c.concat(D.call(arguments)))};return d}),z.flexbox=function(){return j("flexWrap")},z.flexboxlegacy=function(){return j("boxDirection")},z.canvas=function(){var a=b.createElement("canvas");return!(!a.getContext||!a.getContext("2d"))},z.canvastext=function(){return!(!m.canvas||!f(b.createElement("canvas").getContext("2d").fillText,"function"))},z.webgl=function(){return!!a.WebGLRenderingContext},z.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:E(["@media (",u.join("touch-enabled),("),o,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=9===a.offsetTop}),c},z.geolocation=function(){return"geolocation"in navigator},z.postmessage=function(){return!!a.postMessage},z.websqldatabase=function(){return!!a.openDatabase},z.indexedDB=function(){return!!j("indexedDB",a)},z.hashchange=function(){return G("hashchange",a)&&(b.documentMode===c||b.documentMode>7)},z.history=function(){return!(!a.history||!history.pushState)},z.draganddrop=function(){var a=b.createElement("div");return"draggable"in a||"ondragstart"in a&&"ondrop"in a},z.websockets=function(){return"WebSocket"in a||"MozWebSocket"in a},z.rgba=function(){return d("background-color:rgba(150,255,150,.5)"),g(q.backgroundColor,"rgba")},z.hsla=function(){return d("background-color:hsla(120,40%,100%,.5)"),g(q.backgroundColor,"rgba")||g(q.backgroundColor,"hsla")},z.multiplebgs=function(){return d("background:url(https://),url(https://),red url(https://)"),/(url\s*\(.*?){3}/.test(q.background)},z.backgroundsize=function(){return j("backgroundSize")},z.borderimage=function(){return j("borderImage")},z.borderradius=function(){return j("borderRadius")},z.boxshadow=function(){return j("boxShadow")},z.textshadow=function(){return""===b.createElement("div").style.textShadow},z.opacity=function(){return e("opacity:.55"),/^0.55$/.test(q.opacity)},z.cssanimations=function(){return j("animationName")},z.csscolumns=function(){return j("columnCount")},z.cssgradients=function(){var a="background-image:";return d((a+"-webkit- ".split(" ").join("gradient(linear,left top,right bottom,from(#9f9),to(white));"+a)+u.join("linear-gradient(left top,#9f9, white);"+a)).slice(0,-a.length)),g(q.backgroundImage,"gradient")},z.cssreflections=function(){return j("boxReflect")},z.csstransforms=function(){return!!j("transform")},z.csstransforms3d=function(){var a=!!j("perspective");return a&&"webkitPerspective"in n.style&&E("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(b,c){a=9===b.offsetLeft&&3===b.offsetHeight}),a},z.csstransitions=function(){return j("transition")},z.fontface=function(){var a;return E('@font-face {font-family:"font";src:url("https://")}',function(c,d){var e=b.getElementById("smodernizr"),f=e.sheet||e.styleSheet,g=f?f.cssRules&&f.cssRules[0]?f.cssRules[0].cssText:f.cssText||"":"";a=/src/i.test(g)&&0===g.indexOf(d.split(" ")[0])}),a},z.generatedcontent=function(){var a;return E(["#",o,"{font:0/0 a}#",o,':after{content:"',s,'";visibility:hidden;font:3px/1 a}'].join(""),function(b){a=b.offsetHeight>=3}),a},z.video=function(){var a=b.createElement("video"),c=!1;try{(c=!!a.canPlayType)&&(c=new Boolean(c),c.ogg=a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),c.h264=a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),c.webm=a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""))}catch(a){}return c},z.audio=function(){var a=b.createElement("audio"),c=!1;try{(c=!!a.canPlayType)&&(c=new Boolean(c),c.ogg=a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),c.mp3=a.canPlayType("audio/mpeg;").replace(/^no$/,""),c.wav=a.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),c.m4a=(a.canPlayType("audio/x-m4a;")||a.canPlayType("audio/aac;")).replace(/^no$/,""))}catch(a){}return c},z.localstorage=function(){try{return localStorage.setItem(o,o),localStorage.removeItem(o),!0}catch(a){return!1}},z.sessionstorage=function(){try{return sessionStorage.setItem(o,o),sessionStorage.removeItem(o),!0}catch(a){return!1}},z.webworkers=function(){return!!a.Worker},z.applicationcache=function(){return!!a.applicationCache},z.svg=function(){return!!b.createElementNS&&!!b.createElementNS(y.svg,"svg").createSVGRect},z.inlinesvg=function(){var a=b.createElement("div");return a.innerHTML="<svg/>",(a.firstChild&&a.firstChild.namespaceURI)==y.svg},z.smil=function(){return!!b.createElementNS&&/SVGAnimate/.test(t.call(b.createElementNS(y.svg,"animate")))},z.svgclippaths=function(){return!!b.createElementNS&&/SVGClipPath/.test(t.call(b.createElementNS(y.svg,"clipPath")))};for(var I in z)l(z,I)&&(k=I.toLowerCase(),m[k]=z[I](),C.push((m[k]?"":"no-")+k));return m.input||function(){m.input=function(c){for(var d=0,e=c.length;d<e;d++)B[c[d]]=!!(c[d]in r);return B.list&&(B.list=!(!b.createElement("datalist")||!a.HTMLDataListElement)),B}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),m.inputtypes=function(a){for(var d,e,f,g=0,h=a.length;g<h;g++)r.setAttribute("type",e=a[g]),d="text"!==r.type,d&&(r.value=s,r.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(e)&&r.style.WebkitAppearance!==c?(n.appendChild(r),f=b.defaultView,d=f.getComputedStyle&&"textfield"!==f.getComputedStyle(r,null).WebkitAppearance&&0!==r.offsetHeight,n.removeChild(r)):/^(search|tel)$/.test(e)||(d=/^(url|email)$/.test(e)?r.checkValidity&&!1===r.checkValidity():r.value!=s)),A[a[g]]=!!d;return A}("search tel url email datetime date month week time datetime-local number range color".split(" "))}(),m.addTest=function(a,b){if("object"==typeof a)for(var d in a)l(a,d)&&m.addTest(d,a[d]);else{if(a=a.toLowerCase(),m[a]!==c)return m;b="function"==typeof b?b():b,n.className+=" "+(b?"":"no-")+a,m[a]=b}return m},d(""),p=r=null,function(a,b){function c(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function d(){var a=r.elements;return"string"==typeof a?a.split(" "):a}function e(a){var b=q[a[o]];return b||(b={},p++,a[o]=p,q[p]=b),b}function f(a,c,d){if(c||(c=b),k)return c.createElement(a);d||(d=e(c));var f;return f=d.cache[a]?d.cache[a].cloneNode():n.test(a)?(d.cache[a]=d.createElem(a)).cloneNode():d.createElem(a),!f.canHaveChildren||m.test(a)||f.tagUrn?f:d.frag.appendChild(f)}function g(a,c){if(a||(a=b),k)return a.createDocumentFragment();c=c||e(a);for(var f=c.frag.cloneNode(),g=0,h=d(),i=h.length;g<i;g++)f.createElement(h[g]);return f}function h(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return r.shivMethods?f(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+d().join().replace(/[\w\-]+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(r,b.frag)}function i(a){a||(a=b);var d=e(a);return!r.shivCSS||j||d.hasCSS||(d.hasCSS=!!c(a,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),k||h(a,d),a}var j,k,l=a.html5||{},m=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,n=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,o="_html5shiv",p=0,q={};!function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",j="hidden"in a,k=1==a.childNodes.length||function(){b.createElement("a");var a=b.createDocumentFragment();return void 0===a.cloneNode||void 0===a.createDocumentFragment||void 0===a.createElement}()}catch(a){j=!0,k=!0}}();var r={elements:l.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:"3.7.0",shivCSS:!1!==l.shivCSS,supportsUnknownElements:k,shivMethods:!1!==l.shivMethods,type:"default",shivDocument:i,createElement:f,createDocumentFragment:g};a.html5=r,i(b)}(this,b),m._version="2.8.3",m._prefixes=u,m._domPrefixes=x,m._cssomPrefixes=w,m.mq=F,m.hasEvent=G,m.testProp=function(a){return h([a])},m.testAllProps=j,m.testStyles=E,m.prefixed=function(a,b,c){return b?j(a,b,c):j(a,"pfx")},n.className=n.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+" js "+C.join(" "),m}(this,this.document);