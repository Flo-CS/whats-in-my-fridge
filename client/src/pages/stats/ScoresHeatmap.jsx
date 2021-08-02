import Color from "color";
import {flatten} from "lodash";
import PropTypes from "prop-types";
import React from "react";
import {mapValueToRange} from "../../helpers/miscellaneous";

import "./ScoresHeatmap.scss";

export default function ScoresHeatmap({xLabels, yLabels, data, accentColor}) {


    const flattenData = flatten(data);
    const biggestValue = Math.max(...flattenData);
    const lowestValue = Math.min(...flattenData);


    return <div className="scores-heatmap">
        <table className="scores-heatmap__table">
            <tbody>
            <tr>
                <td/>
                {xLabels.map((label) => {
                    return <td className="scores-heatmap__label"
                               style={{color: label.color}}
                               key={label.name}>{label.name}</td>;
                })}
            </tr>
            {data.map((row, i) => {
                return <tr key={i}>
                    <td className="scores-heatmap__label"
                        style={{color: yLabels[i].color}}>{yLabels[i].name}</td>

                    {row.map((value, j) => {
                            const cellStyle = {backgroundColor: Color(accentColor).fade(mapValueToRange(value, lowestValue, biggestValue, 0.9, 0))};
                            return <td key={j} style={cellStyle}>{value} </td>;
                        }
                    )}
                </tr>;
            })}
            </tbody>
        </table>
    </div>;
}

ScoresHeatmap.propTypes = {
    xLabels: PropTypes.arrayOf(PropTypes.object),
    yLabels: PropTypes.arrayOf(PropTypes.object),
    data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    accentColor: PropTypes.string.isRequired
};