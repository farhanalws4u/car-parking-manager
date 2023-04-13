import { ActivityIndicator, View } from "react-native";
import React, { Component } from "react";

export class AppLoading extends Component {
  render() {
    return (
      <View style={{ width: "100%", height: "100%", justifyContent: "center" }}>
        <ActivityIndicator size={60} color="#6d28d9" />
      </View>
    );
  }
}

export default AppLoading;
