import classNames from "classnames";
import {find} from "lodash";
import PropTypes from 'prop-types';
import React, {createRef, useState} from 'react';
import {ReactComponent as ArrowDownIcon} from "../../assets/icons/arrow-down.svg";
import {ReactComponent as ArrowUpIcon} from "../../assets/icons/arrow-up.svg";
import {ReactComponent as ChevronDownIcon} from "../../assets/icons/chevron-down.svg";
import useOnClickOutside from "../../hooks/useOnClickOutside";


import "./SortControl.scss";

SortControl.propTypes = {
    onOptionChange: PropTypes.func.isRequired,
    onDirectionChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    direction: PropTypes.string,
    selectedOption: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

function SortControl({onOptionChange, onDirectionChange, options, selectedOption, direction, title}) {
    const [isOpen, setIsOpen] = useState(false);

    const selectRef = createRef();
    useOnClickOutside(selectRef, () => setIsOpen(false));


    function handleOptionClick(selectedOption) {
        setIsOpen(false);
        onOptionChange(selectedOption);
    }

    function handleDirectionButtonClick() {
        onDirectionChange();
    }

    function toggleOptionsMenu() {
        setIsOpen(isOpen => !isOpen);
    }

    const selectedOptionName = find(options, {key: selectedOption})?.name?.toLowerCase();

    return (
        <div className="sort-control" ref={selectRef}>
            <div className="sort-control__dropdown">
                <button className="sort-control__dropdown-button" onClick={toggleOptionsMenu}>
                    <span>{title} <strong className="sort-control__dropdown-button-strong">{selectedOptionName}</strong></span>
                    <ChevronDownIcon className="sort-control__dropdown-button-icon"/>
                </button>
                {isOpen &&
                <div className="sort-control__dropdown-options">
                    {options.map(option => {
                        const optionClassName = classNames("sort-control__dropdown-option",
                            {"sort-control__dropdown-option--selected": option.key === selectedOption});

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
            <button className="sort-control__direction-button" onClick={handleDirectionButtonClick}>
                {direction === "asc" ? <ArrowDownIcon/> : <ArrowUpIcon/>}
            </button>
        </div>
    );
}

export default SortControl;