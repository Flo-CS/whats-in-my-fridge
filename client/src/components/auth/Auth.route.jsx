import React from "react"
import {Redirect, Route} from "react-router-dom";
import propTypes from "prop-types"
import {connect} from "react-redux";
import {selectAuthStatus} from "../../features/auth/auth.selector";
import {AUTH_STATUS} from "../../features/auth/auth.constants";

function AuthRoute({children, authStatus, ...rest}) {
    return <Route {...rest}>
        {authStatus === AUTH_STATUS.CONNECTED ?
            <Redirect to="/"/> :
            children
        }
    </Route>
}

AuthRoute.propTypes = {
    authStatus: propTypes.string.isRequired,
    children: propTypes.element.isRequired
}

function mapStateToProps(state) {
    return {authStatus: selectAuthStatus(state)}
}

export default connect(mapStateToProps)(AuthRoute)