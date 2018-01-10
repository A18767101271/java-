import '../../sass/HomePage.scss';
//import PromotionApis, { GetPromotionListData } from '../../../../services/promotion-apis';
import React from 'react';
import Layout from '../../../../apps/components/AppLayout';
// import classNames from 'classNames';
// import moment from 'moment';
//import { Toast, Modal } from 'antd-mobile';

const { Header, Content } = Layout;

interface AddPageProps {
    storeId: number,
}

class AddPage extends React.Component<AddPageProps>{

    constructor(props: AddPageProps) {
        super(props);
        this.state = {};
    }

    componentWillMount() {

    }

    render() {
        return (
            <Layout>
                <Header title='新增卡券' addIsHide={true} />
                <Content>
                    <div className="wrap clearfix" data-page='add'>

                        <div className='card card-ping'>
                            <div className='name'>凭证券</div>
                            <div className='text'>凭证券的相关文案和提示大概在这些字以内</div>
                            <div className='btn' onClick={() => window.location.href = "#/setpz?shopid=" + this.props.storeId}>立即添加</div>
                        </div>

                        <div className='card card-dai'>
                            <div className='name'>代金券</div>
                            <div className='text'>代金券的相关文案和提示大概在这些字以内</div>
                            <div className='btn' onClick={() => window.location.href = "#/setdj?shopid=" + this.props.storeId}>立即添加</div>
                        </div>

                        <div className='card card-man'>
                            <div className='name'>满减券</div>
                            <div className='text'>满减券的相关文案和提示大概在这些字以内</div>
                            <div className='btn' onClick={() => window.location.href = "#/setmj?shopid=" + this.props.storeId}>立即添加</div>
                        </div>

                    </div>

                </Content>
            </Layout>);
    }


}

export default AddPage;