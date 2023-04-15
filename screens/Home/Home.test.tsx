import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react-native";
import Home, { CombineReduxState } from "./Home";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { NavigationMock } from "../../utils/testHelpers";
import { NativeBaseProvider } from "native-base";
import { theme } from "../../utils/customFonts";
import thunk from "redux-thunk";
import "@testing-library/jest-dom/extend-expect";

const mockStore = configureStore([thunk]);

// for native base provider
const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

describe("Home Screen Tests..", () => {
  let navigationMock: NavigationMock;
  navigationMock = new NavigationMock();

  function renderComponent(state: CombineReduxState) {
    const store = mockStore(state);
    const screen = render(
      <NativeBaseProvider initialWindowMetrics={inset} theme={theme}>
        <Provider store={store}>
          <Home navigation={navigationMock} />
        </Provider>
      </NativeBaseProvider>
    );
    return { screen, store };
  }

  afterAll(cleanup);

  // 1.
  test("It should have a reset button to reset slots.", () => {
    const { screen, store } = renderComponent({
      carsDetails: [],
      parkingSlots: [],
    });

    const resetButton = screen.getByTestId("slots-reset-button");

    expect(resetButton).toBeTruthy();
  });

  // 2.
  test("Reset button should dispatch resets slots action.", () => {
    const { screen, store } = renderComponent({
      carsDetails: [],
      parkingSlots: [],
    });

    const resetButton = screen.getByTestId("slots-reset-button");

    fireEvent.press(resetButton);

    const calledActions = [
      { type: "RESET_SLOTS", payload: null },
      { type: "REMOVE_ALL_CARS", payload: null },
    ];

    const actions = store.getActions();

    expect(actions).toMatchObject(calledActions);
  });

  // 3.
  test("Reset button should navigate to Starter Screen.", () => {
    navigationMock.navigate = jest.fn();

    const { screen, store } = renderComponent({
      carsDetails: [],
      parkingSlots: [],
    });

    const resetButton = screen.getByTestId("slots-reset-button");

    fireEvent.press(resetButton);

    expect(navigationMock.navigate).toBeCalledWith("Starter");
  });

  // 4.
  test("It should have a Add Car Button.", () => {
    const { screen, store } = renderComponent({
      carsDetails: [],
      parkingSlots: [],
    });

    const addCarButton = screen.getByTestId("add-car-button");

    expect(addCarButton).toBeTruthy();
  });

  // 5.
  test("Add Car Button should navigate to Register Screen.", () => {
    navigationMock.navigate = jest.fn();

    const { screen, store } = renderComponent({
      carsDetails: [],
      parkingSlots: [],
    });

    const addCarButton = screen.getByTestId("add-car-button");

    fireEvent.press(addCarButton);

    expect(navigationMock.navigate).toBeCalledWith("Registration");
  });
});
