import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { FormData } from '../../services/settled-apis';

import HomePage from './js/pages/HomePage';
import ReadyPage from './js/pages/ReadyPage';
import QualificationInformationPage from './js/pages/QualificationInformationPage';
import ShopInfomationPage from './js/pages/ShopInfomationPage';
import ShopIntroductionPage from './js/pages/ShopIntroductionPage';
import SuccessPage from './js/pages/SuccessPage';

class Router extends React.Component<{
    onReloadForm: () => void;
    formData?: FormData,
    clientLocation?: {
        lng: number,
        lat: number
    }
}, {}>{


    render() {
        return (<HashRouter>
            <Switch>
                
                <Route path='/ready' component={ReadyPage} />
                <Route path='/qinfo' render={() => <QualificationInformationPage formData={this.props.formData} />} />
                <Route path='/shopinfo' render={() => <ShopInfomationPage formData={this.props.formData} />} />
                <Route path='/shopintro' render={() => <ShopIntroductionPage clientLocation={this.props.clientLocation} formData={this.props.formData} />} />
                <Route path='/success' render={() => <SuccessPage />} />
                <Route path='/home' render={() => <HomePage onReloadForm={() => this.props.onReloadForm()} formData={this.props.formData} />} />

            </Switch>
        </HashRouter>);

    }
}

export default Router;