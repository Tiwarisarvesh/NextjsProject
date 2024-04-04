const initialState = {
  count: 0,
};

export const counterReducer = (state = "5", action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        count: state.count + action.paylaod,
      };
  }

  switch (action.type) {
    case "DECREMENT":
      return {
        ...state,
        count: state.count - action.paylaod,
      };

    default:
      return state;
  }
};
