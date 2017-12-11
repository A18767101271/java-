import '../../sass/SetHomePage.scss';
import PageExtends from '../PageExtends.js';
  
import PromotionApis from '../../../../services/promotion-apis';
import { HashUrl } from '../../../../assets/libs/hash-router';

import bridge from '../../../../assets/libs/sardine-bridge';

const Swiper = (window as any).Swiper;
const $ = (window as any).$;

let st_time = "";
let end_time = "";

PageExtends.st = PageExtends.st || "请设置日期";
PageExtends.end = PageExtends.end || "请设置日期";

function start() {

    var arr1 = ['全部用户', '', '', '门店新用户', '门店老用户'];
    //商品名称
    PageExtends.name = PageExtends.name || "请选择商品";
    //设置方式
    PageExtends.actype = PageExtends.actype || "按活动价"
    //活动价格
    PageExtends.b1 = PageExtends.b1 || "";
    //折扣范围
    PageExtends.b2 = PageExtends.b2 || "";
    //折扣价格
    PageExtends.b3 = PageExtends.b3 || "";
    //面向用户
    PageExtends.c1 = arr1[PageExtends.c1] || "未设置";
    //限购数量
    PageExtends.limitNum = PageExtends.limitNum || "不限";
    //循环周期
    PageExtends.loop = PageExtends.loop || [];

    var h = "";
    h += `<div class="l-label">
 <div class="left fl">起始日期</div>
 <div class="right fr">
     <span id="start-time">` + PageExtends.st + `</span>
     <i></i>
 </div>
 </div>
 <div class="l-label">
 <div class="left fl">终止日期</div>
 <div class="right fr">
     <span id="end-time">` + PageExtends.end + `</span>
     <i></i>
 </div>
 </div>
 
 <div class="l-label" id="pick-goods">
 <div class="left fl">商品项目</div>
 <div class="right fr">
     <span class="span-goods">` + PageExtends.name + `</span>
     <i></i>
 </div>
 </div>
 
 <div class="l-label">
 <div class="left fl">设置方式</div>
 <div class="right fr">
     <span id="pick-type">`+ PageExtends.actype + `</span>
     <i></i>
 </div>
 </div>
 
 <div class="choose">
 
 </div>
 
 <div class="l-label-place">
 <div class="left fl">每单限购</div>
 <div class="right fr"><input type="number" class="man-input" placeholder="不限" value="`+ PageExtends.limitNum + `" id="num-input"></div>
 <span>设置后用户在规定数量内享受折扣，超出部分恢复原价</span>
 </div>
 
 
 <div class="l-title">
 <i></i>
 <span>活动信息</span>
 </div>

    <div class="l-label">
    <div class="left fl">面向用户</div>
    <div class="right fr">
        <span id="pick-channel">`+ PageExtends.c1 + `</span>
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

    channel();

    var limitUser;

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
                console.log(data);
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
    $('#pick-channel').on('click', function () {
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

    //点击选择方式
    $('#pick-type').on('click', function () {
        var $this = $(this);
        bridge.picker({
            title: "设置方式",
            data: //单列选取自定义数据
                {
                    type: 'items', //表示自定义输入数据
                    depth: 1,
                    items: [{
                        text: '按活动价',
                        value: '0',
                    },
                    {
                        text: '按折扣价',
                        value: '1'
                    }
                    ]
                },
            complete: function (data) {
                console.log(data);
                if (data.resultCode == 'success') {
                    $this.text(data.resultText[0]);
                    channel();
                }
            }
        });
    })

    //点击循环周期
    $('#pick-cycle').on('click', function () {
        timeLay();
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

    $('#pick-goods').on('click', function () {
        PageExtends.st = $('#start-time').text();
        PageExtends.end = $('#end-time').text();
        PageExtends.name = $('.span-goods').text();
        PageExtends.limitNum = $('#num-input').val();
        PageExtends.c1 = limitUser;
        PageExtends.actype = $('#pick-type').text();
        PageExtends.b1 = $('.price-input').val();
        PageExtends.b2 = $('.zhekou-input').val();
        PageExtends.b3 = $('.price-input').val();
        window.location.href = "#/choosediscount";
    })

    $('#btn-yes').on('click', function () {

        var st = $('#start-time').text();
        var end = $('#end-time').text();

        st = new Date(Date.parse(st.replace(/-/g, "/")));
        st = st.getTime() / 1000;
        end = new Date(Date.parse(end.replace(/-/g, "/")));
        end = end.getTime() / 1000;

        var pick_type = $('#pick-type').text();
        var num_input = $('#num-input').val();

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

        if ($('.span-goods').text() == "请选择商品项目") {
            bridge.dialog({
                title: "提示",
                content: "请选择商品",
                type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
                buttons: [{
                    text: 'ok'
                }]
            });
            return;
        }

        if ($('#pick-channel').text() == "未设置") {
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
                content: "请设置循环周期",
                type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
                buttons: [{
                    text: 'ok'
                }]
            });
            return;
        }

        var mark = {};

        if (num_input == "") {
            mark["limitNum"] = "不限";
        }
        else {
            mark["limitNum"] = Number(num_input).toFixed(0);
        }

        if (pick_type == "按活动价") {
            let money = $('.price-input').val();
            mark["productActType"] = "按活动价";
            mark["activityPrice"] = (parseInt(money)) * 100;
            mark["productId"] = PageExtends.larry2.productId;
            mark["productName"] = PageExtends.name;
        } else {
            var money = $('.price-input').val();
            var zhekou = $('.zhekou-input').val();
            mark["productActType"] = "按折扣价";
            mark["discountPrice"] = parseInt(money) * 100;
            mark["discountScope"] = Number(zhekou).toFixed(2);
            mark["productId"] = PageExtends.larry2.productId;
            mark["productName"] = PageExtends.name;
        }

        let obj = {

            storeId: 1,
            name: $('.span-goods').text(),
            startTime: st,
            endTime: end,
            marketingType: 2,
            limitUser: limitUser,
            marketingMeta: "[" + JSON.stringify(mark) + "]",
            meta: "{'spans':" + JSON.stringify(PageExtends.loop) + "}"
        };

        PromotionApis.promotionInstanceAdd(obj).then(_ => {
            bridge.dialog({
                title: "提示",
                content: "提交成功",
                type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
                buttons: [{
                    text: 'ok'
                }],
                complete: function (_data) {
                    window.location.href = "#/";
                }
            });
        }).catch(err => {
            console.log(err);
        });



    })

}

function resetStart(data) {
    console.log(data);
    var arr1 = ['全部用户', '', '', '门店新用户', '门店老用户'];
    var data2 = data.marketingMeta.singlePromotion;
    if (typeof data2 == "string") {
        data2 = JSON.parse(data.marketingMeta.singlePromotion);
    }
    //商品名称
    PageExtends.name = PageExtends.name || data.name;
    //设置方式
    PageExtends.actype = PageExtends.actype || data2[0].productActType;
    //活动价格
    PageExtends.b1 = PageExtends.b1 || data2[0].activityPrice;
    //折扣范围
    PageExtends.b2 = PageExtends.b2 || data2[0].discountScope;
    //折扣价格
    PageExtends.b3 = PageExtends.b3 || data2[0].discountPrice;
    //面向用户
    PageExtends.c1 = arr1[PageExtends.c1] || arr1[data.limitUser];
    //限购数量
    PageExtends.limitNum = PageExtends.limitNum || data2[0].limitNum;
    //循环周期
    PageExtends.loop = PageExtends.loop || data.meta.limitSpans.spans;
    //已选商品
    PageExtends.larry2 = PageExtends.larry2 || data2[0];

    var h = "";
    h += `<div class="l-label">
 <div class="left fl">起始日期</div>
 <div class="right fr">
     <span id="start-time">` + PageExtends.st + `</span>
     <i></i>
 </div>
 </div>
 <div class="l-label">
 <div class="left fl">终止日期</div>
 <div class="right fr">
     <span id="end-time">` + PageExtends.end + `</span>
     <i></i>
 </div>
 </div>
 
 <div class="l-label" id="pick-goods">
 <div class="left fl">商品项目</div>
 <div class="right fr">
     <span class="span-goods">` + PageExtends.name + `</span>
     <i></i>
 </div>
 </div>
 
 <div class="l-label">
 <div class="left fl">设置方式</div>
 <div class="right fr">
     <span id="pick-type">`+ PageExtends.actype + `</span>
     <i></i>
 </div>
 </div>
 
 <div class="choose">
 
 </div>
 
 <div class="l-label-place">
 <div class="left fl">每单限购</div>
 <div class="right fr"><input type="number" class="man-input" value="`+ PageExtends.limitNum + `" id="num-input"></div>
 <span>设置后用户在规定数量内享受折扣，超出部分恢复原价</span>
 </div>
 
 <div class="l-title">
 <i></i>
 <span>活动信息</span>
 </div>
 
 <div class="l-label">
 <div class="left fl">面向用户</div>
 <div class="right fr">
     <span id="pick-channel">` + PageExtends.c1 + `</span>
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

    channel();

    var limitUser;

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
                console.log(data);
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
    $('#pick-channel').on('click', function () {
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

    //点击选择方式
    $('#pick-type').on('click', function () {
        var $this = $(this);
        bridge.picker({
            title: "设置方式",
            data: //单列选取自定义数据
                {
                    type: 'items', //表示自定义输入数据
                    depth: 1,
                    items: [{
                        text: '按活动价',
                        value: '0',
                    },
                    {
                        text: '按折扣价',
                        value: '1'
                    }
                    ]
                },
            complete: function (data) {
                console.log(data);
                if (data.resultCode == 'success') {
                    $this.text(data.resultText[0]);
                    channel();
                }
            }
        });
    })

    //点击循环周期
    $('#pick-cycle').on('click', function () {
        timeLay();
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

    $('#pick-goods').on('click', function () {
        PageExtends.st = $('#start-time').text();
        PageExtends.end = $('#end-time').text();
        PageExtends.name = $('.span-goods').text();
        PageExtends.limitNum = $('#num-input').val();
        PageExtends.c1 = limitUser;
        PageExtends.actype = $('#pick-type').text();
        PageExtends.b1 = $('.price-input').val();
        PageExtends.b2 = $('.zhekou-input').val();
        PageExtends.b3 = $('.price-input').val();
        window.location.href = "#/choosediscount";
    })


    $('#btn-yes').on('click', function () {

        var st = $('#start-time').text();
        var end = $('#end-time').text();
        st = new Date(Date.parse(st.replace(/-/g, "/")));
        st = st.getTime() / 1000;
        end = new Date(Date.parse(end.replace(/-/g, "/")));
        end = end.getTime() / 1000;

        var pick_type = $('#pick-type').text();
        var num_input = $('#num-input').val();

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

        if ($('.span-goods').text() == "请选择商品项目") {
            bridge.dialog({
                title: "提示",
                content: "请选择商品",
                type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
                buttons: [{
                    text: 'ok'
                }]
            });
            return;
        }

        if ($('#pick-channel').text() == "未设置") {
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
                content: "请设置循环周期",
                type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
                buttons: [{
                    text: 'ok'
                }]
            });
            return;
        }

        var mark = {};

        if (num_input == "") {
            mark["limitNum"] = "不限";
        }
        else {
            mark["limitNum"] = Number(num_input).toFixed(0);
        }

        if (pick_type == "按活动价") {
            let money = $('.price-input').val();
            mark["productActType"] = "按活动价";
            mark["activityPrice"] = (parseInt(money)) * 100;
            mark["productId"] = PageExtends.larry2.productId;
            mark["productName"] = PageExtends.name;
        } else {
            var money = $('.price-input').val();
            var zhekou = $('.zhekou-input').val();
            mark["productActType"] = "按折扣价";
            mark["discountPrice"] = parseInt(money) * 100;
            mark["discountScope"] = Number(zhekou).toFixed(2);
            mark["productId"] = PageExtends.larry2.productId;
            mark["productName"] = PageExtends.name;
        }

        let obj = {
            storeId: 1,
            name: $('.span-goods').text(),
            startTime: st,
            endTime: end,
            marketingType: 2,
            limitUser: limitUser,
            marketingMeta: "[" + JSON.stringify(mark) + "]",
            meta: "{'spans':" + JSON.stringify(PageExtends.loop) + "}"
        };

        console.log(obj);

        PromotionApis.promotionInstanceAdd(obj).then(_ => {
            bridge.dialog({
                title: "提示",
                content: "提交成功",
                type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
                buttons: [{
                    text: 'ok'
                }],
                complete: function (_data) {
                    window.location.href = "#/";
                }
            });
        }).catch(err => {
            console.log(err);
        });



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

//切换设置方式
function channel() {
    $('.choose').empty();
    if ($('#pick-type').text() == "按活动价") {
        var t = '';
        t += `<div class="l-label">
        <div class="left fl">活动价格</div>
        <div class="right fr"><input type="number" class="price-input" value="`+ PageExtends.b1 + `"><span>元</span></div>
        </div>`
    } else {
        var t = '';
        t += `<div class="l-label">
        <div class="left fl">折扣范围</div>
        <div class="right fr"><input type="number" class="zhekou-input" value="`+ PageExtends.b2 + `"><span>折</span></div>
        </div>
        <div class="l-label">
        <div class="left fl">折扣后价格</div>
        <div class="right fr"><input type="number" class="price-input" value="`+ PageExtends.b3 / 100 + `"><span>元</span></div>
        </div>`
    }
    $('.choose').append(t);
}

export default {
    name: 'setzhekou',
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