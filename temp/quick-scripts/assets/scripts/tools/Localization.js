(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/tools/Localization.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c0f11UrqEVCoq+IIOj8NeQt', 'Localization', __filename);
// scripts/tools/Localization.ts

Object.defineProperty(exports, "__esModule", { value: true });
var LogHelper_1 = require("./LogHelper");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Localization = /** @class */ (function () {
    function Localization() {
    }
    Localization_1 = Localization;
    Localization.initLangCache = function (cacheStr) {
        if (Localization_1.langCache == null && cacheStr !== null && cacheStr !== undefined) {
            LogHelper_1.default.log("cacheStr : " + cacheStr);
            Localization_1.langCache = JSON.parse(cacheStr);
        }
    };
    Localization.setLanguage = function (lang) {
        if (lang !== null && lang !== "") {
            Localization_1.language = lang;
        }
    };
    Localization.getLanguage = function () {
        return Localization_1.language;
    };
    Localization.localizationString = function (key) {
        if (Localization_1.langCache == null) {
            return key;
        }
        var subLangCache = Localization_1.langCache[key];
        if (subLangCache !== null && subLangCache !== undefined) {
            return subLangCache[Localization_1.language] || subLangCache["en"];
        }
        return key;
    };
    Localization.setLabelText = function (label, key, pramas) {
        if (label != null && key) {
            var localStr = Localization_1.localizationString(key);
            if (pramas) {
                var len = pramas.length;
                for (var i = 0; i < len; i++) {
                    localStr = localStr.replace(/{#\d}/, pramas[i]);
                }
            }
            label.string = localStr;
        }
    };
    Localization.language = "en";
    Localization.langCache = null;
    Localization = Localization_1 = __decorate([
        ccclass
    ], Localization);
    return Localization;
    var Localization_1;
}());
exports.default = Localization;

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
        //# sourceMappingURL=Localization.js.map
        