import '../../sass/HomePage.scss';
import React from 'react';
import GeoLocation from '../../../../assets/libs/geo-location';
import Layout from '../../components/AppLayout';
import { List, Picker, InputItem, Button, Toast } from 'antd-mobile';
import AMapLoader from '../../../../assets/libs/amap-boot';
import GeoData from '../GeoData';

const { Header, Content } = Layout;
const Item = List.Item;

interface ShopInfoAddressProps {
    lng?: number;
    lat?: number;
    // onEnter?: (data: { lng?: number, lat?: number }) => void;
}

AMapLoader.init({
    key: 'da6e01841845f5535ef161f1c7e0425d',
    plugins: [
        'AMap.Geolocation',
        'AMap.CitySearch',
        'AMap.Geocoder'
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

    setLocation(lng: number, lat: number) {
        this.setState({
            lat: lat,
            lng: lng
        });

    }

    onPositionPick(lng: number, lat: number, _address: string) {
        this.setState({
            lng: lng,
            lat: lat
        });
    }

    onPositionName(provinceName: string, cityName: string, districtName: string) {
        this.setState({
            provinceName: provinceName,
            cityName: cityName,
            districtName: districtName
        })
    }

    componentDidMount() {
        let self = this;

        if (this.props.lng && this.props.lat) {
            self.setState({
                lng: this.props.lng,
                lat: this.props.lat
            })
        }
        else {

            GeoLocation.getLocation().then(local => {
                self.setState({
                    lng: local.longitude,
                    lat: local.latitude
                }, () => {
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

            { this.state.lng && this.state.lat ? opt.center = [this.state.lng, this.state.lat] : undefined };

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

            GeoLocation.getLocationByAddress(province.name + city.name + district.name).then(data => {
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
        // this.props.onEnter && this.props.onEnter({ name1: this.state.name1, name2: this.state.name2 });
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

                            <InputItem placeholder={'必填，须写清楚道路及门牌号'} >详细地址</InputItem>
                            <InputItem placeholder={'选填，输入附近标志性建筑物'} >附近地标</InputItem>

                        </List>

                        <div className='tip'>请在地图上标出门店地址，方便顾客准确导航到店。</div>

                        <div className='map' id="container">

                        </div>
                        <Button type="warning" className='btn-complete' onClick={() => this.onComplete()}>完成</Button>

                    </div>

                </Content >
            </Layout >);
    }

}

export default ShopInfoAddress;