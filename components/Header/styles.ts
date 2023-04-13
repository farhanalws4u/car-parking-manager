import { StyleSheet } from "react-native";
import { VIEW_PORT_WIDTH } from "../../utils/dimensions";

export const styles = StyleSheet.create({
  container: {
    width: VIEW_PORT_WIDTH,
    height: 60,
    backgroundColor: "#6E48AA",
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    fontFamily: "text",
    fontSize: 40,
    color: "#F7FBFF",
  },
  logoImage: {
    width: 53,
    height: 53,
    marginRight: 10,
    marginTop: -3,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

// orange = #EC6F66

// violet = #6E48AA
