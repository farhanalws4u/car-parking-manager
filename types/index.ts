import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ActionProps, CarDetailsProps } from "./reduxTypes";
import { Dispatch } from "redux";
import {
  ADD_NEW_CAR,
  EMPTY_SLOT,
  REMOVE_ALL_CARS,
  REMOVE_CAR,
  RESET_SLOTS,
  UPDATE_SLOT,
} from "../constants/actionTypes";

//1. Navigator types
export type RootStackParamList = {
  Starter: undefined;
  Home: undefined;
  Registration: undefined;
  DeRegistration: {
    slotId: number;
  };
};

export interface CommonProps {
  parkingSlots: Array<{ id: number; isFilled: boolean }>;
  [key: string]: string | number | Function | object | boolean;
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

//2. components props types

export interface HomeProps extends CommonProps {
  resetCarsDetails: () => Dispatch<ActionProps<typeof REMOVE_ALL_CARS, null>>;
  resetSlots: () => Dispatch<ActionProps<typeof RESET_SLOTS, null>>;
  updateSlot: (
    slotId: number
  ) => Dispatch<ActionProps<typeof UPDATE_SLOT, number>>;
  carsDetails: Array<CarDetailsProps>;
}

export interface RegistrationProps extends CommonProps {
  addNewCar: (
    carDetails: CarDetailsProps
  ) => Dispatch<ActionProps<typeof ADD_NEW_CAR, CarDetailsProps>>;
  updateSlot: (
    slotId: number
  ) => Dispatch<ActionProps<typeof UPDATE_SLOT, number>>;
}

export interface DeRegistrationProps extends CommonProps {
  emptySlot: (
    slotId: number
  ) => Dispatch<ActionProps<typeof EMPTY_SLOT, number>>;
  removeCar: (
    slotId: number
  ) => Dispatch<ActionProps<typeof REMOVE_CAR, number>>;
}

export interface ParkingSlotProp extends CommonProps {
  id: number;
  isFilled: boolean;
}
