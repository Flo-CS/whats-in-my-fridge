import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import "./App.scss";

import MainPage from "./pages/Main.page";
import LoginPage from "./pages/Login.page";
import RegisterPage from "./pages/Register.page";
import ProtectedRoute from "./components/auth/Protected.route";
import AuthRoute from "./components/auth/Auth.route";


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
