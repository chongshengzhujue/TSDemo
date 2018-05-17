"use strict";
cc._RF.push(module, '9ad031EZ5pO9YKTBHZM3gIQ', 'HttpConst');
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