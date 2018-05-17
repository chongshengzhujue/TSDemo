//模版文件加载管理类
// 2018.01.10 li.xiao

let talefun = (<any>cc).talefun

const {ccclass, property} = cc._decorator;

@ccclass
export default class TemplateManager {

    static _instance:TemplateManager = null;
     cache = {};
     loadListCallback:any = null;

    static getInstance():TemplateManager
     {
         if(TemplateManager._instance == null)
         {
            TemplateManager._instance = new TemplateManager();
         }
         return TemplateManager._instance;
     }

     getTemplate(name:string,callback:any)
    {
        if (name && typeof(name) == "string")
        {
            if (this.cache[name] )
            {
                talefun.LogHelper.log("load template : " + name + " in cache");
                if (callback)
                {
                    callback(this.cache[name]);
                }
            }
            else
            {
                cc.loader.loadRes("template/" + name,function(error,jsonObjct)
                {
                    if (error)
                    {
                        talefun.LogHelper.log("load template " + name + " error: " + error)
                    }
                    else
                    {
                        talefun.LogHelper.log("load template : " + name);
                        (<any>cc).talefun.LogHelper.dump(jsonObjct);
                        this.cache[name] = jsonObjct;
                        if (callback)
                        {
                            callback(jsonObjct);
                        }
                    }
                }.bind(this));
            }
        }
    }

    getTemplateList(nameList:Array<any>,callback:any)
    {
        this.loadListCallback = callback;
        if (nameList && nameList instanceof Array)
        {
            var len = nameList.length;
            var self = this;
            if (len > 0)
            {
               this.stepLoadTemplate(nameList,len - 1);
            }
            else
            {
                if (this.loadListCallback)
                {
                    this.loadListCallback();
                }
            }
        }
    }

    stepLoadTemplate(list:Array<any>,index:number)
    {
        let len = list.length;
        let idx = index;
        if(len == 0 || index < 0 || index > len -1)
        {
            if (this.loadListCallback)
            {
                this.loadListCallback();
                this.loadListCallback = null;
            }
            return;
        }
        else
        {
            this.getTemplate(list[index],function()
            {
                this.stepLoadTemplate(list,idx -1)
            }.bind(this));
        }
    }

    getTemplateInCache(name:string)
    {
        if (this.cache)
        {
            return this.cache[name];
        }
        return null;
    }


}
