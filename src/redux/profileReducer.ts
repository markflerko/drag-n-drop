import { InferActionsTypes } from "./reduxStore";

let initialState = {
  isDragging: false,
};

export type initialStateType = typeof initialState;

const figuresContainerReducer = (
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
};

export default figuresContainerReducer;

type ActionsType = InferActionsTypes<typeof actions>;
