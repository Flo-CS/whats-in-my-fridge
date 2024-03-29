import propTypes from "prop-types";
import React from "react";
import {useSelector} from "react-redux";
import {Redirect, Route} from "react-router-dom";
import {selectAuthFeatures} from "../../features/authSlice";

export default function ProtectedRoute({children, ...rest}) {
    const {isAuthenticated, isLoading} = useSelector(selectAuthFeatures);

    return <Route {...rest}>
        {!isLoading &&
        <>
            {isAuthenticated ?
                children :
                <Redirect to="/login"/>}
        </>
        }


    </Route>;
}

ProtectedRoute.propTypes = {
    children: propTypes.oneOfType([
        propTypes.element,
        propTypes.arrayOf(propTypes.element)
    ])
};
