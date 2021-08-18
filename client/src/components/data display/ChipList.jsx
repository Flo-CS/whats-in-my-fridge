import PropTypes from 'prop-types';
import React from 'react';
import {isEmpty} from "lodash";

import "./ChipList.scss";

ChipList.propTypes = {
    children: PropTypes.node
};

function ChipList({children}) {
    if (isEmpty(children)) return null
    return (
        <div className="chip-list">
            {children}
        </div>
    );
}

export default ChipList;