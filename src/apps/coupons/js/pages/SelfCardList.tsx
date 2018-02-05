import '../../sass/HomePage.scss';
import React from 'react';
import Layout from '../../../../apps/components/AppLayout';
//import UParams from '../../../../assets/libs/uparams';
import classNames from 'classnames';
// import moment from 'moment';
//import { Toast } from 'antd-mobile';

const { Header, Content } = Layout;

interface CardListProps {
    storeId: number
}

interface CardListState {
    data?: any,
    currState: number,
    pageNumber: number,
    pageSize: number,
}

class CardList extends React.Component<CardListProps, CardListState>{

    constructor(props: CardListProps) {
        super(props);
        this.state = {
            currState: 1,
            pageNumber: 0,
            pageSize: 999
        };
    }

    componentWillMount() {
    }

    getData(status: number) {
        this.setState({
            currState: status,
        })
    }

    render() {

        const HeadUlLi = (props: { value: number, name: string }) => {
            return (<div className={classNames('btn', { "active": this.state.currState === props.value })} onClick={() => this.getData(props.value)}>
                {props.name}
            </div>);
        }

        const marketItemList = () => {
            return (
                <div>
                    <div className='card' onClick={() => window.location.href = '#/getconfig?cardid=159?shopid=' + this.props.storeId}>
                        <div className='icon'>凭</div>
                        <div className='status'>已上架</div>
                        <div className='line name'>送可乐1瓶凭证券</div>
                        <div className='line num'>3194788454514</div>
                        <div className='line l-1'>库存：100</div>
                        <div className='line l-2'>已发放：100</div>
                        <div className='line l-3'>创建时间：2018.01.10-11：20</div>
                        <div className='line l-4'>领取时段：2018.01.10 至 2018.02.01</div>
                    </div>

                    <div className='card over'>
                        <div className='stamp'></div>
                        <div className='icon'>凭</div>
                        <div className='status'>已下架</div>
                        <div className='line name'>送可乐1瓶凭证券</div>
                        <div className='line num'>3194788454514</div>
                        <div className='line l-1'>库存：100</div>
                        <div className='line l-2'>已发放：100</div>
                        <div className='line l-3'>创建时间：2018.01.10-11：20</div>
                        <div className='line l-4'>领取时段：2018.01.10 至 2018.02.01</div>
                    </div>
                </div>
            )
        }

        return (
            <Layout>
                <Header title='自助领券列表' addIsShow={true} addUrl={'selfcard'} />
                <Content>
                    <div className="wrap clearfix" data-page='selfcardlist'>

                        <div className='headbar'>
                            <HeadUlLi value={1} name={"全部"} />
                            <HeadUlLi value={2} name={"已上架"} />
                            <HeadUlLi value={3} name={"已下架"} />
                        </div>

                        <div className='content'>
                            {marketItemList()}
                        </div>

                    </div>

                </Content>
            </Layout>);
    }


}

export default CardList;