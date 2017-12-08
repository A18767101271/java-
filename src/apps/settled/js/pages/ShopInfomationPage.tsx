import '../../sass/HomePage.scss';
//import PageExtends from '../PageExtends.js';
//import bridge from '../../../../assets/libs/sardine-bridge';
import { Picker, Modal, Toast } from 'antd-mobile';
import React from 'react';
import PickAddressPage from './PickAddressPage';
import { FormData } from '../../../../services/settled-apis';
import { Switch, Route } from 'react-router'
import GeoData from '../GeoData';

import UploadShopImgPage from './UploadShopImgPage';
import PickTimePage, { BizTimeItem, formatTimeText } from './PickTimePage';

import SettledApis, { SaveFormBaseRequest } from '../../../../services/settled-apis';



interface ShopInfomationPageProps {
    formData?: FormData;
}

class ShopInfomationPage extends React.Component<ShopInfomationPageProps, {
    shopTel?: string;
    address?: string;
    lng?: number;
    lat?: number;
    fullAddress?: string;
    businessModel?: number;
    bizTimes?: {
        in24th: boolean;
        times?: BizTimeItem[];
        text?: string;
    };
    logoUid?: string;
    logoSrc?: string;
}> {

    inSubmit: boolean = false;

    constructor(props: ShopInfomationPageProps) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        const form = this.props.formData;
        if (!form) {
            window.location.replace('#/home');
            return;
        }

        this.onShopTelChange(form.telephone || '');

        const lng = form.storeLocation && form.storeLocation.length == 2 ? form.storeLocation[0] : undefined;
        const lat = form.storeLocation && form.storeLocation.length == 2 ? form.storeLocation[1] : undefined;

        this.onAddressChange({ address: form.address, lng, lat });

        const times: BizTimeItem[] = [];

        if (form.firstBusinessTime && form.firstBusinessTime.length === 2) {
            let t: BizTimeItem = {
                beginHours: Math.floor(form.firstBusinessTime[0] / 100),
                beginMinutes: form.firstBusinessTime[0] % 100,
                endHours: Math.floor(form.firstBusinessTime[1] / 100),
                endMinutes: form.firstBusinessTime[1] % 100
            };
            t.formatText = formatTimeText(t.beginHours, t.beginMinutes, t.endHours, t.endMinutes);
            times.push(t);
        }

        if (form.secondBusinessTime && form.secondBusinessTime.length === 2) {
            let t: BizTimeItem = {
                beginHours: Math.floor(form.secondBusinessTime[0] / 100),
                beginMinutes: form.secondBusinessTime[0] % 100,
                endHours: Math.floor(form.secondBusinessTime[1] / 100),
                endMinutes: form.secondBusinessTime[1] % 100
            };
            t.formatText = formatTimeText(t.beginHours, t.beginMinutes, t.endHours, t.endMinutes);
            times.push(t);
        }

        this.onTimesChange({ is24th: !!form.isOpenAllHours, times });

        this.onBusinessModelChange(form.businessModel || 0);

        if (form.logoPicUrl) {
            this.onLogoChange({ src: form.logoPicUrl });
        }

    }

    onAddressChange(data: {
        address?: string;
        lng?: number;
        lat?: number;
        fullAddress?: string;
    }) {

        if (data && data.lng && data.lat && data.address && this.props.formData) {

            let position = this.props.formData;
            let province = GeoData.find(p => p.value == position.provinceId);
            let city = province ? province.children.find(p => p.value == position.cityId) : undefined;
            let district = city ? city.children.find(p => p.value == position.districtId) : undefined;

            const addressName =
                (province ? province.fullname || province.name : '') + ' ' +
                (city ? city.fullname || city.name : '') + ' ' +
                (district ? district.fullname || district.name : '') + ' ' +
                data.address;

            this.setState({
                fullAddress: addressName,
                address: data.address,
                lng: data.lng,
                lat: data.lat
            });

        } else {
            this.setState({
                fullAddress: undefined,
                address: undefined,
                lng: undefined,
                lat: undefined
            });
        }
        this.backToMain();
    }

    onBusinessModelChange(val: number) {
        if (val === 1 || val === 2) {
            this.setState({
                businessModel: val
            });
        } else {
            this.setState({
                businessModel: undefined
            });
        }
    }

    onTimesChange(val: { is24th: boolean, times?: BizTimeItem[] }) {
        if (val.is24th) {
            this.setState({
                bizTimes: {
                    in24th: val.is24th,
                    times: [],
                    text: '24小时'
                }
            });
        } else if (val.times && val.times.length > 0) {
            this.setState({
                bizTimes: {
                    in24th: val.is24th,
                    times: val.times,
                    text: val.times.map(p => p.formatText).join(',')
                }
            })
        } else {
            this.setState({
                bizTimes: undefined
            });
        }
        this.backToMain();
    }

    onShopTelChange(val: string) {
        this.setState({
            shopTel: (val || '').trim()
        });
    }

    backToMain() {
        const lt = '#/shopinfo/';
        if (window.location.hash && window.location.hash.startsWith(lt) && window.location.hash.length > lt.length && window.location.hash[lt.length] != '?') {
            if (window.history.length > 1)
                window.history.back();
            else
                window.location.replace(lt);
        }
    }

    onLogoChange(data: { uid?: string, src: string }) {
        if (data.uid) {
            this.setState({
                logoUid: data.uid,
                logoSrc: data.src
            });
        } else if (!this.state.logoSrc) {
            this.setState({
                logoSrc: data.src
            });
        }

        this.backToMain();
    }

    onSubmit() {
        if (this.inSubmit) return;
        this.inSubmit = true;
        let self = this;
        let input = this.state;

        if (!input.shopTel) {
            Modal.alert('提示', '请输入门店电话');
            this.inSubmit = false;
            return;
        }

        if (!input.address) {
            Modal.alert('提示', '请输入店铺地址');
            this.inSubmit = false;
            return;
        }

        if (!input.lat || !input.lng) {
            Modal.alert('提示', '店铺地址定位无效');
            this.inSubmit = false;
            return;
        }

        if (!input.bizTimes) {
            Modal.alert('提示', '请选择营业时间');
            this.inSubmit = false;
            return;
        }

        if (!input.businessModel) {
            Modal.alert('提示', '请选择营业模式');
            this.inSubmit = false;
            return;
        }

        if (!input.logoUid && !input.logoSrc) {
            Modal.alert('提示', '请上传店铺门脸照');
            this.inSubmit = false;
            return;
        }

        const form = this.props.formData as FormData;
        let req: SaveFormBaseRequest = {
            formId: form.formId,
            telephone: input.shopTel.trim(),
            address: input.address.trim(),
            storeLocation: {
                lng: input.lng,
                lat: input.lat
            },
            isOpenAllHours: input.bizTimes.in24th,
            businessModel: input.businessModel,
            //resource_count: resource_count,
            logoImgId: input.logoUid,
        };
        if (input.bizTimes.times && input.bizTimes.times.length > 0) {
            const tms = input.bizTimes.times;
            req.firstBusinessTime = {
                begin: {
                    hours: tms[0].beginHours,
                    minutes: tms[0].beginMinutes
                },
                end: {
                    hours: tms[0].endHours,
                    minutes: tms[0].endMinutes
                }
            };
            if (tms.length > 1) {
                req.secondBusinessTime = {
                    begin: {
                        hours: tms[1].beginHours,
                        minutes: tms[1].beginMinutes
                    },
                    end: {
                        hours: tms[1].endHours,
                        minutes: tms[1].endMinutes
                    }
                };
            }
        }

        Toast.loading('加载中', 30);
        SettledApis.saveFormBase(req).then(_data => {
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

        const pickTypes: string[] = [];
        pickTypes[1] = '先吃后付';
        pickTypes[2] = '先付后吃';

        const pickTypesData = [{
            value: 1,
            label: '先吃后付'
        }, {
            value: 2,
            label: '先付后吃'
        }];

        return <div className="wrap" data-page='shopinfo'>
            <section>
                <div className="title"><i></i><span>店铺信息</span></div>
                <div className="line">
                    <span className="h11">门店电话</span><input type="text" placeholder="请输入门店电话" value={this.state.shopTel || ''} onChange={(e) => { this.onShopTelChange(e.target.value) }} />
                </div>
                <div className="line pick-address" onClick={() => {
                    window.location.href = '#/shopinfo/address';
                }} >
                    <span className="h11">详细地址</span><i></i><span className="sp">{this.state.fullAddress || '未设置'}</span>
                </div>
                <div className="line pick-time" onClick={() => {
                    window.location.href = '#/shopinfo/picktime';
                }} >
                    <span className="h11">营业时间</span><i></i><span className="sp">{this.state.bizTimes ? this.state.bizTimes.text : '未设置'}</span>
                </div>


                <Picker title="营收模式"
                    data={pickTypesData}
                    value={this.state.businessModel ? [this.state.businessModel] : undefined}
                    cols={1}
                    onOk={vals => {
                        if (vals && vals.length === 1) {
                            this.onBusinessModelChange(vals[0]);
                        }
                    }}
                >
                    <div className="line pick-type">
                        <span className="h11">营收模式</span><i></i><span className="sp">{this.state.businessModel ? pickTypes[this.state.businessModel] : '未设置'}</span>
                    </div>
                </Picker>


                <div className="line upload" onClick={() => {
                    window.location.href = '#/shopinfo/upimg';
                }} >
                    <span className="h11">店铺门脸照</span><i></i><span className="sp">{this.state.logoUid || this.state.logoSrc ? '已上传' : '未设置'}</span>
                </div>
            </section>
            <button className="btn-go" onClick={() => {
                this.onSubmit();
            }} >保存</button></div>
    }




    render() {

        if (!this.props.formData) {
            window.location.replace('#/ready');
            return <p>表单无效</p>
        }

        const form = this.props.formData;

        return <Switch>
            <Route path='/shopinfo/picktime' render={() => <PickTimePage
                in24th={this.state.bizTimes ? this.state.bizTimes.in24th : undefined}
                times={this.state.bizTimes ? this.state.bizTimes.times : undefined}
                onEnter={value => {
                    this.onTimesChange(value);
                }}
            />} />
            <Route path='/shopinfo/address' exact render={() => <PickAddressPage defaultValue={{
                cityId: form.cityId,
                provinceId: form.provinceId,
                districtId: form.districtId,
                lng: this.state.lng,
                lat: this.state.lat,
                address: this.state.address
            }} onEnter={(d) => this.onAddressChange(d)} />} />
            <Route path='/shopinfo/upimg' render={() => <UploadShopImgPage
                imgSrc={this.state.logoSrc}
                onEnter={val => this.onLogoChange(val)}
            />} />
            <Route path='/shopinfo' exact render={() => this.mainRender()} />
        </Switch>

    }

}


export default ShopInfomationPage 