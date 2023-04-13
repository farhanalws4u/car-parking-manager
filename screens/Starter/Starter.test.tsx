import React from "react";
import renderer from "react-test-renderer";
import { render } from "@testing-library/react-native";
import Starter from "./Starter";

describe("Starter Screen Tests.", () => {
  test("Input should only accept numeric value.", () => {
    const screen = render(<Starter />);
    const input = screen.queryByTestId("parking-create-text-input");

    expect(input).toHaveProperty("keyboardType", "numeric");
  });
});
