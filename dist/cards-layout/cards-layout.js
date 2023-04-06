/**
 * ha-layoutcard 0.0.4
 * https://github.com/zibous/ha-layoutcard
 * 
 * License: MIT
 * Generated on 2023
 * Author: Peter siebler
 */

/** --------------------------------------------------------------------

  Custom Layout Card

  parts based on https://github.com/ofekashery/vertical-stack-in-card
  credits to: https://github.com/ofekashery

/** -------------------------------------------------------------------*/
"use strict"

// all about the application
const appinfo = {
    name: "✓ custom:cards-layout",
    app: "cards-layout",
    version: "0.1.5",
    assets: "/hacsfiles/cards-layout/assets/",
    github: "https://github.com/zibous/ha-layoutcard"
}

// render the app-info for this custom card
console.info(
    "%c " + appinfo.name + "    %c ▪︎▪︎▪︎▪︎ Version: " + appinfo.version + " ▪︎▪︎▪︎▪︎ ",
    "color:#FFFFFF; background:#3498db;display:inline-block;font-size:12px;font-weight:200;padding: 4px 0 4px 0",
    "color:#2c3e50; background:#ecf0f1;display:inline-block;font-size:12px;font-weight:200;padding: 4px 0 4px 0"
)

/**
 * helper for css attribute
 * @param {*} v
 */
const cssAttr = function(v) {
    return typeof v == "number" ? v + "px" : v
}

