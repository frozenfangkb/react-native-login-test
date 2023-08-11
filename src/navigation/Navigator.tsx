import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { AuthContext } from "../context/AuthContext";

import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { ProtectedScreen } from "../screens/ProtectedScreen";
import { UserStatus } from "../interfaces/appInterfaces";
import { LoadingScreen } from "../screens/LoadingScreen";

export type RootNavigatorParams = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ProtectedScreen: undefined;
  LoadingScreen: undefined;
};

const Stack = createStackNavigator<RootNavigatorParams>();

export const Navigator = () => {
  const { status } = useContext(AuthContext);

  if (status === UserStatus.CHECKING) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: "white",
        },
      }}
    >
      {status !== UserStatus.AUTHENTICATED ? (
        <>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </>
      ) : (
        <Stack.Screen name="ProtectedScreen" component={ProtectedScreen} />
      )}
    </Stack.Navigator>
  );
};
