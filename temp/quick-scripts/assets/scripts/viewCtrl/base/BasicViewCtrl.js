(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/viewCtrl/base/BasicViewCtrl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '53b02sLrdpIebA0IelX7IlM', 'BasicViewCtrl', __filename);
// scripts/viewCtrl/base/BasicViewCtrl.ts

// viewCtrl 基类 ,用于托管view，资源释放管理，
// 2018.01.09 li.xiao
Object.defineProperty(exports, "__esModule", { value: true });
var eventManager = cc.talefun.EventManager;
var LogHelper = cc.talefun.LogHelper;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BasicViewCtrl = /** @class */ (function () {
    function BasicViewCtrl() {
        this.prefabName = "";
        this.rootView = null;
        this.isOpen = false;
        this.isInViewStack = false;
        this.logicComponent = null;
        this.parentNode = null;
        this.parentViewCtrl = null;
        this.subViewCtrlList = [];
        this.resCache = { deps: [], imageCache: [] };
        this.data = null;
        this.eventCache = [];
    }
    BasicViewCtrl.prototype.openView = function (prefab, data, parentNode, parentViewCtrl) {
        this.data = data;
        LogHelper.log("openView : " + data);
        if (!this.isOpen) {
            this.rootView = cc.instantiate(prefab);
            this.rootView["viewCtrl"] = this;
            this.logicComponent = this.rootView.getComponent(this.prefabName + "Logic");
            if (parentNode && parentViewCtrl) {
                parentNode.addChild(this.rootView);
                parentViewCtrl.addSubViewCtrl(this);
                this.parentViewCtrl = parentViewCtrl;
            }
            else {
                cc.director.getScene().addChild(this.rootView);
                cc.talefun.ViewManager.pushView(this);
                this.isInViewStack = true;
            }
            if (this.logicComponent && this.logicComponent.onEnter) {
                this.logicComponent.onEnter();
            }
            this.isOpen = true;
        }
        return this;
    };
    BasicViewCtrl.prototype.closeView = function () {
        //clear subViewCtrlList
        var subLen = this.subViewCtrlList.length;
        for (var i = 0; i < subLen; i++) {
            this.subViewCtrlList[i].closeView();
        }
        this.subViewCtrlList.splice(0, subLen);
        if (this.rootView && this.rootView instanceof cc.Node) {
            //移除事件
            this.removeAllEventListeners();
            if (this.logicComponent && this.logicComponent.onExit) {
                this.logicComponent.onExit();
            }
            if (this.parentViewCtrl) {
                this.parentViewCtrl.removeSubViewCtrl(this);
                this.parentViewCtrl = null;
            }
            this.rootView.removeFromParent();
            this.rootView.destroy();
            this.rootView = null;
            this.logicComponent = null;
        }
        this.isOpen = false;
        if (this.isInViewStack) {
            //当界面类型为View时 关闭界面时释放依赖缓存
            cc.talefun.ViewManager.releaseDeps(this.resCache.deps);
            //当界面类型为View时 关闭界面时释放动态image缓存
            cc.talefun.ViewManager.releaseImageCache(this.resCache.imageCache);
            cc.talefun.ViewManager.popView(this);
        }
    };
    BasicViewCtrl.prototype.addSubViewCtrl = function (viewCtrl) {
        if (viewCtrl && this.subViewCtrlList.indexOf(viewCtrl) == -1) {
            this.subViewCtrlList.push(viewCtrl);
        }
    };
    BasicViewCtrl.prototype.removeSubViewCtrl = function (viewCtrl) {
        if (viewCtrl) {
            var index = this.subViewCtrlList.indexOf(viewCtrl);
            if (index !== -1) {
                this.subViewCtrlList.splice(index, 1);
            }
        }
    };
    BasicViewCtrl.prototype.isFullScene = function () {
        if (this.rootView && this.logicComponent) {
            LogHelper.log("isFullScene : " + this.logicComponent.isFullScene);
            return this.logicComponent.isFullScene;
        }
        else {
            return false;
        }
    };
    BasicViewCtrl.prototype.setVisible = function (isVisible) {
        if (this.rootView) {
            this.rootView.active = isVisible;
        }
    };
    BasicViewCtrl.prototype.addEventListener = function (eventType, callback) {
        if (!this.eventCache) {
            this.eventCache = [];
        }
        if (eventType && callback) {
            var subCache = { eventType: eventType, callback: callback };
            this.eventCache.push(subCache);
            if (eventManager) {
                eventManager.addEventListener(eventType, callback);
            }
        }
    };
    BasicViewCtrl.prototype.dispatchEvent = function (eventType, params) {
        if (eventManager) {
            eventManager.dispatchEvent(eventType, params);
        }
    };
    BasicViewCtrl.prototype.removeEventListener = function (eventType, callback) {
        if (eventType && callback) {
            if (eventManager) {
                eventManager.removeEventListener(eventType, callback);
            }
        }
    };
    BasicViewCtrl.prototype.removeAllEventListeners = function () {
        if (this.eventCache) {
            for (var i = 0; i < this.eventCache.length; i++) {
                var subCache = this.eventCache[i];
                eventManager.removeEventListener(subCache.eventType, subCache.callback);
                delete subCache.eventType;
                delete subCache.callback;
            }
            this.eventCache.splice(i, this.eventCache.length);
        }
    };
    BasicViewCtrl.prototype.retainImageCache = function (imagePath) {
        if (imagePath) {
            var index = this.resCache.imageCache.indexOf(imagePath);
            if (index == -1) {
                this.resCache.imageCache.push(imagePath);
                cc.talefun.ViewManager.retainImageCache(imagePath);
            }
        }
    };
    BasicViewCtrl.prototype.releaseImageCacheInOrder = function (order) {
        if (order) {
            if (order instanceof Array) {
                var len = order.length;
                for (var i = 0; i < len; i++) {
                    var subPath = order[i];
                    this.releaseImageCacheInOrder(subPath);
                }
            }
            else {
                var index = this.resCache.imageCache.indexOf(order);
                if (index !== -1) {
                    this.resCache.imageCache.splice(index, 1);
                    cc.talefun.ViewManager.releaseImageCache(order);
                }
            }
        }
    };
    BasicViewCtrl.prototype.setSpriteFrame = function (sprite, resPath, frameName) {
        if (sprite && sprite instanceof cc.Sprite && resPath && frameName) {
            cc.loader.loadRes(resPath, cc.SpriteAtlas, function (error, atlas) {
                if (error) {
                    LogHelper.log("setSpriteFrame Error: " + error);
                }
                else {
                    this.retainImageCache(resPath);
                    if (cc.isValid(sprite)) {
                        var frame = atlas.getSpriteFrame(frameName);
                        if (frame) {
                            sprite.spriteFrame = frame;
                        }
                    }
                }
            }.bind(this));
        }
    };
    BasicViewCtrl.prototype.setSpriteTexture = function (sprite, resPath) {
        if (sprite && sprite instanceof cc.Sprite && resPath) {
            cc.loader.loadRes(resPath, cc.SpriteFrame, function (error, spriteFrame) {
                if (error) {
                    LogHelper.log("setSpriteFrame Error: " + error);
                }
                else {
                    this.retainImageCache(resPath);
                    if (cc.isValid(sprite)) {
                        sprite.spriteFrame = spriteFrame;
                    }
                }
            }.bind(this));
        }
    };
    BasicViewCtrl.prototype.setSpriteAutoByName = function (sprite, frameName) {
        if (sprite == null || sprite == undefined) {
            return;
        }
        var UIResMap = cc.talefun.UIResMap;
        var resInfo = UIResMap.getResInfo(frameName);
        if (resInfo !== null && resInfo !== undefined) {
            if (resInfo.plistPath) {
                this.setSpriteFrame(sprite, resInfo.plistPath, frameName);
            }
            else if (resInfo.localPath) {
                this.setSpriteTexture(sprite, resInfo.localPath);
            }
        }
    };
    BasicViewCtrl.prototype.setBtnFrame = function (btn, resPath, frameName) {
        if (btn && btn instanceof cc.Button && resPath && frameName) {
            cc.loader.loadRes(resPath, cc.SpriteAtlas, function (error, atlas) {
                if (error) {
                    LogHelper.log("setSpriteFrame Error: " + error);
                }
                else {
                    this.retainImageCache(resPath);
                    if (cc.isValid(btn)) {
                        var frame = atlas.getSpriteFrame(frameName);
                        var sprite = btn._sprite;
                        if (frame && sprite) {
                            var transition = btn.transition;
                            if (transition == 2) {
                                btn.normalSprite = frame;
                                btn.pressedSprite = frame;
                                btn.hoverSprite = frame;
                                btn.disabledSprite = frame;
                            }
                            else {
                                sprite.spriteFrame = frame;
                            }
                        }
                    }
                }
            }.bind(this));
        }
    };
    BasicViewCtrl.prototype.setBtnTexture = function (btn, resPath) {
        if (btn && btn instanceof cc.Button && resPath) {
            cc.loader.loadRes(resPath, cc.SpriteFrame, function (error, spriteFrame) {
                if (error) {
                    LogHelper.log("setSpriteFrame Error: " + error);
                }
                else {
                    this.retainImageCache(resPath);
                    if (cc.isValid(btn)) {
                        var frame = spriteFrame;
                        var sprite = btn._sprite;
                        if (frame && sprite) {
                            var transition = btn.transition;
                            if (transition == 2) {
                                btn.normalSprite = frame;
                                btn.pressedSprite = frame;
                                btn.hoverSprite = frame;
                                btn.disabledSprite = frame;
                            }
                            else {
                                sprite.spriteFrame = frame;
                            }
                        }
                    }
                }
            }.bind(this));
        }
    };
    BasicViewCtrl.prototype.setBtnFrameAutoByName = function (btn, frameName) {
        if (btn == null || btn == undefined) {
            return;
        }
        var UIResMap = cc.talefun.UIResMap;
        var resInfo = UIResMap.getResInfo(frameName);
        if (resInfo !== null && resInfo !== undefined) {
            if (resInfo.plistPath) {
                this.setBtnFrame(btn, resInfo.plistPath, frameName);
            }
            else if (resInfo.localPath) {
                this.setBtnTexture(btn, resInfo.localPath);
            }
        }
    };
    BasicViewCtrl = __decorate([
        ccclass
    ], BasicViewCtrl);
    return BasicViewCtrl;
}());
exports.default = BasicViewCtrl;

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
        //# sourceMappingURL=BasicViewCtrl.js.map
        