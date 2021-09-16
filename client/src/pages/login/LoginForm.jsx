import React from "react";
import {useDispatch} from "react-redux";
import {loginUser} from "../../features/authSlice";

import "./LoginForm.scss"
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';

export default function LoginForm() {
    const dispatch = useDispatch();
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(yup.object().shape({
            email: yup.string().email("Il ne s'agit pas d'un email valide").required("L'email est obligatoire"),
            password: yup.string().required("Le mot de passe est obligatoire")
        })),
        mode: "onChange"
    });

    function onSubmit(data) {
        dispatch(loginUser({data: data}));
    }

    return (
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email">Email</label>
            <input
                className="login-form__email"
                id="email"
                type="email"
                autoComplete="email"
                {...register("email")}
            />
            {errors.email && <span className="login-form__hint">{errors.email?.message}</span>}
            <label htmlFor="password">Mot de passe</label>
            <input
                className="login-form__password"
                id="password"
                type="password"
                autoComplete="current-password"
                {...register("password")}
            />
            {errors.password && <span className="login-form__hint">{errors.password?.message}</span>}
            <button type="submit" className="login-form__submit-button">Envoyer</button>
        </form>
    );
}