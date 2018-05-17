// Learn TypeScript:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/typescript/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html



const {ccclass, property} = cc._decorator;

@ccclass
export default class BlockSpriteLogic extends cc.Component {

    @property(cc.SpriteFrame)
    blockSpriteFrames: cc.SpriteFrame;

    @property(cc.Node)
    maskNode: cc.Node = null;

    @property(cc.Label)
    numLabel: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.setMaskVisible(false);
        this.setNumLable(0);
    }

    // update (dt) {},

    setColorById(colorId: number) {
        let spriteComponent = this.node.getComponent(cc.Sprite);
        spriteComponent.spriteFrame = this.blockSpriteFrames[colorId];
        cc.log("==========setColorById:" + colorId);
    }

    setMaskVisible(isVisible) {
        this.maskNode.active = isVisible;
    }

    setNumLable(num: number) {
        if (num <= 0 ) {
            this.numLabel.node.active = false;
            return;
        }
        this.numLabel.node.active = true;
        this.numLabel.string = num.toString();
    }
}
