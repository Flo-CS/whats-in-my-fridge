import PropTypes from 'prop-types';
import React from 'react';

import "./ChipList.scss";

ChipList.propTypes = {
    children: PropTypes.node
};

function ChipList({children}) {
    return (
        <div className="chip-list">
            {children}
        </div>
    );
}

export default ChipList;