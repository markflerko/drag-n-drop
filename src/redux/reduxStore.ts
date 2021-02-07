import { Action, combineReducers, compose, createStore } from 'redux';
import figuresContainerReducer from './profileReducer';

let reducers = combineReducers({
  figuresContainer: figuresContainerReducer,
});

export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[]) => infer U } ? U : never;

type RootReducerType = typeof reducers;
export type AppStateType = ReturnType<RootReducerType>;

// @ts-ignore
const composeEnhacers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(reducers, composeEnhacers());

//@ts-ignore
window.__store__ = store;

export default store;