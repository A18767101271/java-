import '../../sass/HomePage.scss';
import React from 'react';
import Layout from '../../../../apps/components/AppLayout';
import UParams from '../../../../assets/libs/uparams';
import classNames from 'classNames';
// import moment from 'moment';
//import { Toast, Modal } from 'antd-mobile';

const { Header, Content } = Layout;

interface CardDetailsProps {
    storeId: number
}

class CardDetails extends React.Component<CardDetailsProps, {
    isDetail: boolean;
    data1?: any;
    data2?: any;

}>{

    constructor(props: CardDetailsProps) {
        super(props);
        this.state = {
            isDetail: true
        };
    }

    componentWillMount() {
    }

    pageDetail() {
        return (
            <div className='content'>
                <div className='card'>
                    <div className='c-left'></div>
                    <div className='c-right'></div>
                    <div className='c-icon icon-pz'></div>
                    <div className='c-name'>送可乐凭证券</div>
                    <div className='c-number'>4481545154</div>

                    <div className='row'>
                        <div className='left fl'>卡券分类</div>
                        <div className='right fr'>凭证券</div>
                    </div>
                    <div className='row'>
                        <div className='left fl'>卡券状态</div>
                        <div className='right fr'>未发放</div>
                    </div>
                    <div className='row'>
                        <div className='left fl'>创建时间</div>
                        <div className='right fr'>2018.01.12 11:30</div>
                    </div>
                    <div className='row'>
                        <div className='left fl'>有效期</div>
                        <div className='right fr'>3天后生效 7天后过期</div>
                    </div>

                    <div className='row-2 clearfix'>
                        <div className='left fl'>商品内容</div>
                        <div className='right fr'>
                            <div className='item'>可乐 x1</div>
                            <div className='item'>杨枝甘露 x2</div>
                            <div className='item'>烤饼 x10</div>
                        </div>
                    </div>

                    <div className='row-2 clearfix'>
                        <div className='left fl'>服务内容</div>
                        <div className='right fr'>
                            <div className='text'>呵呵呵呵呵呵呵呵和的幅度幅度的方式发呆反对反对反对法</div>
                        </div>
                    </div>

                </div>
            </div>
        )

    }

    pageRecord() {
        return (
            <div className='content'>
                <div className='list'>
                    <div className='name'>活动的名称</div>
                    <div className='i-1'>分配数量</div>
                    <div className='num'>10</div>
                    <div className='time'>2018.01.12 11:30</div>
                    <div className='line'></div>
                </div>

                <div className='list'>
                    <div className='name'>活动的名称</div>
                    <div className='i-1'>分配数量</div>
                    <div className='num'>10</div>
                    <div className='time'>2018.01.12 11:30</div>
                    <div className='line'></div>
                </div>

            </div>
        )
    }

    render() {

        const BtnDel = () => {
            return (
                <div className='btn-del'>立即删除</div>
            )
        }

        const BtnPush = () => {
            return (
                <div className='btn-push'>立即发布</div>
            )
        }

        let parms = UParams();
        console.log(parms.id);

        return (
            <Layout>
                <Header title='卡券配置详情' className2='add-hide' />
                <Content>
                    <div className="wrap clearfix" data-page='details'>

                        <div className='headbar'>
                            <div className={classNames('btn btn-1', { 'active': this.state.isDetail == true })} onClick={() => this.setState({ isDetail: true })}>卡券详情</div>
                            <div className={classNames('btn btn-2', { 'active': this.state.isDetail == false })} onClick={() => this.setState({ isDetail: false })}>分配记录</div>
                        </div>

                        {this.state.isDetail ? this.pageDetail() : this.pageRecord()}

                        <BtnDel />
                        <BtnPush />

                    </div>

                </Content>
            </Layout>);
    }


}

export default CardDetails;