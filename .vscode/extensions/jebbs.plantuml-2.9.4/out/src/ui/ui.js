"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const tools_1 = require("../plantuml/tools");
class UI extends vscode.Disposable {
    constructor(viewType, title, file, listener) {
        super(() => this.dispose());
        this._disposables = [];
        this._listener = undefined;
        this._viewType = viewType;
        this._title = title;
        this._base = path.dirname(file);
        this._file = file;
        this._listener = listener;
    }
    show(env) {
        this.createPanel();
        this.loadFile(env || {});
        this._panel.webview.html = this._content;
        this._panel.reveal();
    }
    close() {
        this.dispose();
    }
    refresh(env) {
        this.show(env);
    }
    postMessage(message) {
        this.createPanel();
        return this._panel.webview.postMessage(message);
    }
    createPanel() {
        if (this._panel)
            return;
        this._panel = vscode.window.createWebviewPanel(this._viewType, this._title, vscode.ViewColumn.Two, {
            enableScripts: true,
            enableCommandUris: true,
            localResourceRoots: [vscode.Uri.file(this._base)],
        });
        this.addMessageListener();
        this._panel.onDidDispose(() => {
            this.dispose();
            this._panel = undefined;
        }, null, this._disposables);
    }
    addMessageListener() {
        if (this._panel && this._listener)
            this._panel.webview.onDidReceiveMessage(this.listenerCatch, this, this._disposables);
    }
    listenerCatch(e) {
        try {
            let pm = this._listener(e);
            if (pm instanceof Promise) {
                pm.catch(error => tools_1.showMessagePanel(error));
            }
        }
        catch (error) {
            tools_1.showMessagePanel(error);
        }
    }
    loadFile(env) {
        this._content = this.evalHtml(fs.readFileSync(this._file).toString(), env);
    }
    evalHtml(html, envObj) {
        let envReg = /\$\{(\w+)\}/ig;
        html = html.replace(envReg, '${envObj.$1}');
        let result = eval('`' + html + '`');
        // convert relative "src", "href" paths to absolute
        let linkReg = /(src|href)\s*=\s*([`"'])(.+?)\2/ig;
        let base = this._base;
        result = result.replace(linkReg, (match, ...subs) => {
            let uri = subs[2];
            if (!path.isAbsolute(uri))
                uri = path.join(base, uri);
            if (!fs.existsSync(uri))
                return match;
            uri = vscode.Uri.file(uri).with({ scheme: 'vscode-resource' }).toString();
            return `${subs[0]}=${subs[1]}${uri}${subs[1]}`;
        });
        return result;
    }
    dispose() {
        this._disposables.length && this._disposables.map(d => d && d.dispose());
        this._disposables = [];
    }
}
exports.UI = UI;
//# sourceMappingURL=ui.js.map