"use strict";
cc._RF.push(module, '51fe6wIowJGr4ex/1NBe1VS', 'ObjectManager');
// scripts/object/ObjectManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BasicModel_1 = require("./model/BasicModel");
var TestModel_1 = require("./model/userModel/TestModel");
var UserDataModel_1 = require("./model/userModel/UserDataModel");
// Learn TypeScript:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/typescript/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ObjectManager = /** @class */ (function () {
    function ObjectManager() {
        this.testModel = null;
        this.userDataModel = null;
    }
    ObjectManager_1 = ObjectManager;
    ObjectManager.getInstance = function () {
        if (ObjectManager_1._instance == null) {
            ObjectManager_1._instance = new ObjectManager_1();
        }
        return ObjectManager_1._instance;
    };
    ObjectManager.prototype.initModelData = function () {
        this.testModel = new TestModel_1.default();
        this.testModel.initModel();
        this.userDataModel = new UserDataModel_1.default();
        this.userDataModel.initModel();
    };
    ObjectManager.prototype.getModelByName = function (name) {
        var ret = this[name];
        if (ret !== null && ret instanceof BasicModel_1.default) {
            return ret;
        }
        return null;
    };
    ObjectManager._instance = null;
    ObjectManager = ObjectManager_1 = __decorate([
        ccclass
    ], ObjectManager);
    return ObjectManager;
    var ObjectManager_1;
}());
exports.default = ObjectManager;

cc._RF.pop();