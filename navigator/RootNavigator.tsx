import React, { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Starter from "../screens/Starter/Starter";
import Home from "../screens/Home/Home";
import Registration from "../screens/Registration/Registration";
import { RootStackParamList } from "../types/index";
import DeRegistration from "../screens/DeRegistration/DeRegistration";

export class RootNavigator extends Component {
  render() {
    const RootStack = createNativeStackNavigator<RootStackParamList>();
    return (
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <RootStack.Group>
          <RootStack.Screen name="Starter" component={Starter} />
          <RootStack.Screen name="Home" component={Home} />
          <RootStack.Screen name="Registration" component={Registration} />
          <RootStack.Screen name="DeRegistration" component={DeRegistration} />
        </RootStack.Group>
      </RootStack.Navigator>
    );
  }
}

export default RootNavigator;
