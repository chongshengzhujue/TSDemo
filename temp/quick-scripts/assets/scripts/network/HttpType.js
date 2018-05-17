(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/network/HttpType.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '731caOlpM1EjoIrJbFLLiko', 'HttpType', __filename);
// scripts/network/HttpType.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
//code status
var CodeConst = /** @class */ (function () {
    function CodeConst() {
    }
    CodeConst.BAD_REQUEST = 400;
    CodeConst.REQUEST_SUCCESS = 200;
    CodeConst.REQUEST_ERROR = 500;
    CodeConst.RESULT_DATA_ERROR = 600;
    CodeConst.RESULT_NO_USER_DATA = 2500;
    CodeConst.RESULT_NO_CHALLENGE_DATA = 2501;
    CodeConst.FORCE_TIMEOUT_ERROR = 28;
    CodeConst = __decorate([
        ccclass
    ], CodeConst);
    return CodeConst;
}());
exports.CodeConst = CodeConst;

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
        //# sourceMappingURL=HttpType.js.map
        