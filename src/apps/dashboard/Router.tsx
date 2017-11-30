import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';


import BusinessPage from './pages/BusinessPage';
import PayPage from './pages/PayPage';
import SalePage from './pages/SalePage';

class Router extends React.Component<{}>{


    render() {
        return (
            <Switch>
                <Route path='/page1' component={BusinessPage} />
                <Route path='/page2' component={PayPage} />
                <Route path='/page3' component={SalePage} />
                <Redirect path='/' to='/page1' />
            </Switch>
        );

    }
}

export default Router;