import { CoordsTypes } from "./../types";
import { InferActionsTypes } from "./reduxStore";

let initialState = {
  isDragging: false,
  containerTop: null as number | null,
  coords: null as CoordsTypes | null,
};

export type initialStateType = typeof initialState;

export const appReducer = (
  state = initialState,
  action: ActionsType
): initialStateType => {
  switch (action.type) {
    case "DRAG_END": {
      return {
        ...state,
        coords: { ...state.coords, x: action.x, y: action.y },
      };
    }

    case "GET_CONTAINER_TOP": {
      return {
        ...state,
        containerTop: action.top,
      };
    }

    default:
      return state;
  }
};

export const actions = {
  onDragEndActionCreator: (x: number, y: number) =>
    ({
      type: "DRAG_END",
      x,
      y,
    } as const),
    getContainerTop: (top: number) =>
    ({
      type: "GET_CONTAINER_TOP",
      top
    } as const),
  
};

type ActionsType = InferActionsTypes<typeof actions>;
