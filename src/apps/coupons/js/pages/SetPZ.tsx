import '../../sass/HomePage.scss';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import classNames from 'classNames';
import moment from 'moment';
import bridge from '../../../../assets/libs/sardine-bridge';
import { Picker, DatePicker, TextareaItem, Modal, List, InputItem, WhiteSpace, Button } from 'antd-mobile';
import EffectiveTimePickerValue from '../EffectiveTimePickerValue';
import PickTimePage from './PickTimePage';

const Item = List.Item;

const data2 = [{
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

const data1 = [{
    label: '领取后立即生效',
    value: 1,
}, {
    label: '领取后2小时生效',
    value: 2,
},
{
    label: '领取后8小时生效',
    value: 8,
},
{
    label: '领取后24小时生效',
    value: 24,
}];


interface SetPZProps {
    storeId: number,
}

class SetPZ extends React.Component<SetPZProps, {
    merchantId: number;
    id?: number;
    couponType: number;
    name?: string;
    logoPic?: { uid?: string, url: string }[];
    effectiveTime?: number;
    validityTime?: number;
    validityType?: number;
    beginDate?: Date;
    endDate?: Date;

    remarks?: string;
    useNotice?: string;

    serviceContent?: string;
    selected?: { id: number, num: number, name?: string, price?: number }[];

    bizTimes?: EffectiveTimePickerValue[];

}>{

    constructor(props: SetPZProps) {
        super(props);
        this.state = {
            merchantId: props.storeId,
            couponType: 3,
            validityType: 1,
            beginDate: moment().startOf('day').toDate(),
            bizTimes: []
        };
    }

    componentWillMount() {

    }

    onUploadImg() {

        const localId: {}[] = [];

        bridge.getImages({
            count: 1,
            source: ['album', 'camera'],
            complete: function (data) {
                console.log(data);
                localId.push(data.localIds[data.localIds.length - 1]);
                if (data.localIds && data.localIds.length > 0)
                    bridge.getImageData({
                        localId: data.localIds[data.localIds.length - 1], //图片本地ID
                        complete: function (data) {
                            console.log(data);
                        }
                    });
            }
        });

    }

    onSubmit() {

        window.location.href = '#/choose/?type=1?shopid=' + this.props.storeId + '?cardid=158';

        if (!this.state.name) {
            Modal.alert('提示', '请输入卡券名称');
            return;
        }

        if (this.state.validityType == 2) {
            if (!this.state.beginDate || this.state.beginDate < moment().startOf('day').toDate()) {
                Modal.alert('提示', '开始时间无效');
                return;
            }

            if (!this.state.endDate || this.state.endDate <= this.state.beginDate) {
                Modal.alert('提示', '结束时间无效');
                return;
            }
        }
        else {

            if (!this.state.effectiveTime || !this.state.validityTime) {
                Modal.alert('提示', '请选择时间');
                return;
            }
        }

        if ((!this.state.selected || !this.state.selected.length) && (!this.state.serviceContent)) {
            Modal.alert('提示', '请选择商品项目或服务内容');
            return;
        }
    }

    backToMain() {
        const lt = '#/setpz/';
        if (window.location.hash && window.location.hash.startsWith(lt) && window.location.hash.length > lt.length && window.location.hash[lt.length] != '?') {
            if (window.history.length > 1)
                window.history.back();
            else
                window.location.replace(lt);
        }
    }


    onTimesChange(bizTimes?: EffectiveTimePickerValue[]) {
        this.setState({
            bizTimes: bizTimes
        }, () => this.backToMain())
    }


    mainRender() {
        return (
            <div className="wrap" data-page='setpz'>

                <List><InputItem value={this.state.name || ''} placeholder={'卡券名称最多12个字'} maxLength={12} onChange={(e) => this.setState({ name: (e || '').trim() })}>卡券配置名称</InputItem></List>
                <WhiteSpace />

                <Item extra={(this.state.logoPic && this.state.logoPic.length) ? '已上传图片' : '请上传'} arrow={'horizontal'} onClick={() => { this.onUploadImg() }}>卡券配置配图</Item>

                <div className="upload">
                    <img className="img-coupon" src={this.state.logoPic && this.state.logoPic[this.state.logoPic.length - 1].url} />
                </div>

                <div className='headbar i-time'>
                    <div className='text-1'>时间设置</div>
                </div>

                <List>
                    <Item extra={<div>
                        <Button
                            size={'small'}
                            inline={true}
                            style={{ marginRight: '4px' }}
                            className={classNames("", { 'active': this.state.validityType == 1 })}
                            onClick={() => this.setState({ validityType: 1 })}>固定天数
                                </Button>
                        <Button
                            size={'small'}
                            inline={true}
                            style={{ marginRight: '4px' }}
                            className={classNames("", { 'active': this.state.validityType == 2 })}
                            onClick={() => this.setState({ validityType: 2 })}>指定区域时间
                                </Button>
                    </div>}>有效期</Item>

                    {this.state.validityType == 1 ?
                        <div>
                            <Picker
                                data={data2}
                                cols={1}
                                title=""
                                value={this.state.validityTime ? [this.state.validityTime] : undefined}
                                onOk={vals => { if (vals && vals.length == 1) { this.setState({ validityTime: vals[0] }) } }}
                            >
                                <Item extra={(data1.find(p => p.value == this.state.validityTime) || { label: '请选择固定时段' }).label} arrow={'horizontal'} >生效后有效期</Item>
                            </Picker>

                            <Picker
                                data={data1}
                                cols={1}
                                title=""
                                value={this.state.effectiveTime ? [this.state.effectiveTime] : undefined}
                                onOk={vals => { if (vals && vals.length == 1) { this.setState({ effectiveTime: vals[0] }) } }}
                            >
                                <Item extra={(data2.find(p => p.value == this.state.effectiveTime) || { label: '请选择领取后生效时间' }).label} arrow={'horizontal'} >生效期</Item>
                            </Picker>

                            <Item extra={this.state.bizTimes && this.state.bizTimes.length ? '已选择' : '请选择可用周期,默认不限'} arrow={'horizontal'} onClick={() => {
                                window.location.href = '#/setpz/picktime';
                            }}>可用时间</Item>



                        </div> :

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
                                <Item extra={this.state.beginDate ? moment(this.state.beginDate).format('YYYY-MM-DD') : '请设置日期'} arrow={'horizontal'} >起始日期</Item>
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
                                <Item extra={this.state.endDate ? moment(this.state.endDate).format('YYYY-MM-DD') : '请设置日期'} arrow={'horizontal'} >结束日期</Item>
                            </DatePicker>

                        </div>}
                </List>

                <div className='headbar i-laba'>
                    <div className='text-1'>优惠设置</div>
                    <div className='text-2'>"商品内容"与"服务内容"至少填写一个</div>
                </div>

                <List>
                    <Item extra={'请选择'} arrow={'horizontal'} >商品内容</Item>
                </List>

                {this.state.selected && this.state.selected.length > 0 ?
                    <div className='section clearfix'>
                        {this.state.selected.map(p => <div key={p.id} className="list">{p.name}x{p.num}</div>)}
                    </div> : undefined
                }


                <List renderHeader={() => '服务内容'}>
                    <TextareaItem
                        placeholder="请在此输入服务内容"
                        count={30}
                        rows={3}
                        value={this.state.serviceContent || ''}
                        onChange={e => this.setState({ serviceContent: e })} />
                </List>

                <div className='headbar i-other'>
                    <div className='text-1'>其他设置</div>
                </div>

                <List>
                    <Item extra={'请选择'} arrow={'horizontal'} >选择可用店铺</Item>
                </List>

                <List renderHeader={() => '使用须知'}>
                    <TextareaItem
                        placeholder="请在此输入内容"
                        count={30}
                        rows={3}
                        value={this.state.useNotice || ''}
                        onChange={e => this.setState({ useNotice: e })} />
                </List>

                <List renderHeader={() => '卡券配置备注(仅商户可见)'}>
                    <TextareaItem
                        placeholder="请在此输入内容"
                        count={30}
                        rows={3}
                        value={this.state.remarks || ''}
                        onChange={e => this.setState({ remarks: e })} />
                </List>

                <Button type={'primary'} className={'btn-submit'}>保存</Button>

            </div>
        )
    }

    render() {
        { console.log(this.state) };
        return (

            <Switch>

                <Route path='/setpz/picktime' render={() => <PickTimePage
                    data={this.state.bizTimes ? this.state.bizTimes : undefined}
                    onEnter={value => {
                        this.onTimesChange(value);
                    }}
                />} />

                <Route path='/setpz' exact render={() => this.mainRender()} />

            </Switch>



        )
    }


}

export default SetPZ;