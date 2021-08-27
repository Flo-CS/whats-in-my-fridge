import React from 'react';
import dayjs from "dayjs";
import {NOVA_COLORS} from "../../../helpers/constants";
import HistoryAreaChart from "../../../components/data display/HistoryAreaChart";
import PropTypes from "prop-types";

import "./ScoreAverageHistoryChart.scss"

NovaScoreAverageHistoryChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
};

function NovaScoreAverageHistoryChart({data}) {
    return <div className="score-average-history-chart">
        <HistoryAreaChart data={data}
                          dateFormatter={(date) => dayjs(date).format("DD/MM")}
                          tooltipFormatter={(value) => [Math.round(value * 10) / 10, "Note moyenne"]}
                          valueTicks={[1, 2, 3, 4]}
                          valueTicksColors={Object.values(NOVA_COLORS)}/>
    </div>
}

export default NovaScoreAverageHistoryChart;