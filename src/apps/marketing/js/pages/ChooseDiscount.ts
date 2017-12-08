import '../../sass/SetHomePage.scss';
import PageExtends from '../PageExtends.js';
import StoreApis from '../../../../services/store-apis';

const $ = (window as any).$;

function start(id?: number) {

    let obj = {
        storeId: 1,
        pageNumber: 0,
        pageSize: 999,
        customGroupId: id,
    };

    StoreApis.getGroupsWithProducts(obj).then(data => {
        fill(data);
    }).catch(_err => {
      
    });

}

function fill(data) {
   
    var arrt = {};
    var h = "";
    h += `<div class="headbar">
    <span class="btn active">全部</span>`
    for (var i = 0; i < data.productGroups.length; i++) {
        arrt[data.productGroups[i].id] = data.productGroups[i].name;
        h += `<span class="btn" data-id=` + data.productGroups[i].id + `>` + data.productGroups[i].name + `</span>`
    }
    h += `</div>
    <div class="t-tip">只可选择一件商品</div>
  <div class="contain">
  </div>
  <button class="btn-yes">确定</button>`
    $('.wrap').append(h);
    showList(data.products, arrt);
    $('.headbar .btn').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        var id = $(this).data('id');


        let obj = {
            storeId: 1,
            pageNumber: 0,
            pageSize: 999,
            customGroupId: id,
        };

        StoreApis.getGroupsWithProducts(obj).then(data => {
            showList(data.products, arrt);
        }).catch(_err => {
           
        });
    })

}

function showList(data, obj) {
    $('.contain').empty();
    var h = "";
    if (data.length <= 0) {
        $('.t-tip').hide();
        h += `<div class='no-tip'><div class='img'></div><p>暂无商品</p></div>`;
    } else {
        $('.t-tip').show();
        for (var i = 0; i < data.length; i++) {
            h += ` <div class="food" data-id="` + data[i].id + `" data-price="` + data[i].strategyPrice + `">
        <div class="left fl">
            <img src="#" class="img">
        </div>
        <div class="right fr">
            <h1>` + data[i].name + `</h1>
            <h2>￥` + data[i].strategyPrice + `</h2>`
            if (data[i].isSoldOut == true) {
                h += ` <h3>售空</h3>`
            } else {
                h += ` <h3>在售</h3>`
            }

            for (var key in obj) {
                if (data[i].customGroupId == key) {
                    h += `<span class="span-tip">` + obj[key] + `</span>`;
                }
            }

            h += `<div class="icon"></div>
        </div>
        </div>`
        }
    }

    $('.contain').append(h);

    if (PageExtends.larry2) {
       
        var foods = $('.contain .food');
        for (var i = 0; i < foods.length; i++) {
            if ($(foods[i]).data('id') == PageExtends.larry2.productId) {
                $(foods[i]).addClass('active');
            }
        }
    }
    else {
        PageExtends.larry2 = {};
    }

    $('.food').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
    })

    $('.btn-yes').on('click', function () {
        var obj = {};
        if ($('.food.active').length > 0) {
            var id = $('.food.active').data('id');
            var name = $('.food.active').find('h1').text();
            var price = $('.food.active').data('price');
            obj['productId'] = id;
            obj['productName'] = name;
            obj['discountPrice'] = price;
            PageExtends.larry2 = obj;
            PageExtends.name = name + " ￥" + price;
        } else {
            PageExtends.name = "请选择商品";
        }

        window.history.go(-1);

    })
}

export default {
    name: 'choosediscount',
    render: function () {
        start();
    }
};