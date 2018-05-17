(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/viewCtrl/TestTableView/TestTableViewClass.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7d603SdLfREiJr6fccxW26Z', 'TestTableViewClass', __filename);
// scripts/viewCtrl/TestTableView/TestTableViewClass.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BasicTableDataClass_1 = require("../base/BasicTableDataClass");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TestTableViewClass = /** @class */ (function (_super) {
    __extends(TestTableViewClass, _super);
    function TestTableViewClass() {
        var _this = _super.call(this) || this;
        _this.name = "";
        return _this;
    }
    TestTableViewClass_1 = TestTableViewClass;
    TestTableViewClass.parseData = function (data) {
        for (var i in data) {
            var dataCell = data[i];
            var dataClass = new TestTableViewClass_1();
            dataClass.id = dataCell.id;
            dataClass.cellSize = dataCell.size;
            dataClass.name = dataCell.name;
            TestTableViewClass_1.dataClassList[i] = dataClass;
        }
    };
    TestTableViewClass.dataClassList = new Array();
    TestTableViewClass = TestTableViewClass_1 = __decorate([
        ccclass
    ], TestTableViewClass);
    return TestTableViewClass;
    var TestTableViewClass_1;
}(BasicTableDataClass_1.default));
exports.default = TestTableViewClass;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=TestTableViewClass.js.map
        