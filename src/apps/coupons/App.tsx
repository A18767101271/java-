import React from 'react';

import { HashRouter, Switch, Route } from 'react-router-dom';
import { SardineApiClient } from '@jx/sardine-api';

import HomePage from './js/pages/HomePage';
import AddPage from './js/pages/AddPage';
import SetPZ from './js/pages/SetPZ';
import SetDJ from './js/pages/SetDJ';
import SetMJ from './js/pages/SetMJ';
import CardDetails from './js/pages/CardDetails';
import ChoosePage from './js/pages/ChoosePage';
import SelfServiceCard from './js/pages/SelfServiceCard';
import SelfCardList from './js/pages/SelfCardList';
import GetConfig from './js/pages/GetConfig';
import EditConfig from './js/pages/EditConfig';

import FastClick from 'fastclick';
import './sass/App.scss';

FastClick.attach(window.document.body);

interface AppProps {
    mchId: number;
    apiClient: SardineApiClient;
}

class App extends React.Component<AppProps>{

    constructor(props: AppProps) {
        super(props);
    }


    render() {
        return <HashRouter>
            <Switch>

                <Route path='/' exact render={() => <HomePage mchId={this.props.mchId} />} />
                <Route path='/add' render={() => <AddPage mchId={this.props.mchId} />} />
                <Route path='/setpz' render={() => <SetPZ mchId={this.props.mchId} apiClient={this.props.apiClient} />} />
                <Route path='/setdj' render={() => <SetDJ mchId={this.props.mchId} />} />
                <Route path='/setmj' render={() => <SetMJ mchId={this.props.mchId} />} />
                <Route path='/details' render={() => <CardDetails mchId={this.props.mchId} />} />
                <Route path='/choose' render={() => <ChoosePage mchId={this.props.mchId} />} />
                <Route path='/selfcard' render={() => <SelfServiceCard mchId={this.props.mchId} />} />
                <Route path='/selfcardlist' render={() => <SelfCardList mchId={this.props.mchId} />} />
                <Route path='/getconfig' render={() => <GetConfig mchId={this.props.mchId} />} />
                <Route path='/editconfig' render={() => <EditConfig mchId={this.props.mchId} />} />


            </Switch>
        </HashRouter>
    }
}

export default App;