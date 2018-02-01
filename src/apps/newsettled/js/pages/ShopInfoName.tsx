import '../../sass/HomePage.scss';
import React from 'react';
import Layout from '../../components/AppLayout';
import { List, InputItem, Button, Modal } from 'antd-mobile';
//import classNames from 'classNames';
// import moment from 'moment';
//import { Toast, Modal } from 'antd-mobile';

const { Header, Content } = Layout;


interface ShopInfoNameProps {
    name1?: string;
    name2?: string;
    onEnter?: (data: { name1?: string, name2?: string }) => void;
}

class ShopInfoName extends React.Component<ShopInfoNameProps, {
    name1?: string;
    name2?: string;
}>{

    constructor(props: ShopInfoNameProps) {
        super(props);
        this.state = {
            name1: props.name1,
            name2: props.name2
        };
    }

    componentWillMount() {
    }

    onComplete() {

        if (!this.state.name1) {
            Modal.alert('提示', '请输入主店名称');
            return;
        }

        this.props.onEnter && this.props.onEnter({ name1: this.state.name1, name2: this.state.name2 });
    }

    render() {

        return (

            <Layout>
                <Header title='门店名称' />
                <Content>
                    <div className="wrap clearfix" data-page='shopinfoname'>
                        <List>
                            <InputItem value={this.state.name1 || ''} onChange={(e) => this.setState({ name1: (e || '').trim() })}>主店名称</InputItem>
                            <InputItem value={this.state.name2 || ''} onChange={(e) => this.setState({ name2: (e || '').trim() })}>分店名称</InputItem>
                        </List>

                        <div className='section'>
                            <div className='row1'>示例1.老何炒面</div>
                            <div className='row2'>主店名:老何炒面,分店名不填</div>
                            <div className='row1'>示例2.肯德基（大学城店）</div>
                            <div className='row2'>主店名:肯德基，分店名：大学城店</div>
                            <div className='row1'>示例3.兰州拉面（人民美食广场）</div>
                            <div className='row2'>主店名:兰州拉面，分店名：人民美食广场</div>
                        </div>


                        <Button type="warning" className='btn-complete' onClick={() => this.onComplete()}>完成</Button>

                    </div>
                </Content >
            </Layout >);
    }

}

export default ShopInfoName;