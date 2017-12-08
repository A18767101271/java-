import React from 'react';
import Router from './Router';
import AMapLoader from '../../assets/libs/amap-boot';
import SardineJSBridge from '../../assets/libs/sardine-bridge';

import FastClick from 'fastclick';
import './sass/App.scss';
import { Toast } from 'antd-mobile';

import SettledApis, { FormData } from '../../services/settled-apis';

FastClick.attach(window.document.body);

interface AppProps {
    // initArgs: InitAppArgs;
    // init: (args: InitAppArgs) => {};
}

class App extends React.Component<AppProps, {
    inited: boolean;
    formData?: FormData,
    clientLocation?: {
        lng: number,
        lat: number
    }
}>{

    constructor(props: AppProps) {
        super(props);

        this.state = { inited: false }

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

    onReloadForm() {
        Toast.loading('加载中', 30);
        let self = this;

        self.setState({
            formData: undefined
        }, () => {
            SettledApis.getFormSingle().then(d => {
                self.setState({
                    formData: d
                }, () => {
                    Toast.hide();

                });
            })
        });


    }

    componentWillMount() {
        Toast.loading('加载中', 30);
        SettledApis.getFormSingle().then(d => {
            //console.log(d);
            this.setState({
                inited: true,
                formData: d
            }, () => {
                Toast.hide();
                if (d.baseInfoStatus == 1) {
                    window.location.replace('#/success');
                }
                if (!window.location.hash || window.location.hash.length < 3) {
                    window.location.replace('#/home');
                }
            });
        }).catch(err => {
            if (err.ret === 'fail.27007') {
                this.setState({
                    inited: true,
                }, () => {
                    if (!window.location.hash || window.location.hash.length < 3) {
                        window.location.replace('#/ready');
                    }
                });
                return;
            }
        });
        let self = this;
        SardineJSBridge.ready(function () {
            SardineJSBridge.getLocation({
                complete: function (data) {
                    // console.log(data);
                    // PageExtends.clientLocation = data.longitude + ',' + data.latitude;

                    self.setState({
                        clientLocation: {
                            lng: data.longitude,
                            lat: data.latitude
                        }
                    });

                }
            });
        });
    }

    render() {
        if (this.state.inited) {
            return <Router
                clientLocation={this.state.clientLocation}
                onReloadForm={() => this.onReloadForm()}
                formData={this.state.formData} />;
        }
        else {
            return <div></div>;
        }
    }
}

export default App;