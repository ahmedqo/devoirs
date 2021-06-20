import XOElement from "./XO.Element.js"

export default class extends XOElement {
    static attributes = {
        loader: String,
        change(n, v) {
            switch (n) {
                case "loader":
                    if (v) this.$.container.style.setProperty("--delay", v + "ms");
                    break;
            }
        }
    }

    static callbacks = {
        create() {
            this.innerHTML = this.innerHTML.trim();
            this.$.icon.style.background = __getBackground__(this.innerText[0] || "");
        },
        attach() {
            this.addEventListener("DOMSubtreeModified", () => {
                this.innerHTML = this.innerHTML.trim();
                this.$.icon.style.background = __getBackground__(this.innerText[0] || "");
            });
        },
        detach() {
            this.removeEventListener("DOMSubtreeModified", () => {});
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
        }
        /* Container */
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
        #xo-container {
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            padding: 10px;
            overflow: hidden;
            flex-wrap: nowrap;
            border-radius: 5px;
            align-items: center;
            display: inline-flex;
            justify-content: space-between;
            background-color: var(--default);
            transition: transform .3s ease-in-out, box-shadow .3s ease-in-out;
            position: relative;
            --delay: 0;
        }
        :host([loader]) #xo-container::before {
            content: "";
            position: absolute;
            inset: 0;
            animation-delay: var(--delay);
            animation-fill-mode: forwards;
            animation-duration: 1500ms;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
            animation-name: placeholderAnimate;
            background: var(--default);
            background: linear-gradient(to right, var(--default) 2%, var(--defaultLight) 18%, var(--default) 33%);
            background-size: 1400px;
        }
        #xo-container:hover {
            box-shadow: 0 0 3px 3px #40404033;
            transform: scale(0.96);
        }
        :host([loader]) #xo-container:hover {
            box-shadow:unset;
            transform: scale(1);
        }
        @keyframes placeholderAnimate {
            0%{ background-position: -650px 0; }
            100%{ background-position: 650px 0; }
        }
        /* Icon */
        #xo-icon {
            display: flex;
            width: 60px !important;
            height: 60px !important;
            overflow: hidden;
            border-radius: 50%;
            font-size: 40px;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            text-transform: uppercase;
        }
        /* Label */
        :host([theme="water"]) #xo-label,
        :host([theme="fire"]) #xo-label,
        :host([theme="forest"]) #xo-label,
        :host([theme="night"]) #xo-label {
            color: #fff;
        }
        #xo-label {
            flex: 1;
            margin-left: 10px;
            display: block;
            font-size: 24px;
            font-weight: 600;
            text-align: center;
            text-transform: capitalize;
        }
        /* Variables */
            /* Container */
            #xo-container {
                {{--xo-container}}
            }
            #xo-container:hover {
                {{--xo-container-hover}}
            }
            /* Icon */
            #xo-icon {
                {{--xo-icon}}
            }
            #xo-icon:hover {
                {{--xo-icon-hover}}
            }
            /* Label */
            #xo-label {
                {{--xo-label}}
            }
            #xo-label:hover {
                {{--xo-label-hover}}
            }
    `

    render() {
        return /*html*/ `
            <main id="xo-container">
                <span id="xo-icon">
                    <slot name="icon"></slot>
                </span>
                <label id="xo-label">
                    <slot></slot>
                </label>
            </main>
        `;
    }
}


function __getBackground__(txt) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = 60;
    canvas.height = 60;
    context.fillStyle = __getColor__();
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = "bold 30px Assistant";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.fillText(txt, canvas.width / 2, 39);
    return `url(${canvas.toDataURL("image/png")})`;
}

function __getColor__() {
    var colors = ['#CD5C5C', '#F08080', '#FA8072', '#E9967A', '#FFA07A', '#DC143C', '#FFC0CB', '#FFB6C1', '#FF69B4', '#FF7F50', '#FF6347', '#D8BFD8', '#DDA0DD', '#EE82EE', '#DA70D6', '#98FB98', '#90EE90', '#00FA9A', '#00FF7F', '#3CB371', '#66CDAA', '#8FBC8B', '#20B2AA', '#40E0D0', '#48D1CC', '#00CED1', '#5F9EA0', '#4682B4', '#B0C4DE', '#B0E0E6', '#ADD8E6', '#87CEEB', '#87CEFA', '#6495ED', '#F5DEB3', '#DEB887', '#D2B48C', '#BC8F8F', '#F4A460', '#DAA520', '#DCDCDC', '#D3D3D3', '#C0C0C0', '#A9A9A9', '#B2BEB5', '#7393B3', '#36454F', '#6082B6', '#808080', '#818589', '#899499', '#E5E4E2', '#8A9A5B', '#708090', '#848884', '#71797E', '#32CD32', '#478778', '#0BDA51', '#C1E1C1', '#C9CC3F', '#B4C424', '#93C572', '#96DED1', '#008080', '#C4B454', '#40B5AD', '#40826D', '#FBCEB1', '#F2D2BD', '#FFAC1C', '#CD7F32', '#DAA06D', '#CC5500', '#E97451', '#E3963E', '#F28C28', '#D27D2D', '#B87333', '#F88379', '#8B4000', '#FAD5A5', '#E49B0F', '#F89880', '#E35335', '#FF7518', '#FF4433', '#FF5F15', '#A0522D', '#FA5F55', '#F08000', '#E3735E', '#FFAA33', '#9F2B68', '#DE3163', '#811331', '#AA336A', '#C9A9A6', '#FF00FF', '#F3CFC6', '#770737', '#FF10F0', '#F8C8DC', '#FAA0A0', '#673147', '#A95C68', '#800080', '#E30B5C', '#953553', '#F33A6A', '#E0BFB8', '#C21E56', '#E0115F', '#E6E6FA', '#CBC3E3', '#CF9FFF', '#AA98A9', '#E0B0FF', '#915F6D', '#C3B1E1', '#CCCCFF']
    return colors[Math.floor(Math.random() * colors.length)];
}