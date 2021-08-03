import classNames from "classnames";
import {find} from "lodash";
import PropTypes from 'prop-types';
import React, {createRef, useState} from 'react';
import {ReactComponent as ChevronDownIcon} from "../../assets/icons/chevron-down.svg";
import useOnClickOutside from "../../hooks/useOnClickOutside";


import "./Dropdown.scss";

Dropdown.propTypes = {
    onOptionChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectedOption: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

function Dropdown({onOptionChange, options, selectedOption, title}) {
    const [isOpen, setIsOpen] = useState(false);

    const selectRef = createRef();
    useOnClickOutside(selectRef, () => setIsOpen(false));


    function handleOptionClick(selectedOption) {
        setIsOpen(false);
        onOptionChange(selectedOption);
    }

    function toggleOptionsMenu() {
        setIsOpen(isOpen => !isOpen);
    }

    const selectedOptionName = find(options, {key: selectedOption})?.name?.toLowerCase();

    return (
        <div className="dropdown" ref={selectRef}>
            <button className="dropdown__button" onClick={toggleOptionsMenu}>
                <span> {title} <strong className="dropdown__button-important-text">{selectedOptionName}</strong></span>
                <ChevronDownIcon className="dropdown__button-icon"/>
            </button>
            {isOpen &&
            <div className="dropdown__options-menu">
                {options.map(option => {
                    const optionClassName = classNames("dropdown__option",
                        {"dropdown__option--selected": option.key === selectedOption});

                    return <button className={optionClassName}
                                   key={option.key}
                                   onClick={() => handleOptionClick(option.key)}
                                   disabled={option.disabled}>
                        {option.name}
                    </button>;
                })}
            </div>
            }

        </div>
    );
}

export default Dropdown;