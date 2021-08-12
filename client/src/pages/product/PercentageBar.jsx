import {orderBy, round} from "lodash";
import PropTypes from 'prop-types';
import React from 'react';
import {mapValueToRange} from "../../helpers/miscellaneous";

import "./PercentageBar.scss";

PercentageBar.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
    })),
    unit: PropTypes.string,
    max: PropTypes.number.isRequired
};

PercentageBar.defaultProps = {
    max: 100
};

function PercentageBar({items, unit, max}) {

    const sortedItems = orderBy(items, "value", "desc");

    const itemsValuesSum = items.reduce((sum, item) => sum + item.value, 0);

    const otherValue = round(max - itemsValuesSum, 3);
    const otherValueInPercent = round(mapValueToRange(otherValue, 0, max, 0, 100), 1);

    const isNeededToAddOtherValue = max - itemsValuesSum > 0;

    return (
        <div className="percentage-bar">
            <div className="percentage-bar__legend">
                {sortedItems.map((item) => <PercentageBarLegendItem key={item.name} name={item.name} value={item.value}
                                                                    unit={unit}
                                                                    color={item.color}/>)}
                {isNeededToAddOtherValue && <PercentageBarLegendItem name="Autre" value={otherValue} unit={unit}/>}
            </div>
            <div className="percentage-bar__bars">
                {sortedItems.map((item) => {
                    const valueInPercent = round(mapValueToRange(item.value, 0, max, 0, 100), 1);

                    return <PercentageBarBar key={item.name} percentage={valueInPercent} color={item.color}/>;
                })}
                {isNeededToAddOtherValue && <PercentageBarBar percentage={otherValueInPercent}/>}
            </div>
            <div className="percentage-bar__values">
                {sortedItems.map((item) => {
                    const valueInPercent = round(mapValueToRange(item.value, 0, max, 0, 100), 1);

                    return <PercentageBarValue key={item.name} percentage={valueInPercent}/>;

                })}
                {isNeededToAddOtherValue && <PercentageBarValue percentage={otherValueInPercent}/>}
            </div>
        </div>
    );
}

PercentageBarLegendItem.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    unit: PropTypes.string,
    color: PropTypes.string
};

function PercentageBarLegendItem({name, value, unit, color}) {
    return <p key={name} className="percentage-bar__legend-item">
        <span className="percentage-bar__legend-item-color" style={{backgroundColor: color}}/>
        <span className="percentage-bar__legend-item--strong">{value} {unit || ""}</span> {name}
    </p>;
}

PercentageBarBar.propTypes = {
    percentage: PropTypes.number.isRequired,
    color: PropTypes.string
};

function PercentageBarBar({color, percentage}) {
    if (percentage <= 0) return null;
    return <div className="percentage-bar__bar"
                style={{backgroundColor: color, width: `${percentage}%`}}>
    </div>;

}

PercentageBarValue.propTypes = {
    percentage: PropTypes.number.isRequired,
};

function PercentageBarValue({percentage}) {
    if (percentage <= 0) return null;
    return <p className="percentage-bar__value"
              style={{"width": `${percentage}%`}}>{`${percentage}%`}</p>;

}


export default PercentageBar;

