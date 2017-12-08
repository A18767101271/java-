import '../../sass/HomePage.scss';
// import PageExtends from '../PageExtends.js';
// import bridge from '../../../../assets/libs/sardine-bridge';
import React from 'react';
import { Modal } from 'antd-mobile';
// var localId = [];

// function showIndex() {
//     var html = "";
//     html += '<div class="upload">' +
//         '<div class="img"></div>' +
//         '<span>点击该区域上传图片</span>' +
//         '</div >' +
//         '<p>请上传清晰彩色原件扫描或者数码照片，如复印需要加盖公章，确保信息展示完整、清晰、并真实有效，图片尺寸不得低于690*474。</p>' +
//         '<button class="btn" data-href="#/qinfo">确定</button>'

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
//                     if (data.resultCode == "success") {
//                         localId = [];
//                         PageExtends.text3 = "已上传";
//                         PageExtends.Id3 = data.results[0].serverId;
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

// export default {
//     name: 'uploadbusimg',
//     render: function () {

//         showIndex();

//     }

// }

interface UploadIdCardPageProps {
    imgSrc?: string;
    onEnter?: (value: { uid?: string, src: string }) => void;
}

export default class UploadIdCardPage extends React.Component<UploadIdCardPageProps, { imgSrc?: string; imgUid?: string }> {
    inSubmit: boolean = false;
    constructor(props: UploadIdCardPageProps) {
        super(props);
        this.state = {};
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
        const mock = '3804b41c4c1f43b58444d2141b1c3889';
        const src = '//kscdn.b0.upaiyun.com/testbiz/2017/09/007811ae34facb739419367e2cd3a9c9_83b79ea079552bf8.jpg';

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

        return <div className="wrap" data-page='uploadbusimg'>
            {showUpload()}
            <p>请上传清晰彩色原件扫描或者数码照片，如复印需要加盖公章，确保信息展示完整、清晰、并真实有效，图片尺寸不得低于690*474。</p>
            <button className="btn" onClick={() => this.onSubmit()} >确定</button></div>
    }
}