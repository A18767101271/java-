import React from 'react';
import Router from './Router';
import AMapLoader from '../../assets/libs/AMapLoader.js';
import SardineJSBridge from '../../assets/libs/sardine-bridge';
import PageExtends from './js/PageExtends.js';
import FastClick from 'fastclick';
import './sass/App.scss';
import './js/console.log';

FastClick.attach(window.document.body);

interface AppProps {
    // initArgs: InitAppArgs;
    // init: (args: InitAppArgs) => {};
}

class App extends React.Component<AppProps, {}>{

    constructor(props: AppProps) {
        super(props);

        AMapLoader.init({
            key: 'da6e01841845f5535ef161f1c7e0425d',
            plugins: [
                'AMap.ToolBar',
                'AMap.Geocoder',
                'AMap.CitySearch',
            ],
            enableUI: true
        });
    }


    componentWillMount() {
        SardineJSBridge.ready(function () {
            SardineJSBridge.getLocation({
                complete: function (data) {
                    // console.log(data);
                    PageExtends.clientLocation = data.longitude + ',' + data.latitude;
                }
            });
        });
    }

    render() {

        return (

            <Router />

        )

    }
}

export default App;