import React from "react";
import {useHistory} from "react-router-dom";
import {PATHS} from "../../helpers/constants";

import LoginForm from "./LoginForm";

import "./LoginPage.scss"

export default function LoginPage() {
    const history = useHistory();

// Todo : Credit to open food facts (see licence for more infos)
    return <div className="login-page">
        <h1>Connexion</h1>
        <LoginForm/>
        <button className="login-page__go-register-button" onClick={() => history.push(PATHS.REGISTER)}>Aller
            s&apos;enregistrer
        </button>
    </div>;
}
