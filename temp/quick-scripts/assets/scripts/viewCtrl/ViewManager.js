(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/viewCtrl/ViewManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '84fbeZ00L5D+ZrrBb01a/xq', 'ViewManager', __filename);
// scripts/viewCtrl/ViewManager.ts

// ViewManager ，用于管理View 打开和关闭，资源释放管理
//2018.01.10 li.xiao
Object.defineProperty(exports, "__esModule", { value: true });
var BasicViewCtrl_1 = require("./Base/BasicViewCtrl");
var talefun = cc.talefun;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ViewManager = /** @class */ (function () {
    function ViewManager() {
        this.__instanceId = null;
        this.viewStack = [];
        this.resCache = { deps: {}, imageCache: {} };
        this.clearUnusedResCallBack = null;
        this.__instanceId = cc.ClassManager.getNewInstanceId();
    }
    ViewManager_1 = ViewManager;
    ViewManager.prototype.showView = function (viewName, data, ViewClass) {
        if (viewName && typeof (viewName) == "string") {
            talefun.LogHelper.log("load view" + viewName);
            cc.loader.loadRes("prefab/view/" + viewName, function (error, prefab) {
                if (!error) {
                    // talefun.LogHelper.log("******load ******" + error);
                    // var ViewCtrl = require(ViewClass);
                    var viewCtrl = null;
                    if (ViewClass && typeof (ViewClass) == "string") {
                        // var ViewCtrl = require(ViewClass);
                        // viewCtrl = new ViewCtrl();
                    }
                    else {
                        viewCtrl = new BasicViewCtrl_1.default();
                    }
                    viewCtrl.prefabName = viewName;
                    viewCtrl.openView(prefab, data);
                    //增加View 依赖缓存
                    var deps = cc.loader.getDependsRecursively('prefab/view/' + viewName);
                    viewCtrl.resCache.deps = deps;
                    this.retainDeps(deps);
                    // var uuid = cc.loader._getResUuid('ui/' + "atlas",cc.Texture2D);
                    // var uuids = cc.loader._resources.getUuidArray('ui/' + "atlas",cc.SpriteFrame)
                    // for(var key in uuids)
                    // {
                    //     talefun.LogHelper.log("uuids key : " + key + " value : " + uuids[key] + " referKey : " + cc.loader._getReferenceKey(uuids[key]));
                    // }
                    // talefun.LogHelper.log("uuid : " + uuid + " referKey : " + cc.loader._getReferenceKey(uuid));
                    // for(var key in deps)
                    // {
                    //     talefun.LogHelper.log("key : " + key + ", value : " + deps[key] + " referKey : " + cc.loader._getReferenceKey(deps[key]));
                    // }
                    // talefun.LogHelper.log("cache info")
                    // for(var key in cc.loader._cache)
                    // {
                    //     talefun.LogHelper.log("cache key : " + key);
                    // }
                }
                else {
                    talefun.LogHelper.log("************" + error);
                }
            }.bind(this));
        }
    };
    ViewManager.prototype.showPrefab = function (prefabName, prefab, data, parent, parentViewCtrl) {
        talefun.LogHelper.log("showPrefabPreLoad" + parentViewCtrl);
        if (prefabName && prefab && parent && parentViewCtrl) {
            talefun.LogHelper.log("showPrefab");
            var viewCtrl = null;
            // let ViewClass = ViewClass;
            if (null) {
                // var ViewCtrl = require(ViewClass);
                // viewCtrl = new ViewCtrl();
            }
            else {
                viewCtrl = new BasicViewCtrl_1.default();
            }
            viewCtrl.prefabName = prefabName;
            return viewCtrl.openView(prefab, data, parent, parentViewCtrl);
        }
    };
    ViewManager.prototype.pushView = function (viewCtrl) {
        if (viewCtrl && viewCtrl instanceof BasicViewCtrl_1.default) {
            talefun.LogHelper.log("****** push view *********  " + viewCtrl.prefabName);
            this.viewStack.push(viewCtrl);
            if (viewCtrl.isFullScene()) {
                talefun.LogHelper.log("stack length :" + this.viewStack.length);
                if (this.viewStack.length == 1) {
                    viewCtrl.setVisible(true);
                    return;
                }
                for (var i = this.viewStack.length - 2; i >= 0; i--) {
                    var tempCtrl = this.viewStack[i];
                    tempCtrl.setVisible(false);
                }
            }
        }
    };
    ViewManager.prototype.popView = function (viewCtrl) {
        if (viewCtrl && viewCtrl instanceof BasicViewCtrl_1.default) {
            talefun.LogHelper.log("****** pop view *********  " + viewCtrl.prefabName);
            for (var i = this.viewStack.length - 1; i >= 0; i--) {
                if (this.viewStack[i] == viewCtrl) {
                    this.viewStack.splice(i, 1);
                    talefun.LogHelper.log("pop View : " + viewCtrl.prefabName);
                    break;
                }
            }
            for (var i = this.viewStack.length - 1; i >= 0; i--) {
                var tempCtrl = this.viewStack[i];
                tempCtrl.setVisible(true);
                if (tempCtrl.isFullScene()) {
                    break;
                }
            }
            this.clearUnusedResCallBack = function () {
                this.clearUnusedRes();
                cc.director.getScheduler().unschedule(this.clearUnusedResCallBack, this);
                this.clearUnusedResCallBack = null;
            };
            cc.director.getScheduler().schedule(this.clearUnusedResCallBack, this, 0, 0, 1, false);
        }
    };
    ViewManager.prototype.retainDeps = function (deps) {
        if (deps && deps instanceof Array) {
            var len = deps.length;
            var depsCache = this.resCache.deps;
            for (var i = 0; i < len; i++) {
                if (depsCache[deps[i]]) {
                    depsCache[deps[i]] = depsCache[deps[i]] + 1;
                }
                else {
                    depsCache[deps[i]] = 1;
                }
                talefun.LogHelper.log("retainDeps : " + deps[i]);
            }
        }
    };
    ViewManager.prototype.releaseDeps = function (deps) {
        if (deps && deps instanceof Array) {
            var len = deps.length;
            var depsCache = this.resCache.deps;
            for (var i = 0; i < len; i++) {
                if (depsCache[deps[i]] && depsCache[deps[i]] > 0) {
                    depsCache[deps[i]] = depsCache[deps[i]] - 1;
                }
                else {
                    depsCache[deps[i]] = 0;
                }
                talefun.LogHelper.log("releaseDeps : " + deps[i]);
            }
        }
    };
    ViewManager.prototype.retainImageCache = function (imagePath) {
        if (imagePath) {
            var imageCache = this.resCache.imageCache;
            if (imagePath instanceof Array) {
                var len = imagePath.length;
                for (var i = 0; i < len; i++) {
                    var subPath = imagePath[i];
                    this.retainImageCache(subPath);
                }
            }
            else {
                if (imageCache[imagePath]) {
                    imageCache[imagePath] = imageCache[imagePath] + 1;
                }
                else {
                    imageCache[imagePath] = 1;
                }
                talefun.LogHelper.log("retainImageCache : " + imagePath);
            }
        }
    };
    ViewManager.prototype.releaseImageCache = function (imagePath) {
        if (imagePath) {
            var imageCache = this.resCache.imageCache;
            if (imagePath instanceof Array) {
                var len = imagePath.length;
                for (var i = 0; i < len; i++) {
                    var subPath = imagePath[i];
                    this.releaseImageCache(subPath);
                }
            }
            else {
                if (imageCache[imagePath] && imageCache[imagePath] > 0) {
                    imageCache[imagePath] = imageCache[imagePath] - 1;
                }
                else {
                    imageCache[imagePath] = 0;
                }
                talefun.LogHelper.log("releaseImageCache : " + imagePath);
            }
        }
    };
    ViewManager.prototype.clearUnusedRes = function () {
        talefun.LogHelper.log("******* clearUnusedRes ********");
        var depsCache = this.resCache.deps;
        var imageCache = this.resCache.imageCache;
        //清理View依赖资源
        var tempDepsKeyList = [];
        for (var key in depsCache) {
            if (depsCache[key] == 0) {
                cc.loader.release(key);
                tempDepsKeyList.push(key);
                talefun.LogHelper.log("clearUnusedRes deps : " + key);
            }
        }
        //清除已删除缓存记录
        for (var i = 0; i < tempDepsKeyList.length; i++) {
            var key = tempDepsKeyList[i];
            delete depsCache[key];
        }
        tempDepsKeyList.splice(0, tempDepsKeyList.length);
        //清理View 动态加载imgae 资源
        var tempImageKeyList = [];
        for (var key in imageCache) {
            if (imageCache[key] == 0) {
                tempImageKeyList.push(key);
                //释放 image frame缓存
                var uuidFrames = cc.loader._resources.getUuidArray(key, cc.SpriteFrame);
                if (uuidFrames && uuidFrames instanceof Array) {
                    for (var index in uuidFrames) {
                        cc.loader.release(uuidFrames[index]);
                    }
                }
                //释放 image Atlas缓存
                var uuisAtlas = cc.loader._getResUuid('ui/' + "atlas", cc.SpriteAtlas);
                cc.loader.release(uuisAtlas);
                //释放 image textrue缓存
                var uuidTexture = cc.loader._getResUuid('ui/' + "atlas", cc.Texture2D);
                cc.loader.release(uuidTexture);
                talefun.LogHelper.log("clearUnusedRes imageCache : " + key);
            }
        }
        //清除已删除缓存记录
        for (var i_1 = 0; i_1 < tempImageKeyList.length; i_1++) {
            var key = tempImageKeyList[i_1];
            delete imageCache[key];
        }
        tempImageKeyList.splice(0, tempImageKeyList.length);
        cc.sys.garbageCollect();
    };
    ViewManager.getInstance = function () {
        if (ViewManager_1._instance == null) {
            ViewManager_1._instance = new ViewManager_1();
        }
        return ViewManager_1._instance;
    };
    ViewManager._instance = null;
    ViewManager = ViewManager_1 = __decorate([
        ccclass
    ], ViewManager);
    return ViewManager;
    var ViewManager_1;
}());
exports.default = ViewManager;

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
        //# sourceMappingURL=ViewManager.js.map
        