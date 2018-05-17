"use strict";
cc._RF.push(module, '444dbtMrjNJWascbBT6pI1b', 'MyHttpNetwork');
// scripts/network/MyHttpNetwork.ts

// Learn TypeScript:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/typescript/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
Object.defineProperty(exports, "__esModule", { value: true });
var HttpType_1 = require("./HttpType");
var timers_1 = require("timers");
var Tools_1 = require("../tools/Tools");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MyHttpNetwork = /** @class */ (function () {
    function MyHttpNetwork(url, appId, appKey, callback) {
        this._queue = new Array();
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
    MyHttpNetwork_1 = MyHttpNetwork;
    Object.defineProperty(MyHttpNetwork.prototype, "packageInfo", {
        get: function () {
            return this._packageInfo;
        },
        set: function (packageInfo) {
            this._packageInfo = packageInfo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyHttpNetwork.prototype, "isPrepare", {
        get: function () {
            return this._isPrepare;
        },
        set: function (isPrepare) {
            this._isPrepare = isPrepare;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyHttpNetwork.prototype, "sessionToken", {
        get: function () {
            this._sessionIsChecked = false;
            return this._token;
        },
        set: function (token) {
            this._token = token;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyHttpNetwork.prototype, "sessionIsChecked", {
        get: function () {
            return this._sessionIsChecked;
        },
        enumerable: true,
        configurable: true
    });
    MyHttpNetwork.prototype.updateSessionToken = function (result) {
        if (result.sessionToken) {
            cc.log("更新后的token为%s", result.sessionToken);
            this._sessionIsChecked = true;
            this._token = result.sessionToken;
        }
    };
    MyHttpNetwork.prototype.getRequestLen = function () {
        var len = 0;
        for (var i in this._queue) {
            if (this._queue[i] !== undefined) {
                len = len + 1;
            }
        }
        return len;
    };
    MyHttpNetwork.prototype.request = function (requestData) {
        var ts = Date.now().toString();
        var parameters = requestData.parameters != undefined ? requestData.parameters : {};
        var id = requestData.id;
        var path = requestData.path;
        var needToken = requestData.needToken;
        var method = requestData.method;
        if (id == undefined) {
            id = this._createId(method, path, parameters, ts);
        }
        requestData.id = id;
        if (!this._isReady()) {
            this._callBack(HttpType_1.CodeConst.REQUEST_ERROR, "网络未连接", requestData);
            return false;
        }
        var xhr = cc.loader.getXMLHttpRequest();
        var self = this;
        xhr.onreadystatechange = function () {
            self._onReponse(xhr, id);
        };
        xhr.ontimeout = function () {
            self._onTimeOut(id);
        };
        xhr.onerror = function (e) {
            self._onError(e, id);
        };
        path = this._url + "/" + MyHttpNetwork_1.LC_API_VERSION + path;
        xhr.open(method, path, true);
        var body;
        if (method === "POST" || method === "PUT") {
            body = JSON.stringify(parameters);
            xhr.setRequestHeader("Content-type", "application/json");
            cc.log("postData = %s", body);
        }
        xhr.setRequestHeader("X-LC-Id", this._appId);
        var sign = Tools_1.default.md5Encode(ts + this._appKey);
        xhr.setRequestHeader("X-LC-Sign", sign + "," + ts);
        if (needToken != undefined) {
            cc.log("添加token");
            if (needToken == 1 && this._token + undefined && this._sessionIsChecked) {
                xhr.setRequestHeader("X-LC-Session", this._token);
            }
            else if (needToken == 2 && this._token != undefined) {
                xhr.setRequestHeader("X-LC-Session", this._token);
            }
            else {
                cc.log("没有token直接返回");
                this._callBack(HttpType_1.CodeConst.RESULT_NO_USER_DATA, "数据异常，请打开网络重新启动游戏！", requestData);
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
        xhr.timeout = MyHttpNetwork_1.TIME_OUT * 1000;
        if (body != undefined) {
            xhr.send(body);
        }
        else {
            xhr.send();
        }
        this._timeOutHanler = timers_1.setTimeout(function () {
            cc.log("自定义请求超时，强制结束本次请求");
            xhr.abort();
        }, MyHttpNetwork_1.LC_TIME_OUT * 1000);
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
    };
    MyHttpNetwork.prototype._onReponse = function (xhr, id) {
        var item = this._queue[id];
        if (xhr.readyState === 4) {
            this.cancelTimeoutHandler();
            this._queue[id] = undefined;
            var code = xhr.status;
            var data = xhr.responseText;
            var message = undefined;
            if (data !== "") {
                message = JSON.parse(data);
            }
            if (message != undefined) {
                if (code === HttpType_1.CodeConst.REQUEST_SUCCESS) {
                    this.updateSessionToken(message.result);
                    cc.log("onResponse_wait: %s", item.wait.toString());
                    this._callBack(code, message.result, item);
                }
                else if (code === HttpType_1.CodeConst.BAD_REQUEST && message.code != undefined) {
                    this._callBack(message.code, message, item);
                }
                else {
                    this._callBack(code, message, item);
                }
            }
            else {
                this._callBack(HttpType_1.CodeConst.RESULT_DATA_ERROR, "返回数据格式错误", item);
            }
        }
    };
    MyHttpNetwork.prototype.cancelTimeoutHandler = function () {
        if (this._timeOutHanler != undefined) {
            cc.log("结束掉全局计时器：%s", this._timeOutHanler);
            timers_1.clearTimeout(this._timeOutHanler);
            this._timeOutHanler = undefined;
        }
    };
    MyHttpNetwork.prototype._onTimeOut = function (id) {
        this.cancelTimeoutHandler();
        var item = this._queue[id];
        if (item === undefined) {
            return;
        }
        this._queue[id] = undefined;
        this._callBack(HttpType_1.CodeConst.FORCE_TIMEOUT_ERROR, "强制超时结束", item);
    };
    MyHttpNetwork.prototype._onError = function (error, id) {
        this.cancelTimeoutHandler();
        var item = this._queue[id];
        if (item === undefined) {
            return;
        }
        this._queue[id] = undefined;
        this._callBack(error.toString, error.toString, item);
    };
    MyHttpNetwork.prototype._flatten = function (source, target, prefix) {
        for (var k in source) {
            var value = source[k];
            if (typeof value === "object") {
                if (prefix !== undefined) {
                    this._flatten(value, target, prefix + "." + k);
                }
                else {
                    this._flatten(value, target, k);
                }
            }
            else {
                target[target.length] = k + "=" + value.toString();
            }
        }
    };
    MyHttpNetwork.prototype._createId = function (method, url, parameters, ts) {
        var qs = [
            "ts=" + ts,
            "method=" + method,
            "url=" + url
        ];
        this._flatten(parameters, qs);
        qs.sort();
        var s = "";
        for (var i = 0; i < qs.length; i++) {
            var temp = qs[i];
            if (i < qs.length - 1) {
                s = s + temp + "&";
            }
            else {
                s = s + temp;
            }
        }
        var sMD5 = Tools_1.default.md5Encode(s);
        var result = sMD5.substr(0, 15);
        return result;
    };
    MyHttpNetwork.prototype._isReady = function () {
        var flag = true;
        // if (cc.sys.os != cc.sys.OS_WINDOWS) {
        // }
        return flag;
    };
    MyHttpNetwork.LC_API_VERSION = "1.1";
    //超市时间
    MyHttpNetwork.TIME_OUT = 16;
    MyHttpNetwork.LC_TIME_OUT = MyHttpNetwork_1.TIME_OUT + 1;
    MyHttpNetwork = MyHttpNetwork_1 = __decorate([
        ccclass
    ], MyHttpNetwork);
    return MyHttpNetwork;
    var MyHttpNetwork_1;
}());
exports.default = MyHttpNetwork;

cc._RF.pop();