
const {ccclass, property} = cc._decorator;

import UserComponent from "./../base/UserComponent";
import TestVO from "../../object/vo/userVO/TestVO";
import ObjectManager from "../../object/ObjectManager";
import TestModel from "../../object/model/userModel/TestModel";
import Localization from "../../tools/Localization";
import ViewManager from "../ViewManager";
import BasicViewCtrl from "../Base/BasicViewCtrl";
import TestTableViewLogic from "../TestTableView/TestTableViewLogic";
import NetworkManager from "../../network/NetworkManager";

let talefun = (<any>cc).talefun;

@ccclass
export default class TemplateViewLogic extends UserComponent {

    @property(cc.Label)
    label:cc.Label = null;

    @property(cc.Sprite)
    imgLogo: cc.Sprite = null;

    @property(cc.Prefab)
    tableViewPrefab: cc.Prefab = null;

    @property(cc.Label)
    tempLabel: cc.Label = null;

    onLoad()
    {
        cc.game.on(cc.game.EVENT_SHOW, (function() {
            cc.log("===============================on show 1");
        }).bind(this));

        cc.game.on(cc.game.EVENT_HIDE, (function() {
            cc.log("===============================on hide 2");
        }).bind(this));
    }

    // 继承 UserComponent， 当组件的node open时 调用
    onEnter()
    {
        if((<any>this.node).viewCtrl)
        {
            this.viewCtrl = (<any>this.node).viewCtrl;
        }
        talefun.LogHelper.log("onEnter :" + "LogoViewLogic");

        // talefun.TemplateManager.getTemplateList(["template","project"],function(){
        //     talefun.LogHelper.log("test load template list success ");
        // })

        // let str = JSON.stringify(["hello"," world"]);
        // // talefun.LogHelper.log(str);

        // talefun.LogHelper.logW(str);

        // let testVO = new TestVO();
        // testVO.setProperties({id:1,coin:100});
        // talefun.LogHelper.log(testVO.getFormatStr());

        // let objectManager = <ObjectManager>talefun.ObjectManager;
        // let testModel = <TestModel>objectManager.getModelByName("testModel");
        // for(let i = 1 ; i < 3; i++)
        // {
        //     let key = testModel.testKeyPrefix + i;
        //     let item = new TestVO();
        //     item.parseData({id:100 + i,level:50 *i, coin:1000 * i})

        //     testModel.setTestItem(key,item);
        // }
        // testModel.saveTestList();

        Localization.setLabelText(this.label,"{#1}{#2}{#3}",["Hello"," World!",120]);

        this.logoMotion()

        this.showTableView();
    }

    // 继承 UserComponent， 当组件的node close时 调用
    onExit()
    {

    }

    // 继承 UserComponent， 当组件的node 作为 item 时 更新调用
    updateView(idx:number,data:any)
    {

    }
    
    logoMotion()
    {
        if(this.imgLogo !== null)
        {
            let logoNode = this.imgLogo.node;
            logoNode.opacity = 0;

            let actFadeIn = cc.fadeIn(2);
            logoNode.runAction( actFadeIn);
        }
    }

    onClickBtnClose(event)
    {
        // let target = event.target;
        // talefun.AudioManager.playBtnEffect(target);

        // NetworkManager.getInstance().httpClient['updateUserInfo']();

        cc.director.loadScene("TestScene");
    }

    showTableView() {
        let tableView: BasicViewCtrl = ViewManager.getInstance().showPrefab(this.tableViewPrefab.name, this.tableViewPrefab, {}, this.node, this.viewCtrl);
        tableView.rootView.setPosition(cc.p(100, 1200));
        let tableLogic: TestTableViewLogic = (<TestTableViewLogic>tableView.logicComponent);
        tableLogic.reloadData();
    }
}