"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const VSCodeRevealContext_1 = require("./VSCodeRevealContext");
class VSCodeRevealContexts {
    constructor() {
        this.innerArray = new Array();
        this.getContext = () => {
            const editor = this.getActiveEditor();
            if (!editor) {
                return undefined;
            }
            let actualContext = this.innerArray.find(x => x.editor === editor);
            if (!actualContext) {
                actualContext = new VSCodeRevealContext_1.VSCodeRevealContext(editor);
                this.innerArray.push(actualContext);
            }
            return actualContext;
        };
        this.deleteContext = (document) => {
            if (!document) {
                return undefined;
            }
            const index = this.innerArray.findIndex(x => x.editor.document === document);
            if (index >= 0) {
                const context = this.innerArray[index];
                context.server.stop();
                this.innerArray = this.innerArray.splice(index, 1);
            }
        };
        this.getActiveEditor = () => {
            const editor = vscode.window.activeTextEditor;
            if (editor.document.languageId !== 'markdown') {
                return undefined;
            }
            return editor;
        };
    }
}
exports.VSCodeRevealContexts = VSCodeRevealContexts;
//# sourceMappingURL=VSCodeRevealContexts.js.map