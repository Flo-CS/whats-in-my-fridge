import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import HomeView from "../components/main/home/HomeView";

import MainSidebar from "../components/main/MainSidebar";
import ProductView from "../components/main/product/ProductView";
import StatsView from "../components/main/stats/StatsView";

function MainPage() {
    return (
        <div className="main">
            <MainSidebar/>
            <Switch>
                <Route exact path="/">
                    <HomeView/>
                </Route>
                <Route path="/products/:barcode">
                    <ProductView/>
                </Route>
                <Route path="/stats">
                    <StatsView/>
                </Route>

                <Redirect from="*" to="/"/>
            </Switch>
        </div>
    );
}


export default MainPage;
