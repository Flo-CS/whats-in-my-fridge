import React, { useState } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../features/auth/authThunk";

function RegisterInputs({ registerUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmitButtonClick() {
        registerUser(email, password);
    }
    return (
        <div>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSubmitButtonClick}>Submit</button>
        </div>
    );
}

RegisterInputs.propTypes = {
    registerUser: propTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        registerUser: (email, password) => registerUser(dispatch, { email, password }),
    };
}
export default connect(null, mapDispatchToProps)(RegisterInputs);
