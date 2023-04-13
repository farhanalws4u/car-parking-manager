import { Text, Image, View } from "react-native";
import React, { Component } from "react";
import { styles } from "./styles";
import { Box, Center } from "native-base";

export class Header extends Component {
  render() {
    return (
      <Box bg="violet.700" width="100%" height="16">
        <Center flexDir="row" mt="1">
          <Image
            style={styles.logoImage}
            source={require("../../assets/logo.png")}
          />
          <Text style={styles.logoText}>Parky</Text>
        </Center>
      </Box>
    );
  }
}

export default Header;
