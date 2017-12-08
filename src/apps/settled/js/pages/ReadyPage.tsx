import React from 'react';


import '../../sass/HomePage.scss';




export default class ReadyPage extends React.Component<{}> {

    render() {

        return (<div className="wrap" data-page='ready'   >
            <header>请准备好以下资料，准备入驻</header>
            <section className="section">
                <div className="title"><i></i><span>所需证件</span></div>
                <div className="info clearfix">
                    <div className="left fl">
                        <div className="hang"><i>1</i><h1>身份证照</h1></div>
                        <p>证件正面、反面照，照片须清晰可辨认。</p>
                    </div>
                    <div className="right fr">
                        <div className="p-sf"></div>
                    </div>
                </div>
                <div className="info clearfix">
                    <div className="left fl">
                        <div className="hang"><i>2</i><h1>营业执照</h1></div>
                        <p>正面拍摄证件，照片须清晰可辨认。</p>
                    </div>
                    <div className="right fr">
                        <div className="p-yy"></div>
                    </div>
                </div>
                <div className="title"><i></i><span>商铺照</span></div>
                <div className="info clearfix">
                    <div className="left fl">
                        <div className="hang"><i>1</i><h1>店面门脸照</h1></div>
                        <p>店面招牌和店面大门真实拍摄。</p>
                    </div>
                    <div className="right fr">
                        <div className="p-dm"></div>
                    </div>
                </div>
            </section>
            <a href="#/shopintro">我准备好了</a></div>);

    }

}