import React, { Component } from "react";
import { View } from "react-native";
import Header from "../../components/Header/Header";
import { RegistrationProps } from "../../types";
import { globalStyles } from "../../utils/globalStyles";
import {
  KeyboardAvoidingView,
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  Stack,
  WarningOutlineIcon,
  Center,
} from "native-base";
import {
  checkEmpty,
  validateName,
  validateRegistrationNumber,
  validateCarModelName,
} from "../../validations/inputValildations";
import { CarDetailsProps, ParkingSlotProp } from "../../types/reduxTypes";
import { addNewCar } from "../../store/actions/registerActions";
import { connect } from "react-redux";
import { updateSlot } from "../../store/actions/parkingActions";
import { trimExtraSpace } from "../../utils/helpers";
interface IState {
  cutomerNameError?: string;
  carModelError?: string;
  registrationNumberError?: string;
  isButtonLoading: boolean;
  customerName: string;
  carModel: string;
  registrationNumber: string;
}
export class Registration extends Component<RegistrationProps, IState> {
  constructor(props: RegistrationProps) {
    super(props);

    // this bindings.
    this.handleSubmit = this.handleSubmit.bind(this);
    this.finalSubmit = this.finalSubmit.bind(this);
    this.validateInputs = this.validateInputs.bind(this);

    this.state = {
      customerName: "",
      carModel: "",
      registrationNumber: "",
      cutomerNameError: "",
      carModelError: "",
      registrationNumberError: "",
      isButtonLoading: false,
    };
  }

  //1. handler registration for submit.
  handleSubmit(): void {
    const isValid = this.validateInputs();

    if (isValid) {
      const freeSlots: Array<ParkingSlotProp> = this.props.parkingSlots.filter(
        (slot) => slot.isFilled === false
      );

      const randomSlot =
        freeSlots[Math.floor(Math.random() * freeSlots.length)];

      this.finalSubmit(randomSlot.id);
    } else return;
  }

  //2. validating form inputs
  validateInputs(): boolean {
    let isValid = true;

    if (
      checkEmpty(
        trimExtraSpace(this.state.customerName),
        trimExtraSpace(this.state.carModel),
        trimExtraSpace(this.state.registrationNumber)
      )
    ) {
      isValid = false;
      alert("Please fill all details!");
    }

    if (!validateName(trimExtraSpace(this.state.customerName))) {
      isValid = false;
      this.setState({
        cutomerNameError: "Enter a valid name!",
      });
    }

    if (
      !validateRegistrationNumber(
        trimExtraSpace(this.state.registrationNumber.toLocaleUpperCase())
      )
    ) {
      isValid = false;
      this.setState({
        registrationNumberError: "Enter a valid registration no.!",
      });
    }

    if (!validateCarModelName(trimExtraSpace(this.state.carModel))) {
      isValid = false;
      this.setState({ carModelError: "Enter a valid Car Model!" });
    }

    return isValid;
  }

  //3. final submit handler.
  finalSubmit(slotId: number) {
    const carDetails = {
      customerName: this.state.customerName,
      carModel: this.state.carModel,
      registrationNumber: this.state.registrationNumber.toLocaleUpperCase(),
      slotId: slotId,
      startTime: new Date(),
    };

    this.props.updateSlot(slotId);
    this.props.addNewCar(carDetails);
    this.props.navigation.navigate("Home");
  }

  render() {
    return (
      <KeyboardAvoidingView style={globalStyles.container}>
        <Header />
        <View
          style={{
            borderLeftWidth: 5,
            borderLeftColor: "#6d28d9",
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
            marginTop: 50,
            marginLeft: 55,
            marginBottom: 50,
          }}
        >
          <Heading
            color="violet.700"
            size="xl"
            ml="2"
            mt="1"
            fontFamily="text"
            fontWeight="500"
          >
            Enter Details
          </Heading>
        </View>
        <Center width="100%" height="50%">
          <Box w="100%" maxWidth="300px">
            <Stack direction="column" space="2.5">
              <FormControl
                isRequired
                isInvalid={this.state.cutomerNameError !== "" ? true : false}
              >
                <FormControl.Label fontFamily="text">
                  Customer Name
                </FormControl.Label>
                <Input
                  value={this.state.customerName}
                  testID="customer-name-input"
                  placeholder="e.g. John Doe"
                  keyboardType="default"
                  maxLength={20}
                  size="lg"
                  fontFamily="text"
                  onChangeText={(val) => this.setState({ customerName: val })}
                  _focus={{
                    backgroundColor: "violet.100",
                    borderColor: "violet.500",
                  }}
                />
                <FormControl.ErrorMessage
                  fontFamily="text"
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  {this.state.cutomerNameError}
                </FormControl.ErrorMessage>
              </FormControl>

              <FormControl
                isRequired
                isInvalid={this.state.carModelError !== "" ? true : false}
              >
                <FormControl.Label fontFamily="text">
                  {" "}
                  Car Model
                </FormControl.Label>
                <Input
                  value={this.state.carModel}
                  testID="car-model-input"
                  fontFamily="text"
                  placeholder="e.g. porsche 911 spyder"
                  keyboardType="default"
                  maxLength={25}
                  size="lg"
                  onChangeText={(val) => this.setState({ carModel: val })}
                  isInvalid={this.state.carModelError !== "" ? true : false}
                  _focus={{
                    backgroundColor: "violet.100",
                    borderColor: "violet.500",
                  }}
                />
                <FormControl.ErrorMessage
                  fontFamily="text"
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  {this.state.carModelError}
                </FormControl.ErrorMessage>
              </FormControl>

              <FormControl
                isRequired
                isInvalid={
                  this.state.registrationNumberError !== "" ? true : false
                }
              >
                <FormControl.Label fontFamily="text">
                  Car Registration No.
                </FormControl.Label>
                <Input
                  testID="registration-number-input"
                  fontFamily="text"
                  id="parking-drawing-registration-input"
                  placeholder="UP 32 LU 3000"
                  keyboardType="default"
                  maxLength={15}
                  size="lg"
                  value={this.state.registrationNumber}
                  onChangeText={(val) =>
                    this.setState({
                      registrationNumber: val,
                    })
                  }
                  isInvalid={
                    this.state.registrationNumberError !== "" ? true : false
                  }
                  _focus={{
                    backgroundColor: "violet.100",
                    borderColor: "violet.500",
                  }}
                />
                <FormControl.ErrorMessage
                  fontFamily="text"
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  {this.state.registrationNumberError}
                </FormControl.ErrorMessage>
              </FormControl>
              <Button
                testID="add-car-button"
                id="parking-drawing-add-car-button"
                borderRadius="xl"
                isLoading={this.state.isButtonLoading}
                spinnerPlacement="end"
                isLoadingText="Creating Slots"
                bg="violet.700"
                size="md"
                _text={{
                  fontSize: "md",
                  fontWeight: "500",
                  letterSpacing: "lg",
                  fontFamily: "text",
                }}
                _pressed={{ bg: "violet.700", opacity: 0.7 }}
                onPress={this.handleSubmit}
              >
                Add Car
              </Button>
            </Stack>
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
    addNewCar: (carDetails: CarDetailsProps) => dispatch(addNewCar(carDetails)),
    updateSlot: (slotId: number) => dispatch(updateSlot(slotId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
