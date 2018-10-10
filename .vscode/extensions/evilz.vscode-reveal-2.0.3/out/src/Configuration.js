/**
 * @file Manages the configuration settings for the extension.
 * @author Vincent Bourdon @Evilznet
 */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
exports.getRevealJsOptions = () => {
    return exports.loadExtensionOptions();
};
exports.getSlidifyOptions = () => {
    return exports.loadExtensionOptions();
};
exports.getExtensionOptions = () => {
    return exports.loadExtensionOptions();
};
exports.loadExtensionOptions = () => {
    return vscode.workspace.getConfiguration('revealjs');
};
//# sourceMappingURL=Configuration.js.map