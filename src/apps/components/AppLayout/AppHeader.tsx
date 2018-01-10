import React from 'react';
import classNames from 'classNames';
import './AppHeader.scss';
import UParams from '../../../assets/libs/uparams';

let params = UParams();
const shopId = parseInt(params.shopid);

export interface AppHeaderProps {
    title?: string;
    className?: string;
    addIsHide?: boolean;
    addType?: boolean;
}

export default class AppHeader extends React.Component<AppHeaderProps> {

    render() {
        return (<div className={classNames("app-header", this.props.className)}>
            <div className="app-header-left">
                <a href="javascript:;" className={"back-btn"} onClick={() => { window.history.length && window.history.go(-1); }}></a>
                {this.props.addIsHide ? undefined : (this.props.addType ? <a href="javascript:;" className={"add-btn"} onClick={() => { window.location.href = '#/selfcard?shopid=' + shopId }}></a> : <a href="javascript:;" className={"add-btn"} onClick={() => { window.location.href = '#/add?shopid=' + shopId }}></a>)}

            </div>
            <div className="app-header-title">{this.props.title}</div>
            <div className="app-header-menu"></div>
        </div>);
    }

}