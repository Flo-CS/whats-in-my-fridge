import PropTypes from 'prop-types';
import React from 'react';

import "./Switch.scss";

Switch.propTypes = {
    onOptionChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        key: PropTypes.string.isRequired
    })).isRequired,
    selectedOption: PropTypes.string.isRequired,
    label: PropTypes.string
};

function Switch({onOptionChange, selectedOption, options, label}) {

    return (
        <div className="switch">
            <p className="switch__label">{label}</p>
            {options.map(option => {
                return <React.Fragment key={option.key}>
                    <input key={option.key} name="switch-radio"
                           id={`switch-radio-${option.key}`}
                           type="radio"
                           className="switch__radio"
                           value={option.key}
                           onChange={() => onOptionChange(option.key)}
                           checked={selectedOption === option.key}/>
                    <label className="switch__radio-label"
                           htmlFor={`switch-radio-${option.key}`}>{option.name}</label>
                </React.Fragment>;
            })}
        </div>
    );
}

export default Switch;