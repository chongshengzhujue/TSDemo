(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/tools/LogHelper.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '2f44fHVTZ5HxZmL3TKa86ut', 'LogHelper', __filename);
// scripts/tools/LogHelper.ts

// 日志管理类
//2018.01.10 li.xiao
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LogHelper = /** @class */ (function () {
    function LogHelper() {
    }
    LogHelper_1 = LogHelper;
    //普通输出 
    LogHelper.log = function (msg) {
        if (LogHelper_1.logEnable == false) {
            return;
        }
        cc.log(msg);
    };
    //输出 警告
    LogHelper.logW = function (msg) {
        if (LogHelper_1.logEnable == false) {
            return;
        }
        cc.warn(msg);
    };
    //输出 错误
    LogHelper.logE = function (msg) {
        if (LogHelper_1.logEnable == false) {
            return;
        }
        cc.error(msg);
    };
    //输出 多元 数据
    LogHelper.dump = function (data) {
        if (typeof (data) == "string") {
            LogHelper_1.logW(data);
        }
        else if (data instanceof Array || data instanceof Object) {
            LogHelper_1.logW(JSON.stringify(data));
        }
        else {
            LogHelper_1.logW(data);
        }
    };
    //控制是否输出log
    LogHelper.logEnable = true;
    LogHelper = LogHelper_1 = __decorate([
        ccclass
    ], LogHelper);
    return LogHelper;
    var LogHelper_1;
}());
exports.default = LogHelper;

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
        //# sourceMappingURL=LogHelper.js.map
        