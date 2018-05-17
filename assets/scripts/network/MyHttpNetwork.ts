// Learn TypeScript:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/typescript/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

import {RequestData, CodeConst, PackageInfo} from "./HttpType";
import { setTimeout, clearTimeout } from "timers";
import tools from "../tools/Tools";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MyHttpNetwork {
    static readonly LC_API_VERSION: string = "1.1";

    //超市时间
    static readonly TIME_OUT: number = 16;
    static readonly LC_TIME_OUT: number = MyHttpNetwork.TIME_OUT + 1;

    private _queue: RequestData[];
    private _callBack: Function;
    private _appId: string;
    private _appKey: string;
    private _url: string;
    private _token: string;
    private _sessionIsChecked: boolean;
    private _packageInfo: PackageInfo;
    private _isPrepare: boolean;
    private _timeOutHanler;

    constructor(url: string, appId: string, appKey: string, callback: Function) {
        this._queue = new Array<RequestData>();
        this._callBack = callback;
        this._appId = appId;
        this._appKey = appKey;

        //修饰请求地址
        if (url.substring(url.length - 1) == "/") {
            url = url.substring(0, url.length - 2);
        }
        this._url = url;
        this._sessionIsChecked = false;
    }

    public set packageInfo(packageInfo: PackageInfo) {
        this._packageInfo = packageInfo;
    }

    public get packageInfo(): PackageInfo {
        return this._packageInfo;
    }

    public set isPrepare(isPrepare: boolean) {
        this._isPrepare = isPrepare;
    }

    public get isPrepare(): boolean {
        return this._isPrepare;
    }

    public set sessionToken(token: string) {
        this._token = token;
    }

    public get sessionToken(): string {
        this._sessionIsChecked = false;
        return this._token;
    }

    public get sessionIsChecked(): boolean {
        return this._sessionIsChecked;
    }

    public updateSessionToken(result: any) {
        if (result.sessionToken) {
            cc.log("更新后的token为%s", result.sessionToken);
            this._sessionIsChecked = true;
            this._token = result.sessionToken;
        }
    }

    public getRequestLen(): number {
        let len = 0;
        for (let i in this._queue) {
            if (this._queue[i] !== undefined) {
                len = len + 1;
            }
        }
        return len;
    }

    public request(requestData: RequestData) {
        let ts: string = Date.now().toString();
        let parameters = requestData.parameters != undefined ? requestData.parameters : {};
        let id: string = requestData.id;
        let path: string = requestData.path;
        let needToken: number = requestData.needToken;
        let method: string = requestData.method;

        if (id == undefined) {
            id = this._createId(method, path, parameters, ts);
        }

        requestData.id = id;

        if (!this._isReady()) {
            this._callBack(CodeConst.REQUEST_ERROR, "网络未连接", requestData);
            return false;
        }

        let xhr = cc.loader.getXMLHttpRequest();

        let self = this;
        xhr.onreadystatechange = function() {
            self._onReponse(xhr, id);
        }

        xhr.ontimeout = function() {
            self._onTimeOut(id);
        }

        xhr.onerror = function(e) {
            self._onError(e, id);
        }

        path = this._url + "/" + MyHttpNetwork.LC_API_VERSION + path;
        
        xhr.open(method, path, true);
        let body;
        if (method === "POST" || method === "PUT") {
            body = JSON.stringify(parameters);
            xhr.setRequestHeader("Content-type", "application/json");
            cc.log("postData = %s", body);
        }

        xhr.setRequestHeader("X-LC-Id", this._appId);
        let sign = tools.md5Encode(ts + this._appKey);
        xhr.setRequestHeader("X-LC-Sign", sign + "," + ts);

        if (needToken != undefined) {
            cc.log("添加token");
            if (needToken == 1 && this._token !+ undefined && this._sessionIsChecked) {
                xhr.setRequestHeader("X-LC-Session", this._token);
            } else if (needToken == 2 && this._token != undefined) {
                xhr.setRequestHeader("X-LC-Session", this._token);
            } else {
                cc.log("没有token直接返回");
                this._callBack(CodeConst.RESULT_NO_USER_DATA, "数据异常，请打开网络重新启动游戏！", requestData);
                return false;
            }
        }

        if (this._isPrepare) {
            cc.log("连接到预备环境");
            xhr.setRequestHeader("X-LC-Prod", "0");
        }

        if (this._packageInfo && this._packageInfo.name && cc.sys.isNative) {
            xhr.setRequestHeader("Z-Package-Name", this._packageInfo.name);
        }

        if (this._packageInfo && this._packageInfo.platform && cc.sys.isNative) {
            xhr.setRequestHeader("Z-Package-Platform", this._packageInfo.platform);
        }

        this._queue[id] = requestData;
        if (cc.sys.isNative) {
            xhr.setRequestHeader("Accept-Encoding", "1");
        }
        xhr.timeout = MyHttpNetwork.TIME_OUT * 1000;
        if (body != undefined) {
            xhr.send(body);
        } else {
            xhr.send();
        }

        this._timeOutHanler = setTimeout(function() {
            cc.log("自定义请求超时，强制结束本次请求");
            xhr.abort();
        }, MyHttpNetwork.LC_TIME_OUT * 1000);
        cc.log("新建全局计时器：%s", this._timeOutHanler);
        return true;

        // let requestType = {};
        // requestType["method"] = method;
        // requestType["header"] = {};        
        // if (method === "POST" || method === "PUT") {
        //     requestType["body"] = JSON.stringify(parameters);
        //     requestType["header"] = {
        //         "Content-type" : "application/json"
        //     }
        // }
        // requestType["header"]["X-LC-Id"] = this._appId;
        // let sign: string = tools.md5Encode(ts + this._appKey);
        // requestType["header"]["X-LC-Sign"] = sign + "," + ts;

        // if (needToken != undefined) {
        //     if (needToken === 1 && this._token != undefined && this._sessionIsChecked) {
        //         requestType["header"]["X-LC-Session"] = this._token;
        //     } else if (needToken === 2 && this._token != undefined) {
        //         requestType["header"]["X-LC-Session"] = this._token;
        //     } else {
        //         cc.log("没有token直接返回");
        //         //this._callBack();
        //         return false;
        //     }
        // }

        // if (this._isPrepare) {
        //     cc.log("连接到预备环境");
        //     requestType["header"]["X-LC-Prod"] = 0;
        // }

        // if (this._packageInfo && this._packageInfo.name) {
        //     requestType["header"]["Z-Package-Name"] = this._packageInfo.name;
        // }

        // if (this._packageInfo && this._packageInfo.platform) {
        //     requestType["header"]["Z-Package-Platform"] = this._packageInfo.platform;
        // }

        // this._queue[id] = requestData;
        // requestType["header"]["Accept-Encoding"] = 1;
        // fetch(path, requestType).then(
        //     function(res) {
        //         this._onSucess(res, id);
        //     },
        //     function(error) {
        //         this._onError(error, id);
        //     }
        // );
    }

    public _onReponse(xhr, id) {
        let item = this._queue[id];

        if (xhr.readyState === 4) {
            this.cancelTimeoutHandler();
            this._queue[id] = undefined;
            let code = xhr.status;
            let data = xhr.responseText;

            let message = undefined;
            if (data !== "") {
                message = JSON.parse(data);
            }

            if (message != undefined) {
                if (code === CodeConst.REQUEST_SUCCESS) {
                    this.updateSessionToken(message.result);
                    cc.log("onResponse_wait: %s",item.wait.toString());
                    this._callBack(code, message.result, item);
                } else if(code === CodeConst.BAD_REQUEST && message.code != undefined) {
                    this._callBack(message.code, message, item);
                } else {
                    this._callBack(code, message, item);
                }
            } else {
                this._callBack(CodeConst.RESULT_DATA_ERROR, "返回数据格式错误", item);
            }
        }
    }

    private cancelTimeoutHandler() {
        if (this._timeOutHanler != undefined) {
            cc.log("结束掉全局计时器：%s", this._timeOutHanler);
            clearTimeout(this._timeOutHanler);
            this._timeOutHanler = undefined;
        }
    }

    private _onTimeOut(id) {
        this.cancelTimeoutHandler();
        let item = this._queue[id];

        if(item === undefined) {
            return;
        }

        this._queue[id] = undefined;
        this._callBack(CodeConst.FORCE_TIMEOUT_ERROR, "强制超时结束", item);
    }

    private _onError(error, id) {
        this.cancelTimeoutHandler();
        let item = this._queue[id];

        if(item === undefined) {
            return;
        }

        this._queue[id] = undefined;
        this._callBack(error.toString, error.toString, item);
    }

    private _flatten(source, target, prefix?: any) {
        for (let k in source) {
            let value = source[k];
            if (typeof value === "object") {
                if (prefix !== undefined) {
                    this._flatten(value, target, prefix + "." + k);
                } else {
                    this._flatten(value, target, k);
                }
            } else {
                target[target.length] = k + "=" + value.toString();
            }
        }
    }

    private _createId(method: string, url: string, parameters: object, ts: string): string {
        let qs = [
            "ts=" + ts,
            "method=" + method,
            "url=" + url
        ];
        this._flatten(parameters, qs);
        qs.sort();

        let s = "";
        for(let i = 0; i < qs.length; i++) {
            let temp = qs[i];
            if (i < qs.length - 1) {
                s = s + temp + "&";
            } else {
                s = s + temp;
            }
        }

        let sMD5: string = tools.md5Encode(s);
        let result: string = sMD5.substr(0, 15);
        return result;
    }

    private _isReady() {
        let flag = true;

        // if (cc.sys.os != cc.sys.OS_WINDOWS) {
        // }

        return flag;
    }
}
