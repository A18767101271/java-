import React from 'react';
import classNames from 'classnames';
import './AppHeader.scss';
import UParams from '../../../assets/libs/uparams';

let params = UParams();
const shopId = parseInt(params.shopid);

export interface AppHeaderProps {
    title?: string;
    className?: string;
    addUrl?: string;
    cardId?: number;
    addIsShow?: boolean;
    editIsShow?: boolean;
}

export default class AppHeader extends React.Component<AppHeaderProps> {


    render() {
        return (<div className={classNames("app-header", this.props.className)}>
            <div className="app-header-left">
                <a href="javascript:;" className={"back-btn"} onClick={() => { window.history.length && window.history.go(-1); }}></a>
                {this.props.addIsShow ? <a href="javascript:;" className={"add-btn"} onClick={() => { window.location.href = '#/' + this.props.addUrl + '?shopid=' + shopId }}></a> : undefined}
                {this.props.editIsShow ? <a href="javascript:;" className={"edit-btn"} onClick={() => { window.location.href = '#/editconfig?cardid=' + this.props.cardId + '?shopid=' + shopId }}>编辑</a> : undefined}
            </div>
            <div className="app-header-title">{this.props.title}</div>
            <div className="app-header-menu"></div>
        </div>);
    }

}