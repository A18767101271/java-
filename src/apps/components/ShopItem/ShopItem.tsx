import React from 'react';
import classNames from 'classNames';
import ActivityLine from '../ActivityLine';
import DistanceLabel from '../DistanceLabel';
import './ShopItem.scss';

export interface ShopItemProps {
    item: {
        shopId: number;
        activities?: {
            activityId: number;
            activityName: string;
            description?: string;
            type?: number;
        }[];
        shopName: string;
        shopLogo?: string;
        description?: string;
        distance?: number;
        personConsumption?: number;
        categoryName?: string;
    };
    clientLocation?: {
        lng: number,
        lat: number
    }
    foods?: {
        foodId: number;
        foodName: string;
        price: number;
        img: string;
    }[]
}


interface ShopItemState {
    activitiesCollapsed: boolean;
}

export default class ShopItem extends React.Component<ShopItemProps, ShopItemState>{
    constructor(props: ShopItemProps) {
        super(props);
        this.state = {
            activitiesCollapsed: false
        };
    }

    render() {

        const activities = this.props.item.activities;
        const foods = this.props.foods;
        const self = this;

        function showFoods() {

            if (foods && foods.length > 0) {
                return (<section className="shop-photos">

                    {foods.map(p => {
                        return (<div key={p.foodId} className="shops">
                            <img src={p.img} className="shops-img" />
                            <div className="shops-h1">{p.foodName}</div>
                            <div className="shops-h2">￥{p.price}</div>
                        </div>);
                    })}


                </section>
                );
            }


        }

        function showActivities() {

            if (activities && activities.length > 0) {

                return (
                    <div>
                        <span className={classNames("dashedline", { 'active': activities.length == 1 })} onClick={e => { e.stopPropagation(); self.setState({ activitiesCollapsed: !self.state.activitiesCollapsed }) }}>{activities.length}个活动
                </span>

                        <section className={classNames("activities", { "active": self.state.activitiesCollapsed })}>

                            <div className="activity-list">
                                {activities.map(p => {
                                    return (
                                        <ActivityLine key={p.activityId} type={p.type} title={p.activityName} />
                                    )
                                })}
                            </div>


                        </section>
                    </div>
                );
            } else {

                return (
                    <div>

                    </div>
                );

            }

        }

        return (
            <div >
                <div className="shop-item clearfix" onClick={() => {
                    let url = '../merchant/#/?id=' + this.props.item.shopId;
                    if (this.props.clientLocation && this.props.clientLocation.lat && this.props.clientLocation.lng) {
                        url += '&location=' + this.props.clientLocation.lng + ',' + this.props.clientLocation.lat
                    }
                    window.location.href = url;
                }}>
                    <div className="shop-info">
                        <div className="logo-container">
                            <div className="logo-main">
                                <img className="logo-logo"
                                    src={this.props.item.shopLogo} />

                            </div>
                        </div>
                        <div className="info-main">
                            <section className="line">
                                <div className="shopname">
                                    {this.props.item.shopName}
                                </div>
                            </section>

                            <section className="line">
                                <div className="moneylimit">
                                    {this.props.item.personConsumption ? <span>¥{this.props.item.personConsumption}/人</span> : undefined}
                                </div>
                                <div className="distance-wrap">
                                    <DistanceLabel distance={this.props.item.distance} />
                                </div>
                            </section>

                            <section className="line">
                                {this.props.item.categoryName ? <div className="icon-wrap">
                                    {this.props.item.categoryName}
                                </div> : undefined}
                            </section>

                            <section className="line">
                                <div className="intro-wrap">
                                    {this.props.item.description}
                                </div>
                            </section>

                        </div>
                    </div>

                    <div className="activity-wrap">

                        {showActivities()}


                        {showFoods()}

                    </div>



                </div>
            </div>

        );
    }
}



