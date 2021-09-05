import React from 'react';
import PropTypes from 'prop-types';
import HistoryChart from "../../../components/data display/HistoryChart";
import dayjs from "dayjs";
import {values} from "lodash";
import {LETTER_SCORES_COLORS} from "../../../helpers/constants";

import "./ScoreAverageHistoryChart.scss"

LetterScoreAverageHistoryChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
};

function LetterScoreAverageHistoryChart({data}) {
    const letterScoreConversions = {
        5: "E",
        4: "D",
        3: "C",
        2: "B",
        1: "A"
    };
    return <div className="score-average-history-chart">
        <HistoryChart data={data}
                      tooltipFormatter={(value) => [Math.round(value * 10) / 10, "Note moyenne"]}
                      dateFormatter={(date) => dayjs(date).format("DD/MM")}
                      valueFormatter={(value) => letterScoreConversions[value]}
                      valueTicks={[1, 2, 3, 4, 5]}
                      valueTicksColors={values(LETTER_SCORES_COLORS)}
                      reversed={true}
        />
    </div>

}

export default LetterScoreAverageHistoryChart;