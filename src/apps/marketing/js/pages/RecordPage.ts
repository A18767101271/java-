import '../../sass/HomePage.scss';
import PromotionApis from '../../../../services/promotion-apis';
 
import '../console.log.js';
import moment from 'moment';

const $ = (window as any).$;

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

    getData(1);

    $('.head-ul li').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        var type = $(this).data('type');
        getData(type);
    })
}

function getData(type) {
    PromotionApis.getPromotionList({ storeId: 1, type, status: 2 }).then(data => {
        fillData(data, type);
    });
}

function fillData(data, type) {
    $('.contain').empty();
    var h = "";
    for (var i = 0; i < data.length; i++) {
        var st = data[i].startTime;
        var ed = data[i].endTime;
        h += ` <div class="list" data-id="` + data[i].activityId + `">
             <i></i>
             <h1>` + data[i].name + `</h1>`
        if (type == 1) {
            h += `<span class="sm-text">` + data[i].marketNum + `项优惠</span>
                  <span class="time-text">` + moment(st * 1000).format('YYYY.MM.DD') + `~` + moment(ed * 1000).format('YYYY.MM.DD') + `</span>`
        } else if (type == 3 || type == 5) {
            h += `<span class="time-text">` + moment(st * 1000).format('YYYY.MM.DD') + `~` + moment(ed * 1000).format('YYYY.MM.DD') + `</span>`
        } else if (type == 2) {
            h += `<span class="sm-text">` + data[i].marketNum + `折</span>
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

// function fillNoData() {
//     $('.contain').empty();
//     var h = `<div class="no-img"><div class="img"></div><span>暂无活动信息</span></div>`;
//     $('.contain').append(h);
// }


export default {
    name: 'record',
    render: function () {
        start();
    }
};