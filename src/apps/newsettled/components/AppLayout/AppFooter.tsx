import React from 'react';
import classNames from 'classnames';
import './AppFooter.scss';


export interface AppFooterProps {
    currentTab: "profile" | "home";
    className?: string;
}

export default class AppFooter extends React.Component<AppFooterProps, {}>{
    render() {
        const currentTab = this.props.currentTab;

        const gotab = (tabName: string, url: string) => {
            if (currentTab == tabName) {
                return;
            } else {
                window.location.replace(url);
            }
        }

        return (
            <div className="app-footer">
                <a href='javascript:;' onClick={() => gotab("home", "../platform/")} className={classNames("app-footer-tab a-1", this.props.className, { "active": this.props.currentTab == "home" })}>
                    <span className="tab-text">
                        商家列表
            </span></a>

                <a href='javascript:;' onClick={() => gotab("profile", "../personal/")} className={classNames("app-footer-tab a-2", this.props.className, { "active": this.props.currentTab == "profile" })}>
                    <span className="tab-text">
                        个人中心
            </span></a>
            </div >
        );
    }
}

