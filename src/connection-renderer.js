import Path from "svg-path-generator";

export default class ConnectionRenderer {
    render({el, x1, y1, x2, y2, connection}) {
        const widthDifference = x2 - x1;

        const path = Path()
            .moveTo(x1, y1)
            .relative().horizontalLineTo(widthDifference / 2)
            .verticalLineTo(y2)
            .horizontalLineTo(x2)
            .end();

        const classes = getClasses(connection);

        el.innerHTML = `<svg class="connection ${classes.join(' ')}">
            <path d="${path}"/>
        </svg>`;
    }

    toTrainCase(str) {
        return str.toLowerCase().replace(/ /g, '-');
    }

    getClasses(connection) {
        return !connection?[]:[
            'input-' + toTrainCase(connection.input.name),
            'output-' + toTrainCase(connection.output.name),
            'socket-input-' + toTrainCase(connection.input.socket.name),
            'socket-output-' + toTrainCase(connection.output.socket.name)
        ];
    }
}
