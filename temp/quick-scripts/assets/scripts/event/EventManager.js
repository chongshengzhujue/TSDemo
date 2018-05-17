(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/event/EventManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4d1d8sL0lhGPIUM/phqLH2S', 'EventManager', __filename);
// scripts/event/EventManager.ts

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
var EventManager = /** @class */ (function () {
    function EventManager() {
        this.eventCache = null;
        this.eventCache = {};
    }
    EventManager_1 = EventManager;
    EventManager.getInstance = function () {
        if (EventManager_1._instance == null) {
            EventManager_1._instance = new EventManager_1();
        }
        return EventManager_1._instance;
    };
    EventManager.prototype.addEventListener = function (eventType, callback) {
        if (eventType && callback) {
            var hadSame = false;
            var subCache = this.eventCache[eventType] || [];
            for (var i = 0; i < subCache.length; i++) {
                if (subCache[i] === callback) {
                    hadSame = true;
                    break;
                }
            }
            if (!hadSame) {
                subCache.push(callback);
            }
            this.eventCache[eventType] = subCache;
        }
    };
    EventManager.prototype.removeEventListener = function (eventType, callback) {
        if (eventType && callback) {
            var subCache = this.eventCache[eventType];
            if (subCache) {
                for (var i = 0; i < subCache.length; i++) {
                    if (subCache[i] === callback) {
                        subCache.splice(i, 1);
                        break;
                    }
                }
            }
        }
    };
    EventManager.prototype.dispatchEvent = function (eventType, params) {
        if (eventType) {
            var subCache = this.eventCache[eventType];
            if (subCache) {
                for (var i = 0; i < subCache.length; i++) {
                    var callback = subCache[i];
                    callback(eventType, params);
                }
            }
        }
    };
    EventManager._instance = null;
    EventManager = EventManager_1 = __decorate([
        ccclass
    ], EventManager);
    return EventManager;
    var EventManager_1;
}());
exports.default = EventManager;

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
        //# sourceMappingURL=EventManager.js.map
        