import '../../sass/HomePage.scss';
import PromotionApis from '../../../../services/promotion-apis';

import '../console.log.js';
import moment from 'moment';

const $ = (window as any).$;
var max_num;
var num = 1;

function start() {

    var h = "";
    h += `<div class="headbar">
   <ul class="head-ul">
       <li class="active" data-type="1">
           <span data-type="1">满减</span>
           <div class="line"></div>
       </li>
       <li data-type="3">
           <span data-type="3">返券</span>
           <div class="line"></div>
       </li>
       <li data-type="5">
           <span data-type="5">红包</span>
           <div class="line"></div>
       </li>
       <li data-type="2">
           <span data-type="2">折扣</span>
           <div class="line"></div>
       </li>
       <li data-type="4">
           <span data-type="4">返物</span>
           <div class="line"></div>
       </li>
   </ul>
   <div class="toolbtn"><i></i></div>
 </div>
 <div class="contain">

 </div>`

    $('.wrap').append(h);

    indexData(1);

    $('.head-ul li').on('click', function () {
        num = 1;
        $('.contain').empty();
        $(this).addClass('active').siblings().removeClass('active');
        var type = $(this).data('type');
        indexData(type);
    })
}

function getData(type, num) {
    PromotionApis.getPromotionList({ storeId: 1, type, status: 2, pageNumber: num, pageSize: 15 }).then(data => {
        fillData(data, type);
    });
}

function indexData(type) {
    PromotionApis.getPromotionList({ storeId: 1, type, status: 2, pageNumber: 0, pageSize: 15 }).then(data => {
        if (data.content.length > 0) {
            max_num = data.totalPages;
            fillData(data, type);
        }
        else {
            fillNoData();
        }

    });
}

function fillData(data, type) {
    var h = "";
    for (var i = 0; i < data.content.length; i++) {
        var st = data.content[i].startTime;
        var ed = data.content[i].endTime;
        h += ` <div class="list" data-id="` + data.content[i].activityId + `">
             <i></i>
             <h1>` + data.content[i].name + `</h1>`
        if (type == 1) {
            h += `<span class="sm-text">` + data.content[i].marketNum + `项优惠</span>
                  <span class="time-text">` + moment(st * 1000).format('YYYY.MM.DD') + `~` + moment(ed * 1000).format('YYYY.MM.DD') + `</span>`
        } else if (type == 3 || type == 5) {
            h += `<span class="time-text">` + moment(st * 1000).format('YYYY.MM.DD') + `~` + moment(ed * 1000).format('YYYY.MM.DD') + `</span>`
        } else if (type == 2) {
            h += `<span class="sm-text">` + data.content[i].marketNum + `折</span>
            <span class="time-text">` + moment(st * 1000).format('YYYY.MM.DD') + `~` + moment(ed * 1000).format('YYYY.MM.DD') + `</span>`
        } else {
            h += `<span class="time-text">` + moment(st * 1000).format('YYYY.MM.DD') + `~` + moment(ed * 1000).format('YYYY.MM.DD') + `</span>`
        }

        h += `<div class="icon icon-end">已结束</div></div>`
    }
    $('.contain').append(h);

    $('.list').on('click', function () {
        var id = $(this).data('id');
        window.location.href = "#/details/" + id;
    })

}

$(window).scroll(function () {
    var typeId = $('.head-ul li.active').data('type');
    //获取网页的总高度
    var htmlHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
    //clientHeight是网页在浏览器中的可视高度，
    var clientHeight = document.body.clientHeight || document.documentElement.clientHeight;
    //scrollTop是浏览器滚动条的top位置，
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

    //通过判断滚动条的top位置与可视网页之和与整个网页的高度是否相等来决定是否加载内容；
    if (scrollTop + clientHeight >= htmlHeight && num < max_num) {
        getData(typeId, num);
        num++;
    }

    return;
})


function fillNoData() {
    $('.contain').empty();
    var h = `<div class="no-img"><div class="img"></div><span>暂无活动信息</span></div>`;
    $('.contain').append(h);
}

export default {
    name: 'record',
    render: function () {
        start();
    }
};