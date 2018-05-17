//ViewLogic 模版类，用于新建组件 copy
// 2018.01.10 li.xiao

const {ccclass, property} = cc._decorator;

import UserComponent from "./../base/UserComponent";
import BasicViewCtrl from "../base/BasicViewCtrl";

let talefun = (<any>cc).talefun;

@ccclass
export default class TemplateViewLogic extends UserComponent {

    onLoad()
    {

    }

    // 继承 UserComponent， 当组件的node open时 调用
    onEnter()
    {
        if((<any>this.node).viewCtrl)
        {
            this.viewCtrl = (<any>this.node).viewCtrl;
        }
    }

    // 继承 UserComponent， 当组件的node close时 调用
    onExit()
    {

    }

    // 继承 UserComponent， 当组件的node 作为 item 时 更新调用
    updateView(idx:number,data:any)
    {

    }
    // update (dt) {},
}
