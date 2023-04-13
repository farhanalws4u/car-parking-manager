import { Dispatch } from "redux";
import {
  CREATE_SLOTS,
  EMPTY_SLOT,
  RESET_SLOTS,
  UPDATE_SLOT,
} from "../../constants/actionTypes";
import { ActionProps } from "../../types/reduxTypes";
import { ParkingSlotProp } from "../../types/reduxTypes";

export const createSlots =
  (allSlots: Array<ParkingSlotProp>) =>
  (
    dispatch: Dispatch<ActionProps<typeof CREATE_SLOTS, Array<ParkingSlotProp>>>
  ) => {
    dispatch({ type: CREATE_SLOTS, payload: allSlots });
  };

export const resetSlots =
  () => (dispatch: Dispatch<ActionProps<typeof RESET_SLOTS, null>>) => {
    dispatch({ type: RESET_SLOTS, payload: null });
  };

export const updateSlot =
  (slotId: number) =>
  (dispatch: Dispatch<ActionProps<typeof UPDATE_SLOT, number>>) => {
    dispatch({ type: UPDATE_SLOT, payload: slotId });
  };

export const emptySlot =
  (slotId: number) =>
  (dispatch: Dispatch<ActionProps<typeof EMPTY_SLOT, number>>) => {
    dispatch({ type: EMPTY_SLOT, payload: slotId });
  };
