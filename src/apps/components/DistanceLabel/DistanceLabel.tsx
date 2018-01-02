import React from 'react';
import getLocationDistance from './getLocationDistance';
import classNames from 'classNames';

interface DistanceLabelProps {
    clinetLocation?: { lng: number, lat: number };
    targetLocation?: { lng: number, lat: number };
    distance?: number;
    className?: string;
}
function DistanceLabel(props: DistanceLabelProps) {
    let distance: number | null;
    if (props.clinetLocation && props.targetLocation) {
        distance = getLocationDistance(props.clinetLocation.lat, props.clinetLocation.lng, props.targetLocation.lat, props.targetLocation.lng);
    } else if (props.distance || props.distance === 0) {
        distance = props.distance;
    } else {
        distance = null;
    }
 
    let text = '';
    if (distance && distance > 0) {
        if (distance <= 1000) {
            text = distance.toFixed(0) + 'm';
        } else {
            text = (distance / 1000).toFixed(2) + 'km';
        }
    }

    return <span className={classNames("distance-label", {
        "no-data": !text
    }, props.className)}>{text}</span>
}

export default DistanceLabel;