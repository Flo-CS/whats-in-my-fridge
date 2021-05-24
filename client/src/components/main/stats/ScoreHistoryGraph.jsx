import dayjs from "dayjs";
import propTypes from "prop-types";
import React from "react";
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

export default function ScoreHistoryGraph({data}) {

    return <ResponsiveContainer>
        <BarChart width={600} height={300} data={data} margin={{top: 10, right: 20, bottom: 10, left: 10}}>

            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="date" tickFormatter={(date) => dayjs(date).format("DD/MM/YY")}
                   style={{fontSize: "0.7rem"}}/>
            <YAxis width={30} style={{fontSize: "0.7rem"}}/>
            <Tooltip labelFormatter={(date => dayjs(date).format("DD/MM/YY hh:mm"))}/>
            <Bar dataKey="average" fill="#8884d8"/>

        </BarChart>
    </ResponsiveContainer>;
}

ScoreHistoryGraph.propTypes = {
    data: propTypes.array.isRequired
};