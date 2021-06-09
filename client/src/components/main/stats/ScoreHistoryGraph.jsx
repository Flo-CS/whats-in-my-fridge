import dayjs from "dayjs";
import propTypes from "prop-types";
import React from "react";
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {scoreToScoreGrade} from "../../../helpers/product";

export default function ScoreHistoryGraph({data, isGrade = false}) {

    return <ResponsiveContainer>
        <BarChart width={600} height={300} data={data} margin={{top: 10, right: 20, bottom: 10, left: 10}}>

            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="date" tickFormatter={(date) => dayjs(date).format("DD/MM/YY")}
                   style={{fontSize: "0.7rem"}}/>
            <YAxis width={30} style={{fontSize: "0.7rem"}}
                   tickFormatter={(score) => isGrade ? scoreToScoreGrade(score) : score}
                   type="number" domain={['dataMin', 'dataMax']}
                   allowDataOverflow={true}
                   allowDecimals={false}
                   interval={0}
            />
            <Tooltip labelFormatter={(date => dayjs(date).format("DD/MM/YY hh:mm"))}
                     formatter={(value) => `${Math.round(value * 10) / 10}`}/>
            <Bar dataKey="average" fill="#8884d8" connectNulls={false}/>

        </BarChart>
    </ResponsiveContainer>;
}

ScoreHistoryGraph.propTypes = {
    data: propTypes.array.isRequired,
    isGrade: propTypes.bool
};