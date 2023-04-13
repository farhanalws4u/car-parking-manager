import { View } from "react-native";
import React, { Component } from "react";
import { globalStyles } from "../../utils/globalStyles";
import { Box, Button, Heading, Icon, Text } from "native-base";
import { DeRegistrationProps } from "../../types";
import { AntDesign } from "@expo/vector-icons";
import Header from "../../components/Header/Header";
import { connect } from "react-redux";
import AppLoading from "../../components/AppLoading/AppLoading";
import { removeCar } from "../../store/actions/registerActions";
import { emptySlot } from "../../store/actions/parkingActions";
import { getCharges } from "../../utils/helpers";
import { makePayment } from "../../api/payment";

type IState = {
  isPaymentTaken: boolean;
  isLoading: boolean;
  carDetails: {
    customerName: string;
    carModel: string;
    registrationNumber: string;
    slotId: number;
    startTime: Date;
  };
};

export class DeRegistration extends Component<DeRegistrationProps, IState> {
  constructor(props: DeRegistrationProps) {
    super(props);
    // binding of the handler functions.
    this.handleDeregister = this.handleDeregister.bind(this);
    this.fetchInitialData = this.fetchInitialData.bind(this);
    this.handlePayment = this.handlePayment.bind(this);

    this.state = {
      isLoading: true,
      isPaymentTaken: false,
      carDetails: {
        customerName: "",
        carModel: "",
        registrationNumber: "",
        slotId: 0,
        startTime: new Date(),
      },
    };
  }

  //1. initializing data before rendering.
  componentDidMount(): void {
    const params = this.props.route;
    const paramString = JSON.stringify(params);
    const slotId = JSON.parse(paramString).params.slotId;

    this.fetchInitialData(slotId);
  }

  fetchInitialData(_slotId: number): void {
    const array = Object.entries(this.props.carsDetails);
    const filtered = array.filter((ele) => ele[1].slotId === _slotId);
    const myDetails = filtered[0][1];

    this.setState({ carDetails: myDetails, isLoading: false });
  }

  //2. Deregister handler to remove car from parking.
  handleDeregister(): void {
    if (!this.state.isPaymentTaken) {
      alert("Payment is pending yet!");

      return;
    } else this.setState({ ...this.state, isLoading: true }); // enable loading

    // dispatching action to remove car from slot and empty slot.
    this.props.removeCar(this.state.carDetails.slotId);
    this.props.emptySlot(this.state.carDetails.slotId);

    this.setState({ ...this.state, isLoading: false });

    this.props.navigation.navigate("Home");
  }

  //3. handling payment.
  handlePayment = async () => {
    this.setState({ ...this.state, isPaymentTaken: true });

    // api call for payment.
    await makePayment({
      car_registration: this.state.carDetails.registrationNumber,
      charges: getCharges(this.state.carDetails.startTime).totalAmount,
    });
  };

