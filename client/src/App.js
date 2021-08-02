import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";

import "./App.scss";
import AuthRoute from "./components/routing/AuthRoute";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import {checkUserToken} from "./features/authSlice";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import MainSidebar from "./pages/MainSidebar";

import "./pages/Pages.scss";
import ProductPage from "./pages/product/ProductPage";
import RegisterPage from "./pages/register/RegisterPage";
import StatsPage from "./pages/stats/StatsPage";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkUserToken());
    }, [dispatch]);

    return <div className="app">
        <Router>
            <Switch>
                <AuthRoute exact path="/login">
                    <LoginPage/>
                </AuthRoute>
                <Route exact path="/register">
                    <RegisterPage/>
                </Route>
                <ProtectedRoute exact path="/">
                    <MainSidebar/>
                    <HomePage/>
                </ProtectedRoute>
                <ProtectedRoute path="/products/:barcode">
                    <MainSidebar/>
                    <ProductPage/>
                </ProtectedRoute>
                <ProtectedRoute path="/stats">
                    <MainSidebar/>
                    <StatsPage/>
                </ProtectedRoute>
                <Redirect from="*" to="/"/>
            </Switch>
        </Router>
    </div>;
}

export default App;
