import React, {useState} from "react";
import {connect} from "react-redux";
import propTypes from "prop-types";

import {VIEWS} from "../utils/constants";

import MainSidebar from "../components/main/MainSidebar.jsx";
import Home from "../components/main/views/home/Home.jsx";

import {selectAuthToken} from "../features/auth/authSelector";

function MainPage({token}) {
    const [currentView, setCurrentView] = useState(VIEWS.HOME);

    // TEMPORARY : JUST FOR DEVELOPMENT PURPOSES
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
            {renderView(currentView)}
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
