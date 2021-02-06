import React, {useState} from "react";


import {AUTH_VIEWS} from "../utils/constants";
import Login from "../components/auth/views/login/Login";
import Register from "../components/auth/views/register/Register";


function AuthPage() {

    //TODO : Use redux state instead of local state
    const [currentView, setCurrentView] = useState(AUTH_VIEWS.LOGIN);

    function renderView(view) {
        let viewElement = null

        switch (view) {
            case AUTH_VIEWS.LOGIN:
                viewElement = <Login setCurrentView={setCurrentView}/>;
                break;
            case AUTH_VIEWS.REGISTER:
                viewElement = <Register setCurrentView={setCurrentView}/>;
                break;
            default:
                viewElement = <p>ERROR</p>;
                break;
        }
        return viewElement

    }

    return <>
        {renderView(currentView)}
    </>
}

export default AuthPage;
