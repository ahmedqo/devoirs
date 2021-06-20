import XOElement from "./XO.Element.js"

export default class extends XOElement {
    static attributes = {
        blocked: String,
        url: String,
        change(n, v) {
            switch (n) {
                case "blocked":
                    if (this.matches("[blocked]")) this.$.container.setAttribute("disabled", "");
                    else this.$.container.removeAttribute("disabled");
                    break;
                case "url":
                    if (v.trim() === "") this.$.container.setAttribute("disabled", "");
                    else this.$.container.removeAttribute("disabled");
                    break;
            }
        }
    }

    static callbacks = {
        create() {
            this.innerHTML = this.innerHTML.trim();
            if (this.url) this.$.container.removeAttribute("disabled");
            else this.$.container.setAttribute("disabled", "");
        },
        attach() {
            this.addEventListener("click", () => {
                if (this.matches("[blocked]") || !this.url) return;
                if (this.matches("[globale]"))
                    window.location.href = this.url;
            });
        },
        detach() {
            this.removeEventListener("click", () => {});
        }
    }

    static styles = `
        /* Globals */
        #xo-container {
            all: unset;
        }
        * {
            font-family: Arial, sans-serif;
            box-sizing: border-box;
        }
        /* Element */
        :host {
            width: max-content;
            box-sizing: content-box !important;
        }
        :host([aside]) {
            width: 100%;
        }
        :host([aside]) main {
            padding: 0 10px;
        }
        /* Container */
        :host([theme="water"]) #xo-container,
        :host([theme="fire"]) #xo-container,
        :host([theme="forest"]) #xo-container,
        :host([theme="night"]) #xo-container {      
            color: #fff;
        }
        :host([url]) #xo-container:hover,:host([url]) #xo-container:hover #xo-label {
            cursor: pointer;
        }
        :host([slot="brand"][aside]) {
            width: max-content;
        }
        /* Container */
        #xo-container {
            width: max-content;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
        }
        #xo-container.hovrable:hover {
            cursor: pointer;
        }
        :host([url]) #xo-container:focus {
            outline: auto;
        }
        /* Label */
        :host(slot="brand") {
            font-size: 22px;
        }
        #xo-label {
            display: block;
            font-size: 18px;
        }
        @media (max-width: 767.98px) {
            /* Element */
            :host {
                width: 100%;
            }
            main {
                padding: 0 10px;
            }
            :host([slot="brand"]) {
                width: max-content;
            }
        }
    `

    render() {
        return /*html*/ `
            <main>
                <button role="link" id="xo-container">
                    <slot name="prefix"></slot>
                    <label id="xo-label"><slot></slot></label>
                    <slot name="suffix"></slot>
                </button>
            </main>
        `
    }
}