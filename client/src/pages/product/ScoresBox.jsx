import PropTypes from 'prop-types';
import React from 'react';
import {LETTER_SCORES_COLORS, NOVA_COLORS} from "../../helpers/constants";

import "./ScoresBox.scss";

ScoresBox.propTypes = {
    nutriscore: PropTypes.string,
    ecoscore: PropTypes.string,
    nova: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

function ScoresBox({nutriscore, ecoscore, nova}) {
    return (
        <div className="scores-box">
            <div className="scores-box__score">
                <p className="scores-box__value"
                   style={{color: LETTER_SCORES_COLORS[nutriscore]}}>
                    {nutriscore}
                </p>
                <p className="scores-box__label">Nutriscore</p>
            </div>
            <div className="scores-box__separation"/>
            <div className="scores-box__score">
                <p className="scores-box__value"
                   style={{color: LETTER_SCORES_COLORS[ecoscore]}}>
                    {ecoscore}
                </p>
                <p className="scores-box__label">Ecoscore</p>
            </div>
            <div className="scores-box__separation"/>
            <div className="scores-box__score">
                <p className="scores-box__value"
                   style={{color: NOVA_COLORS[nova]}}>
                    {nova}
                </p>
                <p className="scores-box__label">Nova</p>
            </div>
        </div>
    );
}

export default ScoresBox;