import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchProductsStats, selectProductsStats} from "../../features/productSlice";
import DateRangeSlider from "../../components/input/DateRangeSlider";
import Switch from "../../components/input/Switch";
import dayjs from "dayjs";

import "./StatsPage.scss"
import NumbersBox from "../../components/data display/NumbersBox";
import ThreeDotLoading from "../../components/loading/ThreeDotLoading";
import LetterScoreAverageHistoryChart from "./components/LetterScoreAverageHistoryChart";
import NovaScoreAverageHistoryChart from "./components/NovaScoreAverageHistoryChart";


export default function StatsPage() {
    const dispatch = useDispatch();
    const [timeGranularity, setTimeGranularity] = useState("month");
    const [startDate, setStartDate] = useState(dayjs().startOf(timeGranularity).format())

    const productsStats = useSelector(selectProductsStats);
    const isLoading = useSelector(state => state.products.productsStatsIsLoading);


    useEffect(() => {
        dispatch(fetchProductsStats({
            startDate: dayjs(startDate).utc(true).format(),
            timeGranularity: timeGranularity
        }));
    }, [timeGranularity, startDate, dispatch]);


    const dateGranularitySwitchOptions = [
        {
            name: "Mensuel",
            key: "month"
        },
        {
            name: "Annuel",
            key: "year"
        }
    ]

    const numbersBoxItems = [
        {
            name: "Produits",
            value: productsStats?.stock?.total_count,
            oldValue: 5
        },
        {
            name: "Présents",
            value: productsStats?.stock?.in_stock_count,
            oldValue: 40
        },
        {
            name: "Epuisés",
            value: productsStats?.stock?.out_of_stock_count,
            oldValue: 5
        }]


    return <div className="stats-page">
        <div className="stats-page__top-controls">
            <Switch onOptionChange={(option) => setTimeGranularity(option)} selectedOption={timeGranularity}
                    options={dateGranularitySwitchOptions}/>
            <DateRangeSlider onDateRangeChange={(dateRange) => setStartDate(dateRange.startDate)} startDate={startDate}
                             granularity={timeGranularity}/>
        </div>

        {!isLoading ?
            <>
                <NumbersBox items={numbersBoxItems}/>

                <LetterScoreAverageHistoryChart data={productsStats.scores.nutriscore.average_history}
                                                title="Nutriscore moyen"/>
                <LetterScoreAverageHistoryChart data={productsStats.scores.ecoscore.average_history}
                                                title="Ecoscore moyen"/>
                <NovaScoreAverageHistoryChart data={productsStats.scores.nova.average_history}
                                              title="Nova moyen"
                />
            </>
            :
            <ThreeDotLoading/>
        }
    </div>;

}
