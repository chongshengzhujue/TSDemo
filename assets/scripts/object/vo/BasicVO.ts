// BasicVO 缓存数据基类,单条目信息
// 2018.01.10 li.xiao

const {ccclass, property} = cc._decorator;

@ccclass
export default class BasicVO {
    //解析单条数据
    parseData(data:Object)
    {
        if(data)
        {
            for(let key in data)
            {
                if(this[key] !== null)
                {
                    this[key] = data[key];
                }
            }
        }
    }

    parseDataFromStr(str:string)
    {
        if (str )
        {
            let data = JSON.parse(str);
            this.parseData(data);
        }
    }

    setProperty(key:string,value:any)
    {
        if(this[key] !== null && value && typeof(this[key]) == typeof(value))
        {
            this[key] = value;
        }
    }

    getProperty(key:string)
    {
        return this[key];
    }

    setProperties(data:Object)
    {
        if(data)
        {
            for(let key in data)
            {
                this.setProperty(key,data[key]);
            }
        }
    }

    getFormatStr()
    {
        return JSON.stringify(this);
    }
}
