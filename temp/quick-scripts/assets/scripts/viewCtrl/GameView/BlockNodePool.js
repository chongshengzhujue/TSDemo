(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/viewCtrl/GameView/BlockNodePool.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b1f26/Wcu1M26DrCsASYhGQ', 'BlockNodePool', __filename);
// scripts/viewCtrl/GameView/BlockNodePool.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BlockNodePool = /** @class */ (function () {
    function BlockNodePool() {
    }
    BlockNodePool.prototype.initPool = function (blockPrefab, initNum) {
        this.blockPrefab = blockPrefab;
        this.blockNodeArr = new Array();
        this.parentNode = new cc.Node();
        cc.director.getScene().addChild(this.parentNode);
        for (var i = 0; i < initNum; i++) {
            var blockNode = cc.instantiate(blockPrefab);
            this.blockNodeArr.push(blockNode);
        }
    };
    BlockNodePool.prototype.getBlock = function () {
        if (this.blockNodeArr.length <= 0) {
            var blockNode_1 = cc.instantiate(this.blockPrefab);
            cc.log("=======================get new block");
            return blockNode_1;
        }
        var blockNode = this.blockNodeArr.pop();
        //blockNode.removeFromParent(false);
        cc.log("=======================get pool block");
        return blockNode;
    };
    BlockNodePool.prototype.pushBlock = function (blockNode) {
        //blockNode.active = false;
        //this.parentNode.addChild(blockNode);
        this.blockNodeArr.push(blockNode);
    };
    /**
     * 获取实例的静态方法实例
     * @return
     *
     */
    BlockNodePool.getInstance = function () {
        if (!this.instance) {
            this.instance = new BlockNodePool();
        }
        return this.instance;
    };
    BlockNodePool.prototype.destroy = function () {
        this.blockNodeArr.splice(0, this.blockNodeArr.length);
    };
    return BlockNodePool;
}());
exports.default = BlockNodePool;

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
        //# sourceMappingURL=BlockNodePool.js.map
        