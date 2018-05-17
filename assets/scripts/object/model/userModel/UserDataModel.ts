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
export default class UserDataModel extends BasicModel {

    userDataList: {} = {
        token: ""
    };

    getToken(): string {
        return this.userDataList["token"];
    }

    setToken(token: string) {
        this.userDataList["token"] = token;
        this.saveItem("token", token);
    }

    saveUserDMCache()
    {
        for(let key in this.userDataList)
        {
            let item = this.userDataList[key];
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
        for (let k in this.userDataList) {
            this.userDataList[k] = this.getItem(k);
        }
        talefun.LogHelper.log("**************parseDataFromDB*************")
    }

    parseDataFromServer(data:any)
    {
        if (data.sessionToken != undefined) {
            this.setToken(data.sessionToken);
        }
    }
    

    // update (dt) {},
}
