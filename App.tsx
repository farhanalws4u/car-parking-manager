import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigator/RootNavigator";
import { NativeBaseProvider } from "native-base";
import { CommonProps } from "./types/index";
import { loadFonts } from "./utils/loadFonts";
import AppLoading from "expo-app-loading";
import { Provider as ReduxProvider } from "react-redux";
import store, { persistor } from "./store/store";
import { theme } from "./utils/customFonts";
import { PersistGate } from "redux-persist/integration/react";
import { Text } from "react-native";
interface IState {
  fontsLoaded: boolean;
}

export class App extends Component<CommonProps, IState> {
  constructor(props: CommonProps) {
    super(props);

    this.state = {
      fontsLoaded: false,
    };
  }

  render() {
    if (!this.state.fontsLoaded) {
      return (
        <AppLoading
          startAsync={loadFonts}
          onFinish={() => {
            this.setState({ fontsLoaded: true });
            console.log("fonts loaded.");
          }}
          onError={(error) => console.log(error)}
        />
      );
    }

    return (
      <ReduxProvider store={store}>
        <PersistGate
          loading={<Text>fetching data from local.</Text>}
          persistor={persistor}
        >
          <NativeBaseProvider theme={theme}>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </NativeBaseProvider>
        </PersistGate>
      </ReduxProvider>
    );
  }
}

export default App;
