import React, {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchProductsStats, selectProductsStatsFeatures} from "../../../features/productSlice";
import ScoreHistoryGraph from "./ScoreHistoryGraph";
import DateRangeTimeUnitPicker from "./DateRangeTimeUnitPicker";
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


    const novaAverageHistory = productsStats?.nova?.average_history;
    const nutriscoreAverageHistory = productsStats?.nutriscore?.average_history;
    const ecoscoreAverageHistory = productsStats?.ecoscore?.average_history;

    return <div className="stats-view">

    <StockCounts total={productsStats.total_count}
                     inStock={productsStats.in_stock_count}
                     outOfStock={productsStats.out_of_stock_count}/>

        <hr className="stats-view__separator"/>

        <DateRangeTimeUnitPicker onDatesChange={handleDatesChange}/>
        {productsStatsIsLoading === false ?
            <>

                <ScoreHistoryGraph data={nutriscoreAverageHistory} isGrade title="Nutriscore (plus haut est meilleur)"/>
                <ScoreHistoryGraph data={novaAverageHistory} title="Nova score (plus bas est meilleur)"/>
                <ScoreHistoryGraph data={ecoscoreAverageHistory} isGrade title="Ecoscore (plus haut est meilleur)"/>
            </>
            :
            <p>Chargement...</p>}
    </div>;


}
