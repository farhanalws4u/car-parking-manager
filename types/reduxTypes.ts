//1. Redux states types

export type CombinedReduxStateProp = CarDetailsProps | ParkingSlotProp;

export interface CarDetailsProps {
  customerName: string;
  carModel: string;
  registrationNumber: string;
  slotId: number;
  startTime: Date;
}
export interface ParkingSlotProp {
  id: number;
  isFilled: boolean;
}

//2. redux action type..
export interface ActionProps<T, P> {
  readonly type: T;
  readonly payload?: P;
}
