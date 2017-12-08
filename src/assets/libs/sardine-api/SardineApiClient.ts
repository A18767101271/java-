import { Utils, JsonpFailResponse } from './utils';
import ApiRequestOptions from './ApiRequestOptions';
import ApiError from './ApiError';

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





function generateLoginUrl(options: SardineApiClientOptions) {
    return options.loginUrl + "?appid=" + encodeURIComponent(options.appKey) + "&redirect=" + encodeURIComponent(location.toString());
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



function gatewayRequestCore(options: SardineApiClientOptions, api: string, ver: string, data: any, success: (data: any) => void, error: (data: JsonpFailResponse) => void) {

    var jd = data || {};
    jd.api = api;
    jd.ver = ver;
    jd.app_id = options.appKey;
    jd.timestamp = Utils.getTimestamp();
    jd.sign = Utils.md5(getSignString(jd)).toUpperCase();

    Utils.jsonp({
        url: options.gatewayUrl,
        data: jd,
        success: function (data) {
            success && success(data);
        },
        fail: function (data) {
            error && error(data);
        }
    });

}

export interface SardineApiClientOptions {
    gatewayUrl: string;
    loginUrl: string;
    appKey: string;
}


export default class SardineApiClient {
    version = sdkver;
    options: SardineApiClientOptions;
    constructor(options: SardineApiClientOptions) {
        this.options = options;
    }
    request(opt: ApiRequestOptions) {

        var api = opt.api;
        var ver = opt.ver;
        var data = opt.data || {};
        var success = opt.success || function () { };
        var error = opt.error || function () { };

        const self = this;
        function nologin(data: any) {

            var res: ApiError = {
                // name: 'not_login',
                ret: 'not_login',
                msg: '授权无效或未登录',
                req: opt,
                api: api,
                v: ver,
                resp: data
            };
            if (data.requestId)
                res.rid = data.requestId;

            error(res, data);

            if (opt.needLogin) {
                self.goLogin();
            }

        };

        gatewayRequestCore(this.options, api, ver, data, function (data) {
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
                req: opt,
                resp: data
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

    getUserInfo(callback?: (user: LoginInfo, resp: any) => void): LoginInfo | undefined {
        if (callback && typeof callback === 'function') {
            gatewayRequestCore(this.options, 'kk.h5.account.simpleinfo.get', '1.0', {}, function (data) {
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
    getUserNick(callback?: (nickname: string) => void): string | undefined | null {

        if (callback) {
            this.getUserInfo(function (obj, _) {
                callback(obj.userNick || '');
            });
        } else if (userInfo && userInfo.userNick) {
            return userInfo.userNick;
        } else {
            var nick = Utils.getCookie("nickname");
            return nick;
        }
    }
    goLogin() {
        if (isGoingToLogin)
            return;
        isGoingToLogin = true;
        var url = generateLoginUrl(this.options);
        location.href = url;
    }
    isLogin(callback?: (isLogin: boolean | null, raw: any) => void): boolean | undefined {
        if (callback) {
            this.getUserInfo(function (obj, data) {
                callback(obj.isLogin || null, data);
            });
        } else {
            var nick = this.getUserNick();
            return !!nick;
        }
    }
};
