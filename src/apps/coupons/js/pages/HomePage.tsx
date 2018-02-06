import '../../sass/HomePage.scss';
import CouponApis, { CouponDefineList } from '../../../../services/coupon-apis';
import React from 'react';
import classNames from 'classnames';

interface HomePageProps {
    mchId: number,
}

interface HomePageState {
    data?: CouponDefineList,
    pageNumber: number,
    pageSize: number,
}

class HomePage extends React.Component<HomePageProps, HomePageState>{

    constructor(props: HomePageProps) {
        super(props);

        this.state = {
            pageNumber: 0,
            pageSize: 999
        };
    }

    componentWillMount() {

        CouponApis.CouponDefineList({ store_id: this.props.mchId, page_size: this.state.pageSize, page_number: this.state.pageNumber }).then(data => {
            this.setState({ data: data });
        })

    }

    render() {

        const self = this;

        const CardPZ = (props: { item: any, status: number }) => {
            const pros = props.item.products;
            return (
                <div className='card card-ping' onClick={() => window.location.href = '#/details/?cardid=' + props.item.couDefId + '?shopid=' + self.props.mchId}>
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
                <div className='card card-man' onClick={() => window.location.href = '#/details/?cardid=' + props.item.couDefId + '?shopid=' + self.props.mchId}>
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
                <div className='card card-dai' onClick={() => window.location.href = '#/details/?cardid=' + props.item.couDefId + '?shopid=' + self.props.mchId}>
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


            <div className="wrap clearfix" data-page='home'>

                {this.state.data && this.state.data.couponDefineDTOList && this.state.data.couponDefineDTOList.length ? this.state.data.couponDefineDTOList.map(p =>

                    p.couponType == 1 ? <CardMJ key={p.couDefId} item={p} status={p.status} /> : p.couponType == 3 ? <CardPZ key={p.couDefId} item={p} status={p.status} /> : <CardDJ key={p.couDefId} item={p} status={p.status} />

                ) : undefined}

            </div>

        );
    }

}

export default HomePage;