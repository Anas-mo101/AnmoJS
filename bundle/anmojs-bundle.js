var Anmo;(()=>{"use strict";var t={d:(e,n)=>{for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)},e={};(()=>{t.d(e,{default:()=>c});const n=class{static setToken(t){localStorage.setItem("app-auth-token",t)}static getToken(){return localStorage.getItem("app-auth-token")}static setBreakPoints(t){localStorage.setItem("app-responsive-breakpoints",JSON.stringify({mobile:`${t.mobile}px`,tablet:`${t.tablet}px`}))}static getBreakPoints(){var t;return JSON.parse(null!==(t=localStorage.getItem("app-responsive-breakpoints"))&&void 0!==t?t:"")}static setMainContainer(t){localStorage.setItem("anmo-main-container",t)}static getMainContainer(){return localStorage.getItem("anmo-main-container")}static TemporaryData(t){localStorage.setItem(`anmo-edit-project-${t.key}`,JSON.stringify(t.value))}static clearTemporaryData(t){localStorage.removeItem(`anmo-edit-project-${t}`)}static getProjectPassedData(t){const e=localStorage.getItem(`anmo-edit-project-${t}`);return this.clearTemporaryData(t),e}},o=class{constructor(){var t;if(this.routes=null!==(t=window.routes)&&void 0!==t?t:window.mainView,!this.routes)throw new Error("No Veiws Found");if(Array.isArray(this.routes)){const t=this.routes.map((t=>({route:t,result:location.pathname.match(this.pathToRegex(t.path))})));this.match=t.find((t=>null!==t.result)),this.match||(this.match={route:this.routes[0],result:[location.pathname]},history.pushState(null,"",this.routes[0].path)),this.loadMainView(this.match.route.view)}else this.loadMainView(this.routes)}loadMainView(t){var e,o;const r=null!==(e=n.getMainContainer())&&void 0!==e?e:"body";document.querySelector(r).replaceChildren();const i=(new t).getComponentHTML();null===(o=document.querySelector(r))||void 0===o||o.append(i)}pathToRegex(t){return new RegExp("^"+t.replace(/\//g,"\\/").replace(/:\w+/g,"(.+)")+"$")}static getCurrentParams(){const t=window.location.search,e=new URLSearchParams(t);return Object.fromEntries(e.entries())}static initAppRouting(t=[]){window.routes=t,window.addEventListener("popstate",(t=>new this)),window.addEventListener("resize",(t=>new this)),document.body.addEventListener("click",(t=>{const e=null==t?void 0:t.target;e.matches("[data-link]")&&(t.preventDefault(),this.navigateTo(e.href))})),new this}static initApp(t){if(!t)throw new Error("No main view found");window.mainView=t,new this}static navigateTo(t,e=null){e&&n.TemporaryData(e),history.pushState(null,"",t),new this}},r=t=>"object"==typeof Node?t instanceof Node:t&&"object"==typeof t&&"number"==typeof t.nodeType&&"string"==typeof t.nodeName,i=({tag:t,id:e,content:n,attributes:o,style:i,onTap:a,onChange:s,onInput:c,onSubmit:l})=>{let p;if(""===t||void 0===t)throw new Error("Undefined Element");if(p=document.createElement(t),e&&(p.id=e),n)if(Array.isArray(n)){let t=!0;n.forEach((e=>{r(e)&&p.appendChild(e),("string"==typeof e||e instanceof String)&&(t?t=!1:p.appendChild(document.createElement("br")),p.appendChild(document.createTextNode(e)))}))}else if("function"==typeof n){const t=(t=>{const e=t.toString();return e.toString().slice(e.toString().indexOf("{")+1,e.toString().lastIndexOf("}"))})(n);p.appendChild(document.createTextNode(t))}else r(n)?p.appendChild(n):("string"==typeof n||n instanceof String)&&p.appendChild(document.createTextNode(n));if(o&&o.forEach((t=>{let e="";t.value&&(e=Array.isArray(t.value)?t.value.join(" "):t.value),p.setAttribute(t.attribute,e)})),i)for(const[t,e]of Object.entries(i))p.style.setProperty(`${t}`,`${e}`);return"input"!==t&&"textarea"!==t||(c&&p.addEventListener("input",(t=>c())),l&&p.addEventListener("keyup",(({key:t})=>{var e;return null!==(e="Enter"===t)&&void 0!==e?e:l()}))),a&&p.addEventListener("click",(t=>a())),s&&p.addEventListener("change",(t=>s(t.target.value))),p};class a{constructor(t){this.error=t}getComponentHTML(){try{return i({tag:"div",style:{height:"100%","background-color":"rgb(239 68 68)","align-items":"center"},content:[i({tag:"div",style:{"font-size":"1.125rem","line-height":"1.75rem",color:"#000000","font-weight":"bold"},content:[i({tag:"h1",style:{"font-size":"1.125rem","line-height":"1.75rem",color:"#000000","font-weight":"bold","text-align":"center"},content:"Something went wrong !"}),this.error?i({tag:"h1",style:{"font-size":"0.875rem","line-height":"1.25rem",color:"#000000","font-weight":"bold","text-align":"center"},content:"Error: "+this.error}):null]})]})}catch(t){console.error(`ErrorComponent: ${t}`)}}}class s{constructor({style:t}={}){if(this.id=s.generateID(),this.mainCompnent=document.createElement("div"),t)for(const[e,n]of Object.entries(t))this.mainCompnent.style.setProperty(`${e}`,`${n}`)}static generateID(){return"anmo-"+Math.random().toString(36).substring(2,10)}setTitle(t){document.title=t}getComponentHTML(){return document.createElement("div")}async update(){if(!this.id)throw new Error("Component ID not found");const t=document.getElementById(this.id);if(!t)return;this.mainCompnent=document.createElement("div");const e=await this.getComponentHTML();t.replaceWith(e)}appendHTMLComponent(t){this.mainCompnent.appendChild(t)}getComponent_(){return this.mainCompnent}obs(t,e){return new Proxy({state:t},{set:(t,n,o)=>(t[n]=o,e&&e(),this.update(),!0)})}componentError(t="Error"){return new a(t).getComponentHTML()}}const c={Router:o,AppLocalStorage:n,AbstractView:s,BuildElement:i,Utils:{PopupIncubator:class extends s{constructor(){super()}incubator(){if(!this.popup)throw new Error("Popup not defined");return i({tag:"div",id:this.id,style:{"z-index":"50",position:"fixed","background-color":"rgb(115 115 115)",top:"0",left:"0",height:"100%",width:"100%","justify-content":"center","align-items":"center"},content:i({tag:"div",attributes:[{attribute:"class",value:["app-popup-main-incubator"]}],style:{position:"fixed","justify-content":"center","align-items":"center",height:"100%",width:"100%"},content:this.popup})})}displayPopup(t){this.popup=t;const e=document.querySelector(".app-popup-main-incubator");e&&e.remove();const n=this.incubator();document.querySelector("body").append(n)}hidePopup(){this.id&&document.getElementById(this.id).remove()}},Responsiveness:class{static isMobile(){return this.setByScreen(!1,!1,!0)}static isTablet(){return this.setByScreen(!1,!0,!1)}static isDesktop(){return this.setByScreen(!0,!1,!1)}static setBreakPoints(t){if(!t.mobile&&!Number.isInteger(t.mobile)&&t.mobile<0)throw new Error("Mobile breakpoint must be a positive integer");if(!t.tablet&&!Number.isInteger(t.tablet)&&t.tablet<0)throw new Error("Tablet breakpoint must be a positive integer");if(t.mobile>=t.tablet)throw new Error("Mobile breakpoint must be smaller than tablet breakpoint");n.setBreakPoints(t)}static setByScreen(t,e,o){let r=n.getBreakPoints();if(!(null==r?void 0:r.mobile)||!(null==r?void 0:r.tablet))throw new Error("Breakpoints not set");const i=window.matchMedia(`(max-width: ${r.mobile})`),a=window.matchMedia(`(max-width: ${r.tablet})`);return i.matches?o:a.matches?e:t}}},initApp:t=>{Array.isArray(t)?o.initAppRouting(t):o.initApp(t)},setBreakPoints:t=>{n.setBreakPoints(t)},setMainContainer:t=>{n.setMainContainer(t)}}})(),Anmo=e.default})();