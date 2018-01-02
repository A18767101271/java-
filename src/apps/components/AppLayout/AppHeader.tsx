import React from 'react';
import classNames from 'classNames';
import './AppHeader.scss';

export interface AppHeaderProps {
    title?: string;
    className?: string;
}

export default class AppHeader extends React.Component<AppHeaderProps> {

    render() {
        return (<div className="app-header">
            <div className="app-header-left">
                <a href="javascript:;" className={classNames("back-btn", this.props.className)} onClick={() => { window.history.length && window.history.go(-1); }}></a>
            </div>
            <div className="app-header-title">{this.props.title}</div>
            <div className="app-header-menu"></div>
        </div>);
    }

}