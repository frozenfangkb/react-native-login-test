import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { WhiteLogo } from "../components/WhiteLogo";
import { loginStyles } from "../theme/LoginTheme";
import { useForm } from "../hooks/useForm";
import { StackScreenProps } from "@react-navigation/stack";
import { RootNavigatorParams } from "../navigation/Navigator";

interface Props
  extends StackScreenProps<RootNavigatorParams, "RegisterScreen"> {}

export const RegisterScreen = ({ navigation }: Props) => {
  const { name, email, password, onChange } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const onRegister = () => {
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Name:", name);
    Keyboard.dismiss();
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "#5856D6" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={loginStyles.formContainer}>
          <WhiteLogo />
          <Text style={loginStyles.title}>Register</Text>
          <Text style={loginStyles.label}>Name:</Text>
          <TextInput
            placeholder="Type your name:"
            placeholderTextColor={"rgba(255,255,255,0.4)"}
            underlineColorAndroid="white"
            style={[
              loginStyles.inputField,
              Platform.OS === "ios" && loginStyles.inputFieldIOS,
            ]}
            selectionColor="white"
            onChangeText={(value) => onChange(value, "name")}
            value={name}
            onSubmitEditing={onRegister}
            autoCapitalize="words"
            autoCorrect={false}
          />
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
            onSubmitEditing={onRegister}
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
            onSubmitEditing={onRegister}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <View style={loginStyles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={loginStyles.loginButton}
              onPress={onRegister}
            >
              <Text style={loginStyles.loginButtonText}>Register</Text>
            </TouchableOpacity>
          </View>

          <View style={loginStyles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.replace("LoginScreen")}
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
                Back to login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
