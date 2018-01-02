import '../../sass/HomePage.scss';
import PromotionApis, { GetPromotionListData } from '../../../../services/promotion-apis';
import React from 'react';
import Layout from '../../../../apps/components/AppLayout';
// import classNames from 'classNames';
// import moment from 'moment';
import { Toast, Modal } from 'antd-mobile';



const { Header, Content } = Layout;

interface HomePageProps {
    storeId: number,
    limitStatus?: number
}

interface HomePageState {
    data?: GetPromotionListData,
    currType: number,
    currState: number,
    toolToggle: boolean,
    enableToggleBar: boolean,
    pageNumber: number,
    pageSize: number,
    loadstate?: boolean
}


class HomePage extends React.Component<HomePageProps, HomePageState>{

    constructor(props: HomePageProps) {
        super(props);

        // let params = UParams();

        let limitStatus = props.limitStatus;

        this.state = {
            //storeId: props.storeId,
            toolToggle: false,
            enableToggleBar: limitStatus === undefined,
            currState: limitStatus === undefined ? 1 : limitStatus,
            currType: 1,
            pageNumber: 0,
            pageSize: 10
        };


    }

    getData(type: number, status: number, pageNumber?: number) {
        Toast.loading('载入中', 30);
        let self = this;

        const pageSize = this.state.pageSize;

        const pNumber = pageNumber != undefined ? pageNumber : 0;

        this.setState({
            currType: type,
            currState: status,
            pageNumber: pNumber,
            pageSize: pageSize,
            loadstate: false
        }, () => {

            PromotionApis.getPromotionList({ storeId: this.props.storeId, type, status, pageNumber: self.state.pageNumber, pageSize: pageSize }).then(data => {

                const loadstate = data.currentPage == data.totalPages || (data.content && data.content.length == 0) ? true : undefined

                if (pNumber == 0) {
                    this.setState({
                        data: data,
                        loadstate: loadstate
                    });
                }
                else {
                    if (this.state.data) {
                        data.content = this.state.data.content.concat(data.content);
                    }
                    this.setState({
                        data: data,
                        loadstate: loadstate
                    });
                }

                Toast.hide();

            }).catch(err => {
                if (pNumber == 0) {
                    this.setState({
                        data: undefined
                    });
                }
                Toast.hide();
                if (err.ret == "fail.27004") {
                    this.setState({
                        loadstate: true
                    });
                } else {
                    Modal.alert('提示', err.msg);
                }
            });

        });


    }

    componentWillMount() {
        this.getData(this.state.currType, this.state.currState);
    }

    onScroll() {
        let tar = window.document.getElementById('wrapper') as HTMLDivElement;
        let scroll = window.document.getElementById('scroller') as HTMLDivElement;

        if (tar.scrollTop + tar.clientHeight > scroll.clientHeight - 20) {
            if (this.state.loadstate === undefined) {
                this.getData(this.state.currType, this.state.currState, this.state.pageNumber + 1)
            }
        }
    }

    render() {
        //const shopId = this.props.storeId;

        return (


            <Layout>
                <Header title='卡券管理' />
                <Content>
                    <div className="wrap" data-page='home'>
                        1
                    </div>

                </Content>
            </Layout>);
    }


}

export default HomePage;