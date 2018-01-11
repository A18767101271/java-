import React from 'react';
import classNames from 'classNames';
import './AppHeader.scss';
//import UParams from '../../../../assets/libs/uparams';

export interface AppHeaderProps {
    title?: string;
    className?: string;
}

export default class AppHeader extends React.Component<AppHeaderProps> {

    render() {
        return (<div className={classNames("app-header", this.props.className)}>
            <div className="app-header-left">
                <a href="javascript:;" className={"back-btn"} onClick={() => { window.history.length && window.history.go(-1); }}></a>
            </div>
            <div className="app-header-title">{this.props.title}</div>
            <div className="app-header-menu"></div>
        </div>);
    }

}