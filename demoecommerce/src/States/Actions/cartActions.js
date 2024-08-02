export const FETCH_CART_REQUEST = 'FETCH_CART_REQUEST';
export const FETCH_CART_SUCCESS = 'FETCH_CART_SUCCESS';
export const FETCH_CART_FAILURE = 'FETCH_CART_FAILURE';
export const UPDATE_CART_REQUEST = 'UPDATE_CART_REQUEST';
export const UPDATE_CART_SUCCESS = 'UPDATE_CART_SUCCESS';
export const UPDATE_CART_FAILURE = 'UPDATE_CART_FAILURE';

export const fetchCartRequest = () => ({
    type: FETCH_CART_REQUEST,
  });
  
  export const fetchCartSuccess = (cartProducts) => ({
    type: FETCH_CART_SUCCESS,
    payload: cartProducts,
  });
  
  export const fetchCartFailure = (error) => ({
    type: FETCH_CART_FAILURE,
    payload: error,
  });

export const updateCartRequest = () => ({
  type: UPDATE_CART_REQUEST,
});

export const updateCartSuccess = (cart) => ({
  type: UPDATE_CART_SUCCESS,
  payload: cart,
});

export const updateCartFailure = (error) => ({
  type: UPDATE_CART_FAILURE,
  payload: error,
});



export const fetchCart = () => {
    return async (dispatch) => {
      dispatch(fetchCartRequest());
      try {
        const response = await fetch('https://wpic2zth6j.execute-api.ap-south-1.amazonaws.com/beta/cartItems', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({
            pk_value: 'cart#1',
            sk_value: 'cartId_1',
          }),
        });
        const data = await response.json();
        const cartProducts = JSON.parse(data.body);
        if (response.status === 200) {
          dispatch(fetchCartSuccess(cartProducts));
        } else {
          dispatch(fetchCartFailure(cartProducts.error));
        }
      } catch (error) {
        dispatch(fetchCartFailure(error.message));
      }
    };
}
export const updateCart = (newItems) => {
  return async (dispatch) => {
    dispatch(updateCartRequest());
    try {
      const response = await fetch('https://dw2y3kcqz7.execute-api.ap-south-1.amazonaws.com/beta/updateCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ new_items: newItems }),
      });
      const data = await response.json();
      dispatch(updateCartSuccess(data));
    } catch (error) {
      dispatch(updateCartFailure(error.message));
    }
  };
};
