import XOElement from "./XO.Element.js"
export default class extends XOElement {
    static attributes = {
        theme: String,
        aside: Boolean,
        shrink: String,
        change(n, v) {
            switch (n) {
                case "theme":
                    this.querySelectorAll("xo-navbar-item").forEach(el => {
                        el.setAttribute("theme", v);
                    });
                    break;
                case "aside":
                    this.querySelectorAll("xo-navbar-item").forEach(itm => {
                        if (this.matches("[aside]")) {
                            itm.setAttribute("aside", "");
                        } else {
                            itm.removeAttribute("aside");
                        }
                    });
                    break;
                case "shrink":
                    if (this.matches("[shrink]")) {
                        this.$.items.style.width = "0";
                        this.$.back.style.width = "0";
                    } else {
                        this.$.items.style.width = "200px";
                        this.$.back.style.width = "100vw";
                    }
                    break;
            }
        }
    }

    static callbacks = {
        attach() {
            this.$.icon.addEventListener("click", () => {
                if (this.hasAttribute("shrink")) {
                    this.removeAttribute("shrink");
                    this.$.icon.style.transform = "scaleX(-1)";
                    __block__(this, true)
                    var event = new CustomEvent("grow", {
                        bubbles: true,
                        cancelable: true,
                    });
                    this.dispatchEvent(event);
                } else {
                    this.setAttribute("shrink", "");
                    this.$.icon.style.transform = "";
                    __block__(this)
                    var event = new CustomEvent("shrink", {
                        bubbles: true,
                        cancelable: true,
                    });
                    this.dispatchEvent(event);
                }
            });
            this.$.back.addEventListener("click", e => {
                this.setAttribute("shrink", "");
                this.$.icon.style.transform = "";
                __block__(this)
                var event = new CustomEvent("shrink", {
                    bubbles: true,
                    cancelable: true,
                });
                this.dispatchEvent(event);
            });
            window.addEventListener("resize", () => {
                if (window.innerWidth >= 780) {
                    this.setAttribute("shrink", "");
                }
            });
            if (this.matches("[aside]") || window.innerWidth <= 780) __block__(this);
            this.setAttribute("shrink", "");
        },
        detach() {
            this.$.icon.removeEventListener("click", () => {});
            this.$.back.removeEventListener("click", () => {});
            window.removeEventListener("resize", () => {});
        }
    }

    static styles = `
        /* Globals */
        #xo-icon {
            all: unset;
        }
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
            display: block;            
            width: 100%;
            box-sizing: content-box !important;
        }
        section {
            background-color: var(--default);
        }
        :host([theme="water"]) section {      
            background-color: var(--water);
        }
        :host([theme="fire"]) section {      
            background-color: var(--fire);
        }
        :host([theme="earth"]) section {      
            background-color: var(--earth);
        }
        :host([theme="forest"]) section {      
            background-color: var(--forest);
        }
        :host([theme="night"]) section {      
            background-color: var(--night);
        }
        /* Container */
        #xo-container {
            max-width: 1200px;
            padding: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: auto;
            gap: 100px;
        }
        :host([aside]) #xo-container {
            gap: 0;
        }
        /* Brand */
        :host([aside]) #brand {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        /* Icon */
        #xo-icon {
            all: unset;
            display: none;
            width: 30px;
            height: 30px;
        }
        #xo-icon:hover {
            cursor: pointer;
        }
        #xo-icon:focus {
            outline: auto;
        }
        #xo-icon svg {
            width: 100%;
            height: 100%;
            fill: #1d1d1d;
        }
        :host([theme="water"]) #xo-icon svg,
        :host([theme="fire"]) #xo-icon svg,
        :host([theme="forest"]) #xo-icon svg,
        :host([theme="night"]) #xo-icon svg {      
            fill: #ffffff;
        }
        :host([aside]) #xo-icon {
            display: flex;
        }
        /* Background-color */
        :host([aside]) #xo-back {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100%;
            background-color: #0e1215a6;
            z-index: 10000000;
            transition: width 300ms ease-in-out,
                        padding 300ms ease-in-out;
        }
        /* Items */
        #xo-items {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            min-width: max-content;
            gap: 20px;
            flex-wrap: wrap;
        }
        :host([aside]) #xo-items {
            position: fixed;
            top: 0;
            left: 0;
            width: 200px;
            height: 100vh;
            overflow-y: auto;
            overflow-x: hidden;
            background-color: var(--default);
            z-index: 10000000;
            min-width: 0;
            gap: 10px;
            flex-direction: column;
            flex-wrap: unset;
            justify-content: flex-start;
            transition: width 300ms ease-in-out,
                        padding 300ms ease-in-out;
            padding: 10px 0;
            gap: 20px;
        }
        :host([aside][theme="water"]) #xo-items {      
            background-color: var(--water);
        }
        :host([aside][theme="fire"]) #xo-items {      
            background-color: var(--fire);
        }
        :host([aside][theme="earth"]) #xo-items {      
            background-color: var(--earth);
        }
        :host([aside][theme="forest"]) #xo-items {      
            background-color: var(--forest);
        }
        :host([aside][theme="night"]) #xo-items {      
            background-color: var(--night);
        }
        @media (max-width: 767.98px) {
            #xo-container {
                gap: 0;
            }
            /* Brand */
            #brand {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            /* Icon */
            #xo-icon {
                display: flex;
            }
            /* Background-color */
            #xo-back {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100%;
                background-color: #0e1215a6;
                z-index: 10000000;
                transition: width 300ms ease-in-out;
            }
            /* Items */
            #xo-items {
                position: fixed;
                top: 0;
                left: 0;
                width: 200px;
                height: 100vh;
                overflow-y: auto;
                overflow-x: hidden;
                background-color: var(--default);
                z-index: 10000000;
                flex-direction: column;
                min-width: 0;
                flex-wrap: unset;
                justify-content: flex-start;
                transition: width 300ms ease-in-out,
                            padding 300ms ease-in-out;
                padding: 10px 0;
                gap: 20px;
            }
            :host([theme="water"]) #xo-items {      
                background: var(--water);
            }
            :host([theme="fire"]) #xo-items {      
                background: var(--fire);
            }
            :host([theme="earth"]) #xo-items {      
                background: var(--earth);
            }
            :host([theme="forest"]) #xo-items {      
                background: var(--forest);
            }
            :host([theme="night"]) #xo-items {      
                background: var(--night);
            }
        }
    `

