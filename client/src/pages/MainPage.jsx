import React, {useState} from "react";

import {MAIN_VIEWS} from "../utils/constants";

import MainSidebar from "../components/main/MainSidebar";
import Home from "../components/main/views/home/Home";
import MainContent from "../components/main/MainContent";



function MainPage() {
    //TODO : Use redux state instead of local state
    const [currentView, setCurrentView] = useState(MAIN_VIEWS.HOME);

    function renderView(view) {
        switch (view) {
            case MAIN_VIEWS.HOME:
                return <Home/>;
            default:
                return <p>Error</p>;
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


export default MainPage;
