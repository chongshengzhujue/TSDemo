(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/viewCtrl/GameView/GameViewLogic.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '56f27P2gSdGzL/aC8VXKYgs', 'GameViewLogic', __filename);
// scripts/viewCtrl/GameView/GameViewLogic.ts

Object.defineProperty(exports, "__esModule", { value: true });
var UserComponent_1 = require("../Base/UserComponent");
var ViewManager_1 = require("../ViewManager");
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
var talefun = cc.talefun;
var GameViewLogic = /** @class */ (function (_super) {
    __extends(GameViewLogic, _super);
    function GameViewLogic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameViewLogic.prototype.onLoad = function () {
    };
    GameViewLogic.prototype.onEnter = function () {
        if (this.node.viewCtrl) {
            this.viewCtrl = this.node.viewCtrl;
        }
        talefun.LogHelper.log("onEnter :" + "LogoViewLogic");
        var self = this;
        self.node.on(cc.Node.EventType.TOUCH_START, self.touchStart.bind(self));
        self.node.on(cc.Node.EventType.TOUCH_MOVE, self.touchMove.bind(self));
        self.node.on(cc.Node.EventType.TOUCH_END, self.touchEnd.bind(self));
        self.node.on(cc.Node.EventType.TOUCH_CANCEL, self.touchCancel.bind(self));
    };
    GameViewLogic.prototype.touchStart = function (event) {
        ViewManager_1.default.getInstance().showPrefab("physicsNode", this.physicsPrefab, {}, this.node, this.viewCtrl);
    };
    GameViewLogic.prototype.touchMove = function (event) {
    };
    GameViewLogic.prototype.touchEnd = function (event) {
    };
    GameViewLogic.prototype.touchCancel = function (event) {
    };
    __decorate([
        property(cc.Prefab)
    ], GameViewLogic.prototype, "physicsPrefab", void 0);
    GameViewLogic = __decorate([
        ccclass
    ], GameViewLogic);
    return GameViewLogic;
}(UserComponent_1.default));
exports.default = GameViewLogic;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=GameViewLogic.js.map
        