// sdk 管理类，不同平台的SDK委托到 SDKManager管理
const {ccclass, property} = cc._decorator;

@ccclass
export default class SDKManager {

    static _instance:SDKManager = null;
    static getInstance():SDKManager
    {
        if(SDKManager._instance == null)
        {
            SDKManager._instance = new SDKManager();
            SDKManager._instance.initSDK();
        }
        return SDKManager._instance;
    }

    //初始化各类SDK
    initSDK()
    {

    }
}
