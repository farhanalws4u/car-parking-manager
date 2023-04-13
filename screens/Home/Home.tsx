import {
  NativeEventSubscription,
  View,
  BackHandler,
  Alert,
} from "react-native";
import React, { Component } from "react";
import {
  Box,
  Button,
  Heading,
  KeyboardAvoidingView,
  ScrollView,
} from "native-base";
import Header from "../../components/Header/Header";
import { globalStyles } from "../../utils/globalStyles";
import { HomeProps } from "../../types";
import ParkingSlot from "../../components/ParkingSlot/ParkingSlot";
import { styles } from "./styles";
import { connect } from "react-redux";
import AppLoading from "../../components/AppLoading/AppLoading";
import { resetSlots, updateSlot } from "../../store/actions/parkingActions";
import { removeAllCars } from "../../store/actions/registerActions";

type IState = {
  parkingSlots: Array<{ id: number; isFilled: boolean }>;
  isLoading: boolean;
};

export class Home extends Component<HomeProps, IState> {
  backHandler?: NativeEventSubscription;

  constructor(props: HomeProps) {
    super(props);

    // this bindings.
    this.handleNewCarBtn = this.handleNewCarBtn.bind(this);
    this.handleResetSlots = this.handleResetSlots.bind(this);
    this.fetchInitialData = this.fetchInitialData.bind(this);

    // adding listener to navigation to configure backhandler.
    props.navigation.addListener(
      "focus",
      () =>
        (this.backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          this.backAction
        ))
    );

    this.state = {
      parkingSlots: [],
      isLoading: true,
    };
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

  componentWillMount(): void {
    // temporary bug fix => parking slots array values are changed after saving to async storage.
    const carDetails = this.props.carsDetails;
    carDetails.map((obj) => {
      this.props.updateSlot(obj.slotId);
    });
  }

  componentDidMount(): void {
    this.fetchInitialData();
    this.props.navigation.addListener("blur", (payload) =>
      BackHandler.removeEventListener("hardwareBackPress", this.backAction)
    );
  }

  // removing listeners from navigation and backhandler to resist
  componentWillUnmount() {
    this.props.navigation.removeListener("focus", () => {});
    this.props.navigation.removeListener("blur", () => {});
    this.backHandler?.remove();
  }

  //1. initializing data.
  fetchInitialData(): void {
    this.setState({ parkingSlots: this.props.parkingSlots, isLoading: false });
  }

  //2. handle add new car button click
  handleNewCarBtn(): void {
    this.props.navigation.navigate("Registration");
  }

  //3. handler reset all created slots and cars details.
  handleResetSlots(): void {
    this.props.resetSlots();
    this.props.resetCarsDetails();
    this.props.navigation.navigate("Starter");
  }

  render() {
    const allSlots = this.state.parkingSlots.map((slot) => {
      return (
        <>
          <ParkingSlot
            navigation={this.props.navigation}
            key={slot.id}
            id={slot.id}
            isFilled={slot.isFilled}
          />
        </>
      );
    });

    if (this.state.isLoading) {
      return <AppLoading />;
    }

    return (
      <KeyboardAvoidingView style={globalStyles.container}>
        <Header />
        <Box w="100%" display="flex" h="100%" alignItems="center">
          <Box w="90%" flexGrow={11} maxHeight="86.5%">
            <View
              style={{
                borderLeftWidth: 5,
                borderLeftColor: "#6d28d9",
                borderTopLeftRadius: 4,
                borderBottomLeftRadius: 4,
                marginTop: 20,
                marginLeft: 11,
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
                fontFamily="text"
                fontWeight="500"
              >
                All Slots
              </Heading>
              <Button
                borderRadius="xl"
                mr="3"
                bg="error.400"
                size="sm"
                _text={{
                  fontSize: "md",
                  fontWeight: "500",
                  letterSpacing: "lg",
                  fontFamily: "text",
                }}
                _pressed={{ bg: "error.400", opacity: 0.7 }}
                onPress={this.handleResetSlots}
              >
                Reset
              </Button>
            </View>
            <ScrollView>
              <View style={styles.slotsList}>{allSlots}</View>
            </ScrollView>
          </Box>

          <Box w="100%" flexGrow={1}>
            <Button
              bg="violet.700"
              size="md"
              _text={{
                fontSize: "lg",
                fontWeight: "500",
                letterSpacing: "lg",
                fontFamily: "text",
              }}
              _pressed={{ bg: "violet.700", opacity: 0.7 }}
              onPress={this.handleNewCarBtn}
            >
              Add New Car
            </Button>
          </Box>
        </Box>
      </KeyboardAvoidingView>
    );
  }
}

// to map redux store's state to component prop
function mapStateToProps(state: any) {
  return {
    parkingSlots: state.parkingSlots,
    carsDetails: state.carsDetails,
  };
}
// to map dispatch functions to component prop
function mapDispatchToProps(dispatch: any) {
  return {
    resetSlots: () => dispatch(resetSlots()),
    resetCarsDetails: () => dispatch(removeAllCars()),
    updateSlot: (slotId: number) => dispatch(updateSlot(slotId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
