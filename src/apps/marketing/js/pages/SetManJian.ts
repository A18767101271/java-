import '../../sass/SetHomePage.scss';
import '../lib-bridge.js';
import '../console.log.js';
import PromotionApis from '../../../../services/promotion-apis';
import { HashUrl } from '../../../../assets/libs/hash-router';
import PageExtends from '../PageExtends.js';

const bridge = (window as any).lib.bridge;
const Swiper = (window as any).Swiper;
const $ = (window as any).$;

let st_time = "";
let end_time = "";

function start() {

    //循环周期
    PageExtends.loop = PageExtends.loop || [];

    var h = "";
    h += `<div class="l-label">
 <div class="left fl">活动标题</div>
 <div class="right fr">
    <input type="text" placeholder="请输入活动标题" id="act-name">
 </div>
 </div>
 <div class="l-label">
 <div class="left fl">起始日期</div>
 <div class="right fr">
     <span id="start-time">请设置日期</span>
     <i></i>
 </div>
 </div>
 <div class="l-label">
 <div class="left fl">终止日期</div>
 <div class="right fr">
     <span id="end-time">请设置日期</span>
     <i></i>
 </div>
 </div>
 <div class="l-title">
 <i></i>
 <span>优惠信息</span>
 </div>
 <div class="div-into">
 <div class="l-manjian">
 <div class="l-label">
 <div class="left fl">满</div>
 <div class="right fr"><input type="number" placeholder="在此输入金额" class="man-input">元</div>
 </div>
 <div class="l-label">
 <div class="left fl">减</div>
 <div class="right fr"><input type="number" placeholder="在此输入金额" class="jian-input">元</div>
 </div>
 </div>
 </div>
 <div class="l-btn"><i></i>新增</div>
 <div class="l-title">
 <i></i>
 <span>活动信息</span>
 </div>
 <div class="l-label">
 <div class="left fl">面向用户</div>
 <div class="right fr">
     <span id="pick-user">请设置面向用户</span>
     <i></i>
 </div>
 </div>
 <div class="l-label">
 <div class="left fl">循环周期</div>
 <div class="right fr">
     <span id="pick-cycle">未设置</span>
     <i></i>
 </div>
 </div>
 <div class="l-foot">
 <h1>阅读并同意</h1>
 <em>《xxx营销协议》</em>
 <span id="btn" class="btn"></span>
 </div>
 <button id="btn-yes" class="btn-yes" disabled="disabled">确定并保存</button>`

    $('.wrap').append(h);

    let limitUser;

    //点击设置起始日期
    $('#start-time').on('click', function () {
        var $this = $(this);
        var d = new Date();
        var str = d.getFullYear() + "," + (d.getMonth() + 1) + "," + d.getDate();

        bridge.picker({
            title: "时间设置",
            data: //单列选取自定义数据
                {
                    type: 'date', //表示自定义输入数据
                    depth: 3,
                    start: [str],
                    end: [2020, 1, 1]
                },
            complete: function (data) {

                if (data.resultCode == 'success') {
                    $this.text(data.selectedValue[0] + '-' + data.selectedValue[1] + '-' + data.selectedValue[2]);
                }
            }
        });
    })

    //点击设置结束日期
    $('#end-time').on('click', function () {
        var $this = $(this);
        var str = $('#start-time').text();
        if (str == '请设置日期') {
            bridge.dialog({
                title: "提示",
                content: "请设置起始日期",
                type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
                buttons: [{
                    text: 'ok'
                }]
            });
            return;
        }

        bridge.picker({
            title: "时间设置",
            data: //单列选取自定义数据
                {
                    type: 'date', //表示自定义输入数据
                    depth: 3,
                    start: [str],
                    end: [2020, 1, 1]
                },
            complete: function (data) {
                if (data.resultCode == 'success') {
                    $this.text(data.selectedValue[0] + '-' + data.selectedValue[1] + '-' + data.selectedValue[2]);
                }
            }
        });
    })

    //点击选择面向用户
    $('#pick-user').on('click', function () {
        var $this = $(this);
        bridge.picker({
            title: "面向用户",
            data: //单列选取自定义数据
                {
                    type: 'items', //表示自定义输入数据
                    depth: 1,
                    items: [{
                        text: '全部用户',
                        value: '0',
                    },
                    {
                        text: '门店新用户',
                        value: '3'
                    },
                    {
                        text: '门店老用户',
                        value: '4'
                    }
                    ]
                },
            complete: function (data) {

                if (data.resultCode == 'success') {
                    $this.text(data.resultText[0]);
                    limitUser = data.selectedValue[0];
                }
            }
        });
    })

    //点击同意协议按钮
    $('#btn').on('click', function () {
        $(this).toggleClass('active');
        $('#btn-yes').toggleClass('dis');
        if ($('#btn-yes.dis').length > 0) {
            $('#btn-yes').removeAttr('disabled');
        } else {
            $('#btn-yes').attr('disabled', 'disabled');
        }
    })

    //点击新增按钮
    $('.l-btn').on('click', function () {
        var t = "";
        t += `<div class="l-manjian">
         <div class="l-label">
         <div class="left fl">满</div>
         <div class="right fr"><input type="number" placeholder="在此输入金额" class="man-input">元</div>
         </div>
         <div class="l-label">
         <div class="left fl">减</div>
         <div class="right fr"><input type="number" placeholder="在此输入金额" class="jian-input">元</div>
         </div>
         </div>`
        $('.div-into').append(t);
    })

    //点击循环周期
    $('#pick-cycle').on('click', function () {
        timeLay();
    })

    $('#btn-yes').on('click', function () {
        var add_input = $('.man-input');
        var reduce_input = $('.jian-input');
        var st = $('#start-time').text();
        var end = $('#end-time').text();
        st = new Date(Date.parse(st.replace(/-/g, "/")));
        st = st.getTime() / 1000;
        end = new Date(Date.parse(end.replace(/-/g, "/")));
        end = end.getTime() / 1000;
        var tt = "";

        if (!$('#act-name').val()) {
            bridge.dialog({
                title: "提示",
                content: "请输入活动标题",
                type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
                buttons: [{
                    text: 'ok'
                }]
            });
            return;
        }

        if (!st || !end) {
            bridge.dialog({
                title: "提示",
                content: "请设置日期",
                type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
                buttons: [{
                    text: 'ok'
                }]
            });
            return;
        }

        for (var i = 0; i < add_input.length; i++) {
            var arry = {};
            if ($(add_input[i]).val() == "" || $(reduce_input[i]).val() == "") {
                bridge.dialog({
                    title: "提示",
                    content: "请设置满减金额",
                    type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
                    buttons: [{
                        text: 'ok'
                    }]
                });
                return;
            };

            arry["discountAmount"] = Number($(reduce_input[i]).val()).toFixed(0);
            arry["fullAmount"] = Number($(add_input[i]).val()).toFixed(0);
            tt += JSON.stringify(arry) + ',';
        }

        tt = tt.substring(0, tt.length - 1);

        if ($('#pick-user').text() == "请设置面向用户") {
            bridge.dialog({
                title: "提示",
                content: "请设置面向用户",
                type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
                buttons: [{
                    text: 'ok'
                }]
            });
            return;
        }

        if ($('#pick-cycle').text() == "未设置") {
            bridge.dialog({
                title: "提示",
                content: "请设置周期",
                type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
                buttons: [{
                    text: 'ok'
                }]
            });
            return;
        }

        let obj = {
            storeId: 1,
            name: $('#act-name').val(),
            startTime: st,
            endTime: end,
            marketingType: 1,
            limitUser: limitUser,
            marketingMeta: "[" + tt + "]",
            meta: "{'spans':" + JSON.stringify(PageExtends.loop) + "}"
        };

        console.log(obj);

        PromotionApis.promotionInstanceAdd(obj).then(data => {
            console.log(data);
            bridge.dialog({
                title: "提示",
                content: "提交成功",
                type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
                buttons: [{
                    text: 'ok'
                }],
                complete: function (_) {
                    window.location.href = "#/";
                }
            });

        }).catch(err => console.log(err));
    })

}

