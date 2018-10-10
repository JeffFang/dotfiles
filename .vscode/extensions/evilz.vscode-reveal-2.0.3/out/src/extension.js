'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const showRevealJS_1 = require("./commands/showRevealJS");
const showRevealJSInBrowser_1 = require("./commands/showRevealJSInBrowser");
const stopRevealJSServer_1 = require("./commands/stopRevealJSServer");
const goToSlide_1 = require("./commands/goToSlide");
const exportPDF_1 = require("./commands/exportPDF");
const exportHTML_1 = require("./commands/exportHTML");
const IframeContentProvider_1 = require("./IframeContentProvider");
const SlideExplorer_1 = require("./SlideExplorer");
const StatusBarController_1 = require("./StatusBarController");
const VSCodeRevealContexts_1 = require("./VSCodeRevealContexts");
const Configuration_1 = require("./Configuration");
function activate(context) {
    const registerCommand = (command, callback, thisArg) => {
        const disposable = vscode.commands.registerCommand(command, callback, thisArg);
        context.subscriptions.push(disposable);
    };
    const contexts = new VSCodeRevealContexts_1.VSCodeRevealContexts();
    const getContext = contexts.getContext.bind(contexts);
    // -- IframeContentProvider --
    const iframeProvider = new IframeContentProvider_1.default(getContext);
    iframeProvider.register();
    // -- Status --
    const statusBarController = new StatusBarController_1.StatusBarController(getContext);
    statusBarController.update();
    // -- TreeExplorer --
    const slidesExplorer = new SlideExplorer_1.SlideTreeProvider(getContext);
    slidesExplorer.register();
    const refreshAll = () => {
        contexts.getContext().refresh();
        statusBarController.update();
        slidesExplorer.update();
        iframeProvider.update();
    };
    console.log('"vscode-reveal" is now active');
    vscode.commands.executeCommand('setContext', 'slideExplorerEnabled', Configuration_1.getExtensionOptions().slideExplorerEnabled);
    // COMMANDS
    registerCommand(showRevealJS_1.SHOW_REVEALJS, showRevealJS_1.showRevealJS(getContext, iframeProvider));
    registerCommand(showRevealJSInBrowser_1.SHOW_REVEALJS_IN_BROWSER, showRevealJSInBrowser_1.showRevealJSInBrowser(contexts.getContext));
    registerCommand(stopRevealJSServer_1.STOP_REVEALJS_SERVER, stopRevealJSServer_1.stopRevealJSServer(contexts.getContext, statusBarController));
    registerCommand(goToSlide_1.GO_TO_SLIDE, goToSlide_1.goToSlide(contexts.getContext));
    registerCommand(exportPDF_1.EXPORT_PDF, exportPDF_1.exportPDF(contexts.getContext));
    registerCommand(exportHTML_1.EXPORT_HTML, exportHTML_1.exportHTML(contexts.getContext));
    // ON SELECTION CHANGE
    vscode.window.onDidChangeTextEditorSelection(e => {
        iframeProvider.update();
        contexts.getContext().refresh(); // dont change this order !!!!!!
        statusBarController.update();
        slidesExplorer.update();
    });
    // ON TAB CHANGE
    vscode.window.onDidChangeActiveTextEditor(editor => {
        if (editor) {
            refreshAll();
        }
    }, this, context.subscriptions);
    // ON CHANGE TEXT
    // vscode.workspace.onDidChangeTextDocument(
    //   e => {
    //     // refreshAll()
    //   },
    //   this,
    //   context.subscriptions
    // )
    vscode.workspace.onDidChangeConfiguration(e => {
        vscode.commands.executeCommand('setContext', 'slideExplorerEnabled', Configuration_1.getExtensionOptions().slideExplorerEnabled);
    });
    // ON SAVE
    vscode.workspace.onDidSaveTextDocument(document => {
        if (document === vscode.window.activeTextEditor.document) {
            refreshAll();
        }
    }, this, context.subscriptions);
    vscode.workspace.onDidCloseTextDocument(document => {
        contexts.deleteContext(document);
    }, this, context.subscriptions);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
    console.log('"vscode-reveal" is now deactivated');
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map