(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/audio/EffectAudioClip.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '09ba8OYRpNMhoiP7UBRvrgg', 'EffectAudioClip', __filename);
// scripts/audio/EffectAudioClip.ts

// 音效 挂载组件， 用于定制点击音效
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var EffectAudioClip = /** @class */ (function (_super) {
    __extends(EffectAudioClip, _super);
    function EffectAudioClip() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.audio = null;
        _this.volume = 1;
        return _this;
        // update (dt) {},
    }
    __decorate([
        property(cc.AudioClip)
    ], EffectAudioClip.prototype, "audio", void 0);
    __decorate([
        property
    ], EffectAudioClip.prototype, "volume", void 0);
    EffectAudioClip = __decorate([
        ccclass
    ], EffectAudioClip);
    return EffectAudioClip;
}(cc.Component));
exports.default = EffectAudioClip;

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
        //# sourceMappingURL=EffectAudioClip.js.map
        