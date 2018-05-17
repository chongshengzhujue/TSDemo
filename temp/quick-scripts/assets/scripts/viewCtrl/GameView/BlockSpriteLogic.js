(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/viewCtrl/GameView/BlockSpriteLogic.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '279db8SImBFGru6TnaINX8n', 'BlockSpriteLogic', __filename);
// scripts/viewCtrl/GameView/BlockSpriteLogic.ts

// Learn TypeScript:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/typescript/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BlockSpriteLogic = /** @class */ (function (_super) {
    __extends(BlockSpriteLogic, _super);
    function BlockSpriteLogic() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.maskNode = null;
        _this.numLabel = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    BlockSpriteLogic.prototype.onLoad = function () {
        this.setMaskVisible(false);
        this.setNumLable(0);
    };
    // update (dt) {},
    BlockSpriteLogic.prototype.setColorById = function (colorId) {
        var spriteComponent = this.node.getComponent(cc.Sprite);
        spriteComponent.spriteFrame = this.blockSpriteFrames[colorId];
        cc.log("==========setColorById:" + colorId);
    };
    BlockSpriteLogic.prototype.setMaskVisible = function (isVisible) {
        this.maskNode.active = isVisible;
    };
    BlockSpriteLogic.prototype.setNumLable = function (num) {
        if (num <= 0) {
            this.numLabel.node.active = false;
            return;
        }
        this.numLabel.node.active = true;
        this.numLabel.string = num.toString();
    };
    __decorate([
        property(cc.SpriteFrame)
    ], BlockSpriteLogic.prototype, "blockSpriteFrames", void 0);
    __decorate([
        property(cc.Node)
    ], BlockSpriteLogic.prototype, "maskNode", void 0);
    __decorate([
        property(cc.Label)
    ], BlockSpriteLogic.prototype, "numLabel", void 0);
    BlockSpriteLogic = __decorate([
        ccclass
    ], BlockSpriteLogic);
    return BlockSpriteLogic;
}(cc.Component));
exports.default = BlockSpriteLogic;

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
        //# sourceMappingURL=BlockSpriteLogic.js.map
        