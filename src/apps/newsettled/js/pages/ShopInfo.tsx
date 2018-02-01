import '../../sass/HomePage.scss';
import React from 'react';
import Layout from '../../components/AppLayout';
import { Switch, Route } from 'react-router'
import { List, InputItem, Button, Picker } from 'antd-mobile';
import ShopInfoName from '../pages/ShopInfoName';
import ShopInfoAddress from '../pages/ShopInfoAddress';
import ShopDoorImg from '../pages/ShopDoorImg';
import ShopIndoorImg from '../pages/ShopIndoorImg';
import BusinessLicense from '../pages/BusinessLicense';
import Authorized from '../pages/Authorized';
import BusinessPermit from '../pages/BusinessPermit';

const { Header, Content } = Layout;
const Item = List.Item;

const data1 = [{
    label: '快餐小吃',
    value: 11,
},
{
    label: '主题特色',
    value: 12
},
{
    label: '甜点饮品',
    value: 13
},
{
    label: '中餐宴请',
    value: 14
},
{
    label: '火锅烧烤',
    value: 15
},
{
    label: '品茶会客',
    value: 16
},
{
    label: '西餐日韩',
    value: 17
},
{
    label: '夜市宵夜',
    value: 18
}];


interface ShopInfoProps {
    data?: any;
}

class ShopInfo extends React.Component<ShopInfoProps, {
    name1?: string;
    name2?: string;

    address1?: string,
    address2?: string,
    provinceId?: number,
    districtId?: number,
    cityId?: number,
    provinceName?: string,
    districtName?: string,
    cityName?: string,
    lng?: number,
    lat?: number

    categoryId?: number,
    categoryName?: string,
    subCategoryId?: number,
    subCategoryName?: string,

    phone?: string;

    doorImgArry?: {}[];

    indoorImgArry?: {}[];

    licenseImgArry?: {}[];
    isLong?: boolean;
    useTime?: Date;
    regNumber?: string;
    wordName?: string;

    authorizedImgArry?: {}[];