function resetStart(data) {
    console.log(data);

    //循环周期
    PageExtends.loop = PageExtends.loop || data.meta.limitSpans.spans;

    var arr1 = ['全部用户', '', '', '门店新用户', '门店老用户'];

    var h = "";
    h += `<div class="l-label">
 <div class="left fl">活动标题</div>
 <div class="right fr">
    <input type="text" placeholder="请输入活动标题" id="act-name" value="`+ data.name + `">
 </div>
 </div>
 <div class="l-label">
 <div class="left fl">起始日期</div>
 <div class="right fr">
     <span id="start-time">请设置日期</span>
     <i></i>
 </div>
 </div>
 <div class="l-label">
 <div class="left fl">终止日期</div>
 <div class="right fr">
     <span id="end-time">请设置日期</span>
     <i></i>
 </div>
 </div>
 <div class="l-title">
 <i></i>
 <span>优惠信息</span>
 </div>
 <div class="div-into">`

    for (var i = 0; i < data.marketingMeta.fullReduction.length; i++) {
        h += `<div class="l-manjian">
     <div class="l-label">
     <div class="left fl">满</div>
     <div class="right fr"><input type="number" placeholder="在此输入金额" value="`+ data.marketingMeta.fullReduction[i].fullAmount + `" class="man-input">元</div>
     </div>
     <div class="l-label">
     <div class="left fl">减</div>
     <div class="right fr"><input type="number" placeholder="在此输入金额" value="`+ data.marketingMeta.fullReduction[i].discountAmount + `" class="jian-input">元</div>
     </div>
     </div>`
    }

    h += `</div>

 <div class="l-btn"><i></i>新增</div>
 <div class="l-title">
 <i></i>
 <span>活动信息</span>
 </div>
 <div class="l-label">
 <div class="left fl">面向用户</div>
 <div class="right fr">
     <span id="pick-user">` + arr1[data.limitUser] + `</span>
     <i></i>
 </div>
 </div>
 <div class="l-label">
 <div class="left fl">循环周期</div>
 <div class="right fr">
     <span id="pick-cycle">已设置</span>
     <i></i>
 </div>
 </div>
 <div class="l-foot">
 <h1>阅读并同意</h1>
 <em>《xxx营销协议》</em>
 <span id="btn" class="btn"></span>
 </div>
 <button id="btn-yes" class="btn-yes" disabled="disabled">确定并保存</button>`

    $('.wrap').append(h);

    let limitUser = data.limitUser;

    //点击设置起始日期
    $('#start-time').on('click', function () {
        var $this = $(this);
        var d = new Date();
        var str = d.getFullYear() + "," + (d.getMonth() + 1) + "," + d.getDate();

        bridge.picker({
            title: "时间设置",
            data: //单列选取自定义数据
                {
                    type: 'date', //表示自定义输入数据
                    depth: 3,
                    start: [str],
                    end: [2020, 1, 1]
                },
            complete: function (data) {

                if (data.resultCode == 'success') {
                    $this.text(data.selectedValue[0] + '-' + data.selectedValue[1] + '-' + data.selectedValue[2]);
                }
            }
        });
    })

    //点击设置结束日期
    $('#end-time').on('click', function () {
        var $this = $(this);
        var str = $('#start-time').text();
        if (str == '请设置日期') {
            bridge.dialog({
                title: "提示",
                content: "请设置起始日期",
                type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
                buttons: [{
                    text: 'ok'
                }]
            });
            return;
        }

        bridge.picker({
            title: "时间设置",
            data: //单列选取自定义数据
                {
                    type: 'date', //表示自定义输入数据
                    depth: 3,
                    start: [str],
                    end: [2020, 1, 1]
                },
            complete: function (data) {
                if (data.resultCode == 'success') {
                    $this.text(data.selectedValue[0] + '-' + data.selectedValue[1] + '-' + data.selectedValue[2]);
                }
            }
        });
    })

    //点击选择面向用户
    $('#pick-user').on('click', function () {
        var $this = $(this);
        bridge.picker({
            title: "面向用户",
            data: //单列选取自定义数据
                {
                    type: 'items', //表示自定义输入数据
                    depth: 1,
                    items: [{
                        text: '全部用户',
                        value: '0',
                    },
                    {
                        text: '门店新用户',
                        value: '3'
                    },
                    {
                        text: '门店老用户',
                        value: '4'
                    }
                    ]
                },
            complete: function (data) {

                if (data.resultCode == 'success') {
                    $this.text(data.resultText[0]);
                    limitUser = data.selectedValue[0];
                }
            }
        });
    })

    //点击同意协议按钮
    $('#btn').on('click', function () {
        $(this).toggleClass('active');
        $('#btn-yes').toggleClass('dis');
        if ($('#btn-yes.dis').length > 0) {
            $('#btn-yes').removeAttr('disabled');
        } else {
            $('#btn-yes').attr('disabled', 'disabled');
        }
    })

    //点击新增按钮
    $('.l-btn').on('click', function () {
        var t = "";
        t += `<div class="l-manjian">
         <div class="l-label">
         <div class="left fl">满</div>
         <div class="right fr"><input type="number" placeholder="在此输入金额" class="man-input">元</div>
         </div>
         <div class="l-label">
         <div class="left fl">减</div>
         <div class="right fr"><input type="number" placeholder="在此输入金额" class="jian-input">元</div>
         </div>
         </div>`
        $('.div-into').append(t);
    })

    //点击循环周期
    $('#pick-cycle').on('click', function () {
        timeLay();
    })

    $('#btn-yes').on('click', function () {
        var add_input = $('.man-input');
        var reduce_input = $('.jian-input');
        var st = $('#start-time').text();
        var end = $('#end-time').text();
        st = new Date(Date.parse(st.replace(/-/g, "/")));
        st = st.getTime() / 1000;
        end = new Date(Date.parse(end.replace(/-/g, "/")));
        end = end.getTime() / 1000;
        var tt = "";

        if (!$('#act-name').val()) {
            bridge.dialog({
                title: "提示",
                content: "请输入活动标题",
                type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
                buttons: [{
                    text: 'ok'
                }]
            });
            return;
        }

        if (!st || !end) {
            bridge.dialog({
                title: "提示",
                content: "请设置日期",
                type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
                buttons: [{
                    text: 'ok'
                }]
            });
            return;
        }

        for (var i = 0; i < add_input.length; i++) {
            var arry = {};
            if ($(add_input[i]).val() == "" || $(reduce_input[i]).val() == "") {
                bridge.dialog({
                    title: "提示",
                    content: "请设置满减金额",
                    type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
                    buttons: [{
                        text: 'ok'
                    }]
                });
                return;
            };

            arry["discountAmount"] = Number($(reduce_input[i]).val()).toFixed(0);
            arry["fullAmount"] = Number($(add_input[i]).val()).toFixed(0);
            tt += JSON.stringify(arry) + ',';
        }

        tt = tt.substring(0, tt.length - 1);

        if ($('#pick-user').text() == "请设置面向用户") {
            bridge.dialog({
                title: "提示",
                content: "请设置面向用户",
                type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
                buttons: [{
                    text: 'ok'
                }]
            });
            return;
        }

        if ($('#pick-cycle').text() == "未设置") {
            bridge.dialog({
                title: "提示",
                content: "请设置周期",
                type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
                buttons: [{
                    text: 'ok'
                }]
            });
            return;
        }

        let obj = {
            storeId: 1,
            name: $('#act-name').val(),
            startTime: st,
            endTime: end,
            marketingType: 1,
            limitUser: limitUser,
            marketingMeta: "[" + tt + "]",
            meta: "{'spans':" + JSON.stringify(PageExtends.loop) + "}"
        };

        console.log(obj);

        PromotionApis.promotionInstanceAdd(obj).then(data => {
            console.log(data);
            bridge.dialog({
                title: "提示",
                content: "提交成功",
                type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
                buttons: [{
                    text: 'ok'
                }],
                complete: function (_) {
                    window.location.href = "#/";
                }
            });

        }).catch(err => console.log(err));
    })

}

