import Path from "svg-path-generator";

export default class ConnectionRenderer {
    constructor(options) {
        this.options = options;
    }

    render({el, x1, y1, x2, y2, connection}) {
        const widthDifference = x2 - x1;

        const path = Path()
            .moveTo(x1, y1)
            .relative().horizontalLineTo(widthDifference / 2)
            .verticalLineTo(y2)
            .horizontalLineTo(x2)
            .end();

        const classes = this.getClasses(connection);

        el.innerHTML = `<svg class="connection ${classes.join(' ')}">
            <path class="connection-path" d="${path}"/>
        </svg>`;

        if (this.options.arrow) {
            const svgElement = el.getElementsByTagName('svg')[0];
            this.renderArrow(svgElement);
        }
    }

    renderArrow(el) {
        const pathElement = el.getElementsByClassName('connection-path')[0];
        const pathLength = pathElement.getTotalLength();

        const arrowPosition = pathLength * this.options.arrow.getPosition();
        console.log(this.options.arrow);
        console.log('arrowPosition', arrowPosition);

        const pathMiddlePoint = pathElement.getPointAtLength(arrowPosition);
        const pathMiddlePointNext = pathElement.getPointAtLength(arrowPosition + 1);

        const arrowPath = this.getArrowPath(pathMiddlePoint, this.options.arrow.getSize());
        const arrowRotation = this.getArrowRotation(pathMiddlePoint, pathMiddlePointNext);

        el.innerHTML += `<svg class="connection-arrow">
            <path d="${arrowPath}" transform="rotate(${arrowRotation} ${pathMiddlePoint.x} ${pathMiddlePoint.y})" />
        </svg>`;
    }

    getArrowRotation(pathMiddlePoint, pathMiddlePointNext) {
        if (pathMiddlePointNext.y > pathMiddlePoint.y) {
            return 90;
        } else if (pathMiddlePointNext.y < pathMiddlePoint.y) {
            return -90;
        } else if (pathMiddlePointNext.x < pathMiddlePoint.x) {
            return 180;
        }

        return 0;
    }

    getArrowPath(centerPoint, diameter) {
        let radius = diameter / 2;

        return Path()
            .moveTo(centerPoint.x - radius, centerPoint.y - radius)
            .relative().verticalLineTo(diameter)
            .relative().lineTo((diameter * 1.1), -radius)
            .close()
            .end();
    }

    toTrainCase(str) {
        return str.toLowerCase().replace(/ /g, '-');
    }

    getClasses(connection) {
        return !connection?[]:[
            'input-' + this.toTrainCase(connection.input.name),
            'output-' + this.toTrainCase(connection.output.name),
            'socket-input-' + this.toTrainCase(connection.input.socket.name),
            'socket-output-' + this.toTrainCase(connection.output.socket.name)
        ];
    }
}
