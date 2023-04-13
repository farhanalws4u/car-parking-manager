import { combineReducers } from "redux";
import parkingSlotsReducer from "./parkingSlotsReducer";
import carsDetailsReducer from "./carsDetailsReducer";

export const reducers = combineReducers({
  parkingSlots: parkingSlotsReducer,
  carsDetails: carsDetailsReducer,
});
