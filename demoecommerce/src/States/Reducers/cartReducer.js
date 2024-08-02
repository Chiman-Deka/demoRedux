import {
    FETCH_CART_REQUEST,
    FETCH_CART_SUCCESS,
    FETCH_CART_FAILURE,
    UPDATE_CART_REQUEST,
    UPDATE_CART_SUCCESS,
    UPDATE_CART_FAILURE,
  } from '../Actions/cartActions';
  
  const initialState = {
    loading: false,
    cartProducts: [],
    error: '',
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_CART_REQUEST:
      case UPDATE_CART_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_CART_SUCCESS:
      case UPDATE_CART_SUCCESS:
        return {
          loading: false,
          cartProducts: action.payload,
          error: '',
        };
      case FETCH_CART_FAILURE:
      case UPDATE_CART_FAILURE:
        return {
          loading: false,
          cartProducts: {},
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default cartReducer;
  