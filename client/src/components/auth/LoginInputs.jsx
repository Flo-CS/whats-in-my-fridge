import React, {useState} from "react";
import propTypes from "prop-types";
import {connect} from "react-redux";
import {loginUser} from "../../features/auth/authThunk";

function LoginInputs({loginUser}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmitButtonClick() {
        loginUser(email, password);
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

LoginInputs.propTypes = {
    loginUser: propTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        loginUser: (email, password) => loginUser(dispatch, {email, password}),
    };
}

export default connect(null, mapDispatchToProps)(LoginInputs);