    render() {
        return /*html*/ `
            <section>
                <main id="xo-container">
                    <div id="brand">
                        <slot name="brand"></slot>
                        <button id="xo-icon">
                            <svg version="1.0" viewBox="0 0 1000.000000 1000.000000" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                                <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                    <path d="M2345 9989 c-163 -20 -360 -76 -487 -140 -272 -136 -491 -335 -640 -584 -41 -68 -112 -212 -121 -244 -5 -21 -9 -21 -319 -21 -343 0 -402 -7 -504 -57 -78 -37 -173 -128 -212 -201 -150 -281 -16 -614 287 -714 61 -20 92 -22 399 -27 l333 -6 42 -100 c257 -604 876 -975 1524 -915 479 44 912 313 1160 720 43 72 118 229 128 273 l7 27 2797 0 c1960 0 2815 3 2857 11 167 30 318 161 374 325 46 132 36 266 -28 389 -61 116 -155 197 -288 247 l-59 23 -2832 3 c-2005 1 -2833 5 -2833 13 0 20 -62 153 -108 234 -259 451 -740 737 -1262 750 -74 2 -171 -1 -215 -6z m360 -740 c302 -74 531 -320 585 -626 18 -99 8 -268 -20 -358 -83 -266 -268 -451 -535 -535 -98 -31 -264 -38 -372 -16 -304 61 -536 282 -613 582 -28 108 -28 269 0 379 81 325 359 563 691 594 104 9 161 5 264 -20z"></path>
                                    <path d="M5360 6503 c-246 -39 -417 -99 -605 -211 -259 -155 -507 -445 -611 -716 l-29 -76 -1825 0 c-1988 0 -1895 2 -2016 -57 -78 -37 -173 -128 -212 -201 -150 -281 -18 -611 287 -714 l66 -23 1850 -3 1850 -3 29 -75 c59 -154 179 -336 310 -472 288 -300 670 -462 1084 -462 239 0 433 42 646 139 320 145 617 454 751 783 l34 83 1318 5 c1252 5 1321 6 1368 24 295 109 428 432 287 700 -61 117 -155 198 -288 248 l-59 23 -1313 5 -1313 5 -34 83 c-68 166 -185 340 -321 477 -231 233 -511 376 -844 431 -78 12 -347 17 -410 7z m421 -753 c118 -39 211 -94 300 -177 334 -316 332 -836 -5 -1150 -92 -86 -175 -135 -296 -175 -87 -29 -106 -32 -230 -32 -111 -1 -149 3 -213 22 -269 78 -473 279 -553 547 -35 119 -37 287 -5 410 80 305 334 536 646 586 99 16 253 2 356 -31z"></path>
                                    <path d="M2280 2996 c-510 -91 -907 -388 -1129 -844 -21 -42 -44 -94 -50 -114 l-13 -38 -311 0 c-342 0 -401 -7 -503 -57 -78 -37 -173 -128 -212 -201 -150 -281 -16 -614 287 -714 62 -20 89 -22 403 -26 l337 -4 12 -36 c21 -66 95 -209 152 -294 214 -321 511 -533 892 -636 97 -26 108 -27 365 -27 298 0 351 8 555 86 371 142 696 461 847 831 l32 78 2796 0 c1960 0 2814 3 2856 11 167 30 318 161 374 325 46 132 36 266 -28 389 -61 116 -155 197 -288 247 l-59 23 -2827 3 -2827 2 -11 38 c-17 53 -110 229 -163 309 -136 204 -328 375 -558 497 -90 48 -276 114 -399 141 -101 23 -425 29 -530 11z m467 -744 c137 -44 215 -92 319 -196 102 -102 157 -190 201 -321 25 -73 27 -93 27 -235 0 -142 -2 -162 -27 -235 -45 -132 -99 -219 -201 -321 -170 -169 -370 -246 -601 -231 -116 8 -189 28 -300 82 -191 94 -350 282 -409 485 -36 123 -36 317 0 439 40 137 140 291 252 384 104 88 252 157 381 177 104 17 256 5 358 -28z"></path>
                                </g>
                            </svg>
                        </button>
                    </div>
                    <div id="xo-back"></div>
                    <div id="xo-items">
                        <slot></slot>
                    </div>
                </main>
            </section>
        `
    }
}

function __block__(el, opt) {
    if (opt) {
        if ("disabled" in el) el.removeAttribute("disabled");
        if ("blocked" in el) el.removeAttribute("blocked");
        el.querySelectorAll("*").forEach(e => {
            __block__(e, true);
        });
        return;
    }
    if ("disabled" in el) el.setAttribute("disabled", "");
    if ("blocked" in el) el.setAttribute("blocked", "");
    if (el.matches("[slot='brand']")) el.removeAttribute("blocked");
    el.querySelectorAll("*").forEach(e => {
        __block__(e);
    });
}