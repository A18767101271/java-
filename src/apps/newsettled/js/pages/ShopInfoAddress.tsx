import '../../sass/HomePage.scss';
import React from 'react';
import Layout from '../../components/AppLayout';
import { List, Picker, InputItem, Button } from 'antd-mobile';
import GeoData from '../GeoData';

const { Header, Content } = Layout;
const Item = List.Item;

interface ShopInfoAddressProps {
    clientLocation?: {
        lng: number,
        lat: number
    }
    onEnter?: (data: { name1?: string, name2?: string }) => void;
}

class ShopInfoAddress extends React.Component<ShopInfoAddressProps, {
    provinceId?: number;
    districtId?: number;
    cityId?: number;

    provinceName?: string;
    districtName?: string;
    cityName?: string;

    address1?: string;
    address2?: string;
}>{

    constructor(props: ShopInfoAddressProps) {
        super(props);
        this.state = {};
    }

    componentWillMount() {

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
                            <InputItem placeholder={'必填，输入附近标志性建筑物'} >附近地标</InputItem>

                        </List>

                        <Button type="warning" className='btn-complete' onClick={() => this.onComplete()}>完成</Button>


                    </div>

                </Content >
            </Layout >);
    }

}

export default ShopInfoAddress;