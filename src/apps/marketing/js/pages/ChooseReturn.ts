import '../../sass/SetHomePage.scss';
import PageExtends from '../PageExtends.js';
import StoreApis from '../../../../services/store-apis';

const $ = (window as any).$;

function removeByValue(obj, val) {
    for (var i = 0; i < obj.length; i++) {
        if (obj[i] == val) {
            obj.splice(i, 1);
            break;
        }
    }
}

function start(id?: number) {

    let obj = {
        storeId: 1,
        pageNumber: 0,
        pageSize: 999,
        customGroupId: id,
    };

    StoreApis.getGroupsWithProducts(obj).then(data => {
        fill(data);
    }).catch(_err => { });
}

function fill(data) {
    console.log(data);
    var arrt = {};
    var h = "";
    h += `<div class="headbar">
    <span class="btn active">全部</span>`
    for (var i = 0; i < data.productGroups.length; i++) {
        arrt[data.productGroups[i].id] = data.productGroups[i].name;
        h += `<span class="btn" data-id=` + data.productGroups[i].id + `>` + data.productGroups[i].name + `</span>`
    }
    h += `</div>`

    if (PageExtends.larry) {
        h += `<div class="t-tip"><h1>已选</h1><div class="food-point">`
        for (var j = 0; j < PageExtends.larry.length; j++) {
            h += `<span class="tt-span">` + PageExtends.larry[j].productName + `*` + PageExtends.larry[j].productNum + `</span>`;
        }
        h += `</div><div class="btn-xiala"></div></div>`
    } else {
        PageExtends.larry = [];
        h += `<div class="t-tip"><h1>已选</h1><div class="food-point"></div><div class="btn-xiala"></div></div>`
    }

    h += `<div class="contain">
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
        }).catch(err => {
            console.log(err);
        });
    })

    $('.btn-yes').on('click', function () {
        window.history.go(-1);
    })

}

function showList(data, obj) {

    $('.contain').empty();
    var h = "";
    if (data.length <= 0) {
        h += `<div class='no-tip'><div class='img'></div><p>暂无商品</p></div>`;
    } else {
        for (var i = 0; i < data.length; i++) {
            h += ` <div class="food" data-id="` + data[i].id + `">
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

            h += `<div class="area">
                  <div class="btn btn-add" data-id="` + data[i].id + `" data-name="` + data[i].name + `"></div>
                  <span class="food-num" data-id="` + data[i].id + `">0</span>
                  <div class="btn btn-reduce" data-id="` + data[i].id + `" data-name="` + data[i].name + `"></div>
                  </div>

        </div>
        </div>`
        }
    }

    $('.contain').append(h);
    resetData();
    addFood();
    reduceFood();
}

function iconNum() {
    var num = $('.area .food-num');
    for (var i = 0; i < num.length; i++) {
        if ($(num[i]).text() <= 0) {
            $(num[i]).hide();
            $(num[i]).next().hide();
        } else {
            $(num[i]).show();
            $(num[i]).next().show();
        }
    }
}

function resetData() {

    if (!PageExtends.larry) {
        iconNum();
        return;
    }
    var num = $('.area .food-num');
    for (var i = 0; i < PageExtends.larry.length; i++) {
        for (var j = 0; j < num.length; j++) {
            if (PageExtends.larry[i].productId == $(num[j]).data('id')) {
                $(num[j]).text(PageExtends.larry[i].productNum);
            }
        }
    }
    iconNum();
}

function addFood() {
    $('.btn-add').on('click', function () {
        var proNum = $(this).next().text();
        var proId = $(this).data('id');
        var proName = $(this).data('name');
        proNum++;
        if (proNum >= 99) proNum = 99;
        $(this).next().text(proNum);
        iconNum();

        if (PageExtends.larry) {
           
            for (var i = 0; i < PageExtends.larry.length; i++) {
                if (PageExtends.larry[i].productName == proName) {
                    PageExtends.larry[i].productNum = proNum;
                    selectedMenu(PageExtends.larry);
                    return;
                }
            }

            PageExtends.larry.push({
                "productId": proId,
                "productName": proName,
                "productNum": proNum
            });

        } else {
            PageExtends.larry.push({
                "productId": proId,
                "productName": proName,
                "productNum": proNum
            });
        }

        selectedMenu(PageExtends.larry);
    })
}

function reduceFood() {

    $('.btn-reduce').on('click', function () {
        var proNum = $(this).prev().text();
        //var proId = $(this).data('id');
        var proName = $(this).data('name');
        proNum--;
        if (proNum <= 0) proNum = 0;
        $(this).prev().text(proNum);
        iconNum();

        for (var i = 0; i < PageExtends.larry.length; i++) {
            if (PageExtends.larry[i].productName == proName) {
                PageExtends.larry[i].productNum = proNum;
                if (proNum == 0) {
                    removeByValue(PageExtends.larry, PageExtends.larry[i]);
                }
            }
        }
        selectedMenu(PageExtends.larry);
    })
}

function selectedMenu(arr) {
    $('.t-tip .food-point').empty();
    var h = "";
    for (var i = 0; i < arr.length; i++) {
        h += `<span class="tt-span">` + arr[i].productName + `*` + arr[i].productNum + `</span>`;
    }
    $('.t-tip .food-point').append(h);
}

export default {
    name: 'choosereturn',
    render: function () {
        start();
    }
};