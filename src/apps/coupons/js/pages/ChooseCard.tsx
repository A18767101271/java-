import '../../sass/HomePage.scss';
import React from 'react';
import Layout from '../../../../apps/components/AppLayout';
import classNames from 'classNames';

const { Header, Content } = Layout;

interface ChooseCardProps {
    storeId: number,
    cardList: any;
    onSelect?: (cardInfo: any) => void;
    cardId: number;
}

class ChooseCard extends React.Component<ChooseCardProps, {
    cardId?: number
}>{

    constructor(props: ChooseCardProps) {
        super(props);
        this.state = {};
    }

    getSelectedItems() {
        let s = this.props.cardList.couponDefineDTOList.find(p => p.couDefId == this.state.cardId);
        if (s) {
            return s;
        }
    }


    onSelect() {
        this.props.onSelect && this.props.onSelect(this.getSelectedItems());
    }

    render() {

        const CardPZ = (props: { item: any, status: number }) => {
            const pros = props.item.products;
            return (
                <div className='card card-ping' onClick={() => this.setState({ cardId: props.item.couDefId }, () => {
                    this.onSelect();
                })}>
                    <div className={classNames('icon', { 'over': props.status === 1 })}></div>
                    {props.status === 1 ? <div className='stamp'></div> : undefined}
                    <div className={classNames('radio', { 'active': this.props.cardId == props.item.couDefId })}></div>
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
                <div className='card card-man' onClick={() => this.setState({ cardId: props.item.couDefId }, () => {
                    this.onSelect();
                })}>
                    <div className={classNames('icon', { 'over': props.status === 1 })}></div>
                    {props.status === 1 ? <div className='stamp'></div> : undefined}
                    <div className={classNames('radio', { 'active': this.props.cardId == props.item.couDefId })}></div>
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
                <div className='card card-dai' onClick={() => this.setState({ cardId: props.item.couDefId }, () => {
                    this.onSelect();
                })}>
                    <div className={classNames('icon', { 'over': props.status === 1 })}></div>
                    {props.status === 1 ? <div className='stamp'></div> : undefined}
                    <div className={classNames('radio', { 'active': this.props.cardId == props.item.couDefId })}></div>
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
                <Header title='选择卡券' className2='add-hide' />

                <Content>
                    <div className="wrap clearfix" data-page='choosecard'>

                        <div className='empty' onClick={() => window.location.href = '#/add?shopid=' + this.props.storeId}>
                            新增卡券
                            <div className='y-left'></div>
                            <div className='y-right'></div>
                            <div className='line'></div>
                        </div>

                        {this.props.cardList && this.props.cardList.couponDefineDTOList && this.props.cardList.couponDefineDTOList.length ? this.props.cardList.couponDefineDTOList.map(p =>

                            p.couponType == 1 ? <CardMJ key={p.couDefId} item={p} status={p.status} /> : p.couponType == 3 ? <CardPZ key={p.couDefId} item={p} status={p.status} /> : <CardDJ key={p.couDefId} item={p} status={p.status} />

                        ) : undefined}

                    </div>

                </Content>
            </Layout>);
    }


}

export default ChooseCard;