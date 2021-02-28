import propTypes from "prop-types";
import React from "react";
import {useSelector} from "react-redux";
import {Redirect, Route} from "react-router-dom";
import {selectAuthFeatures} from "../../features/authSlice";


export default function AuthRoute({children, ...rest}) {
    const {isAuthenticated} = useSelector((state) => selectAuthFeatures(state));
    return <Route {...rest}>
        {isAuthenticated === true ?
            <Redirect to="/"/> :
            children
        }
    </Route>;
}

AuthRoute.propTypes = {
    children: propTypes.element.isRequired
}