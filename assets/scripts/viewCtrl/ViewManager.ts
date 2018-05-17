// ViewManager ，用于管理View 打开和关闭，资源释放管理
//2018.01.10 li.xiao

import BasicViewCtrl from "./Base/BasicViewCtrl";

let talefun = (<any>cc).talefun;


const {ccclass, property} = cc._decorator;

@ccclass
export default class ViewManager {
    __instanceId:any = null;
    viewStack = [];
    resCache:{deps:{},imageCache:{}} = {deps:{},imageCache:{}};  
    clearUnusedResCallBack:any = null;
    static _instance:ViewManager = null;

    private constructor(){
        this.__instanceId = (<any>cc).ClassManager.getNewInstanceId();
    }

    showView(viewName:string,data:any,ViewClass:any){

        if(viewName &&  typeof(viewName) == "string" )
        {
            talefun.LogHelper.log("load view" + viewName);
            
            cc.loader.loadRes("prefab/view/" + viewName,function(error,prefab)
            {
                
                if (!error)
                {
                    // talefun.LogHelper.log("******load ******" + error);
                    // var ViewCtrl = require(ViewClass);
                    let viewCtrl = null;
                    if (ViewClass && typeof(ViewClass) == "string")
                    {
                        // var ViewCtrl = require(ViewClass);
                        // viewCtrl = new ViewCtrl();
                    }
                    else
                    {
                        viewCtrl = new BasicViewCtrl();
                    }
                    
                    viewCtrl.prefabName = viewName;
                    viewCtrl.openView(prefab,data);
                    
                    //增加View 依赖缓存
                    let deps = cc.loader.getDependsRecursively('prefab/view/' + viewName);
                    viewCtrl.resCache.deps = deps;
                    this.retainDeps(deps);
                    // var uuid = cc.loader._getResUuid('ui/' + "atlas",cc.Texture2D);
                    // var uuids = cc.loader._resources.getUuidArray('ui/' + "atlas",cc.SpriteFrame)
                    // for(var key in uuids)
                    // {
                    //     talefun.LogHelper.log("uuids key : " + key + " value : " + uuids[key] + " referKey : " + cc.loader._getReferenceKey(uuids[key]));
                    // }
                    // talefun.LogHelper.log("uuid : " + uuid + " referKey : " + cc.loader._getReferenceKey(uuid));
                    // for(var key in deps)
                    // {
                    //     talefun.LogHelper.log("key : " + key + ", value : " + deps[key] + " referKey : " + cc.loader._getReferenceKey(deps[key]));
                    // }

                    // talefun.LogHelper.log("cache info")
                    // for(var key in cc.loader._cache)
                    // {
                    //     talefun.LogHelper.log("cache key : " + key);
                    // }
                }
                else
                {
                    talefun.LogHelper.log("************" + error);
                }
            }.bind(this))
        }
    }

    showPrefab(prefabName:string,prefab:cc.Prefab,data:any,parent:cc.Node,parentViewCtrl:BasicViewCtrl)
    {
        talefun.LogHelper.log("showPrefabPreLoad" + parentViewCtrl);
        if (prefabName && prefab && parent && parentViewCtrl)
        {
            talefun.LogHelper.log("showPrefab")
            let viewCtrl = null;
            // let ViewClass = ViewClass;
            if (null)//(ViewClass && typeof(ViewClass) == "string")
            {
                // var ViewCtrl = require(ViewClass);
                // viewCtrl = new ViewCtrl();
            }
            else
            {
                viewCtrl = new BasicViewCtrl();
            }
            
            viewCtrl.prefabName = prefabName;
            return viewCtrl.openView(prefab,data,parent,parentViewCtrl);
        }
    }

    pushView(viewCtrl:BasicViewCtrl)
    {
        if (viewCtrl && viewCtrl instanceof BasicViewCtrl)
        {
            talefun.LogHelper.log("****** push view *********  " + viewCtrl.prefabName)
            this.viewStack.push(viewCtrl);

            if ((<any>viewCtrl).isFullScene())
            {
                talefun.LogHelper.log("stack length :" + this.viewStack.length);
                if (this.viewStack.length == 1)
                {
                    viewCtrl.setVisible(true);
                    return;
                }
                for(let i = this.viewStack.length -2;i >=0;i--)
                {
                    let tempCtrl = this.viewStack[i];
                    tempCtrl.setVisible(false);
                }
            }
        }
    }

    popView(viewCtrl:BasicViewCtrl)
    {
        if (viewCtrl && viewCtrl instanceof BasicViewCtrl)
        {
            talefun.LogHelper.log("****** pop view *********  " + viewCtrl.prefabName)

            for(let i = this.viewStack.length -1;i >=0;i--)
            {
                if(this.viewStack[i] == viewCtrl)
                {
                    this.viewStack.splice(i,1);
                    talefun.LogHelper.log("pop View : " + viewCtrl.prefabName)
                    break;
                }
            }

            for(let i = this.viewStack.length -1;i >=0;i--)
            {
                let tempCtrl = this.viewStack[i];
                tempCtrl.setVisible(true);
                if (tempCtrl.isFullScene())
                {
                    break;
                }
            }

            this.clearUnusedResCallBack = function()
            {
                this.clearUnusedRes();
                cc.director.getScheduler().unschedule(this.clearUnusedResCallBack,this);
                this.clearUnusedResCallBack = null;
            }

            cc.director.getScheduler().schedule(this.clearUnusedResCallBack, this, 0, 0, 1, false);

        }   
    }
    
