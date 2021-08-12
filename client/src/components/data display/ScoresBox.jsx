import PropTypes from 'prop-types';
import React from 'react';

import "./ScoresBox.scss";

ScoresBox.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        color: PropTypes.string,
    })).isRequired
};

function ScoresBox({items}) {
    return (
        <div className="scores-box">
            {items.map((item, i) => {
                const isLastIteration = items.length - 1 === i;
                return <React.Fragment key={item.name}>
                    <div className="scores-box__score">
                        <p className="scores-box__value"
                           style={{color: item.color}}>
                            {item.value}
                        </p>
                        <p className="scores-box__label">{item.name}</p>
                    </div>
                    {!isLastIteration && <div className="scores-box__separation"/>}
                </React.Fragment>;
            })}
        </div>
    );
}

export default ScoresBox;