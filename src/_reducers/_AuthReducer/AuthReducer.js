import { AuthConstant } from "../../_constants/constants";

const LoginInitialState = {
  isLoginSuccess: false,
  isAdmin: false,
};

const AuthReducer = (state = LoginInitialState, action) => {
  switch (action.type) {
    case AuthConstant.LOGIN_SUCCESS:
      return {
        ...state,
        isLoginSuccess: true,
        isAdmin: true,
      };
    case "logout":
      return {
        ...state,
        isLoginSuccess: false,
        isAdmin: false,
      };

    default:
      return state;
  }
};

export default AuthReducer;
