import BasicModel from "./model/BasicModel";
import TestModel from "./model/userModel/TestModel";
import UserDataModel from "./model/userModel/UserDataModel";


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

@ccclass
export default class ObjectManager {

    static _instance:ObjectManager = null;
    
    static getInstance():ObjectManager
    {
        if(ObjectManager._instance == null)
        {
            ObjectManager._instance = new ObjectManager();
        }
        return ObjectManager._instance;
    }

    testModel:TestModel = null;
    userDataModel: UserDataModel = null;

    initModelData()
    {
        this.testModel = new TestModel();
        this.testModel.initModel();

        this.userDataModel = new UserDataModel();
        this.userDataModel.initModel();
    }
    
    getModelByName(name:string):BasicModel
    {
        let ret = this[name];
        if(ret !== null && ret instanceof BasicModel)
        {
            return ret;
        }
        return null;
    }
}
