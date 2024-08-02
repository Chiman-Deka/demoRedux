import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../States/Actions/cartActions';

const Cart = () => {
  const dispatch = useDispatch();
  const { cartProducts, loading, error } = useSelector((state) => state.cartProducts);
  console.log(cartProducts);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

//   const handleUpdateCart = (newItems) => {
//     dispatch(updateCart(newItems));
//   };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Cart</h1>
      {cartProducts.items && cartProducts.items.length > 0 ? (
        <ul>
          {cartProducts.items.map((item, index) => (
            <li key={index}>
              {item.name} - {item.price}
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
