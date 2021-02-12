import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import "./App.scss";

import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AuthRoute from "./components/auth/AuthRoute";


function App() {

    return <div className="app">
        <Router>
            <Switch>
                <AuthRoute exact path="/login">
                    <LoginPage/>
                </AuthRoute>
                <Route exact path="/register">
                    <RegisterPage/>
                </Route>
                <ProtectedRoute path="/">
                    <MainPage/>
                </ProtectedRoute>
            </Switch>
        </Router>
    </div>;
}

export default App
