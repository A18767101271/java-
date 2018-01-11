import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import HomePage from './js/pages/HomePage';
import ShopInfo from './js/pages/ShopInfo';


class Router extends React.Component<{}>{

    render() {
        return (<HashRouter>
            <Switch>

                <Route path='/shopinfo' render={() => <ShopInfo />} />
                <Route path='/home' render={() => <HomePage />} />


            </Switch>
        </HashRouter>);

    }
}

export default Router;