"use strict";
cc._RF.push(module, '60978W4/79JhJz629fvGtts', 'UserDataModel');
// scripts/object/model/userModel/UserDataModel.ts

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
var BasicModel_1 = require("./../BasicModel");
var talefun = cc.talefun;
var UserDataModel = /** @class */ (function (_super) {
    __extends(UserDataModel, _super);
    function UserDataModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.userDataList = {
            token: ""
        };
        return _this;
        // update (dt) {},
    }
    UserDataModel.prototype.getToken = function () {
        return this.userDataList["token"];
    };
    UserDataModel.prototype.setToken = function (token) {
        this.userDataList["token"] = token;
        this.saveItem("token", token);
    };
    UserDataModel.prototype.saveUserDMCache = function () {
        for (var key in this.userDataList) {
            var item = this.userDataList[key];
            this.saveItem(key, item.getFormatStr());
        }
    };
    UserDataModel.prototype.initModel = function () {
        this.parseDataFromDB();
    };
    UserDataModel.prototype.parseDataFromDB = function () {
        talefun.LogHelper.log("**************parseDataFromDB*************");
        for (var k in this.userDataList) {
            this.userDataList[k] = this.getItem(k);
        }
        talefun.LogHelper.log("**************parseDataFromDB*************");
    };
    UserDataModel.prototype.parseDataFromServer = function (data) {
        if (data.sessionToken != undefined) {
            this.setToken(data.sessionToken);
        }
    };
    UserDataModel = __decorate([
        ccclass
    ], UserDataModel);
    return UserDataModel;
}(BasicModel_1.default));
exports.default = UserDataModel;

cc._RF.pop();