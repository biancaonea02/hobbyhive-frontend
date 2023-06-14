import axios from "axios";
import { store } from "../auth/store/store";
import Cookies from "js-cookie";

const REACT_APP_API_URL = "http://35.204.232.177/api/auth/";

const cookieOptions = {
  expires: 1, // 1 day
  secure: false, // Set to true for HTTPS only
  // sameSite: 'strict',
};

export const authenticateUser = (username, password) => {
  return (dispatch) => {
    return axios
      .post(REACT_APP_API_URL + "login", {
        username,
        password,
      })
      .then((response) => {
        if (response.data) {
          dispatch(
            authenticationSuccess(
              response.data.userId,
              response.data.accessToken,
              response.data.refreshToken,
              response.data.authorities[0]?.authority
            )
          );
          Cookies.set("accessToken", response.data.accessToken, cookieOptions);
          Cookies.set(
            "refreshToken",
            response.data.refreshToken,
            cookieOptions
          );
          Cookies.set("userId", response.data.userId, cookieOptions);
          startTokenRefresh(response.data.refreshToken);
          return response.data;
        }
      })
      .catch((error) => {
        dispatch(authenticationFailure(error.message));
      });
  };
};

export const registerUser = (username, firstName, lastName, password) => {
  return (dispatch) => {
    return axios
      .post(REACT_APP_API_URL + "register", {
        username,
        firstName,
        lastName,
        password,
      })
      .then((response) => {
        if (response.data) {
          dispatch(
            authenticationSuccess(
              response.data.userId,
              response.data.accessToken,
              response.data.refreshToken,
              response.data.authorities[0].authority
            )
          );
          Cookies.set("accessToken", response.data.accessToken, cookieOptions);
          Cookies.set(
            "refreshToken",
            response.data.refreshToken,
            cookieOptions
          );
          Cookies.set("userId", response.data.userId, cookieOptions);
          Cookies.set(
            "role",
            response.data.authorities[0].authority,
            cookieOptions
          );
          startTokenRefresh(response.data.refreshToken);
          return response.data;
        }
      })
      .catch((error) => {
        dispatch(authenticationFailure(error.message));
      });
  };
};

export const tokenRefresh = (refreshToken) => {
  return (dispatch) => {
    return axios
      .post(REACT_APP_API_URL + "token", { refreshToken })
      .then((response) => {
        if (response.data) {
          dispatch(
            authenticationSuccess(
              response.data.userId,
              response.data.accessToken,
              response.data.refreshToken,
              response.data.authorities[0].authority
            )
          );
        }
      })
      .catch((error) => {
        dispatch(authenticationFailure(error.message));
      });
  };
};

export const getRole = (token) => {
  return axios
    .get(REACT_APP_API_URL + "role?token=" + token)
    .then((response) => {
      if (response.data) {
        Cookies.set("role", response.data, cookieOptions);
        return response.data;
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const startTokenRefresh = (refreshToken) => {
  setInterval(() => {
    store.dispatch(tokenRefresh(refreshToken));
  }, 240000);
};

export const authenticationSuccess = (userId, token, refreshToken, role) => {
  return {
    type: "AUTHENTICATION_SUCCESS",
    payload: { userId, token, refreshToken, role },
  };
};

export const authenticationFailure = (error) => {
  return {
    type: "AUTHENTICATION_FAILURE",
    payload: error,
  };
};

export const logout = () => ({
  type: "LOGOUT",
});
