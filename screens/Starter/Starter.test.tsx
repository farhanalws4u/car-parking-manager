import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react-native";
import Starter, { combineReduxState } from "./Starter";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { NavigationMock } from "../../utils/testHelpers";
import { NativeBaseProvider } from "native-base";
import { theme } from "../../utils/customFonts";
import thunk from "redux-thunk";
import { CREATE_SLOTS } from "../../constants/actionTypes";

const mockStore = configureStore([thunk]);

// for native base provider
const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

describe("Starter Screen Tests..", () => {
  let navigationMock: NavigationMock;
  navigationMock = new NavigationMock();

  function renderComponent(state: combineReduxState) {
    const store = mockStore(state);
    const screen = render(
      <NativeBaseProvider initialWindowMetrics={inset} theme={theme}>
        <Provider store={store}>
          <Starter navigation={navigationMock} />
        </Provider>
      </NativeBaseProvider>
    );
    return { screen, store };
  }

  afterAll(cleanup);

  // 1.
  test("It should have an input field", () => {
    const { screen, store } = renderComponent({
      carsDetails: [],
      parkingSlots: [],
    });

    const input = screen.getByTestId("parking-create-text-input");

    expect(input).toBeTruthy();

    expect(input).toHaveProperty("type", "TextInput");
  });

  // 2.
  test("It should have a submit button.", () => {
    const { screen, store } = renderComponent({
      carsDetails: [],
      parkingSlots: [],
    });

    const submitButton = screen.getByTestId("parking-create-submit-button");

    expect(submitButton).toBeTruthy();
  });

  3;
  test("button should dispatch create slots action.", () => {
    const { screen, store } = renderComponent({
      carsDetails: [],
      parkingSlots: [],
    });

    const submitButton = screen.getByTestId("parking-create-submit-button");
    const input = screen.getByTestId("parking-create-text-input");

    fireEvent.changeText(input, 1);

    fireEvent.press(submitButton);

    const calledActions = [
      {
        type: CREATE_SLOTS,
        payload: [{ id: 1, isFilled: false }],
      },
    ];

    const actions = store.getActions();

    expect(actions).toMatchObject(calledActions);
  });

  // 5.
  test("should navigate to Home if input field is not empty.", () => {
    navigationMock.reset = jest.fn();

    const { screen, store } = renderComponent({
      carsDetails: [],
      parkingSlots: [],
    });

    const input = screen.getByTestId("parking-create-text-input");
    const submitButton = screen.getByTestId("parking-create-submit-button");

    fireEvent.changeText(input, 1);

    fireEvent.press(submitButton);

    expect(navigationMock.reset).toBeCalledWith({
      index: 0,
      routes: [{ name: "Home" }],
    });
  });

  // 6.
  test("should not navigate to Home if input field is empty.", () => {
    navigationMock.reset = jest.fn();

    const { screen, store } = renderComponent({
      carsDetails: [],
      parkingSlots: [],
    });

    const input = screen.getByTestId("parking-create-text-input");
    const submitButton = screen.getByTestId("parking-create-submit-button");

    fireEvent.changeText(input, 0);

    fireEvent.press(submitButton);

    expect(navigationMock.reset).toBeCalledTimes(0);
  });
});
