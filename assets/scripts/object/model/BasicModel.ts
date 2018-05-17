//缓存数据管理模块，用于组织功能相关数据
// 2018.01.10 li.xiao

const {ccclass, property} = cc._decorator;

@ccclass
export default class BasicModel {

    initModel()
    {
        ;
    }

    parseDataFromDB()
    {
        ;
    }

    parseDataFromServer(data:any)
    {
        ;
    }

    saveItem(key:string,item:any)
    {
        if (key !== null && item !== null)
        {
            cc.sys.localStorage.setItem(key, item)
        }
    }

    getItem(key:string)
    {
        if (key !== null)
        {
           return cc.sys.localStorage.getItem(key);
        }

        return undefined;
    }

    removeItem(key:string)
    {
        if (key !== null)
        {
            cc.sys.localStorage.removeItem(key);
        }
    }

}
