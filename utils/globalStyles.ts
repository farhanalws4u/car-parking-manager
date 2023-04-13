import { StyleSheet } from "react-native";
import { VIEW_PORT_WIDTH, STATUSBAR_HEIGHT } from "./dimensions";

export const globalStyles = StyleSheet.create({
  container: {
    height: "100%",
    width: VIEW_PORT_WIDTH,
    paddingTop: STATUSBAR_HEIGHT,
    backgroundColor: "#fff",
    fontFamily: "axiforma-regular",
  },
});
