// Learn TypeScript:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/typescript/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class EventManager {

    static _instance:EventManager = null; 

    eventCache:any = null;

    constructor()
   {
        this.eventCache = {};
   }

   static getInstance():EventManager
   {
       if(EventManager._instance == null)
       {
            EventManager._instance = new EventManager();
       }
       return EventManager._instance;
   }

   addEventListener(eventType:number,callback:any)
   {
        if (eventType && callback)
        {
            var hadSame = false;
            var subCache = this.eventCache[eventType] || [];

            for(var i = 0; i < subCache.length; i++)
            {
                if (subCache[i] === callback)
                {
                    hadSame = true;
                    break;
                }
            }

            if (!hadSame)
            {
                subCache.push(callback);
            }


            this.eventCache[eventType] = subCache;
        }
   }

   removeEventListener(eventType:number,callback:any)
   {
        if (eventType && callback)
        {
            var subCache = this.eventCache[eventType];
            if (subCache)
            {
                for(var i = 0; i< subCache.length; i++ )
                {
                    if(subCache[i] === callback)
                    {
                        subCache.splice(i,1);
                        break;
                    }
                }
            }
        }
   }

   dispatchEvent(eventType:number,params:any)
   {
        if (eventType)
        {
            var subCache = this.eventCache[eventType];
            if (subCache)
            {
                for(var i = 0; i < subCache.length; i++)
                {
                    var callback = subCache[i]
                    callback(eventType,params);
                }
            }
        }
   }

    // update (dt) {},
}
