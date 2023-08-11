import React, { createContext, useReducer, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  LoginData,
  LoginResponse,
  User,
  UserStatus,
} from "../interfaces/appInterfaces";
import { AuthState, authReducer } from "./AuthReducer";
import api from "../api/Api";

export type AuthContextProps = {
  errorMessage: string;
  token: string | null;
  user: User | null;
  status: UserStatus;
  loading: boolean;
  signIn: (loginData: LoginData) => void;
  signUp: () => void;
  logOut: () => void;
  removeError: () => void;
};

const authInitialState: AuthState = {
  status: UserStatus.CHECKING,
  token: null,
  errorMessage: "",
  user: null,
  loading: false,
};

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const AuthProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem("token");

    if (!token) return dispatch({ type: "notAuthenticated" });

    try {
      const res = await api.get<LoginResponse>("/auth");
      await AsyncStorage.setItem("token", res.data.token);
      dispatch({
        type: "signUp",
        payload: { token: res.data.token, user: res.data.usuario },
      });
    } catch (error) {
      dispatch({ type: "notAuthenticated" });
    }
  };

  const signIn = async ({ correo, password }: LoginData) => {
    dispatch({ type: "checking" });
    try {
      const res = await api.post<LoginResponse>("/auth/login", {
        correo,
        password,
      });

      dispatch({
        type: "signUp",
        payload: { token: res.data.token, user: res.data.usuario },
      });

      await AsyncStorage.setItem("token", res.data.token);
    } catch (error: any) {
      dispatch({
        type: "addError",
        payload: error.response.data.msg || "An error ocurred",
      });
    }
  };
  const signUp = () => {};
  const logOut = () => {
    AsyncStorage.removeItem("token");
    dispatch({ type: "logOut" });
  };
  const removeError = () => {
    dispatch({ type: "removeError" });
  };

  return (
    <AuthContext.Provider
      value={{ ...state, signUp, signIn, logOut, removeError }}
    >
      {children}
    </AuthContext.Provider>
  );
};
