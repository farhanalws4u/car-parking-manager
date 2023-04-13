import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CarDetailsProps } from "./reduxTypes";

//1. Navigator types
export type RootStackParamList = {
  Starter: undefined;
  Home: undefined;
  Registration: undefined;
  DeRegistration: {
    slotId: number;
  };
};

//2. components props types

// global props for component
export type IProps = {
  parkingSlots: Array<{ id: number; isFilled: boolean }>;
  [key: string]: string | number | Function | object | boolean;
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export type DeRegistrationProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  parkingSlots: Array<{ id: number; isFilled: boolean }>;
  [key: string]:
    | string
    | number
    | Function
    | object
    | boolean
    | Array<CarDetailsProps>;
};

export interface ParkingSlotProp {
  [key: string]: string | number | Function | object | boolean;
  navigation: NativeStackNavigationProp<RootStackParamList>;
  id: number;
  isFilled: boolean;
}
