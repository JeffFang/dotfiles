"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BrowserHelper_1 = require("../BrowserHelper");
const Configuration_1 = require("../Configuration");
exports.SHOW_REVEALJS_IN_BROWSER = 'vscode-revealjs.showRevealJSInBrowser';
exports.showRevealJSInBrowser = (getContext) => () => {
    const context = getContext();
    return BrowserHelper_1.openInBrowser(Configuration_1.getExtensionOptions(), context.uri);
};
//# sourceMappingURL=showRevealJSInBrowser.js.map