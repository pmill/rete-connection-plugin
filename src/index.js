import Plugin from "./plugin";

export default function install(editor) {
    const plugin = new Plugin(editor);

    editor.on('rendersocket', ({ el, input, output, socket }) => {
        var prevent = false;

        el.addEventListener('mousedown', e => (plugin.mouseHandle(e, input, output, socket), prevent = true));
        el.addEventListener('mouseup', e => plugin.mouseHandle(e, input, output, socket));
        el.addEventListener('click', e => (plugin.mouseHandle(e, input, output, socket), prevent = false));
        el.addEventListener('mousemove', () => (prevent = false));
    });

    editor.on('mousemove', arg => {
        plugin.mousePosition = arg;
        picker.renderConnection(arg);
    });

    editor.on('click', () => { plugin.picker.output = null; });

    editor.on('renderconnection', arg => renderConnection(arg));
}
