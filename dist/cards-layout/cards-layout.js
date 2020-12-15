/**
 * ha-layoutcard 0.0.4
 * https://github.com/zibous/ha-layoutcard
 * 
 * License: MIT
 * Generated on 2020
 * Author: Peter siebler
 */

/** --------------------------------------------------------------------

  Custom Layout Card 

  parts based on https://github.com/ofekashery/vertical-stack-in-card

/** -------------------------------------------------------------------*/

"use strict";

const appinfo = {
    name: "✓ custom:cards-layout",
    tag: "cards-layout",
    version: "0.0.9",
    assets: "/hacsfiles/ha-layoutcard/assets/"
};
console.info(
    "%c " + appinfo.name + "    %c ▪︎▪︎▪︎▪︎ Version: " + appinfo.version + " ▪︎▪︎▪︎▪︎ ",
    "color:#FFFFFF; background:#3498db;display:inline-block;font-size:12px;font-weight:200;padding: 4px 0 4px 0",
    "color:#2c3e50; background:#ecf0f1;display:inline-block;font-size:12px;font-weight:200;padding: 4px 0 4px 0"
);

const cssAttr = function (v) {
    return typeof v == "number" ? v + "px" : v;
};
/**
 * custom cards layout
 * credits to https://github.com/ofekashery/vertical-stack-in-card
 */
class CardsLayout extends HTMLElement {
    /**
     * constructor cards layout
     */
    constructor() {
        // Always call super first in constructor
        super();
        // Element functionality written in here
        this.skipRender = false;
        this.entities = [];
        this.cards = [];
        this.loginfo_enabled = false;
        this.readyState = false;
        this.allLoaded = false;
    }

    /**
     * show info
     * @param {*} args
     */
    logInfo(...args) {
        if (this.logenabled) console.info(new Date().toISOString(), appinfo.name, ...args);
    }

    /**
     * hass event
     */
    set hass(hass) {
        if (hass === undefined) return;
        this._hass = hass;
        if (this.readyState) {
            if (this.allLoaded === false) {
                this.logInfo(appinfo.tag, appinfo.version, "ready");
                this.allLoaded = true;
            }
            if (this.view_footer && this.pagefooter)
                this.view_footer.innerHTML = this.pagefooter + " ⟲ " + new Date().toISOString();
            if (this.skipRender) return;
            this.skipRender = true;
        }
    }

    /**
     * set configuration based on the yaml
     * @param {*} config
     */
    async setConfig(config) {
        if (!config || !config.rows || !Array.isArray(config.rows)) {
            throw new Error("Card config incorrect");
        }
        if (this.id) return;
        this.id = "LC" + Math.floor(Math.random() * 1000);
        this._config = Object.assign({}, config);
        // developer logger can be enabled by yaml
        this.logenabled = this._config.logger || false;
        if (window.loadCardHelpers) {
            this.helpers = await window.loadCardHelpers();
        }
        this.pagefooter =
            this._config.footer ||
            'Made with <span style="color: #e25555;">&hearts;</span> by ' +
                appinfo.tag +
                " &bull; version " +
                appinfo.version +
                ".";
        this.renderCards();
    }

    /**
     * add the card css tags
     * TODO: export to css file, try to find a way to include...
     * @param {*} parent
     */
    addCss(parent) {
        const _style = document.createElement("style");
        _style.setAttribute("id", "lc-" + this.id);
        _style.textContent = `
        .cl-layout {
            position: relative;
            margin: 0 auto;
        }
        .cl-layout-row {
            width: 100%;
            margin-bottom: 3em;
        }
        .cl-layout-col {
            margin: 0 auto;
            width: 100%;
        }
        .clearfix::before,
        .clearfix::after {
            content: " ";
            display: table;
        }
        .clearfix::after {
            content: ".";
            visibility: hidden;
            display: block;
            height: 0;
            clear: both;
        }
        .cl-icon {
            vertical-align: bottom;
            padding: 0 8px 0 0;
            color: var(--primary-text-color);
        }
        .cl-layout h1,
        .cl-layout-col h1,
        .cl-layout-col h2 {
            line-height: 1.2em;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 99%;
            margin: 1.2em 0 0.5em 0;
            color: var(--primary-text-color)
        }
        .cl-layout-col p {
            white-space: pre-wrap;
        }
        .cl-text {
            margin: 0 0 2em 2em;
        }
        .cl-card-layer {
            position: relative;
            float: left;
            margin: 0;
        }
        .cl-card, 
        .ha-simplecard,
        .cl-cde ha-card{
            margin: 0.5em !important;
            flex:none !important;
            background: transparent !important;
        }
        .cl-layout-footer{
            position:absolute;
            bottom:0,
            right:1em;
            z-index:800;
            font-weight:200;
            font-size:0.8em;
            width:100%;
            text-align:right;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: inline-block;
            vertical-align: top;
        }
        @media (min-width: 481px) and (max-width: 767px) {
            .cl-layout {
                min-width: 95% !important;
                max-width: 95% !important;
                margin: 0.5em !important;
            }
            .cl-card-layer {
                float: none;
                width: 100% !important;
                max-width: 100% !important;
                margin: 1.2em 0.3em;
            }
            .cl-card, ha-card.cl-card {
                margin: 0.3em 0.5em !important;
            }
            .cl-layout-col h1,
            .cl-layout-col h2 {
                margin: 1em 0 0.3em 0;
            }
            .cl-layout-col p {
                margin: 0.3em 0 1em 0;
            }
            .cl-layout-footer{
                right:0.5em;
                font-size:0.75em;
            }
        }
        @media (min-width: 320px) and (max-width: 480px){
            .cl-layout {
                min-width: 90% !important;
                max-width: 90% !important;
                margin: 0.5em !important;
            }
            .cl-card-layer {
                float: none;
                width: 100% !important;
                max-width: 100% !important;
                margin: 1.2em 0 0.3em 0.3em;
            }
            
            .cl-card, ha-card.cl-card {
                margin: 0.3em 0.5em !important;
            }
            .cl-layout-col h1,
            .cl-layout-col h2 {
                margin: 1em 0 0.3em 0;
            }
            .cl-layout-col p {
                margin: 0.3em 0 1em 0;
            }
            .cl-layout-footer{
                right:0.3em;
                font-size:0.65em;
            }
        }
        `;
        this.appendChild(_style);
    }

