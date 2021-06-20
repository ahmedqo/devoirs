import AbstractView from "../src/scripts/XO.AbstractView.js"
import { html } from "../src/scripts/engine.v2.js"

export default class extends AbstractView {
    constructor(params) {
        super(params)
    }

    async compile(page, data) {
        return await html(data || {})("<$ extends '" + page + "' $>");
    }
}