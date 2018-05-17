import UserComponent from "../Base/UserComponent";

// Learn TypeScript:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/typescript/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

const {ccclass, property} = cc._decorator;
let talefun = (<any>cc).talefun;

@ccclass
export default class PhysicsNodeLogic extends UserComponent {
    // LIFE-CYCLE CALLBACKS:

    touchStartHandler: () => void;
    touchMoveHandler: () => void;
    touchEndHandler: () => void;
    touchCancelHandler: () => void;

    path: any = null;

    points: cc.Vec2[] = [];

    physicsPolygon: cc.PhysicsPolygonCollider = null;

    rigibodyLogic: cc.RigidBody = null;

    onLoad () {
        
    }

    onEnter() {
        if((<any>this.node).viewCtrl)
        {
            this.viewCtrl = (<any>this.node).viewCtrl;
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
    }

    addTouch() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchStartHandler);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMoveHandler);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEndHandler);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchCancelHandler);
    }

    removeTouch() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.touchStartHandler);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.touchMoveHandler);
        this.node.off(cc.Node.EventType.TOUCH_END, this.touchEndHandler);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.touchCancelHandler);
    }

    touchStart(event : cc.Event.EventTouch) {
        let touchLoc = event.getLocation();
        touchLoc = this.node.parent.convertToNodeSpaceAR(touchLoc);

        this.points.push(touchLoc);

        return true;
    }

    touchMove(event : cc.Event.EventTouch) {
        let touchLoc = event.getLocation();
        touchLoc = this.node.parent.convertToNodeSpaceAR(touchLoc);

        this.points.push(touchLoc);
        this.path.points(this.points);
    }

    touchEnd(event : cc.Event.EventTouch) {
        this.path.points(this.points);
        this.path.simplify();
        this.parsePathString(this.path.getPathString());
    }

    touchCancel(event : cc.Event.EventTouch) {
        
    }

    parsePathString(pathStr) {
        var pathList = pathStr.split(" ");
        let bezieConfig = {
            beginPos: cc.p(0, 0),
            control1: cc.p(0, 0),
            control2: cc.p(0, 0),
            endPos: cc.p(0, 0),
        };

        for (let i = 0, len = pathList.length; i < len; i++) {
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
    },

    createRigibody(bezieConfig) {

    },

}
