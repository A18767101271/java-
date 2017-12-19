import '../../sass/SetHomePage.scss';
import PromotionApis, { PromotionInstanceAdd } from '../../../../services/promotion-apis';

import UParams from '../../../../assets/libs/uparams';

//import bridge from '../../../../assets/libs/sardine-bridge';
import { DatePicker, Picker, Switch, Modal, Toast } from 'antd-mobile';
import React from 'react';
import classNames from 'classNames';
import moment from 'moment';


const data1 = [{
    label: '全部用户',
    value: 0,
},
{
    label: '门店新用户',
    value: 3
},
{
    label: '门店老用户',
    value: 2
}];

const data2 = [{
    label: '店内店外',
    value: 3
}, {
    label: '仅限店内',
    value: 1,
},
{
    label: '仅限店外',
    value: 2
}];

const data3 = [{
    label: '当天',
    value: 0,
}, {
    label: '1天',
    value: 1,
},
{
    label: '2天',
    value: 2,
},
{
    label: '3天',
    value: 3,
},
{
    label: '4天',
    value: 4,
},
{
    label: '5天',
    value: 5,
},
{
    label: '6天',
    value: 6,
},
{
    label: '7天',
    value: 7,
},
{
    label: '8天',
    value: 8,
},
{
    label: '9天',
    value: 9,
},
{
    label: '10天',
    value: 10,
},
{
    label: '11天',
    value: 11,
},
{
    label: '12天',
    value: 12,
},
{
    label: '13天',
    value: 13,
},
{
    label: '14天',
    value: 14,
},
{
    label: '15天',
    value: 15,
}];

interface SetHongBaoProps {
    storeId: number
}

export default class SetHongBao extends React.Component<SetHongBaoProps, {
    beginDate?: Date;
    endDate?: Date;
    discountAmount?: number;
    fullAmount?: number;
    couponNum?: number;

    grantWay?: number;
    limitDate?: number;
    limitUser?: number;

