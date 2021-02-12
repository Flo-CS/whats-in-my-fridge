import React from "react"
import RegisterInputs from "../components/auth/register/RegisterInputs";
import {useHistory} from "react-router-dom";

import "./Pages.scss"

export default function RegisterPage() {
    const history = useHistory()

    return <div className="register">
        <h1>Register</h1><RegisterInputs/>
        <button className="register__go-login-button" onClick={() => history.push("/login")}>Go login</button>
    </div>
}
