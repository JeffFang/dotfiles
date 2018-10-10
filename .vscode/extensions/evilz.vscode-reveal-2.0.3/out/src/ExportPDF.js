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
const vscode = require("vscode");
const BrowserHelper_1 = require("./BrowserHelper");
const child_process_1 = require("child_process");
const Configuration_1 = require("./Configuration");
/*
 * export a html to a pdf file (html-pdf)
//  */
exports.savePdf = (url, filename) => __awaiter(this, void 0, void 0, function* () {
    vscode.window.setStatusBarMessage('$(markdown) export to pdf...');
    const promise = new Promise((resolve, reject) => {
        const chromePath = BrowserHelper_1.getBrowserPath(Configuration_1.getExtensionOptions());
        const chromeFlags = ['--headless', '--disable-gpu', '--no-margins', '--remote-debugging-port=9222', url];
        // const chromeFlags = ['--headless', '--disable-gpu', '--print-to-pdf=' + filename, '--no-margins', '--remote-debugging-port=9222', url]
        const chromeProc = child_process_1.spawn(chromePath, chromeFlags, {});
        chromeProc.on('exit', function (code, signal) {
            console.log('child process exited with ' + `code ${code} and signal ${signal}`);
        });
        chromeProc.stdout.on('data', data => {
            console.log(`child stdout:\n${data}`);
        });
        chromeProc.stderr.on('data', data => {
            if (data.toString().indexOf('Written to file') === -1) {
                console.error(`child stderr:\n${data}`);
                reject(data);
            }
        });
        chromeProc.on('exit', function (code, signal) {
            console.log('child process exited with ' + `code ${code} and signal ${signal}`);
            if (code === 0) {
                resolve(filename);
            }
            else {
                reject(code);
            }
        });
    });
    return promise;
});
//# sourceMappingURL=ExportPDF.js.map