import { toast } from 'react-toastify';

export const fetchCartSuccess = (cartProducts) => ({
  type: "Fetch Cart",
  payload: cartProducts,
});

export const updateCartSuccess = (cart) => ({
  type: "update cart",
  payload: cart,
});

export const cartItemAdd = (product) => ({
  type: "Cart Item Add",
  product,
});

export const cartItemRemove = (product_id) => ({
  type: "Cart Item Remove",
  product_id,
});



export const fetchCart = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://hcsuugifgl.execute-api.ap-south-1.amazonaws.com/beta/cart/cartProducts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pk_value: "cart#1",
            sk_value: "cartId_1",
          }),
        }
      );
      const data = await response.json();
      console.log('Actual response from database about cart',data)
      const cartProducts = data.body.items;
      console.log("from action",cartProducts)
      if (response.status === 200) {
        dispatch(fetchCartSuccess(cartProducts));
      } else {
        throw new Error('Error failing fetching products')
      }
    } catch (error) {
      throw new Error('Enexpected Error Occured')
    }
  };
};

export const updateCart = (newItem) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://hcsuugifgl.execute-api.ap-south-1.amazonaws.com/beta/cart/updateCart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ new_item: newItem }),
        }
      );
      const data = await response.json();
      const updatedProducts = data.body;
      console.log("Updated products",updatedProducts)
      if(response.status == 200){
        dispatch(updateCartSuccess(updatedProducts));
        toast.success('Item added to cart successfully!');
      }
      else{
        toast.error('Please try again to add into the cart!');
        throw new Error('Data not fetched from API')
      }
    } catch (error) {
      throw new Error('Error failing updating products')
    }
  };
};

export const updateCartItemCount = (productId, action) => {
  return async (dispatch) => {
    try {
      const response = await fetch("https://hcsuugifgl.execute-api.ap-south-1.amazonaws.com/beta/cart/cartConfigure", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product_id: productId, action: action }),
      });
      const data = await response.json();
      if (data.statusCode === 200) {
        const updatedCart = data.body;
        dispatch({ type: "UPDATE_CART", payload: updatedCart });
        toast.success('Item added to cart successfully!');
      } else {
        toast.error('Please try again to add into the cart!');
        throw new Error('Failed to update cart item');
      }
    } catch (error) {
      console.error(error);
    }
  };
};




export const placeOrder = () => {
  return async (dispatch) => {
    try {
      const response = await fetch("https://hcsuugifgl.execute-api.ap-south-1.amazonaws.com/beta/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.status === 200) {
        dispatch(fetchCart());
        toast.success('Order Placed successfully!');
        return data;
      } else {
        toast.error('order failed!...try again please');
        throw new Error(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };
};
