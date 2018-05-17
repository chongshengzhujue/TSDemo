(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/viewCtrl/GameView/PhysicsNodeLogic.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '5ecddO4CMVCdpYRO8jEFt1C', 'PhysicsNodeLogic', __filename);
// scripts/viewCtrl/GameView/PhysicsNodeLogic.ts

Object.defineProperty(exports, "__esModule", { value: true });
var UserComponent_1 = require("../Base/UserComponent");
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
var PhysicsNodeLogic = /** @class */ (function (_super) {
    __extends(PhysicsNodeLogic, _super);
    function PhysicsNodeLogic() {
        // LIFE-CYCLE CALLBACKS:
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.path = null;
        _this.points = [];
        _this.physicsPolygon = null;
        _this.rigibodyLogic = null;
        return _this;
    }
    PhysicsNodeLogic.prototype.onLoad = function () {
    };
    PhysicsNodeLogic.prototype.onEnter = function () {
        if (this.node.viewCtrl) {
            this.viewCtrl = this.node.viewCtrl;
        }
        this.path = this.addComponent('R.path');
        this.path.fillColor = 'none';
        this.path.lineWidth = 10;
        this.path.showHandles = true;
        this.rigibodyLogic = this.getComponent(cc.RigidBody);
        this.physicsPolygon = this.getComponent("PhysicsPolygonCollider");
        talefun.LogHelper.log("onEnter :" + "LogoViewLogic");
        this.touchStartHandler = this.touchStart.bind(this);
        this.touchMoveHandler = this.touchMove.bind(this);
        this.touchEndHandler = this.touchEnd.bind(this);
        this.touchCancelHandler = this.touchCancel.bind(this);
    };
    PhysicsNodeLogic.prototype.addTouch = function () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchStartHandler);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMoveHandler);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEndHandler);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchCancelHandler);
    };
    PhysicsNodeLogic.prototype.removeTouch = function () {
        this.node.off(cc.Node.EventType.TOUCH_START, this.touchStartHandler);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.touchMoveHandler);
        this.node.off(cc.Node.EventType.TOUCH_END, this.touchEndHandler);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.touchCancelHandler);
    };
    PhysicsNodeLogic.prototype.touchStart = function (event) {
        var touchLoc = event.getLocation();
        touchLoc = this.node.parent.convertToNodeSpaceAR(touchLoc);
        this.points.push(touchLoc);
        return true;
    };
    PhysicsNodeLogic.prototype.touchMove = function (event) {
        var touchLoc = event.getLocation();
        touchLoc = this.node.parent.convertToNodeSpaceAR(touchLoc);
        this.points.push(touchLoc);
        this.path.points(this.points);
    };
    PhysicsNodeLogic.prototype.touchEnd = function (event) {
        this.path.points(this.points);
        this.path.simplify();
        this.parsePathString(this.path.getPathString());
    };
    PhysicsNodeLogic.prototype.touchCancel = function (event) {
    };
    PhysicsNodeLogic.prototype.parsePathString = function (pathStr) {
        var pathList = pathStr.split(" ");
        var bezieConfig = {
            beginPos: cc.p(0, 0),
            control1: cc.p(0, 0),
            control2: cc.p(0, 0),
            endPos: cc.p(0, 0),
        };
        for (var i = 0, len = pathList.length; i < len; i++) {
            if (pathList[i] === "C") {
                bezieConfig.beginPos.x = parseFloat(pathList[i - 2]);
                bezieConfig.beginPos.y = parseFloat(pathList[i - 1]);
                bezieConfig.control1.x = parseFloat(pathList[i + 1]);
                bezieConfig.control1.y = parseFloat(pathList[i + 2]);
                bezieConfig.control2.x = parseFloat(pathList[i + 3]);
                bezieConfig.control2.y = parseFloat(pathList[i + 4]);
                bezieConfig.endPos.x = parseFloat(pathList[i + 5]);
                bezieConfig.endPos.y = parseFloat(pathList[i + 6]);
            }
        }
        cc.log("zhangyakun" + JSON.stringify(pathList));
    };
    PhysicsNodeLogic.prototype.createRigibody = function (bezieConfig) {
    };
    PhysicsNodeLogic = __decorate([
        ccclass
    ], PhysicsNodeLogic);
    return PhysicsNodeLogic;
}(UserComponent_1.default));
exports.default = PhysicsNodeLogic;

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
        //# sourceMappingURL=PhysicsNodeLogic.js.map
        