
let _UA = window.navigator.userAgent || (window.navigator as any).swuserAgent;

function __inUA(keyPattern) {
    return keyPattern.test(_UA);
}
function __isAndroid() {
    return __inUA(/android/i);
}

function __isIOS() {
    return __inUA(/iPad|iPod|iPhone|iOS/i);
}


function isWx() {
    let t = _UA.toLowerCase();
    return -1 != t.indexOf("micromessenger");
}

function hasBridgeCore() {
    return !!(window as any).KuKuJSBridge;
}

function isJsBridge() {
    let ua = _UA.toLowerCase();
    let hasUA = -1 != ua.indexOf("kukujsbridge");
    return hasBridgeCore() || hasUA;
}

function isMobilePlatform() {
    let u = window.navigator.platform.toLowerCase(); 
    return !(!u.match("mac") && !u.match("win"));
}

export default {
    isAlipay: __inUA(/AlipayClient/),
    isWechat: isWx(),
    isIOS: __isIOS(),
    isAndroid: __isAndroid(),
    isJsBridge: isJsBridge(),
    isMobilePlatform: isMobilePlatform()
}