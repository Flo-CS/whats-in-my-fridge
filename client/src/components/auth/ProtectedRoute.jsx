import propTypes from "prop-types";
import React from "react";
import {useSelector} from "react-redux";
import {Redirect, Route} from "react-router-dom";
import {selectAuthFeatures} from "../../features/authSlice";

export default function ProtectedRoute({children, ...rest}) {
    const {isAuthenticated, isLoading} = useSelector((state) => selectAuthFeatures(state));
    return <Route {...rest}>
        {isAuthenticated === false && isLoading === false ?
            <Redirect to="/login"/> :
            children

        }
    </Route>;
}

ProtectedRoute.propTypes = {
    children: propTypes.element.isRequired
}
