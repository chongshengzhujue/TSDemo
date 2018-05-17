(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/object/model/BasicModel.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f821bmDtkJBSouUTJm5Dj9I', 'BasicModel', __filename);
// scripts/object/model/BasicModel.ts

//缓存数据管理模块，用于组织功能相关数据
// 2018.01.10 li.xiao
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BasicModel = /** @class */ (function () {
    function BasicModel() {
    }
    BasicModel.prototype.initModel = function () {
        ;
    };
    BasicModel.prototype.parseDataFromDB = function () {
        ;
    };
    BasicModel.prototype.parseDataFromServer = function (data) {
        ;
    };
    BasicModel.prototype.saveItem = function (key, item) {
        if (key !== null && item !== null) {
            cc.sys.localStorage.setItem(key, item);
        }
    };
    BasicModel.prototype.getItem = function (key) {
        if (key !== null) {
            return cc.sys.localStorage.getItem(key);
        }
        return undefined;
    };
    BasicModel.prototype.removeItem = function (key) {
        if (key !== null) {
            cc.sys.localStorage.removeItem(key);
        }
    };
    BasicModel = __decorate([
        ccclass
    ], BasicModel);
    return BasicModel;
}());
exports.default = BasicModel;

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
        //# sourceMappingURL=BasicModel.js.map
        