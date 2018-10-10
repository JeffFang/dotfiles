// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const types_1 = require("../common/application/types");
const types_2 = require("../common/terminal/types");
const types_3 = require("../common/types");
const types_4 = require("../ioc/types");
let TerminalAutoActivation = class TerminalAutoActivation {
    constructor(container) {
        this.container = container;
        this.helper = container.get(types_2.ITerminalHelper);
    }
    register() {
        const manager = this.container.get(types_1.ITerminalManager);
        const disposables = this.container.get(types_3.IDisposableRegistry);
        const disposable = manager.onDidOpenTerminal(this.activateTerminal, this);
        disposables.push(disposable);
    }
    activateTerminal(terminal) {
        return this.helper.activateEnvironmentInTerminal(terminal);
    }
};
TerminalAutoActivation = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_4.IServiceContainer))
], TerminalAutoActivation);
exports.TerminalAutoActivation = TerminalAutoActivation;
//# sourceMappingURL=activation.js.map