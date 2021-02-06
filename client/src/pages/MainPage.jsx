import React, {useState} from "react";
import {connect} from "react-redux";
import propTypes from "prop-types";

import {VIEWS} from "../utils/constants";

import MainSidebar from "../components/main/MainSidebar.jsx";
import Home from "../components/main/views/home/Home.jsx";
import MainView from "../components/main/MainView.jsx";

import {selectAuthToken} from "../features/auth/authSelector";

function MainPage({token}) {
    const [currentView, setCurrentView] = useState(VIEWS.HOME);

    function renderView(view) {
        switch (view) {
            case VIEWS.HOME:
                return <Home/>;
            default:
                return <p>{token}</p>;
        }
    }

    return (
        <>
            <MainSidebar currentView={currentView} setCurrentView={setCurrentView}/>
            <MainView> {renderView(currentView)}</MainView>
        </>
    );
}

MainPage.propTypes = {
    token: propTypes.string.isRequired,
};

function mapStateToProps(state) {
    return {
        token: selectAuthToken(state),
    };
}

export default connect(mapStateToProps, null)(MainPage);
