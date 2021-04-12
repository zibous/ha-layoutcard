/**
 * ha-layoutcard 0.0.4
 * https://github.com/zibous/ha-layoutcard
 * 
 * License: MIT
 * Generated on 2021
 * Author: Peter siebler
 */

"use strict";const appinfo={name:"✓ custom:cards-layout",app:"cards-layout",version:"0.1.1",assets:"/hacsfiles/cards-layout/assets/",github:"https://github.com/zibous/ha-layoutcard"};console.info("%c "+appinfo.name+"    %c ▪︎▪︎▪︎▪︎ Version: "+appinfo.version+" ▪︎▪︎▪︎▪︎ ","color:#FFFFFF; background:#3498db;display:inline-block;font-size:12px;font-weight:200;padding: 4px 0 4px 0","color:#2c3e50; background:#ecf0f1;display:inline-block;font-size:12px;font-weight:200;padding: 4px 0 4px 0");const cssAttr=function(e){return"number"==typeof e?e+"px":e};var CARDLAYOUTLOAD=0;class CardsLayout extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.layoutID="LC"+Math.floor(1e3*Math.random()),this.helpers=null,this._config=null,this.entities=[],this.pagefooter="",this.view_layout=null,this.view_header=null,this.view_footer=null,this.skipRender=!1,this.logenabled=!1,this.readyState=!1,this.allLoaded=!1,CARDLAYOUTLOAD++}logInfo(...e){this.logenabled&&console.info((new Date).toISOString(),appinfo.name,...e)}set hass(e){if(void 0!==e&&(this._hass=e,this.readyState)){if(!1===this.allLoaded&&(this.logInfo(appinfo.app,appinfo.version,"ready"),this.allLoaded=!0),this.view_footer&&this.pagefooter&&(this.view_footer.innerHTML=this.pagefooter+" ⟲ "+this.localDatetime()),this.skipRender)return;this.skipRender=!0}}setConfig(e){if(!this._config){if(!e||!e.content||!Array.isArray(e.content))throw new Error("Card config incorrect");this.shadowRoot.lastChild&&this.shadowRoot.removeChild(this.shadowRoot.lastChild),this.addCss(),this._config=Object.assign({},e),this._config&&this._config.header&&this.setHAGui(),this.logenabled=this._config.logger||!1,this._config.locale=this._config.locale||navigator.language||navigator.userLanguage||"en-GB",this.pagefooter=this._config.footer||'Made with <span style="color: #e25555;">&hearts;</span> by '+appinfo.app+" &bull; version "+appinfo.version+".",this.renderCards()}}addCss(){const e=document.createElement("style");e.setAttribute("id","lc-"+this.layoutID),e.textContent='\n        .cl-layout {\n            position: relative;\n            margin: 0 auto;\n        }\n        .cl-layout-header{\n            position: relative;\n            top: 0;\n            left: 0;\n            height: 160px;\n            z-index: 100;\n            background-repeat: no-repeat;\n            background-size: contain;\n            background-position: calc(100% - 0px) calc(100%); \n            border-bottom: 1px solid rgba(255,255,255,0.25);\n        }\n        .cl-layout-header-title{\n            position: absolute;\n            bottom: 0;\n            left: 12px;\n        }\n        .cl-layout-header-title h1{\n            line-height: 2.0em;\n            font-size: 2.5em;\n            font-weight: 500;\n            margin: 20px 0 0 4px;\n        }\n        .cl-layout-row {\n            width: 100%;\n            margin-bottom: 3em;\n        }\n        .cl-layout-columns {\n            margin: 0 auto;\n            width: 100%;\n        }\n        .clearfix::before,\n        .clearfix::after {\n            content: " ";\n            display: table;\n        }\n        .clearfix::after {\n            content: ".";\n            visibility: hidden;\n            display: block;\n            height: 0;\n            clear: both;\n        }\n        .cl-icon {\n            vertical-align: bottom;\n            padding: 0 8px 0 0;\n            color: var(--primary-text-color);\n        }\n        .cl-layout h1,\n        .cl-layout-columns h1,\n        .cl-layout-columns h2 {\n            line-height: 1.0em;\n            white-space: nowrap;\n            overflow: hidden;\n            text-overflow: ellipsis;\n            width: 99%;\n            margin: 1.2em 0 0 0;\n            color: var(--primary-text-color)\n            font-weight:400;\n        }\n        .cl-layout h1 span{\n            font-size: 1.8rem;\n        }\n        .cl-layout-columns h2 {\n            margin: 1.2em 0 1.2em 0;\n            line-height: 2.0em;\n        }\n        .cl-layout-columns p {\n            white-space: pre-wrap;\n        }\n        .cl-text {\n            margin: 0 0 2em 2em;\n        }\n        .cl-card-layer {\n            position: relative;\n            float: left;\n            margin-bottom: 1.0em;\n        }\n        .cl-cde{\n            margin-right: 2em;\n            display: block;\n            width: auto;\n            height: 95%;\n        }\n        .cl-layout-footer{\n            position:relative;\n            bottom:8px;\n            line-height:2em;\n            right:1em;\n            z-index:800;\n            font-weight:200;\n            font-size:0.8em;\n            width:100%;\n            text-align:right;\n            overflow: hidden;\n            text-overflow: ellipsis;\n            white-space: nowrap;\n            display: inline-block;\n            vertical-align: top;\n        }\n       \n        @media (min-width: 1800px) {\n            .cl-card-layer {\n                max-width: 30% !important;\n                width: 30% !important;\n            }\n            .cl-card-layer.c1 {\n                width: 90% !important;\n                max-width: 90% !important;\n            }\n            .cl-card-layer.c2 {\n                width: 45% !important;\n                max-width: 45% !important;\n            }\n        }\n\n        @media (max-width: 820px) {\n            .cl-card-layer {\n                float: none;\n                width: 100% !important;\n                max-width: 100% !important;\n                margin-left: 0.8em !important;\n            }\n            .cl-layout-columns h1,\n            .cl-layout-columns h2 {\n                margin: 1em 0 0.3em 0;\n            }\n            .cl-layout-columns p {\n                margin: 0.3em 0 1em 0;\n            }\n            .cl-layout-footer{\n                right:0.5em;\n                text-align:center;\n                font-size:0.75em;\n            }\n        }\n\n        @media (max-width: 560px) {\n            .cl-layout {\n                width: 95% !important;\n                min-width: 95% !important;\n                max-width: 95% !important;\n                top: -20px;\n            }\n            .cl-layout-header{\n                background-size: 80%;\n            }\n            \n            .cl-layout-header-title h1{\n                font-size: 2.0em;\n            }\n            .cl-layout-header-title{\n                position: absolute;\n                top: 4px;\n            }\n            .cl-card-layer {\n                float: none;\n                width: 100% !important;\n                max-width: 100% !important;\n                margin-left: 0.8em !important;\n            }\n            .cl-layout-columns h1,\n            .cl-layout-columns h2 {\n                font-size: 1.6em;\n                margin:0;\n            }\n            .cl-layout-columns h2 {\n                font-size: 1.3em;\n                height: 40px;\n            }\n            .cl-layout-columns p {\n                margin: 0.3em 0 1em 0;\n            }\n            .cl-layout-footer{\n                right:0.3em;\n                text-align:center;\n                font-size:0.65em;\n            }\n        }\n        ',this.shadowRoot.appendChild(e)}async createCardElement(e){const t=(e,o)=>{if(this.helpers)return"divider"===o.type?this.helpers.createRowElement(o):this.helpers.createCardElement(o);const n=document.createElement(e);try{n.setConfig(o)}catch(n){return console.error(e,n),((e,o)=>t("hui-error-card",{type:"error",error:e,origConfig:o}))(n.message,o)}return n};let o=e.type,n=!0;o.startsWith("divider")?o="hui-divider-row":o.startsWith("custom:")?(o=o.substr("custom:".length),n=!1):o=`hui-${o}-card`;const i=t(o,e);return i?i.hass=this._hass:console.error("createCardElement Error!",e),i}styleCard(e,t){if(e.shadowRoot){if(e.shadowRoot.querySelector("ha-card")){let o=e.shadowRoot.querySelector("ha-card");return o.classList.add("cl-card"),t&&t.style&&(o.style.cssText=t.style.replaceAll("\n","")),this.provideHass(e),!0}{let t=e.shadowRoot.getElementById("root");if(t||(t=e.shadowRoot.getElementById("card")),!t)return!1;t=t.childNodes;for(let e=0;e<t.length;e++)t[e].style&&t[e].classList.add("cl-card"),this.styleCard(t[e]);return!0}}{if("function"==typeof e.querySelector&&e.querySelector("ha-card")){e.querySelector("ha-card").classList.add("cl-card")}let t=e.childNodes;if(!t)return!1;for(let e=0;e<t.length;e++)t[e]&&t[e].style&&t[e].classList.add("cl-card"),this.styleCard(t[e]);return!0}}provideHass(e){return document.querySelector("hc-main")?document.querySelector("hc-main").provideHass(e):document.querySelector("home-assistant")?document.querySelector("home-assistant").provideHass(e):void 0}localDatetime(){const e=new Date;return new Intl.DateTimeFormat(this._config.locale,{year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric"}).format(e)}setHAGui(){const e=document.querySelector("body > home-assistant").shadowRoot.querySelector("home-assistant-main").shadowRoot;e.querySelector("#drawer > ha-sidebar").shadowRoot.querySelector("div.menu").style.border="none",this._config.toolbar&&(this._config.toolbar.backgroundcolor&&(e.querySelector("app-drawer-layout > partial-panel-resolver > ha-panel-lovelace").shadowRoot.querySelector("hui-root").shadowRoot.querySelector("#layout > app-header > app-toolbar").style.backgroundColor=this._config.toolbar.backgroundcolor),this._config.toolbar.iconcolor&&(e.querySelector("app-drawer-layout > partial-panel-resolver > ha-panel-lovelace").shadowRoot.querySelector("hui-root").shadowRoot.querySelector("#layout > app-header > app-toolbar").style.color=this._config.toolbar.iconcolor),!1===this._config.toolbar.visible&&(e.querySelector("app-drawer-layout > partial-panel-resolver > ha-panel-lovelace").shadowRoot.querySelector("hui-root").shadowRoot.querySelector("#layout").shadowRoot.querySelector("#wrapper > #contentContainer").style.paddingTop=0,e.querySelector("app-drawer-layout > partial-panel-resolver > ha-panel-lovelace").shadowRoot.querySelector("hui-root").shadowRoot.querySelector("#layout > app-header > app-toolbar").style.display="none"))}async renderCards(){if(this.shadowRoot){if(window.loadCardHelpers&&(this.helpers=await window.loadCardHelpers()),this._config.header&&this._config.header.style){if(this.pageHeader=document.createElement("div"),this.pageHeader.setAttribute("class","cl-layout-header"),this.pageHeader.style.cssText=this._config.header.style.replaceAll("\n",""),this._config.header.title||this._config.header.icon){const e=document.createElement("div");if(e.setAttribute("class","cl-layout-header-title"),this._config.header.icon&&this._config.header.title){const t=document.createElement("ha-icon");t.setAttribute("icon",this._config.header.icon),t.setAttribute("class","cl-icon"),t.style.cssText="--mdc-icon-size:32px;position:absolute;",this._config.header.iconcolor&&(t.style.cssText+="color:"+this._config.header.iconcolor),e.appendChild(t);const o=document.createElement("h1");o.innerHTML=this._config.header.title,e.appendChild(o)}else this._config.header.title&&(e.innerHTML=this._config.header.title);this.pageHeader.appendChild(e)}this.shadowRoot.appendChild(this.pageHeader)}if(this.view_layout=document.createElement("div"),this.view_layout.setAttribute("class","cl-layout"),this.view_layout.setAttribute("id","cl-"+this.layoutID),this._config.page&&this._config.page.style&&(document.querySelector("body > home-assistant").shadowRoot.querySelector("home-assistant-main").shadowRoot.querySelector("app-drawer-layout > partial-panel-resolver > ha-panel-lovelace").shadowRoot.querySelector("hui-root").shadowRoot.querySelector("#layout > div > hui-view").style=this._config.page.style.replaceAll("\n","")),this._config.page&&this._config.page.width&&(this.view_layout.style.width=this.view_layout.style.minWidth=this._config.page.width),this.view_layout){if(this._config.page&&(this._config.page.title||this._config.page.description)){if(this._config.page.title){this.view_header=document.createElement("div");const e=document.createElement("h1");if(this._config.page.icon){const t=document.createElement("ha-icon");t.setAttribute("icon",this._config.page.icon),t.setAttribute("class","cl-icon"),t.style.cssText="--mdc-icon-size:28px",this._config.page.iconcolor&&(t.style.cssText+="color:"+this._config.page.iconcolor),e.appendChild(t);const o=document.createElement("span");o.innerHTML=this._config.page.title,e.appendChild(o)}else e.innerHTML=this._config.page.title;this.view_header.append(e),this.view_layout.append(this.view_header)}if(this._config.page.description){const e=document.createElement("p");e.innerHTML=this._config.page.description,this.view_layout.append(e)}}this._config.content.forEach((e,t)=>{const o=document.createElement("div");o.setAttribute("class","cl-layout-row"),e.row.forEach((e,t)=>{const n=document.createElement("div");if(n.setAttribute("class","cl-layout-columns clearfix"),e.title){const t=document.createElement("h2");t.innerHTML=e.title,n.append(t)}if(e.description){const t=document.createElement("p");t.innerHTML=e.description,n.append(t)}let i=e.width||"100%",a=e.height||"100%",r={width:cssAttr(i),height:cssAttr(a),style:null};const l=e.entities,s=e.entities.length,c=l.map(e=>this.createCardElement(e));Promise.all(c).then(e=>{e.forEach((e,t)=>{const o=l[t],a=document.createElement("div");a.id=`lc${t}`,a.setAttribute("class",`cl-card-layer c${s}`),a.style.width=a.style.maxWidth=r.width||i,a.style.height=a.style.maxHeight=r.height||i,o.maxwidth&&(a.style.maxWidth=cssAttr(o.maxwidth)),o.maxheight&&(a.style.maxheight=cssAttr(o.maxheight)),e.classList.add("cl-cde"),window.setTimeout(()=>{e.updateComplete?e.updateComplete.then(()=>this.styleCard(e,o)):this.styleCard(e,o)},800),a.append(e),n.appendChild(a)})}),o.append(n)}),this.view_layout.append(o)}),this.pagefooter&&""!=this.pagefooter&&(this.view_footer=document.createElement("div"),this.view_footer.setAttribute("class","cl-layout-footer"),this.view_footer.innerHTML=this.pagefooter+" ⟲ "+this.localDatetime(),this.view_layout.append(this.view_footer)),this.shadowRoot.appendChild(this.view_layout)}}}connectedCallback(){this._config&&this._config.header&&this.setHAGui(),this.readyState=!0}disconnectedCallback(){this.readyState=!1}getCardSize(){return 1}}customElements.define("cards-layout",CardsLayout);