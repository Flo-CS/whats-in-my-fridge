import PropTypes from 'prop-types';
import React from 'react';

import "./NumbersBox.scss";


import {ReactComponent as DownIcon} from "../../assets/icons/down.svg";
import {ReactComponent as UpIcon} from "../../assets/icons/up.svg";
import classNames from "classnames";
import {isNil} from "lodash";


NumbersBox.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.number.isRequired,
        name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        oldValue: PropTypes.number
    })).isRequired
};


export default function NumbersBox({items}) {
    return (
        <div className="numbers-box">
            {items.map((item, i) => {
                const isLastIteration = items.length - 1 === i;

                const differenceWithOldValue = item.value - item.oldValue

                const differenceClass = classNames("numbers-box__difference", {
                    "numbers-box__difference--green": differenceWithOldValue > 0,
                    "numbers-box__difference--red": differenceWithOldValue < 0
                })
                return <React.Fragment key={item.name}>
                    <div className="numbers-box__number">
                        <p className="numbers-box__label">{item.name}</p>
                        <div className="numbers-box__values">
                            <p className="numbers-box__value" style={{color: item.color}}>
                                {item.value}
                            </p>
                            {(!isNil(item.oldValue) && differenceWithOldValue !== 0) &&
                            <div className={differenceClass}>
                                {differenceWithOldValue > 0 && <UpIcon className="numbers-box__difference-icon"/>}
                                {differenceWithOldValue < 0 && <DownIcon className="numbers-box__difference-icon"/>}
                                <p className="numbers-box__difference-value">
                                    {differenceWithOldValue > 0 ? "+" : ""}
                                    {differenceWithOldValue}
                                </p>
                            </div>}
                        </div>


                    </div>
                    {!isLastIteration && <div className="numbers-box__separation"/>}
                </React.Fragment>;
            })}
        </div>
    );
}