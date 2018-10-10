"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BrowserHelper_1 = require("../BrowserHelper");
const vscode = require("vscode");
const Configuration_1 = require("../Configuration");
exports.EXPORT_PDF = 'vscode-revealjs.exportPDF';
exports.exportPDF = (getContext) => (topindex, verticalIndex) => {
    try {
        const currentContext = getContext();
        if (currentContext === undefined) {
            return;
        }
        const url = currentContext.server.uri.toString() + '?print-pdf-now';
        BrowserHelper_1.openInBrowser(Configuration_1.getExtensionOptions(), url);
    }
    catch (err) {
        vscode.window.showErrorMessage(err);
    }
};
//# sourceMappingURL=exportPDF.js.map