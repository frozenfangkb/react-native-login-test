import React, { useContext, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
  Keyboard,
  Alert,
} from "react-native";
import { Background } from "../components/Background";
import { WhiteLogo } from "../components/WhiteLogo";
import { SafeAreaView } from "react-native-safe-area-context";
import { loginStyles } from "../theme/LoginTheme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useForm } from "../hooks/useForm";
import { StackScreenProps } from "@react-navigation/stack";
import { RootNavigatorParams } from "../navigation/Navigator";
import { AuthContext } from "../context/AuthContext";
import { UserStatus } from "../interfaces/appInterfaces";
import { LoadingOverlay } from "../components/LoadingOverlay";

interface Props extends StackScreenProps<RootNavigatorParams, "LoginScreen"> {}

export const LoginScreen = ({ navigation }: Props) => {
  const { signIn, errorMessage, removeError, loading } =
    useContext(AuthContext);

  const { email, password, onChange } = useForm({
    email: "",
    password: "",
  });

  const onLogin = () => {
    signIn({ correo: email, password });
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (errorMessage.length === 0) return;

    Alert.alert("Login Error", errorMessage, [
      {
        text: "Ok",
        onPress: () => removeError(),
      },
    ]);
  }, [errorMessage]);

  return (
    <>
      {loading && <LoadingOverlay />}
      <SafeAreaView style={{ flex: 1, paddingTop: 60 }}>
        <Background />
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={loginStyles.formContainer}>
            <WhiteLogo />
            <Text style={loginStyles.title}>Login</Text>
            <Text style={loginStyles.label}>Email:</Text>
            <TextInput
              placeholder="Type your email:"
              placeholderTextColor={"rgba(255,255,255,0.4)"}
              keyboardType="email-address"
              underlineColorAndroid="white"
              style={[
                loginStyles.inputField,
                Platform.OS === "ios" && loginStyles.inputFieldIOS,
              ]}
              selectionColor="white"
              onChangeText={(value) => onChange(value, "email")}
              value={email}
              onSubmitEditing={onLogin}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Text style={loginStyles.label}>Password:</Text>
            <TextInput
              placeholder="*********"
              placeholderTextColor={"rgba(255,255,255,0.4)"}
              secureTextEntry={true}
              underlineColorAndroid="white"
              style={[
                loginStyles.inputField,
                Platform.OS === "ios" && loginStyles.inputFieldIOS,
              ]}
              selectionColor="white"
              onChangeText={(value) => onChange(value, "password")}
              value={password}
              onSubmitEditing={onLogin}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <View style={loginStyles.buttonContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={loginStyles.loginButton}
                onPress={onLogin}
              >
                <Text style={loginStyles.loginButtonText}>Login</Text>
              </TouchableOpacity>
            </View>

            <View style={loginStyles.buttonContainer}>
              <Text style={loginStyles.loginButtonText}>
                Don't have an account?
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.replace("RegisterScreen")}
              >
                <Text
                  style={{
                    ...loginStyles.loginButtonText,
                    textDecorationColor: "white",
                    textDecorationLine: "underline",
                    textDecorationStyle: "solid",
                    marginTop: 5,
                  }}
                >
                  Create one now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};
