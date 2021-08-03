import classNames from "classnames";
import PropTypes from 'prop-types';
import React from 'react';

import "./Button.scss";

Button.propTypes = {
    size: PropTypes.oneOf(["small", "medium", "big"]),
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
    shape: PropTypes.oneOf(["square"]),
    variant: PropTypes.oneOf(["primary", "secondary", "tertiary"])
};

Button.defaultProps = {
    size: "medium",
    variant: "secondary"
};

function Button({size, variant, shape, children, ...rest}) {
    const className = classNames("button", `button--${size}`, `button--${shape}`, `button--${variant}`);
    return <button className={className} {...rest}>
        {children}
    </button>;
}

export default Button;