import initView from "./initView.js"

export default class extends initView {
    constructor(params) {
        super(params);
        this.title("Reservation");
    }

    async render() {
        return this.compile `templates/booking.v`;
    }
}