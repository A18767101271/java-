import React from 'react';
import { FormData } from '../../../../services/settled-apis';
import '../../sass/HomePage.scss';
import { Switch, Route } from 'react-router';
import { Modal, Toast } from 'antd-mobile';
import UploadBusinessPage from './UploadBusinessPage';
import UploadIdCardPage from './UploadIdCardPage';

import SettledApis, { SaveFormCredentialsRequest } from '../../../../services/settled-apis';

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

    credentialsInfoStatus?: number;
    credentialsInfoFailReason?: string;
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

        this.setState({
            credentialsInfoStatus: form.credentialsInfoStatus,
            credentialsInfoFailReason: form.credentialsInfoFailReason
        });

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

        return (<div className="wrap" data-page='qualificationinfo'>
            {this.state.credentialsInfoStatus === 2 ? <div className="pick-2"><div className="head-bar"><h1>审核失败</h1><span>{this.state.credentialsInfoFailReason}</span></div></div> : undefined}
            <section>
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