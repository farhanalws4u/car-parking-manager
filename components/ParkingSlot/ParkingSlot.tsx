import {} from "react-native";
import React, { Component } from "react";
import { Pressable, Box, Heading, Text } from "native-base";
import { ParkingSlotProp } from "../../types";
import { connect } from "react-redux";

export class ParkingSlot extends Component<ParkingSlotProp> {
  constructor(props: ParkingSlotProp) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }

  //1. handler slot press
  handlePress() {
    if (this.props.isFilled)
      this.props.navigation.navigate("DeRegistration", {
        slotId: this.props.id,
      });
    else {
      alert("Slot is empty!");
      return;
    }
  }

  render() {
    return (
      <Pressable
        id={
          this.props.isFilled
            ? `parking-drawing-registered-${this.props.id}`
            : `parking-drawing-space-${this.props.id}`
        }
        maxW="96"
      >
        {({ isPressed }) => {
          isPressed && this.handlePress();
          return (
            <Box
              mt="5"
              w="100px"
              h="120px"
              bg={
                isPressed
                  ? "violet.200"
                  : this.props.isFilled
                  ? "error.300"
                  : "violet.100"
              }
              style={{
                transform: [
                  {
                    scale: isPressed ? 0.96 : 1,
                  },
                ],
              }}
              p="5"
              rounded="8"
              shadow={2}
              borderWidth="1"
              borderColor="violet.300"
              justifyContent="center"
              alignItems="center"
            >
              <Heading
                id={`parking-drawing-space-number-${this.props.id}`}
                size="lg"
                color="coolGray.600"
                fontWeight="500"
                fontFamily="text"
              >
                {this.props.id}
              </Heading>
              {this.props.isFilled && (
                <Text fontFamily="text" color="coolGray.600">
                  Filled!
                </Text>
              )}
            </Box>
          );
        }}
      </Pressable>
    );
  }
}

function mapStateToProps(state: any) {
  return {};
}

function mapDispatchToProps(dispatch: any) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ParkingSlot);
