// 自定义组件 基类 ，用于配置 view 统一参数，例：isFullScene
// 2018.01.09

import BasicViewCtrl from "../base/BasicViewCtrl";

let talefun = (<any>cc).talefun;

const {ccclass, property} = cc._decorator;

interface UserComponentInterface {
    isFullScene:boolean;

    onEnter():void;
    onExit():void;
    updateView(idx:number,data:any):void;
    closeNode(callback:any);
}

@ccclass
export default class UserComponent extends cc.Component implements UserComponentInterface{
    @property(Boolean)
    isFullScene: boolean = true;

    viewCtrl:BasicViewCtrl = null;
    
    onEnter()
    {}
    onExit()
    {}
    updateView(idx:number,data:any)
    {

    }

    closeNode(callback:any)
    {
        if ((<any>this.node).viewCtrl)
        {
            talefun.LogHelper.log("close View");
            (<any>this.node).viewCtrl.closeView();
        }  
        else
        {
            talefun.LogHelper.log("no viewCtrl");
        }

        if(callback)
        {
            callback();
        }
    }
}
