import React from 'react';
import { Switch, Picker, Checkbox, Modal } from 'antd-mobile';
import TimePickerData from '../TimePickerData';
import EffectiveTimePickerValue from '../EffectiveTimePickerValue';
import '../../sass/EffectiveTimePickerView.scss';


interface EffectiveTimePickerViewProps {
    onEnter?: (result: EffectiveTimePickerValue[]) => void;
    data?: EffectiveTimePickerValue[];
}

export function formatTimeText(beginHours: number, beginMinutes: number, endHours: number, endMinutes: number) {
    const tnum = (v: number, ish: boolean) => { return ish && v >= 24 ? '次日' + (v - 24) : v < 10 ? '0' + v : v + '' }
    return tnum(beginHours, true) + ':' + tnum(beginMinutes, false) + '-' + tnum(endHours, true) + ':' + tnum(endMinutes, false);
}

export default class EffectiveTimePickerView extends React.Component<EffectiveTimePickerViewProps, {
    dayChecked1: boolean;
    dayChecked2: boolean;
    dayChecked3: boolean;
    dayChecked4: boolean;
    dayChecked5: boolean;
    dayChecked6: boolean;
    dayChecked7: boolean;

    allDay: boolean;

    times: { beginHours: number, beginMinutes: number, endHours: number, endMinutes: number }[]
}>{

    constructor(props: EffectiveTimePickerViewProps) {
        super(props);
        console.log(props.data);

        if (props.data && props.data.length) {

            if (props.data.filter(p => p.time).length > 0) {
                this.state = {
                    dayChecked1: !!props.data[0].days.filter(p => p == 1).length,
                    dayChecked2: !!props.data[0].days.filter(p => p == 2).length,
                    dayChecked3: !!props.data[0].days.filter(p => p == 3).length,
                    dayChecked4: !!props.data[0].days.filter(p => p == 4).length,
                    dayChecked5: !!props.data[0].days.filter(p => p == 5).length,
                    dayChecked6: !!props.data[0].days.filter(p => p == 6).length,
                    dayChecked7: !!props.data[0].days.filter(p => p == 7).length,
                    allDay: false,
                    times: props.data.map(p => {
                        return p.time as { beginHours: number, beginMinutes: number, endHours: number, endMinutes: number };
                    })
                }
            }

            else {
                this.state = {
                    dayChecked1: !!props.data[0].days.filter(p => p == 1).length,
                    dayChecked2: !!props.data[0].days.filter(p => p == 2).length,
                    dayChecked3: !!props.data[0].days.filter(p => p == 3).length,
                    dayChecked4: !!props.data[0].days.filter(p => p == 4).length,
                    dayChecked5: !!props.data[0].days.filter(p => p == 5).length,
                    dayChecked6: !!props.data[0].days.filter(p => p == 6).length,
                    dayChecked7: !!props.data[0].days.filter(p => p == 7).length,
                    allDay: true,
                    times: []
                }
            }

        }

        else {
            this.state = {
                dayChecked1: false,
                dayChecked2: false,
                dayChecked3: false,
                dayChecked4: false,
                dayChecked5: false,
                dayChecked6: false,
                dayChecked7: false,
                allDay: false,
                times: []
            }
        }

        // if (props.data && props.data.filter(p => p.time).length > 0) {
        //     this.state = {
        //         dayChecked1: !!props.data[0].days.filter(p => p == 1).length,
        //         dayChecked2: !!props.data[0].days.filter(p => p == 2).length,
        //         dayChecked3: !!props.data[0].days.filter(p => p == 3).length,
        //         dayChecked4: !!props.data[0].days.filter(p => p == 4).length,
        //         dayChecked5: !!props.data[0].days.filter(p => p == 5).length,
        //         dayChecked6: !!props.data[0].days.filter(p => p == 6).length,
        //         dayChecked7: !!props.data[0].days.filter(p => p == 7).length,
        //         allDay: false,
        //         times: props.data.map(p => {
        //             return p.time as { beginHours: number, beginMinutes: number, endHours: number, endMinutes: number };
        //         })
        //     }
        // }

        // else {
        //     this.state = {
        //         dayChecked1: false,
        //         dayChecked2: false,
        //         dayChecked3: false,
        //         dayChecked4: false,
        //         dayChecked5: false,
        //         dayChecked6: false,
        //         dayChecked7: false,
        //         allDay: false,
        //         times: []
        //     }
        // }

    }

    onDayChecked(dayIndex: number, checked: boolean) {
        if (this.state['dayChecked' + dayIndex] !== undefined) {
            let obj: any = {
                ['dayChecked' + dayIndex]: !!checked
            };
            this.setState(obj);
        }
    }

    onAllDayChange(allDay: boolean) {
        if (!allDay) {
            this.setState({ times: [] });
        }
        this.setState({ allDay: !allDay });
    }

    onAddTimeline(beginHours: number, beginMinutes: number, endHours: number, endMinutes: number) {
        // console.log(beginHours, beginMinutes, endHours, endMinutes);
        this.state.times.push({ beginHours, beginMinutes, endHours, endMinutes });
        this.setState({
            times: this.state.times
        })
    }

    onEditTimeline(index: number, beginHours: number, beginMinutes: number, endHours: number, endMinutes: number) {
        this.state.times[index] = { beginHours, beginMinutes, endHours, endMinutes };
        this.setState({
            times: this.state.times
        })
    }

    onEnter() {
        let form = this.state;
        if (!form.dayChecked1 &&
            !form.dayChecked2 &&
            !form.dayChecked3 &&
            !form.dayChecked4 &&
            !form.dayChecked5 &&
            !form.dayChecked6 &&
            !form.dayChecked7
        ) {
            Modal.alert('提示', '至少要选定一天');
            return;
        }

        if (!form.allDay && form.times.length < 1) {
            Modal.alert('提示', '尚未设置有效时段');
            return;
        }

        let times = form.times.sort((a, b) => { return a.beginHours * 100 + a.beginMinutes - b.beginHours * 100 + b.beginMinutes });
        for (let i = 0; i < times.length - 1; i++) {
            let s1 = times[i].beginHours * 100 + times[i].beginMinutes;
            let e1 = times[i].endHours * 100 + times[i].endMinutes;

            for (let j = i + 1; j < times.length; j++) {

                let s2 = times[j].beginHours * 100 + times[j].beginMinutes;
                let e2 = times[j].endHours * 100 + times[j].endMinutes;

                if (s1 == s2 || e1 == e2 || (s1 < s2 && e1 > s2) ||
                    (s1 < e2 && e1 > e2) || (s1 < s2 && e1 > e2) || (s1 > s2 && e1 < e2) || e2 >= (s1 + 2400)) {
                    Modal.alert('提示', '有效时间不能重叠');
                    return;
                }
            }
        }

        let days: number[] = [];

        form.dayChecked1 && days.push(1);
        form.dayChecked2 && days.push(2);
        form.dayChecked3 && days.push(3);
        form.dayChecked4 && days.push(4);
        form.dayChecked5 && days.push(5);
        form.dayChecked6 && days.push(6);
        form.dayChecked7 && days.push(7);


        let result: EffectiveTimePickerValue[] = form.allDay ?
            [{
                days,
                is24th: true,
            }]
            :
            form.times.map(p => {
                return {
                    days,
                    is24th: false,
                    time: p
                }
            });

        this.props.onEnter && this.props.onEnter(result);
    }

    render() {

        const CheckDayItem = (props: { title: string, checked?: boolean, onChange?: (checked: boolean) => void }) => {
            return <div className="row-time" onClick={_ => props.onChange && props.onChange(!props.checked)} >
                <h1>{props.title}</h1>
                <Checkbox checked={props.checked} />
            </div>
        }

        const TimeLineItem = (props: {
            value?: { beginHours: number, beginMinutes: number, endHours: number, endMinutes: number }
            onChange?: (value: { beginHours: number, beginMinutes: number, endHours: number, endMinutes: number }) => void
        }) => {
            if (props.value) {
                let p = props.value;
                return <Picker
                    data={TimePickerData}
                    cols={5}
                    value={[p.beginHours, p.beginMinutes, 0, p.endHours, p.endMinutes]}
                    onOk={vals => {
                        if (vals && vals.length === 5) props.onChange && props.onChange({
                            beginHours: vals[0],
                            beginMinutes: vals[1],
                            endHours: vals[3],
                            endMinutes: vals[4]
                        });
                    }} >
                    <div
                        className="row-line"
                    >{formatTimeText(p.beginHours, p.beginMinutes, p.endHours, p.endMinutes)}</div>
                </Picker>
            }
            else {
                return <div className="row-line">空</div>
            }
        }

        return <div className='EffectiveTimePickerView wrap'  ><div className="lay">

            <CheckDayItem title="周一" checked={this.state.dayChecked1} onChange={v => this.onDayChecked(1, v)} />
            <CheckDayItem title="周二" checked={this.state.dayChecked2} onChange={v => this.onDayChecked(2, v)} />
            <CheckDayItem title="周三" checked={this.state.dayChecked3} onChange={v => this.onDayChecked(3, v)} />
            <CheckDayItem title="周四" checked={this.state.dayChecked4} onChange={v => this.onDayChecked(4, v)} />
            <CheckDayItem title="周五" checked={this.state.dayChecked5} onChange={v => this.onDayChecked(5, v)} />
            <CheckDayItem title="周六" checked={this.state.dayChecked6} onChange={v => this.onDayChecked(6, v)} />
            <CheckDayItem title="周日" checked={this.state.dayChecked7} onChange={v => this.onDayChecked(7, v)} />

            <div className="br"></div>
            <div className="row-ad">
                <h1>生效时段</h1>
                <Switch checked={this.state.allDay} onChange={e => this.onAllDayChange(!e)} />
                {this.state.allDay ? <span>全天有效</span> : undefined}
            </div>
            <div className="br"></div>
            {this.state.allDay ? undefined :

                <div className="l-part">
                    <div className="time-pick">
                        {this.state.times.map((p, idx) => <TimeLineItem key={idx} value={p} onChange={v => this.onEditTimeline(idx, v.beginHours, v.beginMinutes, v.endHours, v.endMinutes)} />)}
                    </div>
                    {
                        this.state.times.length < 3 ?
                            <Picker
                                data={TimePickerData}
                                cols={5}
                                onOk={vals => { if (vals && vals.length === 5) this.onAddTimeline(vals[0], vals[1], vals[3], vals[4]); }} >
                                <div className="row-2">
                                    <i></i>新增时段
                                </div>
                            </Picker> : undefined
                    }
                </div>
            }

            <button className="btn-yes" onClick={() => this.onEnter()} >确定</button>
        </div></div>
    }


}