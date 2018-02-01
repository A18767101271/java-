import '../../sass/HomePage.scss';
import React from 'react';
import Layout from '../../../../apps/components/AppLayout';
import { Button, ImagePicker, Modal, List, InputItem, Switch, DatePicker } from 'antd-mobile';
//import moment from 'moment';

const { Header, Content } = Layout;

interface BusinessLicenseProps {
    licenseImgArry?: any;
    isLong?: boolean;
    useTime?: Date;
    regNumber?: string;
    wordName?: string;
    onEnter?: (data: { uid?: string, url?: string }[], info: {}) => void;
}

class BusinessLicense extends React.Component<BusinessLicenseProps, {
    data?: { url: string, uid: string }[]
    isLong: boolean;
    useTime?: Date;
    regNumber?: string;
    wordName?: string;
}>{

    constructor(props: BusinessLicenseProps) {
        super(props);
        this.state = {
            data: props.licenseImgArry,
            isLong: props.isLong === undefined ? false : !!props.isLong,
            useTime: props.useTime,
            regNumber: props.regNumber,
            wordName: props.wordName
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

        if (!this.state.isLong) {
            if (!this.state.useTime) {
                Modal.alert('提示', '请选择有效期');
                return;
            }
        }

        if (!this.state.regNumber) {
            Modal.alert('提示', '请输入注册号');
            return;
        }

        if (!this.state.wordName) {
            Modal.alert('提示', '请输入字号名称');
            return;
        }

        this.props.onEnter && this.props.onEnter([{ uid: this.state.data[this.state.data.length - 1].uid, url: this.state.data[this.state.data.length - 1].url }],
            { isLong: this.state.isLong, useTime: this.state.useTime, regNumber: this.state.regNumber, wordName: this.state.wordName });

    }

    render() {

        return (

            <Layout>
                <Header title='营业执照' />
                <Content>
                    <div className="wrap clearfix" data-page='license'>

                        <div className='tip'>上传在有效期内的合格营业执照，需原件图片</div>
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
                                    checked={!!this.state.isLong}
                                    onClick={(checked) => {
                                        this.setState({
                                            isLong: !!checked
                                        })
                                    }} />
                                }
                            >长期有效
                            </List.Item>

                            {this.state.isLong ? <div></div> :

                                <DatePicker
                                    mode="date"
                                    value={this.state.useTime}
                                    onChange={date => this.setState({ useTime: date })}
                                >
                                    <List.Item arrow="horizontal">有效期</List.Item>
                                </DatePicker>
                            }

                            <InputItem value={this.state.regNumber || ''} type={'number'} placeholder={'请与营业执照上保持一致'} onChange={(e) => this.setState({ regNumber: (e || '').trim() })}>注册号</InputItem>

                        </List>


                        <List renderHeader={() => '请按照营业执照上的信息填写,仅支持数字、字母、汉字。如：410883000018227(1-1),请输入：410883000018227'} className='my-list'>

                            <InputItem value={this.state.wordName || ''} type={'text'} placeholder={'请填写营业执照上的字号名称'} onChange={(e) => this.setState({ wordName: (e || '').trim() })}>字号名称</InputItem>

                        </List>

                        <List renderHeader={() => '如果是个体户的营业执照没有名称，名称中请填写经营者姓名。企业执照请填写法人代表、个体户执照请填写经营者姓名'} className='my-list'>

                        </List>

                        <Button type="warning" className='btn-complete' onClick={() => this.onSubmit()}>完成</Button>
                    </div>

                </Content >
            </Layout >);
    }

}

export default BusinessLicense;