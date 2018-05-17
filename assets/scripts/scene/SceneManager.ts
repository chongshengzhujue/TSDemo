import ViewManager from "../viewCtrl/ViewManager";

// 场景逻辑类，用于配置场景初始化资源
// 2018.01.10 li.xiao 

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    //用于加载场景初始界面
    @property(cc.Prefab)
    launchView: cc.Prefab = null;
    
    //用于加载场景初始界面
    @property
    launchViewName: string = "";

    //用于加载场景初始背景音乐
    @property(cc.AudioClip)
    defaultClickAudio:cc.url = null;

    //用于网络等待界面
    @property(cc.Prefab)
    netloadingView: cc.Prefab = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () 
    {
        (<any>cc).talefun.ViewManager.showView(this.launchViewName || "LogoView","hello");
        (<any>cc).talefun.AudioManager.setDefaultClickAudio(this.defaultClickAudio);
        (<any>cc).talefun.LogHelper.log("defaut : " + this.defaultClickAudio);
    };
}
