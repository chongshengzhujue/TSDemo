"use strict";
cc._RF.push(module, 'b8a8aKGWIFIIqj2aecDOASL', 'EventType');
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