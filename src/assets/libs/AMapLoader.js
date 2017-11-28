var callbackName = '__AMapReady';
var apiVer = '1.4.0';
var readys = [];
var amapInited = false;
var enableUI = false;

var oHead = window.document.getElementsByTagName('head')[0];

function loadReady() {
    amapInited = true;
    while (readys.length > 0) {
        let call = readys.shift();
        call && call();
    }
}

function initAMapUI() {
    if (window.AMap && !window.AMapUI && window.initAMapUI && window.AMap.UA) {
        window.initAMapUI();
        AMapUI.loadUI([], function () {
            loadReady();
        });
    }
}

window[callbackName] = function () {

    window[callbackName] = null;

    if (enableUI) {

        initAMapUI();

    } else {
        loadReady();
    }


};


export default {

    init(options) {

        if (options.enableUI) {
            enableUI = true;
            var src2 = '//webapi.amap.com/ui/1.0/main-async.js';
            var oS2 = document.createElement('script');
            oS2.src = src2;
            oS2.onload = function () {
                initAMapUI();
            };
            oHead.appendChild(oS2);
        }

        var key = options.key;
        var oS = document.createElement('script');
        var src = '//webapi.amap.com/maps?v=' + apiVer + '&key=' + decodeURIComponent(key) + '&callback=' + callbackName;
        if (options.plugins && options.plugins.length) {
            src += '&plugin=' + options.plugins.join(',');
        }
        oS.src = src;
        oHead.appendChild(oS);


    },

    ready(compilation) {

        if (amapInited) compilation();
        else readys.push(compilation);
    }

};