
; (function () {

    var console = window.console || {};
    var oldLog = console.log;
    var maxLogCount = 100;
    var curLogCount = 0;
    console.log = function () {
        var args = [].slice.call(arguments);
        oldLog && oldLog.apply(console, args);

        var msg = '';
        for (var i = 0, obj, len = args.length; i < len; i++) {
            obj = args[i];

            try {
                obj = JSON.stringify(obj);
            } catch (e) { }

            if (typeof obj === 'string') {
                obj = obj.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            }

            if (i == 0) msg = obj; else msg += ', ' + obj;
        }

        var logContainer = this._logContainer || (this._logContainer = getLogContainer());

        curLogCount += 1;
        if (curLogCount < maxLogCount) {
            logContainer.innerHTML += '&gt; ' + msg + '<br/>';
        } else {
            curLogCount = 0;
            logContainer.innerHTML = '&gt; ' + msg + '<br/>';
        }
        logContainer.scrollTop = logContainer.scrollHeight - logContainer.clientHeight;
    };

    function getLogContainer() {
        var box = document.createElement('div'),
            style = box.style;

        box.className = 'console-log';
        style.cssText = 'position:fixed; top:0; left:0; width:100%; max-height:120px; box-sizing:border-box; font:12px Courier New; color:#fff; background-color:rgba(0,0,0,0.7); word-wrap:break-word; word-break:break-all; overflow-y:scroll; padding:5px 5px; z-index = 1e6;';

        box.innerHTML = '<p style="margin:0 10px;padding:0;text-align: right"><button class="j_reload" style="color:#eee; background: #333;border:0;">刷新</button><button class="j_clear" style="color:#eee; background: #333;border:0; margin-left:5px;">清空</button></p><div></div>';
        document.documentElement.appendChild(box);

        var log = box.querySelector('div');

        box.querySelector('button.j_reload').addEventListener('click', function (e) {
            location.reload();
        });
        box.querySelector('button.j_clear').addEventListener('click', function (e) {
            log.innerHTML = '';
            curLogCount = 0;
        }, false);

        return log;
    }
})();