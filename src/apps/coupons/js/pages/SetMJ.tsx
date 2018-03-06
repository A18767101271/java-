import '../../sass/SetPage.scss';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import classNames from 'classnames';
import moment from 'moment';
import CouponApis, { CouponDefineCreateRequest } from '@jx/sardine-apiservice/lib/coupon-apis';
import bridge from '@jx/sardine-bridge';
import { Picker, DatePicker, TextareaItem, Modal, List, InputItem, WhiteSpace, Button, Toast } from 'antd-mobile';
import EffectiveTimePickerValue from '../EffectiveTimePickerValue';
import PickTimePage from './PickTimePage';
import ChooseShop from './ChooseShop';
import { SardineApiClient } from '@jx/sardine-api';

import StoreApis from '@jx/sardine-apiservice/lib/store-apis';

const Item = List.Item;

const data3 = ['', '周一', '周二', '周三', '周四', '周五', '周六', '周日'];

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


interface SetMJProps {
    mchId: number,
    apiClient: SardineApiClient
}

class SetMJ extends React.Component<SetMJProps, {
    merchantId: number;
    id?: number;
    couponType: number;
    name?: string;

    logoUid?: string;
    logoPicUrl?: string;

    effectiveTime?: number;
    validityTime?: number;
    validityType: number;
    beginDate?: Date;
    endDate?: Date;

    storeIds?: number[];
    isAllStore: boolean;

    realAmount?: string;
    limitAmount?: string;

    remarks?: string;
    useNotice?: string;

    serviceContent?: string;
    selected?: { id: number, num: number, name?: string, price?: number }[];

