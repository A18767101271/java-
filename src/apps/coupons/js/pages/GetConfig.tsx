import '../../sass/HomePage.scss';
//import PromotionApis, { GetPromotionListData } from '../../../../services/promotion-apis';
import React from 'react';
import Layout from '../../../../apps/components/AppLayout';
import UParams from '../../../../assets/libs/uparams';
// import classNames from 'classNames';
// import moment from 'moment';
import { Modal } from 'antd-mobile';

const { Header, Content } = Layout;

interface AddPageProps {
    mchId: number,
}

class AddPage extends React.Component<AddPageProps, {
    data?: any;
}>{

    constructor(props: AddPageProps) {
        super(props);
        this.state = {};
    }

    componentWillMount() {

        let params = UParams();
        const cardId = parseInt(params.cardid);

        if (isNaN(cardId) || cardId < 1) {
            Modal.alert('提示', '参数cardId无效', []);
        }
        else {

        }

    }

    render() {

        let params = UParams();
        const cardId = parseInt(params.cardid);

        return (
            <Layout>
                <Header title='领券配置详情' editIsShow={true} cardId={cardId} />
                <Content>
                    <div className="wrap clearfix" data-page='getconfig'>

                        <div className='card'>
                            <div className='c-left'></div>
                            <div className='c-right'></div>
                            <div className='line'></div>
                            <div className='icon'>凭</div>
                            <div className='name'>送可乐凭证券</div>
                            <div className='number'>4481545154</div>
                            <div className='status'>已上架</div>
                            <div className='row'>
                                <div className='left fl'>创建时间</div>
                                <div className='right fr'>2018.01.10 - 13：00</div>
                            </div>
                            <div className='row'>
                                <div className='left fl'>领取时段</div>
                                <div className='right fr'>2018.01.10 至 2018.10.10</div>
                            </div>
                            <div className='row'>
                                <div className='left fl'>可领数量</div>
                                <div className='right fr'>100</div>
                            </div>
                            <div className='row'>
                                <div className='left fl'>库存量</div>
                                <div className='right fr'>不限</div>
                            </div>

                            <div className='row'>
                                <div className='left fl'>已发放</div>
                                <div className='right fr'>99</div>
                            </div>

                            <div className='row'>
                                <div className='left fl'>单价</div>
                                <div className='right fr'>10.00</div>
                            </div>

                            <div className='btn-export'>导出二维码>></div>

                        </div>

                        <div className='btn'>立即下架</div>

                    </div>

                </Content>
            </Layout>);
    }


}

export default AddPage;