/**
 * ha-layoutcard 0.0.4
 * https://github.com/zibous/ha-layoutcard
 * 
 * License: MIT
 * Generated on 2020
 * Author: Peter siebler
 */

"use strict";const appinfo={name:"✓ custom:cards-layout",version:"0.0.6"};console.info("%c "+appinfo.name+"    %c ▪︎▪︎▪︎▪︎ Version: "+appinfo.version+" ▪︎▪︎▪︎▪︎ ","color:#FFFFFF; background:#3498db;display:inline-block;font-size:12px;font-weight:200;padding: 4px 0 4px 0","color:#2c3e50; background:#ecf0f1;display:inline-block;font-size:12px;font-weight:200;padding: 4px 0 4px 0");class CardsLayout extends HTMLElement{constructor(){super(),this.skipRender=!1,this.entities=[],this.loginfo_enabled=!0}set hass(e){void 0!==e&&(this._hass=e,this.skipRender||(this.skipRender=!0))}async setConfig(e){if(!e||!e.cards||!Array.isArray(e.cards))throw new Error("Card config incorrect");this._config=e,this.logenabled=this._config.logger||!0,this.cards=[],this.id=Math.random().toString(36).substr(2,9),window.loadCardHelpers&&(this.helpers=await window.loadCardHelpers()),this.renderCards()}logInfo(...e){this.logenabled&&console.info((new Date).toISOString(),appinfo.name,...e)}async createCardElement(e){const t=(e,n)=>{if(this.helpers)return"divider"===n.type?this.helpers.createRowElement(n):this.helpers.createCardElement(n);const i=document.createElement(e);try{i.setConfig(n)}catch(i){return console.error(e,i),((e,n)=>t("hui-error-card",{type:"error",error:e,origConfig:n}))(i.message,n)}return i};let n=e.type;n=n.startsWith("divider")?"hui-divider-row":n.startsWith("custom:")?n.substr("custom:".length):`hui-${n}-card`;const i=t(n,e);return i.hass=this._hass,this.cards.push(i),i}addCss(e){const t=document.createElement("style");t.setAttribute("id","lc-"+this.id),t.textContent='\n        div.cl-layout {\n            position: relative;\n            margin: 0 auto;\n        }\n        .cl-icon {\n            vertical-align: bottom;\n            padding: 0 8px 0 0;\n        }\n        .cl-card, ha-card.cl-card {\n            margin: 0.5em !important;\n            flex:none !important!;\n            background: transparent !important;\n        }\n        div.cl-layout-row {\n            width: 100%;\n            margin-bottom: 3em;\n        }\n        div.cl-layout-col {\n            margin: 0 auto;\n            width: 100%;\n        }\n        div.cl-layout-col p {\n            white-space: pre-wrap;\n        }\n        div.cl-layout h1,\n        div.cl-layout-col h1,\n        div.cl-layout-col h2 {\n            line-height: 1.2em;\n            white-space: nowrap;\n            overflow: hidden;\n            text-overflow: ellipsis;\n            width: 99%;\n            margin: 1.2em 0 0.5em 0;\n        }\n        .cl-card-layer {\n            position: relative;\n            float: left;\n            margin: 0;\n        }\n        .cl-text {\n            margin: 0 0 2em 2em;\n        }\n        .clearfix::before,\n        .clearfix::after {\n            content: " ";\n            display: table;\n        }\n        .clearfix::after {\n            content: ".";\n            visibility: hidden;\n            display: block;\n            height: 0;\n            clear: both;\n        }\n        @media (max-width: 620px) {\n            div.cl-layout {\n                min-width: 95% !important;\n                max-width: 95% !important;\n                margin: 0.5em !important;\n            }\n            .cl-card-layer {\n                float: none;\n                width: 100% !important;\n                max-width: 100% !important;\n                margin: 1.2em 0.3em;\n            }\n            .cl-card, ha-card.cl-card {\n                margin: 0.3em 0.5em !important;\n            }\n            div.cl-layout-col h1,\n            div.cl-layout-col h2 {\n                margin: 1em 0 0.3em 0;\n            }\n            div.cl-layout-col p {\n                margin: 0.3em 0 1em 0;\n            }\n        }\n        ',e.appendChild(t)}styleCard(e,t){if(e.shadowRoot)if(e.shadowRoot.querySelector("ha-card")){let n=e.shadowRoot.querySelector("ha-card");n.classList.add("cl-card"),t.style&&(n.style.cssText=t.style.replaceAll("\n","")),n.style.margin="0.5em",this.provideHass(e)}else{let t=e.shadowRoot.getElementById("root");if(t||(t=e.shadowRoot.getElementById("card")),!t)return;t=t.childNodes;for(let e=0;e<t.length;e++)t[e].style&&t[e].classList.add("cl-card"),this.styleCard(t[e])}else{if("function"==typeof e.querySelector&&e.querySelector("ha-card")){e.querySelector("ha-card").classList.add("cl-card")}let t=e.childNodes;for(let e=0;e<t.length;e++)t[e]&&t[e].style&&t[e].classList.add("cl-card"),this.styleCard(t[e])}}createStageLayer(){return this.stage_layer=document.createElement("div"),this.stage_layer.style.cssText="display:none",this.stage_layer.id="stage",!0}provideHass(e){return document.querySelector("hc-main")?document.querySelector("hc-main").provideHass(e):document.querySelector("home-assistant")?document.querySelector("home-assistant").provideHass(e):void 0}async renderCards(){const e=document.createElement("div");if(e.setAttribute("class","cl-layout"),e.setAttribute("id","cl-"+this.id),this.addCss(e),this._config.width&&(e.style.width=e.style.minWidth=this._config.width),this._config.title){const t=document.createElement("h1");if(this._config.icon){const e=document.createElement("ha-icon");e.setAttribute("icon",this._config.icon),e.setAttribute("class","cl-icon"),e.style.cssText="--mdc-icon-size:36px",t.appendChild(e);const n=document.createElement("span");n.innerHTML=this._config.title,t.appendChild(n)}else t.innerHTML=this._config.title;e.append(t)}if(this._config.description){const t=document.createElement("p");t.innerHTML=this._config.description,e.append(t)}this._config.cards.forEach((t,n)=>{const i=document.createElement("div");i.setAttribute("class","cl-layout-row"),t.row.forEach((e,t)=>{const n=document.createElement("div");if(n.setAttribute("class","cl-layout-col clearfix"),e.title){const t=document.createElement("h2");t.innerHTML=e.title,n.append(t)}if(e.description){const t=document.createElement("p");t.innerHTML=e.description,n.append(t)}let a=e.width||"100%",r=e.height||"100%",s={width:"number"==typeof a?a+"px":a,height:"number"==typeof r?r+"px":r,style:null};const o=e.entities,c=o.map(e=>this.createCardElement(e));Promise.all(c).then(e=>{e.forEach((e,t)=>{const i=o[t],r=document.createElement("div");r.setAttribute("class","cl-card-layer"),r.style.width=r.style.maxWidth=s.width||a,r.style.height=r.style.minHeight=s.height||a,window.setTimeout(()=>{e.updateComplete?e.updateComplete.then(()=>this.styleCard(e,i)):this.styleCard(e,i)},200),r.append(e),n.appendChild(r)})}),i.append(n)}),e.append(i)}),this.appendChild(e)}updateData(){}connectedCallback(){}disconnectedCallback(){}getCardSize(){return 1}}customElements.define("cards-layout",CardsLayout);