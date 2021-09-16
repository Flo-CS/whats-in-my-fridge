import React from "react";
import {useDispatch} from "react-redux";
import {registerUser} from "../../features/authSlice";

import "./RegisterForm.scss"
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';

export default function RegisterForm() {
    const dispatch = useDispatch();
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(yup.object().shape({
            email: yup.string().email("Il ne s'agit pas d'un email valide")
                .max(255, "L'email doit faire maximum 255 caractères")
                .required("L'email est obligatoire"),
            password: yup.string().min(12, "Le mot de passe doit faire minimum 12 caractères")
                .max(255, "Le mot de passe doit faire maximum 255 caractères")
                .required("Le mot de passe est obligatoire"),
            password_confirm: yup.string().oneOf([yup.ref('password')], "Les mots de passe ne correspondent pas").required("Confirmer le mot de passe est obligatoire")
        })),
        mode: "onChange"
    })


    function onSubmit(data) {
        dispatch(registerUser({data: data}));
    }

    return (
        <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email">Email</label>
            <input
                className="register-form__email"
                id="email"
                type="email"
                autoComplete="email"
                {...register("email")}
            />
            {errors.email && <span className="register-form__hint">{errors.email?.message}</span>}
            <label htmlFor="password">Mot de passe</label>
            <input
                className="register-form__password"
                id="password"
                type="password"
                autoComplete="new-password"
                {...register("password",)}
            />
            {errors.password && <span className="register-form__hint">{errors.password?.message}</span>}

            <label htmlFor="password-confirm">Confirmer le mot de passe</label>
            <input
                className="register-form__password-confirm"
                id="password-confirm"
                type="password"
                autoComplete="new-password"
                {...register("password_confirm")}
            />
            {errors.password_confirm && <span className="register-form__hint">{errors.password_confirm?.message}</span>}

            <button type="submit" className="register-form__submit-button">Envoyer</button>
        </form>
    );
}