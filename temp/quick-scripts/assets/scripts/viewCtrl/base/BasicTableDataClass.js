(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/viewCtrl/base/BasicTableDataClass.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'fa2f40qxGRM/IqlNX8jsrJH', 'BasicTableDataClass', __filename);
// scripts/viewCtrl/base/BasicTableDataClass.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BasicTableDataClass = /** @class */ (function () {
    function BasicTableDataClass() {
        //cell的id
        this.id = 0;
        //cell的尺寸大小
        this.cellSize = cc.size(0, 0);
    }
    BasicTableDataClass = __decorate([
        ccclass
    ], BasicTableDataClass);
    return BasicTableDataClass;
}());
exports.default = BasicTableDataClass;

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
        //# sourceMappingURL=BasicTableDataClass.js.map
        