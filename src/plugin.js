import Picker from "./picker";

export default class Plugin {
    constructor(editor, options) {
        this.editor = editor;
        this.mousePosition = [0, 0];
        this.picker = new Picker(editor, options);
        this.preventingMouseHandling = false;
    }

    pickOutput(output, node) {
        if (output) {
            this.picker.output = output;
        }
    }

    pickInput(input, node) {
        if (this.picker.output === null) {
            if (input.hasConnection()) {
                this.picker.output = input.connections[0].output;
                this.editor.removeConnection(input.connections[0]);
                this.picker.renderConnection(this.mousePosition);
            }

            return;
        }

        if (!input.multipleConnections && input.hasConnection()) {
            this.editor.removeConnection(input.connections[0]);
        }

        if (!this.picker.output.multipleConnections && this.picker.output.hasConnection()) {
            this.editor.removeConnection(this.picker.output.connections[0]);
        }

        if (this.picker.output.connectedTo(input)) {
            let connection = input.connections.find(c => c.output === this.picker.output);

            this.editor.removeConnection(connection);
        }

        this.editor.connect(this.picker.output, input);
        this.picker.output = null
    }

    mouseHandle(e, input, output, socket) {
        if (this.preventingMouseHandling) {
            return;
        }

        e.stopPropagation();
        e.preventDefault();

        if (input) {
            this.pickInput(input, socket);
        } else if (output) {
            this.pickOutput(output, socket);
        }
    }

    preventMouseHandling(value) {
        this.preventingMouseHandling = value;
    }
}
