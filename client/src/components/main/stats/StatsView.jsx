import React, {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchProductsStats, selectProductsStatsFeatures} from "../../../features/productSlice";
import DateRangeAndTimeUnitPicker from "./DateRangeAndTimeUnitPicker";
import GradesScoresHeatmap from "./GradesScoresHeatmap";
import ScoreHistoryLineChart from "./ScoreHistoryLineChart";
import StockCounts from "./StockCounts";


export default function StatsView() {
    const dispatch = useDispatch();
    const {productsStats, productsStatsIsLoading} = useSelector(state => selectProductsStatsFeatures(state));

    const handleDatesChange = useCallback((startDate, endDate, timeUnit) => {
        dispatch(fetchProductsStats({
            startDate,
            endDate,
            timeUnit
        }));
    }, [dispatch])

    const {stock = {}, scores = {}, specifics = {}} = productsStats;

    return <div className="stats-view">

        <DateRangeAndTimeUnitPicker onDatesChange={handleDatesChange}/>
        {productsStatsIsLoading === false ?
            <>
                <StockCounts total={stock.total_count}
                             inStock={stock.in_stock_count}
                             outOfStock={stock.out_of_stock_count}/>
                <hr className="stats-view__separator"/>
                <p className="stats-view__title">Nutriscore moyen (plus haut est meilleur)</p>
                <ScoreHistoryLineChart data={scores.nutriscore.average_history} isGrade/>
                <p className="stats-view__title">Ecoscore moyen (plus haut est meilleur)</p>
                <ScoreHistoryLineChart data={scores.ecoscore.average_history} isGrade/>
                <p className="stats-view__title">Novascore moyen (plus bas est meilleur)</p>
                <ScoreHistoryLineChart data={scores.nova.average_history}/>
                <p className="stats-view__title">Nombre de produits en fonction du nutriscore (horizontal) et ecoscore
                    (vertical)</p>
                <GradesScoresHeatmap xLabels={specifics.grades_scores_heatmap.xLabels}
                                     yLabels={specifics.grades_scores_heatmap.yLabels}
                                     data={specifics.grades_scores_heatmap.data}/>

            </>
            :
            <p>Chargement...</p>}
    </div>;


}
