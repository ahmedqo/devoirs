import initView from "./initView.js"

export default class extends initView {
    constructor(params) {
        super(params);
        this.title("Villes");
    }

    async render() {
        return await this.compile `templates/city.v`;
    }
}