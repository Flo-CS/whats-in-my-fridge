import PropTypes from "prop-types";
import React from "react";
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {ELEMENT_COLORS, FONT_COLORS, FONT_SIZES} from "../../helpers/constants";

import "./HistoryAreaChart.scss";

HistoryAreaChart.propTypes = {
    data: PropTypes.array.isRequired,
    syncId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    valueFormatter: PropTypes.func,
    dateFormatter: PropTypes.func,
    tooltipFormatter: PropTypes.func,
    valueTicks: PropTypes.arrayOf(PropTypes.number),
    valueTicksColors: PropTypes.arrayOf(PropTypes.string),
    valueKey: PropTypes.string,
    dateKey: PropTypes.string,

};

HistoryAreaChart.defaultProps = {
    valueKey: "value",
    dateKey: "date"
}

export default function HistoryAreaChart({
                                             data,
                                             syncId,
                                             valueFormatter,
                                             dateFormatter,
                                             tooltipFormatter,
                                             valueTicks,
                                             valueTicksColors,
                                             valueKey,
                                             dateKey
                                         }) {


    return <div className="history-area-chart">
        <ResponsiveContainer>
            <AreaChart reversed={true} data={data} syncId={syncId ? `history-area-chart-${syncId}` : null}>
                <defs>
                    <linearGradient id="area-color" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="5%" stopColor={ELEMENT_COLORS.PRIMARY} stopOpacity={0.1}/>
                        <stop offset="95%" stopColor={ELEMENT_COLORS.PRIMARY} stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="line-color" x1="0%" y1="100%" x2="0%" y2="0%" gradientUnits="userSpaceOnUse">
                        {valueTicksColors.map((color, index) => {
                            return <stop key={index} offset={`${100 / valueTicksColors.length * (index + 1)}%`}
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
                       tick={<CustomValuesAxisTick ticksColors={valueTicksColors}/>}

                />
                <Tooltip labelFormatter={dateFormatter}
                         formatter={tooltipFormatter}
                         isAnimationActive={false}/>
                <Area
                    type="monotone" dataKey={valueKey}
                    fill="url(#area-color)"
                    stroke="url(#line-color)"
                    strokeWidth={2}
                    fillOpacity={1}
                    activeDot={{stroke: "white", strokeWidth: 2, r: 8}}
                    isAnimationActive={false}/>
            </AreaChart>
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

