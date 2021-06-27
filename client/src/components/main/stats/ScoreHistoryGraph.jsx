import dayjs from "dayjs";
import propTypes from "prop-types";
import React from "react";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,} from "recharts";
import {scoreToScoreGrade} from "../../../helpers/product";

import "./ScoreHistoryGraph.scss"

export default function ScoreHistoryGraph({data, isGrade = false, title}) {

    const color = "#80b918"

    return <div className="score-history-graph">
        <p className="score-history-graph__title">
            {title}
        </p>
        <ResponsiveContainer height={200}>

            <LineChart data={data} syncId="score-history-graph" margin={{top: 10, right: 10, bottom: 10}}>

                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="date" tickFormatter={(date) => dayjs(date).format("DD/MM")}
                       style={{fontSize: "0.7rem"}}/>
                <YAxis width={30}
                       style={{fontSize: "0.7rem"}}
                       tickFormatter={(score) => isGrade ? scoreToScoreGrade(score) : score}
                       domain={['dataMin - 0.5', 'dataMax + 0.5']}
                       allowDataOverflow={true}
                       ticks={isGrade ? [1, 2, 3, 4, 5] : [1, 2, 3, 4]}
                />
                <Tooltip labelFormatter={(date => dayjs(date).format("DD/MM"))}
                         formatter={(value) => `${Math.round(value * 10) / 10}`}/>

                <Line dataKey="average" type="monotone" stroke={color} strokeWidth={2} isAnimationActive={false}
                      connectNulls
                      dot={{fill: color, r: 2}}/>

            </LineChart>
        </ResponsiveContainer></div>;
}

ScoreHistoryGraph.propTypes = {
    data: propTypes.array.isRequired,
    isGrade: propTypes.bool,
    title: propTypes.string.isRequired
};