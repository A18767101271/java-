import React from 'react';
import SardineJSBridge from '../../../../assets/libs/sardine-bridge';
import '../../sass/HomePage.scss';

export default class SetActivityPage extends React.Component<{ storeId: number }> {

    render() {
        const shopId = this.props.storeId;
        const ActCreatorItem = (props: { name: string, href: string }) => {
            return (<div className="at">
                <h1>{props.name}</h1>
                <span>XXXXXX</span>
                <a href='javascript:;' onClick={() => {
                    let url = props.href;
                    if (url[0] === '#') {
                        url = window.location.origin + window.location.pathname + url + '?shopid=' + shopId;
                    } 
                    SardineJSBridge.ready(() => {
                        SardineJSBridge.open({ url: url });
                    });
                }}>新建</a>
            </div>);
        }


        return (<div ref='wrap' className="wrap" data-page="setactivity" >
            <ActCreatorItem name="满减活动" href="#/setmanjian" />
            <ActCreatorItem name="返券活动" href="#/setfanquan" />
            <ActCreatorItem name="红包活动" href="#/sethongbao" />
            <ActCreatorItem name="商品折扣" href="#/setzhekou" />
            <ActCreatorItem name="赠品活动" href="#/setfanwu" />
        </div>
        );
    }
};