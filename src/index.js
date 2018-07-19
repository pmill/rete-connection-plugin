import Plugin from "./plugin";
import ConnectionRenderer from "./connection-renderer";
import Options from './options';
import ArrowOptions from './arrow-options';

function install(editor, options) {
    if (typeof options === 'undefined') {
        options = new Options();
    }

    const plugin = new Plugin(editor, options);
    const connectionRenderer = new ConnectionRenderer(options);

    editor.on('rendersocket', ({ el, input, output, socket }) => {
        var prevent = false;

        el.addEventListener('mousedown', e => (plugin.mouseHandle(e, input, output, socket), prevent = true));
        el.addEventListener('mouseup', e => plugin.mouseHandle(e, input, output, socket));
        el.addEventListener('click', e => (plugin.mouseHandle(e, input, output, socket), prevent = false));
        el.addEventListener('mousemove', () => (prevent = false));
    });

    editor.on('mousemove', arg => {
        plugin.mousePosition = arg;
        plugin.picker.renderConnection(arg);
    });

    editor.on('click', () => { plugin.picker.output = null; });

    editor.on('renderconnection', arg => connectionRenderer.render(arg));
}

export {ArrowOptions, Options};
export default {install}
