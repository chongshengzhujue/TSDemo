import LogHelper from "../tools/LogHelper";

// 音乐 挂载组件， 用于定制点击音乐

const {ccclass, property} = cc._decorator;

@ccclass
export default class MusicAudioClip extends cc.Component {

    @property(cc.AudioClip)
    audio: cc.url = null;

    @property
    volume: number = 1;

    @property(Boolean)
    isAutoPlay: boolean = true;

    onLoad()
    {
        if (this.audio && this.isAutoPlay)
        {
            (<any>cc).talefun.AudioManager.playMusic(this.audio,true);
        }
    }
}
