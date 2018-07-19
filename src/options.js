export default class Options {
    constructor({arrow=null}) {
        this.setArrow(arrow);
    }

    getArrow() {
        return this.arrow;
    }

    setArrow(value) {
        this.arrow = value;
    }
}
