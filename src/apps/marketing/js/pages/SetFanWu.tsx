import React from 'react';
import { DatePicker, Picker, Switch, Modal, Toast } from 'antd-mobile';
import UParams from '../../../../assets/libs/uparams';
import classNames from 'classNames';
import moment from 'moment';
import ChooseReturn from './ChooseReturn';
import '../../sass/SetHomePage.scss';
import PromotionApis, { PromotionInstanceAdd } from '../../../../services/promotion-apis';

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


interface SetFanWuProps {
    storeId: number
}

class SetFanWu extends React.Component<SetFanWuProps, {
    beginDate?: Date;
    endDate?: Date;

    grantWay?: number;
    limitDate?: number;
    limitUser?: number;

    couponNum?: number;

    selected?: { id: number, num: number, name?: string, price?: number }[]

    chooseFoods: boolean;

    agree: boolean;
}> {

    constructor(props: SetFanWuProps) {
        super(props);
        this.state = {
            beginDate: moment().startOf('day').toDate(),
            chooseFoods: false,
            agree: false
        };
    }


    componentWillMount() {

        let url = UParams();
        if (url.id) {
            PromotionApis.getPromotionDetail({ storeId: this.props.storeId, activityId: url.id }).then(data => {

                if (data.marketingMeta && data.marketingMeta.returnProduct) {
                    let arr = JSON.parse(data.marketingMeta.returnProduct);
                    if (arr instanceof Array && arr.length > 0) {
                        let d = arr[0];

                        if (d.grantWay) {
                            this.setState({ grantWay: parseInt(d.grantWay) });
                        }

                        if (d.limitDate || d.limitDate === 0) {
                            this.setState({ limitDate: parseInt(d.limitDate) });
                        }

                        if (d.limitUser) {
                            this.setState({ limitUser: parseInt(d.limitUser) });
                        }

                        if (d.couponNum) {
                            this.setState({ couponNum: parseInt(d.couponNum) });
                        }

                        if (d.products && d.products.length > 0) {
                            this.setState({ selected: d.products });
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

        if (!this.state.selected || this.state.selected.length < 1) {
            Modal.alert('提示', '未设置赠送商品');
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
            name: this.state.selected.map(p => p.name + 'x' + p.num).join() + '兑换券',
            startTime: moment(this.state.beginDate).unix(),
            endTime: moment(this.state.endDate).unix(),
            marketingType: 4,
            limitUser: this.state.limitUser,
            marketingMeta: JSON.stringify([{
                products: this.state.selected.map(p => { return { productId: p.id, productName: p.name, productNum: p.num } }),
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

    mainRender() {
        return <div className='wrap' data-page='setfanwu' >

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


            <div className="l-label clearfix" onClick={() => this.setState({ chooseFoods: true })}>
                <div className="left fl">赠送商品</div>
                <div className="right fr"><span className="span-goods">{this.state.selected && this.state.selected.length > 0 ? '已设置' : '请选择商品项目'}</span><i></i></div>
            </div>

            <div className="l-label">
                <div className="left fl">发放数量</div>
                <div className="right fr">
                    <input type="text" className="num-input" placeholder="在此输入数量，默认不限" value={this.state.couponNum || ''} onChange={e => this.setState({ couponNum: parseInt(e.target.value) })} />
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
        </div >
    }

    render() {

        if (this.state.chooseFoods) {
            return <ChooseReturn selected={this.state.selected} type={'fanwu'} storeId={this.props.storeId} onEnter={selected => {
                this.setState({
                    selected: selected,
                    chooseFoods: false
                });
            }} />
        } else {
            return this.mainRender();
        }
    }
}

export default SetFanWu;