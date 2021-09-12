import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {loginUser} from "../../features/authSlice";

import "./LoginForm.scss"

export default function LoginForm() {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(loginUser({data: {email, password}}));

    }

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
                className="login-form__email"
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Mot de passe</label>
            <input
                className="login-form__password"
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="login-form__submit-button">Envoyer</button>
        </form>
    );
}