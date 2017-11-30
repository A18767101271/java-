import '../../sass/HomePage.scss';

import PromotionApis from '../../../../services/promotion-apis';
import React from 'react';
import classNames from 'classNames';
import moment from 'moment';

//const $ = (window as any).$;


const MarketItem = (props: { data: any, type: number }) => {
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
        if (st <= timestamp && ed > timestamp) {
            if ((ed - timestamp) > 259200) {
                return <div className="icon icon-ing">进行中</div>;
            } else {
                var n = Math.ceil((ed - timestamp) / 86400);
                return <div className="icon icon-start">剩余{n}天</div>;
            }

        } else if (st > timestamp) {
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

    return (<div className="list" onClick={() => { window.location.href = "#/details/" + props.data.activityId; }}  >
        <i></i>
        <h1>{dt.name}</h1>
        {getSubTitle()}
        <span className="time-text">{moment(st * 1000).format('YYYY-MM-DD')}~{moment(ed * 1000).format('YYYY-MM-DD')}</span>
        {getRightTime()}
    </div>);
    //}

}

interface HomePageState {
    data?: any[],
    type: number,
    currState?: number,
    toolToggle: boolean
}


class HomePage extends React.Component<any, HomePageState>{

    constructor(props: any) {
        super(props);
        this.state = {
            type: 0,
            toolToggle: false
        };
    }

    getData(type: number, status?: number) {
        this.setState({
            type: type,
            currState: status,
            data: []
        });
        PromotionApis.getPromotionList({ storeId: 1, type, status: status != undefined ? status : 1 }).then(data => {
            //fillData(data, type);
            this.setState({
                data: data
            });
        });
    }

    componentWillMount() {
        this.getData(1, 1);
    }

    render() {


        const marketItemList = () => {

            if (this.state.data && this.state.data.length > 0) {
                let res: any[] = [];

                this.state.data.forEach(p => {
                    res.push(<MarketItem key={p.activityId} data={p} type={this.state.type || 0} ></MarketItem>)
                });

                return (<div>{res}</div>);
            } else {
                return (<div className="no-img"><div className="img"></div><span>暂无活动信息</span></div>);
            }

        }

        const ToolbarItem = (props: { value: number, name: string }) => {
            return (<div className={classNames("btn", { "active": this.state.currState === props.value })} onClick={() => this.getData(this.state.type, props.value)}>{props.name}</div>);
        }

        const HeadUlLi = (props: { value: number, name: string }) => {
            return (<li className={classNames({ "active": this.state.type === props.value })} onClick={() => this.getData(props.value, this.state.currState)}>
                <span  >{props.name}</span>
                <div className="line"></div>
            </li>);
        }

        return (<div className="wrap" data-page='home' >
            <div className="headbar">
                <ul className="head-ul">
                    <HeadUlLi value={1} name={"满减"} />
                    <HeadUlLi value={3} name={"返券"} />
                    <HeadUlLi value={5} name={"红包"} />
                    <HeadUlLi value={2} name={"折扣"} />
                    <HeadUlLi value={4} name={"赠品"} />
                </ul>
                <div className={classNames("toolbtn", { "bom": this.state.toolToggle })} onClick={() => this.setState({
                    toolToggle: !this.state.toolToggle
                })}><i></i></div>
            </div>
            <div className={classNames("toolbar", { "hide": this.state.toolToggle })} >
                <ToolbarItem value={1} name={"进行中"} />
                <ToolbarItem value={4} name={"预结束"} />
                <ToolbarItem value={3} name={"预开始"} />
                <ToolbarItem value={0} name={"未开始"} />
            </div>
            <div className="contain">
                {marketItemList()}
            </div>
        </div >);
    }


}

export default HomePage;