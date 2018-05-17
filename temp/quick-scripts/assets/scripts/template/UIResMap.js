(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/template/UIResMap.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '187c8f1NipKVr9PnP7K3GfL', 'UIResMap', __filename);
// scripts/template/UIResMap.ts

//UIResMap 记录textrue和spriteFrame的纹理关系，用于根据FrameName自动加载贴图
// 格式为json字符串，初次加载时转换成js数据对象
// 2018.01.11 li.xiao
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIResMapStr = "{}";
var UIResMap = /** @class */ (function () {
    function UIResMap() {
    }
    UIResMap_1 = UIResMap;
    UIResMap.initUIResMap = function () {
        if (UIResMap_1.resMap == null) {
            UIResMap_1.resMap = JSON.parse(UIResMapStr);
        }
    };
    UIResMap.getResInfo = function (key) {
        if (UIResMap_1.resMap !== null && key !== null) {
            var subInfo = UIResMap_1.resMap[key];
            if (subInfo == null || subInfo == undefined) {
                subInfo = UIResMap_1.resMap["default"];
            }
            return subInfo;
        }
    };
    UIResMap.resMap = null;
    UIResMap = UIResMap_1 = __decorate([
        ccclass
    ], UIResMap);
    return UIResMap;
    var UIResMap_1;
}());
exports.default = UIResMap;

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
        //# sourceMappingURL=UIResMap.js.map
        