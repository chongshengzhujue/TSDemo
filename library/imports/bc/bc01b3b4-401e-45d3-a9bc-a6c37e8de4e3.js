"use strict";
cc._RF.push(module, 'bc01bO0QB5F06m8psN+jeTj', 'TestVO');
// scripts/object/vo/userVO/TestVO.ts

// Learn TypeScript:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/typescript/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BasicVO_1 = require("./../BasicVO");
var TestVO = /** @class */ (function (_super) {
    __extends(TestVO, _super);
    function TestVO() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = 0;
        _this.level = 0;
        _this.coin = 0;
        return _this;
    }
    TestVO = __decorate([
        ccclass
    ], TestVO);
    return TestVO;
}(BasicVO_1.default));
exports.default = TestVO;

cc._RF.pop();