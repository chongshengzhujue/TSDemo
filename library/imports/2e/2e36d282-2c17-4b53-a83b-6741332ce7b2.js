"use strict";
cc._RF.push(module, '2e36dKCLBdLU6g7Z0EzLOey', 'testTableViewCellLogic');
// scripts/viewCtrl/TestTableView/testTableViewCellLogic.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BasicTableViewCell_1 = require("../base/BasicTableViewCell");
// Learn TypeScript:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/typescript/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TestTableViewCellLogic = /** @class */ (function (_super) {
    __extends(TestTableViewCellLogic, _super);
    function TestTableViewCellLogic() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = null;
        return _this;
        // update (dt) {},
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {},
    TestTableViewCellLogic.prototype.start = function () {
    };
    TestTableViewCellLogic.prototype.setData = function (T) {
        _super.prototype.setData.call(this, T);
        var dataClass = T;
        this.label.string = dataClass.id.toString();
    };
    __decorate([
        property(cc.Label)
    ], TestTableViewCellLogic.prototype, "label", void 0);
    TestTableViewCellLogic = __decorate([
        ccclass
    ], TestTableViewCellLogic);
    return TestTableViewCellLogic;
}(BasicTableViewCell_1.default));
exports.default = TestTableViewCellLogic;

cc._RF.pop();