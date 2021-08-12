import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import "./App.scss";
import {ReactComponent as HomeIcon} from "./assets/icons/home.svg";
import {ReactComponent as ProfileIcon} from "./assets/icons/person-circle.svg";
import {ReactComponent as StatsIcon} from "./assets/icons/stats-chart.svg";
import {checkUserToken} from "./features/authSlice";
import {PATHS} from "./helpers/constants";
import AuthRoute from "./pages/components/AuthRoute";
import NavigationBar from "./pages/components/NavigationBar";
import ProtectedRoute from "./pages/components/ProtectedRoute";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import "./pages/Pages.scss";
import ProductPage from "./pages/product/ProductPage";
import RegisterPage from "./pages/register/RegisterPage";
import StatsPage from "./pages/stats/StatsPage";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkUserToken());
    }, [dispatch]);


    const navItems = [
        {
            path: PATHS.HOME,
            Icon: HomeIcon,
            name: "Produits"
        },
        {
            path: PATHS.STATS,
            Icon: StatsIcon,
            name: "Stats"
        },
        {
            path: PATHS.PROFILE,
            Icon: ProfileIcon,
            name: "Profile"
        }];


    return <div className="app">
        <Router>
            <Switch>
                <AuthRoute path="/login">
                    <LoginPage/>
                </AuthRoute>
                <Route path="/register">
                    <RegisterPage/>
                </Route>
                <ProtectedRoute path="/products/:barcode">
                    <ProductPage/>
                </ProtectedRoute>
                <ProtectedRoute exact path="/">
                    <HomePage/>
                    <NavigationBar items={navItems}/>
                </ProtectedRoute>
                <ProtectedRoute path="/stats">
                    <StatsPage/>
                    <NavigationBar items={navItems}/>
                </ProtectedRoute>
                <Redirect from="*" to="/"/>
            </Switch>
        </Router>
    </div>;
}

export default App;
