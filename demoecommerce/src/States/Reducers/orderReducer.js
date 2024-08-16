const initialState = {
    orderProducts: [],
    lastEvaluatedKey: null,
    loading: false,
    hasMore: true
  };
  
  const orderReducer = (state = initialState, action) => {
    console.log("From reducer ",action.payload)
    switch (action.type) {
      case "FETCH_ORDERS":
        return {
            ...state,
            orderProducts: [...action.payload.orders],
            lastEvaluatedKey: action.payload.lastEvaluatedKey,
            loading: false,
            hasMore: !!action.payload.lastEvaluatedKey
          };
          default:
            return state;
    
    }
  };
  
  export default orderReducer;