    permitImgArry?: {}[];
    isLong2?: boolean;
    useTime2?: Date;

}>{

    constructor(props: ShopInfoProps) {
        super(props);
        this.state = {};
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

    onNameChange(data: { name1?: string, name2?: string }) {

        this.setState({
            name1: data.name1,
            name2: data.name2
        });

        this.backToMain();
    }

    onAddressChange(data: {
        address1?: string,
        address2?: string,
        provinceId?: number,
        districtId?: number,
        cityId?: number,
        provinceName?: string,
        districtName?: string,
        cityName?: string,
        lng?: number,
        lat?: number
    }) {
        this.setState({
            address1: data.address1,
            address2: data.address2,
            provinceId: data.provinceId,
            districtId: data.districtId,
            cityId: data.cityId,
            provinceName: data.provinceName,
            districtName: data.districtName,
            cityName: data.cityName,
            lng: data.lng,
            lat: data.lat
        })

        this.backToMain();
    }

    onShopCategoryChange(subCategoryId: number) {

        let cate = data1.find(p => p.value == subCategoryId);
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

    onShopDoorImgChange(data: any) {
        if (data && data.length) {
            this.setState({
                doorImgArry: data
            }, () => this.backToMain())
        }
    }

    onShopIndoorImgChange(data: any) {
        if (data && data.length) {
            this.setState({
                indoorImgArry: data
            }, () => this.backToMain())
        }
    }

    onLicenseChange(data: any, info: any) {
        if (data && data.length) {
            this.setState({
                licenseImgArry: data,
                isLong: info.isLong,
                useTime: info.useTime,
                regNumber: info.regNumber,
                wordName: info.wordName
            }, () => this.backToMain())
        }
    }

    onAuthorizedImgChange(data: any) {
        if (data && data.length) {
            this.setState({
                authorizedImgArry: data
            }, () => this.backToMain())
        }
    }

    onPermitChange(data: any, info: any) {
        if (data && data.length) {
            this.setState({
                permitImgArry: data,
                isLong2: info.isLong2,
                useTime2: info.useTime2,
            }, () => this.backToMain())
        }
    }

    componentWillMount() {
    }

    mainRender() {

        const shopName = this.state.name1 ? (this.state.name2 ? this.state.name1 + '(' + this.state.name2 + ')' : this.state.name1) : '必填，请输入门店名称';
        const shopAddress = this.state.address1 && this.state.provinceName && this.state.cityName && this.state.districtName ? (this.state.provinceName + this.state.cityName + this.state.districtName + this.state.address1) : '必填，请定位选择详细地址';

        return (
            <Layout>
                <Header title='完善门店信息' />
                <Content>
                    <div className="wrap clearfix" data-page='shopinfo'>
                        <List renderHeader={() => '基本信息'} className="my-list">
                            <Item arrow={'horizontal'} extra={shopName} onClick={() => window.location.href = '#/shopinfo/name'}>门店名称</Item>
                            <Item arrow={'horizontal'} extra={shopAddress} onClick={() => window.location.href = '#/shopinfo/address'}>门店地址</Item>

                            <Picker title="经营品类"
                                data={data1}
                                cols={1}
                                value={this.state.subCategoryId ? [this.state.subCategoryId] : undefined}
                                onOk={vals => {
                                    if (vals && vals.length === 1) {
                                        this.onShopCategoryChange(vals[0]);
                                    }
                                }}
                            >
                                <Item arrow={'horizontal'} extra={this.state.subCategoryName || '必填,请选择'}>经营品类</Item>
                            </Picker>

                            <InputItem value={this.state.phone || ''} type={'phone'} placeholder={'必填,请输入门店电话'} onChange={(e) => this.setState({ phone: (e || '').trim() })}>门店电话</InputItem>
                            <Item arrow={'horizontal'} extra={this.state.doorImgArry && this.state.doorImgArry.length ? '已上传' : '必填，限上传1张'} onClick={() => window.location.href = '#/shopinfo/door'}>门头照</Item>
                            <Item arrow={'horizontal'} extra={this.state.indoorImgArry && this.state.indoorImgArry.length ? '已上传' + this.state.indoorImgArry.length + '张' : '必填，请上传内景照2张'} onClick={() => window.location.href = '#/shopinfo/indoor'}>内景照</Item>
                        </List>

                        <List renderHeader={() => '证照信息'} className="my-list">
                            <Item arrow={'horizontal'} extra={this.state.licenseImgArry && this.state.licenseImgArry.length ? '已上传' : '必填，限上传1张'} onClick={() => window.location.href = '#/shopinfo/license'}>营业执照</Item>
                            <Item arrow={'horizontal'} extra={this.state.authorizedImgArry && this.state.authorizedImgArry.length ? '已上传' : '执照字号名称与实名不一致时必填'} onClick={() => window.location.href = '#/shopinfo/authorized'} wrap={true}>授权函</Item>
                            <Item arrow={'horizontal'} extra={this.state.permitImgArry && this.state.permitImgArry.length ? '已上传' : '必填，限上传1张'} onClick={() => window.location.href = '#/shopinfo/permit'}>经营许可证</Item>
                            <Item arrow={'horizontal'} extra={'选填'}>其他证明</Item>
                        </List>

                        <Button type="warning" className='btn-complete'>提交</Button>

                    </div>

                </Content >
            </Layout >);
    }


    render() {

        { console.log(this.state) };

        return (

            <Switch>
                <Route path='/shopinfo/address' render={() => <ShopInfoAddress
                    lng={this.state.lng}
                    lat={this.state.lat}
                    address1={this.state.address1}
                    address2={this.state.address2}
                    provinceId={this.state.provinceId}
                    cityId={this.state.cityId}
                    districtId={this.state.districtId}
                    provinceName={this.state.provinceName}
                    cityName={this.state.cityName}
                    districtName={this.state.districtName}
                    onEnter={val => this.onAddressChange(val)} />} />

                <Route path='/shopinfo/name' render={() => <ShopInfoName
                    name1={this.state.name1}
                    name2={this.state.name2}
                    onEnter={val => this.onNameChange(val)} />} />

                <Route path='/shopinfo/door' render={() => <ShopDoorImg
                    doorImgArry={this.state.doorImgArry}
                    onEnter={val => this.onShopDoorImgChange(val)} />}
                />} />

                  <Route path='/shopinfo/indoor' render={() => <ShopIndoorImg
                    indoorImgArry={this.state.indoorImgArry}
                    onEnter={val => this.onShopIndoorImgChange(val)} />}
                />} />

                  <Route path='/shopinfo/license' render={() => <BusinessLicense
                    licenseImgArry={this.state.licenseImgArry}
                    isLong={this.state.isLong}
                    useTime={this.state.useTime}
                    regNumber={this.state.regNumber}
                    wordName={this.state.wordName}
                    onEnter={(val, val2) => this.onLicenseChange(val, val2)} />}
                />} />

                   <Route path='/shopinfo/authorized' render={() => <Authorized
                    authorizedImgArry={this.state.authorizedImgArry}
                    onEnter={val => this.onAuthorizedImgChange(val)} />}
                />} />

                   <Route path='/shopinfo/permit' render={() => <BusinessPermit
                    permitImgArry={this.state.permitImgArry}
                    isLong2={this.state.isLong2}
                    useTime2={this.state.useTime2}
                    onEnter={(val, val2) => this.onPermitChange(val, val2)} />}
                />} />

                <Route path='/shopinfo' exact render={() => this.mainRender()} />
            </Switch>


        )

    }
}

export default ShopInfo;