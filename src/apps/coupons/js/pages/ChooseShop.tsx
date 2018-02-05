import React from 'react';
import { Toast } from 'antd-mobile';
import { Button, List, Checkbox, WhiteSpace, Switch, Modal } from 'antd-mobile';
import CouponApis from '../../../../services/coupon-apis';
import '../../sass/ChoosePage.scss';

const Item = List.Item;
const Brief = Item.Brief;

interface ChooseShopProps {
    storeId: number;
    data?: number[];
    allChoose?: boolean;
    onEnter?: (val1: number[], val2: boolean) => void;
}

class ChooseShop extends React.Component<ChooseShopProps, {
    allChoose?: boolean;
    getData?: {
        name: string,
        address: string,
        districtId: number,
        districtName: string,
        cityId: number,
        cityName: string,
        provinceId: number,
        provinceName: string,
        storeId: number
    }[];
    allIdArry?: number[];
    checkedIdArry?: number[];
}> {

    constructor(props: ChooseShopProps) {
        super(props);
        this.state = {
            checkedIdArry: props.data == undefined ? [] : props.data,
            allChoose: props.allChoose == undefined ? true : props.allChoose
        };
    }


    componentWillMount() {

        let arr: number[] = [];

        let req = { merchantId: this.props.storeId };

        Toast.loading('加载中...');

        CouponApis.ListUseAble(req).then((data) => {
            this.setState({
                getData: data
            }, () => {
                Toast.hide();
                if (this.state.getData && this.state.getData.length) {
                    for (var i = 0; i < this.state.getData.length; i++) {
                        arr.push(this.state.getData[i].storeId)
                    }
                    this.setState({
                        allIdArry: arr
                    })
                }
            })
        }).catch((err) => {
            Toast.hide();
            Modal.alert('提示', err.msg);
        })
    }

    onRemoveByValue(arr, val) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == val) {
                arr.splice(i, 1);
                break;
            }
        }
        return arr;
    }


    onEnter() {

        if (!this.state.allChoose) {
            if (!this.state.checkedIdArry || !this.state.checkedIdArry.length) {
                Modal.alert('提示', '缺少店铺选择');
                return;
            }

            this.props.onEnter && this.props.onEnter(this.state.checkedIdArry, false);
        }
        else {
            this.props.onEnter && this.props.onEnter([], true);
        }


    }

    onDayChecked(dayIndex: number, checked: boolean) {

        if (!checked) {
            let d = this.onRemoveByValue(this.state.checkedIdArry, dayIndex);
            this.setState({
                checkedIdArry: d,
            })
        }

        else {
            this.state.checkedIdArry && this.state.checkedIdArry.push(dayIndex);
            this.setState({
                checkedIdArry: this.state.checkedIdArry
            })

        }
    }

    render() {

        { console.log(this.state) }

        const CheckDayItem = (props: { id: number, title: string, address: string, area: string, checked?: boolean, onChange?: (checked: boolean) => void }) => {

            return (
                <Item extra={
                    <Checkbox checked={props.checked} />
                }
                    multipleLine={true}
                    onClick={() => props.onChange && props.onChange(!props.checked)}
                >{props.title}<Brief>{props.area}<br />{props.address}</Brief></Item>

            )
        }

        return (

            <div className='wrap' data-page='chooseshop' >

                <Item extra={
                    <Switch checked={this.state.allChoose} onChange={() => this.setState({ allChoose: !this.state.allChoose }, () => {
                        if (this.state.allChoose) {
                            this.setState({
                                checkedIdArry: []
                            })
                        }
                    })} />
                }

                >集团店铺通用
                </Item>

                <WhiteSpace />
                {this.state.allChoose ?
                    undefined :
                    this.state.getData && this.state.getData.length ? this.state.getData.map(p => <CheckDayItem key={p.storeId} id={p.storeId} title={p.name} area={p.provinceName + p.cityName + p.districtName} address={p.address}
                        checked={this.state.checkedIdArry && this.state.checkedIdArry.find(s => s === p.storeId) ? true : false} onChange={v => this.onDayChecked(p.storeId, v)} />) : undefined
                }

                <Button type={'primary'} className={'btn-submit'} onClick={() => this.onEnter()}>确定</Button>
            </div>

        )
    }
}

export default ChooseShop;