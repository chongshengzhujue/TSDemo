import UserComponent from "../Base/UserComponent";
import BlocksVo from "./BlocksVo";
import GameConst from "./GameConst";
import BlockNodePool from "./BlockNodePool";
import TemplateManager from "../../template/TemplateManager";
import { BlockState } from "./GameEnum";
import ViewManager from "../ViewManager";

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
export default class GameViewLogic extends UserComponent {
    // LIFE-CYCLE CALLBACKS:

    @property(cc.Prefab)
    physicsPrefab: cc.Prefab;

    onLoad () {
        
    }

    onEnter() {
        if((<any>this.node).viewCtrl)
        {
            this.viewCtrl = (<any>this.node).viewCtrl;
        }
        talefun.LogHelper.log("onEnter :" + "LogoViewLogic");

        let self = this;

        self.node.on(cc.Node.EventType.TOUCH_START, self.touchStart.bind(self));
        self.node.on(cc.Node.EventType.TOUCH_MOVE, self.touchMove.bind(self));
        self.node.on(cc.Node.EventType.TOUCH_END, self.touchEnd.bind(self));
        self.node.on(cc.Node.EventType.TOUCH_CANCEL, self.touchCancel.bind(self));
    }

    touchStart(event : cc.Event.EventTouch) {
        ViewManager.getInstance().showPrefab("physicsNode", this.physicsPrefab, {}, this.node, this.viewCtrl);
    }

    touchMove(event : cc.Event.EventTouch) {
        
    }

    touchEnd(event : cc.Event.EventTouch) {
        
    }

    touchCancel(event : cc.Event.EventTouch) {
        
    }
}
