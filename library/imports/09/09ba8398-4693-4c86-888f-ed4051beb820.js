"use strict";
cc._RF.push(module, '09ba8OYRpNMhoiP7UBRvrgg', 'EffectAudioClip');
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