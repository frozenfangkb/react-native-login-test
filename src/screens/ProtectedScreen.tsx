import React, { useContext } from "react";
import { Button, Text, View } from "react-native";
import { AuthContext } from "../context/AuthContext";

export const ProtectedScreen = () => {
  const { user, logOut } = useContext(AuthContext);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 50,
      }}
    >
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 20 }}>
          ProtectedScreen
        </Text>
        <Text>User: {user?.nombre}</Text>
        <Text>email: {user?.correo}</Text>
        <Text>id: {user?.uid}</Text>
      </View>
      <Button title="Logout" onPress={() => logOut()} />
    </View>
  );
};
