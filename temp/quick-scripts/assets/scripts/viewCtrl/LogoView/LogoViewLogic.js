(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/viewCtrl/LogoView/LogoViewLogic.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ff393HD1LhGCoHwCC21avYE', 'LogoViewLogic', __filename);
// scripts/viewCtrl/LogoView/LogoViewLogic.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UserComponent_1 = require("./../base/UserComponent");
var Localization_1 = require("../../tools/Localization");
var ViewManager_1 = require("../ViewManager");
var talefun = cc.talefun;
var TemplateViewLogic = /** @class */ (function (_super) {
    __extends(TemplateViewLogic, _super);
    function TemplateViewLogic() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.imgLogo = null;
        _this.tableViewPrefab = null;
        _this.tempLabel = null;
        return _this;
    }
    TemplateViewLogic.prototype.onLoad = function () {
        cc.game.on(cc.game.EVENT_SHOW, (function () {
            cc.log("===============================on show 1");
        }).bind(this));
        cc.game.on(cc.game.EVENT_HIDE, (function () {
            cc.log("===============================on hide 2");
        }).bind(this));
    };
    // 继承 UserComponent， 当组件的node open时 调用
    TemplateViewLogic.prototype.onEnter = function () {
        if (this.node.viewCtrl) {
            this.viewCtrl = this.node.viewCtrl;
        }
        talefun.LogHelper.log("onEnter :" + "LogoViewLogic");
        // talefun.TemplateManager.getTemplateList(["template","project"],function(){
        //     talefun.LogHelper.log("test load template list success ");
        // })
        // let str = JSON.stringify(["hello"," world"]);
        // // talefun.LogHelper.log(str);
        // talefun.LogHelper.logW(str);
        // let testVO = new TestVO();
        // testVO.setProperties({id:1,coin:100});
        // talefun.LogHelper.log(testVO.getFormatStr());
        // let objectManager = <ObjectManager>talefun.ObjectManager;
        // let testModel = <TestModel>objectManager.getModelByName("testModel");
        // for(let i = 1 ; i < 3; i++)
        // {
        //     let key = testModel.testKeyPrefix + i;
        //     let item = new TestVO();
        //     item.parseData({id:100 + i,level:50 *i, coin:1000 * i})
        //     testModel.setTestItem(key,item);
        // }
        // testModel.saveTestList();
        Localization_1.default.setLabelText(this.label, "{#1}{#2}{#3}", ["Hello", " World!", 120]);
        this.logoMotion();
        this.showTableView();
    };
    // 继承 UserComponent， 当组件的node close时 调用
    TemplateViewLogic.prototype.onExit = function () {
    };
    // 继承 UserComponent， 当组件的node 作为 item 时 更新调用
    TemplateViewLogic.prototype.updateView = function (idx, data) {
    };
    TemplateViewLogic.prototype.logoMotion = function () {
        if (this.imgLogo !== null) {
            var logoNode = this.imgLogo.node;
            logoNode.opacity = 0;
            var actFadeIn = cc.fadeIn(2);
            logoNode.runAction(actFadeIn);
        }
    };
    TemplateViewLogic.prototype.onClickBtnClose = function (event) {
        // let target = event.target;
        // talefun.AudioManager.playBtnEffect(target);
        // NetworkManager.getInstance().httpClient['updateUserInfo']();
        cc.director.loadScene("TestScene");
    };
    TemplateViewLogic.prototype.showTableView = function () {
        var tableView = ViewManager_1.default.getInstance().showPrefab(this.tableViewPrefab.name, this.tableViewPrefab, {}, this.node, this.viewCtrl);
        tableView.rootView.setPosition(cc.p(100, 1200));
        var tableLogic = tableView.logicComponent;
        tableLogic.reloadData();
    };
    __decorate([
        property(cc.Label)
    ], TemplateViewLogic.prototype, "label", void 0);
    __decorate([
        property(cc.Sprite)
    ], TemplateViewLogic.prototype, "imgLogo", void 0);
    __decorate([
        property(cc.Prefab)
    ], TemplateViewLogic.prototype, "tableViewPrefab", void 0);
    __decorate([
        property(cc.Label)
    ], TemplateViewLogic.prototype, "tempLabel", void 0);
    TemplateViewLogic = __decorate([
        ccclass
    ], TemplateViewLogic);
    return TemplateViewLogic;
}(UserComponent_1.default));
exports.default = TemplateViewLogic;

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
        //# sourceMappingURL=LogoViewLogic.js.map
        