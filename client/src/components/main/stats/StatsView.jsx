import React, {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchProductsStats, selectProductsStatsFeatures} from "../../../features/productSlice";
import DateRangeAndTimeUnitPicker from "./DateRangeAndTimeUnitPicker";
import ScoreHistoryGraph from "./ScoreHistoryGraph";
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

    const {stock = {}, scores = {}, tags = {}} = productsStats;

    return <div className="stats-view">

        <StockCounts total={stock.total_count}
                     inStock={stock.in_stock_count}
                     outOfStock={stock.out_of_stock_count}/>

        <hr className="stats-view__separator"/>

        <DateRangeAndTimeUnitPicker onDatesChange={handleDatesChange}/>
        {productsStatsIsLoading === false ?
            <>

                <ScoreHistoryGraph data={scores.nutriscore.average_history} isGrade
                                   title="Nutriscore (plus haut est meilleur)"/>
                <ScoreHistoryGraph data={scores.nova.average_history}
                                   title="Nova score (plus bas est meilleur)"/>
                <ScoreHistoryGraph data={scores.ecoscore.average_history} isGrade
                                   title="Ecoscore (plus haut est meilleur)"/>
            </>
            :
            <p>Chargement...</p>}
    </div>;


}
