"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class IframeContentProvider {
    constructor(getContext) {
        this.getContext = getContext;
        // tslint:disable-next-line:variable-name
        this._onDidChange = new vscode.EventEmitter();
    }
    provideTextDocumentContent(uri, token) {
        const url = this.getContext().uri;
        console.log(`return html with iframe ${url}`);
        return `<style>html, body, iframe { height: 100% }</style>
            <iframe src="${url}" frameBorder="0" style="width: 100%; height: 100%" />`;
    }
    get onDidChange() {
        return this._onDidChange.event;
    }
    update() {
        this._onDidChange.fire(this.previewUri);
    }
    register() {
        return vscode.workspace.registerTextDocumentContentProvider(this.uriScheme, this);
    }
    get previewUri() {
        return vscode.Uri.parse('reveal-preview://authority/reveal-preview');
    }
    get uriScheme() {
        return 'reveal-preview';
    }
}
exports.default = IframeContentProvider;
//# sourceMappingURL=IframeContentProvider.js.map