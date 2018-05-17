"use strict";
cc._RF.push(module, '0ac338j/X1ESaFXhKRJfs0f', 'TestTableViewLogic');
// scripts/viewCtrl/TestTableView/TestTableViewLogic.ts

Object.defineProperty(exports, "__esModule", { value: true });
var UserComponent_1 = require("../Base/UserComponent");
var TestTableViewClass_1 = require("./TestTableViewClass");
// Learn TypeScript:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/typescript/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
var talefun = cc.talefun;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TestTableViewLogic = /** @class */ (function (_super) {
    __extends(TestTableViewLogic, _super);
    function TestTableViewLogic() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tableViewComp = null;
        return _this;
    }
    TestTableViewLogic.prototype.onLoad = function () {
        this.tableViewComp = this.node.getComponent("BasicTableView");
    };
    // 继承 UserComponent， 当组件的node open时 调用
    TestTableViewLogic.prototype.onEnter = function () {
        if (this.node.viewCtrl) {
            this.viewCtrl = this.node.viewCtrl;
        }
        talefun.LogHelper.log("onEnter :" + "TestTableViewLogic");
    };
    // 继承 UserComponent， 当组件的node close时 调用
    TestTableViewLogic.prototype.onExit = function () {
        talefun.LogHelper.log("onExit :" + "TestTableViewLogic");
    };
    TestTableViewLogic.prototype.reloadData = function () {
        if (this.tableViewComp) {
            TestTableViewClass_1.default.parseData([
                {
                    id: 0,
                    size: cc.size(100, 200),
                    name: "jack"
                },
                {
                    id: 1,
                    size: cc.size(200, 200),
                    name: "wolf"
                },
                {
                    id: 2,
                    size: cc.size(100, 200),
                    name: "skin"
                },
                {
                    id: 3,
                    size: cc.size(200, 200),
                    name: "jack"
                },
                {
                    id: 4,
                    size: cc.size(100, 200),
                    name: "jack"
                },
                {
                    id: 5,
                    size: cc.size(100, 200),
                    name: "jack"
                },
                {
                    id: 6,
                    size: cc.size(100, 200),
                    name: "jack"
                },
                {
                    id: 7,
                    size: cc.size(200, 200),
                    name: "jack"
                },
                {
                    id: 8,
                    size: cc.size(200, 200),
                    name: "jack"
                },
                {
                    id: 9,
                    size: cc.size(100, 200),
                    name: "jack"
                },
                {
                    id: 10,
                    size: cc.size(200, 200),
                    name: "jack"
                },
                {
                    id: 11,
                    size: cc.size(200, 200),
                    name: "jack"
                },
                {
                    id: 12,
                    size: cc.size(200, 200),
                    name: "jack"
                },
                {
                    id: 13,
                    size: cc.size(100, 200),
                    name: "jack"
                },
                {
                    id: 14,
                    size: cc.size(100, 200),
                    name: "book"
                },
                {
                    id: 15,
                    size: cc.size(200, 200),
                    name: "book"
                },
            ]);
            this.tableViewComp.viewCtrl = this.viewCtrl;
            this.tableViewComp.reloadData(TestTableViewClass_1.default.dataClassList);
        }
    };
    TestTableViewLogic = __decorate([
        ccclass
    ], TestTableViewLogic);
    return TestTableViewLogic;
}(UserComponent_1.default));
exports.default = TestTableViewLogic;

cc._RF.pop();