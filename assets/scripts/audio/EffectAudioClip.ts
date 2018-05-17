// 音效 挂载组件， 用于定制点击音效

const {ccclass, property} = cc._decorator;

@ccclass
export default class EffectAudioClip extends cc.Component {

    @property(cc.AudioClip)
    audio: cc.url = null;

    @property
    volume:number = 1;
    // update (dt) {},
}