    /**
     * create the card element
     * @param {*} cardConfig
     */
    async createCardElement(cardConfig) {
        const createError = (error, origConfig) => {
            return createThing("hui-error-card", {
                type: "error",
                error,
                origConfig
            });
        };
        const createThing = (tag, config) => {
            if (this.helpers) {
                if (config.type === "divider") {
                    return this.helpers.createRowElement(config);
                } else {
                    return this.helpers.createCardElement(config);
                }
            }
            const element = document.createElement(tag);
            try {
                element.setConfig(config);
            } catch (err) {
                console.error(tag, err);
                return createError(err.message, config);
            }
            return element;
        };
        let tag = cardConfig.type;
        if (tag.startsWith("divider")) {
            tag = `hui-divider-row`;
        } else if (tag.startsWith("custom:")) {
            tag = tag.substr("custom:".length);
        } else {
            tag = `hui-${tag}-card`;
        }
        const element = createThing(tag, cardConfig);
        element.style.margin = "0.5em";
        element.style.display = "block";
        element.hass = this._hass;
        this.cards.push(element);
        return element;
    }

    /**
     * set the style for the selected card
     * @param {*} element
     * @param {*} settings
     */
    styleCard(element, settings) {
        if (element.shadowRoot) {
            if (element.shadowRoot.querySelector("ha-card")) {
                let ele = element.shadowRoot.querySelector("ha-card");
                ele.classList.add("cl-card");
                if (settings.style) {
                    ele.style.cssText = settings.style.replaceAll("\n", "");
                }
                //ele.style.margin = "0.5em";
                this.provideHass(element); // !! important for update states
                return true;
            } else {
                let searchEles = element.shadowRoot.getElementById("root");
                if (!searchEles) {
                    searchEles = element.shadowRoot.getElementById("card");
                }
                if (!searchEles) return false;
                searchEles = searchEles.childNodes;
                for (let i = 0; i < searchEles.length; i++) {
                    if (searchEles[i].style) {
                        searchEles[i].classList.add("cl-card");
                    }
                    this.styleCard(searchEles[i]);
                }
                return true;
            }
        } else {
            if (typeof element.querySelector === "function" && element.querySelector("ha-card")) {
                let ele = element.querySelector("ha-card");
                ele.classList.add("cl-card");
            }
            let searchEles = element.childNodes;
            if (!searchEles) return false;
            for (let i = 0; i < searchEles.length; i++) {
                if (searchEles[i] && searchEles[i].style) {
                    searchEles[i].classList.add("cl-card");
                }
                this.styleCard(searchEles[i]);
            }
            return true;
        }
    }

    /**
     * provide hass for the element
     * important for execute hass update for the included card
     * @param {*} element
     */
    provideHass(element) {
        if (document.querySelector("hc-main")) return document.querySelector("hc-main").provideHass(element);
        if (document.querySelector("home-assistant"))
            return document.querySelector("home-assistant").provideHass(element);
        return undefined;
    }

