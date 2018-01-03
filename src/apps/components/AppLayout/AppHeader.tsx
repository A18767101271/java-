import React from 'react';
import classNames from 'classNames';
import './AppHeader.scss';
import UParams from '../../../assets/libs/uparams';

let params = UParams();
const shopId = parseInt(params.shopid);

export interface AppHeaderProps {
    title?: string;
    className1?: string;
    className2?: string;
}

export default class AppHeader extends React.Component<AppHeaderProps> {

    render() {
        return (<div className="app-header">
            <div className="app-header-left">
                <a href="javascript:;" className={classNames("back-btn", this.props.className1)} onClick={() => { window.history.length && window.history.go(-1); }}></a>
                <a href="javascript:;" className={classNames("add-btn", this.props.className2)} onClick={() => { window.location.href = '#/add?shopid=' + shopId }}></a>
            </div>
            <div className="app-header-title">{this.props.title}</div>
            <div className="app-header-menu"></div>
        </div>);
    }

}