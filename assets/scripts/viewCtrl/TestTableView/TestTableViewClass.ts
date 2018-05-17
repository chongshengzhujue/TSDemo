import BasicTableDataClass from "../base/BasicTableDataClass";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TestTableViewClass extends BasicTableDataClass {
    static dataClassList: TestTableViewClass[] = new Array<TestTableViewClass>();

    name: string = "";

    constructor() {
        super();
    }

    static parseData(data:any) {
        for (let i in data) {
            let dataCell = data[i];
            let dataClass: TestTableViewClass = new TestTableViewClass();
            dataClass.id = dataCell.id;
            dataClass.cellSize = dataCell.size;
            dataClass.name = dataCell.name;
            TestTableViewClass.dataClassList[i] = dataClass;
        }
    }
}
