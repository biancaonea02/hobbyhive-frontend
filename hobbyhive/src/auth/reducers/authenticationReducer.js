const initialState = {
  authenticated: false,
  userId: null,
  token: null,
  refreshToken: null,
  role: null,
  error: null,
};

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTHENTICATION_SUCCESS":
      return {
        ...state,
        authenticated: true,
        userId: action.payload.userId,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        role: action.payload.role,
        error: null,
      };
    case "AUTHENTICATION_FAILURE":
      return {
        ...state,
        authenticated: false,
        userId: null,
        token: null,
        refreshToken: null,
        role: null,
        error: action.payload,
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

export default authenticationReducer;
