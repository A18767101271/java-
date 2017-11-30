import React from 'react';
import Router from './Router';
import FastClick from 'fastclick';
import './sass/App.scss';

import { NavLink, HashRouter } from 'react-router-dom';

FastClick.attach(window.document.body);

interface AppState {
    tab: 0;
}

class App extends React.Component<{}, AppState>{

    constructor(props: {}) {
        super(props);
    }

    render() {

        return (
            <HashRouter>
                <div>
                    <div className="head">
                        <ul className="navbar-nav">
                            <li><NavLink to="/page1">经营统计</NavLink></li>
                            <li><NavLink to="/page2">支付总览</NavLink></li>
                            <li><NavLink to="/page3">销量状况</NavLink></li>
                        </ul>
                    </div>
                    <div>
                        <Router />
                    </div>
                </div>
            </HashRouter>
        )

    }
}

export default App;