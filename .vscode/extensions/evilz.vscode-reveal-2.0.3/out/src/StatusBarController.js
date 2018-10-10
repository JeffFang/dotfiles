"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const Models_1 = require("./Models");
class StatusBarController {
    constructor(getContext) {
        this.getContext = getContext;
    }
    update() {
        const context = this.getContext();
        this.updateAddress(context);
        this.updateCount(context);
        this.updateStop(context);
    }
    dispose() {
        this.addressItem.dispose();
        this.countItem.dispose();
        this.stopItem.dispose();
    }
    updateAddress(context) {
        if (!this.addressItem) {
            this.addressItem = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Right, 100);
        }
        if (context.server.state === Models_1.RevealServerState.Started) {
            this.addressItem.text = `$(server) ${context.server.uri}`;
            this.addressItem.command = 'vscode-revealjs.showRevealJSInBrowser';
            this.addressItem.show();
        }
        else {
            this.addressItem.hide();
        }
    }
    updateStop(context) {
        if (!this.stopItem) {
            this.stopItem = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Right, 101);
        }
        this.stopItem.text = `$(primitive-square)`;
        this.stopItem.color = 'red';
        this.stopItem.command = 'vscode-revealjs.KillRevealJSServer';
        if (context.server.state === Models_1.RevealServerState.Started) {
            this.stopItem.show();
        }
        else {
            this.stopItem.hide();
        }
    }
    updateCount(context) {
        if (!this.countItem) {
            this.countItem = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Right, 102);
        }
        if (!context.editor || context.editor.document.languageId !== 'markdown') {
            this.countItem.hide();
            return;
        }
        const slidecount = context.slideCount;
        if (slidecount < 2) {
            this.countItem.hide();
        }
        else {
            this.countItem.text = `$(note) ${slidecount} Slides`;
            this.countItem.command = 'vscode-revealjs.showRevealJS';
            this.countItem.show();
        }
    }
}
exports.StatusBarController = StatusBarController;
//# sourceMappingURL=StatusBarController.js.map