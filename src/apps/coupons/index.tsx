import React from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'antd-mobile';
import App from './App';


import UParams from '../../assets/libs/uparams';

let params = UParams();
const shopId = parseInt(params.shopid);

if (isNaN(shopId) || shopId < 1) {
    Modal.alert('提示', '参数shopid无效', []);
}
else {
    ReactDOM.render(<App storeId={shopId} />, document.getElementById('app'));
}



