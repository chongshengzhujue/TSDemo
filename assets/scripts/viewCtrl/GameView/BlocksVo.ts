import BlockCellVo from "./BlockCellVo";
import GameConst from "./GameConst";
import { BlockState } from "./GameEnum";

export default class BlocksVo {

    //小块的数组
    blockCells : BlockCellVo[] = [];

    //大块的尺寸
    blocksNodeSize : cc.Size = cc.size(0, 0);

    //blocks的渲染节点
    blocksNode : cc.Node;

    minVec : cc.Vec2;

    maxVec : cc.Vec2;

    blockState: BlockState = BlockState.BLOCK_STATE_BOTTOM;

    lastState : BlockState = BlockState.BLOCK_STATE_BOTTOM;

    lastPos : cc.Vec2 = cc.p(0, 0);

    constructor() {
        this.blocksNode = new cc.Node();
        this.blocksNode.setAnchorPoint(cc.p(0.5, 0.5));
        //this.blocksNode.addComponent(cc.Graphics);
    }

    addBlock(cellIdx: number, posVecIdx: cc.Vec2, colorIdx: number) {
        let blockCellVo = new BlockCellVo();
        blockCellVo.initBlockSprite(cellIdx, posVecIdx, colorIdx, this.blocksNode);
        this.blockCells.push(blockCellVo);
    }

    resetContentSize() {
        let minX = 1000;
        let minY = 1000;
        let maxX = 0;
        let maxY = 0;
        for (let i in this.blockCells) {
            let cellVo: BlockCellVo = this.blockCells[i];
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

        let contentWidth = GameConst.BLOCK_SIDE * this.blocksNodeSize.width;
        let contentHeight = GameConst.BLOCK_SIDE * this.blocksNodeSize.height;

        this.blocksNode.setContentSize(contentWidth, contentHeight);
        cc.log("contentWidth " + contentWidth);
        cc.log("contentHeight " + contentHeight);

        let orginPos = cc.p(-contentWidth*0.5, -contentHeight*0.5)
        for (let i in this.blockCells) {
            let cellVo: BlockCellVo = this.blockCells[i];
            cellVo.posVecIdx.x = cellVo.posVecIdx.x - minX;
            cellVo.posVecIdx.y = cellVo.posVecIdx.y - minY;
            let offPosX = cellVo.posVecIdx.x * GameConst.BLOCK_SIDE;
            let offPosY = cellVo.posVecIdx.y * GameConst.BLOCK_SIDE;
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
    }

    checkIsContainPoint(point: cc.Vec2): boolean {
        if(!this.blocksNode.getBoundingBox().contains(point)) {
            return;
        }


        let origin = this.blocksNode.getBoundingBox().origin;
        let inCellPos = cc.p(point.x - origin.x, point.y - origin.y);

        let scaleBlockSide = GameConst.BLOCK_SIDE * this.blocksNode.scale;
        let posVecIdx = cc.p(Math.floor(inCellPos.x / scaleBlockSide), Math.floor(inCellPos.y / scaleBlockSide));


        for(let i in this.blockCells) {
            let blockCell = this.blockCells[i];
            if (blockCell) {
                if (blockCell.posVecIdx.x == posVecIdx.x && blockCell.posVecIdx.y == posVecIdx.y) {
                    return true; 
                }
            }
        }

        return false;
    }

    layUpBlock() {
        this.setState(BlockState.BLOCK_STATE_BOARD);
        for (let i in this.blockCells) {
            let cell = this.blockCells[i];
            if (cell) {
                if (cell.linkBlcokVo != null && cell.linkBlcokVo != undefined) {
                    let linkCellOrigin = cell.linkBlcokVo.blockSprite.getBoundingBoxToWorld().origin;
                    let cellOrigin = cell.blockSprite.getBoundingBoxToWorld().origin;
                    let offPosX = linkCellOrigin.x - cellOrigin.x;
                    let offPosY = linkCellOrigin.y - cellOrigin.y;
                    
                    let blocksPos = this.blocksNode.getPosition();
                    this.blocksNode.setPositionX(blocksPos.x + offPosX);
                    this.blocksNode.setPositionY(blocksPos.y + offPosY);
                    break;
                }
                
            }
        }
    }

    checkIsCanLayUp() {
        for(let i in this.blockCells) {
            let cell = this.blockCells[i];
            if (cell.linkBlcokVo == null || cell.linkBlcokVo == undefined || cell.linkBlcokVo.linkedBlockNum > 1) {
                return false;
            } else {
            }
        }

        return true;
    }

    removeSelf() {
        for (let i in this.blockCells) {
            let cell = this.blockCells[i];
            if (cell) {
                cell.removeSelf();
            }
        }

        this.blocksNode.removeFromParent();
        this.blockCells.splice(0, this.blockCells.length);
    }

    setState(state: BlockState) {
        this.blockState = state;
        if (state == BlockState.BLOCK_STATE_BOARD) {
            this.blocksNode.scale = 1;
            this.blocksNode.setLocalZOrder(GameConst.BLOCK_NORMAL_ZORDER);
        } else if (state == BlockState.BLOCK_STATE_BOARD_TIPS) {
            this.blocksNode.scale = 1;
            this.blocksNode.setLocalZOrder(GameConst.BLOCK_NORMAL_ZORDER);
            this.setNumLabel(1);
        } else if (state == BlockState.BLOCK_STATE_BOTTOM) {
            this.blocksNode.scale = 0.5;
            this.blocksNode.setLocalZOrder(GameConst.BLOCK_NORMAL_ZORDER);
        } else if (state == BlockState.BLOCK_STATE_MOVING) {
            this.blocksNode.scale = 1;
            this.blocksNode.setLocalZOrder(GameConst.BLOCK_MOVING_ZORDER);
            this
        }
    }

    setTouchPosition(pos: cc.Vec2) {
        let contenSize = this.blocksNode.getContentSize();
        let paddingY = 50;
        this.blocksNode.setPosition(pos.x, paddingY + contenSize.height*0.5 + pos.y);
    }

    toLastState() {
        this.setState(this.lastState);
        this.blocksNode.setPosition(this.lastPos);
    }

    setNumLabel(num: number) {
        for (let i in this.blockCells) {
            let cell = this.blockCells[i];
            if (cell) {
                cell.setNumLabel(num);
            }
        }
    }
 }