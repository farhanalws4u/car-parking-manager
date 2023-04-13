import { Dimensions, Platform, StatusBar } from "react-native";

export const STATUSBAR_HEIGHT =
  Platform.OS === "ios" ? 20 : StatusBar.currentHeight;

export const VIEW_PORT_HEIGHT = Dimensions.get("window").height;

export const VIEW_PORT_WIDTH = Dimensions.get("window").width;
