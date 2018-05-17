(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/network/MyHttpClient.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6bd596/96xDbJYFfowVDMJI', 'MyHttpClient', __filename);
// scripts/network/MyHttpClient.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var HttpConst = require("./HttpConst");
var MyHttpNetwork_1 = require("./MyHttpNetwork");
var MyHttpClient = /** @class */ (function () {
    function MyHttpClient(beginCallback, callback, serverType, packgeInfo) {
        this.SERVER_CONFIGS = [];
        this._serverType = MyHttpClient_1.LOCAL_SERVER;
        this._requestQueue = [];
        this.SERVER_CONFIGS[0] = {
            ID: "NJIXLdTtsFjqqm4UlcTeJ1A1-gzGzoHsz",
            KEY: "xnpj2Cd1oWH7Vhu47OR9uIuE",
            SERVER: "http://192.168.0.249:3000",
        };
        this.SERVER_CONFIGS[1] = {
            ID: "NJIXLdTtsFjqqm4UlcTeJ1A1-gzGzoHsz",
            KEY: "xnpj2Cd1oWH7Vhu47OR9uIuE",
            SERVER: "https://api.leancloud.cn",
        };
        this.SERVER_CONFIGS[2] = {
            ID: "BvPLKBoCJ9EfN2CUwjeRuddC-MdYXbMMI",
            KEY: "TK3jjAwXG9kjoYy0RGcR6SLF",
            SERVER: "https://us-api.leancloud.cn",
        };
        this.SERVER_CONFIGS[3] = {
            ID: "CdfVxNwi50pWQ9whlLSXCnrh-MdYXbMMI",
            KEY: "hqe16ogoDi6FOT3GziI5Jilc",
            SERVER: "https://us-api.leancloud.cn",
            PREPARE: true,
        };
        this._serverType = serverType;
        this._callback = callback;
        this._beginCallback = beginCallback;
        var config = this.SERVER_CONFIGS[serverType];
        cc.log("ServerType = %d ", serverType);
        var serverUrl = config.SERVER;
        var appID = config.ID;
        var appKey = config.KEY;
        this._nal = new MyHttpNetwork_1.default(serverUrl, appID, appKey, this._networkCallback.bind(this));
        this._nal.packageInfo = packgeInfo;
        this._nal.isPrepare = config.PREPARE != undefined ? config.PREPARE : false;
        this.initAPIs();
    }
    MyHttpClient_1 = MyHttpClient;
    MyHttpClient.prototype.setSessionToken = function (token) {
        this._nal.sessionToken = token;
    };
    MyHttpClient.prototype.initAPIs = function () {
        for (var k in HttpConst) {
            var value = HttpConst[k];
            this[k] = this.interface(value);
        }
    };
    Object.defineProperty(MyHttpClient.prototype, "callback", {
        set: function (handler) {
            this._callback = handler;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyHttpClient.prototype, "beginCallback", {
        set: function (handler) {
            this._beginCallback = handler;
        },
        enumerable: true,
        configurable: true
    });
    MyHttpClient.prototype.loginCheck = function () {
        if (this._nal.sessionIsChecked) {
            return true;
        }
        if (this._nal.sessionToken === undefined) {
            this._createNewRequest(HttpConst.loginWithDeviceId, { username: "udid", password: "123456" }, true);
        }
        else {
            this._createNewRequest(HttpConst.loginWithSession, {}, true);
        }
        this._beginRequest();
        return false;
    };
    MyHttpClient.prototype.getQueueWaitLen = function () {
        var len = 0;
        for (var k in this._requestQueue) {
            var requestData = this._requestQueue[k];
            if (requestData.wait === true) {
                len++;
            }
        }
        return len;
    };
    MyHttpClient.prototype._insertNewRequest = function (apiTap, params, wait, id, index) {
        if (apiTap.token != undefined && this._nal.sessionToken === undefined) {
            cc.log("需要增加账号密码登录的请求");
            this._createNewRequest(HttpConst.loginWithDeviceId, { username: "udid", password: "123456" });
        }
        else if (apiTap.token != undefined && !this._nal.sessionIsChecked) {
            cc.log("需要增加sessiontoken登录的请求");
            this._createNewRequest(HttpConst.loginWithSession, {});
        }
        this._createNewRequest(apiTap, params, wait, id, index);
    };
    MyHttpClient.prototype.interface = function (apiTap, id) {
        return function (target, params, wait) {
            params = params != undefined ? params : {};
            this._insertNewRequest(apiTap, params, wait, id);
            this._beginRequest();
        };
    };
    MyHttpClient.prototype._createNewRequest = function (apiTap, params, wait, id, index) {
        if (wait == undefined) {
            wait = apiTap.wait;
        }
        params._cloudApiVersion = apiTap.version != undefined ? apiTap.version : 1;
        for (var k in this._requestQueue) {
            var oldRequest = this._requestQueue[k];
            if (oldRequest.path != undefined && oldRequest.path === apiTap.path) {
                cc.log("已经存在的请求：%s", oldRequest.path);
                oldRequest.method = apiTap.method;
                oldRequest.parameters = params;
                oldRequest.wait = wait;
                oldRequest.id = id;
                return;
            }
        }
        var newRequest = { path: apiTap.path, method: apiTap.method, parameters: params, wait: wait, id: id, needToken: apiTap.token };
        if (newRequest.path === HttpConst.loginWithDeviceId.path
            || newRequest.path === HttpConst.loginWithSession.path) {
            index = 0;
        }
        if (index != undefined) {
            this._requestQueue.splice(index, 0, newRequest);
        }
        else {
            this._requestQueue[this._requestQueue.length] = newRequest;
        }
        cc.log("插入新的请求，队列长度%d", this._requestQueue.length);
    };
    MyHttpClient.prototype._removeCompletedRequest = function (requestData) {
        for (var i = 0; i >= 0; i--) {
            var oldRequest = this._requestQueue[i];
            if (oldRequest.path === requestData.path) {
                cc.log("完成请求：%s", requestData.path);
                this._requestQueue.splice(i, 1);
            }
        }
    };
    MyHttpClient.prototype._beginRequest = function () {
        var queueLen = this.getQueueWaitLen();
        var requestLen = this._nal.getRequestLen();
        if (queueLen > 0) {
            if (this._beginCallback != undefined) {
                this._beginCallback();
            }
            if (requestLen === 0) {
                var requestData = this._requestQueue[0];
                cc.log("发送请求：%s", requestData.path);
                //Analytice.onEvent(requestData.path, {timed=true})
                var b = this._nal.request(requestData);
                return b;
            }
        }
        return false;
    };
    MyHttpClient.prototype._networkCallback = function (code, data, request) {
        this._removeCompletedRequest(request);
        //Analytice.endTimedEvent(request.path)
        if (this._callback != undefined) {
            this._callback(code, data, request);
        }
        this._beginRequest();
    };
    MyHttpClient.LOCAL_SERVER = 0;
    MyHttpClient.CN_SERVER = 1;
    MyHttpClient.US_SERVER = 2;
    MyHttpClient.US_STG_SERVER = 3;
    MyHttpClient = MyHttpClient_1 = __decorate([
        ccclass
    ], MyHttpClient);
    return MyHttpClient;
    var MyHttpClient_1;
}());
exports.default = MyHttpClient;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=MyHttpClient.js.map
        