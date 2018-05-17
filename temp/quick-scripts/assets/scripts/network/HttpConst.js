(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/network/HttpConst.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9ad031EZ5pO9YKTBHZM3gIQ', 'HttpConst', __filename);
// scripts/network/HttpConst.js

"use strict";

var api = {};

//通过设备ID登陆
api.loginWithDeviceId = { method: "POST", path: "/functions/loginWithDeviceId", wait: false };
//通过session直接登录的接口
api.loginWithSession = { method: "POST", path: "/functions/loginWithSession", wait: false, token: 2 };

api.updateUserInfo = { method: "POST", path: "/functions/updateUserInfo", wait: true, token: 1 };

module.exports = api;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=HttpConst.js.map
        