import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {registerUser} from "../../features/authSlice";

import "./RegisterForm.scss"

export default function RegisterForm() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("")

    function handleSubmit(e) {
        e.preventDefault();
        if (password !== passwordConfirm) {
            alert("Les mots de passe ne correspondent pas")
            return
        }
        dispatch(registerUser({data: {email, password}}));
    }

    return (
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
                className="register-form__email"
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Mot de passe</label>
            <input
                className="register-form__password"
                id="password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password-confirm">Répéter le mot de passe</label>
            <input
                className="register-form__password-confirm"
                id="password-confirm"
                type="password"
                autoComplete="new-password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            <button type="submit" className="register-form__submit-button">Envoyer</button>
        </form>
    );
}