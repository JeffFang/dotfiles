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
const ui_1 = require("./ui");
const context_1 = require("../plantuml/context");
const common_1 = require("../plantuml/common");
const previewer_1 = require("../providers/previewer");
context_1.contextManager.addInitiatedListener(ctx => {
    exports.uiPreview = new ui_1.UI("plantuml.preview", common_1.localize(17, null), ctx.asAbsolutePath("templates/preview.html"), setUIStatus);
});
function setUIStatus(status) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(status);
        previewer_1.previewer.setUIStatus(JSON.stringify(status));
    });
}
//# sourceMappingURL=uiPreview.js.map