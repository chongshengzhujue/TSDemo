// viewCtrl 基类 ,用于托管view，资源释放管理，
// 2018.01.09 li.xiao

import UserComponent from "./UserComponent";

let eventManager = (<any>cc).talefun.EventManager;
let LogHelper = (<any>cc).talefun.LogHelper;

const {ccclass, property} = cc._decorator;

@ccclass
export default class BasicViewCtrl {

    prefabName: string = "";
    rootView: cc.Node = null;
    isOpen: boolean = false;
    isInViewStack: boolean = false;
    logicComponent: UserComponent = null;
    parentNode: cc.Node = null;
    parentViewCtrl: BasicViewCtrl = null;
    subViewCtrlList: BasicViewCtrl[] = [];
    resCache: {deps:any[],imageCache:any[]} = {deps:[],imageCache:[]};
    data:any = null;
    eventCache:any[] = [];

    openView(prefab:cc.Prefab,data:any,parentNode:cc.Node,parentViewCtrl:BasicViewCtrl)
   {
       this.data = data;
       LogHelper.log("openView : " + data);
       if(!this.isOpen)
       {
            this.rootView = cc.instantiate(prefab)
            this.rootView["viewCtrl"] = this;
            this.logicComponent = this.rootView.getComponent(this.prefabName + "Logic");

            if (parentNode && parentViewCtrl)
            {
                parentNode.addChild(this.rootView);
                parentViewCtrl.addSubViewCtrl(this);
                this.parentViewCtrl = parentViewCtrl;
            }
            else
            {
                cc.director.getScene().addChild(this.rootView);
                (<any>cc).talefun.ViewManager.pushView(this);
                this.isInViewStack = true; 
            }
        
            if(this.logicComponent && this.logicComponent.onEnter)
            {
                this.logicComponent.onEnter();
            }

            this.isOpen = true;
       }  
       return this;
   }

   closeView()
   {
       //clear subViewCtrlList
       var subLen = this.subViewCtrlList.length;
       for(var i = 0 ; i < subLen; i++)
       {
            this.subViewCtrlList[i].closeView();
       }
       this.subViewCtrlList.splice(0,subLen);


        if (this.rootView && this.rootView instanceof cc.Node)
        {

            //移除事件
            this.removeAllEventListeners();

            if(this.logicComponent && this.logicComponent.onExit)
            {
                this.logicComponent.onExit();
            }

            if (this.parentViewCtrl)
            {
                this.parentViewCtrl.removeSubViewCtrl(this);
                this.parentViewCtrl = null;
            }

            this.rootView.removeFromParent();
            this.rootView.destroy();
            this.rootView = null;
            this.logicComponent = null;
          
        } 
        this.isOpen = false;
        if (this.isInViewStack)
        {
            //当界面类型为View时 关闭界面时释放依赖缓存
            (<any>cc).talefun.ViewManager.releaseDeps(this.resCache.deps);
            //当界面类型为View时 关闭界面时释放动态image缓存
            (<any>cc).talefun.ViewManager.releaseImageCache(this.resCache.imageCache);

            (<any>cc).talefun.ViewManager.popView(this);
        }
       
   }

   addSubViewCtrl(viewCtrl:BasicViewCtrl)
   {
        if (viewCtrl && this.subViewCtrlList.indexOf(viewCtrl) == -1)
        {
            this.subViewCtrlList.push(viewCtrl);
        }
   }

   removeSubViewCtrl(viewCtrl:BasicViewCtrl)
   {
       if (viewCtrl)
       {
            var index = this.subViewCtrlList.indexOf(viewCtrl);
            if (index !== -1)
            {
                this.subViewCtrlList.splice(index,1);
            }
       }  
   }

   isFullScene()
    {
        if(this.rootView && this.logicComponent)
        {
            LogHelper.log("isFullScene : " + this.logicComponent.isFullScene);
            return this.logicComponent.isFullScene;
        }
        else
        {
            return false;
        }
    }

    setVisible(isVisible:boolean)
    {
        if (this.rootView)
        {
            this.rootView.active = isVisible;
        }
    }

    addEventListener(eventType:number,callback:any)
    {
        if (!this.eventCache)
        {
            this.eventCache = [];
        }

        if (eventType && callback)
        {
            var subCache = {eventType : eventType, callback : callback};
            this.eventCache.push(subCache);

            if (eventManager)
            {
                eventManager.addEventListener(eventType,callback);
            }
        }
    }

    dispatchEvent(eventType:number,params:any)
    {
        if(eventManager)
        {
            eventManager.dispatchEvent(eventType,params);
        }
    }

    removeEventListener(eventType:number,callback:any)
    {
        if (eventType && callback)
        {
            if (eventManager)
            {
                eventManager.removeEventListener(eventType,callback);
            }
        }
    }

    removeAllEventListeners()
    {
        if (this.eventCache)
        {
            for(var i = 0 ; i < this.eventCache.length; i++)
            {
                var subCache = this.eventCache[i];
                eventManager.removeEventListener(subCache.eventType,subCache.callback);
                delete subCache.eventType;
                delete subCache.callback;
            }
            this.eventCache.splice(i,this.eventCache.length);
        }
    }

