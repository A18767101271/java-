import '../../sass/HomePage.scss';
import PageExtends from '../PageExtends.js';

function showIndex() {
    var html = "";
    html += '<header>请准备好以下资料，准备入驻</header>' +
        ' <section class="section">' +
        ' <div class="title"><i></i><span>所需证件</span></div>' +
        ' <div class="info clearfix">' +
        ' <div class="left fl">' +
        ' <div class="hang"><i>1</i><h1>身份证照</h1></div>' +
        ' <p>证件正面、反面照，照片须清晰可辨认。</p>' +
        ' </div>' +
        ' <div class="right fr">' +
        ' <div class="p-sf"></div>' +
        ' </div>' +
        ' </div>' +
        ' <div class="info clearfix">' +
        ' <div class="left fl">' +
        ' <div class="hang"><i>2</i><h1>营业执照</h1></div>' +
        ' <p>正面拍摄证件，照片须清晰可辨认。</p>' +
        ' </div>' +
        ' <div class="right fr">' +
        ' <div class="p-yy"></div>' +
        ' </div>' +
        ' </div>' +
        ' <div class="title"><i></i><span>商铺照</span></div>' +
        ' <div class="info clearfix">' +
        ' <div class="left fl">' +
        ' <div class="hang"><i>1</i><h1>店面门脸照</h1></div>' +
        ' <p>店面招牌和店面大门真实拍摄。</p>' +
        ' </div>' +
        ' <div class="right fr">' +
        ' <div class="p-dm"></div>' +
        ' </div>' +
        ' </div>' +
        ' </section>' +
        ' <a href="#/shopintro">我准备好了</a>';

        $('.wrap').append(html);
}


export default {
    name: 'ready',
    render: function () {
        showIndex();
    }

}