    agree: boolean;
}> {
    //name: 'sethongbao',

    constructor(props: SetHongBaoProps) {
        super(props);
        this.state = {
            beginDate: moment().startOf('day').toDate(),
            agree: false
        };
    }

    componentWillMount() {
        let url = UParams();
        if (url.id) {
            PromotionApis.getPromotionDetail({ storeId: this.props.storeId, activityId: url.id }).then(data => {

                if (data.limitUser || data.limitUser === 0) {
                    this.setState({ limitUser: parseInt(data.limitUser) });
                }

                if (data.marketingMeta && data.marketingMeta.redPacket) {
                    let arr = JSON.parse(data.marketingMeta.redPacket);
                    if (arr instanceof Array && arr.length > 0) {
                        let d = arr[0];

                        if (d.fullAmount && d.discountAmount) {
                            this.setState({ fullAmount: d.fullAmount / 100, discountAmount: d.discountAmount / 100 });
                        }

                        if (d.grantWay) {
                            this.setState({ grantWay: parseInt(d.grantWay) });
                        }

                        if (d.limitDate || d.limitDate === 0) {
                            this.setState({ limitDate: parseInt(d.limitDate) });
                        }

                        if (d.couponNum) {
                            this.setState({ couponNum: parseInt(d.couponNum) });
                        }
                    }
                }
            })
        }
    }

    onSubmit() {
        if (!this.state.beginDate || this.state.beginDate < moment().startOf('day').toDate()) {
            Modal.alert('提示', '开始时间无效');
            return;
        }

        if (!this.state.endDate || this.state.endDate <= this.state.beginDate) {
            Modal.alert('提示', '结束时间无效');
            return;
        }

        if (!this.state.fullAmount || isNaN(this.state.fullAmount) || this.state.fullAmount <= 0) {
            Modal.alert('提示', '满金额无效');
            return;
        }

        if (!this.state.discountAmount || isNaN(this.state.discountAmount) || this.state.discountAmount <= 0 || this.state.discountAmount >= this.state.fullAmount) {
            Modal.alert('提示', '减金额无效');
            return;
        }

        if (this.state.couponNum) {
            if (this.state.couponNum < 0) {
                Modal.alert('提示', '发券数量无效');
                return;
            }
        }
        if (this.state.limitUser === undefined) {
            Modal.alert('提示', '面向用户无效');
            return;
        }

        if (this.state.grantWay === undefined) {
            Modal.alert('提示', '发放途径无效');
            return;
        }

        if (this.state.limitDate === undefined) {
            Modal.alert('提示', '有效期限无效');
            return;
        }

        let req: PromotionInstanceAdd = {
            storeId: this.props.storeId,
            name: '满' + this.state.fullAmount + '减' + this.state.discountAmount + '优惠券',
            startTime: moment(this.state.beginDate).unix(),
            endTime: moment(this.state.endDate).unix(),
            marketingType: 5,
            limitUser: this.state.limitUser,
            marketingMeta: JSON.stringify([{
                discountAmount: parseInt((this.state.discountAmount * 100) + ''),
                fullAmount: parseInt((this.state.fullAmount * 100) + ''),
                grantWay: this.state.grantWay,
                limitDate: this.state.limitDate,
                couponNum: this.state.couponNum ? this.state.couponNum : 'maxValue'
            }])
        };
        Toast.loading('加载中', 30);
        PromotionApis.promotionInstanceAdd(req).then(_data => {
            Toast.hide();
            Modal.alert('提示', '创建活动成功', [{ text: '确定', onPress: () => { window.location.replace('#/?shopid=' + this.props.storeId) } }]);
        }).catch(err => {
            console.log(err);
            Toast.hide();
            Modal.alert('提示', err.msg);
        });

        return { success: true, msg: 'ok' };
    }


    render() {
        return (<div className='wrap' data-page='sethongbao' >

            <div className="l-label">
                <div className="left fl">红包类型</div>
                <div className="right fr">
                    <span className="distt">满减券</span>
                </div>
            </div>

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
                <div className="l-label">
                    <div className="left fl">起始日期</div>
                    <div className="right fr">
                        <span id="start-time">{this.state.beginDate ? moment(this.state.beginDate).format('YYYY-MM-DD') : '请设置日期'}</span>
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
                <div className="l-label">
                    <div className="left fl">终止日期</div>
                    <div className="right fr">
                        <span id="end-time">{this.state.endDate ? moment(this.state.endDate).format('YYYY-MM-DD') : '请设置日期'}</span>
                        <i></i>
                    </div>
                </div>
            </DatePicker>

            <div className="l-title">
                <i></i>
                <span>优惠信息</span>
            </div>

            <div className="l-manjian">
                <div className="l-label">
                    <div className="left fl">满</div>
                    <div className="right fr"><input type="text" placeholder="在此输入金额" className="man-input" value={this.state.fullAmount || ''} onChange={e => this.setState({ fullAmount: parseFloat(e.target.value) })} />元</div>
                </div>

                <div className="l-label">
                    <div className="left fl">减</div>
                    <div className="right fr"><input type="text" placeholder="在此输入金额" className="jian-input" value={this.state.discountAmount || ''} onChange={e => this.setState({ discountAmount: parseFloat(e.target.value) })} />元</div>

                </div>

                <div className="l-label">
                    <div className="left fl">发券数量</div>
                    <div className="right fr"><input type="text" className="num-input" placeholder="在此输入数量，默认不限" value={this.state.couponNum || ''} onChange={e => this.setState({ couponNum: parseInt(e.target.value) })} /></div>
                </div>
            </div>

            <div className="l-title">
                <i></i>
                <span>活动信息</span>
            </div>
            <Picker
                data={data1}
                cols={1}
                title="面向用户"
                value={this.state.limitUser ? [this.state.limitUser] : undefined}
                onOk={vals => { if (vals && vals.length == 1) { this.setState({ limitUser: vals[0] }) } }}
            >
                <div className="l-label">
                    <div className="left fl">面向用户</div>
                    <div className="right fr">
                        <span id="pick-user">{(data1.find(p => p.value == this.state.limitUser) || { label: '未设置' }).label}</span>
                        <i></i>
                    </div>
                </div>
            </Picker>
            <Picker
                data={data2}
                cols={1}
                title="发放途径"
                value={this.state.grantWay ? [this.state.grantWay] : undefined}
                onOk={vals => { if (vals && vals.length == 1) { this.setState({ grantWay: vals[0] }) } }}
            >
                <div className="l-label">
                    <div className="left fl">发放途径</div>
                    <div className="right fr">
                        <span id="pick-channel">{(data2.find(p => p.value == this.state.grantWay) || { label: '未设置' }).label}</span>
                        <i></i>
                    </div>
                </div>
            </Picker>
            <Picker
                data={data3}
                title="有效期限"
                cols={1}
                value={this.state.limitDate ? [this.state.limitDate] : undefined}
                onOk={vals => { if (vals && vals.length == 1) { this.setState({ limitDate: vals[0] }) } }}
            >
                <div className="l-label">
                    <div className="left fl">有效期限</div>
                    <div className="right fr">
                        <span id="pick-time">{(data3.find(p => { return p.value == this.state.limitDate }) || { label: '未设置' }).label}</span>
                        <i></i>
                    </div>
                </div>
            </Picker>
            <div className="l-foot">
                <h1>阅读并同意</h1>
                <em>《xxx营销协议》</em>
                <Switch checked={this.state.agree} onChange={e => this.setState({ agree: e })} />
            </div>
            <button className={classNames("btn-yes", { 'dis': this.state.agree })} disabled={!this.state.agree} onClick={() => this.onSubmit()}>保存</button>
        </div>)

    }
};

