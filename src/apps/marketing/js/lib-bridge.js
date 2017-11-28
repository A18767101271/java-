(function (win, lib) {

    var sdkver = '0.0.9';
    var options = {
        appId: "123"
    };

    var jsBridgeInited = 0;
    var readys = [];

    function getBridgeCore() {
        return win.KuKuJSBridge;
    }

    function hasBridgeCore() {
        return !!getBridgeCore();
    }

    function bridgeInvokeParamsExtend(a) {
        return a = a || {}, a.appId = options.appId, a;
    }

    function onBridgeInvokeCallback(action, data, callbackOptions) {
        var success = callbackOptions.success || function () {};
        var fail = callbackOptions.fail || function () {};
        var cancel = callbackOptions.cancel || function () {};
        var complete = callbackOptions.complete || function () {};

        if (data.resultCode) {
            switch (data.resultCode) {
                case 'success':
                    success(data);
                    break;
                case 'cancel':
                    cancel(data);
                    break;
                case 'fail':
                    fail(data);
                    break;
            }
        }

        complete(data);
    }

    function onBridgeEventCallback(eventName, data, callback) {
        var callback = callback || function () {};
        callback(data);
    }

    function onBridgeEventError(eventName, errorCode, callbackOptions) {
        console.log('event_error:' + eventName + ':' + errorCode);
    }

    function onBridgeInvokeError(action, errorCode, callbackOptions) {
        console.log('invoke_error:' + action + ':' + errorCode);
    }

    function bridgeEventOn(eventName, callback) {

    }

    function bridgeEventOff(eventName, callback) {

    }

    function bridgeInvoke(action, params, callbackOptions) {
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

    var util = {
        container: function () {
            var ua = navigator.userAgent.toLowerCase();
            var hasUA = -1 != ua.indexOf("kukujsbridge");
            var isJsBridge = hasBridgeCore() || hasUA;
            return {
                isJsBridge: isJsBridge
            }
        }()
    };

    var kukujs = {
        version: sdkver,
        util: util,
        config: function (opt) {
            opt = opt || {};
            for (var i in opt) {
                if (opt.hasOwnProperty(i) && i in options && opt[i] !== undefined && opt[i] !== null) {
                    options[i] = opt[i];
                };
            }
        },
        ready: function (a) {
            if (jsBridgeInited) a();
            else readys.push(a);
        },
        setTitle: function (opt) {
            bridgeInvoke('setTitle', {
                title: opt.title
            }, opt);
        },
        share: function (opt) {
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
        open: function (opt) {
            bridgeInvoke('open', {
                url: opt.url,
                page: opt.page,
                data: opt.data
            }, opt);
        },
        browser: function (opt) {
            bridgeInvoke('browser', {
                url: opt.url
            }, opt);
        },
        getUser: function (opt) {
            bridgeInvoke('getUser', {}, opt);
        },
        getLocation: function (opt) {
            bridgeInvoke('getLocation', {}, opt);
        },
        getImages: function (opt) {
            bridgeInvoke('getImages', {
                count: opt.count,
                source: opt.source
            }, opt);
        },
        getImageData: function (opt) {
            bridgeInvoke('getImageData', {
                localId: opt.localId
            }, opt);
        },
        uploadImages: function (opt) {
            bridgeInvoke('uploadImages', {
                typeId: opt.typeId,
                localIds: opt.localIds,
                showProgress: opt.showProgress
            }, opt);
        },
        dialog: function (opt) {
            bridgeInvoke('dialog', {
                title: opt.title,
                content: opt.content,
                type: opt.type,
                buttons: opt.buttons
            }, opt);
        },
        toast: function (opt) {
            bridgeInvoke('toast', {
                content: opt.content,
                icon: opt.icon,
                timeout: opt.timeout
            }, opt);
        },
        loading: function (opt) {
            bridgeInvoke('loading', {
                action: opt.action,
                content: opt.content,
                timeout: opt.timeout
            }, opt);
        },
        picker: function (opt) {
            bridgeInvoke('picker', {
                data: opt.data,
                title: opt.title,
                defaultValue: opt.defaultValue
            }, opt);
        }
    };



    if (util.container.isJsBridge) {

        (function (b) {

            if (hasBridgeCore()) {
                b();
            } else {
                win.document.addEventListener("KuKuJSBridgeReady", b, false);
            }

        })(function () {
            for (jsBridgeInited = 1, a = readys, d = 0, e = a.length; e > d; ++d)
                a[d]();
        });

    }

    lib.bridge = kukujs;

})(window, window.lib || (window.lib = {}))