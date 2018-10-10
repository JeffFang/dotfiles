"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const vscode = require("vscode");
const goToSlide_1 = require("./commands/goToSlide");
class SlideTreeProvider {
    constructor(getContext) {
        this.getContext = getContext;
        // tslint:disable-next-line:variable-name
        this._onDidChangeTreeData = new vscode.EventEmitter();
        // tslint:disable-next-line:member-ordering
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    }
    update() {
        // Optimize on slide change only !!
        this._onDidChangeTreeData.fire();
    }
    register() {
        return vscode.window.registerTreeDataProvider('slidesExplorer', this);
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        const currentContext = this.getContext();
        return new Promise(resolve => {
            if (element) {
                resolve(this.mapSlides(element.slide.verticalChildren, true, element.slide.index));
            }
            else {
                resolve(this.mapSlides(currentContext.slides));
            }
        });
    }
    mapSlides(slides, isVertical = false, parentIndex) {
        return slides.map((s, i) => new SlideNode(s, isVertical, `${s.index} : ${s.title}`, s.verticalChildren ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None, {
            command: goToSlide_1.GO_TO_SLIDE,
            arguments: isVertical ? [parentIndex, s.index] : [s.index, 0],
            title: 'Go to slide'
        }));
    }
}
exports.SlideTreeProvider = SlideTreeProvider;
class SlideNode extends vscode.TreeItem {
    constructor(slide, isVertical, label, collapsibleState, command) {
        super(label, collapsibleState);
        this.slide = slide;
        this.isVertical = isVertical;
        this.label = label;
        this.collapsibleState = collapsibleState;
        this.command = command;
        this.iconPath = {
            light: path.join(__filename, '..', '..', '..', 'resources', this.iconName),
            dark: path.join(__filename, '..', '..', '..', 'resources', this.iconName)
        };
    }
    get iconName() {
        return this.isVertical ? 'slide-orange.svg' : 'slide-blue.svg';
    }
}
//# sourceMappingURL=SlideExplorer.js.map