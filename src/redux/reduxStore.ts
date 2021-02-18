import { combineReducers, compose, createStore } from "redux";
import { appReducer } from "./appReducer";

let reducers = combineReducers({
  app: appReducer,
});

export type InferActionsTypes<T> = T extends {
  [key: string]: (...args: any[]) => infer U;
}
  ? U
  : never;

type RootReducerType = typeof reducers;
export type AppStateType = ReturnType<RootReducerType>;

// @ts-ignore
const composeEnhacers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(reducers, composeEnhacers());

//@ts-ignore
window.__store__ = store;

export default store;
