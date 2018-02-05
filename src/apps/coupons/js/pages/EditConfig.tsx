import '../../sass/HomePage.scss';
import React from 'react';
import Layout from '../../../../apps/components/AppLayout';
import CouponApis from '../../../../services/coupon-apis';
import classNames from 'classnames';
import moment from 'moment';
import { DatePicker, Modal } from 'antd-mobile';
import UParams from '../../../../assets/libs/uparams';
import ChooseCard from './ChooseCard';

const { Header, Content } = Layout;

interface EditConfigProps {
    storeId: number,
}

class EditConfig extends React.Component<EditConfigProps, {
    cardList?: any;
    cardInfo?: any;
    cardId?: any;
    num?: number;
    beginDate?: Date;
    endDate?: Date;
    setNum?: number;
    price?: string;
    chooseCards: boolean;
    pageSize: number;
    pageNumber: number;
    isCard: boolean;
}>{

    constructor(props: EditConfigProps) {
        super(props);
        this.state = {
            beginDate: moment().startOf('day').toDate(),
            chooseCards: false,
            pageSize: 999,
            pageNumber: 0,
            isCard: false,
        };
    }

    componentWillMount() {

        CouponApis.CouponDefineList({ store_id: this.props.storeId, page_size: this.state.pageSize, page_number: this.state.pageNumber }).then(data => {
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


    onSubmit() {

        window.location.href = '#/selfcardlist?shopid=' + this.props.storeId;

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

        return (

            <Layout>
                <Header title='领券配置编辑' />
                <Content>
                    <div className="wrap" data-page='editconfig'>

                        {this.state.isCard ?
                            item1.couponType == 1 ?
                                <CardMJ item={item1} status={item1.status} />
                                : item1.couponType == 3 ?
                                    <CardPZ item={item1} status={item1.status} />
                                    : <CardDJ item={item1} status={item1.status} />
                            : undefined}

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
                            <div className='left fl'>修改库存量</div>
                            <div className="right fr"><input type="text"  value={this.state.setNum || ''} onChange={e => this.setState({ setNum: parseInt(e.target.value) })} /></div>
                        </div>

                        <div className='row'>
                            <div className='left fl'>修改单价</div>
                            <div className="right fr"><input type="text"  value={this.state.price || ''}
                                onChange={e => {
                                    let result = re.test(e.target.value);
                                    if (result || !e.target.value) this.setState({ price: e.target.value });
                                }} /></div>
                        </div>

                        <div className='btn' onClick={() => this.onSubmit()}>保存</div>
                    </div>

                </Content>
            </Layout>);
    }

    render() {
        if (this.state.chooseCards) {
            return <ChooseCard storeId={this.props.storeId} cardId={this.state.cardId} cardList={this.state.cardList} onSelect={cardInfo => {
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

export default EditConfig;