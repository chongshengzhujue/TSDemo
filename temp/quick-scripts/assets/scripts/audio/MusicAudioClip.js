(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/audio/MusicAudioClip.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '84bd55ed0pOH45hsRRdSuhK', 'MusicAudioClip', __filename);
// scripts/audio/MusicAudioClip.ts

Object.defineProperty(exports, "__esModule", { value: true });
// 音乐 挂载组件， 用于定制点击音乐
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MusicAudioClip = /** @class */ (function (_super) {
    __extends(MusicAudioClip, _super);
    function MusicAudioClip() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.audio = null;
        _this.volume = 1;
        _this.isAutoPlay = true;
        return _this;
    }
    MusicAudioClip.prototype.onLoad = function () {
        if (this.audio && this.isAutoPlay) {
            cc.talefun.AudioManager.playMusic(this.audio, true);
        }
    };
    __decorate([
        property(cc.AudioClip)
    ], MusicAudioClip.prototype, "audio", void 0);
    __decorate([
        property
    ], MusicAudioClip.prototype, "volume", void 0);
    __decorate([
        property(Boolean)
    ], MusicAudioClip.prototype, "isAutoPlay", void 0);
    MusicAudioClip = __decorate([
        ccclass
    ], MusicAudioClip);
    return MusicAudioClip;
}(cc.Component));
exports.default = MusicAudioClip;

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
        //# sourceMappingURL=MusicAudioClip.js.map
        