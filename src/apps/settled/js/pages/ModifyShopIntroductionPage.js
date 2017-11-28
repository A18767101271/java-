import '../../sass/HomePage.scss';
import PageExtends from '../PageExtends.js';
import '../lib-bridge.js'; 
import geoData from '../../../../assets/libs/geo-data-areas';

let bridge = window.lib.bridge;

function showPass() {
    var item = PageExtends.Info;
    var proName, disName, cityName;

    geoData.forEach(function (province) {
        if (province.adcode == item.provinceId) {
            proName = province.name;
            province.districts.forEach(function (city) {
                if (city.adcode == item.cityId) {
                    cityName = city.fullname;
                    city.districts.forEach(function (dis) {
                        if (dis.adcode == item.districtId) {
                            disName = dis.name;
                        }
                    })
                }
            });
        }
    });

    var html = "";
    if (PageExtends.state == 1) {
        html += '<div class="pick-1"><div class="head-bar"><h1>审核中...</h1><span>2-3个工作日内给您答复</span></div>'
    } else {
        html += '<div class="pick-1"><div class="head-bar passing"><h1>审核通过</h1></div>'
    }

    html += '<div class="line title"><h1>店铺介绍</h1></div>' +
        '<div class="line"><h1>店铺名称</h1><span>' + item.shopName + '</span></div>' +
        '<div class="line"><h1>行业类型</h1><span>' + item.categoryName + '-' + item.subCategoryName + '</span></div>' +
        '<div class="line"><h1>店铺区域</h1><span>' + proName + '-' + cityName + '-' + disName + '</span></div></div>'

    $('.wrap').append(html);
}

function showNoPass(data) {

    var sub_category_id = data.subCategoryId || '';
    var sub_category_name = data.subCategoryName || '';
    var province_id = data.provinceId || '';
    var city_id = data.cityId || '';
    var district_id = data.districtId || '';
    var form_id = data.formId | '';
    var proName, disName, cityName;

    geoData.forEach(function (province) {
        if (province.adcode == data.provinceId) {
            proName = province.name;
            province.districts.forEach(function (city) {
                if (city.adcode == data.cityId) {
                    cityName = city.fullname;
                    city.districts.forEach(function (dis) {
                        if (dis.adcode == data.districtId) {
                            disName = dis.name;
                        }
                    })
                }
            });
        }
    });


    var html = "";

    if (PageExtends.state == 2) {
        html += '<div class="pick-2"><div class="head-bar"><h1>审核未通过</h1><span></span></div>'
    } else {
        html += '<div class="pick-2">'
    }

    html += '<section>' +
        '<div class="title"><i></i><span>店铺介绍</span></div>' +
        '<div class="line pick-provin">' +
        '<h1>店铺区域</h1><i></i><span>' + proName + '-' + cityName + '-' + disName + '</span>' +
        '</div>' +
        '<div class="line">' +
        '<h1>店铺名称</h1><input type="text" placeholder="请输入店铺名称" class="t-input" value="' + data.shopName + '"/>' +
        '</div>' +
        '<div class="line pick-industry">' +
        '<h1>行业类别</h1><i></i><span>' + data.categoryName + '-' + data.subCategoryName + '</span>' +
        '</div>' +
        '</section>' +
        '<button class="btn-go" data-href="#/shopintro">保存</button></div>'

    $('.wrap').append(html);

    //选择行业
    $('.pick-industry').on('click', function () {
        var $this = $(this);
        bridge.picker({
            title: "类别选择",
            data: //单列选取自定义数据
            {
                type: 'items', //表示自定义输入数据
                depth: 1,
                items: [{
                    text: '快餐小吃',
                    value: 11,
                    //disabled: true // 禁用，可以看见但不可选择
                },
                {
                    text: '主题特色',
                    value: 12
                },
                {
                    text: '甜点饮品',
                    value: 13
                },
                {
                    text: '中餐宴请',
                    value: 14
                },
                {
                    text: '火锅烧烤',
                    value: 15
                },
                {
                    text: '品茶会客',
                    value: 16
                },
                {
                    text: '西餐日韩',
                    value: 17
                },
                {
                    text: '夜市宵夜',
                    value: 18
                }
                ]
            },
            complete: function (data) {
                sub_category_id = data.selectedValue;
                sub_category_name = data.resultText[0];
                $('.pick-industry span').text(sub_category_name);
            }
        });
    });

    //选择省市区
    $('.pick-provin').on('click', function () {
        var $this = $(this);
        bridge.picker({
            title: "省市区",
            data: //选择省市区数据
            {
                type: 'geo', //选择省市区数据
                depth: 3
            },
            complete: function (data) {
                if (data.resultCode == "success") {
                    var arry = data.resultText;
                    var h = "";
                    for (var i in arry) {
                        h = h + "/" + arry[i];
                    }
                    $this.find('span').text(h.substring(1));
                    province_id = data.selectedValue[0];
                    city_id = data.selectedValue[1];
                    district_id = data.selectedValue[2];
                }
            }
        });
    });

    //点击下一步
    $('.btn-go').on('click', function () {
        var obj = {};

        obj.form_id = form_id;
        obj.shop_name = $('.t-input').val();
        obj.category_id = 1;
        obj.category_name = "餐饮美食";
        obj.sub_category_id = sub_category_id;
        obj.sub_category_name = sub_category_name;
        obj.province_id = province_id;
        obj.city_id = city_id;
        obj.district_id = district_id;

        if (!obj.province_id) {
            bridge.dialog({
                title: "提示",
                content: '请选择店铺区域',
                type: "alert",
                buttons: [{
                    text: 'ok'
                }],
            });

            return;
        }

        if (!obj.shop_name) {
            bridge.dialog({
                title: "提示",
                content: '请输入店铺名称',
                type: "alert",
                buttons: [{
                    text: 'ok'
                }],
            });

            return;
        }

        if (!obj.sub_category_id) {
            bridge.dialog({
                title: "提示",
                content: '请选择行业类别',
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
                window.location.href = "#/";
            }
        }

        obj.error = function (data) {
            console.log(data);
            bridge.dialog({
                title: "提示2",
                content: "data.desc",
                type: "alert",
                buttons: [{
                    text: 'ok'
                }],
            });
        }

        PageExtends.API.storeFormIntroductionSave(obj);

    });
}


export default {
    name: 'modifyshopintroduction',
    render: function () {

        if (PageExtends.state == 1 || PageExtends.state == 3) {
            showPass();
        } else {
            // bridge.ready(function () {
            //     bridge.getLocation({
            //         complete: function (data) {
            //             var client_location = data.longitude + ',' + data.latitude;
            showNoPass(PageExtends.Info);
            //         }
            //     });
            // });
        }


    }

}