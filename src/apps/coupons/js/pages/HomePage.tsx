import '../../sass/HomePage.scss';
//import PromotionApis, { GetPromotionListData } from '../../../../services/promotion-apis';
import React from 'react';
import Layout from '../../../../apps/components/AppLayout';
// import classNames from 'classNames';
// import moment from 'moment';
//import { Toast, Modal } from 'antd-mobile';

const { Header, Content } = Layout;

interface HomePageProps {
    storeId: number,
}

interface HomePageState {
    //data?: GetPromotionListData,
    pageNumber: number,
    pageSize: number,
}


class HomePage extends React.Component<HomePageProps, HomePageState>{

    constructor(props: HomePageProps) {
        super(props);

        // let params = UParams();

        this.state = {
            //storeId: props.storeId,
            pageNumber: 0,
            pageSize: 10
        };


    }



    componentWillMount() {

    }

    render() {
        //const shopId = this.props.storeId;

        return (


            <Layout>
                <Header title='卡券管理' />
                <Content>
                    <div className="wrap clearfix" data-page='home'>

                        <div className='card card-ping-1'>
                            <div className='icon'></div>
                            <div className='y-left'></div>
                            <div className='y-right'></div>
                            <div className='line'></div>
                            <div className='name'>什么什么凭证券</div>
                            <div className='number'>31659854545</div>
                            <div className='text-0'>此次是商品内容</div>
                            <div className='text-1'>此次是服务内容</div>
                            <div className='text-2'>创建时间:2018.02.01 10:20</div>
                            <div className='text-3'>有效期:2018.02.01 - 2018.02.10</div>
                            <div className='text-4'>未发放</div>
                        </div>

                        <div className='card card-dai-2'>
                            <div className='icon'></div>
                            <div className='stamp stamp-1'></div>
                            <div className='y-left'></div>
                            <div className='y-right'></div>
                            <div className='line'></div>
                            <div className='name'>什么什么代金券</div>
                            <div className='number'>31659854545</div>
                            <div className='text-2'>创建时间:2018.02.01 10:20</div>
                            <div className='text-3'>有效期:2018.02.01 - 2018.02.10</div>
                            <div className='text-4'>未发放</div>
                            <div className='text-5'>￥<em>9999</em></div>
                        </div>

                        <div className='card card-man-1'>
                            <div className='icon'></div>
                            <div className='y-left'></div>
                            <div className='y-right'></div>
                            <div className='line'></div>
                            <div className='name'>什么什么满减券</div>
                            <div className='number'>31659854545</div>
                            <div className='text-1'>消费满100元可用</div>
                            <div className='text-2'>创建时间:2018.02.01 10:20</div>
                            <div className='text-3'>有效期:2018.02.01 - 2018.02.10</div>
                            <div className='text-4'>未发放</div>
                            <div className='text-5'>￥<em>9999</em></div>
                        </div>
                    
                    </div>

                </Content>
            </Layout>);
    }


}

export default HomePage;