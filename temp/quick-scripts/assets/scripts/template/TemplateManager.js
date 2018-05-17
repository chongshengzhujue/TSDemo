(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/template/TemplateManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'fddb0FixuBCIL6BLvElOJiX', 'TemplateManager', __filename);
// scripts/template/TemplateManager.ts

//模版文件加载管理类
// 2018.01.10 li.xiao
Object.defineProperty(exports, "__esModule", { value: true });
var talefun = cc.talefun;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TemplateManager = /** @class */ (function () {
    function TemplateManager() {
        this.cache = {};
        this.loadListCallback = null;
    }
    TemplateManager_1 = TemplateManager;
    TemplateManager.getInstance = function () {
        if (TemplateManager_1._instance == null) {
            TemplateManager_1._instance = new TemplateManager_1();
        }
        return TemplateManager_1._instance;
    };
    TemplateManager.prototype.getTemplate = function (name, callback) {
        if (name && typeof (name) == "string") {
            if (this.cache[name]) {
                talefun.LogHelper.log("load template : " + name + " in cache");
                if (callback) {
                    callback(this.cache[name]);
                }
            }
            else {
                cc.loader.loadRes("template/" + name, function (error, jsonObjct) {
                    if (error) {
                        talefun.LogHelper.log("load template " + name + " error: " + error);
                    }
                    else {
                        talefun.LogHelper.log("load template : " + name);
                        cc.talefun.LogHelper.dump(jsonObjct);
                        this.cache[name] = jsonObjct;
                        if (callback) {
                            callback(jsonObjct);
                        }
                    }
                }.bind(this));
            }
        }
    };
    TemplateManager.prototype.getTemplateList = function (nameList, callback) {
        this.loadListCallback = callback;
        if (nameList && nameList instanceof Array) {
            var len = nameList.length;
            var self = this;
            if (len > 0) {
                this.stepLoadTemplate(nameList, len - 1);
            }
            else {
                if (this.loadListCallback) {
                    this.loadListCallback();
                }
            }
        }
    };
    TemplateManager.prototype.stepLoadTemplate = function (list, index) {
        var len = list.length;
        var idx = index;
        if (len == 0 || index < 0 || index > len - 1) {
            if (this.loadListCallback) {
                this.loadListCallback();
                this.loadListCallback = null;
            }
            return;
        }
        else {
            this.getTemplate(list[index], function () {
                this.stepLoadTemplate(list, idx - 1);
            }.bind(this));
        }
    };
    TemplateManager.prototype.getTemplateInCache = function (name) {
        if (this.cache) {
            return this.cache[name];
        }
        return null;
    };
    TemplateManager._instance = null;
    TemplateManager = TemplateManager_1 = __decorate([
        ccclass
    ], TemplateManager);
    return TemplateManager;
    var TemplateManager_1;
}());
exports.default = TemplateManager;

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
        //# sourceMappingURL=TemplateManager.js.map
        