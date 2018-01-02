import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import HomePage from './js/pages/HomePage';


class Router extends React.Component<{ storeId: number }>{


    render() {
        return (<HashRouter>
            <Switch>
                <Route path='/' exact render={() => <HomePage storeId={this.props.storeId} />} />
            </Switch>
        </HashRouter>);

    }
}

export default Router;