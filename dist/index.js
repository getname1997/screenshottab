var e,t,n=(e=function(e){!function(t){var n=function(){return{escape:function(e){return e.replace(/([.*+?^${}()|\[\]\/\\])/g,"\\$1")},parseExtension:t,mimeType:function(e){var n,r,o=t(e).toLowerCase();return(n="application/font-woff",r="image/jpeg",{woff:n,woff2:n,ttf:"application/font-truetype",eot:"application/vnd.ms-fontobject",png:"image/png",jpg:r,jpeg:r,gif:"image/gif",tiff:"image/tiff",svg:"image/svg+xml"})[o]||""},dataAsUrl:function(e,t){return"data:"+t+";base64,"+e},isDataUrl:function(e){return-1!==e.search(/^(data:)/)},canvasToBlob:function(e){return e.toBlob?new Promise((function(t){e.toBlob(t)})):function(e){return new Promise((function(t){for(var n=window.atob(e.toDataURL().split(",")[1]),r=n.length,o=new Uint8Array(r),i=0;i<r;i++)o[i]=n.charCodeAt(i);t(new Blob([o],{type:"image/png"}))}))}(e)},resolveUrl:function(e,t){var n=document.implementation.createHTMLDocument(),r=n.createElement("base");n.head.appendChild(r);var o=n.createElement("a");return n.body.appendChild(o),r.href=t,o.href=e,o.href},getAndEncode:function(e){var t=3e4;return u.impl.options.cacheBust&&(e+=(/\?/.test(e)?"&":"?")+(new Date).getTime()),new Promise((function(n){var r,o=new XMLHttpRequest;if(o.onreadystatechange=c,o.ontimeout=l,o.responseType="blob",o.timeout=t,o.open("GET",e,!0),o.send(),u.impl.options.imagePlaceholder){var i=u.impl.options.imagePlaceholder.split(/,/);i&&i[1]&&(r=i[1])}function c(){if(4===o.readyState)if(200===o.status){var t=new FileReader;t.onloadend=function(){var e=t.result.split(/,/)[1];n(e)},t.readAsDataURL(o.response)}else r?n(r):a("cannot fetch resource: "+e+", status: "+o.status)}function l(){r?n(r):a("timeout of "+t+"ms occured while fetching resource: "+e)}function a(e){console.error(e),n("")}}))},uid:(e=0,function(){return"u"+t()+e++;function t(){return("0000"+(Math.random()*Math.pow(36,4)<<0).toString(36)).slice(-4)}}),delay:function(e){return function(t){return new Promise((function(n){setTimeout((function(){n(t)}),e)}))}},asArray:function(e){for(var t=[],n=e.length,r=0;r<n;r++)t.push(e[r]);return t},escapeXhtml:function(e){return e.replace(/#/g,"%23").replace(/\n/g,"%0A")},makeImage:function(e){return new Promise((function(t,n){var r=new Image;r.onload=function(){t(r)},r.onerror=n,r.src=e}))},width:function(e){var t=n(e,"border-left-width"),r=n(e,"border-right-width");return e.scrollWidth+t+r},height:function(e){var t=n(e,"border-top-width"),r=n(e,"border-bottom-width");return e.scrollHeight+t+r}};var e;function t(e){var t=/\.([^\.\/]*?)$/g.exec(e);return t?t[1]:""}function n(e,t){var n=window.getComputedStyle(e).getPropertyValue(t);return parseFloat(n.replace("px",""))}}(),r=function(){var e=/url\(['"]?([^'"]+?)['"]?\)/g;return{inlineAll:function(e,n,i){return c()?Promise.resolve(e):Promise.resolve(e).then(r).then((function(t){var r=Promise.resolve(e);return t.forEach((function(e){r=r.then((function(t){return o(t,e,n,i)}))})),r}));function c(){return!t(e)}},shouldProcess:t,impl:{readUrls:r,inline:o}};function t(t){return-1!==t.search(e)}function r(t){for(var r,o=[];null!==(r=e.exec(t));)o.push(r[1]);return o.filter((function(e){return!n.isDataUrl(e)}))}function o(e,t,r,o){return Promise.resolve(t).then((function(e){return r?n.resolveUrl(e,r):e})).then(o||n.getAndEncode).then((function(e){return n.dataAsUrl(e,n.mimeType(t))})).then((function(r){return e.replace(function(e){return new RegExp("(url\\(['\"]?)("+n.escape(e)+")(['\"]?\\))","g")}(t),"$1"+r+"$3")}))}}(),o=function(){return{resolveAll:function(){return e().then((function(e){return Promise.all(e.map((function(e){return e.resolve()})))})).then((function(e){return e.join("\n")}))},impl:{readAll:e}};function e(){return Promise.resolve(n.asArray(document.styleSheets)).then((function(e){var t=[];return e.forEach((function(e){try{n.asArray(e.cssRules||[]).forEach(t.push.bind(t))}catch(t){console.log("Error while reading CSS rules from "+e.href,t.toString())}})),t})).then((function(e){return e.filter((function(e){return e.type===CSSRule.FONT_FACE_RULE})).filter((function(e){return r.shouldProcess(e.style.getPropertyValue("src"))}))})).then((function(t){return t.map(e)}));function e(e){return{resolve:function(){var t=(e.parentStyleSheet||{}).href;return r.inlineAll(e.cssText,t)},src:function(){return e.style.getPropertyValue("src")}}}}}(),i=function(){return{inlineAll:function t(o){return o instanceof Element?i(o).then((function(){return o instanceof HTMLImageElement?e(o).inline():Promise.all(n.asArray(o.childNodes).map((function(e){return t(e)})))})):Promise.resolve(o);function i(e){var t=e.style.getPropertyValue("background");return t?r.inlineAll(t).then((function(t){e.style.setProperty("background",t,e.style.getPropertyPriority("background"))})).then((function(){return e})):Promise.resolve(e)}},impl:{newImage:e}};function e(e){return{inline:function(t){return n.isDataUrl(e.src)?Promise.resolve():Promise.resolve(e.src).then(t||n.getAndEncode).then((function(t){return n.dataAsUrl(t,n.mimeType(e.src))})).then((function(t){return new Promise((function(n,r){e.onload=n,e.onerror=r,e.src=t}))}))}}}}(),c={imagePlaceholder:void 0,cacheBust:!1},u={toSvg:l,toPng:function(e,t){return a(e,t||{}).then((function(e){return e.toDataURL()}))},toJpeg:function(e,t){return a(e,t=t||{}).then((function(e){return e.toDataURL("image/jpeg",t.quality||1)}))},toBlob:function(e,t){return a(e,t||{}).then(n.canvasToBlob)},toPixelData:function(e,t){return a(e,t||{}).then((function(t){return t.getContext("2d").getImageData(0,0,n.width(e),n.height(e)).data}))},impl:{fontFaces:o,images:i,util:n,inliner:r,options:{}}};function l(e,t){return function(e){void 0===e.imagePlaceholder?u.impl.options.imagePlaceholder=c.imagePlaceholder:u.impl.options.imagePlaceholder=e.imagePlaceholder,void 0===e.cacheBust?u.impl.options.cacheBust=c.cacheBust:u.impl.options.cacheBust=e.cacheBust}(t=t||{}),Promise.resolve(e).then((function(e){return s(e,t.filter,!0)})).then(h).then(f).then((function(e){return t.bgcolor&&(e.style.backgroundColor=t.bgcolor),t.width&&(e.style.width=t.width+"px"),t.height&&(e.style.height=t.height+"px"),t.style&&Object.keys(t.style).forEach((function(n){e.style[n]=t.style[n]})),e})).then((function(r){return function(e,t,r){return Promise.resolve(e).then((function(e){return e.setAttribute("xmlns","http://www.w3.org/1999/xhtml"),(new XMLSerializer).serializeToString(e)})).then(n.escapeXhtml).then((function(e){return'<foreignObject x="0" y="0" width="100%" height="100%">'+e+"</foreignObject>"})).then((function(e){return'<svg xmlns="http://www.w3.org/2000/svg" width="'+t+'" height="'+r+'">'+e+"</svg>"})).then((function(e){return"data:image/svg+xml;charset=utf-8,"+e}))}(r,t.width||n.width(e),t.height||n.height(e))}))}function a(e,t){return l(e,t).then(n.makeImage).then(n.delay(100)).then((function(r){var o=function(e){var r=document.createElement("canvas");if(r.width=t.width||n.width(e),r.height=t.height||n.height(e),t.bgcolor){var o=r.getContext("2d");o.fillStyle=t.bgcolor,o.fillRect(0,0,r.width,r.height)}return r}(e);return o.getContext("2d").drawImage(r,0,0),o}))}function s(e,t,r){return r||!t||t(e)?Promise.resolve(e).then((function(e){return e instanceof HTMLCanvasElement?n.makeImage(e.toDataURL()):e.cloneNode(!1)})).then((function(r){return function(e,t,r){var o=e.childNodes;return 0===o.length?Promise.resolve(t):i(t,n.asArray(o),r).then((function(){return t}));function i(e,t,n){var r=Promise.resolve();return t.forEach((function(t){r=r.then((function(){return s(t,n)})).then((function(t){t&&e.appendChild(t)}))})),r}}(e,r,t)})).then((function(t){return function(e,t){return t instanceof Element?Promise.resolve().then(r).then(o).then(i).then(c).then((function(){return t})):t;function r(){function r(e,t){function r(e,t){n.asArray(e).forEach((function(n){t.setProperty(n,e.getPropertyValue(n),e.getPropertyPriority(n))}))}e.cssText?t.cssText=e.cssText:r(e,t)}r(window.getComputedStyle(e),t.style)}function o(){function r(r){var o=window.getComputedStyle(e,r),i=o.getPropertyValue("content");if(""!==i&&"none"!==i){var c=n.uid();t.className=t.className+" "+c;var u=document.createElement("style");u.appendChild(l(c,r,o)),t.appendChild(u)}function l(e,t,r){var o="."+e+":"+t,i=r.cssText?c(r):u(r);return document.createTextNode(o+"{"+i+"}");function c(e){var t=e.getPropertyValue("content");return e.cssText+" content: "+t+";"}function u(e){return n.asArray(e).map(t).join("; ")+";";function t(t){return t+": "+e.getPropertyValue(t)+(e.getPropertyPriority(t)?" !important":"")}}}}[":before",":after"].forEach((function(e){r(e)}))}function i(){e instanceof HTMLTextAreaElement&&(t.innerHTML=e.value),e instanceof HTMLInputElement&&t.setAttribute("value",e.value)}function c(){t instanceof SVGElement&&(t.setAttribute("xmlns","http://www.w3.org/2000/svg"),t instanceof SVGRectElement&&["width","height"].forEach((function(e){var n=t.getAttribute(e);n&&t.style.setProperty(e,n)})))}}(e,t)})):Promise.resolve()}function h(e){return o.resolveAll().then((function(t){var n=document.createElement("style");return e.appendChild(n),n.appendChild(document.createTextNode(t)),e}))}function f(e){return i.inlineAll(e).then((function(){return e}))}e.exports=u}()},e(t={exports:{}},t.exports),t.exports);let r=null;const o=[],i=e=>{o.forEach((t=>{if(t.left<=e.x&&t.right>=e.x&&t.top<=e.y&&t.bottom>=e.y){const e=document.querySelector(".domBorder");e&&e.remove(),r=document.createElement("div"),r.style.position="fixed",r.className="domBorder",r.style.top=t.top+"px",r.style.left=t.left+"px",r.style.width=t.right-t.left+"px",r.style.height=t.bottom-t.top+"px",r.style.border="1px solid blue",document.body.appendChild(r)}}))},c=e=>{document.onmousemove=t=>{e.target.style.top=t.clientY+"px",e.target.style.left=t.clientX-50+"px"},document.onmouseup=u},u=e=>{i({x:e.clientX,y:e.clientY}),document.onmousemove=null,document.onmouseup=null},l=e=>{document.ontouchmove=t=>{e.target.style.top=t.touches[0].clientY+"px",e.target.style.left=t.touches[0].clientX-50+"px"},document.ontouchend=e=>{i({x:e.changedTouches[0].clientX,y:e.changedTouches[0].clientY}),document.ontouchmove=null,document.ontouchend=null}},a=(e,t="")=>{(e=>{n.toPng(e).then((e=>{const t=new Image;t.src=e,t.style.position="fixed",t.style.top=String(0),t.style.left=String(0),t.style.width="100vw",t.draggable=!1,t.style.height="100vh",document.body.appendChild(t)}))})(e);document.querySelectorAll(t).forEach((e=>{const t=e.getBoundingClientRect();o.push({bottom:t.bottom,left:t.left,right:t.right,top:t.top})}));const r=new Image;r.src="data:image/svg+xml,%3c%3fxml version='1.0' standalone='no'%3f%3e%3c!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3e%3csvg t='1678093561359' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='4710' xmlns:xlink='http://www.w3.org/1999/xlink' width='200' height='200'%3e%3cpath d='M928 589.76v211.52c0 70.72-57.28 128-128 128h-298.88c-33.92 0-66.56-13.44-90.56-37.44l-227.84-227.84a77.312 77.312 0 0 1 0-109.44 103.904 103.904 0 0 1 146.56 0L384 609.28V177.28a80 80 0 0 1 88.32-79.68c41.6 4.16 71.68 42.24 71.68 84.16v235.52l277.12 46.08c61.76 10.24 106.88 63.68 106.88 126.4z' fill='%23EDF6FF' p-id='4711'%3e%3c/path%3e%3cpath d='M820.8 463.36L544 417.28V181.76c0-6.4-0.96-12.8-2.24-19.2-1.92-0.32-3.52-0.96-5.44-0.96A80 80 0 0 0 448 241.28V611.2c0 56.64-68.48 85.44-108.8 45.76l-45.12-44.48s-21.44-18.88-47.36 6.08c-15.36 14.72-22.72 34.88-22.72 54.72s7.68 39.68 22.72 54.72l163.84 163.84c24 24 56.64 37.44 90.24 37.44H800c70.72 0 128-57.28 128-128v-211.52c0-62.72-45.44-116.16-107.2-126.4z' fill='%2384B5FF' p-id='4712'%3e%3c/path%3e%3cpath d='M800 960h-298.88a160.32 160.32 0 0 1-113.28-46.72L160 685.12c-20.48-20.48-32-48-32-77.12s11.2-56.64 32-77.12a135.872 135.872 0 0 1 192 0V176c0-31.68 13.44-61.76 36.8-83.2 23.36-21.12 55.04-31.68 86.72-28.48C531.84 70.4 576 121.28 576 180.48V256c0 17.6-14.4 32-32 32s-32-14.4-32-32V180.48c0-26.88-18.88-49.92-42.88-52.16-13.76-1.6-27.2 2.88-37.12 12.16-10.24 9.28-16 21.76-16 35.52V608c0 12.8-7.68 24.64-19.84 29.44-11.84 5.12-25.6 2.24-34.88-7.04L306.88 576c-28.16-28.16-73.6-28.16-101.76 0-8.32 8.64-13.12 19.84-13.12 32s4.8 23.36 13.12 32l227.84 227.84c17.92 17.92 42.56 28.16 67.84 28.16H800c52.8 0 96-43.2 96-96v-211.52c0-47.04-33.6-87.04-80.32-94.72l-277.12-46.08A32 32 0 0 1 512 416v-32c0-17.6 14.4-32 32-32s32 14.4 32 32v4.8l250.24 41.6c77.44 12.8 133.76 79.36 133.76 157.76V800c0 88.32-71.68 160-160 160zM160 352c-17.6 0-32-14.4-32-32V192c0-17.6 14.4-32 32-32s32 14.4 32 32v128c0 17.6-14.4 32-32 32z' fill='%232C67CC' p-id='4713'%3e%3c/path%3e%3cpath d='M160 352c-8.32 0-16.32-3.2-22.72-9.28l-64-64A31.872 31.872 0 1 1 118.4 233.6L160 274.88 201.28 233.6A31.872 31.872 0 1 1 246.4 278.72l-64 64c-6.08 6.08-14.08 9.28-22.4 9.28z' fill='%232C67CC' p-id='4714'%3e%3c/path%3e%3c/svg%3e",r.style.position="fixed",r.style.top="50px",r.style.width="100px",r.draggable=!1,r.style.left="50px",r.style.zIndex="10000",/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?(r.ontouchstart=l,console.log("移动端")):(r.onmousedown=c,console.log("pc端")),setTimeout((()=>{document.body.appendChild(r)}),500)};class s{constructor(e,t){a(e,t)}}export{s as Screenshot,a as screenshot};
