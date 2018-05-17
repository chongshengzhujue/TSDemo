"use strict";
cc._RF.push(module, '5405bBr/NlJ8p6JzJkNqLvU', 'BlocksVo');
// scripts/viewCtrl/GameView/BlocksVo.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BlockCellVo_1 = require("./BlockCellVo");
var GameConst_1 = require("./GameConst");
var GameEnum_1 = require("./GameEnum");
var BlocksVo = /** @class */ (function () {
    function BlocksVo() {
        //小块的数组
        this.blockCells = [];
        //大块的尺寸
        this.blocksNodeSize = cc.size(0, 0);
        this.blockState = GameEnum_1.BlockState.BLOCK_STATE_BOTTOM;
        this.lastState = GameEnum_1.BlockState.BLOCK_STATE_BOTTOM;
        this.lastPos = cc.p(0, 0);
        this.blocksNode = new cc.Node();
        this.blocksNode.setAnchorPoint(cc.p(0.5, 0.5));
        //this.blocksNode.addComponent(cc.Graphics);
    }
    BlocksVo.prototype.addBlock = function (cellIdx, posVecIdx, colorIdx) {
        var blockCellVo = new BlockCellVo_1.default();
        blockCellVo.initBlockSprite(cellIdx, posVecIdx, colorIdx, this.blocksNode);
        this.blockCells.push(blockCellVo);
    };
    BlocksVo.prototype.resetContentSize = function () {
        var minX = 1000;
        var minY = 1000;
        var maxX = 0;
        var maxY = 0;
        for (var i in this.blockCells) {
            var cellVo = this.blockCells[i];
            if (cellVo) {
                if (cellVo.posVecIdx.x < minX) {
                    minX = cellVo.posVecIdx.x;
                }
                if (cellVo.posVecIdx.y < minY) {
                    minY = cellVo.posVecIdx.y;
                }
                if (cellVo.posVecIdx.x > maxX) {
                    maxX = cellVo.posVecIdx.x;
                }
                if (cellVo.posVecIdx.y > maxY) {
                    maxY = cellVo.posVecIdx.y;
                }
            }
        }
        this.minVec = cc.p(minX, minY);
        this.maxVec = cc.p(maxX, maxY);
        this.blocksNodeSize = cc.size(maxX - minX + 1, maxY - minY + 1);
        var contentWidth = GameConst_1.default.BLOCK_SIDE * this.blocksNodeSize.width;
        var contentHeight = GameConst_1.default.BLOCK_SIDE * this.blocksNodeSize.height;
        this.blocksNode.setContentSize(contentWidth, contentHeight);
        cc.log("contentWidth " + contentWidth);
        cc.log("contentHeight " + contentHeight);
        var orginPos = cc.p(-contentWidth * 0.5, -contentHeight * 0.5);
        for (var i in this.blockCells) {
            var cellVo = this.blockCells[i];
            cellVo.posVecIdx.x = cellVo.posVecIdx.x - minX;
            cellVo.posVecIdx.y = cellVo.posVecIdx.y - minY;
            var offPosX = cellVo.posVecIdx.x * GameConst_1.default.BLOCK_SIDE;
            var offPosY = cellVo.posVecIdx.y * GameConst_1.default.BLOCK_SIDE;
            cellVo.blockSprite.setPosition(orginPos.x + offPosX, orginPos.y + offPosY);
        }
        //let graphics: cc.Graphics = this.blocksNode.getComponent(cc.Graphics);
        // graphics.strokeColor = cc.color(255, 0, 0, 255);
        // graphics.lineWidth = 5;
        // graphics.moveTo(0, 0);
        // graphics.lineTo(0, contentHeight);
        // graphics.lineTo(contentWidth, contentHeight);
        // graphics.lineTo(contentWidth, 0);
        // graphics.lineTo(0, 0);
        // graphics.stroke();
    };
    BlocksVo.prototype.checkIsContainPoint = function (point) {
        if (!this.blocksNode.getBoundingBox().contains(point)) {
            return;
        }
        var origin = this.blocksNode.getBoundingBox().origin;
        var inCellPos = cc.p(point.x - origin.x, point.y - origin.y);
        var scaleBlockSide = GameConst_1.default.BLOCK_SIDE * this.blocksNode.scale;
        var posVecIdx = cc.p(Math.floor(inCellPos.x / scaleBlockSide), Math.floor(inCellPos.y / scaleBlockSide));
        for (var i in this.blockCells) {
            var blockCell = this.blockCells[i];
            if (blockCell) {
                if (blockCell.posVecIdx.x == posVecIdx.x && blockCell.posVecIdx.y == posVecIdx.y) {
                    return true;
                }
            }
        }
        return false;
    };
    BlocksVo.prototype.layUpBlock = function () {
        this.setState(GameEnum_1.BlockState.BLOCK_STATE_BOARD);
        for (var i in this.blockCells) {
            var cell = this.blockCells[i];
            if (cell) {
                if (cell.linkBlcokVo != null && cell.linkBlcokVo != undefined) {
                    var linkCellOrigin = cell.linkBlcokVo.blockSprite.getBoundingBoxToWorld().origin;
                    var cellOrigin = cell.blockSprite.getBoundingBoxToWorld().origin;
                    var offPosX = linkCellOrigin.x - cellOrigin.x;
                    var offPosY = linkCellOrigin.y - cellOrigin.y;
                    var blocksPos = this.blocksNode.getPosition();
                    this.blocksNode.setPositionX(blocksPos.x + offPosX);
                    this.blocksNode.setPositionY(blocksPos.y + offPosY);
                    break;
                }
            }
        }
    };
    BlocksVo.prototype.checkIsCanLayUp = function () {
        for (var i in this.blockCells) {
            var cell = this.blockCells[i];
            if (cell.linkBlcokVo == null || cell.linkBlcokVo == undefined || cell.linkBlcokVo.linkedBlockNum > 1) {
                return false;
            }
            else {
            }
        }
        return true;
    };
    BlocksVo.prototype.removeSelf = function () {
        for (var i in this.blockCells) {
            var cell = this.blockCells[i];
            if (cell) {
                cell.removeSelf();
            }
        }
        this.blocksNode.removeFromParent();
        this.blockCells.splice(0, this.blockCells.length);
    };
    BlocksVo.prototype.setState = function (state) {
        this.blockState = state;
        if (state == GameEnum_1.BlockState.BLOCK_STATE_BOARD) {
            this.blocksNode.scale = 1;
            this.blocksNode.setLocalZOrder(GameConst_1.default.BLOCK_NORMAL_ZORDER);
        }
        else if (state == GameEnum_1.BlockState.BLOCK_STATE_BOARD_TIPS) {
            this.blocksNode.scale = 1;
            this.blocksNode.setLocalZOrder(GameConst_1.default.BLOCK_NORMAL_ZORDER);
            this.setNumLabel(1);
        }
        else if (state == GameEnum_1.BlockState.BLOCK_STATE_BOTTOM) {
            this.blocksNode.scale = 0.5;
            this.blocksNode.setLocalZOrder(GameConst_1.default.BLOCK_NORMAL_ZORDER);
        }
        else if (state == GameEnum_1.BlockState.BLOCK_STATE_MOVING) {
            this.blocksNode.scale = 1;
            this.blocksNode.setLocalZOrder(GameConst_1.default.BLOCK_MOVING_ZORDER);
            this;
        }
    };
    BlocksVo.prototype.setTouchPosition = function (pos) {
        var contenSize = this.blocksNode.getContentSize();
        var paddingY = 50;
        this.blocksNode.setPosition(pos.x, paddingY + contenSize.height * 0.5 + pos.y);
    };
    BlocksVo.prototype.toLastState = function () {
        this.setState(this.lastState);
        this.blocksNode.setPosition(this.lastPos);
    };
    BlocksVo.prototype.setNumLabel = function (num) {
        for (var i in this.blockCells) {
            var cell = this.blockCells[i];
            if (cell) {
                cell.setNumLabel(num);
            }
        }
    };
    return BlocksVo;
}());
exports.default = BlocksVo;

cc._RF.pop();