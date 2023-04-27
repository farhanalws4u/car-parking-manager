import { TouchableOpacity, TouchableNativeFeedback } from "react-native";
import React, { Component } from "react";
import { Pressable, Box, Heading, Text } from "native-base";
import { ParkingSlotProp } from "../../types";
import { connect } from "react-redux";

interface IState {
  isPressed: boolean;
}
export class ParkingSlot extends Component<ParkingSlotProp, IState> {
  constructor(props: ParkingSlotProp) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
    this.state = {
      isPressed: false,
    };
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
      <TouchableNativeFeedback
        id={
          this.props.isFilled
            ? `parking-drawing-registered-${this.props.id}`
            : `parking-drawing-space-${this.props.id}`
        }
        onPress={this.handlePress}
      >
        <Box
          mt="5"
          w="100px"
          h="120px"
          bg={
            this.state.isPressed
              ? "violet.200"
              : this.props.isFilled
              ? "error.300"
              : "violet.100"
          }
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
      </TouchableNativeFeedback>
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
