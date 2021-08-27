import React from 'react';
import PropTypes from 'prop-types';
import HistoryAreaChart from "../../../components/data display/HistoryAreaChart";
import dayjs from "dayjs";
import {scoreToLetterScore} from "../../../helpers/miscellaneous";
import {values} from "lodash";
import {LETTER_SCORES_COLORS} from "../../../helpers/constants";

import "./ScoreAverageHistoryChart.scss"

LetterScoreAverageHistoryChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string
};

function LetterScoreAverageHistoryChart({data, title}) {
    return <div className="score-average-history-chart">
        <h2 className="score-average-history-chart__title">{title}</h2>
        <HistoryAreaChart data={data}
                          tooltipFormatter={(value) => [Math.round(value * 10) / 10, title]}
                          dateFormatter={(date) => dayjs(date).format("DD/MM")}
                          valueFormatter={(value) => scoreToLetterScore(value)}
                          valueTicks={[1, 2, 3, 4, 5]}
                          valueTicksColors={values(LETTER_SCORES_COLORS)}

        />
    </div>

}

export default LetterScoreAverageHistoryChart;