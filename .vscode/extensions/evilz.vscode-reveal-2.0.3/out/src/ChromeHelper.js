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
const path = require("path");
const os = require("os");
const fs = require("fs");
const opn = require("opn");
const vscode_1 = require("vscode");
const WIN_APPDATA = process.env.LOCALAPPDATA || '/';
const DEFAULT_CHROME_PATH = {
    LINUX: '/usr/bin/google-chrome',
    OSX: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    WIN: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    WIN_LOCALAPPDATA: path.join(WIN_APPDATA, 'Google\\Chrome\\Application\\chrome.exe'),
    WINx86: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
};
function getBrowserPath() {
    const platform = getPlatform();
    if (platform === 1 /* OSX */) {
        return existsSync(DEFAULT_CHROME_PATH.OSX) ? DEFAULT_CHROME_PATH.OSX : null;
    }
    else if (platform === 0 /* Windows */) {
        if (existsSync(DEFAULT_CHROME_PATH.WINx86)) {
            return DEFAULT_CHROME_PATH.WINx86;
        }
        else if (existsSync(DEFAULT_CHROME_PATH.WIN)) {
            return DEFAULT_CHROME_PATH.WIN;
        }
        else if (existsSync(DEFAULT_CHROME_PATH.WIN_LOCALAPPDATA)) {
            return DEFAULT_CHROME_PATH.WIN_LOCALAPPDATA;
        }
        else {
            return null;
        }
    }
    else {
        return existsSync(DEFAULT_CHROME_PATH.LINUX) ? DEFAULT_CHROME_PATH.LINUX : null;
    }
}
exports.getBrowserPath = getBrowserPath;
function getPlatform() {
    const platform = os.platform();
    return platform === 'darwin' ? 1 /* OSX */ : platform === 'win32' ? 0 /* Windows */ : 2 /* Linux */;
}
exports.getPlatform = getPlatform;
function existsSync(filepath) {
    try {
        fs.statSync(filepath);
        return true;
    }
    catch (e) {
        // doesn't exist
        return false;
    }
}
exports.existsSync = existsSync;
const chromeAppNames = [];
chromeAppNames[2 /* Linux */] = 'google-chrome ';
chromeAppNames[1 /* OSX */] = 'google chrome';
chromeAppNames[0 /* Windows */] = 'chrome';
exports.openInChrome = (url, headless) => __awaiter(this, void 0, void 0, function* () {
    try {
        const platform = getPlatform();
        const chromeApp = chromeAppNames[platform];
        if (headless) {
            return yield opn(url, { app: [chromeApp, '--headless'] });
        }
        return yield opn(url, { app: chromeApp });
    }
    catch (error) {
        vscode_1.window.showWarningMessage('Can find Chrome on your computer, try with default browser...');
        yield opn(url);
    }
});
//# sourceMappingURL=ChromeHelper.js.map