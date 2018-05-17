(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/platform/SDKManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '17bf2BWyz9GNa8Re7pVDkG5', 'SDKManager', __filename);
// scripts/platform/SDKManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
// sdk 管理类，不同平台的SDK委托到 SDKManager管理
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SDKManager = /** @class */ (function () {
    function SDKManager() {
    }
    SDKManager_1 = SDKManager;
    SDKManager.getInstance = function () {
        if (SDKManager_1._instance == null) {
            SDKManager_1._instance = new SDKManager_1();
            SDKManager_1._instance.initSDK();
        }
        return SDKManager_1._instance;
    };
    //初始化各类SDK
    SDKManager.prototype.initSDK = function () {
    };
    SDKManager._instance = null;
    SDKManager = SDKManager_1 = __decorate([
        ccclass
    ], SDKManager);
    return SDKManager;
    var SDKManager_1;
}());
exports.default = SDKManager;

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
        //# sourceMappingURL=SDKManager.js.map
        