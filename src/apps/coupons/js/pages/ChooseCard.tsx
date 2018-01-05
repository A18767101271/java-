import '../../sass/HomePage.scss';
import React from 'react';
import Layout from '../../../../apps/components/AppLayout';
import UParams from '../../../../assets/libs/uparams';

const { Header, Content } = Layout;

interface ChooseCardProps {
    storeId: number,
}

class ChooseCard extends React.Component<ChooseCardProps, {
    cardId?: number;
}>{

    constructor(props: ChooseCardProps) {
        super(props);
        this.state = {};
    }

    componentWillMount() {

        let parms = UParams();

        if (parms.cardid) {
            this.setState({ cardId: parms.cardid });
        }

    }

    render() {

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

export default ChooseCard;