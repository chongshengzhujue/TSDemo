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

import BasicModel from "./../BasicModel";
import TestVO from "../../vo/userVO/TestVO";

let talefun = (<any>cc).talefun

@ccclass
export default class TestModel extends BasicModel {

    testKeyPrefix: string = "Test";

    testList: {} = {};

    setTestItem(key:string,textVO:TestVO)
    {
        if(textVO !== null)
        {
            this.testList[key] = textVO;
        }
    }

    saveTestList()
    {
        for(let key in this.testList)
        {
            let item = this.testList[key];
            this.saveItem(key,item.getFormatStr());
        }
    }

    initModel()
    {
        this.parseDataFromDB();
    }

    parseDataFromDB()
    {
        
        talefun.LogHelper.log("**************parseDataFromDB*************")
        for(let i = 0 ; i < 3; i++)
        {

            let key = this.testKeyPrefix + i;
            let value = this.getItem(key);
            // talefun.LogHelper.log("value : " + value);
            if(value !== null && value !== undefined)
            {
                let item = new TestVO();
                item.parseDataFromStr(value);
                this.testList[key] = item;
                talefun.LogHelper.log(item.getFormatStr());
            }
        }
        talefun.LogHelper.log("**************parseDataFromDB*************")
    }

    parseDataFromServer(data:any)
    {
        ;
    }
    

    // update (dt) {},
}
