"use strict";
cc._RF.push(module, '71552Uz6RhKZ7cKI+ZdgO5B', 'TemplateViewLogic');
// scripts/viewCtrl/base/TemplateViewLogic.ts

//ViewLogic 模版类，用于新建组件 copy
// 2018.01.10 li.xiao
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UserComponent_1 = require("./../base/UserComponent");
var talefun = cc.talefun;
var TemplateViewLogic = /** @class */ (function (_super) {
    __extends(TemplateViewLogic, _super);
    function TemplateViewLogic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TemplateViewLogic.prototype.onLoad = function () {
    };
    // 继承 UserComponent， 当组件的node open时 调用
    TemplateViewLogic.prototype.onEnter = function () {
        if (this.node.viewCtrl) {
            this.viewCtrl = this.node.viewCtrl;
        }
    };
    // 继承 UserComponent， 当组件的node close时 调用
    TemplateViewLogic.prototype.onExit = function () {
    };
    // 继承 UserComponent， 当组件的node 作为 item 时 更新调用
    TemplateViewLogic.prototype.updateView = function (idx, data) {
    };
    TemplateViewLogic = __decorate([
        ccclass
    ], TemplateViewLogic);
    return TemplateViewLogic;
}(UserComponent_1.default));
exports.default = TemplateViewLogic;

cc._RF.pop();