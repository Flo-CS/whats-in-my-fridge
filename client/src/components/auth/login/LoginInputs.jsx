import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {loginUser} from "../../../features/auth/authSlice";

import "../AuthInputs.scss";

export default function LoginInputs() {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(loginUser({data: {email, password}}));

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