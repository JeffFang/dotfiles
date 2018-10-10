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
const opn = require("opn");
const ExportHTML_1 = require("../ExportHTML");
const BrowserHelper_1 = require("../BrowserHelper");
const Configuration_1 = require("../Configuration");
exports.EXPORT_HTML = 'vscode-revealjs.exportHTML';
exports.exportHTML = (getContext) => () => __awaiter(this, void 0, void 0, function* () {
    vscode.window.withProgress({ location: vscode.ProgressLocation.Window, title: 'hello' }, p => {
        return new Promise((resolve, reject) => {
            p.report({ message: 'Start exporting html...' });
            const handle = setInterval(() => {
                p.report({ message: 'Export to html done' });
                clearInterval(handle);
                resolve();
            }, 9000);
        });
    });
    // vscode.window.withProgress('$(gear) export to html...')
    const currentContext = getContext();
    if (currentContext === undefined) {
        return;
    }
    currentContext.SetInExportMode(() => {
        opn(ExportHTML_1.getExportFolderPath(currentContext));
    });
    BrowserHelper_1.openInBrowser(Configuration_1.getExtensionOptions(), currentContext.uri, true);
    BrowserHelper_1.openInBrowser(Configuration_1.getExtensionOptions(), `${currentContext.server.uri}plugin/notes/notes.html`, true);
});
//# sourceMappingURL=exportHTML.js.map