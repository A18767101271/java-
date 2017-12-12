import React from 'react';
import SardineJSBridge from '../../../../assets/libs/sardine-bridge';
import '../../sass/HomePage.scss';
import Container from '../../../../assets/libs/sardine-bridge/container';

export default class SetActivityPage extends React.Component<{ storeId: number }> {

    render() {
        const shopId = this.props.storeId;
        const ActCreatorItem = (props: { name: string, href: string, title: string, type: string }) => {
            return (<div className="at clearfix">
                <h1 className={props.type}>{props.name}</h1>
                <span>{props.title}</span>
                <a href='javascript:;' onClick={() => {
                    let url = props.href;
                    if (url[0] === '#') {
                        url = window.location.origin + window.location.pathname + url + '?shopid=' + shopId;
                    }
                    if (Container.isJsBridge) {
                        SardineJSBridge.ready(() => {
                            SardineJSBridge.open({ url: url });
                        });
                    } else {
                        window.location.href = url;
                    }
                }}>新建</a>
            </div>);
        }


        return (<div ref='wrap' className="wrap" data-page="setactivity" >
            <ActCreatorItem name="满减活动" type="h-mj" href="#/setmanjian" title="用户订单消费满足指定金额后，可立刻减免设定的金额。" />
            <ActCreatorItem name="返券活动" type="h-fq" href="#/setfanquan" title="设置订单消费金额，用户在完成设定的消费金额后奖励用户一张满减优惠券。" />
            <ActCreatorItem name="红包活动" type="h-hb" href="#/sethongbao" title="商家设置满减券项目条件，加入到用户端的红包活动当中，用户可通过红包活动获取到商家设定的优惠卡券。" />
            <ActCreatorItem name="商品折扣" type="h-zk" href="#/setzhekou" title="商户可在该项目中编辑指定商品的折扣信息（商品打折）进行商品的促销活动。" />
            <ActCreatorItem name="赠品活动" type="h-zp" href="#/setfanwu" title=" 商家设置进行赠送商品的设定，加入到用户端的红包活动中，用户在获得该红包后可和商家进行红包的核销获得该商品。" />
        </div>
        );
    }
};