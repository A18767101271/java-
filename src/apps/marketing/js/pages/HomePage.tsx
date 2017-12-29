import '../../sass/HomePage.scss';
import PromotionApis, { GetPromotionListData } from '../../../../services/promotion-apis';
import React from 'react';
import classNames from 'classNames';
import moment from 'moment';


import { Toast, Modal } from 'antd-mobile';


const MarketItem = (props: { data: any, type: number, shopId: number }) => {
    let timestamp = new Date().getTime() / 1000;
    const dt = props.data;
    let st = dt.startTime;
    let ed = dt.endTime;

    function getSubTitle() {
        if (props.type === 1) {
            return <span className="sm-text">{dt.marketNum}项优惠</span>;
        } else if (props.type === 2) {
            return <span className="sm-text">{dt.marketNum}折</span>;
        } else if (props.type === 4) {
            //return <span className="sm-text">{dt.marketNum}瓶</span>;
        }
    }

    function getRightTime() {
        if (dt.status === 1 && st <= timestamp && ed > timestamp) {
            if ((ed - timestamp) > 259200) {
                return <div className="icon icon-ing">进行中</div>;
            } else {
                var n = Math.ceil((ed - timestamp) / 86400);
                return <div className="icon icon-start">剩余{n}天</div>;
            }

        } else if (dt.status === 1 && st > timestamp) {
            if ((st - timestamp) > 259200) {
                return <div className="icon icon-end">{moment(st * 1000).format('YYYY.MM.DD')}开启</div>;
            } else {
                var n = Math.ceil((st - timestamp) / 86400);
                return <div className="icon icon-end">距开始{n}天</div>;
            }

        } else {
            return <div className="icon icon-end">活动已结束</div>;
        }
    }

    // if (dt.vStatus == 2) {
    //     return (<div></div>);
    // }
    // else {

    return (<div className="list" onClick={() => { window.location.href = "#/details/" + props.data.activityId + '?shopid=' + props.shopId; }}  >
        <i></i>
        <h1>{props.data.activityId + '#' + dt.name}</h1>
        {getSubTitle()}
        <span className="time-text">{moment(st * 1000).format('YYYY-MM-DD')}~{moment(ed * 1000).format('YYYY-MM-DD')}</span>
        {getRightTime()}
    </div>);
    //}

}

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
        const shopId = this.props.storeId;
        const marketItemList = () => {

            if (this.state.data && this.state.data.content.length > 0) {
                let res: any[] = [];

                this.state.data.content.forEach(p => {
                    res.push(<MarketItem key={p.activityId} data={p} type={this.state.currType || 0} shopId={shopId} />);
                });

                return (<div>{res}</div>);
            } else {
                return (<div className="no-img"><div className="img"></div><span>暂无活动信息</span></div>);
            }

        }

        const ToolbarItem = (props: { value: number, name: string }) => {
            return (<div className={classNames("btn", { "active": this.state.currState === props.value })} onClick={() => this.getData(this.state.currType, props.value)}>{props.name}</div>);
        }

        const HeadUlLi = (props: { value: number, name: string }) => {
            return (<li className={classNames({ "active": this.state.currType === props.value })} onClick={() => this.getData(props.value, this.state.currState)}>
                <span  >{props.name}</span>
                <div className="line"></div>
            </li>);
        }

        return (<div className="wrap" data-page='home'   >
            <div className="headbar">
                <ul className="head-ul">
                    <HeadUlLi value={1} name={"满减"} />
                    <HeadUlLi value={3} name={"返券"} />
                    <HeadUlLi value={5} name={"红包"} />
                    <HeadUlLi value={2} name={"折扣"} />
                    <HeadUlLi value={4} name={"赠品"} />
                </ul>
                {this.state.enableToggleBar ?
                    <div className={classNames("toolbtn", { "bom": this.state.toolToggle })} onClick={() => this.setState({
                        toolToggle: !this.state.toolToggle
                    })}><i></i></div> : undefined}
            </div>
            {this.state.enableToggleBar ? <div className={classNames("toolbar", { "hide": this.state.toolToggle })} >
                <ToolbarItem value={1} name={"进行中"} />
                <ToolbarItem value={4} name={"预结束"} />
                <ToolbarItem value={3} name={"预开始"} />
                <ToolbarItem value={0} name={"未开始"} />
                <ToolbarItem value={2} name={"已结束"} />
            </div> : undefined}

            <div className="contain" id='wrapper' onScroll={() => { this.onScroll(); }}  >
                <div id='scroller'>
                    {marketItemList()}
                </div>
            </div>
        </div >);
    }


}

export default HomePage;