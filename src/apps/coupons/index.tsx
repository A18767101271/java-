import React from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'antd-mobile';
import App from './App';
import bridge from '@jx/sardine-bridge';

import UParams from '../../assets/libs/uparams';

let params = UParams();
const shopId = parseInt(params.shopid);


bridge.config({ appKey: "9kyty1wjtqvhc8gyl0i5ipkc" });

if (isNaN(shopId) || shopId < 1) {
    Modal.alert('提示', '参数shopid无效', []);
}
else {
    ReactDOM.render(<App storeId={shopId} />, document.getElementById('app'));
}



