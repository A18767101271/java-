import '../../sass/HomePage.scss';
import PageExtends from '../PageExtends.js';
import AMapLoader from '../../../../assets/libs/AMapLoader.js';
import bridge from '../../../../assets/libs/sardine-bridge';

function showNoPass() {

    var is_all;

    if (!PageExtends.Info) return;

    var data = PageExtends.Info;
    var arr = ['', '先吃后付', '先付后吃'];

    if (!data.telephone) {
        PageExtends.shopPhone = PageExtends.shopPhone || '';
        PageExtends.address = PageExtends.address || '请选择';
        PageExtends.pickType = PageExtends.pickType || "请选择";
        PageExtends.time = PageExtends.time || "请选择";
        PageExtends.text1 = PageExtends.text1 || '请上传';
    } else {

        PageExtends.shopPhone = PageExtends.shopPhone || data.telephone;
        PageExtends.address = PageExtends.address || data.address;
        PageExtends.pickType = PageExtends.pickType || data.businessModel;
        PageExtends.text1 = '已上传';

        if (data.isOpenAllHours == true) {
            PageExtends.time = PageExtends.time || '24小时';
        } else {
            var stArry = data.firstBusinessTime;
            var enArry = data.secondBusinessTime;
            var timeArry = [];
            if (enArry[0] == 0) {
                timeArry = stArry.toString().split(',');
            } else {
                timeArry = stArry.concat(enArry).toString().split(',');
            }

            var timeArry2 = [];
            for (var i = 0; i < timeArry.length; i++) {
                if (timeArry[i].length == 1) {
                    timeArry2.push("00:00");
                } else if (timeArry[i].length == 2) {
                    timeArry2.push("00:" + timeArry[i].substring(0, 1) + timeArry[i].substring(1));
                } else if (timeArry[i].length == 3) {
                    timeArry2.push("0" + timeArry[i].substring(0, 1) + ':' + timeArry[i].substring(1));
                } else {
                    if (timeArry[i].substring(0, 2) >= 24) {
                        timeArry2.push('次日0' + (Number(timeArry[i].substring(0, 2)) - Number(24)) + ':' + timeArry[i].substring(2));
                    } else {
                        timeArry2.push(timeArry[i].substring(0, 2) + ':' + timeArry[i].substring(2));
                    }
                }
            }

            var time = "";
            var len = timeArry2.length;
            if (len > 3) {
                time = timeArry2[0] + '~' + timeArry2[1] + ',' + timeArry2[2] + '~' + timeArry2[3];
            } else {
                time = timeArry2[0] + '~' + timeArry2[1];
            }

            PageExtends.time = PageExtends.time || time;
        }

    }

    var html = "";

    if (PageExtends.state == 2) {
        html += '<div class="pick-2"><div class="head-bar"><h1>审核失败</h1><span></span></div>'
    } else {
        html += '<div class="pick-2">'
    }

    html += '<section>' +
        ' <div class="title"><i></i><span>店铺信息</span></div>' +
        ' <div class="line">' +
        '     <h1>门店电话</h1><input type="number" placeholder="请输入门店电话" id="shop-phone" value="' + PageExtends.shopPhone + '"/>' +
        ' </div>' +
        ' <div class="line pick-address">' +
        '     <h1>详细地址</h1><i></i><span>' + PageExtends.address + '</span>' +
        ' </div>' +
        ' <div class="line pick-time">' +
        '     <h1>营业时间</h1><i></i><span>' + PageExtends.time + '</span>' +
        ' </div>' +
        ' <div class="line pick-type">' +
        '     <h1>营收模式</h1><i></i><span>' + arr[PageExtends.pickType] + '</span>' +
        ' </div>' +
        ' <div class="line upload">' +
        '     <h1>店铺门脸照</h1><i></i><span>' + PageExtends.text1 + '</span>' +
        ' </div>' +
        '</section>' +
        '<button class="btn-go" data-href="#/qinfo">保存</button>' +
        '</div>'

    $('.wrap').append(html);


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
                    PageExtends.pickType = data.selectedValue[0];
                    $this.find('span').text(data.resultText);
                    $this.addClass('finished');
                }
            }
        });
    });

    $('.pick-address').on('click', function () {
        PageExtends.shopPhone = $('#shop-phone').val();
        PageExtends.address = $('#shop-address').val();
        PageExtends.time = $('.pick-time span').text();
        PageExtends.text1 = $('.upload span').text();
        window.location.href = "#/pickaddress";
    })


    $('.upload').on("click", function () {
        PageExtends.shopPhone = $('#shop-phone').val();
        PageExtends.address = $('#shop-address').val();
        PageExtends.pickAddress = $('.pick-address span').text();
        PageExtends.time = $('.pick-time span').text();
        window.location.href = "#/upimg";
    });

    $('.pick-time').on("click", function () {
        PageExtends.shopPhone = $('#shop-phone').val();
        PageExtends.address = $('#shop-address').val();
        PageExtends.pickAddress = $('.pick-address span').text();
        PageExtends.text1 = $('.upload span').text();
        window.location.href = "#/picktime";
    });


    $('.btn-go').on('click', function () {

        var phone = $('#shop-phone').val();
        var address = $('#shop-address').val();
        var pick_time = $('.pick-time span').text();
        var pick_img = $('.upload span').text();

        if (pick_time == "24小时") {
            is_all = true;
        } else {
            is_all = false;
        }

        var obj = {};
        obj.form_id = PageExtends.Info.formId;
        obj.telephone = phone;
        obj.address = address;
        obj.store_location = PageExtends.store_location || data.storeLocation;
        obj.first_business_time = PageExtends.first_business_time || data.firstBusinessTime;
        obj.second_business_time = PageExtends.second_business_time || data.secondBusinessTime;
        obj.is_open_all_hours = is_all;
        obj.business_model = PageExtends.pickType || data.businessModel;
        
        if (!PageExtends.serverId) {
            obj.resource_count = 0;
        } else {
            obj.resource_count = 1;
            obj.resource_uids = PageExtends.serverId;
        }

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

        if (!obj.store_location) {
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

        if (!obj.first_business_time) {
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

        if (!obj.business_model) {
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

        if (pick_img != "已上传") {
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



        obj.success = function (data) {

                if (data.success == true) {
                    window.location.href = "#/";
                    PageExtends.shopPhone = '';
                    PageExtends.address = '';
                    PageExtends.pickAddress = '';
                    PageExtends.pickType = '';
                    PageExtends.serverId = '';
                }
            },
            obj.error = function (data) {

            }
        PageExtends.API.storeFormBaseSave(obj);
    })

}

export default {
    name: 'modifyshopinfo',
    render: function () {
        showNoPass();
    }

}