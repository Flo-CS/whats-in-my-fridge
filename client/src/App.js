import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import "./App.scss";
import {ReactComponent as HomeIcon} from "./assets/icons/home.svg";
import {ReactComponent as ProfileIcon} from "./assets/icons/person-circle.svg";
import {ReactComponent as StatsIcon} from "./assets/icons/stats-chart.svg";
import {ReactComponent as AddIcon} from "./assets/icons/add.svg";
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
import AddPage from "./pages/add/AddPage";

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
            path: PATHS.ADD_PRODUCT,
            Icon: AddIcon,
            name: "Add"
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
        },
    ];


    return <div className="app">
        <Router>
            <Switch>
                <AuthRoute path={PATHS.LOGIN}>
                    <LoginPage/>
                </AuthRoute>
                <Route path={PATHS.REGISTER}>
                    <RegisterPage/>
                </Route>
                <ProtectedRoute path={PATHS.ADD_PRODUCT}>
                    <AddPage/>
                    <NavigationBar items={navItems}/>
                </ProtectedRoute>
                <ProtectedRoute path={PATHS.PRODUCT_DETAILS(":barcode")}>
                    <ProductPage/>
                </ProtectedRoute>
                <ProtectedRoute exact path={PATHS.HOME}>
                    <HomePage/>
                    <NavigationBar items={navItems}/>
                </ProtectedRoute>
                <ProtectedRoute path={PATHS.STATS}>
                    <StatsPage/>
                    <NavigationBar items={navItems}/>
                </ProtectedRoute>
                <Redirect from="*" to="/"/>
            </Switch>
        </Router>
    </div>;
}

export default App;
