import '../../sass/HomePage.scss';
// import PageExtends from '../PageExtends.js';
import AMapLoader from '../../../../assets/libs/amap-boot';
// import geoData from '../../../../assets/libs/geo-data-areas';
// import bridge from '../../../../assets/libs/sardine-bridge';
import GeoData from '../GeoData';
import React from 'react';
import { Modal } from 'antd-mobile';

interface PickAddressPageProps {
    defaultValue: PickAddressValue;
    onEnter?: (value: PickAddressValue) => void;
}

interface PickAddressValue {
    provinceId: number;
    //provinceName: string,
    cityId: number;
    //cityName: string,
    districtId: number;
    //districtName: string
    lng?: number;
    lat?: number;
    address?: string;
}

export default class PickAddressPage extends React.Component<PickAddressPageProps, PickAddressValue> {

    constructor(props: PickAddressPageProps) {
        super(props);
        this.state = {
            ...props.defaultValue
        };
    }


    onPositionPick(lng: number, lat: number, _address: string) {
        this.setState({
            lng: lng,
            lat: lat
        });
    }

    onAddressChange(address: string) {
        if (address) {
            this.setState({
                address: address.trim()
            });
        } else {
            this.setState({
                address: undefined
            });
        }
    }


    onSubmit() {

        if (this.state.lng && this.state.lat && this.state.address) {
            this.props.onEnter && this.props.onEnter({
                lng: this.state.lng,
                lat: this.state.lat,
                address: this.state.address,
                provinceId: this.state.provinceId,
                cityId: this.state.cityId,
                districtId: this.state.districtId
            });
        }
        else {
            Modal.alert('提示', "请输入详细地址！");
        }

    }

    componentDidMount() {
        let self = this;
        AMapLoader.ready(() => {

            const AMap = (window as any).AMap;
            const AMapUI = (window as any).AMapUI;

            let opt: any = {
                scrollWheel: false,
                resizeEnale: true,
                zoom: 13
            };

            const setGps = !!(this.props.defaultValue.lat && this.props.defaultValue.lng);

            if (setGps) {
                opt.center = [this.props.defaultValue.lng, this.props.defaultValue.lat];
            }

            let map = new AMap.Map('container', opt);

            if (!setGps) {
                map.setCity(this.props.defaultValue.cityId + '', () => {
                    map.setZoom(13);
                });
            }

            AMapUI.loadUI(['misc/PositionPicker'], function (PositionPicker) {

                const positionPicker = new PositionPicker({
                    mode: 'dragMap',
                    map: map
                });

                positionPicker.on('success', function (positionResult) {

                    self.onPositionPick(positionResult.position.lng, positionResult.position.lat, positionResult.address);

                });

                positionPicker.start();

            });

        });
    }

    render() {

        let position = this.props.defaultValue;
        let province = GeoData.find(p => p.value == position.provinceId);
        let city = province ? province.children.find(p => p.value == position.cityId) : undefined;
        let district = city ? city.children.find(p => p.value == position.districtId) : undefined;

        const addressName =
            (province ? province.fullname || province.name : '') + ' ' +
            (city ? city.fullname || city.name : '') + ' ' +
            (district ? district.fullname || district.name : '');

        return (<div className="wrap" data-page='pickaddress'>
            <button className='enter-btn' onClick={() => { this.onSubmit(); }} >确定</button>
            <div className="flow-input">
                <div className="input-1"><span className="h11">店铺区域</span><span className="input-area">{addressName}</span></div>
                <div className="input-2"><span className="h11">详细地址</span><input
                    type="text"
                    className="input-address"
                    placeholder="请填写详情地址，如街道名称，门牌号等"
                    value={this.state.address || ''}
                    onChange={(e) => { this.onAddressChange(e.target.value); }}
                /></div>
            </div>
            <div id="container" className="map"  ></div>
        </div>);
    }

}
