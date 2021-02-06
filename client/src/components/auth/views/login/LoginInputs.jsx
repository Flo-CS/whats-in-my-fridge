import React, {useState} from "react";
import propTypes from "prop-types";
import {connect} from "react-redux";
import {loginUser} from "../../../../features/auth/authThunk";

import "./../AuthInputs.scss"

function LoginInputs({loginUser}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault()
        loginUser(email, password);
    }

    return (
        <form className="login-inputs" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
                className="login-inputs__email"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
                className="login-inputs__password"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="login-inputs__submit-button">Submit</button>
        </form>
    );
}

LoginInputs.propTypes = {
    loginUser: propTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        loginUser: (email, password) => loginUser(dispatch, {email, password}),
    };
}

export default connect(null, mapDispatchToProps)(LoginInputs);