    bizTimes?: EffectiveTimePickerValue[];

}>{
    CouponApis: CouponApis;
    StoreApis: StoreApis;
    constructor(props: SetMJProps) {
        super(props);
        this.state = {
            isAllStore: true,
            merchantId: props.mchId,
            couponType: 2,
            validityType: 1,
            beginDate: moment().startOf('day').toDate(),
            bizTimes: [{ 'days': [1, 2, 3, 4, 5, 6, 7], 'is24th': true }]
        };
        this.CouponApis = new CouponApis(props.apiClient);
        this.StoreApis = new StoreApis(props.apiClient);
    }

    componentWillMount() {

    }

    onUploadImg() {

        var self = this;
        let arr: string[] = [];

        bridge.getImages({
            count: 1,
            source: ['album', 'camera'],
            sizeType: ['original', 'compressed'],
            complete: function (data) {
                if (data.localIds && data.localIds.length > 0) {

                    self.setState({
                        logoUid: data.localIds[data.localIds.length - 1]
                    }, () => {

                        arr = data.localIds;
                        bridge.getImageData({
                            localId: data.localIds[data.localIds.length - 1], //图片本地ID
                            complete: function (data) {
                                if (data.localData) {
                                    self.setState({
                                        logoPicUrl: data.localData
                                    }, () => {
                                        bridge.uploadImages({
                                            typeId: 1,
                                            localIds: [arr[arr.length - 1]],
                                            showProgress: true,
                                            complete: function (data) {
                                                if (data.resultCode == "success") {
                                                    Toast.info('上传成功', 2);
                                                }
                                                else {
                                                    Toast.info('上传失败', 2);
                                                }
                                            }
                                        })
                                    })
                                }

                            }
                        })

                    })

                }


            }
        })


    }

    onSubmit() {

        const couponName = this.state.name;
        if (!couponName) {
            Modal.alert('提示', '请输入卡券配置名称');
            return;
        }

        let obj: CouponDefineCreateRequest = {
            merchantId: this.props.mchId,
            couponType: this.state.couponType,
            validityType: this.state.validityType,
            name: couponName,
            isAllStore: this.state.isAllStore
        };

        if (!this.state.isAllStore) {
            obj.storeIds = this.state.storeIds
        }

        if (this.state.logoUid) {
            obj.logoPicUrl = this.state.logoUid;
        }

        if (this.state.remarks) {
            obj.remarks = this.state.remarks;
        }

        if (this.state.useNotice) {
            obj.useNotice = this.state.useNotice;
        }

        if (!this.state.effectiveTime) {
            Modal.alert('提示', '请选择生效期');
            return;
        }
        else {
            obj.effectiveTime = this.state.effectiveTime;
        }

        if (!this.state.bizTimes || !this.state.bizTimes.length) {
            Modal.alert('提示', '请选择可用周期');
            return;
        }
        else {
            obj.marketingMeta = JSON.stringify({
                spans: this.state.bizTimes && this.state.bizTimes.map(p => {
                    const l = p.days;
                    let s = '00:00';
                    let e = '23:59';
                    const fm = (v: number) => { return v < 10 ? '0' + v : v + '' }
                    if (!p.is24th && p.time) {
                        let all = 'false';
                        s = fm(p.time.beginHours) + ':' + fm(p.time.beginMinutes);
                        e = fm(p.time.endHours) + ':' + fm(p.time.endMinutes);
                        return { s, e, l, all };
                    }
                    else {
                        return { s, e, l };
                    }

                })
            })
        }

        if (this.state.validityType == 2) {

            if (!this.state.beginDate || this.state.beginDate < moment().startOf('day').toDate()) {
                Modal.alert('提示', '开始时间无效');
                return;
            }
            else {
                obj.validityStartTime = moment(this.state.beginDate).unix();
            }

            if (!this.state.endDate || this.state.endDate <= this.state.beginDate) {
                Modal.alert('提示', '结束时间无效');
                return;
            }
            else {
                obj.validityEndTime = moment(this.state.endDate).unix();
            }

        }

        else {

            if (!this.state.validityTime || !this.state.validityTime) {
                Modal.alert('提示', '请选择有效期');
                return;
            }
            else {
                obj.validityTime = this.state.validityTime;
            }
        }

        if (!this.state.realAmount) {
            Modal.alert('提示', '请设置面额');
            return;
        }
        else {
            obj.realAmount = Number(this.state.realAmount);
        }

        if (!this.state.limitAmount) {
            Modal.alert('提示', '请设置面额');
            return;
        }
        else {
            obj.limitAmount = Number(this.state.limitAmount);
        }

        this.CouponApis.couponDefineCreate(obj).then(resp => {

            if (resp.success) {
                const data = resp.getData();

                console.log(data);

                if (data.couDefId) {
                    Modal.alert('提示', '提交成功', [{
                        text: '确定', onPress: () => {
                            bridge.close();
                        }

                    }])
                }
            } else {
                console.log(resp);
                Modal.alert('提示', JSON.stringify(resp));
            }
        });
    }

    backToMain() {
        const lt = '#/setmj/';
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

    formatTimeText(beginHours: number, beginMinutes: number, endHours: number, endMinutes: number) {
        const tnum = (v: number) => { return v < 10 ? '0' + v : v + '' }
        console.log(tnum(endHours), tnum(endMinutes))
        return tnum(beginHours) + ':' + tnum(beginMinutes) + '-' + tnum(endHours) + ':' + tnum(endMinutes) + ',';
    }

    onChooseShop(data: number[], data2: boolean) {
        this.setState({
            storeIds: data,
            isAllStore: data2
        }, () => this.backToMain())
    }

    mainRender() {

        let avaCycle = '';
        let timeCycle = '';

        const re = /^(([1-9]\d*)|0)(\.\d{0,2}?)?$/;

        if (this.state.bizTimes && this.state.bizTimes.length) {
            this.state.bizTimes[0].days.map(p => { avaCycle += data3[p] + ',' });
            this.state.bizTimes.map(p => {
                if (p.time) {
                    timeCycle += this.formatTimeText(p.time.beginHours, p.time.beginMinutes, p.time.endHours, p.time.endMinutes);
                }
            })
        }

        return (
            <div className="wrap" data-page='setmj'>

                <List><InputItem value={this.state.name || ''} placeholder={'卡券名称最多12个字'} maxLength={12} onChange={(e) => this.setState({ name: (e || '').trim() })}>卡券配置名称</InputItem></List>
                <WhiteSpace />

                <Item extra={(this.state.logoPicUrl) ? '已上传图片' : '请上传'} arrow={'horizontal'} onClick={() => { this.onUploadImg() }}>卡券配置配图</Item>

                <div className="upload">
                    <img className="img-coupon" src={this.state.logoPicUrl} />
                </div>

                <div className='headbar i-time'>
                    <div className='text-1'>时间设置</div>
                </div>


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
                </div>}>有效期
    
                    </Item>

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

                    </div>

                    :

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
                    </div>
                }

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
                    window.location.href = '#/setmj/picktime?shopid=' + this.props.mchId;
                }}>可用时间
                    </Item>

                {this.state.bizTimes && this.state.bizTimes.length ?
                    <div>
                        <Item extra={avaCycle.substring(0, avaCycle.length - 1)} className={'list'} wrap={true}>每周可用周期</Item>
                        <Item extra={timeCycle.substring(0, timeCycle.length - 1) || '全天'} wrap={true} className={'list'}>每天可用时段</Item>
                    </div>
                    :
                    undefined
                }

                <div className='headbar i-laba'>
                    <div className='text-1'>优惠设置</div>
                </div>

                <List>
                    <InputItem value={this.state.realAmount || ''} type={'text'} placeholder={'请输入卡券面额'} onChange={e => {
                        let result = re.test(e);
                        if (result || !e) this.setState({ realAmount: e });
                    }} >面额设置</InputItem>

                    <InputItem value={this.state.limitAmount || ''} type={'text'} placeholder={'请输入卡券面额'} onChange={e => {
                        let result = re.test(e);
                        if (result || !e) this.setState({ limitAmount: e });
                    }} >使用门槛</InputItem>

                </List>

                <div className='headbar i-other'>
                    <div className='text-1'>其他设置</div>
                </div>

                <List>
                    <Item extra={this.state.isAllStore ? '默认全店铺通用' : '已选择' + (this.state.storeIds && this.state.storeIds.length) + '家店铺'} arrow={'horizontal'} onClick={() => window.location.href = '#/setmj/chooseshop?shopid=' + this.props.mchId}>选择可用店铺</Item>
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

                <Button type={'primary'} className={'btn-submit'} onClick={() => this.onSubmit()}>保存</Button>

            </div >
        )
    }

    render() {
        { console.log(this.state) };
        return (

            <Switch>

                <Route path='/setmj/picktime' render={() => <PickTimePage
                    data={this.state.bizTimes ? this.state.bizTimes : undefined}
                    onEnter={value => {
                        this.onTimesChange(value);
                    }}
                />} />

                <Route path='/setmj/chooseshop' render={() => <ChooseShop
                    merchantId={this.props.mchId}
                    storeApis={this.StoreApis}
                    data={this.state.storeIds}
                    allChoose={this.state.isAllStore}
                    onEnter={(val1: number[], val2: boolean) => {
                        this.onChooseShop(val1, val2);
                    }}
                />} />

                <Route path='/setmj' exact render={() => this.mainRender()} />

            </Switch>



        )
    }


}

export default SetMJ;