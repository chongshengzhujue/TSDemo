const {ccclass, property} = cc._decorator;

@ccclass
export default class BasicTableDataClass {
    
    //cell的id
    id: number = 0;

    //cell的尺寸大小
    cellSize: cc.Size = cc.size(0, 0);
    
    constructor() {
        
    }
}