//循环周期弹框
function timeLay() {

    $('#pick-cycle').text('请设置周期');
    var t = "";
    t += `<div class="lay">
    <div class="row-time">
        <h1>周一</h1>
        <button class="btn" data-num="1"></button>
    </div>
    <div class="row-time">
        <h1>周二</h1>
        <button class="btn" data-num="2"></button>
    </div>
    <div class="row-time">
        <h1>周三</h1>
        <button class="btn" data-num="3"></button>
    </div>
    <div class="row-time">
        <h1>周四</h1>
        <button class="btn" data-num="4"></button>
    </div>
    <div class="row-time">
        <h1>周五</h1>
        <button class="btn" data-num="5"></button>
    </div>
    <div class="row-time">
        <h1>周六</h1>
        <button class="btn" data-num="6"></button>
    </div>
    <div class="row-time">
        <h1>周日</h1>
        <button class="btn" data-num="7"></button>
    </div>
    <div class="br"></div>
    <div class="row-ad">
        <h1>生效时段</h1>
        <button class="btn-2"></button>
        <span>全天有效</span>
    </div>
    <div class="br"></div>
    <div class="l-part">
    <div class="time-pick">
    </div>
    <div class="row-2">
    <i></i>新增时段
 </div>
 </div>
    <button class="btn-yes">确定</button>
 </div>`

    $('.wrap').append(t);

    if (PageExtends.loop.length === 0) {

    }
    else {

        var dateOptions = $('.lay .row-time');
        var hg = "";

        //选中日期
        for (var i = 0; i < PageExtends.loop[0].l.length; i++) {
            for (var j = 0; j < dateOptions.length; j++) {
                if (PageExtends.loop[0].l[i] == $(dateOptions[j]).find('.btn').data('num')) {
                    $(dateOptions[j]).find('.btn').addClass('active');
                }
            }
        }

        if (PageExtends.loop[0].all == true) {
            $('.time-pick').empty();
            $('.btn-2').addClass('active');
            for (var j = 1; j < PageExtends.loop.length; j++) {
                hg += `<div class="row-line">` + PageExtends.loop[j].s + ` 至 ` + PageExtends.loop[j].e + `</div>`;
            }
            $('.time-pick').append(hg);
        }
        else {
            $('.time-pick').empty();
            $('.bnt-2').addClass('active');
            for (var j = 0; j < PageExtends.loop.length; j++) {
                hg += `<div class="row-line">` + PageExtends.loop[j].s + ` 至 ` + PageExtends.loop[j].e + `</div>`;
            }

            $('.time-pick').append(hg);
        }

    }

    var item = $('.row-line');

    if (item.length >= 3) {
        $('.row-2').remove();
    }

    if ($('.btn-2.active').length > 0) {
        $('.time-pick').empty();
        $('.row-2').remove();
    }

    $('.l-part').on('click', '.row-2', function () {
        var item = $('.row-line');
        var t = `<div class="row-line">无</div>`;
        $('.time-pick').append(t);
        if (item.length >= 2) {
            $('.row-2').remove();
            return;
        }
    })

    $('.l-part').on('click', '.row-line', function () {
        $('.pop').remove();
        var $this = $(this);
        pop($this);
    })

    //选择日期
    $('.row-time').on('click', function () {
        var $this = $(this).find('button');
        $this.toggleClass('active');
    })

    //点击选择有效时段
    $('.btn-2').on('click', function () {
        var $this = $(this);
        $this.toggleClass('active');
        if ($('.btn-2.active').length > 0) {
            $('.time-pick').empty();
            $('.row-2').remove();
        } else {
            var t = '<div class="row-2"><i></i>新增时段</div>';
            $('.l-part').append(t);
        }
    })

    //点击确定关闭弹框
    $('.lay .btn-yes').on('click', function () {

        //解绑点击事件
        $(document).unbind('click', '.row-2', function () {
            var item = $('.row-line');
            var t = `<div class="row-line">无</div>`;
            $('.time-pick').append(t);
            if (item.length >= 2) {
                $('.row-2').remove();
                return;
            }

        })

        //解绑点击事件
        $(document).unbind('click', '.row-line', function () {
            $('.pop').remove();
            var $this = $(this);
            pop($this);
        })

        var obj1 = {};
        var arr1: any[] = [];
        var arr2: any[] = [];

        var arr: string[] = [];
        for (let i = 0; i <= 23; i++) {
            if (i < 10) {
                arr.push('0' + i + ':00');
                arr.push('0' + i + ':30');
            } else {
                arr.push(i + ':00');
                arr.push(i + ':30');
            }
        }

        //时间段
        var rows = $('.row-line');
        //星期
        var days = $('.row-time .btn.active');

        if (days.length <= 0) {
            bridge.dialog({
                title: "提示",
                content: "请选择日期",
                type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
                buttons: [{
                    text: 'ok'
                }]
            });
            return;
        }

        if ($('.btn-2.active').length > 0) {
            for (var j = 0; j < days.length; j++) {
                arr1.push($(days[j]).data('num'));
            }
            obj1["all"] = true;
            obj1["l"] = arr1;
            arr2.push(obj1);
        }

        else {

            if (rows.length <= 0) {
                bridge.dialog({
                    title: "提示",
                    content: "请选择时段",
                    type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
                    buttons: [{
                        text: 'ok'
                    }]
                });
                return;
            }

            for (var j = 0; j < days.length; j++) {
                arr1.push($(days[j]).data('num'));
            }

            for (var i = 0; i < rows.length; i++) {
                if ($(rows[i]).text() == "无") continue;
                var min = "";
                var max = "";
                obj1 = {};
                min = $(rows[i]).text().split(' 至 ')[0];
                max = $(rows[i]).text().split(' 至 ')[1];
                obj1["s"] = min;
                obj1["e"] = max;
                obj1["l"] = arr1;
                arr2.push(obj1);
            }

            for (var h = 0; h < arr2.length; h++) {
                for (var k = h + 1; k < arr2.length; k++) {
                    if (arr2[h].s > arr2[k].s) {
                        if (arr.indexOf(arr2[h].s) < arr.indexOf(arr2[k].e)) {
                            bridge.dialog({
                                title: "提示",
                                content: "时间段不能重叠！",
                                type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
                                buttons: [{
                                    text: 'ok'
                                }]
                            });
                            return;
                        }
                    }

                    if (arr2[h].s < arr2[k].s) {
                        if (arr.indexOf(arr2[k].s) < arr.indexOf(arr2[h].e)) {
                            bridge.dialog({
                                title: "提示",
                                content: "时间段不能重叠！",
                                type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
                                buttons: [{
                                    text: 'ok'
                                }]
                            });
                            return;
                        }
                    }

                    if (arr2[h].s == arr2[k].s) {
                        bridge.dialog({
                            title: "提示",
                            content: "时间段不能重叠！",
                            type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
                            buttons: [{
                                text: 'ok'
                            }]
                        });
                        return;
                    }

                }

            }
        }

        PageExtends.loop = arr2;

        $('.lay').remove();
        if (PageExtends.loop) {
            $('#pick-cycle').text('已设置周期');
        }
    })

}

