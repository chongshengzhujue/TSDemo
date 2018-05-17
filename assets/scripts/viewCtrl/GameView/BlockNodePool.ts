

export default class BlockNodePool {

    blockNodeArr : cc.Node[];

    blockPrefab : cc.Prefab;

    parentNode : cc.Node;

    constructor() {
        
    }

    initPool(blockPrefab : cc.Prefab, initNum : number) {
        this.blockPrefab = blockPrefab;
        this.blockNodeArr = new Array();
        this.parentNode = new cc.Node();
        cc.director.getScene().addChild(this.parentNode);

        for(let i = 0; i < initNum; i++) {
            let blockNode: cc.Node = cc.instantiate(blockPrefab);
            this.blockNodeArr.push(blockNode);
        }
    }

    getBlock(): cc.Node {
        if (this.blockNodeArr.length <= 0) {
            let blockNode: cc.Node = cc.instantiate(this.blockPrefab);
            cc.log("=======================get new block");
            return blockNode;
        }

        let blockNode = this.blockNodeArr.pop();
        //blockNode.removeFromParent(false);
        cc.log("=======================get pool block");
        return blockNode;
    }

    pushBlock(blockNode: cc.Node) {
        //blockNode.active = false;
        //this.parentNode.addChild(blockNode);
        this.blockNodeArr.push(blockNode);
    }

    //注意，BlockNodePool是要替换成你自己实现的子类 这里没有实际的作用
    private static instance:BlockNodePool;
    /**
     * 获取实例的静态方法实例
     * @return
     *
     */
    public static getInstance():BlockNodePool
    {
        if(!this.instance)
        {
            this.instance = new BlockNodePool();
        }
        return this.instance;
    }

    public destroy() {
        this.blockNodeArr.splice(0,this.blockNodeArr.length);
    }
}