  render() {
    if (this.state.isLoading) {
      return <AppLoading />;
    }
    return (
      <View style={globalStyles.container}>
        <Header />
        <Box w="100%" display="flex" h="100%" alignItems="center">
          <Box w="80%">
            <View
              style={{
                borderLeftWidth: 5,
                borderLeftColor: "#6d28d9",
                borderTopLeftRadius: 4,
                borderBottomLeftRadius: 4,
                marginTop: 50,
                marginBottom: 50,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Heading
                color="violet.700"
                size="xl"
                ml="2"
                mt="1"
                fontWeight="500"
                fontFamily="text"
              >
                {`Slot No. ${this.state.carDetails.slotId}`}
              </Heading>
            </View>

            <Box
              flexDir="row"
              alignItems="flex-start"
              justifyContent="space-between"
              my="2"
            >
              <Text bold fontSize="lg" fontFamily="text">
                Customer Name:
              </Text>
              <Text fontSize="lg" fontFamily="text">
                {this.state.carDetails.customerName}
              </Text>
            </Box>
            <Box
              flexDir="row"
              alignItems="flex-start"
              justifyContent="space-between"
              my="2"
            >
              <Text bold fontSize="lg" fontFamily="text">
                Car Model:
              </Text>
              <Text fontSize="lg" fontFamily="text">
                {this.state.carDetails.carModel}
              </Text>
            </Box>
            <Box
              flexDir="row"
              alignItems="flex-start"
              justifyContent="space-between"
              my="2"
            >
              <Text bold fontSize="lg" fontFamily="text">
                Registration Number:
              </Text>
              <Text
                fontSize="lg"
                id="deregister-car-registration"
                fontFamily="text"
              >
                {this.state.carDetails.registrationNumber}
              </Text>
            </Box>

            <Box
              flexDir="row"
              alignItems="flex-start"
              justifyContent="space-between"
              my="2"
            >
              <Text bold fontSize="lg" fontFamily="text">
                Total Time Spent:
              </Text>
              <Text fontSize="lg" id="deregister-time-spent" fontFamily="text">
                {getCharges(this.state.carDetails.startTime).totalHours +
                  " " +
                  "Hrs"}
              </Text>
            </Box>
            <Box
              flexDir="row"
              alignItems="flex-start"
              justifyContent="space-between"
              my="2"
            >
              <Text bold fontSize="lg" fontFamily="text">
                Charge Amount:
              </Text>
              <Text
                fontSize="lg"
                id="deregister-charge"
                color="error.600"
                fontFamily="text"
              >
                {getCharges(this.state.carDetails.startTime).totalAmount +
                  " " +
                  "$"}
              </Text>
            </Box>
            <Box
              flexDir="row"
              alignItems="flex-start"
              justifyContent="space-between"
              my="2"
            >
              {!this.state.isPaymentTaken && (
                <Button
                  borderRadius="xl"
                  id="deregister-payment-button"
                  mt="6"
                  bg="violet.700"
                  size="sm"
                  _text={{
                    fontSize: "sm",
                    fontWeight: "500",
                    fontFamily: "text",
                    letterSpacing: "sm",
                  }}
                  _pressed={{ bg: "violet.700", opacity: 0.7 }}
                  onPress={() => this.handlePayment()}
                >
                  Payment Taken ?
                </Button>
              )}

              {this.state.isPaymentTaken && (
                <Button
                  borderRadius="xl"
                  mt="6"
                  bg="success.800"
                  size="sm"
                  _pressed={{ bg: "violet.700", opacity: 0.7 }}
                  _text={{
                    fontSize: "sm",
                    fontWeight: "500",
                    letterSpacing: "sm",
                    fontFamily: "text",
                  }}
                  endIcon={
                    <Icon as={AntDesign} name="check" size="sm" color="white" />
                  }
                >
                  Payment Confirmed
                </Button>
              )}
            </Box>
            <Box mt="12">
              <Button
                borderRadius="xl"
                bg="violet.700"
                size="sm"
                _text={{
                  fontSize: "lg",
                  fontWeight: "500",
                  letterSpacing: "sm",
                  fontFamily: "text",
                }}
                _pressed={{ bg: "violet.700", opacity: 0.7 }}
                onPress={() => {
                  this.handleDeregister();
                }}
              >
                Free Slot
              </Button>
              <Button
                borderRadius="xl"
                id="deregister-back-button"
                mt="4"
                variant="subtle"
                bg="error.400"
                _text={{
                  fontSize: "lg",
                  fontWeight: "500",
                  letterSpacing: "sm",
                  fontFamily: "text",
                  color: "white",
                }}
                _pressed={{ bg: "error.400", opacity: 0.7 }}
                onPress={() => {
                  this.props.navigation.navigate("Home");
                }}
              >
                Discard
              </Button>
            </Box>
          </Box>
        </Box>
      </View>
    );
  }
}

function mapStateToProps(state: any): any {
  return {
    carsDetails: state.carsDetails,
    parkingSlots: state.parkingSlots,
  };
}

function mapDispatchToProps(dispatch: any): any {
  return {
    removeCar: (slotId: number) => dispatch(removeCar(slotId)),
    emptySlot: (slotId: number) => dispatch(emptySlot(slotId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeRegistration);
