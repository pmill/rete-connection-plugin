export default class ArrowOptions {
    constructor({size=16, position=0.9}) {
        this.setSize(size);
        this.setPosition(position);
    }

    getSize() {
        return this.size;
    }

    setSize(size) {
        this.size = size;
    }

    getPosition() {
        return this.position;
    }

    setPosition(position) {
        if (position < 0) {
            this.position = 0;
        } else if (position > 1) {
            this.position = 1;
        } else {
            this.position = position;
        }
    }
}
