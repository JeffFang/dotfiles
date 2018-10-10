"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const matter = require("gray-matter");
const vscode_1 = require("vscode");
const Configuration_1 = require("./Configuration");
const Models_1 = require("./Models");
const Server_1 = require("./Server");
const SlideParser_1 = require("./SlideParser");
const timers_1 = require("timers");
class VSCodeRevealContext {
    constructor(editor) {
        this.editor = editor;
        this._isInExportMode = false;
        this._server = new Server_1.RevealServer(this);
        this.refresh();
    }
    get title() {
        // TODO : add frontConf title property
        return `RevealJS : ${this.editor.document.fileName}`;
    }
    refresh() {
        this._slides = SlideParser_1.parseSlides(this.slideContent, this.slidifyOptions);
    }
    getDocumentText(range) {
        return this.editor.document.getText(range);
    }
    SetInExportMode(callback) {
        this._isInExportMode = true;
        // Not smart but should be OK
        timers_1.setTimeout(() => {
            this._isInExportMode = false;
            callback();
        }, 10000);
    }
    get IsInExportMode() {
        return this._isInExportMode;
    }
    get slideContent() {
        return matter(this.getDocumentText()).content;
    }
    get frontMatterLineCount() {
        return SlideParser_1.countLines(this.getDocumentText()) - SlideParser_1.countLines(this.slideContent);
    }
    get hasfrontConfig() {
        return matter.test(this.getDocumentText()); // bad d.ts file
    }
    get frontMatter() {
        return matter(this.getDocumentText()).data;
    }
    get slidifyOptions() {
        return this.extensionOptions;
    }
    get revealJsOptions() {
        return this.extensionOptions;
    }
    get extensionOptions() {
        const extensionOptions = Configuration_1.getExtensionOptions();
        const front = this.frontMatter;
        return Object.assign({}, extensionOptions, front);
    }
    get slideCount() {
        return this._slides.length;
    }
    get server() {
        return this._server;
    }
    get slides() {
        return this._slides;
    }
    get slidePosition() {
        const start = new vscode_1.Position(0, 0);
        const end = this.editor.selection.active;
        const range = new vscode_1.Range(start, end);
        const content = matter(this.getDocumentText(range)).content;
        const toPositionSlides = SlideParser_1.parseSlides(content, this.slidifyOptions);
        const currentSlide = toPositionSlides[toPositionSlides.length - 1];
        if (currentSlide.verticalChildren) {
            return [toPositionSlides.length - 1, currentSlide.verticalChildren.length];
        }
        return [toPositionSlides.length - 1, 0];
    }
    get uri() {
        if (this.server.state === Models_1.RevealServerState.Stopped) {
            this.server.start();
        }
        const serverUri = this.server.uri;
        const slidepos = this.slidePosition;
        const finalUri = `${serverUri}#/${slidepos[0]}/${slidepos[1]}/${Date.now()}`;
        return finalUri;
    }
}
exports.VSCodeRevealContext = VSCodeRevealContext;
//# sourceMappingURL=VSCodeRevealContext.js.map