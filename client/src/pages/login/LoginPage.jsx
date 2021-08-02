import React from "react";
import {useHistory} from "react-router-dom";

import LoginInputs from "./LoginInputs";


export default function LoginPage() {
    const history = useHistory()

// Todo : Credit to open food facts (see licence for more infos)
    return <div className="login-page">
        <h1>Connexion</h1>
        <LoginInputs/>
        <button className="login-page__go-register-button" onClick={() => history.push("/register")}>Aller
            s&apos;enregistrer
        </button>
    </div>;
}
