
const sdkver = '1.1.3';

let jsBridgeInited: boolean = false;
let readys: Array<() => void> = [];

export interface SardineJSBridgeOptions {
    appKey: string
};

export interface BridgeInvokeCallbackOptions {
    success?: (data: any) => void;
    cancel?: (data: any) => void;
    fail?: (data: any) => void;
    complete?: (data: any) => void;
}

interface BridgeInvokeCore {
    invoke(action: string, params: any, callback: (data: any) => void): void;
    on(eventName: string, callback: (data?: any) => void);
}

function getBridgeCore(): BridgeInvokeCore {
    return (window as any).KuKuJSBridge;
}

function bridgeInvokeParamsExtend(a: any, options: SardineJSBridgeOptions) {
    return a = a || {}, a.appId = options.appKey, a;
}

function onBridgeInvokeCallback(_: string, data: any, callbackOptions?: BridgeInvokeCallbackOptions) {
    callbackOptions = callbackOptions || {};
    let success = callbackOptions.success || function () { };
    let fail = callbackOptions.fail || function () { };
    let cancel = callbackOptions.cancel || function () { };
    let complete = callbackOptions.complete || function () { };

    if (data.resultCode) {
        switch (data.resultCode) {
            case 'success': success(data); break;
            case 'cancel': cancel(data); break;
            case 'fail': fail(data); break;
        }
    }

    complete(data);
}

function onBridgeInvokeError(action: string, errorCode: string, _?: BridgeInvokeCallbackOptions) {
    console.log('invoke_error:' + action + ':' + errorCode);
}

function onBridgeEventError(eventName: string, errorCode: string) {
    console.log('event_error:' + eventName + ':' + errorCode);
}

function bridgeInvoke(options: SardineJSBridgeOptions, action: string, params?: any, callbackOptions?: BridgeInvokeCallbackOptions) {
    var core = getBridgeCore();
    if (core) {
        core.invoke(
            action,
            bridgeInvokeParamsExtend(params, options),
            function (data) {
                onBridgeInvokeCallback(action, data, callbackOptions);
            }
        );
    } else {
        onBridgeInvokeError(action, 'BridgeUninitialized', callbackOptions);
    }

}

function bridgeEventOn(_options: SardineJSBridgeOptions, eventName: string, callback: (data?: any) => void) {
    var core = getBridgeCore();
    if (core) {

        core.on(
            eventName,
            function (data) {
                onBridgeEventCallback(eventName, data, callback);
            }
        );

    } else {
        onBridgeEventError(eventName, 'BridgeUninitialized');
    }
}

function onBridgeEventCallback(_eventName: string, data: any | undefined, callback: (data?: any) => void) {
    let call = callback || function () { };
    call(data);
}

interface Container {
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



export default class SardineJSBridge {
    version: string = sdkver;
    container: Container = container;

    options: SardineJSBridgeOptions;

    constructor(options: SardineJSBridgeOptions) {
        this.options = options;
    }

    ready(callback: () => void) {
        if (jsBridgeInited) callback(); else readys.push(callback);
    }

    setTitle(opt: { title: string }) {
        bridgeInvoke(this.options, 'setTitle', {
            title: opt.title
        });
    }
    open(opt: { url?: string, page?: string, data?: any } & BridgeInvokeCallbackOptions) {
        bridgeInvoke(this.options, 'open', {
            url: opt.url,
            page: opt.page,
            data: opt.data
        }, opt);
    }
    browser(opt: { url: string } & BridgeInvokeCallbackOptions) {
        bridgeInvoke(this.options, 'browser', {
            url: opt.url
        }, opt);
    }
    getUser(opt: BridgeInvokeCallbackOptions) {
        bridgeInvoke(this.options, 'getUser', {}, opt);
    }
    getLocation(opt: BridgeInvokeCallbackOptions) {
        bridgeInvoke(this.options, 'getLocation', {}, opt);
    }
    getImages(opt: { count?: number, source?: Array<"album" | "camera">, sizeType?: Array<'original' | 'compressed'> } & BridgeInvokeCallbackOptions) {
        bridgeInvoke(this.options, 'getImages', {
            count: opt.count,
            source: opt.source,
            sizeType: opt.sizeType
        }, opt);
    }
    getImageData(opt: { localId: string } & BridgeInvokeCallbackOptions) {
        bridgeInvoke(this.options, 'getImageData', {
            localId: opt.localId
        }, opt);
    }
    uploadImages(opt: { typeId: number, localIds: Array<string>, showProgress?: boolean } & BridgeInvokeCallbackOptions) {
        bridgeInvoke(this.options, 'uploadImages', {
            typeId: opt.typeId,
            localIds: opt.localIds,
            showProgress: opt.showProgress
        }, opt);
    }
    dialog(opt: { title?: string, content: string, type: 'alert' | 'confirm', buttons?: Array<{ text: string, type?: 'default' | 'primary' }> } & BridgeInvokeCallbackOptions) {
        bridgeInvoke(this.options, 'dialog', {
            title: opt.title,
            content: opt.content,
            type: opt.type,
            buttons: opt.buttons
        }, opt);
    }
    toast(opt: { content: string, icon: string, timeout?: number } & BridgeInvokeCallbackOptions) {
        bridgeInvoke(this.options, 'toast', {
            content: opt.content,
            icon: opt.icon,
            timeout: opt.timeout
        }, opt);
    }
    loading(opt: { action: 'show' | 'hide', content?: string, timeout?: number } & BridgeInvokeCallbackOptions) {
        bridgeInvoke(this.options, 'loading', {
            action: opt.action,
            content: opt.content,
            timeout: opt.timeout
        }, opt);
    }
    picker(opt: { data: any & { type: 'items' | 'multi' | 'date' | 'geo' }, title?: string, defaultValue?: Array<any> } & BridgeInvokeCallbackOptions) {
        bridgeInvoke(this.options, 'picker', {
            data: opt.data,
            title: opt.title,
            defaultValue: opt.defaultValue
        }, opt);
    }

    setOptionMenu(opt: { buttons: Array<{ icon?: string, text?: string, tag?: string, color?: string }> }) {
        bridgeInvoke(this.options, 'setOptionMenu', {
            buttons: opt.buttons
        });
    }
    showOptionMenu(opt?: { reset?: boolean }) {
        if (opt) {
            bridgeInvoke(this.options, 'showOptionMenu', {
                reset: opt.reset
            });
        }
        else {
            bridgeInvoke(this.options, 'showOptionMenu', {});
        }
    }
    hideOptionMenu() {
        bridgeInvoke(this.options, 'hideOptionMenu');
    }

    onOptionMenuClick(callback: (data: { buttonIndex: number, buttonTag?: string }) => void) {
        bridgeEventOn(this.options, 'optionMenu', callback);
    }

};

