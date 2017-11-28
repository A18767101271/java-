import '../../sass/HomePage.scss';
const $ = (window as any).$;

function start() {
    var h = "";
    h += `<div class="at">
<h1>满减活动</h1>
<span>XXXXXX</span>
<a href="#/setmanjian" data-type="1">新建</a>
</div>
<div class="at">
<h1>返券活动</h1>
<span>XXXXXX</span>
<a href="#/setfanquan" data-type="3">新建</a>
</div>
<div class="at">
<h1>红包活动</h1>
<span>XXXXXX</span>
<a href="#/sethongbao" data-type="5">新建</a>
</div>
<div class="at">
<h1>商品折扣</h1>
<span>XXXXXX</span>
<a href="#/setzhekou" data-type="2">新建</a>
</div>
<div class="at">
<h1>赠品活动</h1>
<span>XXXXXX</span>
<a href="#/setfanwu" data-type="4">新建</a>
</div>`
    $('.wrap').append(h);
    // $('a').on('click', function () {
    //     PageExtends.type = $(this).data('type');
    // })
}

export default {
    name: 'setactivity',
    render: function () {
        start();
    }
};