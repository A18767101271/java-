import '../../sass/HomePage.scss';
import React from 'react';
import Layout from '../../../../apps/components/AppLayout';
//import classNames from 'classNames';
// import moment from 'moment';
//import { Toast, Modal } from 'antd-mobile';

const { Header, Content } = Layout;

interface HomePageProps {

}

class HomePage extends React.Component<HomePageProps>{

    constructor(props: HomePageProps) {
        super(props);
    }



    componentWillMount() {
    }

    render() {

        return (

            <Layout>
                <Header title='' />
                <Content>
                    <div className="wrap clearfix" data-page='home'>
                        1
                    </div>

                </Content >
            </Layout >);
    }

}

export default HomePage;