import * as Font from "expo-font";

export async function loadFonts(): Promise<void> {
  await Font.loadAsync({
    "poppins-medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "poppins-regular": require("../assets/fonts/Poppins-Regular.ttf"),
  });
}
