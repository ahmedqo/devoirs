import XOElement from "./XO.Element.js"

export default class extends XOElement {
    static attributes = {
        blocked: Boolean,
        change(n) {
            switch (n) {
                case "blocked":
                    if (this.matches("[blocked]")) this.$.container.setAttribute("disabled", "");
                    else this.$.container.removeAttribute("disabled")
                    break;
            }
        }
    }

    static callbacks = {
        create() {
            this.innerHTML = this.innerHTML.trim();
        },
        attach() {
            this.$.container.addEventListener("click", e => e.preventDefault());
        },
        detach() {
            this.$.container.removeEventListener("click", () => {});
        }
    }

    static styles = `
        /* Globals */
        * {
            font-family: Arial, sans-serif;
            box-sizing: border-box;
            --default: #ecf0f1;
            --water: #3498db;
            --fire: #e74c3c;
            --earth: #f1c40f;
            --forest: #2ecc71;
            --night: #34495e;
            --defaultLight: #f8f9f9;
            --waterLight: #ebf5fb;
            --fireLight: #fdedec;
            --earthLight: #fef9e7;
            --forestLight: #eafaf1;
            --nightLight: #ebedef;
            --defaultDark: #979a9a;
            --waterDark: #21618c;
            --fireDark: #943126;
            --earthDark: #9a7d0a;
            --forestDark: #1d8348;
            --nightDark: #212f3c;
        }
        /* Element */
        :host {
            display: inline-block;
            box-sizing: content-box !important;
            height: 42px;
        }
        :host([pill]) #xo-container {
            border-radius: 100px;
        }
        :host([blocked]) #xo-container {
            opacity: .5;
        }
        :host([blocked]) #xo-container:hover {
            box-shadow: unset;
            cursor: no-drop;
        }
        :host([blocked]) #xo-label {
            pointer-events: unset;
            cursor: unset;
        }
        /* Conatiner */
        :host([theme="water"]) #xo-container {
            background: var(--water);
        }
        :host([theme="fire"]) #xo-container {
            background: var(--fire);
        }
        :host([theme="earth"]) #xo-container {
            background: var(--earth);     
        }
        :host([theme="forest"]) #xo-container {
            background: var(--forest);        
        }
        :host([theme="night"]) #xo-container {
            background: var(--night);        
        }
        :host([theme="water"]) #xo-container,
        :host([theme="fire"]) #xo-container,
        :host([theme="forest"]) #xo-container,
        :host([theme="night"]) #xo-container {
            color: #fff;
        }
        #xo-container {
            all: unset;
            width: 100%;
            height: 100%;
            display: flex;
            color: #1d1d1d;
            font-size: 20px;
            overflow: hidden;
            padding: 5px 20px;
            position: relative;
            border-radius: 5px;
            align-items: center;
            box-sizing: border-box;
            justify-content: center;
            background: var(--default);
            transition: box-shadow 100ms ease-in-out;
            gap: 5px;
        }
        #xo-container:hover {
            box-shadow: 0 0 3px 3px #40404033;
            cursor: context-menu;
        }
        #xo-container:active {
            box-shadow: inset 0 0 3px 3px #40404033;
            cursor: context-menu;
        }
        /* Label */
        #xo-label {
            pointer-events: none;
        }
        /* Variables */
            /* Container */
            #xo-container {
                {{--xo-container}}
            }
            #xo-container:hover {
                {{--xo-container-hover}}
            }
            /* Label */
            #xo-label {
                {{--xo-label}}
            }
            #xo-label:hover {
                {{--xo-label-hover}}
            }
    `;

    render() {
        return /*html*/ `
            <button id="xo-container">
                <slot id="xo-prefix"name="prefix"></slot>
                <label part="-xo-label" id="xo-label"><slot id="xo-midfix"></slot></label>
                <slot id="xo-suffix"name="suffix"></slot>
            </button>
        `
    }
}