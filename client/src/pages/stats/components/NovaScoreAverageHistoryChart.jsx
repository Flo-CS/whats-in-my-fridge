import React from 'react';
import dayjs from "dayjs";
import {NOVA_COLORS} from "../../../helpers/constants";
import HistoryChart from "../../../components/data display/HistoryChart";
import PropTypes from "prop-types";
import {values} from "lodash";

import "./ScoreAverageHistoryChart.scss"

NovaScoreAverageHistoryChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
};

function NovaScoreAverageHistoryChart({data}) {
    return <div className="score-average-history-chart">
        <HistoryChart data={data}
                      dateFormatter={(date) => dayjs(date).format("DD/MM")}
                      tooltipFormatter={(value) => [Math.round(value * 10) / 10, "Note moyenne"]}
                      valueTicks={[1, 2, 3, 4]}
                      valueTicksColors={values(NOVA_COLORS)}
                      reversed={true}/>
    </div>
}

export default NovaScoreAverageHistoryChart;