import EventManager from "../../event/EventManager";
import EventType from "../../event/EventType";
import NetworkManager from "../../network/NetworkManager";



// Learn TypeScript:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/typescript/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
let talefun = (<any>cc).talefun;

const {ccclass, property} = cc._decorator;
@ccclass
export default class NetLoadingViewLogic extends cc.Component {



    onLoad()
    {
        this._checkIsWaiting();
        EventManager.getInstance().addEventListener(EventType.NETWORK_BEGIN, this._checkIsWaiting.bind(this));
        EventManager.getInstance().addEventListener(EventType.NETWORK_COMPLETE, this._checkIsWaiting.bind(this));
        cc.game.addPersistRootNode(this.node);
        this.node.setLocalZOrder(1000000);
    }

    private _checkIsWaiting() {
        let networkManager = NetworkManager.getInstance();
        let length = networkManager.httpClient.getQueueWaitLen();

        this._setVisible(length > 0);
        
        cc.log("=======================length" + length)
    }
    
    private _setVisible(isVisible: boolean) {
        this.node.active = isVisible;

        if (isVisible) {
            this.node.on(cc.Node.EventType.TOUCH_START, (function(){}).bind(this));
        } else {
            this.node.off(cc.Node.EventType.TOUCH_START, (function(){}).bind(this));
        }
    }
}
