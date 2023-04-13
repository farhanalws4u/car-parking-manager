import { Dispatch } from "redux";
import {
  ADD_NEW_CAR,
  REMOVE_ALL_CARS,
  REMOVE_CAR,
} from "../../constants/actionTypes";
import { ActionProps, CarDetailsProps } from "../../types/reduxTypes";

export const addNewCar =
  (carDetails: CarDetailsProps) =>
  (dispatch: Dispatch<ActionProps<typeof ADD_NEW_CAR, CarDetailsProps>>) => {
    dispatch({ type: ADD_NEW_CAR, payload: carDetails });
  };

export const removeCar =
  (slotId: number) =>
  (dispatch: Dispatch<ActionProps<typeof REMOVE_CAR, number>>) => {
    dispatch({ type: REMOVE_CAR, payload: slotId });
  };

export const removeAllCars =
  () => (dispatch: Dispatch<ActionProps<typeof REMOVE_ALL_CARS, null>>) => {
    dispatch({ type: REMOVE_ALL_CARS, payload: null });
  };
