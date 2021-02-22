import { FigureDataType } from "./../types";
import { InferActionsTypes } from "./reduxStore";

let initialState = {
  isDragging: false,
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
        figuresData: { ...state.figuresData, x: action.x, y: action.y, name: action.name },
      };
    }

    default:
      return state;
  }
};

export const actions = {
  onDragEndActionCreator: (x: number, y: number, name: string) =>
    ({
      type: "DRAG_END",
      x,
      y,
      name
    } as const),
};

type ActionsType = InferActionsTypes<typeof actions>;
