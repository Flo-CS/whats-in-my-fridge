import React from 'react';
import PropTypes from 'prop-types';

import "./StatsPageField.scss"

StatsPageField.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string
};

function StatsPageField({children, title}) {
    return (<div className="stats-page-field">
            <h2 className="stats-page-field__title">{title}</h2>
            <div className="stats-page-field__content">
                {children}
            </div>
        </div>
    );
}

export default StatsPageField;