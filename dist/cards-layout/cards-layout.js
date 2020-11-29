/**
 * ha-layoutcard 0.0.4
 * https://github.com/zibous/ha-layoutcard
 * 
 * License: MIT
 * Generated on 2020
 * Author: Peter siebler
 */

"use strict";

const appinfo = {
    name: "✓ custom:cards-layout",
    version: "0.0.6"
};
console.info(
    "%c " + appinfo.name + "    %c ▪︎▪︎▪︎▪︎ Version: " + appinfo.version + " ▪︎▪︎▪︎▪︎ ",
    "color:#FFFFFF; background:#3498db;display:inline-block;font-size:12px;font-weight:200;padding: 4px 0 4px 0",
    "color:#2c3e50; background:#ecf0f1;display:inline-block;font-size:12px;font-weight:200;padding: 4px 0 4px 0"
);

/**
 * custom cards layout
 * credits to https://github.com/ofekashery/vertical-stack-in-card
 */
class CardsLayout extends HTMLElement {
    // static get properties() {
    //     return {
    //         _config: {},
    //         _hass: {}
    //     };
    // }

    constructor() {
        super();
        this.skipRender = false;
        this.entities = [];
        this.loginfo_enabled = true;
    }

    set hass(hass) {
        if (hass === undefined) return;

        this._hass = hass;

        if (this.skipRender) return;
        this.skipRender = true;
    }

    /**
     * set configuration based on the yaml
     * @param {*} config
     */
    async setConfig(config) {
        if (!config || !config.cards || !Array.isArray(config.cards)) {
            throw new Error("Card config incorrect");
        }
        this._config = config;
        this.logenabled = this._config.logger || true;
        this.cards = [];
        this.id = Math.random().toString(36).substr(2, 9);
        if (window.loadCardHelpers) {
            this.helpers = await window.loadCardHelpers();
        }
        this.renderCards();
    
    }

    /**
     * show info
     * @param {*} args
     */
    logInfo(...args) {
        if (this.logenabled) console.info(new Date().toISOString(), appinfo.name, ...args);
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
        element.hass = this._hass;
        this.cards.push(element);
        return element;
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
        div.cl-layout {
            position: relative;
            margin: 0 auto;
        }
        .cl-icon {
            vertical-align: bottom;
            padding: 0 8px 0 0;
        }
        .cl-card, ha-card.cl-card {
            margin: 0.5em !important;
            flex:none !important!;
            background: transparent !important;
        }
        div.cl-layout-row {
            width: 100%;
            margin-bottom: 3em;
        }
        div.cl-layout-col {
            margin: 0 auto;
            width: 100%;
        }
        div.cl-layout-col p {
            white-space: pre-wrap;
        }
        div.cl-layout h1,
        div.cl-layout-col h1,
        div.cl-layout-col h2 {
            line-height: 1.2em;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 99%;
            margin: 1.2em 0 0.5em 0;
        }
        .cl-card-layer {
            position: relative;
            float: left;
            margin: 0;
        }
        .cl-text {
            margin: 0 0 2em 2em;
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
        @media (max-width: 620px) {
            div.cl-layout {
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
            div.cl-layout-col h1,
            div.cl-layout-col h2 {
                margin: 1em 0 0.3em 0;
            }
            div.cl-layout-col p {
                margin: 0.3em 0 1em 0;
            }
        }
        `;
        // this.shadowRoot.appendChild(_style);
        parent.appendChild(_style);
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
                ele.style.margin = "0.5em";
                this.provideHass(element);
            } else {
                let searchEles = element.shadowRoot.getElementById("root");
                if (!searchEles) {
                    searchEles = element.shadowRoot.getElementById("card");
                }
                if (!searchEles) return;
                searchEles = searchEles.childNodes;
                for (let i = 0; i < searchEles.length; i++) {
                    if (searchEles[i].style) {
                        searchEles[i].classList.add("cl-card");
                    }
                    this.styleCard(searchEles[i]);
                }
            }
        } else {
            if (typeof element.querySelector === "function" && element.querySelector("ha-card")) {
                let ele = element.querySelector("ha-card");
                ele.classList.add("cl-card");
            }
            let searchEles = element.childNodes;
            for (let i = 0; i < searchEles.length; i++) {
                if (searchEles[i] && searchEles[i].style) {
                    searchEles[i].classList.add("cl-card");
                }
                this.styleCard(searchEles[i]);
            }
        }
    }

    /**
     * stage layer
     * TODO: test for better render process ?
     */
    createStageLayer() {
        this.stage_layer = document.createElement("div");
        this.stage_layer.style.cssText = "display:none";
        this.stage_layer.id = "stage";
        return true;
    }

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
        // container for all cards
        const view_layout = document.createElement("div");
        view_layout.setAttribute("class", "cl-layout");
        view_layout.setAttribute("id", "cl-" + this.id);
        this.addCss(view_layout);
        if (this._config.width) {
            view_layout.style.width = view_layout.style.minWidth = this._config.width;
        }
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
        if (this._config.description) {
            const view_descr = document.createElement("p");
            view_descr.innerHTML = this._config.description;
            view_layout.append(view_descr);
        }
        this._config.cards.forEach((items, r) => {
            const view_row = document.createElement("div");
            view_row.setAttribute("class", "cl-layout-row");

            items.row.forEach((item, c) => {
                const view_col = document.createElement("div");

                view_col.setAttribute("class", "cl-layout-col clearfix");

                if (item.title) {
                    const view_title = document.createElement("h2");
                    view_title.innerHTML = item.title;
                    view_col.append(view_title);
                }
                if (item.description) {
                    const view_descr = document.createElement("p");
                    view_descr.innerHTML = item.description;
                    view_col.append(view_descr);
                }

                let _cardWidth = item.width || "100%";
                let _cardHeight = item.height || "100%";

                let _cardcss = {
                    width: typeof _cardWidth == "number" ? _cardWidth + "px" : _cardWidth,
                    height: typeof _cardHeight == "number" ? _cardHeight + "px" : _cardHeight,
                    style: null
                };

                const _cards = item.entities;
                const promises = _cards.map((cardConfig) => this.createCardElement(cardConfig));

                Promise.all(promises).then((cards) => {
                    cards.forEach((card, index) => {
                        // container for the card
                        const _cardSettings = _cards[index];
                        const card_layer = document.createElement("div");
                        card_layer.setAttribute("class", "cl-card-layer");

                        card_layer.style.width = card_layer.style.maxWidth = _cardcss.width || _cardWidth;
                        card_layer.style.height = card_layer.style.minHeight = _cardcss.height || _cardWidth;

                        // TODO: find a better method to set the style
                        window.setTimeout(() => {
                            if (card.updateComplete) {
                                card.updateComplete.then(() => this.styleCard(card, _cardSettings));
                            } else {
                                this.styleCard(card, _cardSettings);
                            }
                        }, 200);

                        card_layer.append(card);
                        view_col.appendChild(card_layer);
                    });
                });

                view_row.append(view_col);
            });
            view_layout.append(view_row);
        });
        this.appendChild(view_layout);
    }

    /**
     * update data
     */
    updateData() {}

    connectedCallback() {
        // this.logInfo("connectedCallback")
    }

    disconnectedCallback() {
        // this.logInfo("connectedCallback")
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