    retainDeps(deps:any)
    {
        if (deps && deps instanceof Array)
        {
            let len = deps.length;
            let depsCache = this.resCache.deps;
            for(var i = 0; i < len; i++)
            {
                if(depsCache[deps[i]])
                {
                    depsCache[deps[i]] = depsCache[deps[i]] + 1;
                }
                else
                {
                    depsCache[deps[i]] = 1;
                }
                talefun.LogHelper.log("retainDeps : " +  deps[i]);
            }
        }
    }

    releaseDeps(deps:any)
    {
        if (deps && deps instanceof Array)
        {
            let len = deps.length;
            let depsCache = this.resCache.deps;
            for(let i = 0; i < len; i++)
            {
                if(depsCache[deps[i]] && depsCache[deps[i]] > 0)
                {
                    depsCache[deps[i]] = depsCache[deps[i]] - 1;
                }
                else
                {
                    depsCache[deps[i]] = 0;
                }
                talefun.LogHelper.log("releaseDeps : " +  deps[i]);
            }
        }
    }

    retainImageCache(imagePath : any)
    {
        if (imagePath)
        {
            let imageCache = this.resCache.imageCache;
            if (imagePath instanceof Array)
            {
                let len = imagePath.length;
                for(let i = 0; i < len; i++)
                {
                    let subPath = imagePath[i];
                    this.retainImageCache(subPath);
                }
            }
            else
            {
                if (imageCache[imagePath])
                {
                    imageCache[imagePath] = imageCache[imagePath] + 1;
                }
                else
                {
                    imageCache[imagePath] = 1;
                }
                talefun.LogHelper.log("retainImageCache : " +  imagePath);
            }
        }
    }

    releaseImageCache(imagePath:any)
    {
        if (imagePath)
        {
            let imageCache = this.resCache.imageCache;
            if (imagePath instanceof Array)
            {
                let len = imagePath.length;
                for(let i = 0; i < len; i++)
                {
                    let subPath = imagePath[i];
                    this.releaseImageCache(subPath);
                }
            }
            else
            {
                if (imageCache[imagePath] && imageCache[imagePath] > 0)
                {
                    imageCache[imagePath] = imageCache[imagePath] - 1;
                }
                else
                {
                    imageCache[imagePath] = 0;
                }
                talefun.LogHelper.log("releaseImageCache : " +  imagePath);
            }
        }
    }

    clearUnusedRes()
    {
        talefun.LogHelper.log("******* clearUnusedRes ********")
        let depsCache = this.resCache.deps;
        let imageCache = this.resCache.imageCache;

        //清理View依赖资源
        let tempDepsKeyList = [];
        for(let key in depsCache)
        {
            if (depsCache[key] == 0)
            {
                cc.loader.release(key);
                tempDepsKeyList.push(key);
                talefun.LogHelper.log("clearUnusedRes deps : " +  key);
            }
        }

        //清除已删除缓存记录
        for(var i = 0 ; i < tempDepsKeyList.length; i++)
        {
            let key = tempDepsKeyList[i];
            delete depsCache[key];
        }
        tempDepsKeyList.splice(0,tempDepsKeyList.length);

        //清理View 动态加载imgae 资源
        let tempImageKeyList = [];
        for(let key in imageCache)
        {
            if(imageCache[key] == 0)
            {
                tempImageKeyList.push(key);
                //释放 image frame缓存
                let uuidFrames = (<any>cc.loader)._resources.getUuidArray(key,cc.SpriteFrame)

                if (uuidFrames && uuidFrames instanceof Array)
                {
                    for(let index in uuidFrames)
                    {
                        cc.loader.release(uuidFrames[index]);
                    }
                }

                //释放 image Atlas缓存
                let uuisAtlas = (<any>cc.loader)._getResUuid('ui/' + "atlas",cc.SpriteAtlas);
                cc.loader.release(uuisAtlas);

                //释放 image textrue缓存
                let uuidTexture = (<any>cc.loader)._getResUuid('ui/' + "atlas",cc.Texture2D);
                cc.loader.release(uuidTexture);

                talefun.LogHelper.log("clearUnusedRes imageCache : " +  key);
            }
        }

        //清除已删除缓存记录
        for(let i = 0 ; i < tempImageKeyList.length; i++)
        {
            let key = tempImageKeyList[i];
            delete imageCache[key];
        }
        tempImageKeyList.splice(0,tempImageKeyList.length);

        cc.sys.garbageCollect();
    }

    static getInstance():ViewManager
    {
        if(ViewManager._instance == null)
        {
            ViewManager._instance = new ViewManager();
        }
        return ViewManager._instance;
    }
}
