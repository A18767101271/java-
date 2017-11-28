import '../../sass/HomePage.scss';
import PageExtends from '../PageExtends.js';

function showIndex() {
    var html = "";
    html += '<img src="image/yes-tip_03.jpg" />' +
        '<h1>已提交审核</h1 >' +
        '<p>我们会在3个工作日给您回复</p>' +
        '<input type="button" value="确定" />'

    $('.wrap').append(html);
}

export default {
    name: 'success',
    render: function () {

        showIndex();

    }

}