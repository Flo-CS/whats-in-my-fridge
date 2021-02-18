import React from "react"
import {Redirect, Route} from "react-router-dom";
import propTypes from "prop-types"
import {connect} from "react-redux";
import {selectAuthStatus} from "../../features/auth/authSelector";
import {AUTH_STATUS} from "../../features/auth/authConstants";

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