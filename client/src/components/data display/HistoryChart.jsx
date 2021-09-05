import PropTypes from "prop-types";
import React from "react";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {ELEMENT_COLORS, FONT_COLORS, FONT_SIZES} from "../../helpers/constants";

import "./HistoryChart.scss";

HistoryChart.propTypes = {
    data: PropTypes.array.isRequired,
    syncId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    valueFormatter: PropTypes.func,
    dateFormatter: PropTypes.func,
    tooltipFormatter: PropTypes.func,
    valueTicks: PropTypes.arrayOf(PropTypes.number),
    valueTicksColors: PropTypes.arrayOf(PropTypes.string),
    valueKey: PropTypes.string,
    dateKey: PropTypes.string,
    reversed: PropTypes.bool

};

HistoryChart.defaultProps = {
    valueKey: "value",
    dateKey: "date"
}

export default function HistoryChart({
                                         data,
                                         syncId,
                                         valueFormatter,
                                         dateFormatter,
                                         tooltipFormatter,
                                         valueTicks,
                                         valueTicksColors,
                                         valueKey,
                                         dateKey,
                                         reversed
                                     }) {

    // The valueTicksColors array is "already reversed by the user", so we reverse it, only if the reversed option is set to false
    const reversedValueTicksColors = !reversed ? valueTicksColors.slice().reverse() : valueTicksColors

    return <div className="history-chart">
        <ResponsiveContainer>
            <LineChart data={data} syncId={syncId ? `history-chart-${syncId}` : null}>
                <defs>
                    <linearGradient id="line-color" x1="0%" y1="0%" x2="0%" y2="100%" gradientUnits="userSpaceOnUse">
                        {reversedValueTicksColors.map((color, index) => {
                            return <stop key={index} offset={`${100 / valueTicksColors.length * index}%`}
                                         stopColor={color}/>
                        })}
                    </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke={ELEMENT_COLORS.SECONDARY}/>

                <XAxis dataKey={dateKey}
                       tickFormatter={dateFormatter}
                       axisLine={false}
                       tickLine={false}
                       tick={{fill: FONT_COLORS.LIGHT_GREY, fontSize: FONT_SIZES.LITTLE}}
                />

                <YAxis dataKey={valueKey}
                       width={30}
                       tickFormatter={valueFormatter}
                       domain={['dataMin', 'dataMax']}
                       ticks={valueTicks}
                       axisLine={false}
                       tickLine={false}
                       reversed={reversed}
                       interval="preserveStartEnd"
                       tick={<CustomValuesAxisTick ticksColors={valueTicksColors}/>}

                />
                <Tooltip labelFormatter={dateFormatter}
                         formatter={tooltipFormatter}
                         isAnimationActive={false}/>
                <Line
                    type="monotone"
                    dataKey={valueKey}
                    stroke="url(#line-color)"
                    strokeWidth={2}
                    dot={{r: 2}}
                    activeDot={{stroke: "white", strokeWidth: 2, r: 8}}
                    isAnimationActive={false}/>
            </LineChart>
        </ResponsiveContainer>
    </div>;
}

/* eslint-disable react/prop-types */

function CustomValuesAxisTick({x, y, ticksColors, tickFormatter, payload, index}) {

    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={5} textAnchor="end" fill={ticksColors?.[index] || FONT_COLORS.LIGHT_GREY}
                  fontSize={FONT_SIZES.MEDIUM} fontWeight={600}>
                {tickFormatter ? tickFormatter(payload.value) : payload.value}
            </text>
        </g>
    );

}

