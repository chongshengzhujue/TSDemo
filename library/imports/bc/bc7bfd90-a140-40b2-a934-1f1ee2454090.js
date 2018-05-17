"use strict";
cc._RF.push(module, 'bc7bf2QoUBAsqk0Hx7iRUCQ', 'Tools');
// scripts/tools/Tools.ts

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
var md5Encode = require("./myMD5");
var Tools = /** @class */ (function () {
    function Tools() {
    }
    //将字符串转换为十六进制
    Tools.stringToHex = function (str) {
        var val = "";
        for (var i = 0; i < str.length; i++) {
            if (val == "")
                val = str.charCodeAt(i).toString(16);
            else
                val += str.charCodeAt(i).toString(16);
        }
        val += "0a";
        return val;
    };
    //将十六进制转换为字符串
    Tools.hexToString = function (hex) {
        var arr = hex.split("");
        var out = "";
        for (var i = 0; i < arr.length / 2; i++) {
            var tmp = "0x" + arr[i * 2] + arr[i * 2 + 1];
            var charValue = String.fromCharCode(parseInt(tmp));
            out += charValue;
        }
        return out;
    };
    Tools.md5Encode = function (str) {
        return md5Encode(str);
    };
    Tools = __decorate([
        ccclass
    ], Tools);
    return Tools;
}());
exports.default = Tools;

cc._RF.pop();