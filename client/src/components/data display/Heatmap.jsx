import Color from "color";
import {flatten} from "lodash";
import PropTypes from "prop-types";
import React from "react";
import {mapValueToRange} from "../../helpers/miscellaneous";

import "./Heatmap.scss";
import {ELEMENT_COLORS, FONT_COLORS} from "../../helpers/constants";

Heatmap.propTypes = {
    xLabels: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
    yLabels: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
    xName: PropTypes.string,
    yName: PropTypes.string,
    xLabelsColors: PropTypes.arrayOf(PropTypes.string),
    yLabelsColors: PropTypes.arrayOf(PropTypes.string),
    data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired
};

export default function Heatmap({xLabels, yLabels, xName, yName, xLabelsColors, yLabelsColors, data}) {


    const flattenData = flatten(data);
    const biggestValue = Math.max(...flattenData);
    const lowestValue = Math.min(...flattenData);


    return <div className="heatmap">
        <p className="heatmap__x-name">{xName}</p>
        <p className="heatmap__y-name">{yName}</p>

        <table className="heatmap__table">
            <tbody>
            <tr>
                <td/>
                {xLabels.map((label, index) => {
                    return <td className="heatmap__label"
                               style={{color: xLabelsColors?.[index]}}
                               key={label}>{label}</td>;
                })}
            </tr>
            {data.map((row, i) => {
                return <tr key={i}>
                    <td className="heatmap__label"
                        style={{color: yLabelsColors?.[i]}}>{yLabels[i]}</td>

                    {row.map((value, j) => {
                            const cellBackgroundColor = Color(ELEMENT_COLORS.PRIMARY).fade(mapValueToRange(value, lowestValue, biggestValue, 0.9, 0))
                            const cellTextColor = cellBackgroundColor.isDark() ? FONT_COLORS.WHITE : null

                            const cellStyle = value !== 0 ? {
                                backgroundColor: cellBackgroundColor,
                                color: cellTextColor
                            } : null

                            return <td key={j}
                                       style={cellStyle}>{value} </td>;
                        }
                    )}
                </tr>;
            })}
            </tbody>
        </table>
    </div>;
}

