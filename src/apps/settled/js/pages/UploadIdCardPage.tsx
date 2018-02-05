import '../../sass/HomePage.scss';
import React from 'react';
import { Modal } from 'antd-mobile';
import classNames from 'classnames';
// import PageExtends from '../PageExtends.js';
// import bridge from '../../../../assets/libs/sardine-bridge';

// var localId = [];

// function showIndex() {
//     var html = "";
//     html += '<div class="upload up-1">' +
//         '<div class="img"></div>' +
//         '<span>点击该区域上传图片</span>' +
//         '<em>正面照</em>' +
//         '</div >' +
//         '<div class="upload up-2">' +
//         '<div class="img"></div>' +
//         '<span>点击该区域上传图片</span>' +
//         '<em>背面照</em>' +
//         '</div >' +
//         '<div class="tip">' +
//         '<h1>温馨提示</h1>' +
//         '<p>1、身份证正面照有效期要清晰</p>' +
//         '<p>2、身份证背面照，五官清晰可见</p>' +
//         '<p>3、图片尺寸不得小于330*226</p>' +
//         '</div>' +
//         '<button class="btn" data-href="#/qinfo">确定</button>'

//     $('.wrap').append(html);


//     $('.up-1').on('click', function () {
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
//                             $('.up-1').empty();
//                             $('.up-1').append(html);
//                             //PageExtends.upShopImg = "已上传";
//                         }
//                     });
//             }
//         });
//     })

//     $('.up-2').on('click', function () {
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
//                             $('.up-2').empty();
//                             $('.up-2').append(html);
//                             //PageExtends.upShopImg = "已上传";
//                         }
//                     });
//             }
//         });
//     })

//     $('.btn').on('click', function () {
//         var fg1 = $('.up-1 .img-small').length;
//         var fg2 = $('.up-2 .img-small').length;

//         if (fg1 && fg2) {
//             bridge.uploadImages({
//                 typeId: 1,
//                 localIds: localId,
//                 showProgress: true,
//                 complete: function (data) {
//                     console.log(data);
//                     if (data.resultCode == "success") {
//                         localId = [];
//                         PageExtends.text2 = "已上传";
//                         PageExtends.Id1 = data.results[0].serverId;
//                         PageExtends.Id2 = data.results[1].serverId;
//                         window.history.go(-1);
//                     }
//                 }
//             })

//         } else {
//             bridge.dialog({
//                 title: "提示",
//                 content: '请上传身份证照片',
//                 type: "alert",
//                 buttons: [{
//                     text: 'ok'
//                 }],
//             });
//         }
//     })
// }

// export default {
//     name: 'uploadidcard',
//     render: function () {

//         showIndex();

//     }

// }

interface UploadIdCardPageProps {
    foreSrc?: string;
    backSrc?: string;
    onEnter?: (value: { fore: { uid?: string, src: string }, back: { uid?: string, src: string } }) => void;
}
export default class UploadIdCardPage extends React.Component<UploadIdCardPageProps, {
    imgSrc1?: string;
    imgUid1?: string;
    imgSrc2?: string;
    imgUid2?: string;
}> {
    inSubmit: boolean = false;
    constructor(props: UploadIdCardPageProps) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        if (this.props.backSrc && this.props.foreSrc) {
            this.setState({
                imgSrc1: this.props.foreSrc,
                imgSrc2: this.props.backSrc
            });
        }
    }

    onSubmit() {
        if (this.inSubmit) {
            return;
        }
        this.inSubmit = true;
        if (!this.state.imgSrc1) {
            Modal.alert('提示', '尚未上传身份证正面');
            this.inSubmit = false;
            return;
        }

        if (!this.state.imgSrc2) {
            Modal.alert('提示', '尚未上传身份证背面');
            this.inSubmit = false;
            return;
        }

        this.props.onEnter && this.props.onEnter({ fore: { uid: this.state.imgUid1, src: this.state.imgSrc1 }, back: { uid: this.state.imgUid2, src: this.state.imgSrc2 } });
    }

    onUpload(uploadId: number) {
        const mock1 = '729c2daa9a1c4305ac91028da49ca4d6';
        const src1 = '//kscdn.b0.upaiyun.com/testbiz/2017/09/3cef72f2bde96d54cd3fc5b9cf1ad0b4_9033654b76f3b4f1.jpg';
        const mock2 = '82e19f80ec614b5f96827bc8f056389a';
        const src2 = '//kscdn.b0.upaiyun.com/testbiz/2017/09/909eb5ec675fcec4444095b83991357c_95b67a1a4d7d0066.jpg';

        if (uploadId == 1) {
            this.setState({
                imgSrc1: src1,
                imgUid1: mock1
            });
        } else if (uploadId == 2) {
            this.setState({
                imgSrc2: src2,
                imgUid2: mock2
            });
        }

    }

    render() {

        let self = this;

        function Upload(props: { className?: string, name: string, src?: string, id: number }) {
            if (props.src) {
                return <div className={classNames("upload noborder", props.className)}>
                   <span className="s-tip">点击重新上传</span>
                    <img className="img-small" src={props.src} />
                    <em>{props.name}</em>
                </div>
            } else {
                return <div className="upload" onClick={() => self.onUpload(props.id)}>
                    <div className="img"></div>
                    <em>{props.name}</em>
                </div >
            }

        }

        return <div className="wrap" data-page='uploadidcard'>
            <Upload name='正面照' className='up-1' id={1} src={this.state.imgSrc1} />
            <Upload name='背面照' className='up-2' id={2} src={this.state.imgSrc2} />
            <div className="tip">
                <h1>温馨提示</h1>
                <p>1、身份证正面照有效期要清晰</p>
                <p>2、身份证背面照，五官清晰可见</p>
                <p>3、图片尺寸不得小于330*226</p>
            </div>
            <button className="btn" onClick={() => this.onSubmit()}  >确定</button></div>
    }
}