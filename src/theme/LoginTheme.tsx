import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    height: 600,
    marginBottom: 50,
  },
  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
  },
  label: {
    marginTop: 25,
    color: "white",
    fontWeight: "bold",
  },
  inputField: {
    color: "white",
    fontSize: 20,
    paddingBottom: 10,
  },
  inputFieldIOS: {
    borderBottomColor: "white",
    borderBottomWidth: 2,
    paddingTop: 5,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  loginButton: {
    borderWidth: 2,
    borderColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 100,
  },
  loginButtonText: {
    fontSize: 18,
    color: "white",
  },
  newUserContainer: {
    alignItems: "flex-end",
    marginTop: 10,
  },
  loadingOverlay: {
    zIndex: 1000,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.6)",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});
