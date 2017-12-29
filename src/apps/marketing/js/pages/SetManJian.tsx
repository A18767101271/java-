import React from 'react';
import '../../sass/SetHomePage.scss';
import { Switch, DatePicker, Picker, Modal, Toast } from 'antd-mobile';
import classNames from 'classNames';
import moment from 'moment';
import UParams from '../../../../assets/libs/uparams';

import EffectiveTimePickerView from '../components/EffectiveTimePickerView';
import EffectiveTimePickerValue from '../components/EffectiveTimePickerView/EffectiveTimePickerValue';

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


interface SetManJianProps {
    shopId: number
}

export default class SetManJian extends React.Component<SetManJianProps, {
    beginDate: Date;
    endDate?: Date;

    limitUser?: number;

    lines: {
        [k: string]: { f?: number; r?: number; }
    }

    lineCount: number;

    agree: boolean;

    dialogOpen: boolean;

    times?: EffectiveTimePickerValue[];
}> {

    constructor(props: SetManJianProps) {
        super(props);
        this.state = {
            beginDate: moment().startOf('day').toDate(),
            lines: { line1: {} },
            lineCount: 1,
            agree: false,
            dialogOpen: false
        }
    }

    componentWillMount() {
        let url = UParams();
        if (url.id) {
            PromotionApis.getPromotionDetail({ storeId: this.props.shopId, activityId: url.id }).then(data => {

                console.log(1, data);

                if (data.limitUser || data.limitUser === 0) {
                    this.setState({ limitUser: parseInt(data.limitUser) });
                }
                if (data.marketingMeta && data.marketingMeta.fullReduction) {
                    let arr = data.marketingMeta.fullReduction;
                    if (arr instanceof Array && arr.length > 0) {
                        let lines = arr.sort((a, b) => a.fullAmount - b.fullAmount);
                        let linesObj: any = {};
                        lines.forEach((p, idx) => {
                            linesObj['line' + (idx + 1)] = { f: (p.fullAmount / 100), r: (p.discountAmount / 100) }
                        });
                        this.setState({
                            lines: linesObj,
                            lineCount: lines.length
                        });
                    }
                }
                if (data.meta && data.meta.limitSpans && data.meta.limitSpans.spans) {
                    let arr = data.meta.limitSpans.spans;
                    if (arr instanceof Array && arr.length > 0) {

                        this.setState({
                            times: arr.map(p => {
                                let days = p.l;
                                let is24th = false;
                                let s = p.s.split(':');
                                let e = p.e.split(':');
                                let time = {
                                    beginHours: parseInt(s[0]),
                                    beginMinutes: parseInt(s[1]),
                                    endHours: parseInt(e[0]),
                                    endMinutes: parseInt(e[1])
                                };
                                let v: EffectiveTimePickerValue = { days, is24th, time };
                                return v;
                            })
                        });

                    }
                }
            })
        }
    }

    addLine() {
        if (this.state.lineCount < 5) {

            this.setState(Object.assign({}, this.state, {
                lines: {
                    ...this.state.lines,
                    ['line' + (this.state.lineCount + 1)]: {},
                },
                lineCount: this.state.lineCount + 1
            }));

        }

    }

    onSubmit() {
        let form = this.state;

        if (!form.beginDate || form.beginDate < moment().startOf('day').toDate()) {
            Modal.alert('提示', '开始时间无效');
            return;
        }

        if (!form.endDate || form.endDate <= form.beginDate) {
            Modal.alert('提示', '结束时间无效');
            return;
        }

        let lines: { f: number; r: number; }[] = [];

        if (form.lineCount > 0 && form.lines) {

            for (let i = 1; i <= form.lineCount; i++) {
                let line = form.lines['line' + i] as { f?: number; r?: number; };

                if (line) {
                    if (!line.f || !line.r) {
                        Modal.alert('提示', '满减金额无效');
                        return;
                    }
                    if (line.r >= line.f) {
                        Modal.alert('提示', '减免金额不能大于满减条件');
                        return;
                    }
                    lines.push({ f: line.f, r: line.r });
                }
            }
        }

        if (lines.length < 1) {
            Modal.alert('提示', '请输入满减金额');
            return;
        }

        lines = lines.sort((a, b) => a.f - b.f);

        for (let i = 0; i < lines.length - 1; i++) {
            if (lines[i].f == lines[i + 1].f) {
                Modal.alert('提示', '满减条件不能重复');
                return;
            }
        }

        if (form.limitUser === undefined) {
            Modal.alert('提示', '面向用户无效');
            return;
        }

        if (form.times === undefined || form.times.length == 0) {
            Modal.alert('提示', '循环周期无效');
            return;
        }

        const name = lines.map(p => '满' + p.f + '减' + p.r).join(',');

        let req: PromotionInstanceAdd = {
            storeId: this.props.shopId,
            name: name,
            startTime: moment(this.state.beginDate).unix(),
            endTime: moment(this.state.endDate).unix(),
            marketingType: 1,
            limitUser: this.state.limitUser,
            marketingMeta: JSON.stringify(lines.map(p => { return { fullAmount: parseInt((p.f * 100) + ''), discountAmount: parseInt((p.r * 100) + '') } })),
            meta: JSON.stringify({
                spans: form.times.map(p => {
                    const l = p.days;
                    let s = '00:00';
                    let e = '23:59';
                    const fm = (v: number) => { return v < 10 ? '0' + v : v + '' }
                    if (!p.is24th && p.time) {
                        s = fm(p.time.beginHours) + ':' + fm(p.time.beginMinutes);
                        e = fm(p.time.endHours) + ':' + fm(p.time.endMinutes);
                    }

                    return { s, e, l };
                })
            })
        };

        Toast.loading('加载中', 30);
        PromotionApis.promotionInstanceAdd(req).then(_data => {
            Toast.hide();
            Modal.alert('提示', '创建活动成功', [{ text: '确定', onPress: () => { window.location.replace('#/?shopid=' + this.props.shopId) } }]);
        }).catch(err => {
            console.log(err);
            Toast.hide();
            Modal.alert('提示', err.msg);
        });

    }

    mainRender() {

        let self = this;

        function Line(id: number) {
            let line = self.state.lines['line' + id] as { f?: number; r?: number; };
            if (!line) {
                return undefined;
            }
            return <div className="l-manjian">
                <div className="l-label">
                    <div className="left fl">满</div>
                    <div className="right fr"><input
                        type="text"
                        placeholder="在此输入金额"
                        className="man-input"
                        value={line.f ? line.f : ''}
                        onChange={e => {
                            let v = parseFloat(e.target.value);
                            let obj = {
                                lines: {
                                    ...self.state.lines,
                                    ['line' + id]: {
                                        ...line,
                                        f: v
                                    }
                                }
                            };
                            self.setState(Object.assign({}, self.state, obj));
                        }}
                    />元</div>
                </div>
                <div className="l-label">
                    <div className="left fl">减</div>
                    <div className="right fr"><input
                        type="text"
                        placeholder="在此输入金额"
                        className="jian-input"
                        value={line.r ? line.r : ''}
                        onChange={e => {
                            let v = parseFloat(e.target.value);
                            let obj = {
                                lines: {
                                    ...self.state.lines,
                                    ['line' + id]: {
                                        ...line,
                                        r: v
                                    }
                                }
                            };
                            self.setState(Object.assign({}, self.state, obj));
                        }}
                    />元</div>
                </div>
            </div>
        }

        return <div className='wrap' data-page='setmanjian'>
            {/* <div className="l-label">
                <div className="left fl">活动标题</div>
                <div className="right fr">
                    <input type="text" placeholder="请输入活动标题" />
                </div>
            </div> */}
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
            <div className="div-into">

                {Line(1)}
                {Line(2)}
                {Line(3)}
                {Line(4)}
                {Line(5)}

            </div>

            {this.state.lineCount >= 5 ? undefined : <div className="l-btn" onClick={() => this.addLine()} ><i></i>新增</div>}
            < div className="l-title">
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
        </div>
    }

    render() {

        if (this.state.dialogOpen) {
            return <EffectiveTimePickerView value={this.state.times} onChange={p => this.setState({ dialogOpen: false, times: p })} />
        } else {
            return this.mainRender();
        }


    }

}