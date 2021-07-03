import React from "react"
import PropTypes from "prop-types"
import {flatten} from "lodash"
import Color from "color"

import "./GradesScoresHeatmap.scss"

export default function GradesScoresHeatmap({xLabels, yLabels, data}) {

    const accentColor = "#80b918"


    function mapValueToRange(value, outMin, outMax) {
        const flattenData = flatten(data)
        const biggestValue = Math.max(...flattenData)
        const lowestValue = Math.min(...flattenData)

        return (value - lowestValue) / (biggestValue - lowestValue) * (outMax - outMin) + outMin;

    }

    return <div className="grades-scores-heatmap">
        <table className="grades-scores-heatmap__table">
            <tbody>
            <tr>
                <td/>
                {xLabels.map((label) => <td className="grades-scores-heatmap__label" key={label}>{label}</td>)}
            </tr>
            {
                data.map((row, i) => {
                    return <tr key={i}>
                        <td className="grades-scores-heatmap__label">{yLabels[i]}</td>
                        {row.map((value, j) => {

                                const bgColor = Color(accentColor).fade(mapValueToRange(value, 0.9, 0))

                                return <td key={j} style={{backgroundColor: bgColor}}>{value} </td>
                            }
                        )}
                    </tr>
                })
            }
            </tbody>
        </table>
    </div>
}

GradesScoresHeatmap.propTypes = {
    xLabels: PropTypes.arrayOf(PropTypes.string),
    yLabels: PropTypes.arrayOf(PropTypes.string),
    data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
}