    /**
     * render the card elements
     *
     * TODO: // async mode create cards ?
     *       // use stage for first render ?
     */
    async renderCards() {
        // page container for all cards
        const view_layout = document.createElement("div");
        view_layout.setAttribute("class", "cl-layout");
        view_layout.setAttribute("id", "cl-" + this.id);
        this.addCss(view_layout);
        if (this._config.width) {
            view_layout.style.width = view_layout.style.minWidth = this._config.width;
        }
        view_layout.style.display = "none";
        // page icon and title (optional)
        if (this._config.title) {
            const view_title = document.createElement("h1");
            if (this._config.icon) {
                const iconel = document.createElement("ha-icon");
                iconel.setAttribute("icon", this._config.icon);
                iconel.setAttribute("class", "cl-icon");
                iconel.style.cssText = "--mdc-icon-size:36px";
                view_title.appendChild(iconel);
                const view_titletext = document.createElement("span");
                view_titletext.innerHTML = this._config.title;
                view_title.appendChild(view_titletext);
            } else {
                view_title.innerHTML = this._config.title;
            }
            view_layout.append(view_title);
        }

        // page description (optinal)
        if (this._config.description) {
            const view_descr = document.createElement("p");
            view_descr.innerHTML = this._config.description;
            view_layout.append(view_descr);
        }

        // add all cards
        this._config.rows.forEach((items, r) => {
            // row container ------------------------------
            const view_row = document.createElement("div");
            view_row.setAttribute("class", "cl-layout-row");

            items.row.forEach((item, c) => {
                // columns container -------------------------
                const view_col = document.createElement("div");
                view_col.setAttribute("class", "cl-layout-col clearfix");

                // columns container title (optional)
                if (item.title) {
                    const view_title = document.createElement("h2");
                    view_title.innerHTML = item.title;
                    view_col.append(view_title);
                }
                // columns container description (optional)
                if (item.description) {
                    const view_descr = document.createElement("p");
                    view_descr.innerHTML = item.description;
                    view_col.append(view_descr);
                }

                // all for the columns settings
                let _cardWidth = item.width || "100%";
                let _cardHeight = item.height || "100%";
                let _cardcss = {
                    width: cssAttr(_cardWidth),
                    height: cssAttr(_cardHeight),
                    style: null
                };

                // each card is located in one column
                const _cards = item.entities;
                const promises = _cards.map((cardConfig) => this.createCardElement(cardConfig));
                Promise.all(promises).then((cards) => {
                    cards.forEach((card, index) => {
                        // col: container for the card -----------------
                        const _cardSettings = _cards[index];
                        const card_layer = document.createElement("div");
                        card_layer.setAttribute("class", "cl-card-layer");
                        // set the container size
                        card_layer.style.width = card_layer.style.maxWidth = _cardcss.width || _cardWidth;
                        card_layer.style.height = card_layer.style.maxHeight = _cardcss.height || _cardWidth;
                        if (_cardSettings.maxwidth) {
                            card_layer.style.maxWidth = cssAttr(_cardSettings.maxwidth);
                        }
                        if (_cardSettings.maxheight) {
                            card_layer.style.maxheight = cssAttr(_cardSettings.maxheight);
                        }
                        card.classList.add("cl-cde");

                        // style the card
                        // TODO; how to handle slow networks ??

                        window.setTimeout(() => {
                            if (card.updateComplete) {
                                card.updateComplete.then(() => this.styleCard(card, _cardSettings));
                            } else {
                                // ERROR: no hass, no style !!!!
                                this.styleCard(card, _cardSettings);
                            }
                        }, 800);

                        card_layer.append(card);
                        view_col.appendChild(card_layer);
                    });
                });

                view_row.append(view_col);
            });
            view_layout.append(view_row);
        });

        if (this.pagefooter && this.pagefooter != "") {
            this.view_footer = document.createElement("div");
            this.view_footer.setAttribute("class", "cl-layout-footer");
            this.view_footer.innerHTML = this.pagefooter + " ⟲ " + new Date().toISOString();
            view_layout.append(this.view_footer);
        }
        this.appendChild(view_layout);
        setTimeout(() => {
            view_layout.style.display = "block";
        }, 200);
    }

    /**
     * The connectedCallback() runs when the element is added to the DOM
     */
    connectedCallback() {
        this.readyState = true;
    }

    /**
     * the disconnectedCallback() runs when the element is either removed from the DOM
     */
    disconnectedCallback() {
        this.readyState = false;
    }

    /**
     * The height of your card. Home Assistant uses this to automatically
     * distribute all cards over the available columns.
     */
    getCardSize() {
        return 1;
    }
}

customElements.define("cards-layout", CardsLayout);

/** --------------------------------------------------------------------

  Cards Layout structure
  
  - type: 'custom: cards-layout'
    cards:
      - row
        - col
          - entities:
            - card
            - card
        - col
          - entities:
            - card
      - row
        - col
          ....
  
/** -------------------------------------------------------------------*/
