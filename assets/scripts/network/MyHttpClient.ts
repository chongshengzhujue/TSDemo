const {ccclass, property} = cc._decorator;

let HttpConst = require("./HttpConst");
import {RequestData, ServerConfig, PackageInfo, CodeConst} from "./HttpType";
import HttpNetwork from "./MyHttpNetwork";

@ccclass
export default class MyHttpClient {
    static readonly LOCAL_SERVER = 0;
    static readonly CN_SERVER = 1;
    static readonly US_SERVER = 2;
    static readonly US_STG_SERVER = 3;

    SERVER_CONFIGS: ServerConfig[] = [];

    _serverType: number = MyHttpClient.LOCAL_SERVER;
    _callback: Function;
    _beginCallback: Function;
    _requestQueue: RequestData[] = [];
    _nal: HttpNetwork;

    constructor(beginCallback: Function, callback: Function, serverType: number, packgeInfo: PackageInfo) {
        this.SERVER_CONFIGS[0] = {
            ID : "NJIXLdTtsFjqqm4UlcTeJ1A1-gzGzoHsz",
            KEY : "xnpj2Cd1oWH7Vhu47OR9uIuE",
            SERVER : "http://192.168.0.249:3000",
        };
        this.SERVER_CONFIGS[1] = {
            ID : "NJIXLdTtsFjqqm4UlcTeJ1A1-gzGzoHsz",
            KEY : "xnpj2Cd1oWH7Vhu47OR9uIuE",
            SERVER : "https://api.leancloud.cn",
        };
        this.SERVER_CONFIGS[2] = {
            ID : "BvPLKBoCJ9EfN2CUwjeRuddC-MdYXbMMI",
            KEY : "TK3jjAwXG9kjoYy0RGcR6SLF",
            SERVER : "https://us-api.leancloud.cn",
        };
        this.SERVER_CONFIGS[3] = {
            ID : "CdfVxNwi50pWQ9whlLSXCnrh-MdYXbMMI",
            KEY : "hqe16ogoDi6FOT3GziI5Jilc",
            SERVER : "https://us-api.leancloud.cn",
            PREPARE : true,
        };

        this._serverType = serverType;
        this._callback = callback;
        this._beginCallback = beginCallback;
        let config: ServerConfig = this.SERVER_CONFIGS[serverType];
        cc.log("ServerType = %d ", serverType);
        let serverUrl: string = config.SERVER;
        let appID: string = config.ID;
        let appKey: string = config.KEY;
        this._nal = new HttpNetwork(serverUrl, appID, appKey, this._networkCallback.bind(this));
        this._nal.packageInfo = packgeInfo;
        this._nal.isPrepare = config.PREPARE != undefined ? config.PREPARE : false;
        this.initAPIs();
    }

    public setSessionToken(token: string) {
        this._nal.sessionToken = token;
    }

    public initAPIs() {
        for (let k in HttpConst) {
            let value = HttpConst[k];
            this[k] = this.interface(value);
        }
    }

    public set callback(handler: Function) {
        this._callback = handler;
    }

    public set beginCallback(handler: Function) {
        this._beginCallback = handler;
    }

    public loginCheck(): boolean {
        if (this._nal.sessionIsChecked) {
            return true;
        }

        if (this._nal.sessionToken === undefined) {
            this._createNewRequest(HttpConst.loginWithDeviceId, {username : "udid", password : "123456"}, true);
        } else {
            this._createNewRequest(HttpConst.loginWithSession, {}, true);
        }
        this._beginRequest();
        return false;
    }

    public getQueueWaitLen() : number {
        let len = 0;
        for (let k in this._requestQueue) {
            let requestData = this._requestQueue[k];
            if (requestData.wait === true) {
                len++;
            }
        }

        return len;
    }
    
    private _insertNewRequest(apiTap: any, params, wait: boolean, id: string, index?: number) {
        if (apiTap.token != undefined && this._nal.sessionToken === undefined) {
            cc.log("需要增加账号密码登录的请求");
            this._createNewRequest(HttpConst.loginWithDeviceId, {username : "udid", password : "123456"});
        } else if(apiTap.token != undefined && !this._nal.sessionIsChecked) {
            cc.log("需要增加sessiontoken登录的请求");
            this._createNewRequest(HttpConst.loginWithSession, {});
        }

        this._createNewRequest(apiTap, params, wait, id, index);
    }

    public interface(apiTap: string, id?: string): Function {
        return function(target, params, wait) {
            params = params != undefined ? params : {};
            this._insertNewRequest(apiTap, params, wait, id);
            this._beginRequest();
        }
    }

    private _createNewRequest(apiTap, params, wait?: boolean, id?: string, index?: number) {
        if (wait == undefined) {
            wait = apiTap.wait;
        }

        params._cloudApiVersion = apiTap.version != undefined ? apiTap.version : 1;
        for(let k in this._requestQueue) {
            let oldRequest = this._requestQueue[k];
            if (oldRequest.path != undefined && oldRequest.path === apiTap.path) {
                cc.log("已经存在的请求：%s", oldRequest.path);
                oldRequest.method = apiTap.method;
                oldRequest.parameters = params;
                oldRequest.wait = wait;
                oldRequest.id = id;
                return;
            }
        }


        let newRequest = {path : apiTap.path, method : apiTap.method, parameters : params, wait : wait, id : id, needToken : apiTap.token};
        if (newRequest.path === HttpConst.loginWithDeviceId.path
            || newRequest.path === HttpConst.loginWithSession.path) {
                index = 0;
        }

        if (index != undefined) {
            this._requestQueue.splice(index, 0, newRequest);
        } else {
            this._requestQueue[this._requestQueue.length] = newRequest;
        }

        cc.log("插入新的请求，队列长度%d", this._requestQueue.length);
    }

    private _removeCompletedRequest(requestData: RequestData) {
        for (let i = 0; i >= 0; i--) {
            let oldRequest = this._requestQueue[i];
            if (oldRequest.path === requestData.path) {
                cc.log("完成请求：%s", requestData.path);
                this._requestQueue.splice(i, 1);
            }
        }
    }

    private _beginRequest() : boolean {
        let queueLen = this.getQueueWaitLen();
        let requestLen = this._nal.getRequestLen();

        if (queueLen > 0) {
            if (this._beginCallback != undefined) {
                this._beginCallback();
            }
            if (requestLen === 0) {
                let requestData = this._requestQueue[0];
                cc.log("发送请求：%s", requestData.path);
                //Analytice.onEvent(requestData.path, {timed=true})
                let b = this._nal.request(requestData);
                return b;
            }
        }

        return false;
    }

    private _networkCallback(code: number, data, request: RequestData) {
        this._removeCompletedRequest(request);
        //Analytice.endTimedEvent(request.path)
        if (this._callback != undefined) {
            this._callback(code, data, request);
        }

        this._beginRequest();
    }
}