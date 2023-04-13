import { extendTheme } from "native-base";

export const theme = extendTheme({
  fontConfig: {
    poppins: {
      400: {
        normal: "poppins-regular",
        italic: "poppins-regular-italic",
      },
      500: {
        normal: "poppins-medium",
        italic: "poppins-regular-italic",
      },
    },
  },

  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    text: "poppins",
  },
});
