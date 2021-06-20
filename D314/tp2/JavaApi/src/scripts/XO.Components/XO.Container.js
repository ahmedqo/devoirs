import XOElement from "./XO.Element.js"

export default class extends XOElement {
    static styles = `
        /* Globals */
        * {
            font-family: Arial, sans-serif;
            box-sizing: border-box;
        }
        /* Element */
        :host {
            box-sizing: content-box !important;
            min-height: 100vh;
            display: block;
            width: 100%;
        }
    `

    render() {
        return /*html*/ `
            <slot></slot>
        `;
    }
}