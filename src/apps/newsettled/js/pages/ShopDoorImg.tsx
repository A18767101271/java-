import '../../sass/HomePage.scss';
import React from 'react';
import Layout from '../../../../apps/components/AppLayout';
import { Button, ImagePicker, Modal } from 'antd-mobile';

const { Header, Content } = Layout;

interface ShopDoorImgProps {
    doorImgArry?: any;
    onEnter?: (data: { uid?: string, url?: string }[]) => void;
}

class ShopDoorImg extends React.Component<ShopDoorImgProps, {
    data?: { url: string, uid: string }[]
}>{

    constructor(props: ShopDoorImgProps) {
        super(props);
        this.state = {}
    }

    onChange = (files) => {
        this.setState({
            data: files
        });
    }

    componentWillMount() {

        if (this.props.doorImgArry && this.props.doorImgArry.length) {
            this.setState({
                data: this.props.doorImgArry
            })
        }

    }


    onSubmit() {

        if (!this.state.data || !this.state.data.length) {
            Modal.alert('提示', '尚未上传图片');
            return;
        }

        this.props.onEnter && this.props.onEnter([{ uid: this.state.data[this.state.data.length - 1].uid, url: this.state.data[this.state.data.length - 1].url }]);

    }

    render() {

        return (

            <Layout>
                <Header title='门头照' />
                <Content>
                    <div className="wrap clearfix" data-page='door'>

                        <div className='tip'>门头照：需露出实体店的完整店名，且与本次开店填写的门店名称一致，有疑问可看下列示例图</div>
                        <div className='section'>

                            <ImagePicker
                                files={this.state.data}
                                onChange={this.onChange}
                                selectable={this.state.data && this.state.data.length < 1}
                            />

                            <div className='text'>需上传1张图片</div>
                        </div>

                        <div className='section-2'>
                            <div className='text'>门头照示例图</div>
                            <div className='sample-img'></div>
                        </div>
                        <Button type="warning" className='btn-complete' onClick={() => this.onSubmit()}>完成</Button>
                    </div>

                </Content >
            </Layout >);
    }

}

export default ShopDoorImg;