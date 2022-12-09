var Anmo;(()=>{"use strict";var t={d:(e,i)=>{for(var n in i)t.o(i,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:i[n]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)},e={};(()=>{t.d(e,{default:()=>l});const i=class{static setToken(t){localStorage.setItem("app-auth-token",t)}static getToken(){return localStorage.getItem("app-auth-token")}static setBreakPoints(t){localStorage.setItem("app-responsive-breakpoints",JSON.stringify({mobile:`${t.mobile}px`,tablet:`${t.tablet}px`}))}static getBreakPoints(){var t;return JSON.parse(null!==(t=localStorage.getItem("app-responsive-breakpoints"))&&void 0!==t?t:"")}static setMainContainer(t){localStorage.setItem("anmo-main-container",t)}static getMainContainer(){return localStorage.getItem("anmo-main-container")}static TemporaryData(t){localStorage.setItem(`anmo-edit-project-${t.key}`,JSON.stringify(t.value))}static clearTemporaryData(t){localStorage.removeItem(`anmo-edit-project-${t}`)}static getTemporaryData(t){const e=localStorage.getItem(`anmo-edit-project-${t}`);return this.clearTemporaryData(t),e}},n=class{constructor(){var t;if(this.routes=null!==(t=window.routes)&&void 0!==t?t:window.mainView,!this.routes)throw new Error("No Veiws Found");if(Array.isArray(this.routes)){const t=this.routes.map((t=>({route:t,result:location.pathname.match(this.pathToRegex(t.path))})));this.match=t.find((t=>null!==t.result)),this.match||(this.match={route:this.routes[0],result:[location.pathname]},history.pushState(null,"",this.routes[0].path)),this.loadMainView(this.match.route.view)}else this.loadMainView(this.routes)}loadMainView(t){var e,n;const o=null!==(e=i.getMainContainer())&&void 0!==e?e:"body";document.querySelector(o).replaceChildren();const r=(new t).getComponentHTML();null===(n=document.querySelector(o))||void 0===n||n.append(r)}pathToRegex(t){return new RegExp("^"+t.replace(/\//g,"\\/").replace(/:\w+/g,"(.+)")+"$")}static getCurrentParams(){const t=window.location.search,e=new URLSearchParams(t);return Object.fromEntries(e.entries())}static initAppRouting(t=[]){window.routes=t,window.addEventListener("popstate",(t=>new this)),window.addEventListener("resize",(t=>new this)),document.body.addEventListener("click",(t=>{const e=null==t?void 0:t.target;e.matches("[data-link]")&&(t.preventDefault(),this.navigateTo(e.href))})),new this}static initApp(t){if(!t)throw new Error("No main view found");window.mainView=t,new this}static navigateTo(t,e=null){e&&i.TemporaryData(e),history.pushState(null,"",t),new this}},o=t=>"object"==typeof Node?t instanceof Node:t&&"object"==typeof t&&"number"==typeof t.nodeType&&"string"==typeof t.nodeName,r=({tag:t,id:e,content:i,attributes:n,style:r,onTap:a,onChange:s,onInput:c,onSubmit:l})=>{let p;if(""===t||void 0===t)throw new Error("Undefined Element");if(p=document.createElement(t),e&&(p.id=e),i)if(Array.isArray(i)){let t=!0;i.forEach((e=>{o(e)&&p.appendChild(e),("string"==typeof e||e instanceof String)&&(t?t=!1:p.appendChild(document.createElement("br")),p.appendChild(document.createTextNode(e)))}))}else if("function"==typeof i){const t=(t=>{const e=t.toString();return e.toString().slice(e.toString().indexOf("{")+1,e.toString().lastIndexOf("}"))})(i);p.appendChild(document.createTextNode(t))}else o(i)?p.appendChild(i):("string"==typeof i||i instanceof String)&&p.appendChild(document.createTextNode(i));if(n&&n.forEach((t=>{let e="";t.value&&(e=Array.isArray(t.value)?t.value.join(" "):t.value),p.setAttribute(t.attribute,e)})),r)for(const[t,e]of Object.entries(r))p.style.setProperty(`${t}`,`${e}`);return"input"!==t&&"textarea"!==t||c&&p.addEventListener("input",(t=>c(t))),"input"===t&&l&&p.addEventListener("keyup",(({key:t})=>{"Enter"===t&&l()})),a&&p.addEventListener("click",(t=>a(t))),s&&p.addEventListener("change",(t=>s(t))),p};class a{constructor(t){this.error=t}getComponentHTML(){try{return r({tag:"div",style:{height:"100%","background-color":"rgb(239 68 68)","align-items":"center"},content:[r({tag:"div",style:{"font-size":"1.125rem","line-height":"1.75rem",color:"#000000","font-weight":"bold"},content:[r({tag:"h1",style:{"font-size":"1.125rem","line-height":"1.75rem",color:"#000000","font-weight":"bold","text-align":"center"},content:"Something went wrong !"}),this.error?r({tag:"h1",style:{"font-size":"0.875rem","line-height":"1.25rem",color:"#000000","font-weight":"bold","text-align":"center"},content:"Error: "+this.error}):null]})]})}catch(t){console.error(`ErrorComponent: ${t}`)}}}class s{constructor({style:t}={}){if(this.id=s.generateID(),this.mainCompnent=document.createElement("div"),t)for(const[e,i]of Object.entries(t))this.mainCompnent.style.setProperty(`${e}`,`${i}`)}static generateID(){return"anmo-"+Math.random().toString(36).substring(2,10)}setTitle(t){document.title=t}getComponentHTML(){return document.createElement("div")}async update(){if(!this.id)throw new Error("Component ID not found");const t=document.getElementById(this.id);if(!t)return;this.mainCompnent=document.createElement("div");const e=await this.getComponentHTML();t.replaceWith(e)}appendHTMLComponent(t){this.mainCompnent.appendChild(t)}getComponent_(){return this.mainCompnent}obs(t,e){return new Proxy({state:t},{set:(t,i,n)=>(t[i]=n,e&&e(),this.update(),!0)})}componentError(t="Error"){return new a(t).getComponentHTML()}}const c={topRight:{top:"15%",right:"5%"},topLeft:{top:"15%",left:"5%"},topCenter:{top:"15%",left:"0",right:"0"},bottomRight:{bottom:"10%",right:"5%"},bottomLeft:{bottom:"10%",left:"5%"},bottomCenter:{bottom:"15%",left:"0",right:"0"}},l={Router:n,AppLocalStorage:i,AbstractView:s,BuildElement:r,Utils:{PopupIncubator:class extends s{constructor(t=!0,e=!0){super(),this.dismissable=t,this.animation=e}incubator(){if(!this.popup)throw new Error("Popup not defined");const t=this.dismissable?r({tag:"div",style:{display:"contents",width:"auto",height:"auto"},onTap:t=>t.stopPropagation(),content:this.popup}):this.popup;return r({tag:"div",id:this.id,attributes:[{attribute:"class",value:["app-popup-main-incubator"]}],onTap:()=>{this.dismissable&&this.hidePopup()},style:{display:"flex","z-index":"50",position:"fixed","background-color":"rgb(115 115 115 / 50%)",top:"0",left:"0",height:"100%",width:"100%","justify-content":"center","align-items":"center"},content:r({tag:"div",style:{position:"fixed",display:"flex","justify-content":"center","align-items":"center",height:"100%",width:"100%"},content:t})})}displayPopup(t){if(this.popup=t,this.animation){var e=Date.now();this.popup.style.transform="scale(0)"}const i=document.querySelector(".app-popup-main-incubator");i&&i.remove();const n=this.incubator();if(document.querySelector("body").append(n),this.animation){const t=()=>{let i=Date.now()-e,n=Math.min(1,i/250),o=Math.min(1,i/500);this.popup.style.transform="scale("+n+")",this.popup.style.opacity=`${o}`,i<1e3&&requestAnimationFrame(t)};requestAnimationFrame(t)}}hidePopup(){this.id&&document.getElementById(this.id).remove()}},Responsiveness:class{static isMobile(){return this.setByScreen(!1,!1,!0)}static isTablet(){return this.setByScreen(!1,!0,!1)}static isDesktop(){return this.setByScreen(!0,!1,!1)}static setBreakPoints(t){if(!t.mobile&&!Number.isInteger(t.mobile)&&t.mobile<0)throw new Error("Mobile breakpoint must be a positive integer");if(!t.tablet&&!Number.isInteger(t.tablet)&&t.tablet<0)throw new Error("Tablet breakpoint must be a positive integer");if(t.mobile>=t.tablet)throw new Error("Mobile breakpoint must be smaller than tablet breakpoint");i.setBreakPoints(t)}static setByScreen(t,e,n){let o=i.getBreakPoints();if(!(null==o?void 0:o.mobile)||!(null==o?void 0:o.tablet))throw new Error("Breakpoints not set");const r=window.matchMedia(`(max-width: ${o.mobile})`),a=window.matchMedia(`(max-width: ${o.tablet})`);return r.matches?n:a.matches?e:t}},NotificationIncubator:class extends s{constructor(t=5e3,e="topRight",i=!0){super(),this.displayTime=t,this.displayPosition=e,this.animation=i}incubator(){if(!this.notification)throw new Error("notification not defined");let t={"z-index":"50",position:"absolute",display:"flex","justify-content":"center","align-items":"center"};return t={...t,...c[this.displayPosition]},r({tag:"div",id:this.id,attributes:[{attribute:"class",value:["app-notification-main-incubator"]}],style:t,content:this.notification})}displaynotification(t){if(this.notification=t,this.animation){var e=Date.now();this.notification.style.transform="translate(0%, -100%)"}const i=document.querySelector(".app-notification-main-incubator");i&&i.remove();const n=this.incubator();if(document.querySelector("body").append(n),this.animation){const t=2,i=()=>{let n=Date.now()-e,o=n/t-100;this.notification.style.transform="translate(0%, "+o+"%)",n<100*t&&requestAnimationFrame(i)};requestAnimationFrame(i)}0!==this.displayTime&&setTimeout((()=>this.hidenotification()),this.displayTime)}hidenotification(){this.id&&document.getElementById(this.id).remove()}}},initApp:t=>{Array.isArray(t)?n.initAppRouting(t):n.initApp(t)},setBreakPoints:t=>{i.setBreakPoints(t)},setMainContainer:t=>{i.setMainContainer(t)}}})(),Anmo=e.default})();