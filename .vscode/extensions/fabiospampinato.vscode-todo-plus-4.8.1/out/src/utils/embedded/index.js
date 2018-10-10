"use strict";
/* IMPORT */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const execa = require("execa");
const fs = require("fs");
const path = require("path");
const vscode = require("vscode");
const config_1 = require("../../config");
const ag_1 = require("./providers/ag");
const js_1 = require("./providers/js");
const rg_1 = require("./providers/rg");
/* EMBEDDED */
const Embedded = {
    initProvider() {
        return __awaiter(this, void 0, void 0, function* () {
            if (Embedded.provider)
                return;
            const { javascript, ag, rg } = Embedded.providers, provider = config_1.default.get().embedded.provider, Provider = provider ? (yield Embedded.providers[provider]()) || javascript() : (yield ag()) || (yield rg()) || javascript();
            Embedded.provider = new Provider();
        });
    },
    provider: undefined,
    providers: {
        javascript() {
            return js_1.default;
        },
        ag() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    yield execa('ag', ['--version']);
                    return ag_1.default;
                }
                catch (e) { }
            });
        },
        rg() {
            return __awaiter(this, void 0, void 0, function* () {
                const config = config_1.default.get(), lookaroundRe = /\(\?<?(!|=)/;
                if (lookaroundRe.test(config.embedded.providers.rg.regex)) {
                    vscode.window.showErrorMessage('ripgrep doesn\'t support lookaheads and lookbehinds, you have to update your "todo.embedded.providers.rg.regex" setting if you want to use ripgrep');
                    return;
                }
                try {
                    yield execa('rg', ['--version']);
                    return rg_1.default;
                }
                catch (e) { }
                const name = /^win/.test(process.platform) ? 'rg.exe' : 'rg', basePath = path.dirname(path.dirname(require.main.filename)), filePaths = [
                    path.join(basePath, `node_modules.asar.unpacked/vscode-ripgrep/bin/${name}`),
                    path.join(basePath, `node_modules/vscode-ripgrep/bin/${name}`)
                ];
                for (let filePath of filePaths) {
                    try {
                        fs.accessSync(filePath);
                        rg_1.default.bin = filePath;
                        return rg_1.default;
                    }
                    catch (e) { }
                }
            });
        }
    }
};
/* EXPORT */
exports.default = Embedded;
//# sourceMappingURL=index.js.map