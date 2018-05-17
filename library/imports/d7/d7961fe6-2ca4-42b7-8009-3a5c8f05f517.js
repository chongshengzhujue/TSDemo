"use strict";
cc._RF.push(module, 'd7961/mLKRCt4AJOlyPBfUX', 'UserComponent');
// scripts/viewCtrl/base/UserComponent.ts

// 自定义组件 基类 ，用于配置 view 统一参数，例：isFullScene
// 2018.01.09
Object.defineProperty(exports, "__esModule", { value: true });
var talefun = cc.talefun;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UserComponent = /** @class */ (function (_super) {
    __extends(UserComponent, _super);
    function UserComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isFullScene = true;
        _this.viewCtrl = null;
        return _this;
    }
    UserComponent.prototype.onEnter = function () { };
    UserComponent.prototype.onExit = function () { };
    UserComponent.prototype.updateView = function (idx, data) {
    };
    UserComponent.prototype.closeNode = function (callback) {
        if (this.node.viewCtrl) {
            talefun.LogHelper.log("close View");
            this.node.viewCtrl.closeView();
        }
        else {
            talefun.LogHelper.log("no viewCtrl");
        }
        if (callback) {
            callback();
        }
    };
    __decorate([
        property(Boolean)
    ], UserComponent.prototype, "isFullScene", void 0);
    UserComponent = __decorate([
        ccclass
    ], UserComponent);
    return UserComponent;
}(cc.Component));
exports.default = UserComponent;

cc._RF.pop();