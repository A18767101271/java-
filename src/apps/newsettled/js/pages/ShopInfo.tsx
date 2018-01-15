import '../../sass/HomePage.scss';
import React from 'react';
import Layout from '../../../../apps/components/AppLayout';
import { Switch, Route } from 'react-router'
//import classNames from 'classNames';
// import moment from 'moment';
import { List, InputItem, Button } from 'antd-mobile';
import ShopInfoName from '../pages/ShopInfoName';
import ShopInfoAddress from '../pages/ShopInfoAddress';

const { Header, Content } = Layout;
const Item = List.Item;



interface ShopInfoProps {
    data?: any;
}

class ShopInfo extends React.Component<ShopInfoProps, {
    name1?: string;
    name2?: string;
    phone?: string;
    lng?: number;
    lat?: number;
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

    onLogoChange(data: { name1?: string, name2?: string }) {
        if (data.name1) {
            this.setState({
                name1: data.name1,
                name2: data.name2
            });
        }

        this.backToMain();
    }

    componentWillMount() {
    }

    mainRender() {

        const shopName = this.state.name1 ? (this.state.name2 ? this.state.name1 + '(' + this.state.name2 + ')' : this.state.name1) : '必填，请输入门店名称';

        return (
            <Layout>
                <Header title='完善门店信息' />
                <Content>
                    <div className="wrap clearfix" data-page='shopinfo'>
                        <List renderHeader={() => '基本信息'} className="my-list">
                            <Item arrow={'horizontal'} extra={shopName} onClick={() => window.location.href = '#/shopinfo/name'}>门店名称</Item>
                            <Item arrow={'horizontal'} extra={'必填，请定位选择详细地址'} onClick={() => window.location.href = '#/shopinfo/address'}>门店地址</Item>
                            <Item arrow={'horizontal'} extra={'必填，请选择'}>经营品类</Item>
                            <InputItem value={this.state.phone || ''} type={'phone'} placeholder={'必填,请输入门店电话'} onChange={(e) => this.setState({ phone: (e || '').trim() })}>门店电话</InputItem>
                            <Item arrow={'horizontal'} extra={'必填，限上传1张'}>门头照</Item>
                            <Item arrow={'horizontal'} extra={'必填，请上传内景照2张'}>内景照</Item>
                        </List>

                        <List renderHeader={() => '证照信息'} className="my-list">
                            <Item arrow={'horizontal'} extra={'必填，请上传'}>营业执照</Item>
                            <Item arrow={'horizontal'} extra={'执照字号名称与实名不一致时必填'} wrap={true}>授权函</Item>
                            <Item arrow={'horizontal'} extra={'选填'}>经营许可证</Item>
                            <Item arrow={'horizontal'} extra={'选填'}>其他证明</Item>
                        </List>


                        <Button type="warning" className='btn-complete'>提交</Button>

                    </div>

                </Content >
            </Layout >);
    }


    render() {

        return (

            <Switch>
                <Route path='/shopinfo/address' render={() => <ShopInfoAddress lng={this.state.lng} lat={this.state.lat} />} />
                <Route path='/shopinfo/name' render={() => <ShopInfoName name1={this.state.name1} name2={this.state.name2} onEnter={val => this.onLogoChange(val)} />} />
                <Route path='/shopinfo' exact render={() => this.mainRender()} />
            </Switch>


        )

    }
}

export default ShopInfo;