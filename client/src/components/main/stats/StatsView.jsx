import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchProductsStats, selectProductsStatsFeatures} from "../../../features/productSlice";
import ScoreHistoryGraph from "./ScoreHistoryGraph";


export default function StatsView() {
    const dispatch = useDispatch();

    const {productsStats, productsStatsIsLoading} = useSelector(state => selectProductsStatsFeatures(state));


    useEffect(() => {
        dispatch(fetchProductsStats({
            startDate: "Sat, 22 May 2000 15:16:34 GMT",
            endDate: "Sat, 22 May 2040 15:16:34 GMT"
        }));
    }, [dispatch]);

    const novaAverageHistory = productsStats?.nova?.average_history;
    const nutriscoreAverageHistory = productsStats?.nutriscore?.average_history;
    const ecoscoreAverageHistory = productsStats?.ecoscore?.average_history;

    return <div className="stats-view">

        {productsStatsIsLoading === false ?
            <>
                <ScoreHistoryGraph data={nutriscoreAverageHistory} isGrade/>
                <ScoreHistoryGraph data={novaAverageHistory}/>
                <ScoreHistoryGraph data={ecoscoreAverageHistory} isGrade/>
            </>
            :
            <p>Chargement...</p>}
    </div>;


}
