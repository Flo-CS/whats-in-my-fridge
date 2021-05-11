import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis} from "recharts";
import {fetchProductsStats, selectProductsStatsFeatures} from "../../../features/productSlice";


export default function StatsView() {
    const dispatch = useDispatch();

    const {productsStats, productsStatsIsLoading} = useSelector(state => selectProductsStatsFeatures(state));


    useEffect(() => {
        dispatch(fetchProductsStats({startDate: "21/03/2021", endDate: "21/04/2021"}));
    }, [dispatch]);

    const novaAverageHistory = productsStats?.nova?.average_history;
    const nutriscoreAverageHistory = productsStats?.nutriscore?.average_history;
    const ecoscoreAverageHistory = productsStats?.ecoscore?.average_history;

    console.log(novaAverageHistory);

    return <div className="stats-view">

        {productsStatsIsLoading === false ?

            <BarChart width={600} height={300} data={novaAverageHistory}
                      margin={{top: 5, right: 0, bottom: 5, left: 0}}>

                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="t"/>
                <YAxis/>
                <Tooltip/>
                <Bar dataKey="v" fill="#8884d8"/>

            </BarChart> :
            <p>Chargement...</p>}
    </div>;


}
