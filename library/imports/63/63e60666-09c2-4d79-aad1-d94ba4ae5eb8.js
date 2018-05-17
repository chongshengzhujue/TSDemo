"use strict";
cc._RF.push(module, '63e60ZmCcJNearR2Uukrl64', 'TestModel');
// scripts/object/model/userModel/TestModel.ts

// Learn TypeScript:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/typescript/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BasicModel_1 = require("./../BasicModel");
var TestVO_1 = require("../../vo/userVO/TestVO");
var talefun = cc.talefun;
var TestModel = /** @class */ (function (_super) {
    __extends(TestModel, _super);
    function TestModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.testKeyPrefix = "Test";
        _this.testList = {};
        return _this;
        // update (dt) {},
    }
    TestModel.prototype.setTestItem = function (key, textVO) {
        if (textVO !== null) {
            this.testList[key] = textVO;
        }
    };
    TestModel.prototype.saveTestList = function () {
        for (var key in this.testList) {
            var item = this.testList[key];
            this.saveItem(key, item.getFormatStr());
        }
    };
    TestModel.prototype.initModel = function () {
        this.parseDataFromDB();
    };
    TestModel.prototype.parseDataFromDB = function () {
        talefun.LogHelper.log("**************parseDataFromDB*************");
        for (var i = 0; i < 3; i++) {
            var key = this.testKeyPrefix + i;
            var value = this.getItem(key);
            // talefun.LogHelper.log("value : " + value);
            if (value !== null && value !== undefined) {
                var item = new TestVO_1.default();
                item.parseDataFromStr(value);
                this.testList[key] = item;
                talefun.LogHelper.log(item.getFormatStr());
            }
        }
        talefun.LogHelper.log("**************parseDataFromDB*************");
    };
    TestModel.prototype.parseDataFromServer = function (data) {
        ;
    };
    TestModel = __decorate([
        ccclass
    ], TestModel);
    return TestModel;
}(BasicModel_1.default));
exports.default = TestModel;

cc._RF.pop();