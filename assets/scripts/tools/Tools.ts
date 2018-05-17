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

const md5Encode = require("./myMD5");

@ccclass
export default class Tools {

    //将字符串转换为十六进制
    static stringToHex(str: string) {
        let val = "";  
        for (let i = 0; i < str.length; i++) {  
            if (val == "")  
                val = str.charCodeAt(i).toString(16);  
            else  
                val += str.charCodeAt(i).toString(16);  
        }
        val += "0a"  
        return val  
    }

    //将十六进制转换为字符串
    static hexToString(hex: string) {
        let arr = hex.split("")  
        let out = ""  
        for (let i = 0; i < arr.length / 2; i++) {  
            let tmp = "0x" + arr[i * 2] + arr[i * 2 + 1]  
            let charValue = String.fromCharCode(parseInt(tmp));  
            out += charValue  
        }  
        return out;
    }

    static md5Encode(str: string) {
        return md5Encode(str);
    }
}
