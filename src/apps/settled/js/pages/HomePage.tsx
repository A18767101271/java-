import '../../sass/HomePage.scss';

//import bridge from '../../../../assets/libs/sardine-bridge';
import SettledApis, { FormData } from '../../../../services/settled-apis';
import React from 'react';
import classNames from 'classnames';
import { Toast, Modal } from 'antd-mobile';

interface HomePageProps {
    onReloadForm: () => void;
    formData?: FormData
}

export default class HomePage extends React.Component<HomePageProps>{
    inSubmit: boolean = false;
    constructor(props: HomePageProps) {
        super(props);
    }

    componentWillMount() {
        this.props.onReloadForm();
    }

    componentDidUpdate() {
        if (this.props.formData) {
            Toast.hide();
        }
    }

    onSubmit() {

        if (!this.props.formData) {
            return;
        }

        if (this.inSubmit) return;
        this.inSubmit = true;
        let self = this;

        let form = this.props.formData;

        if (!(this.isIntroductionFull() && this.isBaseFull() && this.isCredentialsFull())) {
            Modal.alert('提示', '尚未填写完整');
            this.inSubmit = false;
            return;
        }
        Toast.loading('加载中', 30);
        SettledApis.formApprovalSubmit({ formId: form ? form.formId : 1 }).then(_data => {
            Toast.hide();
            window.location.replace('#/success');
        }).catch(err => {
            console.log(err);
            Toast.hide();
            Modal.alert('提示', err.msg);
            self.inSubmit = false;
        });
    }

    isIntroductionFull() {
        if (!this.props.formData) {
            return false;
        }
        let data = this.props.formData;

        return !!(data.cityId && data.provinceId && data.districtId && data.subCategoryId && data.categoryId && data.shopName);
    }

    isBaseFull() {
        if (!this.props.formData) {
            return false;
        }
        let data = this.props.formData;
        return !!(data.telephone && data.address && data.storeLocation && data.businessModel
            && data.logoPicUrl && (data.isOpenAllHours || (data.firstBusinessTime && data.firstBusinessTime.length > 0)));
    }

    isCredentialsFull() {
        if (!this.props.formData) {
            return false;
        }
        let data = this.props.formData;

        return !!(data.idCardName && data.idCardNo && data.idCardBackPicUrl && data.idCardFacePicUrl
            && data.businessLicenceName && data.businessLicenceNo && data.businessLicencePicUrl);
    }

    render() {

        if (!this.props.formData) {
            return <div></div>;
        }

        let self = this;

        let data = this.props.formData;
        let arry = ['已录入', '审核中', '审核失败', '审核通过'];

        function Item1() {
            if (data.introductionInfoStatus) {
                return <div className="list list-one" onClick={() => {
                    window.location.href = '#/shopintro';
                }}>
                    <i className={"active" + data.introductionInfoStatus}></i>
                    <h1>店铺介绍信息</h1>
                    <span>{arry[data.introductionInfoStatus]}</span>
                    <em></em>
                </div>

            } else {
                const isfull = self.isIntroductionFull();
                return <div className="list list-one" onClick={() => {
                    window.location.href = '#/shopintro';
                }}>
                    <i className={classNames({
                        "active-no": !isfull,
                        "active0": isfull,
                    })}></i>
                    <h1>店铺介绍信息</h1>
                    <span>{isfull ? '已录入' : '待完善'}</span>
                    <em></em>
                </div>
            }
        }

        function Item2() {
            if (data.baseInfoStatus) {
                return <div className="list list-two" onClick={() => {
                    window.location.href = '#/shopinfo';
                }}>
                    <i className={"active" + data.baseInfoStatus}></i>
                    <h1>店铺基本信息</h1>
                    <span>{arry[data.baseInfoStatus]}</span>
                    <em></em>
                </div>
            } else {
                const isfull = self.isBaseFull();
                return <div className="list list-two" onClick={() => {
                    window.location.href = '#/shopinfo';
                }}>
                    <i className={classNames({
                        "active-no": !isfull,
                        "active0": isfull,
                    })}></i>
                    <h1>店铺基本信息</h1>
                    <span>{isfull ? '已录入' : '待完善'}</span>
                    <em></em>
                </div>
            }
        }

        function Item3() {

            if (data.credentialsInfoStatus) {
                return <div className="list list-three" onClick={() => {
                    window.location.href = '#/qinfo';
                }}>
                    <i className={"active" + data.credentialsInfoStatus}></i>
                    <h1>店铺资质</h1>
                    <span>{arry[data.credentialsInfoStatus]}</span>
                    <em></em>
                </div>

            } else {
                const isfull = self.isCredentialsFull();

                return <div className="list list-three" onClick={() => {
                    window.location.href = '#/qinfo';
                }}>
                    <i className={classNames({
                        "active-no": !isfull,
                        "active0": isfull,
                    })}></i>
                    <h1>店铺资质</h1>
                    <span>{isfull ? '已录入' : '待完善'}</span>
                    <em></em>
                </div>
            }
        }

        const allowSubmit = data.baseInfoStatus === 0 ||
            data.baseInfoStatus === 2 ||
            data.credentialsInfoStatus === 0 ||
            data.credentialsInfoStatus === 2 ||
            data.introductionInfoStatus === 0 ||
            data.introductionInfoStatus === 2;

        return (<div className="wrap" data-page='home'  >
            <Item1 />
            <Item2 />
            <Item3 />
            {allowSubmit ? <button className="btn-go" onClick={() => this.onSubmit()}>提交审核</button> : undefined}
        </div>);

    }
}