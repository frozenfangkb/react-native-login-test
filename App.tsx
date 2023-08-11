import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { Navigator } from "./src/navigation/Navigator";
import { AuthProvider } from "./src/context/AuthContext";

const AppState = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

const App = () => {
  return (
    <AppState>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </AppState>
  );
};

export default App;
