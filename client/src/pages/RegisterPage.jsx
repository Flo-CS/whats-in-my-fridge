import React from "react";
import {useHistory} from "react-router-dom";
import RegisterInputs from "../components/auth/register/RegisterInputs";

import "./Pages.scss";

export default function RegisterPage() {
    const history = useHistory()

    return <div className="register">
        <h1>Inscription</h1><RegisterInputs/>
        <button className="register__go-login-button" onClick={() => history.push("/login")}>Aller se connecter</button>
    </div>
}
