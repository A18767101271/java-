import '../../sass/HomePage.scss';
import React from 'react';
import Layout from '../../../../apps/components/AppLayout';
import { Button, ImagePicker, Modal, List, Switch, DatePicker } from 'antd-mobile';
//import moment from 'moment';

const { Header, Content } = Layout;

interface BusinessPermitProps {
    permitImgArry?: any;
    isLong2?: boolean;
    useTime2?: Date;
    onEnter?: (data: { uid?: string, url?: string }[], info: {}) => void;
}

class BusinessPermit extends React.Component<BusinessPermitProps, {
    data?: { url: string, uid: string }[]
    isLong2: boolean;
    useTime2?: Date;
}>{

    constructor(props: BusinessPermitProps) {
        super(props);
        this.state = {
            data: props.permitImgArry,
            isLong2: props.isLong2 === undefined ? false : !!props.isLong2,
            useTime2: props.useTime2,
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

        if (!this.state.isLong2) {
            if (!this.state.useTime2) {
                Modal.alert('提示', '请选择有效期');
                return;
            }
        }

        this.props.onEnter && this.props.onEnter([{ uid: this.state.data[this.state.data.length - 1].uid, url: this.state.data[this.state.data.length - 1].url }],
            { isLong2: this.state.isLong2, useTime2: this.state.useTime2 });

    }

    render() {

        return (

            <Layout>
                <Header title='经营许可证' />
                <Content>
                    <div className="wrap clearfix" data-page='permit'>

                        <div className='tip'>中国工商局规定，不同的经营品类、商品需要不同许可证，如餐饮店需有卫生许可证‘烟酒需有烟酒销售许可证等等，点击此处查看经营品类所需许可证</div>
                        <div className='section'>

                            <ImagePicker
                                files={this.state.data}
                                onChange={this.onChange}
                                selectable={this.state.data && this.state.data.length < 1}
                            />

                            <div className='text'>需上传1张图片</div>
                        </div>

                        <List renderHeader={() => ''} className="my-list">

                            <List.Item
                                extra={<Switch
                                    color={'red'}
                                    checked={!!this.state.isLong2}
                                    onClick={(checked) => {
                                        this.setState({
                                            isLong2: !!checked
                                        })
                                    }} />
                                }
                            >长期有效
                            </List.Item>

                            {this.state.isLong2 ? <div></div> :

                                <DatePicker
                                    mode="date"
                                    value={this.state.useTime2}
                                    onChange={date => this.setState({ useTime2: date })}
                                >
                                    <List.Item arrow="horizontal">有效期</List.Item>
                                </DatePicker>
                            }

                        </List>

                        <Button type="warning" className='btn-complete' onClick={() => this.onSubmit()}>完成</Button>
                    </div>

                </Content >
            </Layout >);
    }

}

export default BusinessPermit;