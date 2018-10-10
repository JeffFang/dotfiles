"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SlideParser_1 = require("../SlideParser");
const vscode = require("vscode");
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
//# sourceMappingURL=goToSlide.js.map