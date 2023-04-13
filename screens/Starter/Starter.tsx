import React, { Component } from "react";
import { RootStackParamList } from "../../types/index";
import {
  KeyboardAvoidingView,
  NativeEventSubscription,
  BackHandler,
  Alert,
} from "react-native";
import { globalStyles } from "../../utils/globalStyles";
import Header from "../../components/Header/Header";
import {
  Box,
  FormControl,
  Input,
  Stack,
  Button,
  WarningOutlineIcon,
  Center,
  Heading,
} from "native-base";
import { initializeParkingSlots } from "../../utils/helpers";
import { connect } from "react-redux";
import { createSlots } from "../../store/actions/parkingActions";
import { ActionProps, ParkingSlotProp } from "../../types/reduxTypes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Dispatch } from "redux";
import { CREATE_SLOTS } from "../../constants/actionTypes";

interface IState {
  totalSlots: number;
  isButtonLoading: boolean;
}

export type StarterProps = {
  createSlots: (
    allSlots: Array<ParkingSlotProp>
  ) => Dispatch<ActionProps<typeof CREATE_SLOTS, Array<ParkingSlotProp>>>;

  parkingSlots: Array<{ id: number; isFilled: boolean }>;
  [key: string]: string | number | Function | object | boolean;
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export class Starter extends Component<StarterProps, IState> {
  backHandler?: NativeEventSubscription;

  constructor(props: StarterProps) {
    super(props);

    // this bindings.
    this.handleSubmit = this.handleSubmit.bind(this);

    // adding listener to navigation and backhandler.
    props.navigation.addListener(
      "focus",
      () =>
        (this.backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          this.backAction
        ))
    );

    this.state = {
      totalSlots: 0,
      isButtonLoading: false,
    };
  }

  componentDidMount() {
    // redirect to home if slots are already created after fetching from local storage.
    if (this.props.parkingSlots.length !== 0) {
      this.props.navigation.navigate("Home");
    }
    this.props.navigation.addListener("blur", () =>
      BackHandler.removeEventListener("hardwareBackPress", this.backAction)
    );
  }

  // removing backhandler after unmount.
  componentWillUnmount() {
    this.props.navigation.removeListener("focus", () => {});
    this.props.navigation.removeListener("blur", () => {});
    this.backHandler?.remove();
  }

  // actions for backhandler on backPress
  backAction = () => {
    Alert.alert("Can't go back!", "Do you want to exit from app.", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },

      { text: "OK", onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  };

  //1. handle form submit.
  handleSubmit(): void {
    const slots = initializeParkingSlots(this.state.totalSlots);
    this.props.createSlots(slots);
    this.props.navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  }

  render() {
    return (
      <KeyboardAvoidingView style={globalStyles.container}>
        <Header />
        <Center w="100%" h="80%">
          <Box w="100%" maxWidth="300px">
            <FormControl isRequired>
              <Stack direction="column" space="2.5">
                <Heading size="md" fontFamily="text" fontWeight="500">
                  Enter Number of Slots in Parking
                </Heading>
                <Input
                  testID="parking-create-text-input"
                  id="parking-create-text-input"
                  onChangeText={(val) =>
                    this.setState({ totalSlots: parseInt(val) })
                  }
                  placeholder="e.g. 10"
                  keyboardType="numeric"
                  maxLength={2}
                  size="lg"
                  _focus={{
                    backgroundColor: "violet.100",
                    borderColor: "violet.500",
                  }}
                />
                <FormControl.ErrorMessage
                  fontFamily="text"
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  enter valid details
                </FormControl.ErrorMessage>
                <Button
                  id="parking-create-submit-button"
                  isLoading={this.state.isButtonLoading}
                  spinnerPlacement="end"
                  isLoadingText="Creating Slots"
                  bg="violet.700"
                  size="md"
                  _text={{
                    fontSize: "md",
                    fontWeight: "bold",
                    letterSpacing: "lg",
                    fontFamily: "text",
                  }}
                  _pressed={{ bg: "violet.700", opacity: 0.7 }}
                  onPress={this.handleSubmit}
                >
                  Create Slots
                </Button>
              </Stack>
            </FormControl>
          </Box>
        </Center>
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    parkingSlots: state.parkingSlots,
    carsDetails: state.carsDetails,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    createSlots: (allSlots: Array<ParkingSlotProp>) =>
      dispatch(createSlots(allSlots)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Starter);
