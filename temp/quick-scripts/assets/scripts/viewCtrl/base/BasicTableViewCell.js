(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/viewCtrl/base/BasicTableViewCell.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b0cd75NAjlOZ6RUXd7w49R6', 'BasicTableViewCell', __filename);
// scripts/viewCtrl/base/BasicTableViewCell.ts

Object.defineProperty(exports, "__esModule", { value: true });
var UserComponent_1 = require("./UserComponent");
// Learn TypeScript:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/typescript/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BasicTableViewCell = /** @class */ (function (_super) {
    __extends(BasicTableViewCell, _super);
    function BasicTableViewCell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {},
    BasicTableViewCell.prototype.start = function () {
    };
    BasicTableViewCell.prototype.setData = function (T) {
        this.node.width = T.cellSize.width;
        this.node.height = T.cellSize.height;
    };
    BasicTableViewCell = __decorate([
        ccclass
    ], BasicTableViewCell);
    return BasicTableViewCell;
}(UserComponent_1.default));
exports.default = BasicTableViewCell;

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
        //# sourceMappingURL=BasicTableViewCell.js.map
        