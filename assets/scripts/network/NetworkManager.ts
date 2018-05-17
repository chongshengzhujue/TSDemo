let talefun = (<any>cc).talefun;
import ObjectManager from "../object/ObjectManager";
import UserDataModel from "../object/model/userModel/UserDataModel";
import EventManager from "../event/EventManager";
import EventType from "../event/EventType";
import { CodeConst, RequestData } from "./HttpType";
import MyHttpClient from "./MyHttpClient";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NetworkManager {

    private _httpClient: MyHttpClient = null;

    constructor() {
       
    }

    initNetwork() {
        this._httpClient = new MyHttpClient(
            this._beginCallback.bind(this), 
            this._networkCallback.bind(this), 
            MyHttpClient.CN_SERVER, 
            {name: "com.queensgame.solitaire.journey", platform: "android"}
        );

        let userDataModel: UserDataModel = <UserDataModel>ObjectManager.getInstance().getModelByName("userDataModel");

        if (userDataModel) {
            let token = userDataModel.getToken();
            if (token) {
                cc.log("=====================");
                cc.log(token);
                cc.log("=====================");
                this.httpClient.setSessionToken(token);
            }
        }
    }

    get httpClient(): MyHttpClient {
        return this._httpClient;
    }

    private _beginCallback() {
        EventManager.getInstance().dispatchEvent(EventType.NETWORK_BEGIN, {});
    }

    private _networkCallback(status: CodeConst, data: any, request: RequestData) {
        EventManager.getInstance().dispatchEvent(EventType.NETWORK_COMPLETE, {});

        let apiName = ["NOREQUEST"];
        if (request != undefined) {
            apiName = request.path.split("/");
        } else {
            talefun.LogHelper.log("_networkCallback: request is undefind");
        }

        cc.log("==========================================******************");
        talefun.LogHelper.dump(data);
        cc.log("==========================================******************");

        if (status === CodeConst.REQUEST_SUCCESS) {
            this._dataParse(data, request);
        }
    }

    private _dataParse(data: any, request: RequestData) {
        let userDataModel: UserDataModel = <UserDataModel>ObjectManager.getInstance().getModelByName("userDataModel");
        if (userDataModel) {
            userDataModel.parseDataFromServer(data);
        }
    }

    static _instance: NetworkManager;

    static getInstance():NetworkManager
    {
        if(NetworkManager._instance == null)
        {
            NetworkManager._instance = new NetworkManager();
        }
        return NetworkManager._instance;
    }
}