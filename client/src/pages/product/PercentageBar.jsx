import {round} from "lodash";
import PropTypes from 'prop-types';
import React from 'react';

import "./PercentageBar.scss";

PercentageBar.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
        unit: PropTypes.string,
    })),
    otherUnit: PropTypes.string,
    maxValue: PropTypes.number.isRequired
};

PercentageBar.defaultProps = {
    maxValue: 100
};

function PercentageBar({items, otherUnit, maxValue}) {

    const valuesSum = items.reduce((sum, item) => sum + item.value, 0);
    const otherValue = round(maxValue - valuesSum, 2);

    return (
        <div className="percentage-bar">
            <div className="percentage-bar__legend">
                {items.map((item) => {
                    return <p key={item.name} className="percentage-bar__legend-item">
                        <span className="percentage-bar__legend-item-color" style={{backgroundColor: item.color}}/>
                        <span className="percentage-bar__legend-item--strong">
                            {item.value}{item.unit || ""}
                        </span> {item.name}
                    </p>;
                })}
                <p className="percentage-bar__legend-item">
                    <span className="percentage-bar__legend-item-color"/>
                    <span className="percentage-bar__legend-item--strong">
                            {otherValue}{otherUnit || ""}
                        </span> Autre
                </p>
            </div>
            <div className="percentage-bar__bars">
                {items.map((item) => {
                    const percentageValue = item.value;
                    return <div key={item.name} className="percentage-bar__bar"
                                style={{backgroundColor: item.color, width: `${percentageValue}%`}}>
                    </div>;
                })}
                <div className="percentage-bar__bar" style={{width: `${otherValue}%`}}/>
            </div>
            <div className="percentage-bar__values">
                {items.map((item) => {
                    const percentageValue = item.value;
                    return <p key={item.name} className="percentage-bar__value"
                              style={{"width": `${percentageValue}%`}}>{`${percentageValue}%`}</p>;

                })}
                <p className="percentage-bar__value" style={{"width": `${otherValue}%`}}>{`${otherValue}%`}</p>
            </div>
        </div>
    );
}

export default PercentageBar;