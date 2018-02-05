import React from 'react';
import classNames from 'classnames';
import ActivityIcon, { BaseProps } from './ActivityIcon';
import './ActivityLine.scss';

interface ActivityLineProps extends BaseProps {
    title?: string;
    className?: string;
}
function ActivityLine(props: ActivityLineProps) {
    return <div className={classNames('activity-line', props.className)}  ><ActivityIcon className={''} {...props} /><span className='activity-title'>{props.title}</span></div>
}

export default ActivityLine;