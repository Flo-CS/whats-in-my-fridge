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
import Heatmap from "../../components/data display/Heatmap";
import {values} from "lodash";
import {LETTER_SCORES_COLORS, NOVA_COLORS} from "../../helpers/constants";
import StatsPageField from "./components/StatsPageField";


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
            value: productsStats?.counts?.total,
            oldValue: 5
        },
        {
            name: "Présents",
            value: productsStats?.counts?.in_stock,
            oldValue: 40
        },
        {
            name: "Epuisés",
            value: productsStats?.counts?.out_of_stock,
            oldValue: 5
        }]


    return <div className="stats-page">
        <div className="stats-page__top-controls">
            <Switch onOptionChange={(option) => {
                setTimeGranularity(option)
                setStartDate(dayjs().startOf(option).format())
            }} selectedOption={timeGranularity}
                    options={dateGranularitySwitchOptions}/>
            <DateRangeSlider onDateRangeChange={(dateRange) => setStartDate(dateRange.startDate)} startDate={startDate}
                             granularity={timeGranularity}/>
        </div>

        {!isLoading ?
            <>
                <NumbersBox items={numbersBoxItems}/>
                <StatsPageField title="Nutriscore moyen">
                    <LetterScoreAverageHistoryChart data={productsStats.scores_history.nutriscore}/>
                </StatsPageField>
                <StatsPageField title="Ecoscore moyen">
                    <LetterScoreAverageHistoryChart data={productsStats.scores_history.ecoscore}/>
                </StatsPageField>
                <StatsPageField title="Nova moyen">
                    <NovaScoreAverageHistoryChart data={productsStats.scores_history.nova}
                                                  title="Nova moyen"/>
                </StatsPageField>
                <StatsPageField title="Nombre de produits">
                    <Heatmap data={productsStats.heatmaps.nutriscore_ecoscore.data}
                             xLabels={productsStats.heatmaps.nutriscore_ecoscore.xLabels}
                             yLabels={productsStats.heatmaps.nutriscore_ecoscore.yLabels}
                             xLabelsColors={values(LETTER_SCORES_COLORS)}
                             yLabelsColors={values(LETTER_SCORES_COLORS)}
                             xName="Nutriscore"
                             yName="Ecoscore"/>
                    <Heatmap data={productsStats.heatmaps.nutriscore_nova.data}
                             xLabels={productsStats.heatmaps.nutriscore_nova.xLabels}
                             yLabels={productsStats.heatmaps.nutriscore_nova.yLabels}
                             xLabelsColors={values(LETTER_SCORES_COLORS)}
                             yLabelsColors={values(NOVA_COLORS)}
                             xName="Nutriscore"
                             yName="Nova"/>
                    <Heatmap data={productsStats.heatmaps.ecoscore_nova.data}
                             xLabels={productsStats.heatmaps.ecoscore_nova.xLabels}
                             yLabels={productsStats.heatmaps.ecoscore_nova.yLabels}
                             xLabelsColors={values(LETTER_SCORES_COLORS)}
                             yLabelsColors={values(NOVA_COLORS)}
                             xName="Ecoscore"
                             yName="Nova"/>
                </StatsPageField>
            </>
            :
            <ThreeDotLoading/>
        }
    </div>;

}
