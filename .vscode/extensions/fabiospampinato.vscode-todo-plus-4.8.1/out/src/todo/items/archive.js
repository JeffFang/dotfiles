"use strict";
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
const consts_1 = require("../../consts");
const item_1 = require("./item");
/* ARCHIVE */
class Archive extends item_1.default {
    static is(str) {
        return super.is(str, consts_1.default.regexes.archive);
    }
}
/* EXPORT */
exports.default = Archive;
//# sourceMappingURL=archive.js.map