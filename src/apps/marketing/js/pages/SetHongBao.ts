import '../../sass/SetHomePage.scss';
import PromotionApis from '../../../../services/promotion-apis';
import '../lib-bridge.js';
import '../console.log.js';
import { HashUrl } from '../../../../assets/libs/hash-router';

const bridge = (window as any).lib.bridge;
const $ = (window as any).$;

function start() {
    var h = "";
    h += `<div class="l-label">
 <div class="left fl">红包类型</div>
 <div class="right fr">
    <span class="distt">满减券</span>
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
 
 <div class="l-label">
 <div class="left fl">发券数量</div>
 <div class="right fr"><input type="number" class="num-input" placeholder="在此输入数量，默认不限" value="" id="num-input"></div>
 </div>
 </div>
 
 </div>
 
 <div class="l-title">
 <i></i>
 <span>活动信息</span>
 </div>
 
 <div class="l-label">
 <div class="left fl">面向用户</div>
 <div class="right fr">
     <span id="pick-user">未设置</span>
     <i></i>
 </div>
 </div>
 
 <div class="l-label">
 <div class="left fl">发放途径</div>
 <div class="right fr">
     <span id="pick-channel">未设置</span>
     <i></i>
 </div>
 </div>
 
 <div class="l-label">
 <div class="left fl">有效期限</div>
 <div class="right fr">
     <span id="pick-time">未设置</span>
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

    var limitUser;
    var grantWay;
    var limitDate;

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
                console.log(data);
                if (data.resultCode == 'success') {
                    $this.text(data.resultText[0]);
                    limitUser = data.selectedValue[0];
                }
            }
        });
    })

    //点击选择发放途径
    $('#pick-channel').on('click', function () {
        var $this = $(this);
        bridge.picker({
            title: "面向用户",
            data: //单列选取自定义数据
                {
                    type: 'items', //表示自定义输入数据
                    depth: 1,
                    items: [{
                        text: '仅限店内',
                        value: '1',
                    },
                    {
                        text: '仅限店外',
                        value: '2'
                    },
                    {
                        text: '店内店外',
                        value: '3'
                    }
                    ]
                },
            complete: function (data) {
                console.log(data);
                if (data.resultCode == 'success') {
                    $this.text(data.resultText[0]);
                    grantWay = data.selectedValue[0];
                }
            }
        });
    })

    //点击选择有效期
    $('#pick-time').on('click', function () {
        var $this = $(this);
        bridge.picker({
            title: "有效期限",
            data: //单列选取自定义数据
                {
                    type: 'items', //表示自定义输入数据
                    depth: 1,
                    items: [{
                        text: '1天',
                        value: '0',
                    },
                    {
                        text: '2天',
                        value: '1',
                    },
                    {
                        text: '3天',
                        value: '2',
                    },
                    {
                        text: '4天',
                        value: '3',
                    },
                    {
                        text: '5天',
                        value: '4',
                    },
                    {
                        text: '6天',
                        value: '5',
                    },
                    {
                        text: '7天',
                        value: '6',
                    },
                    {
                        text: '8天',
                        value: '7',
                    },
                    {
                        text: '9天',
                        value: '8',
                    },
                    {
                        text: '10天',
                        value: '9',
                    },
                    {
                        text: '11天',
                        value: '10',
                    },
                    {
                        text: '12天',
                        value: '11',
                    },
                    {
                        text: '13天',
                        value: '12',
                    },
                    {
                        text: '14天',
                        value: '13',
                    },
                    {
                        text: '15天',
                        value: '14',
                    }
                    ]
                },
            complete: function (data) {
                console.log(data);
                if (data.resultCode == 'success') {
                    $this.text(data.resultText[0]);
                    limitDate = data.resultText[0];
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

    //提交
    $('#btn-yes').on('click', function () {
        var add_input = $('.man-input').val();
        var reduce_input = $('.jian-input').val();
        var num_input = $('#num-input').val();
        var pick_time = $('#pick-time').text();
        var pick_channel = $('#pick-channel').text();
        var st = $('#start-time').text();
        var end = $('#end-time').text();
        st = new Date(Date.parse(st.replace(/-/g, "/")));
        st = st.getTime() / 1000;
        end = new Date(Date.parse(end.replace(/-/g, "/")));
        end = end.getTime() / 1000;


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

        if (add_input == "" || reduce_input == "") {
            bridge.dialog({
                title: "提示",
                content: "请设置金额",
                type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
                buttons: [{
                    text: 'ok'
                }]
            });
            return;
        };

        if (pick_channel == "未设置") {
            bridge.dialog({
                title: "提示",
                content: "请设置发放途径",
                type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
                buttons: [{
                    text: 'ok'
                }]
            });
            return;
        }

        if (pick_time == "未设置") {
            bridge.dialog({
                title: "提示",
                content: "请设置有效期",
                type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
                buttons: [{
                    text: 'ok'
                }]
            });
            return;
        }



        let obj1: any = {};
        let arr: any[] = [];
        if (num_input == "") {
            obj1["couponNum"] = "不限";
        }
        else {
            obj1["couponNum"] = Number(num_input).toFixed(0);
        }
        obj1["discountAmount"] = Number(reduce_input).toFixed(0);
        obj1["fullAmount"] = Number(add_input).toFixed(0);
        obj1["grantWay"] = grantWay;
        obj1["couponType"] = "满减券";
        obj1["limitDate"] = limitDate;

        arr.push(obj1);

        let obj2 = {
            storeId: 1,
            name: "满减券",
            startTime: st,
            endTime: end,
            marketingType: 5,
            limitUser: limitUser,
            marketingMeta: JSON.stringify(arr)
        };

        console.log(obj2);

        PromotionApis.promotionInstanceAdd(obj2).then(_data => {
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
        }).catch(err => console.log(err));

    })

}

function resetStart(data) {
    console.log(data);
    var arr1 = ['全部用户', '', '', '门店新用户', '门店老用户'];
    var arr2 = ['', '仅限店内', '仅限店外', '店内店外'];
    var data2 = data.marketingMeta.redPacket;
    if (typeof data2 == "string") {
        data2 = JSON.parse(data.marketingMeta.redPacket);
    }

    var h = "";
    h += `<div class="l-label">
 <div class="left fl">红包类型</div>
 <div class="right fr">
    <span class="distt">满减券</span>
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
 
 <div class="l-manjian">
 <div class="l-label">
 <div class="left fl">满</div>
 <div class="right fr"><input type="number" placeholder="在此输入金额" value="`+ data2[0].fullAmount + `" class="man-input">元</div>
 </div>
 
 <div class="l-label">
 <div class="left fl">减</div>
 <div class="right fr"><input type="number" placeholder="在此输入金额" value="`+ data2[0].discountAmount + `" class="jian-input">元</div>
 </div>
 </div>
 
 <div class="l-label">
 <div class="left fl">发券数量</div>
 <div class="right fr"><input type="number" class="num-input" placeholder="在此输入数量" value="`+ data2[0].couponNum + `" id="num-input">张</div>
 </div>
 </div>
 
 </div>
 
 <div class="l-title">
 <i></i>
 <span>活动信息</span>
 </div>
 
 <div class="l-label">
 <div class="left fl">面向用户</div>
 <div class="right fr">
     <span id="pick-user">`+ arr1[data.limitUser] + `</span>
     <i></i>
 </div>
 </div>
 
 <div class="l-label">
 <div class="left fl">发放途径</div>
 <div class="right fr">
     <span id="pick-channel">`+ arr2[data2[0].grantWay] + `</span>
     <i></i>
 </div>
 </div>
 
 <div class="l-label">
 <div class="left fl">有效期限</div>
 <div class="right fr">
     <span id="pick-time">领券后`+ data2[0].limitDate + `</span>
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

    var limitUser = data.limitUser;
    var grantWay = data2[0].grantWay;
    var limitDate = data2[0].limitDate;

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
                        value: '2'
                    }
                    ]
                },
            complete: function (data) {
                console.log(data);
                if (data.resultCode == 'success') {
                    $this.text(data.resultText[0]);
                    limitUser = data.selectedValue[0];
                }
            }
        });
    })

    //点击选择发放途径
    $('#pick-channel').on('click', function () {
        var $this = $(this);
        bridge.picker({
            title: "面向用户",
            data: //单列选取自定义数据
                {
                    type: 'items', //表示自定义输入数据
                    depth: 1,
                    items: [{
                        text: '仅限店内',
                        value: '1',
                    },
                    {
                        text: '仅限店外',
                        value: '2'
                    },
                    {
                        text: '店内店外',
                        value: '3'
                    }
                    ]
                },
            complete: function (data) {
                console.log(data);
                if (data.resultCode == 'success') {
                    $this.text(data.resultText[0]);
                    grantWay = data.selectedValue[0];
                }
            }
        });
    })

    //点击选择有效期
    $('#pick-time').on('click', function () {
        var $this = $(this);
        bridge.picker({
            title: "有效期限",
            data: //单列选取自定义数据
                {
                    type: 'items', //表示自定义输入数据
                    depth: 1,
                    items: [{
                        text: '1天',
                        value: '0',
                    },
                    {
                        text: '2天',
                        value: '1',
                    },
                    {
                        text: '3天',
                        value: '2',
                    },
                    {
                        text: '4天',
                        value: '3',
                    },
                    {
                        text: '5天',
                        value: '4',
                    },
                    {
                        text: '6天',
                        value: '5',
                    },
                    {
                        text: '7天',
                        value: '6',
                    },
                    {
                        text: '8天',
                        value: '7',
                    },
                    {
                        text: '9天',
                        value: '8',
                    },
                    {
                        text: '10天',
                        value: '9',
                    },
                    {
                        text: '11天',
                        value: '10',
                    },
                    {
                        text: '12天',
                        value: '11',
                    },
                    {
                        text: '13天',
                        value: '12',
                    },
                    {
                        text: '14天',
                        value: '13',
                    },
                    {
                        text: '15天',
                        value: '14',
                    }
                    ]
                },
            complete: function (data) {
                console.log(data);
                if (data.resultCode == 'success') {
                    $this.text(data.resultText[0]);
                    limitDate = data.resultText[0];
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

    //提交
    $('#btn-yes').on('click', function () {
        var add_input = $('.man-input').val();
        var reduce_input = $('.jian-input').val();
        var num_input = $('#num-input').val();
        var pick_time = $('#pick-time').text();
        var pick_channel = $('#pick-channel').text();
        var st = $('#start-time').text();
        var end = $('#end-time').text();
        st = new Date(Date.parse(st.replace(/-/g, "/")));
        st = st.getTime() / 1000;
        end = new Date(Date.parse(end.replace(/-/g, "/")));
        end = end.getTime() / 1000;


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

        if (add_input == "" || reduce_input == "") {
            bridge.dialog({
                title: "提示",
                content: "请设置金额",
                type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
                buttons: [{
                    text: 'ok'
                }]
            });
            return;
        };

        if (pick_channel == "未设置") {
            bridge.dialog({
                title: "提示",
                content: "请设置发放途径",
                type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
                buttons: [{
                    text: 'ok'
                }]
            });
            return;
        }

        if (pick_time == "未设置") {
            bridge.dialog({
                title: "提示",
                content: "请设置有效期",
                type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
                buttons: [{
                    text: 'ok'
                }]
            });
            return;
        }

        let obj1: any = {};
        let arr: any[] = [];

        if (num_input == "") {
            obj1["couponNum"] = "不限";
        }
        else {
            obj1["couponNum"] = Number(num_input).toFixed(0);
        }
        obj1["discountAmount"] = Number(reduce_input).toFixed(0);
        obj1["fullAmount"] = Number(add_input).toFixed(0);
        obj1["grantWay"] = grantWay;
        obj1["couponType"] = "满减券";
        obj1["limitDate"] = limitDate;
        arr.push(obj1);

        let obj2 = {
            storeId: 1,
            name: "满减券",
            startTime: st,
            endTime: end,
            marketingType: 5,
            limitUser: limitUser,
            marketingMeta: JSON.stringify(arr)
        };

        console.log(obj2);

        PromotionApis.promotionInstanceAdd(obj2).then(_data => {
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
        }).catch(err => console.log(err));

    })
}

export default {
    name: 'sethongbao',
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