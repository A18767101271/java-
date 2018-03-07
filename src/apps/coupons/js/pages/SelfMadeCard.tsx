import '../../sass/HomePage.scss';
import React from 'react';
import Layout from '../../../../apps/components/AppLayout';
import CouponApis from '@jx/sardine-apiservice/lib/coupon-apis';
//import CouponApis from '../../../../services/coupon-apis';
import classNames from 'classnames';
import moment from 'moment';
import { DatePicker, Modal, List, WhiteSpace, InputItem, TextareaItem, Button, Switch } from 'antd-mobile';
import UParams from '../../../../assets/libs/uparams';
import ChooseCard from './ChooseCard';

import { SardineApiClient } from '@jx/sardine-api';

const { Header, Content } = Layout;
const Item = List.Item;

interface SelfServiceCardProps {
    mchId: number,
    apiClient: SardineApiClient
}

class SelfServiceCard extends React.Component<SelfServiceCardProps, {
    cardList?: any;
    cardInfo?: any;
    cardId?: any;
    num?: number;
    beginDate?: Date;
    endDate?: Date;
    setNum?: string;
    price?: string;
    chooseCards: boolean;
    pageSize: number;
    pageNumber: number;
    isCard: boolean;
    remarks?: string;
    agree?: boolean;
}>{
    CouponApis: CouponApis;
    constructor(props: SelfServiceCardProps) {
        super(props);
        this.state = {
            beginDate: moment().startOf('day').toDate(),
            chooseCards: false,
            pageSize: 999,
            pageNumber: 0,
            isCard: false,
        };
        this.CouponApis = new CouponApis(props.apiClient);
    }

    componentWillMount() {

        this.CouponApis.getMerchantCouponDefineList({ merchantId: this.props.mchId, page_size: this.state.pageSize, page_number: this.state.pageNumber }).then(data => {
            this.setState({
                cardList: data
            }, () => {
                let parms = UParams();
                if (!this.state.cardId) {
                    if (parms.cardid && parms.cardid > 0) {
                        let s = this.state.cardList.couponDefineDTOList.find(p => p.couDefId == parms.cardid);
                        if (s) {
                            this.setState({
                                cardInfo: s,
                                isCard: true,
                                cardId: parms.cardid
                            })
                        }
                    }
                }
                else {
                    let s = this.state.cardList.couponDefineDTOList.find(p => p.couDefId == this.state.cardId);
                    if (s) {
                        this.setState({
                            cardInfo: s,
                            isCard: true,
                        })
                    }
                }
            })
        })

    }


    onSubmit(_num) {

        window.location.href = '#/selfcardlist?shopid=' + this.props.mchId;

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
        const re2 = /^[1-9]\d*$/;
        const data1 = ['', '满减券', '代金券', '凭证券'];
        const item1 = this.state.cardInfo;

        const CardPZ = (props: { item: any, status: number }) => {
            const pros = props.item.products;
            return (
                <div className='card card-ping'>
                    <div className={classNames('icon', { 'over': props.status === 1 })}></div>
                    {props.status === 1 ? <div className='stamp'></div> : undefined}
                    <div className='y-left'></div>
                    <div className='y-right'></div>
                    <div className='line'></div>
                    <div className='name'>{props.item.name}</div>
                    <div className='number'>{props.item.couponNum}</div>
                    <div className='text-0'>{pros && pros.length > 0 ? pros.map(s => <span key={s.id}>{s.productName + 'x' + s.num}</span>) : undefined}</div>
                    {props.item.products[0].isServer ? <div className='text-1'>{props.item.products[0].serverContent}</div> : undefined}
                    <div className='text-2'>创建时间:{props.item.gmtCreate}</div>
                    <div className='text-3'>{props.item.limitEnableTime ? '有效期:' + props.item.limitEnableTime : '领券' + props.item.afterReceiveEnableDay + '天后可用，有效期' + props.item.limitDay + '天'}</div>
                    <div className='text-4'>{props.item.isGiveOut ? '已发放' : '未发放'}</div>
                </div>)
        }

        const CardMJ = (props: { item: any, status: number }) => {
            return (
                <div className='card card-man'>
                    <div className={classNames('icon', { 'over': props.status === 1 })}></div>
                    {props.status === 1 ? <div className='stamp'></div> : undefined}
                    <div className='y-left'></div>
                    <div className='y-right'></div>
                    <div className='line'></div>
                    <div className='name'>{props.item.name}</div>
                    <div className='number'>{props.item.couponNum}</div>
                    <div className='text-1'>消费满{props.item.marketingMeta.marketMeta[0].fullAmount / 100}元可用</div>
                    <div className='text-2'>创建时间:{props.item.gmtCreate}</div>
                    <div className='text-3'>{props.item.limitEnableTime ? '有效期:' + props.item.limitEnableTime : '领券' + props.item.afterReceiveEnableDay + '天后可用，有效期' + props.item.limitDay + '天'}</div>
                    <div className='text-4'>{props.item.isGiveOut ? '已发放' : '未发放'}</div>
                    <div className='text-5'>￥<em>{props.item.marketingMeta.marketMeta[0].discountAmount / 100}</em></div>
                </div>
            )
        }

        const CardDJ = (props: { item: any, status: number }) => {
            return (
                <div className='card card-dai'>
                    <div className={classNames('icon', { 'over': props.status === 1 })}></div>
                    {props.status === 1 ? <div className='stamp'></div> : undefined}
                    <div className='y-left'></div>
                    <div className='y-right'></div>
                    <div className='line'></div>
                    <div className='name'>{props.item.name}</div>
                    <div className='number'>{props.item.couponNum}</div>
                    <div className='text-2'>创建时间:{props.item.gmtCreate}</div>
                    <div className='text-3'>{props.item.limitEnableTime ? '有效期:' + props.item.limitEnableTime : '领券' + props.item.afterReceiveEnableDay + '天后可用，有效期' + props.item.limitDay + '天'}</div>
                    <div className='text-4'>{props.item.isGiveOut ? '已发放' : '未发放'}</div>
                    <div className='text-5'>￥<em>{props.item.marketingMeta.marketMeta[0].faceAmount / 100}</em></div>
                </div>
            )
        }

        const NoCard = () => {
            return (
                <div className='no-card'></div>
            )
        }

        return (

            <Layout>
                <Header title='新增定制领券' />
                <Content>
                    <div className="wrap" data-page='selfmadecard'>

                        <Item extra={this.state.isCard ? data1[item1.couponType] : '请选择'} arrow={'horizontal'} onClick={() => this.setState({ chooseCards: true })}>选择卡券</Item>

                        {this.state.isCard ?
                            item1.couponType == 1 ?
                                <CardMJ item={item1} status={item1.status} />
                                : item1.couponType == 3 ?
                                    <CardPZ item={item1} status={item1.status} />
                                    : <CardDJ item={item1} status={item1.status} />
                            : <NoCard />}

                        <div className='row tiptext'>
                            <div className='left fl'>领取提示:每位用户仅可领取一次</div>
                        </div>

                        <WhiteSpace />


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
                                <List><Item extra={this.state.beginDate ? moment(this.state.beginDate).format('YYYY-MM-DD') : '请设置日期'} arrow={'horizontal'} >领取开始时间</Item></List>
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
                                <Item extra={this.state.endDate ? moment(this.state.endDate).format('YYYY-MM-DD') : '请设置日期'} arrow={'horizontal'} >领取结束时间</Item>
                            </DatePicker>

                        </div>


                        <List><InputItem value={this.state.setNum || ''} placeholder={'设置发放数量 不填写时为不限'} maxLength={4} onChange={e => {
                            let result = re2.test(e);
                            if (result || !e) this.setState({ setNum: e });
                        }}>设置库存量</InputItem></List>

                        <InputItem value={this.state.price || ''} placeholder={'输入投放成本'} onChange={e => {
                            let result = re.test(e);
                            if (result || !e) this.setState({ price: e });
                        }}>每张卡券投放成本</InputItem>

                        <List renderHeader={() => '备注'}>
                            <TextareaItem
                                placeholder="请输入发放卡券希望达成的目标和预期"
                                count={50}
                                rows={3}
                                value={this.state.remarks || ''}
                                onChange={e => this.setState({ remarks: e })} />
                        </List>

                        <WhiteSpace />

                        <List>
                            <Item className='ex' extra={
                                <Switch checked={this.state.agree} onChange={e => this.setState({ agree: e })} />
                            }><span className='ex-1'>阅读并同意</span><span className='ex-2'>《卡券营销发放协议》</span></Item>
                        </List>

                        <WhiteSpace />
                        <WhiteSpace />

                        {this.state.agree ? <Button className='btn' type="primary">提交申请</Button> : <Button disabled className='btn' type="primary">提交申请</Button>}

                        <WhiteSpace />

                        {/* <div className='btn btn-1' onClick={() => this.onSubmit(1)}>保存</div>
                        <div className='btn btn-2' onClick={() => this.onSubmit(2)}>立即发布</div> */}

                    </div>

                </Content>
            </Layout>);
    }

    render() {
        if (this.state.chooseCards) {
            return <ChooseCard storeId={this.props.mchId} cardId={this.state.cardId} cardList={this.state.cardList} onSelect={cardInfo => {
                this.setState({
                    cardInfo: cardInfo,
                    chooseCards: false,
                    isCard: true,
                    cardId: cardInfo.couDefId
                })
            }} />
        } else {
            return this.mainRender();
        }
    }

}

export default SelfServiceCard;