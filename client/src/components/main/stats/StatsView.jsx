import React, {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchProductsStats, selectProductsStats} from "../../../features/productSlice";
import {letterScoresColors} from "../../../helpers/miscellaneous";
import ThreeDotLoading from "../../ThreeDotLoading";
import DateRangeAndTimeUnitPicker from "./DateRangeAndTimeUnitPicker";
import ScoreHistoryLineChart from "./ScoreHistoryLineChart";
import ScoresHeatmap from "./ScoresHeatmap";
import StockCounts from "./StockCounts";
import {ACCENT_COLOR} from "../../../helpers/constants";


export default function StatsView() {
    const dispatch = useDispatch();
    const productsStats = useSelector(selectProductsStats);
    const isLoading = useSelector(state => state.products.productsStatsIsLoading);

    const {stock, scores, specifics} = productsStats;

    const handleDatesChange = useCallback((startDate, endDate, timeUnit) => {
        dispatch(fetchProductsStats({
            startDate: startDate.utc(true).format(),
            endDate: endDate.utc(true).format(),
            timeUnit
        }));
    }, [dispatch]);


    const letterScoresHeatmapLabels = specifics?.letter_scores_heatmap?.xLabels.map((label, i) => ({
        name: label,
        color: letterScoresColors[i]
    }));

    return <div className="stats-view">

        <DateRangeAndTimeUnitPicker onDatesChange={handleDatesChange}/>
        {isLoading === false ?
            <>
                <StockCounts total={stock?.total_count}
                             inStock={stock?.in_stock_count}
                             outOfStock={stock?.out_of_stock_count}/>
                <hr className="stats-view__separator"/>
                <p className="stats-view__title">Nutriscore moyen (plus haut est meilleur)</p>
                <ScoreHistoryLineChart data={scores?.nutriscore?.average_history} isLetterScore/>
                <p className="stats-view__title">Ecoscore moyen (plus haut est meilleur)</p>
                <ScoreHistoryLineChart data={scores?.ecoscore?.average_history} isLetterScore/>
                <p className="stats-view__title">Novascore moyen (plus bas est meilleur)</p>
                <ScoreHistoryLineChart data={scores?.nova?.average_history}/>
                <p className="stats-view__title">Nombre de produits en fonction du nutriscore (horizontal) et ecoscore
                    (vertical)</p>
                <ScoresHeatmap xLabels={letterScoresHeatmapLabels}
                               yLabels={letterScoresHeatmapLabels}
                               data={specifics?.letter_scores_heatmap?.data}
                               accentColor={ACCENT_COLOR}/>
            </>
            :
            <ThreeDotLoading/>}
    </div>;


}
