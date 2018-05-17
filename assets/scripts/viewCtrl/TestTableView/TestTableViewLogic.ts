import UserComponent from "../Base/UserComponent";
import BasicTableView from "../base/BasicTableView";
import TestTableViewClass from "./TestTableViewClass";

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
export default class TestTableViewLogic extends UserComponent {

    tableViewComp: BasicTableView = null;

    onLoad()
    {
        this.tableViewComp = this.node.getComponent("BasicTableView");
    }

    // 继承 UserComponent， 当组件的node open时 调用
    onEnter()
    {
        if((<any>this.node).viewCtrl)
        {
            this.viewCtrl = (<any>this.node).viewCtrl;
        }
        talefun.LogHelper.log("onEnter :" + "TestTableViewLogic");
    }

    // 继承 UserComponent， 当组件的node close时 调用
    onExit()
    {
        talefun.LogHelper.log("onExit :" + "TestTableViewLogic");
    }

    reloadData() {
        if (this.tableViewComp) {
            TestTableViewClass.parseData([
                {
                    id : 0,
                    size : cc.size(100, 200),
                    name : "jack"
                },
                {
                    id : 1,
                    size : cc.size(200, 200),
                    name : "wolf"
                },
                {
                    id : 2,
                    size : cc.size(100, 200),
                    name : "skin"
                },
                {
                    id : 3,
                    size : cc.size(200, 200),
                    name : "jack"
                },
                {
                    id : 4,
                    size : cc.size(100, 200),
                    name : "jack"
                },
                {
                    id : 5,
                    size : cc.size(100, 200),
                    name : "jack"
                },
                {
                    id : 6,
                    size : cc.size(100, 200),
                    name : "jack"
                },
                {
                    id : 7,
                    size : cc.size(200, 200),
                    name : "jack"
                },
                {
                    id : 8,
                    size : cc.size(200, 200),
                    name : "jack"
                },
                {
                    id : 9,
                    size : cc.size(100, 200),
                    name : "jack"
                },
                {
                    id : 10,
                    size : cc.size(200, 200),
                    name : "jack"
                },
                {
                    id : 11,
                    size : cc.size(200, 200),
                    name : "jack"
                },
                {
                    id : 12,
                    size : cc.size(200, 200),
                    name : "jack"
                },
                {
                    id : 13,
                    size : cc.size(100, 200),
                    name : "jack"
                },
                {
                    id : 14,
                    size : cc.size(100, 200),
                    name : "book"
                },
                {
                    id : 15,
                    size : cc.size(200, 200),
                    name : "book"
                },
            ]);
            this.tableViewComp.viewCtrl = this.viewCtrl;
            this.tableViewComp.reloadData(TestTableViewClass.dataClassList);
        }
    }
}
