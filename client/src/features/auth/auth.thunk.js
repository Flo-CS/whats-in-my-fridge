import {setStatus} from "./auth.slice";

import Api from "../../utils/api";

import {AUTH_STATUS} from "./auth.constants";

export async function loginUser(dispatch, data) {
    try {
        dispatch(setStatus(AUTH_STATUS.DISCONNECTED));
        const response = await Api.login(data);
        dispatch(setStatus(AUTH_STATUS.CONNECTED));
    } catch (error) {
        dispatch(setStatus(AUTH_STATUS.ERROR));
    }
}

export async function registerUser(dispatch, data) {
    try {
        dispatch(setStatus(AUTH_STATUS.DISCONNECTED));
        const response = await Api.register(data);
    } catch (error) {
        dispatch(setStatus(AUTH_STATUS.ERROR));
    }
}
