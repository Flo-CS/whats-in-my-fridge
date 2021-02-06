import React, {useState} from "react";
import {connect} from "react-redux";
import propTypes from "prop-types";

import {MAIN_VIEWS} from "../utils/constants";

import MainSidebar from "../components/main/MainSidebar";
import Home from "../components/main/views/home/Home";
import MainContent from "../components/main/MainContent";

import {selectAuthToken} from "../features/auth/authSelector";

// TODO : Remove token : not needed
function MainPage({token}) {
    //TODO : Use redux state instead of local state
    const [currentView, setCurrentView] = useState(MAIN_VIEWS.HOME);

    function renderView(view) {
        switch (view) {
            case MAIN_VIEWS.HOME:
                return <Home/>;
            default:
                return <p>{token}</p>;
        }
    }

    return (
        <>
            <MainSidebar currentView={currentView} setCurrentView={setCurrentView}/>
            <MainContent>
                {renderView(currentView)}
            </MainContent>
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
