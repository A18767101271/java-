import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';



import HomePage from './js/pages/HomePage.js';
import ReadyPage from './js/pages/ReadyPage.js';
import QualificationInformationPage from './js/pages/QualificationInformationPage.js';
import ShopInfomationPage from './js/pages/ShopInfomationPage.js';
import ShopIntroductionPage from './js/pages/ShopIntroductionPage.js';
import SuccessPage from './js/pages/SuccessPage.js';
import UploadBusinessPage from './js/pages/UploadBusinessPage.js';
import UploadIdCardPage from './js/pages/UploadIdCardPage.js';
import UploadShopImgPage from './js/pages/UploadShopImgPage.js';
import PickTimePage from './js/pages/PickTimePage.js';
import PickAddressPage from './js/pages/PickAddressPage.js';
import ModifyShopInfomationPage from './js/pages/ModifyShopInfomationPage.js';
import ModifyShopIntroductionPage from './js/pages/ModifyShopIntroductionPage.js';
import ModifyQualificationInformationPage from './js/pages/ModifyQualificationInformationPage.js';

interface PageProps {
    page: {
        name: string;
        render: () => void;
    };
}

class Page extends React.Component<PageProps, {}>{

    componentDidMount() {
        this.props.page && this.props.page.render && this.props.page.render();
    }
    componentDidUpdate() {
        (this.refs.wrap as any).innerHTML = '';
        this.props.page && this.props.page.render && this.props.page.render();
    }
    render() {
        return (<div ref='wrap' className="wrap" data-page={this.props.page ? this.props.page.name || '' : ''} ></div>);
    }

}

class Router extends React.Component<{}>{


    render() {

        return (<HashRouter>
            <Switch>
                <Route path='/ready' render={() => <Page page={ReadyPage} />} />
                <Route path='/qinfo' render={() => <Page page={QualificationInformationPage} />} />
                <Route path='/shopinfo' render={() => <Page page={ShopInfomationPage} />} />
                <Route path='/shopintro' render={() => <Page page={ShopIntroductionPage} />} />
                <Route path='/success' render={() => <Page page={SuccessPage} />} />
                <Route path='/upbusin' render={() => <Page page={UploadBusinessPage} />} />
                <Route path='/upcard' render={() => <Page page={UploadIdCardPage} />} />
                <Route path='/upimg' render={() => <Page page={UploadShopImgPage} />} />
                <Route path='/picktime' render={() => <Page page={PickTimePage} />} />
                <Route path='/pickaddress' render={() => <Page page={PickAddressPage} />} />
                <Route path='/modifyshopinfo' render={() => <Page page={ModifyShopInfomationPage} />} />
                <Route path='/modifyshopintro' render={() => <Page page={ModifyShopIntroductionPage} />} />
                <Route path='/modifyqinfo' render={() => <Page page={ModifyQualificationInformationPage} />} />
                <Route path='/' render={() => <Page page={HomePage} />} />
            </Switch>
        </HashRouter>);

    }
}

export default Router;