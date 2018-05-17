(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/network/NetworkManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c15d7BqNWBIkIZCkAnHfnXX', 'NetworkManager', __filename);
// scripts/network/NetworkManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var talefun = cc.talefun;
var ObjectManager_1 = require("../object/ObjectManager");
var EventManager_1 = require("../event/EventManager");
var EventType_1 = require("../event/EventType");
var HttpType_1 = require("./HttpType");
var MyHttpClient_1 = require("./MyHttpClient");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NetworkManager = /** @class */ (function () {
    function NetworkManager() {
        this._httpClient = null;
    }
    NetworkManager_1 = NetworkManager;
    NetworkManager.prototype.initNetwork = function () {
        this._httpClient = new MyHttpClient_1.default(this._beginCallback.bind(this), this._networkCallback.bind(this), MyHttpClient_1.default.CN_SERVER, { name: "com.queensgame.solitaire.journey", platform: "android" });
        var userDataModel = ObjectManager_1.default.getInstance().getModelByName("userDataModel");
        if (userDataModel) {
            var token = userDataModel.getToken();
            if (token) {
                cc.log("=====================");
                cc.log(token);
                cc.log("=====================");
                this.httpClient.setSessionToken(token);
            }
        }
    };
    Object.defineProperty(NetworkManager.prototype, "httpClient", {
        get: function () {
            return this._httpClient;
        },
        enumerable: true,
        configurable: true
    });
    NetworkManager.prototype._beginCallback = function () {
        EventManager_1.default.getInstance().dispatchEvent(EventType_1.default.NETWORK_BEGIN, {});
    };
    NetworkManager.prototype._networkCallback = function (status, data, request) {
        EventManager_1.default.getInstance().dispatchEvent(EventType_1.default.NETWORK_COMPLETE, {});
        var apiName = ["NOREQUEST"];
        if (request != undefined) {
            apiName = request.path.split("/");
        }
        else {
            talefun.LogHelper.log("_networkCallback: request is undefind");
        }
        cc.log("==========================================******************");
        talefun.LogHelper.dump(data);
        cc.log("==========================================******************");
        if (status === HttpType_1.CodeConst.REQUEST_SUCCESS) {
            this._dataParse(data, request);
        }
    };
    NetworkManager.prototype._dataParse = function (data, request) {
        var userDataModel = ObjectManager_1.default.getInstance().getModelByName("userDataModel");
        if (userDataModel) {
            userDataModel.parseDataFromServer(data);
        }
    };
    NetworkManager.getInstance = function () {
        if (NetworkManager_1._instance == null) {
            NetworkManager_1._instance = new NetworkManager_1();
        }
        return NetworkManager_1._instance;
    };
    NetworkManager = NetworkManager_1 = __decorate([
        ccclass
    ], NetworkManager);
    return NetworkManager;
    var NetworkManager_1;
}());
exports.default = NetworkManager;

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
        //# sourceMappingURL=NetworkManager.js.map
        