import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import propTypes from "prop-types";

import "./App.scss";

import MainPage from "./pages/MainPage.jsx";
import AuthPage from "./pages/AuthPage.jsx";

import {PAGES} from "./utils/constants";
import {selectAuthStatus} from "./features/auth/authSelector";
import {AUTH_STATUS} from "./features/auth/authConstants";

function App({authStatus}) {
    const [page, setPage] = useState(PAGES.AUTH);

    useEffect(() => {
        if (authStatus === AUTH_STATUS.DISCONNECTED) {
            setPage(PAGES.AUTH);
        } else if (authStatus === AUTH_STATUS.CONNECTED) {
            setPage(PAGES.MAIN);
        }
    }, [authStatus]);

    function renderPage(page) {
        switch (page) {
            case PAGES.AUTH:
                return <AuthPage/>;
            case PAGES.MAIN:
                return <MainPage/>;
        }
    }

    return <div className="app">{renderPage(page)}</div>;
}

App.propTypes = {
    authStatus: propTypes.string.isRequired,
};

function mapStateToProps(state) {
    return {
        authStatus: selectAuthStatus(state),
    };
}

export default connect(mapStateToProps)(App);
