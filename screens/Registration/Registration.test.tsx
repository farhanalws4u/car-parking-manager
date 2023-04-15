import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react-native";
import Registration from "./Registration";
import { CombineReduxState } from "../Home/Home";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { NavigationMock } from "../../utils/testHelpers";
import { NativeBaseProvider } from "native-base";
import { theme } from "../../utils/customFonts";
import thunk from "redux-thunk";

const mockStore = configureStore([thunk]);

// for native base provider
const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

describe("Registration Screen Tests..", () => {
  let navigationMock: NavigationMock;
  navigationMock = new NavigationMock();

  function renderComponent(state: CombineReduxState) {
    const store = mockStore(state);
    const screen = render(
      <NativeBaseProvider initialWindowMetrics={inset} theme={theme}>
        <Provider store={store}>
          <Registration navigation={navigationMock} />
        </Provider>
      </NativeBaseProvider>
    );
    return { screen, store };
  }

  afterAll(cleanup);

  // 1.
  test("It should have customer name, car model, and registration no. input fields.", () => {
    const { screen, store } = renderComponent({
      carsDetails: [],
      parkingSlots: [],
    });

    const customerInput = screen.getByTestId("customer-name-input");
    const carModelInput = screen.getByTestId("car-model-input");
    const registrationNumberInput = screen.getByTestId(
      "registration-number-input"
    );

    expect(customerInput).toBeTruthy();
    expect(carModelInput).toBeTruthy();
    expect(registrationNumberInput).toBeTruthy();
  });

  // 2.
  test("It should have a add car button", () => {
    const { screen, store } = renderComponent({
      carsDetails: [],
      parkingSlots: [],
    });

    const addCarButton = screen.getByTestId("add-car-button");

    expect(addCarButton).toBeTruthy();
  });

  // 3.
  test("Add car button should work properly.", () => {
    const { screen, store } = renderComponent({
      carsDetails: [],
      parkingSlots: [],
    });
    const addCarButton = screen.getByTestId("add-car-button");
    screen.root;

    fireEvent.press(addCarButton);
  });
});
