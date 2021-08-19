import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import PropTypes from "prop-types";
import React from "react";

import {ReactComponent as ChevronBackIcon} from "../../assets/icons/chevron-back.svg";
import {ReactComponent as ChevronRightIcon} from "../../assets/icons/chevron-right.svg";
import "./DateRangeSlider.scss";

dayjs.extend(utc);

DateRangeSlider.propTypes = {
    onDateRangeChange: PropTypes.func.isRequired,
    startDate: PropTypes.string.isRequired,
    granularity: PropTypes.oneOf(["year", "month", "week", "day"]).isRequired,
};

export default function DateRangeSlider({onDateRangeChange, startDate, granularity}) {
    startDate = dayjs(startDate).startOf(granularity)
    let endDate = startDate.endOf(granularity)


    function handlePreviousDateButtonClick() {
        onDateRangeChange({
            startDate:
                startDate.subtract(1, granularity).startOf(granularity).format(), endDate:
                startDate.endOf(granularity).format()
        })
    }

    function handleNextDateButtonClick() {
        onDateRangeChange({
            startDate:
                startDate.add(1, granularity).startOf(granularity).format(), endDate:
                startDate.endOf(granularity).format()
        })
    }


    return <div className="date-range-slider">
        <button className="date-range-slider__previous-button" onClick={handlePreviousDateButtonClick}>
            <ChevronBackIcon className="date-range-slider__previous-button-icon"/>
        </button>
        <p className="date-range-slider__date">{startDate.format("D MMMM")} - {endDate.format("D MMMM YYYY")}</p>
        <button className="date-range-slider__next-button" onClick={handleNextDateButtonClick}>
            <ChevronRightIcon className="date-range-slider__next-button-icon"/>
        </button>
    </div>;
}

