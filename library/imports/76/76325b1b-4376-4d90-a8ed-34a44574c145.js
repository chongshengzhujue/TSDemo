"use strict";
cc._RF.push(module, '76325sbQ3ZNkKjtNKRFdMFF', 'NetLoadingViewLogic');
// scripts/viewCtrl/TestTableView/NetLoadingViewLogic.ts

Object.defineProperty(exports, "__esModule", { value: true });
var EventManager_1 = require("../../event/EventManager");
var EventType_1 = require("../../event/EventType");
var NetworkManager_1 = require("../../network/NetworkManager");
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
var NetLoadingViewLogic = /** @class */ (function (_super) {
    __extends(NetLoadingViewLogic, _super);
    function NetLoadingViewLogic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NetLoadingViewLogic.prototype.onLoad = function () {
        this._checkIsWaiting();
        EventManager_1.default.getInstance().addEventListener(EventType_1.default.NETWORK_BEGIN, this._checkIsWaiting.bind(this));
        EventManager_1.default.getInstance().addEventListener(EventType_1.default.NETWORK_COMPLETE, this._checkIsWaiting.bind(this));
        cc.game.addPersistRootNode(this.node);
        this.node.setLocalZOrder(1000000);
    };
    NetLoadingViewLogic.prototype._checkIsWaiting = function () {
        var networkManager = NetworkManager_1.default.getInstance();
        var length = networkManager.httpClient.getQueueWaitLen();
        this._setVisible(length > 0);
        cc.log("=======================length" + length);
    };
    NetLoadingViewLogic.prototype._setVisible = function (isVisible) {
        this.node.active = isVisible;
        if (isVisible) {
            this.node.on(cc.Node.EventType.TOUCH_START, (function () { }).bind(this));
        }
        else {
            this.node.off(cc.Node.EventType.TOUCH_START, (function () { }).bind(this));
        }
    };
    NetLoadingViewLogic = __decorate([
        ccclass
    ], NetLoadingViewLogic);
    return NetLoadingViewLogic;
}(cc.Component));
exports.default = NetLoadingViewLogic;

cc._RF.pop();