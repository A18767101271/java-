import '../../sass/HomePage.scss';
import React from 'react';
import GeoLocation from '../../../../assets/libs/geo-location';
import Layout from '../../components/AppLayout';
import { List, Picker, InputItem, Button, Toast, Modal } from 'antd-mobile';
import AMapLoader from '../../../../assets/libs/amap-boot';
import GeoData from '../GeoData';

const { Header, Content } = Layout;
const Item = List.Item;

interface ShopInfoAddressProps {
    address1?: string,
    address2?: string,
    provinceId?: number,
    districtId?: number,
    cityId?: number,
    provinceName?: string,
    districtName?: string,
    cityName?: string,
    lng?: number,
    lat?: number,
    onEnter?: (data: {
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
    }) => void;
}

AMapLoader.init({
    key: 'da6e01841845f5535ef161f1c7e0425d',
    plugins: [
        'AMap.Geolocation',
        'AMap.Geocoder',
        'AMap.PlaceSearch'
    ],
    enableUI: true
});

class ShopInfoAddress extends React.Component<ShopInfoAddressProps, {
    provinceId?: number;
    districtId?: number;
    cityId?: number;

    provinceName?: string;
    districtName?: string;
    cityName?: string;

    lng?: number;
    lat?: number;

    address1?: string;
    address2?: string;

    amapkey: string;
    version: string;
}>{

    constructor(props: ShopInfoAddressProps) {
        super(props);
        this.state = {
            amapkey: 'da6e01841845f5535ef161f1c7e0425d',
            version: '1.4.0',
        };
    }

    onPositionPick(lng: number, lat: number, _address: string) {
        this.setState({
            lng: lng,
            lat: lat
        });
    }

    componentDidMount() {
        let self = this;

        if (this.props.lng && this.props.lat) {
            self.setState({
                lng: this.props.lng,
                lat: this.props.lat,
                address1: this.props.address1,
                address2: this.props.address2,
                provinceId: this.props.provinceId,
                districtId: this.props.districtId,
                cityId: this.props.cityId,
                provinceName: this.props.provinceName,
                districtName: this.props.districtName,
                cityName: this.props.cityName,
            }, () => self.onLoadMap())
        }

        else {

            GeoLocation.getLocation().then(local => {
                self.setState({
                    lng: local.longitude,
                    lat: local.latitude
                }, () => {
                    self.onLoadMap();
                    self.getProvince(local.provinceName, local.cityName, local.districtName);
                })
            }).catch(err => {
                console.log(err);
                throw Error('定位失败');
            });
        }
    }

    onLoadMap() {
        Toast.loading('加载中');
        let self = this;

        AMapLoader.ready(() => {
            const AMap = (window as any).AMap;
            const AMapUI = (window as any).AMapUI;

            let opt: any = {
                scrollWheel: false,
                resizeEnale: true,
                zoom: 16
            };

            opt.center = [this.state.lng, this.state.lat];

            let map = new AMap.Map('container', opt);

            AMapUI.loadUI(['misc/PositionPicker'], function (PositionPicker) {

                const positionPicker = new PositionPicker({
                    mode: 'dragMap',
                    map: map
                });

                positionPicker.on('success', function (positionResult) {
                    self.onPositionPick(positionResult.position.lng, positionResult.position.lat, positionResult.address);
                });

                positionPicker.start();
                Toast.hide();
            });

        });
    }

    getProvince(provinceName: string, cityName: string, districtName: string) {
        let province = GeoData.find(p => p.fullname == provinceName);
        let city = province ? province.children.find(p => p.fullname == cityName) : undefined;
        let district = city ? city.children.find(p => p.name == districtName) : undefined;

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

    onShopCityChange(provinceId: number, cityId: number, districtId: number) {
        let self = this;
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
            })

            GeoLocation.getLocationByAddress(province.name + city.name + district.name, city.value).then(data => {
                this.setState({
                    lat: data.latitude,
                    lng: data.longitude
                }, () => self.onLoadMap());
            })

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

    onComplete() {

        if (!this.state.provinceId) {
            Modal.alert('提示', '选择省市区');
            return;
        }

        if (!this.state.address1) {
            Modal.alert('提示', '输入详细地址');
            return;
        }

        this.props.onEnter && this.props.onEnter({

            address1: this.state.address1,
            address2: this.state.address2,
            provinceId: this.state.provinceId,
            districtId: this.state.districtId,
            cityId: this.state.cityId,
            provinceName: this.state.provinceName,
            districtName: this.state.districtName,
            cityName: this.state.cityName,
            lng: this.state.lng,
            lat: this.state.lat

        });

    }

    onChangeMapLocation() {
        var self = this;

        if (this.state.provinceName && this.state.cityName && this.state.districtName && this.state.cityId) {
            const address = this.state.provinceName + this.state.cityName + this.state.districtName + this.state.address1;
            GeoLocation.getLocationByAddress(address, this.state.cityId).then(data => {
                this.setState({
                    lng: data.longitude,
                    lat: data.latitude
                }, () => self.onLoadMap())
            })
        }
        else {
            return;
        }


    }

    render() {

        return (
            <Layout>
                <Header title='门店地址' />
                <Content>
                    <div className="wrap clearfix" data-page='shopinfoaddress'>
                        <List className='my-list'>
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
                                <Item arrow={'horizontal'} extra={''}>省/市/区</Item>

                            </Picker>

                            <InputItem value={this.state.address1 || ''} placeholder={'必填，须写清楚道路及门牌号'} onChange={(e) => this.setState({ address1: e.trim() })} onBlur={() => this.onChangeMapLocation()} >详细地址</InputItem>
                            <InputItem value={this.state.address2 || ''} placeholder={'选填，输入附近标志性建筑物'} onChange={(e) => this.setState({ address2: e.trim() })}>附近地标</InputItem>

                        </List>

                        <div className='tip'>请在地图上标出门店地址，方便顾客准确导航到店。</div>

                        <div className='map' id="container"></div>

                        <Button type="warning" className='btn-complete' onClick={() => this.onComplete()}>完成</Button>

                    </div>

                </Content >
            </Layout >);
    }

}

export default ShopInfoAddress;