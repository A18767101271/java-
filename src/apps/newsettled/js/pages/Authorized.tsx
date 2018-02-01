import '../../sass/HomePage.scss';
import React from 'react';
import Layout from '../../../../apps/components/AppLayout';
import { Button, ImagePicker, Modal, List } from 'antd-mobile';

const { Header, Content } = Layout;

interface AuthorizedProps {
    authorizedImgArry?: any;
    onEnter?: (data: { uid?: string, url?: string }[]) => void;
}

class Authorized extends React.Component<AuthorizedProps, {
    data?: { url: string, uid: string }[]
}>{

    constructor(props: AuthorizedProps) {
        super(props);
        this.state = {
            data: props.authorizedImgArry
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

        this.props.onEnter && this.props.onEnter([{ uid: this.state.data[this.state.data.length - 1].uid, url: this.state.data[this.state.data.length - 1].url }]);

    }

    render() {

        return (

            <Layout>
                <Header title='授权函' />
                <Content>
                    <div className="wrap clearfix" data-page='authorized'>

                        <div className='tip'>当您非营业执照法人时，需要上传授权函。授权函格式见下方示例，请下载模板，按提示上传授权函。</div>
                        <div className='section'>

                            <ImagePicker
                                files={this.state.data}
                                onChange={this.onChange}
                                selectable={this.state.data && this.state.data.length < 1}
                            />

                            <div className='text'>需上传1张图片</div>
                        </div>

                        <List renderHeader={() => '授权函中的身份证须原文件，请下载模板，按照模板示例填写，并保证图片清晰无水印。个体户的授权签名可免授权公司盖章。'} className='my-list'>

                        </List>


                        <Button type="warning" className='btn-complete' onClick={() => this.onSubmit()}>完成</Button>
                    </div>

                </Content >
            </Layout >);
    }

}

export default Authorized;