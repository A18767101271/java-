import { Utils, JsonpFailResponse } from './utils';
import OPTIONS from './options';
import { SMPBridge } from './jsbridge';

const sdkver = '4.0.1';
let isGoingToLogin = false;
let location = window.location;
let userInfo: LoginInfo;



export class LoginInfo {
    isLogin?: boolean;
    userId?: number;
    userNick?: string;
    isError?: boolean;
}



export interface ApiRequestOptions {
    api: string;
    ver: string;
    data?: any;
    needLogin?: boolean;
    success?: (data: any, resp: any) => void;
    error?: (errorData: ApiError, resp?: any) => void;
}

export class ApiError {
    ret: string;
    msg: string;
    api: string;
    v: string;
    rid?: string;
    resp?: any;
    req: ApiRequestOptions;
}

function generateLoginUrl() {
    return OPTIONS.loginUrl + "?appid=" + encodeURIComponent(OPTIONS.appKey) + "&redirect=" + encodeURIComponent(location.toString());
}

function goLogin() {
    if (isGoingToLogin)
        return;
    isGoingToLogin = true;
    var url = generateLoginUrl();
    location.href = url;
}

function getSignString(params: any) {
    let arr: string[] = [];
    for (var name in params) {
        if (name == "callback") continue;
        if (params[name] === undefined || params[name] === null || params[name] === '') continue;
        arr.push(name + '=' + params[name]);
    }

    return arr.sort().join('&');
}

function gatewayRequestCore(api: string, ver: string, data: any, success: (data: any) => void, error: (data: JsonpFailResponse) => void) {

    var jd = data || {};
    jd.api = api;
    jd.ver = ver;
    jd.app_id = OPTIONS.appKey;
    jd.timestamp = Utils.getTimestamp();
    jd.sign = Utils.md5(getSignString(jd)).toUpperCase();

    Utils.jsonp({
        url: OPTIONS.gatewayUrl,
        data: jd,
        success: function (data) {
            success && success(data);
        },
        fail: function (data) {
            error && error(data);
        }
    });

}


function apiRequest(opt: ApiRequestOptions) {

    var api = opt.api;
    var ver = opt.ver;
    var data = opt.data || {};
    var success = opt.success || function () { };
    var error = opt.error || function () { };

    function nologin(data: any) {

        var res: ApiError = {
            // name: 'not_login',
            ret: 'not_login',
            msg: '授权无效或未登录',
            req: opt,
            api: api,
            v: ver
        };
        if (data.requestId)
            res.rid = data.requestId;

        error(res, data);

        if (opt.needLogin) {
            goLogin();
        }

    };

    gatewayRequestCore(api, ver, data, function (data) {
        if (data.success === true) {
            success(data.response || {}, data);
            return;
        }
        switch ('' + data.code) {
            case "10012":
            case "10013":
            case "10006":
                nologin(data);
                return;
        }
        var res: ApiError = {
            // name: 'code.' + (data.code || 'unknow'),
            ret: 'code.' + (data.code || 'unknow'),
            msg: data.desc || '未知错误',
            api: api,
            v: ver,
            req: opt
        };
        if (data.requestId)
            res.rid = data.requestId;
        error(res, data);
    }, function (data) {
        var res = {
            // name: 'js.request_error',
            ret: 'js.request_error',
            msg: data.message || '未知错误',
            api: api,
            v: ver,
            req: opt
        };
        error(res);
    });

}


function getUserInfo(callback?: (user: LoginInfo, resp: any) => void): LoginInfo | undefined {
    if (callback && typeof callback === 'function') {
        gatewayRequestCore('kk.h5.account.simpleinfo.get', '1.0', {}, function (data) {
            if (data.success === true && data.response.data && data.response.data.accountId) {
                let user: LoginInfo = {
                    isLogin: true,
                    userId: data.response.data.accountId,
                    userNick: data.response.data.nickName
                }
                userInfo = user;
                callback(user, data);
                return;
            }
            switch ('' + data.code) {
                case "10012":
                case "10013":
                case "10006":
                    callback({
                        isLogin: false
                    }, data);
                    return;
            }

            callback({
                isError: true
            }, data);
            return;
        }, function (data) {
            callback({
                isError: true
            }, data);
            return;
        });
    } else {
        return userInfo;
    }
}


function getUserNick(callback?: (nickname: string) => void): string | undefined | null {

    if (callback) {
        getUserInfo(function (obj, _) {
            callback(obj.userNick || '');
        });
    } else if (userInfo && userInfo.userNick) {
        return userInfo.userNick;
    } else {
        var nick = Utils.getCookie("nickname");
        return nick;
    }
}

function isLogin(callback?: (isLogin: boolean | null, raw: any) => void): boolean | undefined {
    if (callback) {
        getUserInfo(function (obj, data) {
            callback(obj.isLogin || null, data);
        });
    } else {
        var nick = getUserNick();
        return !!nick;
    }
}

export const SMP = {
    version: sdkver,
    request: apiRequest,
    getUserInfo,
    getUserNick,
    goLogin,
    isLogin,
    bridge: SMPBridge
};

export default SMP;