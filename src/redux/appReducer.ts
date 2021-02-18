import { CoordsTypes } from './../types';
import { InferActionsTypes } from "./reduxStore";

let initialState = {
  isDragging: false,
  coords: null as CoordsTypes | null
};

export type initialStateType = typeof initialState;

export const appReducer = (
  state = initialState,
  action: ActionsType
): initialStateType => {
  switch (action.type) {
    case "DRAGGING": {
      return {
        ...state,
        isDragging: action.isDraggingStart,
      };
    }

    case "MOUSE_MOVE": {
      return {
        ...state,
        coords: action.coords
      };
    }

    default:
      return state;
  }
};

export const actions = {
  startDragginActionCreator: (isDraggingStart: boolean) =>
    ({
      type: "DRAGGING",
      isDraggingStart,
    } as const),
  onMouseMoveActionCreator: (coords: CoordsTypes) =>
    ({
      type: "MOUSE_MOVE",
      coords,
    } as const),
};

type ActionsType = InferActionsTypes<typeof actions>;
