import '../../sass/HomePage.scss';
import React from 'react';
//import Layout from '../../../../apps/components/AppLayout';
//import CouponApis from '../../../../services/coupon-apis';
import classNames from 'classnames';
import { List, WhiteSpace, InputItem } from 'antd-mobile';
//import UParams from '../../../../assets/libs/uparams';



const Item = List.Item;

interface EditConfigProps {
    mchId: number,
}

class EditConfig extends React.Component<EditConfigProps, {

    cardId?: any;
    setNum?: string;
    type: number;

}>{

    constructor(props: EditConfigProps) {
        super(props);
        this.state = {
            type: 1
        };
    }

    componentWillMount() {


    }





    render() {

        const re2 = /^[1-9]\d*$/;

        return (

            <div className="wrap" data-page='editconfig'>

                <Item extra={'99'} >当前库存</Item>
                <WhiteSpace />

                <div className='setion'>

                    <div className='h-1'>
                        <i></i><span>请选择要执行的任务</span>
                    </div>

                    <div className='btn-group'>
                        <div className={classNames('btn btn-1', { 'active': this.state.type == 1 })} onClick={() => this.setState({ type: 1 })}>补库</div>
                        <div className={classNames('btn', { 'active': this.state.type == 2 })} onClick={() => this.setState({ type: 2 })}>减库</div>
                        <div className={classNames('btn', { 'active': this.state.type == 3 })} onClick={() => this.setState({ type: 3 })}>设置库存为无限</div>
                    </div>

                </div>

                <WhiteSpace />

                {this.state.type == 1 ? <List><InputItem value={this.state.setNum || ''} placeholder={'请输入要增加的数值'} maxLength={4} onChange={e => {
                    let result = re2.test(e);
                    if (result || !e) this.setState({ setNum: e });
                }}>补库</InputItem></List> : (this.state.type == 2 ? <List><InputItem value={this.state.setNum || ''} placeholder={'请输入要减少的数值'} maxLength={4} onChange={e => {
                    let result = re2.test(e);
                    if (result || !e) this.setState({ setNum: e });
                }}>补库</InputItem></List> : undefined)}




                <div className='btn-canel'>取消</div>
                <div className='btn-yes'>确定</div>

            </div>




        )
    }

}

export default EditConfig;