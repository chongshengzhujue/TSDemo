//UIResMap 记录textrue和spriteFrame的纹理关系，用于根据FrameName自动加载贴图
// 格式为json字符串，初次加载时转换成js数据对象
// 2018.01.11 li.xiao

const {ccclass, property} = cc._decorator;

let UIResMapStr = "{}";

@ccclass
export default class UIResMap {

    static resMap:any = null;

    static initUIResMap()
    {
        if(UIResMap.resMap == null)
        {
            UIResMap.resMap = JSON.parse(UIResMapStr);
        }
    }

    static getResInfo(key:string):any
    {
        if(UIResMap.resMap !== null && key !== null)
        {
            let subInfo = UIResMap.resMap[key];
            if(subInfo == null || subInfo == undefined)
            {
                subInfo = UIResMap.resMap["default"];
            }
            return subInfo;
        }
    }

}

