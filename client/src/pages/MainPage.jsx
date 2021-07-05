import React from "react";
import {Redirect, Switch} from "react-router-dom";
import HomeView from "../components/main/home/HomeView";

import MainSidebar from "../components/main/MainSidebar";
import ProductView from "../components/main/product/ProductView";
import StatsView from "../components/main/stats/StatsView";
import ProtectedRoute from "../components/auth/ProtectedRoute";

function MainPage() {
    return (
        <div className="main">
            <MainSidebar/>
            <Switch>
                <ProtectedRoute exact path="/">
                    <HomeView/>
                </ProtectedRoute>
                <ProtectedRoute path="/products/:barcode">
                    <ProductView/>
                </ProtectedRoute>
                <ProtectedRoute path="/stats">
                    <StatsView/>
                </ProtectedRoute>

                <Redirect from="*" to="/"/>
            </Switch>
        </div>
    );
}


export default MainPage;
