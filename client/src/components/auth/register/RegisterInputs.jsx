import React, {useState} from "react";
import propTypes from "prop-types";
import {connect} from "react-redux";
import {registerUser} from "../../../features/auth/authThunk";

import "../AuthInputs.scss"

function RegisterInputs({registerUser}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault()
        registerUser(email, password);
    }

    return (
        <form className="register-inputs" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
                className="register-inputs__email"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
                className="register-inputs__password"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="register-inputs__submit-button">Submit</button>
        </form>
    );
}

RegisterInputs.propTypes = {
    registerUser: propTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        registerUser: (email, password) => registerUser(dispatch, {email, password}),
    };
}

export default connect(null, mapDispatchToProps)(RegisterInputs);
