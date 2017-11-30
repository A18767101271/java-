import '../../sass/HomePage.scss';
import PageExtends from '../PageExtends.js';
 
import AMapLoader from '../../../../assets/libs/AMapLoader.js';

import bridge from '../../../../assets/libs/sardine-bridge';

function showPass(locat) {
    var arry = ['先吃后付', '先付后吃'];
    var item = PageExtends.Info;
    var html = "";
    if (PageExtends.state == 1) {
        html += '<div class="pick-1"><div class="head-bar"><h1>审核中...</h1><span>2-3个工作日内给您答复</span></div>'
    } else {
        html += '<div class="pick-1"><div class="head-bar passing"><h1>审核通过</h1></div>'
    }

    html += '<div class="line title"><h1>店铺信息</h1></div>' +
        '<div class="line"><h1>门店电话</h1><span>' + item.telephone + '</span></div>' +
        '<div class="line"><h1>店铺地址</h1><span>' + item.address + '</span></div>' +
        '<div class="line"><h1>定位地址</h1><span>' + locat + '</span></div>' +
        '<div class="line time"><h1>营业时间</h1><span></span></div>' +
        '<div class="line"><h1>营收模式</h1><span>' + arry[item.businessModel - 1] + '</span></div>' +
        '<div class="line"><h1>店铺门脸照</h1><span>已上传</span></div>' +
        '</div>'
    $('.wrap').append(html);

    if (item.isOpenAllHours == true) {
        $('.time').find('span').text('24小时');
        return;
    }

    var stArry = item.firstBusinessTime;
    var enArry = item.secondBusinessTime;
    var timeArry = [];
    if (enArry[0] == 0) {
        timeArry = stArry.toString().split(',');
    } else {
        timeArry = stArry.concat(enArry).toString().split(',');
    }

    var timeArry2 = [];
    for (var i = 0; i < timeArry.length; i++) {
        if (timeArry[i].length < 4) {
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

    $('.time').find('span').text(time);

}

function showNoPass() {

    var is_all;
    var data = PageExtends.Info;


    if (!data.telephone) {
        PageExtends.shopPhone = PageExtends.shopPhone || '';
        PageExtends.address = PageExtends.address || '';
        PageExtends.pickAddress = PageExtends.pickAddress || "请选择";
        PageExtends.pickType = PageExtends.pickType || "请选择";
        PageExtends.time = PageExtends.time || "请选择";
        PageExtends.text1 = PageExtends.text1 || '请上传';
    } else {
        var arry = ['先吃后付', '先付后吃'];
        PageExtends.shopPhone = PageExtends.shopPhone || data.telephone;
        PageExtends.address = PageExtends.address || data.address;
        PageExtends.pickAddress = PageExtends.pickAddress || '已选择';
        PageExtends.pickType = PageExtends.pickType || arry[data.businessModel - 1];
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
        ' <div class="line">' +
        '     <h1>店铺地址</h1><input type="text" placeholder="请输入店铺地址" id="shop-address" value="' + PageExtends.address + '"/>' +
        ' </div>' +
        ' <div class="line pick-address">' +
        '     <h1>定位地址</h1><i></i><span>' + PageExtends.pickAddress + '</span>' +
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
        '<button class="btn-go" data-href="#/qinfo">保存</button>' +
        '</div>'

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
        obj.business_model = PageExtends.is_type || data.businessModel;
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

        if (PageExtends.state == 1 || PageExtends.state == 3) {
            AMapLoader.ready(() => {
                AMap.service('AMap.Geocoder', function () { //回调函数
                    let geocoder = new AMap.Geocoder({
                        city: "010" //城市，默认：“全国”
                    });
                    var lnglatXY = PageExtends.Info.storeLocation; //地图上所标点的坐标
                    var ss;
                    geocoder.getAddress(lnglatXY, function (status, result) {
                        if (status === 'complete' && result.info === 'OK') {
                            ss = result.regeocode.formattedAddress;
                        }
                        showPass(ss);
                    });


                })

            });

        } else {
            showNoPass();
        }
    }

}