"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STOP_REVEALJS_SERVER = 'vscode-revealjs.stopRevealJSServer';
exports.stopRevealJSServer = (getContext, statusBarController) => () => {
    const currentContext = getContext();
    if (currentContext === undefined) {
        return;
    }
    currentContext.server.stop();
    statusBarController.update();
};
//# sourceMappingURL=stopRevealJSServer.js.map