import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import "./App.scss";
import {ReactComponent as HomeIcon} from "./assets/icons/home.svg";
import {ReactComponent as ProfileIcon} from "./assets/icons/person-circle.svg";
import {ReactComponent as StatsIcon} from "./assets/icons/stats-chart.svg";
import {ReactComponent as AddIcon} from "./assets/icons/add.svg";
import {checkUserToken, logoutUser} from "./features/authSlice";
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
            name: "Ajouter"
        },
        {
            path: PATHS.STATS,
            Icon: StatsIcon,
            name: "Stats"
        },
        {
            path: PATHS.PROFILE,
            Icon: ProfileIcon,
            name: "Déconnexion"
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
                <ProtectedRoute path={PATHS.PROFILE}>
                    <Logout/>
                </ProtectedRoute>
                <Redirect from="*" to="/"/>
            </Switch>
        </Router>
    </div>;
}

// TODO: TEMPORARY, WHILE PROFILE PAGE IS NOT IMPLEMENTED

function Logout() {
    const dispatch = useDispatch()

    //useEffect is necessary here: https://stackoverflow.com/questions/62336340/cannot-update-a-component-while-rendering-a-different-component-warning
    useEffect(() => {
        dispatch(logoutUser())
    }, [])
    return <Redirect to={PATHS.LOGIN}/>

}

export default App;
