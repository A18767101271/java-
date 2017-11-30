import '../../sass/HomePage.scss';
import PageExtends from '../PageExtends.js';
import bridge from '../../../../assets/libs/sardine-bridge';

var localId = [];

function showIndex() {
    var html = "";
    html += '<div class="upload">' +
        '<div class="img"></div>' +
        '<span>点击该区域上传图片</span>' +
        '</div >' +
        '<p>请上传清晰的门店招牌图片，招牌要与商家名称一致，图片尺寸不得低于690*474。</p>' +
        '<button class="btn" data-href="#/shopinfo">确定</button>'

    $('.wrap').append(html);

    $('.upload').on('click', function () {
        bridge.getImages({
            count: 1, //需要选择图片的数量 默认1
            source: ['album', 'camera'], //可以指定来源是相册还是相机 可选参数，默认二者都有
            complete: function (data) {
                console.log(data);
                localId.push(data.localIds[data.localIds.length - 1]);
                if (data.localIds && data.localIds.length > 0)
                    bridge.getImageData({
                        localId: data.localIds[data.localIds.length - 1], //图片本地ID
                        complete: function (data) {
                            var str = "";
                            if (data.localData && data.localData.length) str = data.localData;
                            var html = '<img class="img-small" src="' + str + '" />';
                            $('.upload').empty();
                            $('.upload').append(html);
                        }
                    });
            }
        });
    })


    $('.btn').on('click', function () {
        var fg = $('.upload .img-small').length;
        if (fg) {
            bridge.uploadImages({
                typeId: 1,
                localIds: localId,
                showProgress: true,
                complete: function (data) {
                    console.log(data);
                    if (data.resultCode == "success") {
                        localId = [];
                        PageExtends.text1 = "已上传";
                        PageExtends.serverId = data.results[0].serverId;
                        window.history.go(-1);
                    }
                }
            })
        } else {
            bridge.dialog({
                title: "提示",
                content: '请选择上传的图片',
                type: "alert",
                buttons: [{
                    text: 'ok'
                }],
            });
        }

    })



}

export default {
    name: 'uploadshopimg',
    render: function () {

        showIndex();

    }

}