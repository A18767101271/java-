import '../../sass/HomePage.scss';
import React from 'react';
import Layout from '../../../../apps/components/AppLayout';
import { Button, ImagePicker, Modal } from 'antd-mobile';

const { Header, Content } = Layout;

interface ShopIndoorImgProps {
    indoorImgArry?: any;
    onEnter?: (data: {}[]) => void;
}

class ShopIndoorImg extends React.Component<ShopIndoorImgProps, {
    data?: {}[]
}>{

    constructor(props: ShopIndoorImgProps) {
        super(props);
        this.state = {
            data: props.indoorImgArry
        }
    }

    onChange = (files) => {
        this.setState({
            data: files
        });
    }

    componentWillMount() {
    }

    onSubmit() {

        if (!this.state.data || !this.state.data.length) {
            Modal.alert('提示', '尚未上传图片');
            return;
        }

        if (this.state.data && this.state.data.length && this.state.data.length <= 1) {
            Modal.alert('提示', '上传图片不能少于2张');
            return;
        }


        this.props.onEnter && this.props.onEnter(this.state.data);

    }

    render() {

        return (

            <Layout>
                <Header title='内景照' />
                <Content>
                    <div className="wrap clearfix" data-page='indoor'>

                        <div className='tip'>内景照：需露出门店环境的全景，如：服务时的场景、超市货架全景、餐厅全景等</div>
                        <div className='section'>

                            <ImagePicker
                                files={this.state.data}
                                onChange={this.onChange}
                                selectable={this.state.data && this.state.data.length < 10}
                            />

                            <div className='text'>需上传2到10张图片</div>
                        </div>

                        <div className='section-2'>
                            <div className='text'>内景照示例图</div>
                            <div className='sample-img'></div>
                        </div>
                        <Button type="warning" className='btn-complete' onClick={() => this.onSubmit()}>完成</Button>
                    </div>

                </Content >
            </Layout >);
    }

}

export default ShopIndoorImg;