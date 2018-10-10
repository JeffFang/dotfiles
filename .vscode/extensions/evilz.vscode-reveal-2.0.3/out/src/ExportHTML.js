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
const fs = require("fs");
const copyFile = require("quickly-copy-file");
const path = require("path");
exports.getExportFolderPath = (context) => {
    const rootDir = path.dirname(context.editor.document.fileName);
    const exportFolderName = path.basename(context.editor.document.fileName, '.md') + "-export";
    return path.join(rootDir, exportFolderName);
};
exports.saveIndex = (context, rootdir, data) => {
    const exportFolderName = exports.getExportFolderPath(context);
    const destFile = path.join(exportFolderName, 'index.html');
    if (!fs.existsSync(exportFolderName)) {
        fs.mkdirSync(exportFolderName);
    }
    fs.writeFile(destFile, data, err => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(`create ${destFile}`);
        }
    });
};
const copy = (file, dest) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield copyFile(file, dest);
        console.log(`${file} was copied to ${dest}`);
    }
    catch (err) {
        console.error(err);
    }
});
exports.saveContent = (context, rootdir, revealjsDir, req) => __awaiter(this, void 0, void 0, function* () {
    const exportFolderName = exports.getExportFolderPath(context);
    const staticDirs = ['/css', '/js', '/images', '/plugin', '/lib'];
    // highlight JS Module
    if (req.url.indexOf(`/lib/css/`) === 0) {
        const highlightPath = path.resolve(require.resolve('highlight.js'), '..', '..');
        // save
        const file = path.join(highlightPath, 'styles', req.url.replace(`/lib/css/`, ''));
        const dest = path.join(exportFolderName, req.url);
        yield copy(file, dest);
    }
    else if (staticDirs.find(dir => req.url.indexOf(dir) === 0)) {
        // RevealJS Module or relative files
        const file = path.join(revealjsDir, req.url);
        const dest = path.join(exportFolderName, req.url);
        yield copy(file, dest);
    }
    else if (req.url !== '/') {
        const file = path.join(rootdir, req.url);
        const dest = path.join(exportFolderName, req.url);
        yield copy(file, dest);
    }
});
// export const saveHtml = async (url, dir) => {
//   const asyncFiles = [
//     '/lib/js/classList.js',
//     '/plugin/markdown/marked.js',
//     '/plugin/markdown/markdown.js',
//     '/plugin/highlight/highlight.js',
//     '/plugin/notes/notes.js',
//     '/plugin/math/math.js',
//     '/css/print/paper.css'
//   ]
//   const options = {
//     urls: [url, ...asyncFiles.map(f => url + f)],
//     directory: dir
//   }
//   try {
//     fs.removeSync(options.directory)
//     // with promise
//     // const result = await scrape(options)
//     return options.directory
//   } catch (err) {
//     vscode.window.showErrorMessage('Cannot save slides in html: ' + err)
//   }
// }
//# sourceMappingURL=ExportHTML.js.map