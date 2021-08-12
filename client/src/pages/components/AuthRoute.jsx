import propTypes from "prop-types";
import React from "react";
import {useSelector} from "react-redux";
import {Redirect, Route} from "react-router-dom";
import {selectAuthFeatures} from "../../features/authSlice";


export default function AuthRoute({children, ...rest}) {
    const {isAuthenticated} = useSelector(selectAuthFeatures);
    // TODO : Redirect to previous location instead of "/"
    return <Route {...rest}>
        {isAuthenticated === true ?
            <Redirect to="/"/> :
            children
        }
    </Route>;
}

AuthRoute.propTypes = {
    children: propTypes.oneOfType([
        propTypes.element,
        propTypes.arrayOf(propTypes.element)
    ])
};