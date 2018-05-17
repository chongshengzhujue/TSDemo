"use strict";
cc._RF.push(module, 'ae8a5e8jz9LOodSKEbhN2A/', 'TestAuto');
// scripts/viewCtrl/LogoView/TestAuto.ts

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
var TestAuto = /** @class */ (function (_super) {
    __extends(TestAuto, _super);
    function TestAuto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // LIFE-CYCLE CALLBACKS:
    TestAuto.prototype.onLoad = function () {
        cc.log("======================onload TestAuto");
        this.node.x += 50;
    };
    TestAuto.prototype.start = function () {
        cc.game.addPersistRootNode(this.node);
    };
    TestAuto.prototype.onClickBtn = function () {
        cc.director.loadScene("MainScene");
    };
    TestAuto = __decorate([
        ccclass
    ], TestAuto);
    return TestAuto;
}(cc.Component));
exports.default = TestAuto;

cc._RF.pop();