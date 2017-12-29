import React from 'react';
import '../../sass/SetHomePage.scss';
import { DatePicker, Picker, Switch, Modal, Toast } from 'antd-mobile';
//import UParams from '../../../../assets/libs/uparams';
import classNames from 'classNames';
import moment from 'moment';
import ChooseReturn from './ChooseReturn';
import '../../sass/SetHomePage.scss';
import PromotionApis, { PromotionInstanceAdd } from '../../../../services/promotion-apis';

import EffectiveTimePickerView from '../components/EffectiveTimePickerView';
import EffectiveTimePickerValue from '../components/EffectiveTimePickerView/EffectiveTimePickerValue';


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
    label: '按活动价',
    value: '按活动价'
}, {
    label: '按折扣价',
    value: '按折扣价'
}];

interface SetZheKouProps {
    storeId: number
}

class SetZheKou extends React.Component<SetZheKouProps, {
    beginDate?: Date;
    endDate?: Date;

    selected?: { id: number, num: number, name?: string, price?: number }[]

    productActType?: string;
    activityPrice?: number;
    discountScope?: number;
    discountPrice?: number;
    limitNum?: number;
    limitUser?: number;

    chooseFoods: boolean;

    agree: boolean;

    dialogOpen: boolean;

    times?: EffectiveTimePickerValue[];

}>{

    constructor(props: SetZheKouProps) {
        super(props);
        this.state = {
            beginDate: moment().startOf('day').toDate(),
            productActType: '按活动价',
            chooseFoods: false,
            agree: false,
            dialogOpen: false,

        };
    }

    // componentWillMount() {

    //     let url = UParams();
    //     if (url.id) {
    //         PromotionApis.getPromotionDetail({ storeId: this.props.storeId, activityId: url.id }).then(data => {

    //             if (data.marketingMeta && data.marketingMeta.returnProduct) {
    //                 let arr = JSON.parse(data.marketingMeta.returnProduct);
    //                 if (arr instanceof Array && arr.length > 0) {
    //                     let d = arr[0];

    //                     if (d.limitUser) {
    //                         this.setState({ limitUser: parseInt(d.limitUser) });
    //                     }

    //                     if (d.limitNum) {
    //                         this.setState({ limitNum: parseInt(d.limitNum) });
    //                     }

    //                     if (d.products && d.products.length > 0) {
    //                         this.setState({ selected: d.products });
    //                     }
    //                 }
    //             }
    //         })
    //     }
    // }


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
            Modal.alert('提示', '未设置商品');
            return;
        }

        if (this.state.productActType == '按活动价') {
            if (!this.state.activityPrice) {
                Modal.alert('提示', '未设置活动价格');
                return;
            }
        }
        else {
            if (!this.state.discountScope) {
                Modal.alert('提示', '未设置折扣范围');
                return;
            }
            if (!this.state.discountPrice) {
                Modal.alert('提示', '未设置折扣价格');
                return;
            }
        }


        if (this.state.limitNum) {
            if (this.state.limitNum < 0) {
                Modal.alert('提示', '限购数量无效');
                return;
            }
        }
        if (this.state.limitUser === undefined) {
            Modal.alert('提示', '面向用户无效');
            return;
        }

        if (this.state.times === undefined || this.state.times.length == 0) {
            Modal.alert('提示', '循环周期无效');
            return;
        }

        if (this.state.productActType == '按活动价') {
            let req: PromotionInstanceAdd = {
                storeId: this.props.storeId,
                name: this.state.selected.map(p => p.name + 'x' + p.num).join(),
                startTime: moment(this.state.beginDate).unix(),
                endTime: moment(this.state.endDate).unix(),
                marketingType: 2,
                limitUser: this.state.limitUser,
                marketingMeta: JSON.stringify([{
                    productActType: '按活动价',
                    limitNum: this.state.limitNum ? this.state.limitNum : 'maxValue',
                    activityPrice: this.state.activityPrice,
                    productId: this.state.selected[0].id,
                    productName: this.state.selected[0].name,
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
        }
        else {

            let req: PromotionInstanceAdd = {
                storeId: this.props.storeId,
                name: this.state.selected.map(p => p.name + 'x' + p.num).join(),
                startTime: moment(this.state.beginDate).unix(),
                endTime: moment(this.state.endDate).unix(),
                marketingType: 2,
                limitUser: this.state.limitUser,
                marketingMeta: JSON.stringify([{
                    productActType: '按折扣价',
                    limitNum: this.state.limitNum ? this.state.limitNum : 'maxValue',
                    discountScope: this.state.discountScope,
                    discountPrice: this.state.discountPrice,
                    productId: this.state.selected[0].id,
                    productName: this.state.selected[0].name,
                }])
            };

            console.log(req);

            Toast.loading('加载中', 30);
            PromotionApis.promotionInstanceAdd(req).then(_data => {
                Toast.hide();
                Modal.alert('提示', '创建活动成功', [{ text: '确定', onPress: () => { window.location.replace('#/?shopid=' + this.props.storeId) } }]);
            }).catch(err => {
                console.log(err);
                Toast.hide();
                Modal.alert('提示', err.msg);
            });
        }



        return { success: true, msg: 'ok' };
    }

    mainRender() {
        return <div className='wrap' data-page='setzhekou' >

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
                <div className="left fl">商品项目</div>
                <div className="right fr"><span className="span-goods">{this.state.selected && this.state.selected.length > 0 ? this.state.selected[0].name + '' + this.state.selected[0].price + '元' : '请选择商品'}</span><i></i></div>
            </div>

            <Picker
                data={data2}
                cols={1}
                title="设置方式"
                value={this.state.productActType ? [this.state.productActType] : undefined}
                onOk={vals => { if (vals && vals.length == 1) { this.setState({ productActType: vals[0] }) } }}
            >
                <div className="l-label">
                    <div className="left fl">设置方式</div>
                    <div className="right fr">
                        <span id="pick-type">{(data2.find(p => p.label == this.state.productActType) || { label: '按活动价' }).label}</span>
                        <i></i>
                    </div>
                </div>
            </Picker>

            {this.state.productActType == '按活动价' ? <div className="l-label">
                <div className="left fl">活动价格</div>
                <div className="right fr">
                    <input type="text" className="num-input" value={this.state.activityPrice || ''} onChange={e => this.setState({ activityPrice: parseInt(e.target.value) })} />元
                </div>
            </div> :
                <div>
                    <div className="l-label">
                        <div className="left fl">折扣范围</div>
                        <div className="right fr">
                            <input type="text" className="num-input" value={this.state.discountScope || ''} onChange={e => this.setState({ discountScope: parseInt(e.target.value) })} />折
                        </div>
                    </div>
                    <div className="l-label">
                        <div className="left fl">折后价格</div>
                        <div className="right fr">
                            <input type="text" className="num-input" value={this.state.discountPrice || ''} onChange={e => this.setState({ discountPrice: parseInt(e.target.value) })} />元
                        </div>
                    </div>
                </div>
            }

            <div className="l-label">
                <div className="left fl">每单限购</div>
                <div className="right fr">
                    <input type="text" className="num-input" placeholder="不限" value={this.state.limitNum || ''} onChange={e => this.setState({ limitNum: parseInt(e.target.value) })} />
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

            <div className="l-label" onClick={() => this.setState({ dialogOpen: true })} >
                <div className="left fl">循环周期</div>
                <div className="right fr">
                    <span id="pick-cycle">{this.state.times && this.state.times.length ? '已设置' : '未设置'}</span>
                    <i></i>
                </div>
            </div>

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
            return <ChooseReturn selected={this.state.selected} type={'zhekou'} storeId={this.props.storeId} onEnter={selected => {
                this.setState({
                    selected: selected,
                    chooseFoods: false
                });
            }} />
        }

        else if (this.state.dialogOpen) {
            return <EffectiveTimePickerView value={this.state.times} onChange={p => this.setState({ dialogOpen: false, times: p })} />
        }

        else {
            return this.mainRender();
        }

    }

}

export default SetZheKou;

