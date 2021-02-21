import { CoordsType, FigureDataType } from "./../types";
import { InferActionsTypes } from "./reduxStore";

let initialState = {
  isDragging: false,
  coords: null as CoordsType | null,
  figuresData: null as FigureDataType | null,
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

    case "DRAG_START": {
      return {
        ...state,
        figuresData: action.figuresData,
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
  onDragStartActionCreator: (figuresData: FigureDataType) =>
    ({
      type: "DRAG_START",
      figuresData,
    } as const),
};

type ActionsType = InferActionsTypes<typeof actions>;
