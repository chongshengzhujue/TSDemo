"use strict";
cc._RF.push(module, '0b21btZY1lNLoZQ4GLmOItD', 'SceneManager');
// scripts/scene/SceneManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
// 场景逻辑类，用于配置场景初始化资源
// 2018.01.10 li.xiao 
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //用于加载场景初始界面
        _this.launchView = null;
        //用于加载场景初始界面
        _this.launchViewName = "";
        //用于加载场景初始背景音乐
        _this.defaultClickAudio = null;
        //用于网络等待界面
        _this.netloadingView = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    NewClass.prototype.onLoad = function () {
        cc.talefun.ViewManager.showView(this.launchViewName || "LogoView", "hello");
        cc.talefun.AudioManager.setDefaultClickAudio(this.defaultClickAudio);
        cc.talefun.LogHelper.log("defaut : " + this.defaultClickAudio);
    };
    ;
    __decorate([
        property(cc.Prefab)
    ], NewClass.prototype, "launchView", void 0);
    __decorate([
        property
    ], NewClass.prototype, "launchViewName", void 0);
    __decorate([
        property(cc.AudioClip)
    ], NewClass.prototype, "defaultClickAudio", void 0);
    __decorate([
        property(cc.Prefab)
    ], NewClass.prototype, "netloadingView", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();