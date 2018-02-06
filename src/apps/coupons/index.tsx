import React from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'antd-mobile';
import App from './App';
import bridge from '@jx/sardine-bridge';
import { SardineApiClient } from '@jx/sardine-api';

import VConsole from 'vconsole';

import UParams from '../../assets/libs/uparams';

let params = UParams();

new VConsole();

const mchid = parseInt(params.mchid);


bridge.config({ appKey: "9kyty1wjtqvhc8gyl0i5ipkc" });

const apiClient = new SardineApiClient({
    gatewayUrl: "https://tenv.mttstudio.net/web-api/",
    loginUrl: "https://tenv.mttstudio.net/login/",
    appKey: "9kyty1wjtqvhc8gyl0i5ipkc"
});

if (isNaN(mchid) || mchid < 1) {
    Modal.alert('提示', '参数mchid无效', []);
}
else {
    ReactDOM.render(<App mchId={mchid} apiClient={apiClient} />, document.getElementById('app'));
}



