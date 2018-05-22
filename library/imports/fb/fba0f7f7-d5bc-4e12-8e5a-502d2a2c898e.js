"use strict";
cc._RF.push(module, 'fba0ff31bxOEo5aUC0qLImO', 'GameInit');
// scripts/GameInit.ts

// 游戏初始化 所有单例管理类的实例委托到 cc.talefun,调用时(<any>cc).talefun.sigleton.method
//也可以 模块开始位置定义 let talefun = (<any>cc).talefun; 方法中调用 talefun.singleton.method （推荐）
//或 模块开始位置定义 let sigleton = (<any>cc).talefun.singleton; 方法中调用 singleton.method (注意：当模块加载顺序有变化，可能造成访问变量singleton为undefined)
// 生成全局变量防止引用模块时，造成循环引用，避免循环引用的另一种方法是 事件注册和分发
// 2018.01.09 li.xiao
Object.defineProperty(exports, "__esModule", { value: true });
// (function() {
//     let wx = window["wx"];
//     if (wx != undefined && wx != null) {
//         wx.onShow(function() {
//             cc.log("=======================on show wx");
//         });
//         cc.log("=======================on show function 1");
//     }
//     cc.log("=======================on show function 2");
// })();
cc.talefun = {};
//初始化 LogHelper,用于控制日志输出
var LogHelper_1 = require("./tools/LogHelper");
cc.talefun.LogHelper = LogHelper_1.default;
//初始化 本地化 文件
var Lang_1 = require("./template/Lang");
var Localization_1 = require("./tools/Localization");
Localization_1.default.initLangCache(Lang_1.default);
cc.talefun.Localization = Localization_1.default;
//初始化 UIResMap,用于自动加载纹理
var UIResMap_1 = require("./template/UIResMap");
UIResMap_1.default.initUIResMap();
cc.talefun.UIResMap = UIResMap_1.default;
//初始化SDKManager，用于对接不同平台接口
var SDKManager_1 = require("./platform/SDKManager");
cc.talefun.SDKManager = SDKManager_1.default.getInstance();
//初始化 EventManager,用于用户事件管理
var EventManager_1 = require("./event/EventManager");
cc.talefun.EventManager = EventManager_1.default.getInstance();
var EventType_1 = require("./event/EventType");
cc.talefun.EventType = EventType_1.default;
//初始化 AudioManager，用于音效管理
var AudioManager_1 = require("./audio/AudioManager");
cc.talefun.AudioManager = AudioManager_1.default.getInstance();
//初始化 TemplateManager，用于静态文件加载管理
var TemplateManager_1 = require("./template/TemplateManager");
cc.talefun.TemplateManager = TemplateManager_1.default.getInstance();
//初始化 缓存数据，用于动态数据加载管理
var ObjectManager_1 = require("./object/ObjectManager");
cc.talefun.ObjectManager = ObjectManager_1.default.getInstance();
//初始化 ViewManager，用于ui管理
var ViewManager_1 = require("./viewCtrl/ViewManager");
cc.talefun.ViewManager = ViewManager_1.default.getInstance();
//初始化 NetworkManager，用于ui管理
var NetworkManager_1 = require("./network/NetworkManager");
cc.talefun.NetworkManager = NetworkManager_1.default.getInstance();
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameInit = /** @class */ (function (_super) {
    __extends(GameInit, _super);
    function GameInit() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.designWidth = 640;
        _this.designHeight = 1136;
        _this.designScreenWidth = 640;
        _this.designScreenHeight = 1136;
        _this.designScale = 1;
        _this._thisOnResized = null;
        return _this;
        // update (dt) {},
    }
    GameInit.prototype.onLoad = function () {
        // console.log(`talefun debug ${talefun.debug}`);
        // console.log(this.name);
        this.fixDesignSolution();
        // this.rigisterSizeChangeEvent();
        cc.talefun.LogHelper.log("event type : " + cc.talefun.EventType.EVENT_USER_TEST);
        cc.talefun.ObjectManager.initModelData();
        cc.talefun.NetworkManager.initNetwork();
        cc.director.getPhysicsManager().enabled = true;
        // cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
        // cc.PhysicsManager.DrawBits.e_pairBit |
        // cc.PhysicsManager.DrawBits.e_centerOfMassBit |
        // cc.PhysicsManager.DrawBits.e_jointBit |
        // cc.PhysicsManager.DrawBits.e_shapeBit
        ;
        cc.director.getPhysicsManager().gravity = cc.v2(0, -300);
        var promise1 = new Promise(function (resolve, reject) {
            setTimeout(resolve, 100, 'foo');
        });
    };
    GameInit.prototype.fixDesignSolution = function () {
        var frameSize = cc.view.getCanvasSize();
        var policy, e = cc.ResolutionPolicy;
        policy = e.FIXED_HEIGHT;
        var designRes = cc.size(this.designWidth, this.designHeight);
        var w = frameSize.width, h = frameSize.height;
        var scaleX = w / designRes.width, scaleY = h / designRes.height;
        scaleX < scaleY ? (designRes.width = designRes.width, designRes.height = Math.ceil(h / scaleX)) : (designRes.width = Math.ceil(w / scaleY), designRes.height = designRes.height);
        this.designScreenWidth = designRes.width;
        this.designScreenHeight = designRes.height;
        this.designScale = this.designScreenWidth / this.designWidth > this.designScreenHeight / this.designHeight ? this.designScreenWidth / this.designWidth : this.designScreenHeight / this.designHeight;
        cc.view.setDesignResolutionSize(designRes.width, designRes.height, policy);
        var talefun = cc.talefun;
        talefun.designWidth = this.designWidth;
        talefun.designHeight = this.designHeight;
        talefun.designScreenWidth = this.designScreenWidth;
        talefun.designScreenHeight = this.designScreenHeight;
        talefun.designScale = this.designScale;
        // LogHelper.dump(talefun);
    };
    GameInit.prototype.rigisterSizeChangeEvent = function () {
        // if (CC_JSB) {
        //     this._thisOnResized = cc.EventListener.create({
        //         event: (<any>cc.EventListener).CUSTOM,
        //         eventName: "window-resize",
        //         callback: this.onResized.bind(this)
        //     });
        //     this._thisOnResized.retain();
        // }
        // else {
        //     this._thisOnResized = this.onResized.bind(this);
        // }
        // if (CC_EDITOR) {
        //     (<any>cc).engine.on('design-resolution-changed', this._thisOnResized);
        // }
        // else if (!CC_JSB) {
        //     if (cc.sys.isMobile) {
        //         window.addEventListener('resize', this._thisOnResized);
        //     }
        //     else {
        //         (<any>cc.eventManager).addCustomListener('canvas-resize', this._thisOnResized);
        //     }
        // }
        // else {
        //     cc.eventManager.addListener(this._thisOnResized, 1);
        // }
    };
    GameInit.prototype.onResized = function () {
        // LogHelper.log("onResized");
    };
    GameInit.prototype.onDestroy = function () {
        // if(this._thisOnResized == null)
        // {
        //     return;
        // }
        // if (CC_EDITOR) {
        //     (<any>cc).engine.off('design-resolution-changed', this._thisOnResized);
        // }
        // else if (!CC_JSB) {
        //     if (cc.sys.isMobile) {
        //         window.removeEventListener('resize', this._thisOnResized);
        //     }
        //     else {
        //         (<any>cc.eventManager).removeCustomListeners('canvas-resize', this._thisOnResized);
        //     }
        // }
        // else {
        //     cc.eventManager.removeListener(this._thisOnResized);
        //     this._thisOnResized.release();
        // }
    };
    GameInit = __decorate([
        ccclass
    ], GameInit);
    return GameInit;
}(cc.Component));
exports.default = GameInit;

cc._RF.pop();