var CARDLAYOUTLOAD = 0

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
        super()
        this.attachShadow({
            mode: "open"
        })
        // Element functionality written in here
        this.layoutID = "LC" + Math.floor(Math.random() * 1000)
        this.helpers = null

        this._config = null
        this.entities = []
        this.pagefooter = ""
        this.view_layout = null
        this.view_header = null
        this.view_footer = null

        this.skipRender = false
        this.logenabled = false
        this.readyState = false
        this.allLoaded = false
        CARDLAYOUTLOAD++
    }

    /**
     * show info
     * @param {*} args
     */
    logInfo(...args) {
        if (this.logenabled) console.info(new Date().toISOString(), appinfo.name, ...args)
    }

    /**
     * hass event
     */
    set hass(hass) {
        if (hass === undefined) return
        this._hass = hass

        if (this.readyState) {
            if (this.allLoaded === false) {
                this.logInfo(appinfo.app, appinfo.version, "ready")
                this.allLoaded = true
            }
            if (this.view_footer && this.pagefooter)
                this.view_footer.innerHTML = this.pagefooter + " ⟲ " + this.localDatetime()

            if (this.skipRender) return
            this.skipRender = true

        }
    }

    /**
     * set configuration based on the yaml
     * @param {*} config
     */
    setConfig(config) {
        if (this._config) return
        if (!config || !config.content || !Array.isArray(config.content)) {
            throw new Error("Card config incorrect")
        }
        if (this.shadowRoot.lastChild) this.shadowRoot.removeChild(this.shadowRoot.lastChild)
        this.addCss()
        this._config = Object.assign({}, config)

        if (this._config && this._config.header) {
            this.setHAGui()
        }

        // developer logger can be enabled by yaml
        this.logenabled = this._config.logger || false
        this._config.locale = this._config.locale || navigator.language || navigator.userLanguage || "en-GB"

        this.pagefooter =
            this._config.footer ||
            'Made with <span style="color: #e25555;">&hearts;</span> by ' +
            appinfo.app +
            " &bull; version " +
            appinfo.version +
            "."

        this.newHaMode = (document.querySelector("body > home-assistant").shadowRoot
            .querySelector("home-assistant-main").shadowRoot
            .querySelector("app-drawer-layout > partial-panel-resolver > ha-panel-lovelace")) == null

        this.renderCards()
    }

    /**
     * add the card css tags
     * TODO: export to css file, try to find a way to include...
     * @param {*} parent
     */
    addCss() {
        const _style = document.createElement("style")
        _style.setAttribute("id", "lc-" + this.layoutID)
        _style.textContent = `
        .cl-layout {
            position: relative;
            margin: 0 auto;
        }
        .cl-layout-header{
            position: relative;
            top: 0;
            left: 0;
            height: 160px;
            z-index: 100;
            background-repeat: no-repeat;
            background-size: contain;
            background-position: calc(100% - 0px) calc(100%);
            border-bottom: 1px solid rgba(255,255,255,0.25);
        }
        .cl-layout-header-title{
            position: absolute;
            bottom: 0;
            left: 12px;
        }
        .cl-layout-header-title h1{
            line-height: 2.0em;
            font-size: 2.5em;
            font-weight: 500;
            margin: 20px 0 0 4px;
        }
        .cl-layout-row {
            width: 100%;
            margin-bottom: 3em;
        }
        .cl-layout-columns {
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
        .cl-layout-columns h1,
        .cl-layout-columns h2 {
            line-height: 1.0em;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 99%;
            margin: 1.2em 0 0 0;
            color: var(--primary-text-color)
            font-weight:400;
        }
        .cl-layout h1 span{
            font-size: 1.8rem;
        }
        .cl-layout-columns h2 {
            margin: 1.2em 0 1.2em 0;
            line-height: 2.0em;
        }
        .cl-layout-columns p {
            white-space: pre-wrap;
        }
        .cl-text {
            margin: 0 0 2em 2em;
        }
        .cl-card-layer {
            position: relative;
            float: left;
            margin-bottom: 1.0em;
        }
        .cl-cde{
            margin-right: 2em;
            display: block;
            width: auto;
            height: 95%;
        }
        .cl-layout-footer{
            position:relative;
            bottom:8px;
            line-height:2em;
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

        @media (min-width: 1800px) {
            .cl-card-layer {
                max-width: 30% !important;
                width: 30% !important;
            }
            .cl-card-layer.c1 {
                width: 90% !important;
                max-width: 90% !important;
            }
            .cl-card-layer.c2 {
                width: 45% !important;
                max-width: 45% !important;
            }
        }

        @media (max-width: 820px) {
            .cl-card-layer {
                float: none;
                width: 100% !important;
                max-width: 100% !important;
                margin-left: 0.8em !important;
            }
            .cl-layout-columns h1,
            .cl-layout-columns h2 {
                margin: 1em 0 0.3em 0;
            }
            .cl-layout-columns p {
                margin: 0.3em 0 1em 0;
            }
            .cl-layout-footer{
                right:0.5em;
                text-align:center;
                font-size:0.75em;
            }
        }

        @media (max-width: 560px) {
            .cl-layout {
                width: 95% !important;
                min-width: 95% !important;
                max-width: 95% !important;
                top: -20px;
            }
            .cl-layout-header{
                background-size: 80%;
            }

            .cl-layout-header-title h1{
                font-size: 2.0em;
            }
            .cl-layout-header-title{
                position: absolute;
                top: 4px;
            }
            .cl-card-layer {
                float: none;
                width: 100% !important;
                max-width: 100% !important;
                margin-left: 0.8em !important;
            }
            .cl-layout-columns h1,
            .cl-layout-columns h2 {
                font-size: 1.6em;
                margin:0;
            }
            .cl-layout-columns h2 {
                font-size: 1.3em;
                height: 40px;
            }
            .cl-layout-columns p {
                margin: 0.3em 0 1em 0;
            }
            .cl-layout-footer{
                right:0.3em;
                text-align:center;
                font-size:0.65em;
            }
        }
        `
        this.shadowRoot.appendChild(_style)
    }

    /**
     * create the card element
     * credits to: https://github.com/ofekashery
     * @param {*} cardConfig
     */
    async createCardElement(cardConfig) {
        const createError = (error, origConfig) => {
            return createThing("hui-error-card", {
                type: "error",
                error,
                origConfig
            })
        }
        const createThing = (tag, config) => {
            if (this.helpers) {
                if (config.type === "divider") {
                    return this.helpers.createRowElement(config)
                } else {
                    return this.helpers.createCardElement(config)
                }
            }
            const element = document.createElement(tag)
            try {
                element.setConfig(config)
            } catch (err) {
                console.error(tag, err)
                return createError(err.message, config)
            }
            return element
        }
        let tag = cardConfig.type
        let _bUseHass = true
        if (tag.startsWith("divider")) {
            tag = `hui-divider-row`
        } else if (tag.startsWith("custom:")) {
            tag = tag.substr("custom:".length)
            _bUseHass = false
        } else {
            tag = `hui-${tag}-card`
        }
        const element = createThing(tag, cardConfig)
        if (element) {
            element.hass = this._hass
        } else {
            console.error("createCardElement Error!", cardConfig)
        }
        return element
    }

    /**
     * set the style for the selected card
     * @param {*} element
     * @param {*} settings
     */
    styleCard(element, settings) {
        if (element.shadowRoot) {
            if (element.shadowRoot.querySelector("ha-card")) {
                let ele = element.shadowRoot.querySelector("ha-card")
                ele.classList.add("cl-card")
                if (settings && settings.style) {
                    ele.style.cssText = settings.style.replaceAll("\n", "")
                }
                this.provideHass(element) // !! important for update states
                return true
            } else {
                let searchEles = element.shadowRoot.getElementById("root")
                if (!searchEles) {
                    searchEles = element.shadowRoot.getElementById("card")
                }
                if (!searchEles) return false
                searchEles = searchEles.childNodes
                for (let i = 0; i < searchEles.length; i++) {
                    if (searchEles[i].style) {
                        searchEles[i].classList.add("cl-card")
                    }
                    this.styleCard(searchEles[i])
                }
                return true
            }
        } else {
            if (typeof element.querySelector === "function" && element.querySelector("ha-card")) {
                let ele = element.querySelector("ha-card")
                ele.classList.add("cl-card")
            }
            let searchEles = element.childNodes
            if (!searchEles) return false
            for (let i = 0; i < searchEles.length; i++) {
                if (searchEles[i] && searchEles[i].style) {
                    searchEles[i].classList.add("cl-card")
                }
                this.styleCard(searchEles[i])
            }
            return true
        }
    }

    /**
     * provide hass for the element
     * important for execute hass update for the included card
     * Will make sure element.hass is set and updated whenever the
     * hass object is updated (i.e. when any entity state changes).
     * @param {*} element
     */
    provideHass(element) {
        if (document.querySelector("hc-main")) return document.querySelector("hc-main").provideHass(element)
        if (document.querySelector("home-assistant"))
            return document.querySelector("home-assistant").provideHass(element)
        return undefined
    }

    /**
     * get the local time based on the locale
     */
    localDatetime() {
        const date = new Date()
        return new Intl.DateTimeFormat(this._config.locale, {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric"
        }).format(date)
    }

    /**
     * set the page settings
     * enables or disables the toolbar and/or sidebar
     * see: https://gist.github.com/ciotlosm/1f09b330aa5bd5ea87b59f33609cc931
     */
    setHAGui() {
        // get the home assistant main element
        const home_assistant_main = document.querySelector("body > home-assistant").shadowRoot.querySelector("home-assistant-main").shadowRoot

        if (this.newHaMode) {
            document.querySelector("body > home-assistant").shadowRoot
                .querySelector("home-assistant-main").shadowRoot
                .querySelector("ha-drawer")
                .querySelector("ha-sidebar").shadowRoot
                .querySelector("div.menu").style.border = "none"
            if (this._config.toolbar) {
                if (this._config.toolbar.backgroundcolor) {
                    _toolbar.style.backgroundColor = this._config.toolbar.backgroundcolor
                }
                if (this._config.toolbar.iconcolor) {
                    _toolbar.style.color = this._config.toolbar.iconcolor
                }
            }
        } else {
            home_assistant_main.querySelector("#drawer > ha-sidebar").shadowRoot.querySelector("div.menu").style.border = "none"
            // all for the toolbar
            if (this._config.toolbar) {
                if (this._config.toolbar.backgroundcolor) {
                    home_assistant_main
                        .querySelector("app-drawer-layout > partial-panel-resolver > ha-panel-lovelace")
                        .shadowRoot.querySelector("hui-root")
                        .shadowRoot.querySelector(
                            "#layout > app-header > app-toolbar"
                        ).style.backgroundColor = this._config.toolbar.backgroundcolor
                }
                if (this._config.toolbar.iconcolor) {
                    home_assistant_main
                        .querySelector("app-drawer-layout > partial-panel-resolver > ha-panel-lovelace")
                        .shadowRoot.querySelector("hui-root")
                        .shadowRoot.querySelector(
                            "#layout > app-header > app-toolbar"
                        ).style.color = this._config.toolbar.iconcolor
                }
                if (this._config.toolbar.visible === false) {
                    home_assistant_main
                        .querySelector("app-drawer-layout > partial-panel-resolver > ha-panel-lovelace")
                        .shadowRoot.querySelector("hui-root")
                        .shadowRoot.querySelector("#layout")
                        .shadowRoot.querySelector("#wrapper > #contentContainer").style.paddingTop = 0
                    home_assistant_main
                        .querySelector("app-drawer-layout > partial-panel-resolver > ha-panel-lovelace")
                        .shadowRoot.querySelector("hui-root")
                        .shadowRoot.querySelector("#layout > app-header > app-toolbar").style.display = "none"
                }
            }
        }
    }

    /**
     * render the card elements
     *
     * TODO: // async mode create cards ?
     *       // use stage for first render ?
     */
    async renderCards() {
        if (!this.shadowRoot) return

        if (window.loadCardHelpers) {
            this.helpers = await window.loadCardHelpers()
        }

        // ----------------------------------------------
        // LAYOUT HEADER (TOP below toolbar)
        // ----------------------------------------------
        if (this._config.header && this._config.header.style) {
            // page header container -----
            this.pageHeader = document.createElement("div")
            this.pageHeader.setAttribute("class", "cl-layout-header")
            this.pageHeader.style.cssText = this._config.header.style.replaceAll("\n", "")
            // title and icon ---
            if (this._config.header.title || this._config.header.icon) {
                const _headerTitle = document.createElement("div")
                _headerTitle.setAttribute("class", "cl-layout-header-title")
                if (this._config.header.icon && this._config.header.title) {
                    const _headerIcon = document.createElement("ha-icon")
                    _headerIcon.setAttribute("icon", this._config.header.icon)
                    _headerIcon.setAttribute("class", "cl-icon")
                    _headerIcon.style.cssText = "--mdc-icon-size:32px;position:absolute;"
                    if (this._config.header.iconcolor) {
                        _headerIcon.style.cssText += "color:" + this._config.header.iconcolor
                    }
                    _headerTitle.appendChild(_headerIcon)
                    const _headertTitleText = document.createElement("h1")
                    _headertTitleText.innerHTML = this._config.header.title
                    _headerTitle.appendChild(_headertTitleText)
                } else {
                    if (this._config.header.title) _headerTitle.innerHTML = this._config.header.title
                }

                this.pageHeader.appendChild(_headerTitle)
            }
            this.shadowRoot.appendChild(this.pageHeader)
        }
        // ------------------------------------------------
        // page container for all cards
        // ------------------------------------------------
        this.view_layout = document.createElement("div")
        this.view_layout.setAttribute("class", "cl-layout")
        this.view_layout.setAttribute("id", "cl-" + this.layoutID)
        if (this._config.page && this._config.page.style) {
            if (this.newHaMode) {
                document.querySelector("body > home-assistant")
                    .shadowRoot.querySelector("home-assistant-main")
                    .shadowRoot.querySelector("ha-drawer>partial-panel-resolver>ha-panel-lovelace")
                    .shadowRoot.querySelector("hui-root")
                    .shadowRoot.querySelector("div>div#view>").style = this._config.page.style.replaceAll("\n", "")
            } else {
                document.querySelector("body > home-assistant")
                    .shadowRoot.querySelector("home-assistant-main")
                    .shadowRoot.querySelector("app-drawer-layout > partial-panel-resolver > ha-panel-lovelace")
                    .shadowRoot.querySelector("hui-root")
                    .shadowRoot.querySelector("#layout > div > hui-view").style = this._config.page.style.replaceAll("\n", "")
            }
        }
        if (this._config.page && this._config.page.width) {
            this.view_layout.style.width = this.view_layout.style.minWidth = this._config.page.width
        }
        if (!this.view_layout) return

        // ----------------------------------------------
        // PAGE HEADER below Layout header
        // ----------------------------------------------
        if (this._config.page && (this._config.page.title || this._config.page.description)) {
            // page icon and title (optional)
            if (this._config.page.title) {
                this.view_header = document.createElement("div")
                const view_title = document.createElement("h1")
                if (this._config.page.icon) {
                    const iconel = document.createElement("ha-icon")
                    iconel.setAttribute("icon", this._config.page.icon)
                    iconel.setAttribute("class", "cl-icon")
                    iconel.style.cssText = "--mdc-icon-size:28px"
                    if (this._config.page.iconcolor) {
                        iconel.style.cssText += "color:" + this._config.page.iconcolor
                    }
                    view_title.appendChild(iconel)
                    const view_titletext = document.createElement("span")
                    view_titletext.innerHTML = this._config.page.title
                    view_title.appendChild(view_titletext)
                } else {
                    view_title.innerHTML = this._config.page.title
                }
                this.view_header.append(view_title)
                this.view_layout.append(this.view_header)
            }
            // page description (optinal)
            if (this._config.page.description) {
                const view_descr = document.createElement("p")
                view_descr.innerHTML = this._config.page.description
                this.view_layout.append(view_descr)
            }
        }

        // ----------------------------------------------
        // PAGE CONTENT CARDS
        // ----------------------------------------------
        this._config.content.forEach((items, r) => {
            // row container ------------------------------
            const view_row = document.createElement("div")
            view_row.setAttribute("class", "cl-layout-row")

            items.row.forEach((item, c) => {

                // columns container -------------------------
                const view_col = document.createElement("div")
                view_col.setAttribute("class", "cl-layout-columns clearfix")

                // columns container title (optional)
                if (item.title) {
                    const view_title = document.createElement("h2")
                    view_title.innerHTML = item.title
                    view_col.append(view_title)
                }
                // columns container description (optional)
                if (item.description) {
                    const view_descr = document.createElement("p")
                    view_descr.innerHTML = item.description
                    view_col.append(view_descr)
                }

                // all for the columns settings
                let _cardWidth = item.width || "100%"
                let _cardHeight = item.height || "100%"
                let _cardcss = {
                    width: cssAttr(_cardWidth),
                    height: cssAttr(_cardHeight),
                    style: null
                }

                // ----------------------------------
                // each card is located in one column
                // ----------------------------------
                const _cards = item.entities
                const _cardsCount = item.entities.length
                const promises = _cards.map((cardConfig) => this.createCardElement(cardConfig))
                Promise.all(promises).then((cards) => {
                    cards.forEach((card, index) => {
                        // col: container for the card -----------------
                        const _cardSettings = _cards[index]
                        const card_layer = document.createElement("div")
                        card_layer.id = `lc${index}`
                        card_layer.setAttribute("class", `cl-card-layer c${_cardsCount}`)
                        // set the container size
                        card_layer.style.width = card_layer.style.maxWidth = _cardcss.width || _cardWidth
                        card_layer.style.height = card_layer.style.maxHeight = _cardcss.height || _cardWidth
                        if (_cardSettings.maxwidth) {
                            card_layer.style.maxWidth = cssAttr(_cardSettings.maxwidth)
                        }
                        if (_cardSettings.maxheight) {
                            card_layer.style.maxheight = cssAttr(_cardSettings.maxheight)
                        }
                        card.classList.add("cl-cde")
                        window.setTimeout(() => {
                            if (card.updateComplete) {
                                card.updateComplete.then(() => this.styleCard(card, _cardSettings))
                            } else {
                                // TODO: how to handle ERROR: no hass, no style !!!!
                                this.styleCard(card, _cardSettings)
                            }
                        }, 800)

                        card_layer.append(card)
                        view_col.appendChild(card_layer)
                    })
                })
                view_row.append(view_col)
            })

            this.view_layout.append(view_row)

        })

        // ----------------------------------------------
        // PAGE FOOTER
        // ----------------------------------------------
        if (this.pagefooter && this.pagefooter != "") {
            this.view_footer = document.createElement("div")
            this.view_footer.setAttribute("class", "cl-layout-footer")
            this.view_footer.innerHTML = this.pagefooter + " ⟲ " + this.localDatetime()
            this.view_layout.append(this.view_footer)
        }
        this.shadowRoot.appendChild(this.view_layout)
    }

    /**
     * The connectedCallback() runs when the element is added to the DOM
     */
    connectedCallback() {
        if (this._config && this._config.header) {
            // add style for side- and toolbar
            this.setHAGui()
        }
        this.readyState = true
    }

    /**
     * the disconnectedCallback() runs when the element is either removed from the DOM
     */
    disconnectedCallback() {
        this.readyState = false
    }

    /**
     * The height of your card. Home Assistant uses this to automatically
     * distribute all cards over the available columns.
     */
    getCardSize() {
        return 1
    }
}

customElements.define("cards-layout", CardsLayout)

/** --------------------------------------------------------------------

  Cards Layout structure

  - type: 'custom: cards-layout'
    content:
      - row
        - columns
          - entities:
            - card
            - card
        - columns
          - entities:
            - card
      - row
        - columns
          ....

/** -------------------------------------------------------------------*/