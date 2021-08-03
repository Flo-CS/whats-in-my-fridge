import classNames from "classnames";
import PropTypes from 'prop-types';
import React from 'react';

import "./InputGroup.scss";


InputGroup.propTypes = {
    isCollapsed: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element])
};

InputGroup.defaultProps = {
    isCollapsed: false,
};

function InputGroup({isCollapsed, children}) {
    const className = classNames("input-group",
        {"input-group--collapsed": isCollapsed});

    return (
        <div className={className}>
            {children}
        </div>
    );
}

export default InputGroup;