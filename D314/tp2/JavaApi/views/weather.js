import initView from "./initView.js"

export default class extends initView {
    constructor(params) {
        super(params);
        this.title("Meteo");
    }

    async render() {
        return await this.compile `templates/weather.v`;
    }
}