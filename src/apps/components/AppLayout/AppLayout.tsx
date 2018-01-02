import React from 'react';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import AppContent from './AppContent';
import classNames from 'classNames';


class AppLayout extends React.Component<{ className?: string }>{

    static Header = AppHeader;
    static Footer = AppFooter;
    static Content = AppContent;

    render() {
        return (<div className={classNames(this.props.className)}>{this.props.children}</div>);
    }
}


export default AppLayout;