    retainImageCache(imagePath:any)
    {
        if (imagePath)
        {
            var index = this.resCache.imageCache.indexOf(imagePath);
            if (index == -1)
            {
                this.resCache.imageCache.push(imagePath);
                (<any>cc).talefun.ViewManager.retainImageCache(imagePath);
            }
        }
    }

    releaseImageCacheInOrder(order:any)
    {
        if (order)
        {
            if (order instanceof Array)
            {
                var len = order.length;
                for(var i = 0; i < len; i++)
                {
                    var subPath = order[i];
                    this.releaseImageCacheInOrder(subPath);
                }
            }
            else
            {
                var index = this.resCache.imageCache.indexOf(order);
                if (index !== -1)
                {
                    this.resCache.imageCache.splice(index,1);
                    (<any>cc).talefun.ViewManager.releaseImageCache(order);
                }
            }
        }
    }

    setSpriteFrame(sprite:cc.Sprite,resPath:string,frameName:string)
    {
        if(sprite && sprite instanceof cc.Sprite && resPath && frameName)
        {
            cc.loader.loadRes(resPath,(<any>cc).SpriteAtlas,function(error,atlas){
                if(error)
                {
                    LogHelper.log("setSpriteFrame Error: " + error);
                }
                else
                {
                    this.retainImageCache(resPath);

                    if(cc.isValid(sprite))
                    {
                        var frame = atlas.getSpriteFrame(frameName);
                        if (frame)
                        {
                            sprite.spriteFrame = frame; 
                        }
                    }
                }
            }.bind(this))
        }
    }

    setSpriteTexture(sprite:cc.Sprite,resPath:string)
    {
        if(sprite && sprite instanceof cc.Sprite && resPath)
        {
            cc.loader.loadRes(resPath,cc.SpriteFrame,function(error,spriteFrame){
                if(error)
                {
                    LogHelper.log("setSpriteFrame Error: " + error);
                }
                else
                {
                    this.retainImageCache(resPath);
                    if(cc.isValid(sprite))
                    {
                        sprite.spriteFrame = spriteFrame; 
                    }
                }
            }.bind(this))
        }
    }

    setSpriteAutoByName(sprite:cc.Sprite,frameName:string)
    {
        if(sprite == null || sprite == undefined)
        {
            return;
        }
        let UIResMap = (<any>cc).talefun.UIResMap;
        let resInfo = UIResMap.getResInfo(frameName);
        if(resInfo !== null && resInfo !== undefined)
        {
            if(resInfo.plistPath)
            {
                this.setSpriteFrame(sprite,resInfo.plistPath,frameName);
            }
            else if(resInfo.localPath)
            {
                this.setSpriteTexture(sprite,resInfo.localPath);
            }
        }
    }

    setBtnFrame(btn:cc.Button,resPath:string,frameName:string)
    {
        if(btn && btn instanceof cc.Button && resPath && frameName)
        {
            cc.loader.loadRes(resPath,(<any>cc).SpriteAtlas,function(error,atlas){
                if(error)
                {
                    LogHelper.log("setSpriteFrame Error: " + error);
                }
                else
                {
                    this.retainImageCache(resPath);
                    if(cc.isValid(btn))
                    {
                        var frame = atlas.getSpriteFrame(frameName);
                        var sprite = (<any>btn)._sprite;
                        if (frame && sprite)
                        {
                            var transition = btn.transition
                            if (transition == 2)  //sprite
                            {
                                btn.normalSprite = frame;
                                btn.pressedSprite = frame;
                                btn.hoverSprite = frame;
                                btn.disabledSprite = frame;
                            }
                            else
                            {
                                sprite.spriteFrame = frame; 
                            }
                            
                        }
                    }
                }
            }.bind(this))
        }
    }

    setBtnTexture(btn:cc.Button, resPath: string)
    {
        if(btn && btn instanceof cc.Button && resPath)
        {
            cc.loader.loadRes(resPath,cc.SpriteFrame,function(error,spriteFrame){
                if(error)
                {
                    LogHelper.log("setSpriteFrame Error: " + error);
                }
                else
                {
                    this.retainImageCache(resPath);
                    if(cc.isValid(btn))
                    {
                        var frame = spriteFrame;
                        var sprite = (<any>btn)._sprite;
                        if (frame && sprite)
                        {
                            var transition = btn.transition
                            if (transition == 2)  //sprite
                            {
                                btn.normalSprite = frame;
                                btn.pressedSprite = frame;
                                btn.hoverSprite = frame;
                                btn.disabledSprite = frame;
                            }
                            else
                            {
                                sprite.spriteFrame = frame; 
                            }
                            
                        } 
                    }
                }
            }.bind(this))
        }
    }

    setBtnFrameAutoByName(btn:cc.Button,frameName:string)
    {
        if(btn == null || btn == undefined)
        {
            return;
        }
        let UIResMap = (<any>cc).talefun.UIResMap;
        let resInfo = UIResMap.getResInfo(frameName);
        if(resInfo !== null && resInfo !== undefined)
        {
            if(resInfo.plistPath)
            {
                this.setBtnFrame(btn,resInfo.plistPath,frameName);
            }
            else if(resInfo.localPath)
            {
                this.setBtnTexture(btn,resInfo.localPath);
            }
        }
    }
}
