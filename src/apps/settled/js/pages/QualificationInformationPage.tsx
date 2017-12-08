import React from 'react';
import { FormData } from '../../../../services/settled-apis';
import '../../sass/HomePage.scss';
import { Switch, Route } from 'react-router';
import { Modal, Toast } from 'antd-mobile';
import UploadBusinessPage from './UploadBusinessPage';
import UploadIdCardPage from './UploadIdCardPage';

import SettledApis, { SaveFormCredentialsRequest } from '../../../../services/settled-apis';

// import PageExtends from '../PageExtends.js';
// import bridge from '../../../../assets/libs/sardine-bridge';

// function showIndex() {

//     PageExtends.idName = PageExtends.idName || "";
//     PageExtends.idNum = PageExtends.idNum || "";
//     PageExtends.text2 = PageExtends.text2 || '请上传';
//     PageExtends.licenseName = PageExtends.licenseName || "";
//     PageExtends.licenseNum = PageExtends.licenseNum || "";
//     PageExtends.text3 = PageExtends.text3 || '请上传';

//     var html = "";
//     html += '<header><span></span></header>
//         ' <section>
//         ' <div class="title"><i></i><span>店铺信息</span></div>
//         ' <div class="line">
//         '     <h1>身份证姓名</h1><input type="text" placeholder="请输入身份证姓名" id="id-name" value= PageExtends.idName + '>
//         ' </div>
//         ' <div class="line">
//         '     <h1>身份证号</h1><input type="text" placeholder="请输入身份证号" id="id-num"  value= PageExtends.idNum + '>
//         ' </div>
//         ' <div class="line upload-id">
//         '     <h1>身份证照</h1><i></i><span> PageExtends.text2 + '</span>
//         ' </div>
//         ' <div class="title"><i></i><span>营业执照</span></div>
//         ' <div class="line">
//         '     <h1>执照名称</h1><input type="text" placeholder="请输入执照名称" id="license-name"  value= PageExtends.licenseName + '>
//         ' </div>
//         ' <div class="line">
//         '     <h1>执照注册号</h1><input type="num" placeholder="请输入执照注册号" id="license-num" value= PageExtends.licenseNum + '>
//         ' </div>
//         ' <div class="line upload-business">
//         '     <h1>营业执照</h1><i></i><span> PageExtends.text3 + '</span>
//         ' </div>
//         '</section>
//         '<button class="btn-go">提交</button>'

//     $('.wrap').append(html);

//     $('.upload-id').on("click", function () {
//         PageExtends.idName = $('#id-name').val();
//         PageExtends.idNum = $('#id-num').val();
//         PageExtends.licenseName = $('#license-name').val();
//         PageExtends.licenseNum = $('#license-num').val();
//         PageExtends.text3 = $('.upload-business span').text();
//         window.location.href = "#/upcard";
//     });

//     $('.upload-business').on('click', function () {
//         PageExtends.idName = $('#id-name').val();
//         PageExtends.idNum = $('#id-num').val();
//         PageExtends.text2 = $('.upload-id span').text();
//         PageExtends.licenseName = $('#license-name').val();
//         PageExtends.licenseNum = $('#license-num').val();
//         window.location.href = "#/upbusin";
//     });

//     $('.btn-go').on('click', function () {

//         var id_name = $('#id-name').val();
//         var id_num = $('#id-num').val();
//         var license_name = $('#license-name').val();
//         var license_num = $('#license-num').val();

//         if (!id_name) {
//             bridge.dialog({
//                 title: "提示",
//                 content: "请输入身份证姓名！",
//                 type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
//                 buttons: [{
//                     text: 'ok'
//                 }],
//             });
//             return;
//         }

//         if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(id_num))) {
//             bridge.dialog({
//                 title: "提示",
//                 content: "请输入正确的身份证号！",
//                 type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
//                 buttons: [{
//                     text: 'ok'
//                 }],
//             });
//             return;
//         }


//         if (!PageExtends.Id1) {
//             bridge.dialog({
//                 title: "提示",
//                 content: "请上传身份证照片！",
//                 type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
//                 buttons: [{
//                     text: 'ok'
//                 }],
//             });
//             return;
//         }

//         if (!license_name) {
//             bridge.dialog({
//                 title: "提示",
//                 content: "请输入执照名称！",
//                 type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
//                 buttons: [{
//                     text: 'ok'
//                 }],
//             });
//             return;
//         }

//         if (!license_num) {
//             bridge.dialog({
//                 title: "提示",
//                 content: "请输入执照注册号！",
//                 type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
//                 buttons: [{
//                     text: 'ok'
//                 }],
//             });
//             return;
//         }

//         if (!PageExtends.Id3) {
//             bridge.dialog({
//                 title: "提示",
//                 content: "请上传营业执照！",
//                 type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
//                 buttons: [{
//                     text: 'ok'
//                 }],
//             });
//             return;
//         }

//         var obj = {};

