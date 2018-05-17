import LogHelper from "./LogHelper";


const {ccclass, property} = cc._decorator;

@ccclass
export default class Localization{

    static language:string = "en";

    static langCache:any = null; 

    static initLangCache(cacheStr:string)
    {
        if(Localization.langCache == null && cacheStr !== null && cacheStr !== undefined)
        {
            LogHelper.log("cacheStr : " + cacheStr);
            Localization.langCache = JSON.parse(cacheStr);
        }
    }

    static setLanguage(lang:string)
    {
        if(lang !== null && lang !== "")
        {
            Localization.language = lang
        }
    }

    static getLanguage():string
    {
        return Localization.language;
    }

    static localizationString(key:string):string
    {
        if (Localization.langCache == null)
        {
            return key;
        }

        let subLangCache = Localization.langCache[key]
        if(subLangCache !== null && subLangCache !== undefined)
        {
            return subLangCache[Localization.language] || subLangCache["en"]; 
        }

        return key;
    }

    static setLabelText(label:cc.Label,key:string,pramas:any[])
    {
        if(label != null && key )
        {
            let localStr = Localization.localizationString(key);

            if(pramas)
            {
                let len = pramas.length;
                for(let i = 0; i < len; i++)
                {
                    localStr = localStr.replace(/{#\d}/,pramas[i]);
                }
            }

            label.string = localStr;
        }
    }
}
