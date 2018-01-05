import '../../sass/HomePage.scss';
import React from 'react';
import Layout from '../../../../apps/components/AppLayout';
import UParams from '../../../../assets/libs/uparams';

const { Header, Content } = Layout;

interface AddPageProps {
    storeId: number,
}

class AddPage extends React.Component<AddPageProps, {
    type?: number;
}>{

    constructor(props: AddPageProps) {
        super(props);
        this.state = {};
    }

    componentWillMount() {

        let parms = UParams();

        if (parms.type) {
            this.setState({ type: parms.type });
        }

    }

    render() {

        const ChooseContent = () => {
            return (
                <div className='setion'>
                    <div className='list l-1' onClick={() => window.location.href = '#/selfcard?cardid=1?shopid=' + this.props.storeId}><div className='left fl'>自助领券</div><div className='right fr'></div></div>
                    <div className='list l-2'><div className='left fl'>定制发券</div><div className='right fr'></div></div>
                    <div className='list l-3'><div className='left fl'>下单返券</div><div className='right fr'></div></div>
                </div>
            )
        }


        return (
            <Layout>
                {this.state.type == 1 ? <Header title='' className2='add-hide' className3='no-border' /> : <Header title='请选择卡券上线方式' className2='add-hide' />}

                <Content>
                    <div className="wrap clearfix" data-page='choose'>
                        {this.state.type == 1 ?
                            <div>
                                <div className='headbar'>
                                    <div className='img'></div>
                                    <div className='t-1'>卡券创建成功</div>
                                </div>
                                <div className='t-2'>请选择卡券上线方式</div>
                            </div> : undefined}
                        <ChooseContent />
                        {this.state.type == 1 ? <div className='btn' onClick={() => window.location.href = '#/?shopid=' + this.props.storeId}>返回卡券列表</div> : undefined}
                    </div>

                </Content>
            </Layout>);
    }


}

export default AddPage;