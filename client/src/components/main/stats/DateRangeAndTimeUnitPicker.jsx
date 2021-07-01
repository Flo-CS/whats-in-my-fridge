import dayjs from "dayjs";
import propTypes from "prop-types";
import React, {useEffect, useState} from "react";

import {ReactComponent as BackIcon} from "./../../../assets/icons/back.svg";
import {ReactComponent as NextIcon} from "./../../../assets/icons/next.svg";
import "./DateRangeAndTimeUnitPicker.scss";


export default function DateRangeAndTimeUnitPicker({onDatesChange}) {
    const [timeUnit, setTimeUnit] = useState("month");
    const [startDate, setStartDate] = useState(dayjs().startOf(timeUnit));
    const [endDate, setEndDate] = useState(dayjs().endOf(timeUnit));

    function handlePreviousDateButtonClick() {
        setStartDate(startDate.subtract(1, timeUnit).startOf(timeUnit));
        setEndDate(endDate.subtract(1, timeUnit).endOf(timeUnit));
    }

    function handleNextDateButtonClick() {
        setStartDate(startDate.add(1, timeUnit).startOf(timeUnit));
        setEndDate(endDate.add(1, timeUnit).endOf(timeUnit));
    }

    function handleTimeUnitChange(event) {
        const unit = event.target.value;
        setTimeUnit(unit);
        setStartDate(dayjs().startOf(unit));
        setEndDate(dayjs().endOf(unit));
    }

    useEffect(() => {
        onDatesChange(startDate, endDate, timeUnit);
    }, [startDate, endDate, timeUnit, onDatesChange]);

    return <div className="date-range-and-time-unit-picker">
        <div className="date-range-and-time-unit-picker__time-unit-select">
            <input type="radio" name="time-unit" value="month" id="month-time-unit" onChange={handleTimeUnitChange}
                   defaultChecked/><label
            htmlFor="month-time-unit">Mois</label>
            <input type="radio" name="time-unit" value="year" id="year-time-unit"
                   onChange={handleTimeUnitChange}/><label
            htmlFor="year-time-unit">Année</label>
        </div>
        <div className="date-range-and-time-unit-picker__date-select">
            <button className="date-range-and-time-unit-picker__previous-btn" onClick={handlePreviousDateButtonClick}>
                <BackIcon/></button>
            <p className="date-range-and-time-unit-picker__date">{endDate.format(timeUnit === "month" ? "MMMM YYYY" : "YYYY")}</p>
            <button className="date-range-and-time-unit-picker__next-btn" onClick={handleNextDateButtonClick}>
                <NextIcon/>
            </button>
        </div>
    </div>;
}

DateRangeAndTimeUnitPicker.propTypes = {
    onDatesChange: propTypes.func.isRequired
};