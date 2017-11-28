import OPTIONS from './options';

const sdkver = '1.0.9';

let jsBridgeInited: boolean = false;
let readys: Array<() => void> = [];


interface BridgeInvokeCallbackOptions {
    success?: (data: any) => void;
    cancel?: (data: any) => void;
    fail?: (data: any) => void;
    complete?: (data: any) => void;
}

interface BridgeInvokeCore {
    invoke(action: string, params: any, callback: (data: any) => void): void;
}

function getBridgeCore(): BridgeInvokeCore {
    return (window as any).KuKuJSBridge;
}

function bridgeInvokeParamsExtend(a: any) {
    return a = a || {}, a.appId = OPTIONS.appKey, a;
}

function onBridgeInvokeCallback(_: string, data: any, callbackOptions: BridgeInvokeCallbackOptions) {
    var success = callbackOptions.success || function () { };
    var fail = callbackOptions.fail || function () { };
    var cancel = callbackOptions.cancel || function () { };
    var complete = callbackOptions.complete || function () { };

    if (data.resultCode) {
        switch (data.resultCode) {
            case 'success': success(data); break;
            case 'cancel': cancel(data); break;
            case 'fail': fail(data); break;
        }
    }

    complete(data);
}

function onBridgeInvokeError(action: string, errorCode: string, _: BridgeInvokeCallbackOptions) {
    console.log('invoke_error:' + action + ':' + errorCode);
}

function bridgeInvoke(action: string, params: any, callbackOptions: BridgeInvokeCallbackOptions) {
    var core = getBridgeCore();
    if (core) {
        core.invoke(
            action,
            bridgeInvokeParamsExtend(params),
            function (data) {
                onBridgeInvokeCallback(action, data, callbackOptions);
            }
        );
    } else {
        onBridgeInvokeError(action, 'BridgeUninitialized', callbackOptions);
    }

}

class Container {
    isJsBridge: boolean;
}

function hasBridgeCore() {
    return !!getBridgeCore();
}

const container: Container = function () {
    let ua = navigator.userAgent.toLowerCase();
    let hasUA = -1 != ua.indexOf("kukujsbridge");
    let isJsBridge = hasBridgeCore() || hasUA;
    return {
        isJsBridge: isJsBridge
    }
}();


if (container.isJsBridge) {

    function bridgeReady() {
        jsBridgeInited = true;
        for (let a = readys, d = 0; a.length > 0; ++d)
            a[d]();
    }

    if (hasBridgeCore()) {

        bridgeReady();

    } else {
        window.document.addEventListener("KuKuJSBridgeReady", bridgeReady, false);
    }

}

export const SMPBridge = {
    version: sdkver,
    container,
    ready: function (a: () => void) {
        if (jsBridgeInited) a(); else readys.push(a);
    },
    setTitle: function (opt: any) {
        bridgeInvoke('setTitle', {
            title: opt.title
        }, opt);
    },
    share: function (opt: any) {
        bridgeInvoke('share', {
            channels: opt.channels,
            title: opt.title,
            desc: opt.desc,
            link: opt.link,
            imgUrl: opt.imgUrl,
            type: opt.type,
            dataUrl: opt.dataUrl
        }, opt);
    },
    open: function (opt: any) {
        bridgeInvoke('open', {
            url: opt.url,
            page: opt.page,
            data: opt.data
        }, opt);
    },
    browser: function (opt: any) {
        bridgeInvoke('browser', {
            url: opt.url
        }, opt);
    },
    getUser: function (opt: any) {
        bridgeInvoke('getUser', {}, opt);
    },
    getLocation: function (opt: any) {
        bridgeInvoke('getLocation', {}, opt);
    },
    getImages: function (opt: any) {
        bridgeInvoke('getImages', {
            count: opt.count,
            source: opt.source
        }, opt);
    },
    getImageData: function (opt: any) {
        bridgeInvoke('getImageData', {
            localId: opt.localId
        }, opt);
    },
    uploadImages: function (opt: any) {
        bridgeInvoke('uploadImages', {
            localIds: opt.localIds,
            showProgress: opt.showProgress
        }, opt);
    },
    dialog: function (opt: any) {
        bridgeInvoke('dialog', {
            title: opt.title,
            content: opt.content,
            type: opt.type,
            buttons: opt.buttons
        }, opt);
    },
    toast: function (opt: any) {
        bridgeInvoke('toast', {
            content: opt.content,
            icon: opt.icon,
            timeout: opt.timeout
        }, opt);
    },
    loading: function (opt: any) {
        bridgeInvoke('loading', {
            action: opt.action,
            content: opt.content,
            timeout: opt.timeout
        }, opt);
    },
    picker: function (opt: any) {
        bridgeInvoke('picker', {
            data: opt.data,
            title: opt.title,
            defaultValue: opt.defaultValue
        }, opt);
    }
};