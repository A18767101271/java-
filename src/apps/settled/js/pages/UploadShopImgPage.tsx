import '../../sass/HomePage.scss';
//import PageExtends from '../PageExtends.js';
//import bridge from '../../../../assets/libs/sardine-bridge';

import React from 'react';

import { Modal } from 'antd-mobile';

// var localId = [];

// function showIndex() {
//     var html = "";
//     html += '<div class="upload">' +
//         '<div class="img"></div>' +
//         '<span>点击该区域上传图片</span>' +
//         '</div >' +
//         '<p>请上传清晰的门店招牌图片，招牌要与商家名称一致，图片尺寸不得低于690*474。</p>' +
//         '<button class="btn" data-href="#/shopinfo">确定</button>'

//     $('.wrap').append(html);

//     $('.upload').on('click', function () {
//         bridge.getImages({
//             count: 1, //需要选择图片的数量 默认1
//             source: ['album', 'camera'], //可以指定来源是相册还是相机 可选参数，默认二者都有
//             complete: function (data) {
//                 console.log(data);
//                 localId.push(data.localIds[data.localIds.length - 1]);
//                 if (data.localIds && data.localIds.length > 0)
//                     bridge.getImageData({
//                         localId: data.localIds[data.localIds.length - 1], //图片本地ID
//                         complete: function (data) {
//                             var str = "";
//                             if (data.localData && data.localData.length) str = data.localData;
//                             var html = '<img class="img-small" src="' + str + '" />';
//                             $('.upload').empty();
//                             $('.upload').append(html);
//                         }
//                     });
//             }
//         });
//     })


//     $('.btn').on('click', function () {
//         var fg = $('.upload .img-small').length;
//         if (fg) {
//             bridge.uploadImages({
//                 typeId: 1,
//                 localIds: localId,
//                 showProgress: true,
//                 complete: function (data) {
//                     console.log(data);
//                     if (data.resultCode == "success") {
//                         localId = [];
//                         PageExtends.text1 = "已上传";
//                         PageExtends.serverId = data.results[0].serverId;
//                         window.history.go(-1);
//                     }
//                 }
//             })
//         } else {
//             bridge.dialog({
//                 title: "提示",
//                 content: '请选择上传的图片',
//                 type: "alert",
//                 buttons: [{
//                     text: 'ok'
//                 }],
//             });
//         }

//     })



// }

interface UploadShopImgPageProps {
    imgSrc?: string;
    onEnter?: (data: { uid?: string, src: string }) => void;
}

export default class UploadShopImgPage extends React.Component<UploadShopImgPageProps, {
    imgSrc?: string; imgUid?: string
}> {
    inSubmit: boolean = false;
    constructor(props: UploadShopImgPageProps) {
        super(props);
        this.state = {}
    }

    componentWillMount() {
        if (this.props.imgSrc) {
            this.setState({
                imgSrc: this.props.imgSrc
            })
        }
    }

    onSubmit() {

        if (this.inSubmit) {
            return;
        }
        this.inSubmit = true;

        if (!this.state.imgSrc) {
            Modal.alert('提示', '尚未上传图片');
            this.inSubmit = false;
            return;
        }

        this.props.onEnter && this.props.onEnter({ uid: this.state.imgUid, src: this.state.imgSrc });

    }

    onUpload() {
        const mock = 'fecf2136ab5541c38c098103b6c1a921';
        const src = '//kscdn.b0.upaiyun.com/testbiz/2017/09/5bf4b8f2d79462257e4ab1ea5eefdf52_b26f4b75b6ef088e.jpg';

        this.setState({
            imgSrc: src,
            imgUid: mock
        });
    }


    render() {

        let self = this;

        function showUpload() {
            if (self.state.imgSrc) {
                return <div className="upload">
                    <img className="img-small" src={self.state.imgSrc} />
                </div>
            } else {
                return <div className="upload" onClick={() => self.onUpload()}>
                    <div className="img"></div>
                    <span>点击该区域上传图片</span>
                </div >
            }

        }

        return <div className="wrap" data-page='uploadshopimg'>
            {showUpload()}
            <p>请上传清晰的门店招牌图片，招牌要与商家名称一致，图片尺寸不得低于690*474。</p>
            <button className="btn" onClick={() => { this.onSubmit(); }} >确定</button>
        </div>

    }

}