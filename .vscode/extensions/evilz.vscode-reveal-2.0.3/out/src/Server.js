"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
// import * as url from 'url'; tobe used for pdf print
const path = require("path");
const vscode_1 = require("vscode");
const Models_1 = require("./Models");
const Template_1 = require("./Template");
const ExportHTML_1 = require("./ExportHTML");
class RevealServer {
    constructor(context) {
        this.context = context;
        this.state = Models_1.RevealServerState.Stopped;
        this.app = express();
        this.staticDir = express.static;
        this.host = 'localhost';
        this.rootDir = '';
        this.revealBasePath = '';
        this.initExpressServer = () => {
            this.app.use(this.exportMiddleware());
            const staticDirs = ['css', 'js', 'images', 'plugin', 'lib'];
            for (const dir of staticDirs) {
                this.app.use('/' + dir, this.staticDir(path.join(this.revealBasePath, dir)));
            }
            this.app.use('/', this.staticDir(this.rootDir));
            const highlightPath = path.resolve(require.resolve('highlight.js'), '..', '..');
            this.app.use(`/lib/css/`, this.staticDir(path.join(highlightPath, 'styles')));
            this.app.get('/', this.renderMarkdownAsSlides);
        };
        this.renderMarkdownAsSlides = (req, res) => {
            const { title, extensionOptions, slideContent } = this.context;
            const html = Template_1.renderRevealHtml(title, extensionOptions, slideContent);
            res.send(html);
        };
        this.exportMiddleware = () => (req, res, next) => {
            if (this.context.IsInExportMode) {
                const send = res.send;
                // tslint:disable-next-line:no-this-assignment
                const { rootDir, revealBasePath, context } = this;
                res.send = function (data) {
                    ExportHTML_1.saveIndex(context, rootDir, data);
                    send.apply(res, arguments);
                };
                ExportHTML_1.saveContent(context, rootDir, revealBasePath, req);
            }
            next();
        };
        this.rootDir = path.dirname(this.context.editor.document.fileName);
        this.revealBasePath = path.resolve(require.resolve('reveal.js'), '..', '..');
        this.initExpressServer();
    }
    stop() {
        if (this.state === Models_1.RevealServerState.Started) {
            this.server.close();
            this.state = Models_1.RevealServerState.Stopped;
            console.log(`Reveal-server Stopped`);
        }
    }
    start() {
        try {
            if (this.state === Models_1.RevealServerState.Stopped) {
                this.server = this.app.listen(0);
                this.state = Models_1.RevealServerState.Started;
                console.log(`Reveal-server started, opening at http://${this.host}:${this.server.address().port}`);
            }
            this.uri = vscode_1.Uri.parse(`http://${this.host}:${this.server.address().port}/`);
        }
        catch (err) {
            vscode_1.window.showErrorMessage(`Cannot start server: ${err}`);
        }
    }
}
exports.RevealServer = RevealServer;
//# sourceMappingURL=Server.js.map