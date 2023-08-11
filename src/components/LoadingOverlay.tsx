import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { loginStyles } from "../theme/LoginTheme";

export const LoadingOverlay = () => {
  return (
    <View style={loginStyles.loadingOverlay}>
      <View
        style={{
          backgroundColor: "rgba(0,0,0,0.3)",
          padding: 20,
          borderRadius: 25,
        }}
      >
        <ActivityIndicator size={100} color="white" />
      </View>
    </View>
  );
};
