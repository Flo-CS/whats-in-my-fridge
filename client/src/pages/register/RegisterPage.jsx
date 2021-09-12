import React from "react";
import {useHistory} from "react-router-dom";
import {PATHS} from "../../helpers/constants";
import RegisterForm from "./RegisterForm";

import "./RegisterPage.scss"

export default function RegisterPage() {
    const history = useHistory()

    return <div className="register-page">
        <h1>Inscription</h1><RegisterForm/>
        <button className="register-page__go-login-button" onClick={() => history.push(PATHS.LOGIN)}>Aller se connecter
        </button>
    </div>;
}
