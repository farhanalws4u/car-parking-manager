import {
  CREATE_SLOTS,
  EMPTY_SLOT,
  RESET_SLOTS,
  UPDATE_SLOT,
} from "../../constants/actionTypes";
import { ParkingSlotProp } from "../../types/reduxTypes";

import { ActionProps } from "../../types/reduxTypes";

const initialState: Array<ParkingSlotProp> = [];

type createSlots = ActionProps<typeof CREATE_SLOTS, Array<ParkingSlotProp>>;
type resetSlots = ActionProps<typeof RESET_SLOTS, Array<ParkingSlotProp>>;
type updateSlot = ActionProps<typeof UPDATE_SLOT, number>;
type emptySlot = ActionProps<typeof EMPTY_SLOT, number>;

type Actions = createSlots | updateSlot | resetSlots | emptySlot; // type of action in reducer could be one of these.

const parkingSlotsReducer = (
  state = initialState,
  action: Actions
): Array<ParkingSlotProp> => {
  switch (action.type) {
    case "CREATE_SLOTS":
      return [...(action.payload || [])];

    case "UPDATE_SLOT":
      const slotIndex = state.findIndex((slot) => slot.id == action.payload);
      state[slotIndex].isFilled = true;
      return state;

    case "EMPTY_SLOT":
      const index = state.findIndex((slot) => slot.id == action.payload);
      state[index].isFilled = false;

      return state;
    case "RESET_SLOTS":
      return [];
    default:
      return state;
  }
};

export default parkingSlotsReducer;
