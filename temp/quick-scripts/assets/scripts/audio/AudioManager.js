(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/audio/AudioManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '59b59fHlflJ/6JgVpgWysK2', 'AudioManager', __filename);
// scripts/audio/AudioManager.ts

//音效管理类 
//2018.01.10 li.xiao
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AudioManager = /** @class */ (function () {
    function AudioManager() {
        this.defaultClickAudio = null;
        this.volume = 1;
        this.isEffectActive = true;
        this.isMusicActive = true;
        this.audioEngine = null;
        this.curMusicId = null;
        this.curMusicPath = null;
        this.audioEngine = cc.audioEngine;
        this.curMusicId = null;
        this.curMusicPath = null;
    }
    AudioManager_1 = AudioManager;
    AudioManager.getInstance = function () {
        if (AudioManager_1._instance == null) {
            AudioManager_1._instance = new AudioManager_1();
        }
        return AudioManager_1._instance;
    };
    // 用来初始化音效配置
    AudioManager.prototype.initAudioSetting = function () {
    };
    AudioManager.prototype.setVolume = function (volume) {
        this.volume = volume;
    };
    AudioManager.prototype.setDefaultClickAudio = function (audio) {
        if (audio) {
            this.defaultClickAudio = audio;
        }
    };
    AudioManager.prototype.playDefaultClickAudio = function () {
        if (this.defaultClickAudio && this.audioEngine && this.isEffectActive) {
            return this.audioEngine.play(this.defaultClickAudio, false, 0.5);
        }
    };
    AudioManager.prototype.playEffect = function (audioClip, isLoop) {
        if (this.audioEngine && audioClip && this.isEffectActive) {
            return this.audioEngine.play(audioClip, isLoop, 0.5);
        }
    };
    AudioManager.prototype.playBtnEffect = function (target) {
        if (target) {
            var audioComp = target.getComponent("EffectAudioClip");
            if (audioComp && audioComp.audio) {
                this.playEffect(audioComp.audio, false);
            }
            else {
                this.playDefaultClickAudio();
            }
        }
    };
    AudioManager.prototype.playMusic = function (audioClip, isLoop, callback) {
        if (this.audioEngine && audioClip && audioClip !== this.curMusicPath) {
            if (this.curMusicId) {
                this.audioEngine.stop(this.curMusicId);
                this.audioEngine.uncache(this.curMusicPath);
                this.curMusicId = null;
            }
            if (this.isMusicActive) {
                this.curMusicId = this.audioEngine.play(audioClip, isLoop, this.volume);
                return this.curMusicId;
            }
        }
    };
    AudioManager.prototype.onEffectSwith = function (isActive) {
        if (this.isEffectActive == isActive) {
            ;
        }
        else {
            this.isEffectActive = isActive;
        }
    };
    AudioManager.prototype.onMusicSwith = function (isActive) {
        if (this.isMusicActive == isActive) {
            ;
        }
        else {
            this.isMusicActive = isActive;
            if (this.isMusicActive) {
                this.playMusic(this.curMusicPath, true, this.volume);
            }
            else {
                this.stop(this.curMusicId);
            }
        }
    };
    AudioManager.prototype.stop = function (audioId) {
        if (audioId && this.audioEngine) {
            this.audioEngine.stop(audioId);
        }
    };
    AudioManager.prototype.stopAll = function () {
        if (this.audioEngine) {
            this.audioEngine.stopAll();
        }
    };
    AudioManager._instance = null;
    AudioManager = AudioManager_1 = __decorate([
        ccclass
    ], AudioManager);
    return AudioManager;
    var AudioManager_1;
}());
exports.default = AudioManager;

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
        //# sourceMappingURL=AudioManager.js.map
        