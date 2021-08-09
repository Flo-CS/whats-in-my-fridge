import classNames from "classnames";
import PropTypes from "prop-types";
import React from 'react';

import "./Chip.scss";

// TODO: Refactor code for the chip parts (don't use BEM modifier but instead, use BEM element, to separate chip text part and chip icon part)
Chip.propTypes = {
    children: PropTypes.node.isRequired
};

function Chip({children}) {
    return (
        <div className="chip">
            {children}
        </div>
    );
}

ChipTextPart.propTypes = {
    text: PropTypes.string,
    variant: PropTypes.oneOf(["primary", "secondary", "warning"])
};

function ChipTextPart({text, variant}) {
    const chipPartClass = classNames("chip__part", {[`chip__part--${variant}`]: variant});
    return <div className={chipPartClass}>
        <p className="chip__text">{text}</p>
    </div>;
}

ChipIconPart.propTypes = {
    Icon: PropTypes.elementType.isRequired,
    isFull: PropTypes.bool,
    onClick: PropTypes.func,
    variant: PropTypes.oneOf(["primary", "secondary", "warning"])
};

function ChipIconPart({Icon, isFull, onClick, variant}) {
    const isClickable = !!onClick;

    const chipPartClass = classNames("chip__part",
        "chip__part--with-icon", {
            [`chip__part--${variant}`]: variant,
            "chip__part--full": isFull,
            "chip__part--clickable": isClickable
        });

    return <div className={chipPartClass}>
        {isClickable ?
            <button onClick={onClick} className="chip__button">
                <Icon className="chip__icon"/>
            </button> :
            <Icon className="chip__icon"/>}
    </div>;
}


Chip.TextPart = ChipTextPart;
Chip.IconPart = ChipIconPart;

export default Chip;