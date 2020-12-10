const appinfo = {
    name: "✓ custom:test-card",
    version: "0.0.1"
};
console.info(
    "%c " + appinfo.name + "     %c ▪︎▪︎▪︎▪︎ Version: " + appinfo.version + " ▪︎▪︎▪︎▪︎ ",
    "color:#FFFFFF; background:#3498db;display:inline-block;font-size:12px;font-weight:300;padding: 6px 0 6px 0",
    "color:#2c3e50; background:#ecf0f1;display:inline-block;font-size:12px;font-weight:300;padding: 6px 0 6px 0"
);

let history = [];

function timestamp() {
    return new Date().toISOString();
}

// testcard component
class testCard extends HTMLElement {
    id = "TC" + Math.floor(Math.random() * 1000);

    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });

        history.push(history.length + ": " + this.id + " constructor: " + timestamp());

        console.log("*****Event - card - constructor", Math.random().toString(36).substr(2, 9), new Date().getTime());
    }

    set hass(hass) {
        this._hass = hass;
        this.content.innerHTML = `
            <h2>Test-Card-Info</h2>
            <p>${history.join("</p>")}
            <p>Update  :  ⟲ ${timestamp()}</p>
        `;
    }

    _createCard(root) {
        const card = document.createElement("ha-card");
        card.id = "ha-card";
        card.style.cssText = "width:100%; height:200px;padding:1em;";
        this.content = document.createElement("div");
        this.content.id = "content";
        this.content.style.cssText = "height:160px; font-size: 1.0em;line-height:0.8em;overflow:auto";
        card.appendChild(this.content);
        root.appendChild(card);
    }

    setConfig(config) {
        console.log("*****Event - card - setConfig", Math.random().toString(36).substr(2, 9), new Date().getTime());
        const root = this.shadowRoot;
        if (root.lastChild) root.removeChild(root.lastChild);
        this._config = Object.assign({}, config);
        history.push(history.length + ": " + this.id + " setconfig: " + timestamp());
        this._createCard(root);
    }

    getCardSize() {
        return 1;
    }
}

customElements.define("test-card", testCard);
