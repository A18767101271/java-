import md5 from './md5';

function getCookie(e: string): string | null {
    var t = document.cookie.match(new RegExp("\\b" + e + "=([^;]+)"));
    return t ? t[1] : null;
}

function getTimestamp(): number {
    return Math.round(new Date().getTime() / 1000);
}

export class JsonpFailResponse {
    message: string;
}

export class JsonpOptions {
    callback?: string;
    data?: any;
    timeout?: number;
    url: string;

    success?: (data: any) => void;
    fail?: (data: JsonpFailResponse) => void;
}

function jsonp(options: JsonpOptions) {

    if (!options || !options.url) {
        throw new Error("参数不合法");
    }

    let document = window.document;

    options.data || (options.data = {});

    options.callback || (options.callback = "callback");

    var callbackName = ('jsonp_' + Math.random()).replace(".", "");
    var oHead = document.getElementsByTagName('head')[0];
    options.data[options.callback] = callbackName;

    var formatParams = function (data: any) {
        var arr: string[] = [];
        for (var name in data) {
            if (data[name] === undefined || data[name] === null || data[name] === '') continue;
            arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
        }
        return arr.join('&');
    }

    var params = formatParams(options.data);
    var oS = document.createElement('script');
    oHead.appendChild(oS);

    (window as any)[callbackName] = function (json: any) {
        oHead.removeChild(oS);
        clearTimeout((oS as any).timer);
        delete (window as any)[callbackName];
        options.success && options.success(json);
    };

    oS.onerror = function () {
        delete (window as any)[callbackName];
        oHead.removeChild(oS);
        options.fail && options.fail({
            message: "请求发生错误"
        });
    }

    oS.src = options.url + '?' + params;

    if (options.timeout && options.timeout > 0) {
        (oS as any).timer = setTimeout(function () {
            delete (window as any)[callbackName];
            oHead.removeChild(oS);
            options.fail && options.fail({
                message: "请求超时"
            });
        }, options.timeout);
    }
}

export const Utils = {
    md5,
    getCookie,
    getTimestamp,
    jsonp
};
