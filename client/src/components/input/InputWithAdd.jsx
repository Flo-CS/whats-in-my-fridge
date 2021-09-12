import React from 'react';
import PropTypes from 'prop-types';

import "./InputWithAdd.scss"
import {ReactComponent as PlusIcon} from "../../assets/icons/plus.svg";

InputWithAdd.propTypes = {
    onAddButtonClick: PropTypes.func.isRequired,
    onInputChange: PropTypes.func,
    inputValue: PropTypes.string.isRequired,
    inputPlaceholder: PropTypes.string,
    disabled: PropTypes.bool,
    type: PropTypes.string
};

function InputWithAdd({onAddButtonClick, onInputChange, inputValue, inputPlaceholder, disabled, type}) {
    return (
        <div className="input-with-add">
            <input type={type} className="input-with-add__input"
                   onKeyUp={(event) => event.key === "Enter" && onAddButtonClick()}
                   onChange={(event) => onInputChange && onInputChange(event.target.value)}
                   value={inputValue}
                   placeholder={inputPlaceholder}
                   disabled={disabled}/>
            <button className="input-with-add__add-button" onClick={onAddButtonClick}>
                <PlusIcon className="product-card__add-button-icon"/>
            </button>
        </div>
    );
}

export default InputWithAdd;