//         obj.form_id = PageExtends.formId;    
//         obj.id_card_name = id_name;     
//         obj.id_card_no = id_num;    
//         obj.resource_count = 3;
//         obj.resource_uids = "facePic_" + PageExtends.Id1 + ',backPic_ PageExtends.Id2 + ',licencePic_ PageExtends.Id3;     
//         obj.business_licence_name = license_name;     
//         obj.business_licence_no = license_num;     
//         obj.id_card_type = 1;

//         obj.success = function (data) {
//             console.log(data);
//             if (data.success == true) {
//                 var obj = {};
//                 obj.form_id = PageExtends.formId;
//                 obj.success = function (data) {
//                         bridge.dialog({
//                             title: "提示",
//                             content: "提交成功！",
//                             type: "alert", //可选【alert，confirm】，窗体类型，默认为 alert
//                             buttons: [{
//                                 text: 'ok'
//                             }],
//                         });
//                         window.location.href = "#/";
//                     },
//                     obj.error = function (data) {
//                         console.log(data);
//                     }
//                 PageExtends.API.storeFormApprovalSubmit(obj);
//             }
//         };
//         obj.error = function (data) {
//             console.log(data);
//         }

//         PageExtends.API.storeFormCredentialsSave(obj);
//     })

// }

// export default {
//     name: 'qualificationinfo',
//     render: function () {
//         showIndex();
//     }

// }

interface QualificationInformationPageProps {
    formData?: FormData;
}

export default class QualificationInformationPage extends React.Component<QualificationInformationPageProps, {
    idCardName?: string;
    idCardNo?: string;

    idCardFacePicUid?: string;
    idCardBackPicUid?: string;
    businessLicencePicUid?: string;

    idCardFacePicUrl?: string;
    idCardBackPicUrl?: string;
    businessLicencePicUrl?: string;

