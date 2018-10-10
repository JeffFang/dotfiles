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
const ExportHTML_1 = require("./ExportHTML");
const SlideParser_1 = require("./SlideParser");
const ChromeHelper_1 = require("./ChromeHelper");
const opn = require("opn");
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
exports.SHOW_REVEALJS_IN_BROWSER = 'vscode-revealjs.showRevealJSInBrowser';
exports.showRevealJSInBrowser = (getContext) => () => {
    const context = getContext();
    return ChromeHelper_1.openInChrome(context.uri);
};
exports.STOP_REVEALJS_SERVER = 'vscode-revealjs.stopRevealJSServer';
exports.stopRevealJSServer = (getContext, statusBarController) => () => {
    const currentContext = getContext();
    if (currentContext === undefined) {
        return;
    }
    currentContext.server.stop();
    statusBarController.update();
};
exports.GO_TO_SLIDE = 'vscode-revealjs.goToSlide';
exports.goToSlide = (getContext) => (topindex, verticalIndex) => {
    const currentContext = getContext();
    if (currentContext === undefined || topindex === undefined) {
        return;
    }
    const linesCount = SlideParser_1.countLinesToSlide(currentContext.slides, topindex, verticalIndex) + currentContext.frontMatterLineCount;
    const position = new vscode.Position(linesCount + 1, 0); // ugly + 1 to go to real first line
    currentContext.editor.selections = [new vscode.Selection(position, position)];
    currentContext.editor.revealRange(new vscode.Range(position, position.translate(20)));
};
exports.EXPORT_PDF = 'vscode-revealjs.exportPDF';
exports.exportPDF = (getContext) => (topindex, verticalIndex) => {
    try {
        const currentContext = getContext();
        if (currentContext === undefined) {
            return;
        }
        const url = currentContext.server.uri.toString() + '?print-pdf-now';
        ChromeHelper_1.openInChrome(url);
        // savePdf(url, currentContext.editor.document.fileName.replace('.md', '.pdf'))
        //   .then((f) => {
        //     open(f)
        //     vscode.window.showInformationMessage('completed')
        //   })
        //   .catch(err => {
        //     vscode.window.showErrorMessage('Cannot save pdf: ' + err)
        //   })
        // USE https://github.com/GoogleChrome/chrome-launcher
        // LAUNCH CHROME and print
        // "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --headless --print-to-pdf="d:\\{{path and file name}}.pdf" https://google.com
    }
    catch (err) {
        vscode.window.showErrorMessage(err);
    }
};
exports.EXPORT_HTML = 'vscode-revealjs.exportHTML';
exports.exportHTML = (getContext) => (topindex, verticalIndex) => {
    const currentContext = getContext();
    if (currentContext === undefined) {
        return;
    }
    ExportHTML_1.saveHtml(currentContext.uri, currentContext.editor.document.fileName.replace('.md', ''))
        .then(dirPath => opn(dirPath))
        .catch(err => {
        vscode.window.showErrorMessage('Cannot save pdf: ' + err);
    });
};
//# sourceMappingURL=Commands.js.map