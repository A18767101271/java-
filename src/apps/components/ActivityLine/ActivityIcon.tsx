import React from 'react';
import classNames from 'classNames';
import './ActivityIcon.scss';


export interface BaseProps {
    iconName?: string;
    iconColor?: string;
    type?: number;
}

export interface ActivityIconProps extends BaseProps {

    className?: string;

}

const DEFAULT_ICON_COLOR = 'ffac2a';
const DEFAULT_ICON_NAME = '惠';

function ActivityIcon(props: ActivityIconProps) {
    let iconColor: string;
    let iconName: string;
    if (props.iconName && props.iconColor) {
        iconColor = props.iconColor;
        iconName = props.iconName[0];
    } else if (props.type && props.type > 0) {
        switch (props.type) {
            case 2: { iconColor = 'f07373'; iconName = '减'; break; }
            default: { iconColor = DEFAULT_ICON_COLOR; iconName = DEFAULT_ICON_NAME; break; }
        }
    } else {
        iconColor = DEFAULT_ICON_COLOR;
        iconName = DEFAULT_ICON_NAME;
    }

    return <span className={classNames("activity-icon-wrap", props.className)}><span className="activity-icon" style={{ backgroundColor: '#' + iconColor }}>
        {iconName}
    </span></span>;
}

export default ActivityIcon;