"use strict";
cc._RF.push(module, 'c97efN+3HhNAYFcRNEQFfQM', 'BasicVO');
// scripts/object/vo/BasicVO.ts

// BasicVO 缓存数据基类,单条目信息
// 2018.01.10 li.xiao
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BasicVO = /** @class */ (function () {
    function BasicVO() {
    }
    //解析单条数据
    BasicVO.prototype.parseData = function (data) {
        if (data) {
            for (var key in data) {
                if (this[key] !== null) {
                    this[key] = data[key];
                }
            }
        }
    };
    BasicVO.prototype.parseDataFromStr = function (str) {
        if (str) {
            var data = JSON.parse(str);
            this.parseData(data);
        }
    };
    BasicVO.prototype.setProperty = function (key, value) {
        if (this[key] !== null && value && typeof (this[key]) == typeof (value)) {
            this[key] = value;
        }
    };
    BasicVO.prototype.getProperty = function (key) {
        return this[key];
    };
    BasicVO.prototype.setProperties = function (data) {
        if (data) {
            for (var key in data) {
                this.setProperty(key, data[key]);
            }
        }
    };
    BasicVO.prototype.getFormatStr = function () {
        return JSON.stringify(this);
    };
    BasicVO = __decorate([
        ccclass
    ], BasicVO);
    return BasicVO;
}());
exports.default = BasicVO;

cc._RF.pop();