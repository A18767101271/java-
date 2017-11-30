import '../../sass/HomePage.scss';
import PageExtends from '../PageExtends.js';
import '../lib-bridge.js';

let bridge = lib.bridge;

function showIndex() {

    var is_all;

    PageExtends.shopPhone = PageExtends.shopPhone || "";
    PageExtends.address = PageExtends.address || "";
    PageExtends.pickAddress = PageExtends.pickAddress || "请选择";
    PageExtends.pickType = PageExtends.pickType || "请选择";
    PageExtends.time = PageExtends.time || "请选择";
    PageExtends.text1 = PageExtends.text1 || '请上传';

    var html = "";
    html += '<header><span></span></header>' +
        ' <section>' +
        ' <div class="title"><i></i><span>店铺信息</span></div>' +
        ' <div class="line">' +
        '     <h1>门店电话</h1><input type="number" placeholder="请输入门店电话" id="shop-phone" value="' + PageExtends.shopPhone + '"/>' +
        ' </div>' +
        // ' <div class="line">' +
        // '     <h1>店铺地址</h1><input type="text" placeholder="请输入店铺地址" id="shop-address" value="' + PageExtends.address + '"/>' +
        // ' </div>' +
        ' <div class="line pick-address">' +
        '     <h1>详细地址</h1><i></i><span>' + PageExtends.pickAddress + '</span>' +
        ' </div>' +
        ' <div class="line pick-time">' +
        '     <h1>营业时间</h1><i></i><span>' + PageExtends.time + '</span>' +
        ' </div>' +
        ' <div class="line pick-type">' +
        '     <h1>营收模式</h1><i></i><span>' + PageExtends.pickType + '</span>' +
        ' </div>' +
        ' <div class="line upload">' +
        '     <h1>店铺门脸照</h1><i></i><span>' + PageExtends.text1 + '</span>' +
        ' </div>' +
        '</section>' +
        '<button class="btn-go" data-href="#/qinfo">下一步</button>'

    $('.wrap').append(html);


    $('.pick-address').on('click', function () {
        PageExtends.shopPhone = $('#shop-phone').val();
        PageExtends.address = $('#shop-address').val();
        PageExtends.time = $('.pick-time span').text();
        PageExtends.pickType = $('.pick-type span').text();
        PageExtends.text1 = $('.upload span').text();
        window.location.href = "#/pickaddress";
    })

    //选择营收模式
    $('.pick-type').on('click', function () {
        var $this = $(this);
        bridge.picker({
            title: "模式选择",
            data: //单列选取自定义数据
            {
                type: 'items', //表示自定义输入数据
                depth: 1,
                items: [{
                        text: '先吃后付',
                        value: '1',
                        //disabled: true // 禁用，可以看见但不可选择
                    },
                    {
                        text: '先付后吃',
                        value: '2'
                    }
                ]
            },
            //defaultValue: ['3'], //可选 默认值 数组长度和选择器列数对应
            complete: function (data) {

                if (data.resultCode == "success") {
                    PageExtends.is_type = data.selectedValue[0];
                    $this.find('span').text(data.resultText);
                    $this.addClass('finished');
                }
            }
        });
    });


    $('.upload').on("click", function () {
        PageExtends.shopPhone = $('#shop-phone').val();
        PageExtends.address = $('#shop-address').val();
        PageExtends.pickAddress = $('.pick-address span').text();
        PageExtends.time = $('.pick-time span').text();
        PageExtends.pickType = $('.pick-type span').text();
        window.location.href = "#/upimg";
    });

    $('.pick-time').on("click", function () {
        PageExtends.shopPhone = $('#shop-phone').val();
        PageExtends.address = $('#shop-address').val();
        PageExtends.pickAddress = $('.pick-address span').text();
        PageExtends.pickType = $('.pick-type span').text();
        PageExtends.text1 = $('.upload span').text();
        window.location.href = "#/picktime";

    });


    $('.btn-go').on('click', function () {

        var phone = $('#shop-phone').val();
        var address = $('#shop-address').val();
        var pick_time = $('.pick-time span').text();

        if (pick_time == "24小时") {
            is_all = true;
        } else {
            is_all = false;
        }

        var obj = {};
        obj.form_id = PageExtends.formId;
        obj.telephone = phone;
        obj.address = address;
        obj.store_location = PageExtends.store_location;
        obj.first_business_time = PageExtends.first_business_time;
        obj.second_business_time = PageExtends.second_business_time;
        obj.is_open_all_hours = is_all;
        obj.business_model = PageExtends.is_type;
        obj.resource_count = 1;
        obj.resource_uids = PageExtends.serverId;

        if (!phone) {
            bridge.dialog({
                title: "提示",
                content: '请输入门店电话',
                type: "alert",
                buttons: [{
                    text: 'ok'
                }],
            });

            return;
        }

        if (!address) {
            bridge.dialog({
                title: "提示",
                content: '请输入店铺地址',
                type: "alert",
                buttons: [{
                    text: 'ok'
                }],
            });

            return;
        }

        if (!PageExtends.store_location) {
            bridge.dialog({
                title: "提示",
                content: '请选择定位地址',
                type: "alert",
                buttons: [{
                    text: 'ok'
                }],
            });

            return;
        }

        if (!PageExtends.first_business_time) {
            bridge.dialog({
                title: "提示",
                content: '请选择营业时间',
                type: "alert",
                buttons: [{
                    text: 'ok'
                }],
            });

            return;
        }

        if (!PageExtends.is_type) {
            bridge.dialog({
                title: "提示",
                content: '请选择营业模式',
                type: "alert",
                buttons: [{
                    text: 'ok'
                }],
            });

            return;
        }

        if (!PageExtends.serverId) {
            bridge.dialog({
                title: "提示",
                content: '请上传店铺门脸照',
                type: "alert",
                buttons: [{
                    text: 'ok'
                }],
            });

            return;
        }

        console.log(obj);

        obj.success = function (data) {

                if (data.success == true) {
                    window.location.href = "#/qinfo";
                }
            },
            obj.error = function (data) {
                console.log(data);
            }
        PageExtends.API.storeFormBaseSave(obj);
    })

}

export default {
    name: 'shopinfo',
    render: function () {
        showIndex();
    }

}