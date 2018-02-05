import React from 'react';
import './AppContent.scss';
import classNames from 'classnames';

export default class AppContent extends React.Component<{ className?: string }>{

    render() {

        return (<div className={classNames("app-content", this.props.className)}> {this.props.children} </div>);

    }
} 