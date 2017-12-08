
interface JWeixinOptions {
    appId: string,
    jsApiList: string[]
}

interface JWeixinConfigParams {
    jsapi_ticket: string,
    noncestr: string,
    signature: string,
    timestamp: number,
    url?: string
}

let callbackName = '__JWeixinReady';


const oHead = window.document.getElementsByTagName('head')[0];

let readys: Array<(wx: any) => void> = [];
let jweixinInited = false;
let wxconfiged = false;

let GLOBAL_OPTIONS: JWeixinOptions | null = null;
let wx: any | null = null;
let CONFIG_PARAMS: JWeixinConfigParams | null = null;



function loadReady() {

    const w = (window as any).jWeixin;

    w.ready(function () {

        jweixinInited = true;
        while (readys.length > 0) {
            let call = readys.shift();
            call && call(w);
        }

    });

    w.error(function (res) {

        throw res;

    });

    wx = w;

    wxconfig();
}


function wxconfig() {

    if (!wxconfiged && wx && CONFIG_PARAMS && GLOBAL_OPTIONS) {
        wxconfiged = true;

        wx.config({

            debug: false,

            appId: GLOBAL_OPTIONS.appId,

            timestamp: CONFIG_PARAMS.timestamp,

            nonceStr: CONFIG_PARAMS.noncestr,

            signature: CONFIG_PARAMS.signature,

            jsApiList: GLOBAL_OPTIONS.jsApiList

        });
    }
}

window[callbackName] = function (data: JWeixinConfigParams) {

    window[callbackName] = function () { };

    CONFIG_PARAMS = data;

    wxconfig();

}



export default {



    init(options: JWeixinOptions) {

        GLOBAL_OPTIONS = options;

        const oS1 = window.document.createElement('script');
        oS1.src = '//res.wx.qq.com/open/js/jweixin-1.2.0.js';
        oS1.onload = () => {
            loadReady();
        };
        oHead.appendChild(oS1);

        const url = window.location.origin + window.location.pathname;

        const oS2 = window.document.createElement('script');
        oS2.src = 'https://tenv.mttstudio.net/jsapiticket/get?url=' + encodeURIComponent(url) + '&callback=' + callbackName;
        oHead.appendChild(oS2);

    },

    ready(compilation: (wx: any) => void) {
        if (compilation) {
            if (jweixinInited) compilation((window as any).jWeixin);
            else readys.push(compilation);
        }
    }
}