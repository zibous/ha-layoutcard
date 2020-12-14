/**
 * ha-layoutcard 0.0.4
 * https://github.com/zibous/ha-layoutcard
 * 
 * License: MIT
 * Generated on 2020
 * Author: Peter siebler
 */

"use strict";const appinfo={name:"✓ custom:cards-layout",tag:"cards-layout",version:"0.0.9",assets:"/hacsfiles/ha-layoutcard/assets/"};console.info("%c "+appinfo.name+"    %c ▪︎▪︎▪︎▪︎ Version: "+appinfo.version+" ▪︎▪︎▪︎▪︎ ","color:#FFFFFF; background:#3498db;display:inline-block;font-size:12px;font-weight:200;padding: 4px 0 4px 0","color:#2c3e50; background:#ecf0f1;display:inline-block;font-size:12px;font-weight:200;padding: 4px 0 4px 0");const cssAttr=function(t){return"number"==typeof t?t+"px":t};class CardsLayout extends HTMLElement{constructor(){super(),this.skipRender=!1,this.entities=[],this.cards=[],this.loginfo_enabled=!1,this.readyState=!1,this.allLoaded=!1}logInfo(...t){this.logenabled&&console.info((new Date).toISOString(),appinfo.name,...t)}set hass(t){if(void 0!==t&&(this._hass=t,this.readyState)){if(!1===this.allLoaded&&(this.logInfo(appinfo.tag,appinfo.version,"ready"),this.allLoaded=!0),this.view_footer&&this.pagefooter&&(this.view_footer.innerHTML=this.pagefooter+" ⟲ "+(new Date).toISOString()),this.skipRender)return;this.skipRender=!0}}async setConfig(t){if(!t||!t.cards||!Array.isArray(t.cards))throw new Error("Card config incorrect");this.id||(this.id="LC"+Math.floor(1e3*Math.random()),this._config=Object.assign({},t),this.logenabled=this._config.logger||!1,window.loadCardHelpers&&(this.helpers=await window.loadCardHelpers()),this.pagefooter=this._config.footer||'Made with <span style="color: #e25555;">&hearts;</span> by '+appinfo.tag+" &bull; version "+appinfo.version+".",this.renderCards())}addCss(t){const e=document.createElement("style");e.setAttribute("id","lc-"+this.id),e.textContent='\n        .cl-layout {\n            position: relative;\n            margin: 0 auto;\n        }\n        .cl-layout-row {\n            width: 100%;\n            margin-bottom: 3em;\n        }\n        .cl-layout-col {\n            margin: 0 auto;\n            width: 100%;\n        }\n        .clearfix::before,\n        .clearfix::after {\n            content: " ";\n            display: table;\n        }\n        .clearfix::after {\n            content: ".";\n            visibility: hidden;\n            display: block;\n            height: 0;\n            clear: both;\n        }\n        .cl-icon {\n            vertical-align: bottom;\n            padding: 0 8px 0 0;\n            color: var(--primary-text-color);\n        }\n        .cl-layout h1,\n        .cl-layout-col h1,\n        .cl-layout-col h2 {\n            line-height: 1.2em;\n            white-space: nowrap;\n            overflow: hidden;\n            text-overflow: ellipsis;\n            width: 99%;\n            margin: 1.2em 0 0.5em 0;\n            color: var(--primary-text-color)\n        }\n        .cl-layout-col p {\n            white-space: pre-wrap;\n        }\n        .cl-text {\n            margin: 0 0 2em 2em;\n        }\n        .cl-card-layer {\n            position: relative;\n            float: left;\n            margin: 0;\n        }\n        .cl-card, \n        .ha-simplecard,\n        .cl-cde ha-card{\n            margin: 0.5em !important;\n            flex:none !important;\n            background: transparent !important;\n        }\n        .cl-layout-footer{\n            position:absolute;\n            bottom:0,\n            right:1em;\n            z-index:800;\n            font-weight:200;\n            font-size:0.8em;\n            width:100%;\n            text-align:right;\n            overflow: hidden;\n            text-overflow: ellipsis;\n            white-space: nowrap;\n            display: inline-block;\n            vertical-align: top;\n        }\n        @media (min-width: 481px) and (max-width: 767px) {\n            .cl-layout {\n                min-width: 95% !important;\n                max-width: 95% !important;\n                margin: 0.5em !important;\n            }\n            .cl-card-layer {\n                float: none;\n                width: 100% !important;\n                max-width: 100% !important;\n                margin: 1.2em 0.3em;\n            }\n            .cl-card, ha-card.cl-card {\n                margin: 0.3em 0.5em !important;\n            }\n            .cl-layout-col h1,\n            .cl-layout-col h2 {\n                margin: 1em 0 0.3em 0;\n            }\n            .cl-layout-col p {\n                margin: 0.3em 0 1em 0;\n            }\n            .cl-layout-footer{\n                right:0.5em;\n                font-size:0.75em;\n            }\n        }\n        @media (min-width: 320px) and (max-width: 480px){\n            .cl-layout {\n                min-width: 90% !important;\n                max-width: 90% !important;\n                margin: 0.5em !important;\n            }\n            .cl-card-layer {\n                float: none;\n                width: 100% !important;\n                max-width: 100% !important;\n                margin: 1.2em 0 0.3em 0.3em;\n            }\n            \n            .cl-card, ha-card.cl-card {\n                margin: 0.3em 0.5em !important;\n            }\n            .cl-layout-col h1,\n            .cl-layout-col h2 {\n                margin: 1em 0 0.3em 0;\n            }\n            .cl-layout-col p {\n                margin: 0.3em 0 1em 0;\n            }\n            .cl-layout-footer{\n                right:0.3em;\n                font-size:0.65em;\n            }\n        }\n        ',this.appendChild(e)}async createCardElement(t){const e=(t,n)=>{if(this.helpers)return"divider"===n.type?this.helpers.createRowElement(n):this.helpers.createCardElement(n);const i=document.createElement(t);try{i.setConfig(n)}catch(i){return console.error(t,i),((t,n)=>e("hui-error-card",{type:"error",error:t,origConfig:n}))(i.message,n)}return i};let n=t.type;n=n.startsWith("divider")?"hui-divider-row":n.startsWith("custom:")?n.substr("custom:".length):`hui-${n}-card`;const i=e(n,t);return i.hass=this._hass,this.cards.push(i),i}styleCard(t,e){if(t.shadowRoot){if(t.shadowRoot.querySelector("ha-card")){let n=t.shadowRoot.querySelector("ha-card");return n.classList.add("cl-card"),e.style&&(n.style.cssText=e.style.replaceAll("\n","")),n.style.margin="0.5em",this.provideHass(t),!0}{let e=t.shadowRoot.getElementById("root");if(e||(e=t.shadowRoot.getElementById("card")),!e)return!1;e=e.childNodes;for(let t=0;t<e.length;t++)e[t].style&&e[t].classList.add("cl-card"),this.styleCard(e[t]);return!0}}{if("function"==typeof t.querySelector&&t.querySelector("ha-card")){t.querySelector("ha-card").classList.add("cl-card")}let e=t.childNodes;if(!e)return!1;for(let t=0;t<e.length;t++)e[t]&&e[t].style&&e[t].classList.add("cl-card"),this.styleCard(e[t]);return!0}}provideHass(t){return document.querySelector("hc-main")?document.querySelector("hc-main").provideHass(t):document.querySelector("home-assistant")?document.querySelector("home-assistant").provideHass(t):void 0}async renderCards(){const t=document.createElement("div");if(t.setAttribute("class","cl-layout"),t.setAttribute("id","cl-"+this.id),this.addCss(t),this._config.width&&(t.style.width=t.style.minWidth=this._config.width),this._config.title){const e=document.createElement("h1");if(this._config.icon){const t=document.createElement("ha-icon");t.setAttribute("icon",this._config.icon),t.setAttribute("class","cl-icon"),t.style.cssText="--mdc-icon-size:36px",e.appendChild(t);const n=document.createElement("span");n.innerHTML=this._config.title,e.appendChild(n)}else e.innerHTML=this._config.title;t.append(e)}if(this._config.description){const e=document.createElement("p");e.innerHTML=this._config.description,t.append(e)}this._config.cards.forEach((e,n)=>{const i=document.createElement("div");i.setAttribute("class","cl-layout-row"),e.row.forEach((t,e)=>{const n=document.createElement("div");if(n.setAttribute("class","cl-layout-col clearfix"),t.title){const e=document.createElement("h2");e.innerHTML=t.title,n.append(e)}if(t.description){const e=document.createElement("p");e.innerHTML=t.description,n.append(e)}let a=t.width||"100%",o=t.height||"100%",r={width:cssAttr(a),height:cssAttr(o),style:null};const s=t.entities,l=s.map(t=>this.createCardElement(t));Promise.all(l).then(t=>{t.forEach((t,e)=>{const i=s[e],o=document.createElement("div");o.setAttribute("class","cl-card-layer"),o.style.width=o.style.maxWidth=r.width||a,o.style.height=o.style.maxHeight=r.height||a,i.maxwidth&&(o.style.maxWidth=cssAttr(i.maxwidth)),i.maxheight&&(o.style.maxheight=cssAttr(i.maxheight)),t.classList.add("cl-cde"),window.setTimeout(()=>{t.updateComplete?t.updateComplete.then(()=>this.styleCard(t,i)):this.styleCard(t,i)},800),o.append(t),n.appendChild(o)})}),i.append(n)}),t.append(i)}),this.pagefooter&&""!=this.pagefooter&&(this.view_footer=document.createElement("div"),this.view_footer.setAttribute("class","cl-layout-footer"),this.view_footer.innerHTML=this.pagefooter+" ⟲ "+(new Date).toISOString(),t.append(this.view_footer)),this.appendChild(t)}connectedCallback(){this.readyState=!0}disconnectedCallback(){this.readyState=!1}getCardSize(){return 1}}customElements.define("cards-layout",CardsLayout);