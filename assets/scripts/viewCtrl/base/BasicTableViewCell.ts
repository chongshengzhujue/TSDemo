import UserComponent from "./UserComponent";
import BasicTableDataClass from "./BasicTableDataClass";

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
export default class BasicTableViewCell extends UserComponent {
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    }

    setData<T extends BasicTableDataClass>(T) {
        this.node.width = T.cellSize.width;
        this.node.height = T.cellSize.height;
    }

    // update (dt) {},
}
