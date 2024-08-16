const initialState = {
  cartProducts: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "Fetch Cart":
      console.log("from Reducer here", action.payload);
      return {
        ...state,
        cartProducts: action.payload,
      };
    case "cartUpdate":
      return {
        ...state,
        cartProducts: action.payload,
      };
    case "UPDATE_CART":
      return {
        ...state,
        cartProducts: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
