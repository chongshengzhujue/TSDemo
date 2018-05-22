// 游戏初始化 所有单例管理类的实例委托到 cc.talefun,调用时(<any>cc).talefun.sigleton.method
//也可以 模块开始位置定义 let talefun = (<any>cc).talefun; 方法中调用 talefun.singleton.method （推荐）
//或 模块开始位置定义 let sigleton = (<any>cc).talefun.singleton; 方法中调用 singleton.method (注意：当模块加载顺序有变化，可能造成访问变量singleton为undefined)
// 生成全局变量防止引用模块时，造成循环引用，避免循环引用的另一种方法是 事件注册和分发
// 2018.01.09 li.xiao

// (function() {
//     let wx = window["wx"];
//     if (wx != undefined && wx != null) {
//         wx.onShow(function() {
//             cc.log("=======================on show wx");
//         });
//         cc.log("=======================on show function 1");
//     }
//     cc.log("=======================on show function 2");
// })();

(<any>cc).talefun = {};

//初始化 LogHelper,用于控制日志输出
import LogHelper from "./tools/LogHelper";
(<any>cc).talefun.LogHelper =  LogHelper;

//初始化 本地化 文件
import langStr from "./template/Lang";
import Localization from "./tools/Localization";
Localization.initLangCache(langStr);
(<any>cc).talefun.Localization =  Localization;

//初始化 UIResMap,用于自动加载纹理
import UIResMap from "./template/UIResMap";
UIResMap.initUIResMap();
(<any>cc).talefun.UIResMap =  UIResMap;

//初始化SDKManager，用于对接不同平台接口
import SDKManager from "./platform/SDKManager";
(<any>cc).talefun.SDKManager =  SDKManager.getInstance();

//初始化 EventManager,用于用户事件管理
import EventManager from "./event/EventManager";
(<any>cc).talefun.EventManager = EventManager.getInstance();

import EventType from "./event/EventType";
(<any>cc).talefun.EventType =  EventType;

//初始化 AudioManager，用于音效管理
import AudioManager from "./audio/AudioManager";
(<any>cc).talefun.AudioManager =  AudioManager.getInstance();

//初始化 TemplateManager，用于静态文件加载管理
import TemplateManager from "./template/TemplateManager";
(<any>cc).talefun.TemplateManager =  TemplateManager.getInstance();

//初始化 缓存数据，用于动态数据加载管理
import ObjectManager from "./object/ObjectManager";
(<any>cc).talefun.ObjectManager =  ObjectManager.getInstance();

//初始化 ViewManager，用于ui管理
import ViewManager from "./viewCtrl/ViewManager";
(<any>cc).talefun.ViewManager =  ViewManager.getInstance();

//初始化 NetworkManager，用于ui管理
import NetworkManager from "./network/NetworkManager";
(<any>cc).talefun.NetworkManager =  NetworkManager.getInstance();

const {ccclass, property} = cc._decorator;


@ccclass
export default class GameInit extends cc.Component {

    designWidth:number = 640;
    designHeight:number = 1136;

    designScreenWidth:number = 640;
    designScreenHeight:number = 1136;

    designScale = 1;

    _thisOnResized:any = null; 

    onLoad () {
        // console.log(`talefun debug ${talefun.debug}`);
        // console.log(this.name);
        this.fixDesignSolution();

        // this.rigisterSizeChangeEvent();

        (<any>cc).talefun.LogHelper.log(`event type : ${(<any>cc).talefun.EventType.EVENT_USER_TEST}`);

        (<any>cc).talefun.ObjectManager.initModelData();
        (<any>cc).talefun.NetworkManager.initNetwork();
        cc.director.getPhysicsManager().enabled = true;
        // cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
        // cc.PhysicsManager.DrawBits.e_pairBit |
        // cc.PhysicsManager.DrawBits.e_centerOfMassBit |
        // cc.PhysicsManager.DrawBits.e_jointBit |
        // cc.PhysicsManager.DrawBits.e_shapeBit
        ;
        cc.director.getPhysicsManager().gravity = cc.v2(0, -300);

        var promise1 = new Promise(function(resolve, reject) {
            setTimeout(resolve, 100, 'foo');
        });
    }

    fixDesignSolution()
    {
        let frameSize = (<any>cc.view).getCanvasSize()
        let policy, e = cc.ResolutionPolicy;
        policy = e.FIXED_HEIGHT;

        let designRes = cc.size(this.designWidth,this.designHeight);
 
        let w = frameSize.width, h = frameSize.height;
        let scaleX = w / designRes.width, scaleY = h / designRes.height;
        scaleX < scaleY ? (designRes.width = designRes.width, designRes.height = Math.ceil(h / scaleX) ) : (designRes.width = Math.ceil(w / scaleY) , designRes.height = designRes.height);

        this.designScreenWidth = designRes.width;
        this.designScreenHeight = designRes.height;

        this.designScale = this.designScreenWidth/this.designWidth > this.designScreenHeight/this.designHeight ? this.designScreenWidth/this.designWidth : this.designScreenHeight/this.designHeight

        cc.view.setDesignResolutionSize(designRes.width, designRes.height, policy)


        let talefun = (<any>cc).talefun;
        talefun.designWidth = this.designWidth;
        talefun.designHeight = this.designHeight;
        talefun.designScreenWidth = this.designScreenWidth;
        talefun.designScreenHeight = this.designScreenHeight;
        talefun.designScale = this.designScale;

        // LogHelper.dump(talefun);

    }

    rigisterSizeChangeEvent()
    {
        // if (CC_JSB) {
        //     this._thisOnResized = cc.EventListener.create({
        //         event: (<any>cc.EventListener).CUSTOM,
        //         eventName: "window-resize",
        //         callback: this.onResized.bind(this)
        //     });

        //     this._thisOnResized.retain();
        // }
        // else {
        //     this._thisOnResized = this.onResized.bind(this);
        // }

        // if (CC_EDITOR) {
        //     (<any>cc).engine.on('design-resolution-changed', this._thisOnResized);
        // }
        // else if (!CC_JSB) {
        //     if (cc.sys.isMobile) {
        //         window.addEventListener('resize', this._thisOnResized);
        //     }
        //     else {
        //         (<any>cc.eventManager).addCustomListener('canvas-resize', this._thisOnResized);
        //     }
        // }
        // else {
        //     cc.eventManager.addListener(this._thisOnResized, 1);
        // }
    }

    onResized()
    {
        // LogHelper.log("onResized");
    }

    onDestroy() 
    {
        // if(this._thisOnResized == null)
        // {
        //     return;
        // }
        // if (CC_EDITOR) {
        //     (<any>cc).engine.off('design-resolution-changed', this._thisOnResized);
        // }
        // else if (!CC_JSB) {
        //     if (cc.sys.isMobile) {
        //         window.removeEventListener('resize', this._thisOnResized);
        //     }
        //     else {
        //         (<any>cc.eventManager).removeCustomListeners('canvas-resize', this._thisOnResized);
        //     }
        // }
        // else {
        //     cc.eventManager.removeListener(this._thisOnResized);
        //     this._thisOnResized.release();
        // }
    }
    // update (dt) {},
}
