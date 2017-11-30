import '../../sass/HomePage.scss';
import PageExtends from '../PageExtends.js';
import bridge from '../../../../assets/libs/sardine-bridge';

var localId = [];

function showIndex() {
    var html = "";
    html += '<div class="upload up-1">' +
        '<div class="img"></div>' +
        '<span>点击该区域上传图片</span>' +
        '<em>正面照</em>' +
        '</div >' +
        '<div class="upload up-2">' +
        '<div class="img"></div>' +
        '<span>点击该区域上传图片</span>' +
        '<em>背面照</em>' +
        '</div >' +
        '<div class="tip">' +
        '<h1>温馨提示</h1>' +
        '<p>1、身份证正面照有效期要清晰</p>' +
        '<p>2、身份证背面照，五官清晰可见</p>' +
        '<p>3、图片尺寸不得小于330*226</p>' +
        '</div>' +
        '<button class="btn" data-href="#/qinfo">确定</button>'

    $('.wrap').append(html);


    $('.up-1').on('click', function () {
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
                            $('.up-1').empty();
                            $('.up-1').append(html);
                            //PageExtends.upShopImg = "已上传";
                        }
                    });
            }
        });
    })

    $('.up-2').on('click', function () {
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
                            $('.up-2').empty();
                            $('.up-2').append(html);
                            //PageExtends.upShopImg = "已上传";
                        }
                    });
            }
        });
    })

    $('.btn').on('click', function () {
        var fg1 = $('.up-1 .img-small').length;
        var fg2 = $('.up-2 .img-small').length;

        if (fg1 && fg2) {
            bridge.uploadImages({
                typeId: 1,
                localIds: localId,
                showProgress: true,
                complete: function (data) {
                    console.log(data);
                    if (data.resultCode == "success") {
                        localId = [];
                        PageExtends.text2 = "已上传";
                        PageExtends.Id1 = data.results[0].serverId;
                        PageExtends.Id2 = data.results[1].serverId;
                        window.history.go(-1);
                    }
                }
            })

        } else {
            bridge.dialog({
                title: "提示",
                content: '请上传身份证照片',
                type: "alert",
                buttons: [{
                    text: 'ok'
                }],
            });
        }
    })
}

export default {
    name: 'uploadidcard',
    render: function () {

        showIndex();

    }

}