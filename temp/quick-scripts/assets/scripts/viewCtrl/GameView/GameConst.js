(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/viewCtrl/GameView/GameConst.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '48f32EhvrZAbbJrL5GC3/gr', 'GameConst', __filename);
// scripts/viewCtrl/GameView/GameConst.ts

Object.defineProperty(exports, "__esModule", { value: true });
var GameConst = /** @class */ (function () {
    function GameConst() {
    }
    GameConst.GRID_WIDTH = 9;
    GameConst.GRID_HEIGHT = 7;
    GameConst.BLOCK_SIDE = 60;
    GameConst.BOTTOM_BLOCK_SIDE = 30;
    GameConst.BOTTOM_BLOCK_WIDTH = 18;
    GameConst.BOTTOM_BLOCK_HEIGHT = 7;
    GameConst.BLOCK_MOVING_ZORDER = 1000;
    GameConst.BLOCK_NORMAL_ZORDER = 1;
    return GameConst;
}());
exports.default = GameConst;

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
        //# sourceMappingURL=GameConst.js.map
        