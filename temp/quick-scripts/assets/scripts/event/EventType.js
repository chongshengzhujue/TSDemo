(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/event/EventType.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b8a8aKGWIFIIqj2aecDOASL', 'EventType', __filename);
// scripts/event/EventType.ts

//事件类型，用于记录和分发事件
//2018.01.10 li.xiao
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var EventType;
(function (EventType) {
    EventType[EventType["EVENT_USER_TEST"] = 0] = "EVENT_USER_TEST";
    EventType[EventType["NETWORK_BEGIN"] = 1] = "NETWORK_BEGIN";
    EventType[EventType["NETWORK_COMPLETE"] = 2] = "NETWORK_COMPLETE";
})(EventType || (EventType = {}));
exports.default = EventType;

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
        //# sourceMappingURL=EventType.js.map
        