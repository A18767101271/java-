import React from 'react';

import { Modal, Picker, Toast } from 'antd-mobile';
import GeoData from '../GeoData';

import ShopCategories from '../ShopCategories';
import SettledApis, { FormData } from '../../../../services/settled-apis';
import '../../sass/HomePage.scss';


interface ShopIntroductionPageProps {
    formData?: FormData;
    clientLocation?: {
        lng: number,
        lat: number
    }
}

class ShopIntroductionPage extends React.Component<ShopIntroductionPageProps, {
    provinceId?: number;
    districtId?: number;
    cityId?: number;

    provinceName?: string;
    districtName?: string;
    cityName?: string;

    categoryId?: number;
    subCategoryId?: number;
    categoryName?: string;
    subCategoryName?: string;
    shopName?: string;

    introductionStatus?: number;
    introductionFailReason?: string;

}> {

    inSubmit: boolean = false;

    constructor(props: ShopIntroductionPageProps) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        if (this.props.formData) {
            const d = this.props.formData;
   
            this.setState({
                introductionStatus: d.introductionInfoStatus,
                introductionFailReason: d.introductionInfoFailReason
            })
            this.onShopCityChange(d.provinceId, d.cityId, d.districtId);
            this.onShopNameChange(d.shopName);
            this.onShopCategoryChange(d.subCategoryId);
        }
    }

    onShopCityChange(provinceId: number, cityId: number, districtId: number) {
        let province = GeoData.find(p => p.value == provinceId);
        let city = province ? province.children.find(p => p.value == cityId) : undefined;
        let district = city ? city.children.find(p => p.value == districtId) : undefined;

        if (province && city && district) {
            this.setState({
                provinceId: province.value,
                provinceName: province.name,
                cityId: city.value,
                cityName: city.name,
                districtId: district.value,
                districtName: district.name
            });
        } else {
            this.setState({
                provinceId: undefined,
                provinceName: undefined,
                cityId: undefined,
                cityName: undefined,
                districtId: undefined,
                districtName: undefined
            });
        }

    }

    onShopNameChange(shopName: string) {

        let name = shopName ? shopName.trim() : '';
        this.setState({
            shopName: name
        });

    }

    onShopCategoryChange(subCategoryId: number) {

        let cate = ShopCategories.find(p => p.value == subCategoryId);
        if (cate) {
            this.setState({
                categoryId: 1,
                categoryName: '餐饮美食',
                subCategoryId: cate.value,
                subCategoryName: cate.label,
            });
        } else {
            this.setState({
                categoryId: undefined,
                categoryName: undefined,
                subCategoryId: undefined,
                subCategoryName: undefined,
            });
        }

    }


    onSubmit() {
        //data-href="#/shopintro"

        if (this.inSubmit) return;
        this.inSubmit = true;

        if (!this.state.provinceId || !this.state.cityId || !this.state.districtId) {
            // bridge.dialog({
            //     title: "提示",
            //     content: '请选择店铺区域',
            //     type: "alert",
            //     buttons: [{
            //         text: 'ok'
            //     }],
            // });

            Modal.alert('提示', '请选择店铺区域');

            this.inSubmit = false;
            return;
        }

        if (!this.state.shopName || this.state.shopName.length < 1) {
            // bridge.dialog({
            //     title: "提示",
            //     content: '请输入店铺名称',
            //     type: "alert",
            //     buttons: [{
            //         text: 'ok'
            //     }],
            // });
            Modal.alert('提示', '请输入店铺名称');
            this.inSubmit = false;
            return;
        }

        if (!this.state.subCategoryId || !this.state.categoryId) {
            // bridge.dialog({
            //     title: "提示",
            //     content: '请选择行业类别',
            //     type: "alert",
            //     buttons: [{
            //         text: 'ok'
            //     }],
            // });
            Modal.alert('提示', '请选择行业类别');
            this.inSubmit = false;
            return;
        }

        let self = this;

        Toast.loading('加载中', 30);
        if (this.props.formData) {
            SettledApis.saveFormIntroduction({
                formId: this.props.formData.formId,
                shopName: this.state.shopName,
                categoryId: this.state.categoryId,
                categoryName: this.state.categoryName || '',
                subCategoryId: this.state.subCategoryId,
                subCategoryName: this.state.subCategoryName || '',
                provinceId: this.state.provinceId,
                cityId: this.state.cityId,
                districtId: this.state.districtId
            }).then(_data => {
                Toast.hide();
                window.location.replace('#/home');
                self.inSubmit = false;
            }).catch(err => {
                console.log(err);
                Toast.hide();
                Modal.alert('提示', err.msg);
                self.inSubmit = false;
            });
        } else {
            SettledApis.createForm({
                shopName: this.state.shopName,
                categoryId: this.state.categoryId,
                categoryName: this.state.categoryName || '',
                subCategoryId: this.state.subCategoryId,
                subCategoryName: this.state.subCategoryName || '',
                provinceId: this.state.provinceId,
                cityId: this.state.cityId,
                districtId: this.state.districtId,
                clientLocation: this.props.clientLocation
            }).then(_data => {
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


    }

    render() {

        return (<div className="wrap" data-page='shopintroduction' >
            {this.state.introductionStatus === 2 ? <div className="pick-2"><div className="head-bar">
                <h1>审核未通过</h1><span>{this.state.introductionFailReason}</span></div></div> : undefined}
            <section>
                <div className="title"><i></i><span>店铺介绍</span></div>

                <Picker title="选择地区"
                    data={GeoData}
                    cols={3}
                    value={this.state.provinceId && this.state.cityId && this.state.districtId ?
                        [this.state.provinceId, this.state.cityId, this.state.districtId] : undefined}
                    onOk={vals => {
                        if (vals && vals.length === 3) {
                            this.onShopCityChange(vals[0], vals[1], vals[2]);
                        }
                    }}
                >
                    <div className="line pick-provin">
                        <span className="h11">店铺区域</span><i></i>
                        <span className="sp">{this.state.districtName ?
                            this.state.provinceName + '/' + this.state.cityName + '/' + this.state.districtName : '请选择'}</span>
                    </div>
                </Picker>

                <div className="line">
                    <span className="h11">店铺名称</span><input type="text" placeholder="请输入店铺名称"
                        className="t-input" value={this.state.shopName || ''} onChange={(e) => {
                            this.onShopNameChange(e.target.value);
                        }} />
                </div>

                <Picker title="行业类别"
                    data={ShopCategories}
                    cols={1}
                    value={this.state.subCategoryId ? [this.state.subCategoryId] : undefined}
                    onOk={vals => {
                        if (vals && vals.length === 1) {
                            this.onShopCategoryChange(vals[0]);
                        }
                    }}
                >
                    <div className="line pick-industry">
                        <span className="h11">行业类别</span><i></i><span className="sp">{this.state.subCategoryName || '请选择'}</span>
                    </div>
                </Picker>

            </section>
            <button className="btn-go" onClick={() => { this.onSubmit() }} >保存</button></div >);

    }

}

export default ShopIntroductionPage;