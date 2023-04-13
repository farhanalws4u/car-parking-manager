import {
  createStore,
  applyMiddleware,
  Reducer,
  EmptyObject,
  Middleware,
  compose,
} from "redux";
import thunk from "redux-thunk";
import { reducers } from "./reducers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { PersistGate } from "redux-persist/lib/integration/react";
import { CombinedReduxStateProp } from "../types/reduxTypes";
import { PersistPartial } from "redux-persist/lib/persistReducer";
import hardSet from "redux-persist/es/stateReconciler/hardSet";

// designing create store function.
const create = (
  reducers: Reducer<EmptyObject & CombinedReduxStateProp & PersistPartial>,
  middlewares: Middleware[]
) => {
  return createStore(reducers, compose(applyMiddleware(...middlewares)));
};

// defining all middlwares array.
const middlewares: Middleware[] = [thunk];

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  stateReconciler: hardSet,
  whiteList: ["parkingSlots", "carsDetails"],
  // blacklist:['carsDetails']  if we want not to include any state
};

const persistedReducer = persistReducer<any>(persistConfig, reducers);

export const store = create(persistedReducer, middlewares);

export const persistor = persistStore(store);

export default store;
