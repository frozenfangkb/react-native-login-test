import { User, UserStatus } from "../interfaces/appInterfaces";

export interface AuthState {
  status: UserStatus;
  loading: boolean;
  token: string | null;
  errorMessage: string;
  user: User | null;
}

type AuthAction =
  | { type: "signUp"; payload: { token: string; user: User } }
  | { type: "addError"; payload: string }
  | { type: "removeError" }
  | { type: "checking" }
  | { type: "notAuthenticated" }
  | { type: "logOut" };

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "addError":
      return {
        ...state,
        user: null,
        status: UserStatus.NOT_AUTHENTICATED,
        token: null,
        errorMessage: action.payload,
        loading: false,
      };
    case "removeError":
      return {
        ...state,
        errorMessage: "",
        loading: false,
      };
    case "signUp":
      return {
        ...state,
        errorMessage: "",
        status: UserStatus.AUTHENTICATED,
        token: action.payload.token,
        user: action.payload.user,
        loading: false,
      };
    case "checking":
      return {
        ...state,
        loading: true,
      };
    case "notAuthenticated":
    case "logOut":
      return {
        ...state,
        status: UserStatus.NOT_AUTHENTICATED,
        token: null,
        user: null,
        loading: false,
      };
    default:
      return state;
  }
};
