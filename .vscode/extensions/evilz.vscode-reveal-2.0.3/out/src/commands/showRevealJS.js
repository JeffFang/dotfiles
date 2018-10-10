"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const VSCODE_PREVIEWHTML = 'vscode.previewHtml';
exports.SHOW_REVEALJS = 'vscode-revealjs.showRevealJS';
exports.showRevealJS = (getContext, iframeProvider) => () => __awaiter(this, void 0, void 0, function* () {
    const currentContext = getContext();
    if (currentContext === undefined || currentContext.editor.document.languageId !== 'markdown') {
        vscode.window.showInformationMessage('revealjs presentation can only be markdown file');
        return;
    }
    try {
        yield vscode.commands.executeCommand(VSCODE_PREVIEWHTML, iframeProvider.previewUri, vscode.ViewColumn.Two, 'Reveal JS presentation');
        yield vscode.commands.executeCommand('workbench.action.previousEditor');
        console.log('show RevealJS presentation in new tab');
    }
    catch (error) {
        vscode.window.showErrorMessage(error);
    }
});
//# sourceMappingURL=showRevealJS.js.map