import propTypes from "prop-types";
import React from "react";
import {useSelector} from "react-redux";
import {Redirect, Route} from "react-router-dom";
import {selectAuthFeatures} from "../../features/auth/authSlice";

export default function ProtectedRoute({children, ...rest}) {
    const {isAuthenticated} = useSelector((state) => selectAuthFeatures(state));
    return <Route {...rest}>
        {isAuthenticated === true ?
            children :
            <Redirect to="/login"/>
        }
    </Route>;
}

ProtectedRoute.propTypes = {
    children: propTypes.element.isRequired
}
