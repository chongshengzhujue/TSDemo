"use strict";
cc._RF.push(module, '8facdN70n9OirBLfSObhMNW', 'physicsNodeLogic');
// scripts/viewCtrl/GameView/physicsNodeLogic.ts

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
var physicsNodeLogic = /** @class */ (function (_super) {
    __extends(physicsNodeLogic, _super);
    function physicsNodeLogic() {
        // LIFE-CYCLE CALLBACKS:
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.path = null;
        _this.points = [];
        _this.physicsChain = null;
        _this.rigibodyLogic = null;
        return _this;
    }
    physicsNodeLogic.prototype.onLoad = function () {
    };
    physicsNodeLogic.prototype.onEnter = function () {
        if (this.node.viewCtrl) {
            this.viewCtrl = this.node.viewCtrl;
        }
        this.path = this.addComponent(cc.Graphics);
        this.path.strokeColor = cc.color(255, 0, 0);
        this.path.lineWidth = 4;
        this.rigibodyLogic = this.getComponent(cc.RigidBody);
        this.physicsChain = this.getComponent("MyPhysicsCollider");
        talefun.LogHelper.log("onEnter :" + "LogoViewLogic");
        this.rigibodyLogic.active = false;
        this.touchStartHandler = this.touchStart.bind(this);
        this.touchMoveHandler = this.touchMove.bind(this);
        this.touchEndHandler = this.touchEnd.bind(this);
        this.touchCancelHandler = this.touchCancel.bind(this);
        this.addTouch();
    };
    physicsNodeLogic.prototype.onExit = function () {
        this.removeTouch();
    };
    physicsNodeLogic.prototype.addTouch = function () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchStartHandler);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMoveHandler);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEndHandler);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchCancelHandler);
    };
    physicsNodeLogic.prototype.removeTouch = function () {
        this.node.off(cc.Node.EventType.TOUCH_START, this.touchStartHandler);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.touchMoveHandler);
        this.node.off(cc.Node.EventType.TOUCH_END, this.touchEndHandler);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.touchCancelHandler);
    };
    physicsNodeLogic.prototype.touchStart = function (event) {
        var touchLoc = event.getLocation();
        touchLoc = this.node.parent.convertToNodeSpaceAR(touchLoc);
        this.points.push(touchLoc);
        this.path.moveTo(touchLoc.x, touchLoc.y);
        return true;
    };
    physicsNodeLogic.prototype.touchMove = function (event) {
        var touchLoc = event.getLocation();
        touchLoc = this.node.parent.convertToNodeSpaceAR(touchLoc);
        if (this.checkIsCanDraw(this.points[this.points.length - 1], touchLoc)) {
            this.points.push(touchLoc);
            this.path.lineTo(touchLoc.x, touchLoc.y);
            // this.path.moveTo(touchLoc.x, touchLoc.y);
            this.path.stroke();
        }
    };
    physicsNodeLogic.prototype.touchEnd = function (event) {
        var touchLoc = event.getLocation();
        touchLoc = this.node.parent.convertToNodeSpaceAR(touchLoc);
        this.path.lineTo(touchLoc.x, touchLoc.y);
        this.path.stroke();
        this.points.push(touchLoc);
        this.createRigibody();
    };
    physicsNodeLogic.prototype.touchCancel = function (event) {
        this.createRigibody();
    };
    physicsNodeLogic.prototype.checkIsCanDraw = function (lastPoint, nowPoint) {
        return cc.pDistance(lastPoint, nowPoint) >= 20;
    };
    physicsNodeLogic.prototype.parsePathString = function (pathStr) {
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
    physicsNodeLogic.prototype.createRigibody = function () {
        this.rigibodyLogic.active = true;
        // let posArr = [];
        // for (let i = 0; i < this.points.length - 1; i++) {
        //     let beginPos = this.points[i];
        //     let endPos = this.points[i + 1];
        //     let posGroup = this.getSegmenPos(beginPos, endPos);
        //     if (i === 0) {
        //         posArr.splice(0, 0, posGroup.beginPosArr[0]);
        //         posArr.push(posGroup.endPosArr[0]);
        //     }
        //     posArr.splice(0, 0, posGroup.beginPosArr[1]);
        //     posArr.push(posGroup.endPosArr[1]);
        // }
        // this.path.lineWidth = 2;
        // this.path.strokeColor = cc.color(0, 255, 0);
        // this.path.moveTo(this.points[0]);
        // for (let i in this.points) {
        //     this.path.lineTo(this.points[i].x, this.points[i].y);
        // }
        // this.path.stroke();
        this.physicsChain.lineWidth = this.path.lineWidth;
        this.physicsChain.points = this.points;
        this.physicsChain.apply();
    };
    physicsNodeLogic.prototype.getSegmenPos = function (beginPos, endPos) {
        var k = (endPos.y - beginPos.y) / (endPos.x - beginPos.x);
        var offX = 0;
        var offY = 0;
        if (k === 0) {
            offY = this.path.lineWidth / 2;
            offX = 0;
            if (endPos.x < beginPos.x) {
                offX = -offX;
                offY = -offY;
            }
        }
        else if (!isFinite(k)) {
            offX = this.path.lineWidth / 2;
            offY = 0;
        }
        else {
            var k1 = -1 / k;
            var angle = Math.atan(k1);
            var sin = Math.sin(angle);
            var cos = Math.cos(angle);
            cc.log("angle" + angle);
            offX = this.path.lineWidth / 2 * cos;
            offY = this.path.lineWidth / 2 * sin;
        }
        if (endPos.y > beginPos.y) {
            offX = -offX;
            offY = -offY;
        }
        var beingPosArr = [cc.p(beginPos.x - offX, beginPos.y - offY), cc.p(endPos.x - offX, endPos.y - offY)];
        var endPosArr = [cc.p(beginPos.x + offX, beginPos.y + offY), cc.p(endPos.x + offX, endPos.y + offY)];
        return {
            beginPosArr: beingPosArr,
            endPosArr: endPosArr
        };
    };
    physicsNodeLogic = __decorate([
        ccclass
    ], physicsNodeLogic);
    return physicsNodeLogic;
}(UserComponent_1.default));
exports.default = physicsNodeLogic;

cc._RF.pop();