//选择弹框
function pop(obj) {
    var h = "";
    h += '<div class="pop">' +
        '<div class="shadow" ></div >' +
        ' <div class="pop-contain">' +
        '<div class="pop-head">' +
        ' <span class="title lf">取消</span>' +
        ' <span class="title lr">确定</span>' +
        '</div>' +
        '<h1 class="sw-1">开始时间</h1>' +
        '<div class="swiper-container1" >' +
        '<div class="swiper-wrapper">' +
        ' </div >' +
        ' </div >' +
        '<h1 class="sw-2">结束时间</h1>' +
        '<div class="swiper-container2" >' +
        '<div class="swiper-wrapper">' +

        ' </div >' +
        ' </div >' +
        ' </div>' +
        ' </div >'

    $('.lay').append(h);

    var arr: string[] = [];
    var sw1 = "";
    for (let i = 0; i <= 23; i++) {
        if (i < 10) {
            arr.push('0' + i + ':00');
            arr.push('0' + i + ':30');
        } else {
            arr.push(i + ':00');
            arr.push(i + ':30');
        }
    }

    for (let i in arr) {
        sw1 += '<div class="swiper-slide">' + arr[i] + '</div>';
    }

    $('.swiper-container1 .swiper-wrapper').append(sw1);
    $('.swiper-container2 .swiper-wrapper').append(sw1);

    // let mySwiper1 = 
    new Swiper('.swiper-container1', {
        direction: 'vertical',
        slidesPerView: 'auto',
        centeredSlides: true,
        onSlideChangeEnd: function (_swiper) {
            $('.swiper-container2 .swiper-wrapper').empty();
            var arr2: string[] = [];
            var sw2 = "";
            var time = $('.swiper-container1 .swiper-slide-active').text();
            var num = arr.indexOf(time);
            arr2 = arr.slice(num + 1, arr.length);

            for (var i in arr2) {
                sw2 += '<div class="swiper-slide">' + arr2[i] + '</div>';
            }

            $('.swiper-container2 .swiper-wrapper').append(sw2);
            mySwiper2.slideTo(0, 1000, false);
        }
    });

    var mySwiper2 = new Swiper('.swiper-container2', {
        direction: 'vertical',
        slidesPerView: 'auto',
        centeredSlides: true,
        observer: true,
    });


    $('.lf').on('click', function () {
        $('.pop').remove();
    });

    $('.lr').on('click', function () {
        st_time = $('.swiper-container1 .swiper-slide-active').text();
        end_time = $('.swiper-container2 .swiper-slide-active').text();
        if (st_time == end_time || !end_time) {
            bridge.dialog({
                title: "提示",
                content: "请选择正确的时间段！",
                type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
                buttons: [{
                    text: 'ok'
                }]
            });
            return;
        } else {
            obj.text(st_time + ' 至 ' + end_time);
            $('.pop').remove();
        }
    });
}

export default {
    name: 'setmanjian',
    render: function () {
        let url = new HashUrl();
        if (url.query.id) {
            PromotionApis.getPromotionDetail({ storeId: 1, activityId: url.query.id }).then(data => {
                resetStart(data);
            })
        }
        else {
            start();
        }
    }
};