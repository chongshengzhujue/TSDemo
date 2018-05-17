//音效管理类 
//2018.01.10 li.xiao

const {ccclass, property} = cc._decorator;

@ccclass
export default class AudioManager {

    static _instance:AudioManager = null; 

    defaultClickAudio:cc.url = null;

    volume: number = 1;

    isEffectActive:boolean = true;
    isMusicActive:boolean = true;

    audioEngine:any = null;

    curMusicId:any = null;
    curMusicPath:any = null;

    static getInstance():AudioManager
    {
        if(AudioManager._instance == null)
        {
            AudioManager._instance = new AudioManager();
        }
        return AudioManager._instance;
    }

    constructor()
    {
        this.audioEngine = cc.audioEngine;
        this.curMusicId = null;
        this.curMusicPath = null;
    }

    // 用来初始化音效配置
    initAudioSetting()
    {

    }

    setVolume(volume:number)
    {
        this.volume = volume;
    }

    setDefaultClickAudio(audio:cc.url)
    {
        if (audio)
        {
            this.defaultClickAudio = audio;
        }
    }

    playDefaultClickAudio()
    {
        if(this.defaultClickAudio && this.audioEngine && this.isEffectActive)
        {
            return this.audioEngine.play(this.defaultClickAudio , false, 0.5);
        }
    }

    playEffect(audioClip:cc.url,isLoop:boolean)
    {
        if (this.audioEngine && audioClip && this.isEffectActive)
        {
            return this.audioEngine.play(audioClip , isLoop, 0.5);
        }
    }

    playBtnEffect(target:cc.Node)
    {
        if(target)
        {
            var audioComp = target.getComponent("EffectAudioClip");
            if (audioComp && audioComp.audio )
            {
                this.playEffect(audioComp.audio,false);
            }
            else
            {
                this.playDefaultClickAudio();
            }
        }
    }

    playMusic(audioClip:cc.url,isLoop:boolean,callback:any)
    {
        if (this.audioEngine && audioClip && audioClip !== this.curMusicPath )
        {
            if(this.curMusicId)
            {
                this.audioEngine.stop(this.curMusicId);
                this.audioEngine.uncache(this.curMusicPath);
                this.curMusicId = null;
            }
            if (this.isMusicActive)
            {
                this.curMusicId = this.audioEngine.play(audioClip , isLoop, this.volume);
                return this.curMusicId;
            }   
        }
    }

    onEffectSwith(isActive:boolean)
    {
        if (this.isEffectActive == isActive)
        {
            ;
        }
        else
        {
            this.isEffectActive = isActive
        }
    }

    onMusicSwith(isActive:boolean)
    {
        if (this.isMusicActive == isActive)
        {
            ;
        }
        else
        {
            this.isMusicActive = isActive
            if(this.isMusicActive)
            {
                this.playMusic(this.curMusicPath,true,this.volume);
            }
            else
            {
                this.stop(this.curMusicId);
            }
        }
    }

    stop(audioId:any)
    {
        if (audioId && this.audioEngine)
        {
            this.audioEngine.stop(audioId);
        }
    }

    stopAll()
    {
        if (this.audioEngine)
        {
            this.audioEngine.stopAll();
        }
    }

    // update (dt) {},
}
