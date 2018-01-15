import React from 'react';
import Router from './Router';
import AMapLoader from '../../assets/libs/amap-boot';
import SardineJSBridge from '../../assets/libs/sardine-bridge';

import FastClick from 'fastclick';
import './sass/App.scss';
import { Toast, Modal } from 'antd-mobile';

import SettledApis, { FormData } from '../../services/settled-apis';
import AccountApis from '../../services/account-apis';

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
    isGoBindPhone: boolean = false;
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

        SettledApis.getFormSingle().then(d => {
            self.setState({
                formData: d
            }, () => {
                Toast.hide();
            });
        }).catch(err => {
            self.setState({
                formData: undefined
            });
            Toast.hide();
            if (err.ret === 'fail.27007') {
                return;
            }
            Modal.alert('提示', err.msg);
        })


    }

    componentWillMount() {
        Toast.loading('加载中', 30);

        AccountApis.getSimpleInfo().then(d => {
            if (!d.phoneConfirmed) {
                let thisurl = window.location.origin + window.location.pathname + window.location.hash;
                let url = 'http://h5.tenv.mttstudio.net/sardine/bindmoblie/#/new?redirect=' + encodeURIComponent(thisurl);
                this.isGoBindPhone = true;
                window.location.replace(url);
            }
        });

        SettledApis.getFormSingle().then(d => {
            this.setState({
                inited: true,
                formData: d
            }, () => {
                if (self.isGoBindPhone)
                    return;
                Toast.hide();
                if (d.baseInfoStatus == 1) {
                    window.location.replace('#/success');
                }
                if (!window.location.hash || window.location.hash.length < 3) {
                    window.location.replace('#/home');
                }
            });
        }).catch(err => {
            Toast.hide();
            if (err.ret === 'fail.27007') {
                this.setState({
                    inited: true,
                }, () => {
                    if (self.isGoBindPhone)
                        return;
                    if (!window.location.hash || window.location.hash.length < 3) {
                        window.location.replace('#/ready');
                    }
                });
                return;
            }
            Modal.alert('提示', err.msg);
        });
        let self = this;

        SardineJSBridge.ready(function () {
            SardineJSBridge.getLocation({
                success: function (data) {
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