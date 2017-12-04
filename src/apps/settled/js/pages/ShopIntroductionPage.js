import '../../sass/HomePage.scss';
import PageExtends from '../PageExtends.js';
import bridge from '../../../../assets/libs/sardine-bridge';

function showIndex() {

    var shop_name;
    var sub_category_id;
    var sub_category_name;
    var province_id;
    var city_id;
    var district_id;

    var html = "";

    html += '<header><span></span></header>' +
        '<section>' +
        '<div class="title"><i></i><span>店铺介绍</span></div>' +
        '<div class="line pick-provin">' +
        '<h1>店铺区域</h1><i></i><span>省/市/区</span>' +
        '</div>' +
        '<div class="line">' +
        '<h1>店铺名称</h1><input type="text" placeholder="请输入店铺名称" class="t-input"/>' +
        '</div>' +
        '<div class="line pick-industry">' +
        '<h1>行业类别</h1><i></i><span>请选择</span>' +
        '</div>' +
        '</section>' +
        '<button class="btn-go" data-href="#/shopintro">下一步</button>'

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
        console.log(1);
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
        obj.shop_name = $('.t-input').val();
        obj.category_id = 1;
        obj.category_name = "餐饮美食";
        obj.sub_category_id = sub_category_id;
        obj.sub_category_name = sub_category_name;
        obj.province_id = province_id;
        obj.city_id = city_id;
        obj.district_id = district_id;
        obj.client_location = PageExtends.clientLocation.indexOf('undefined') < 0 ? PageExtends.clientLocation : "0,0";
        obj.is_sign_agreement = "false";

        if (!province_id) {
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

        if (obj.shop_name.length <= 0) {
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

        if (!sub_category_id) {
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
                PageExtends.formId = data.data.formId;
                window.location.href = "#/shopinfo";
            }
        }

        obj.error = function (data) {
            console.log(data);
            bridge.dialog({
                title: "提示",
                content: data.desc,
                type: "alert",
                buttons: [{
                    text: 'ok'
                }],
            });
        }

        PageExtends.API.storeFormSettledCreate(obj);
    });

}

export default {
    name: 'shopintroduction',
    render: function () {
        showIndex();
    }

}