import {
  ADD_NEW_CAR,
  REMOVE_ALL_CARS,
  REMOVE_CAR,
} from "../../constants/actionTypes";
import { CarDetailsProps } from "../../types/reduxTypes";

import { ActionProps } from "../../types/reduxTypes";

const initialState: Array<CarDetailsProps> = [];

type addNewCar = ActionProps<typeof ADD_NEW_CAR, CarDetailsProps>;
type removeCar = ActionProps<typeof REMOVE_CAR, CarDetailsProps>;
type removeAllCars = ActionProps<typeof REMOVE_ALL_CARS, CarDetailsProps>;

type Actions = addNewCar | removeCar | removeAllCars; // type of action in reducer could be one of these.

const carsDetailsReducer = (
  state = initialState,
  action: Actions
): Array<CarDetailsProps> => {
  switch (action.type) {
    case "ADD_NEW_CAR":
      return [...state, action.payload!];

    case "REMOVE_CAR":
      const updatedState = state.filter((obj) => obj.slotId !== action.payload);

      return updatedState;

    case "REMOVE_ALL_CARS":
      return [];

    default:
      return state;
  }
};

export default carsDetailsReducer;
