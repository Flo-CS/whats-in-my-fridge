import dayjs from "dayjs";
import propTypes from "prop-types";
import React from "react";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,} from "recharts";
import {ACCENT_COLOR} from "../../helpers/constants";
import {scoreToLetterScore} from "../../helpers/miscellaneous";

import "./ScoreHistoryLineChart.scss";

export default function ScoreHistoryLineChart({data, isNutriscoreOrEcoscore = false}) {

    return <div className="score-history-line-chart">

        <ResponsiveContainer>

            <LineChart data={data} syncId="score-history-line-chart" margin={{top: 10, right: 10, bottom: 10, left: 0}}>

                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="date" tickFormatter={(date) => dayjs(date).format("DD/MM")}
                       style={{fontSize: "0.8rem"}}/>
                <YAxis width={30}
                       style={{fontSize: "0.8rem"}}
                       tickFormatter={(score) => isNutriscoreOrEcoscore ? scoreToLetterScore(score) : score}
                       domain={['dataMin - 0.5', 'dataMax + 0.5']}
                       allowDataOverflow={true}
                       ticks={isNutriscoreOrEcoscore ? [1, 2, 3, 4, 5] : [1, 2, 3, 4]}
                />
                <Tooltip labelFormatter={(date => dayjs(date).format("DD/MM"))}
                         formatter={(value) => Math.round(value * 10) / 10}/>
                <Line dataKey="average" type="monotone" stroke={ACCENT_COLOR} strokeWidth={2} isAnimationActive={false}
                      connectNulls
                      dot={{fill: ACCENT_COLOR, r: 2}}/>

            </LineChart>

        </ResponsiveContainer></div>;
}

ScoreHistoryLineChart.propTypes = {
    data: propTypes.array.isRequired,
    isLetterScore: propTypes.bool
};