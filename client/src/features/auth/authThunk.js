import { setToken, setStatus } from "./authSlice";

import Api from "../../utils/api";

import { AUTH_STATUS } from "./authConstants";

export async function loginUser(dispatch, data) {
  try {
    dispatch(setStatus(AUTH_STATUS.DISCONNECTED));
    const response = await Api.login(data);
    dispatch(setToken(response.data.token));
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
