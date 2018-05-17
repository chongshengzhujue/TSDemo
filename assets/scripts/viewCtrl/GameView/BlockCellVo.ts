import BlockSpriteLogic from "./BlockSpriteLogic";
import BlockNodePool from "./BlockNodePool";

export default class BlockCellVo {

    //小块的index坐标
    posIdx : number = 0;

    //小块的x，y index坐标
    posVecIdx : cc.Vec2 = cc.p(0, 0);

    //小块的渲染目标
    blockSprite : cc.Node = null;

    //小块重叠的背景小块
    linkBlcokVo : BlockCellVo = null;

    //小块的类型
    blockColorIdx : number = null;

    //blockctrl的component
    spriteComponet : BlockSpriteLogic = null;

    //小块被占用次数
    linkedBlockNum : number = 0;

    initBlockSprite(posIdx: number, posVecIdx: cc.Vec2, blockColorIdx: number, parentNode : cc.Node) {
        this.posIdx = posIdx;
        this.posVecIdx = posVecIdx;
        this.blockColorIdx = blockColorIdx;

        let blockNode: cc.Node = BlockNodePool.getInstance().getBlock();
        parentNode.addChild(blockNode);
        this.blockSprite = blockNode;
        this.spriteComponet = blockNode.getComponent("BlockSpriteLogic");
        this.spriteComponet.setColorById(blockColorIdx);

        // let blockSize = blockNode.getContentSize();
        // let posX = posVecIdx.x * blockSize.width;
        // let posY = posVecIdx.y * blockSize.height;
        // blockNode.setPosition(cc.p(posX, posY));
    }

    setMaskVisible(isVisible) {
        if (this.spriteComponet) {
            this.spriteComponet.setMaskVisible(isVisible);
        }
    }

    setNumLabel(num: number) {
        if (this.spriteComponet) {
            this.spriteComponet.setNumLable(num);
        }
    }

    linkBgBlock(bgBlock: BlockCellVo) {
        this.linkBlcokVo = bgBlock;
        bgBlock.linkedBlockNum++;
    }

    clearLinkBgBlock() {
        if (this.linkBlcokVo) {
            this.linkBlcokVo.linkedBlockNum--;        
            this.linkBlcokVo = null;
        }
        
    }

    removeSelf() {
        this.spriteComponet.setMaskVisible(false);
        this.blockSprite.parent = null;
        BlockNodePool.getInstance().pushBlock(this.blockSprite);
    }
}