    businessLicenceNo?: string;
    businessLicenceName?: string;
}> {
    inSubmit: boolean = false;
    constructor(props: QualificationInformationPageProps) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        const form = this.props.formData;
        if (!form) {
            window.location.replace('#/home');
            return;
        }

        if (form.idCardName) {
            this.onIdCardNameChange(form.idCardName);
        }
        if (form.idCardNo) {
            this.onIdCardNoChange(form.idCardNo);
        }
        if (form.idCardBackPicUrl && form.idCardFacePicUrl) {
            this.onIdCardPicChange(form.idCardFacePicUrl, form.idCardBackPicUrl);
        }
        if (form.businessLicenceName) {
            this.onBusinessLicenceNameChange(form.businessLicenceName);
        }
        if (form.businessLicenceNo) {
            this.onBusinessLicenceNoChange(form.businessLicenceNo);
        }
        if (form.businessLicencePicUrl) {
            this.onBusinessLicencePicChange({ src: form.businessLicencePicUrl });
        }
    }

    onIdCardNameChange(val: string) {
        if (val) {
            this.setState({
                idCardName: val
            });
        } else {
            this.setState({
                idCardName: undefined
            });
        }
    }

    onIdCardNoChange(val: string) {
        if (val) {
            this.setState({
                idCardNo: val
            });
        } else {
            this.setState({
                idCardNo: undefined
            });
        }
    }

    onBusinessLicenceNoChange(val: string) {
        if (val) {
            this.setState({
                businessLicenceNo: val
            });
        } else {
            this.setState({
                businessLicenceNo: undefined
            });
        }
    }

    onBusinessLicenceNameChange(val: string) {
        if (val) {
            this.setState({
                businessLicenceName: val
            });
        } else {
            this.setState({
                businessLicenceName: undefined
            });
        }
    }

    backToMain() {
        const lt = '#/qinfo/';
        if (window.location.hash && window.location.hash.startsWith(lt)
            && window.location.hash.length > lt.length && window.location.hash[lt.length] != '?') {
            if (window.history.length > 1)
                window.history.back();
            else
                window.location.replace(lt);
        }
    }

    onIdCardPicChange(forePicSrc: string, backPicSrc: string, forePicId?: string, backPicId?: string) {
        if (forePicId && backPicId) {
            this.setState({
                idCardFacePicUrl: forePicSrc,
                idCardBackPicUrl: backPicSrc,
                idCardFacePicUid: forePicId,
                idCardBackPicUid: backPicId
            });
        } else if (!this.state.idCardFacePicUrl || !this.state.idCardBackPicUrl) {
            this.setState({
                idCardFacePicUrl: forePicSrc,
                idCardBackPicUrl: backPicSrc
            });
        }

        this.backToMain();
    }


    onBusinessLicencePicChange(data: { uid?: string, src: string }) {
        if (data.uid) {
            this.setState({
                businessLicencePicUid: data.uid,
                businessLicencePicUrl: data.src
            });
        } else if (!this.state.businessLicencePicUrl) {
            this.setState({
                businessLicencePicUrl: data.src
            });
        }
        this.backToMain();
    }
    onSubmit() {
        if (this.inSubmit) return;
        this.inSubmit = true;
        let self = this;
        let input = this.state;

        if (!input.idCardName) {
            Modal.alert('提示', '请输入身份证姓名');
            this.inSubmit = false;
            return;
        }

        if (!input.idCardNo) {
            Modal.alert('提示', '请输入身份证号');
            this.inSubmit = false;
            return;
        }

        if (!input.idCardBackPicUid && !input.idCardBackPicUrl && !input.idCardFacePicUid && !input.idCardFacePicUrl) {
            Modal.alert('提示', '请上传身份证照片');
            this.inSubmit = false;
            return;
        }

        if (!input.businessLicenceName) {
            Modal.alert('提示', '请输入营业执照名称');
            this.inSubmit = false;
            return;
        }

        if (!input.businessLicenceNo) {
            Modal.alert('提示', '请输入营业执照号');
            this.inSubmit = false;
            return;
        }

        if (!input.businessLicencePicUid && !input.businessLicencePicUrl) {
            Modal.alert('提示', '请上传营业执照照片');
            this.inSubmit = false;
            return;
        }

        const form = this.props.formData as FormData;


        let req: SaveFormCredentialsRequest = {
            formId: form.formId,
            idCardName: input.idCardName,
            idCardNo: input.idCardNo,
            businessLicenceName: input.businessLicenceName,
            businessLicenceNo: input.businessLicenceNo
        };

        if (input.idCardBackPicUid && input.idCardFacePicUid) {
            req.idCardBackImgId = input.idCardBackPicUid;
            req.idCardFrontImgId = input.idCardFacePicUid;
        }

        if (input.businessLicencePicUid) {
            req.businessLicenseImgId = input.businessLicencePicUid;
        }

        Toast.loading('加载中', 30);
        SettledApis.saveFormCredentials(req).then(_data => {
            Toast.hide();
            window.location.replace('#/home');
            self.inSubmit = false;
        }).catch(err => {
            console.log(err);
            Toast.hide();
            Modal.alert('提示', err.msg);
            self.inSubmit = false;
        });

    }
    mainRender() {

        return (<div className="wrap" data-page='qualificationinfo'><section>
            <div className="title"><i></i><span>店铺信息</span></div>
            <div className="line">
                <span className='h11'>身份证姓名</span><input
                    type="text"
                    placeholder="请输入身份证姓名"
                    value={this.state.idCardName || ''}
                    onChange={e => this.onIdCardNameChange(e.target.value)} />
            </div>
            <div className="line">
                <span className='h11'>身份证号</span><input
                    type="text"
                    placeholder="请输入身份证号"
                    value={this.state.idCardNo || ''}
                    onChange={e => this.onIdCardNoChange(e.target.value)} />
            </div>
            <div className="line upload-id" onClick={() => {
                window.location.href = '#/qinfo/upcard';
            }}>
                <span className='h11'>身份证照</span><i></i>
                <span>{this.state.idCardFacePicUrl && this.state.idCardBackPicUrl ? '已上传' : '未设置'}</span>
            </div>
            <div className="title"><i></i><span>营业执照</span></div>
            <div className="line">
                <span className='h11'>执照名称</span><input
                    type="text"
                    placeholder="请输入执照名称"
                    value={this.state.businessLicenceName || ''}
                    onChange={e => this.onBusinessLicenceNameChange(e.target.value)} />
            </div>
            <div className="line">
                <span className='h11'>执照注册号</span><input
                    type="text"
                    placeholder="请输入执照注册号"
                    value={this.state.businessLicenceNo || ''}
                    onChange={e => this.onBusinessLicenceNoChange(e.target.value)} />
            </div>
            <div className="line upload-business" onClick={() => {
                window.location.href = '#/qinfo/upbusin';
            }}>
                <span className='h11'>营业执照</span><i></i><span>{this.state.businessLicencePicUrl ? '已上传' : '未设置'}</span>
            </div>
        </section>
            <button className="btn-go" onClick={() => this.onSubmit()}>保存</button></div>);

    }

    render() {

        if (!this.props.formData) {
            window.location.replace('#/ready');
            return <p>表单无效</p>
        }

        //const form = this.props.formData;

        return <Switch>
            <Route path='/qinfo/upcard' exact render={() => <UploadIdCardPage
                foreSrc={this.state.idCardFacePicUrl}
                backSrc={this.state.idCardBackPicUrl}
                onEnter={d => this.onIdCardPicChange(d.fore.src, d.back.src, d.fore.uid, d.back.uid)}
            />} />
            <Route path='/qinfo/upbusin' exact render={() => <UploadBusinessPage
                imgSrc={this.state.businessLicencePicUrl}
                onEnter={(d) => this.onBusinessLicencePicChange(d)} />} />
            <Route path='/qinfo' exact render={() => this.mainRender()} />
        </Switch>

    }

}