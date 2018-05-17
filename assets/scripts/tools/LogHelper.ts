// 日志管理类
//2018.01.10 li.xiao

const {ccclass, property} = cc._decorator;

@ccclass
export default class LogHelper {
    //控制是否输出log
    static logEnable: boolean = true;

    //普通输出 
    static log(msg:string)
    {
        if(LogHelper.logEnable == false)
        {
            return;
        }
        cc.log(msg);
    }

    //输出 警告
    static logW(msg:string)
    {
        if(LogHelper.logEnable == false)
        {
            return;
        }

        cc.warn(msg);

    }

    //输出 错误
    static logE(msg:string)
    {
        if(LogHelper.logEnable == false)
        {
            return;
        }

        cc.error(msg);

    }

    //输出 多元 数据
    static dump(data:any)
    {
        if(typeof(data) == "string")
        {
            LogHelper.logW(data);
        }
        else if (data instanceof Array || data instanceof Object)
        {
            LogHelper.logW(JSON.stringify(data));
        }
        else
        {
            LogHelper.logW(data);
        }
    }
}
