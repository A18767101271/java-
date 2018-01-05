import '../../sass/HomePage.scss';
import React from 'react';
import Layout from '../../../../apps/components/AppLayout';
//import classNames from 'classNames';
import moment from 'moment';
import { DatePicker, Modal } from 'antd-mobile';
import UParams from '../../../../assets/libs/uparams';
import ChooseCard from './ChooseCard';

const { Header, Content } = Layout;

interface SelfServiceCardProps {
    storeId: number,
}

class SelfServiceCard extends React.Component<SelfServiceCardProps, {
    cardInfo?: any;
    cardId?: number;
    num?: number;
    beginDate?: Date;
    endDate?: Date;
    setNum?: number;
    price?: string;
    chooseCards: boolean;
}>{

    constructor(props: SelfServiceCardProps) {
        super(props);
        this.state = {
            beginDate: moment().startOf('day').toDate(),
            chooseCards: false
        };
    }

    componentWillMount() {
        let parms = UParams();
        if (parms.cardid && parms.cardid > 0) {

        }
    }

    onSubmit(_num) {


        if (!this.state.beginDate || this.state.beginDate < moment().startOf('day').toDate()) {
            Modal.alert('提示', '开始时间无效');
            return;
        }

        if (!this.state.endDate || this.state.endDate <= this.state.beginDate) {
            Modal.alert('提示', '结束时间无效');
            return;
        }




    }


    mainRender() {
        const re = /^(([1-9]\d*)|0)(\.\d{0,2}?)?$/;
        return (
            <Layout>
                <Header title='新增自助领券' className2='add-hide' />
                <Content>
                    <div className="wrap" data-page='selfcard'>

                        <div className='row' onClick={() => this.setState({ chooseCards: true })}>
                            <div className='left fl'>选择卡券</div>
                            <div className='right fr'>
                                <span>满减券</span>
                            </div>
                        </div>

                        <div className='card card-ping-1'>
                            <div className='icon'></div>
                            <div className='y-left'></div>
                            <div className='y-right'></div>
                            <div className='line'></div>
                            <div className='name'>什么什么凭证券</div>
                            <div className='number'>31659854545</div>
                            <div className='text-0'>此次是商品内容</div>
                            <div className='text-1'>此次是服务内容</div>
                            <div className='text-2'>创建时间:2018.02.01 10:20</div>
                            <div className='text-3'>有效期:2018.02.01 - 2018.02.10</div>
                            <div className='text-4'>未发放</div>
                        </div>

                        <div className='row'>
                            <div className='left fl'>可领数量</div>
                            <div className="right fr"><input type="text" placeholder="请输入每个用户可领券数 默认为1" value={this.state.num || ''} onChange={e => this.setState({ num: parseInt(e.target.value) })} /></div>
                        </div>

                        <div>

                            <DatePicker
                                mode="date"
                                value={this.state.beginDate}
                                minDate={moment().startOf('day').toDate()}
                                onOk={data => {
                                    this.setState({
                                        beginDate: data
                                    })
                                }}
                            >
                                <div className="row">
                                    <div className="left fl">领取开始时间</div>
                                    <div className="right fr">
                                        <span>{this.state.beginDate ? moment(this.state.beginDate).format('YYYY-MM-DD') : '请设置日期'}</span>
                                        <i></i>
                                    </div>
                                </div>
                            </DatePicker>

                            <DatePicker
                                mode="date"
                                value={this.state.endDate}
                                minDate={this.state.beginDate ? moment(this.state.beginDate).add(1, 'day').subtract(1, 'milliseconds').toDate() : moment().startOf('day').toDate()}
                                onOk={data => {
                                    this.setState({
                                        endDate: data
                                    })
                                }}
                            >
                                <div className="row">
                                    <div className="left fl">领取结束时间</div>
                                    <div className="right fr">
                                        <span>{this.state.endDate ? moment(this.state.endDate).format('YYYY-MM-DD') : '请设置日期'}</span>
                                        <i></i>
                                    </div>
                                </div>
                            </DatePicker>

                        </div>

                        <div className='row'>
                            <div className='left fl'>设置库存量</div>
                            <div className="right fr"><input type="text" placeholder="设置发放数量 不填写时为不限" value={this.state.setNum || ''} onChange={e => this.setState({ setNum: parseInt(e.target.value) })} /></div>
                        </div>

                        <div className='row'>
                            <div className='left fl'>单价</div>
                            <div className="right fr"><input type="text" placeholder="请设置单价" value={this.state.price || ''}
                                onChange={e => {
                                    let result = re.test(e.target.value);
                                    if (result || !e.target.value) this.setState({ price: e.target.value });
                                }} /></div>
                        </div>

                        <div className='btn btn-1' onClick={() => this.onSubmit(1)}>仅发布</div>
                        <div className='btn btn-2' onClick={() => this.onSubmit(2)}>立即发布并上架</div>

                    </div>

                </Content>
            </Layout>);

    }


    render() {
        if (this.state.chooseCards) {
            return <ChooseCard storeId={this.props.storeId} />
        } else {
            return this.mainRender();
        }
    }

}

export default SelfServiceCard;