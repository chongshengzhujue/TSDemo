import BasicTableViewCell from "../base/BasicTableViewCell";
import BasicTableDataClass from "../base/BasicTableDataClass";
import TestTableViewClass from "./TestTableViewClass";

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
export default class TestTableViewCellLogic extends BasicTableViewCell {

    @property(cc.Label)
    label: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    }

    setData<T extends BasicTableDataClass>(T) {
        super.setData(T);
        let dataClass: TestTableViewClass = T;
        this.label.string = dataClass.id.toString();
    }

    // update (dt) {},
}
