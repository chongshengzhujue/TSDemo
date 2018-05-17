const {ccclass, property} = cc._decorator;

//请求信息
export type RequestData = {
    id: string,
    path: string,
    needToken?: number,
    wait?: boolean,
    method: string,
    parameters: object,
}

//包信息
export type PackageInfo = {
    name: string,
    platform: string
}

//服务器配置信息
export type ServerConfig = {
    ID: string,
    KEY: string,
    SERVER: string,
    PREPARE?: boolean,
}

//code status
@ccclass
export class CodeConst {
    static readonly BAD_REQUEST = 400;
    static readonly REQUEST_SUCCESS = 200;
    static readonly REQUEST_ERROR = 500;
    static readonly RESULT_DATA_ERROR = 600;
    static readonly RESULT_NO_USER_DATA = 2500;
    static readonly RESULT_NO_CHALLENGE_DATA = 2501;
    static readonly FORCE_TIMEOUT_ERROR = 28;
}