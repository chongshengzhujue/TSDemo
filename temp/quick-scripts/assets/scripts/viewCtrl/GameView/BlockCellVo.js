(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/viewCtrl/GameView/BlockCellVo.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a6a41BXt6tEWJZ3CbWbhXNy', 'BlockCellVo', __filename);
// scripts/viewCtrl/GameView/BlockCellVo.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BlockNodePool_1 = require("./BlockNodePool");
var BlockCellVo = /** @class */ (function () {
    function BlockCellVo() {
        //小块的index坐标
        this.posIdx = 0;
        //小块的x，y index坐标
        this.posVecIdx = cc.p(0, 0);
        //小块的渲染目标
        this.blockSprite = null;
        //小块重叠的背景小块
        this.linkBlcokVo = null;
        //小块的类型
        this.blockColorIdx = null;
        //blockctrl的component
        this.spriteComponet = null;
        //小块被占用次数
        this.linkedBlockNum = 0;
    }
    BlockCellVo.prototype.initBlockSprite = function (posIdx, posVecIdx, blockColorIdx, parentNode) {
        this.posIdx = posIdx;
        this.posVecIdx = posVecIdx;
        this.blockColorIdx = blockColorIdx;
        var blockNode = BlockNodePool_1.default.getInstance().getBlock();
        parentNode.addChild(blockNode);
        this.blockSprite = blockNode;
        this.spriteComponet = blockNode.getComponent("BlockSpriteLogic");
        this.spriteComponet.setColorById(blockColorIdx);
        // let blockSize = blockNode.getContentSize();
        // let posX = posVecIdx.x * blockSize.width;
        // let posY = posVecIdx.y * blockSize.height;
        // blockNode.setPosition(cc.p(posX, posY));
    };
    BlockCellVo.prototype.setMaskVisible = function (isVisible) {
        if (this.spriteComponet) {
            this.spriteComponet.setMaskVisible(isVisible);
        }
    };
    BlockCellVo.prototype.setNumLabel = function (num) {
        if (this.spriteComponet) {
            this.spriteComponet.setNumLable(num);
        }
    };
    BlockCellVo.prototype.linkBgBlock = function (bgBlock) {
        this.linkBlcokVo = bgBlock;
        bgBlock.linkedBlockNum++;
    };
    BlockCellVo.prototype.clearLinkBgBlock = function () {
        if (this.linkBlcokVo) {
            this.linkBlcokVo.linkedBlockNum--;
            this.linkBlcokVo = null;
        }
    };
    BlockCellVo.prototype.removeSelf = function () {
        this.spriteComponet.setMaskVisible(false);
        this.blockSprite.parent = null;
        BlockNodePool_1.default.getInstance().pushBlock(this.blockSprite);
    };
    return BlockCellVo;
}());
exports.default = BlockCellVo;

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
        //# sourceMappingURL=BlockCellVo.js.map
        