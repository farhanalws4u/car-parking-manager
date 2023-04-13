import { ParkingSlotProp } from "../types/reduxTypes";

//1. for initializing and creating parking slots
export function initializeParkingSlots(slots: number): Array<ParkingSlotProp> {
  const parkingSlots: Array<ParkingSlotProp> = [];

  let i;

  for (i = 1; i <= slots; i++) {
    parkingSlots.push({ id: i, isFilled: false });
  }
  return parkingSlots;
}

//2. to calculate charges.
export function getCharges(date: Date): {
  totalAmount: number;
  totalHours: number;
} {
  let startDate = new Date(date);

  let dateNow = new Date();

  var diff = (dateNow.getTime() - startDate.getTime()) / 1000;

  diff /= 60 * 60;
  const totalHours = Math.abs(Math.round(diff));

  if (totalHours < 2) return { totalAmount: 0.0, totalHours };

  const TWO_HOURS_AMOUNT = 10;

  const remainingAmount = (totalHours - 2) * 10;

  const totalAmount = TWO_HOURS_AMOUNT + remainingAmount;

  console.log(remainingAmount, totalHours, totalAmount);

  return { totalAmount, totalHours };
}
