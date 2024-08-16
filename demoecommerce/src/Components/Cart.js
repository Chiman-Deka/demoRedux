import React, { useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, placeOrder,updateCartItemCount } from '../States/Actions/cartActions';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartProducts } = useSelector((state) => state.cartProducts);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handlePlaceOrder =  () => {
    dispatch(placeOrder());
  };


  const handleIncrease = (productId) => {
    dispatch(updateCartItemCount(productId, 'increment'));
  };
  
  const handleDecrease = (productId) => {
    dispatch(updateCartItemCount(productId, 'decrement'));
  };
  

  return (
    <Box>
      <Typography><h1>Cart</h1></Typography>
    <Box sx={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      justifyContent: 'center',
    }}>
      {cartProducts && cartProducts.length > 0 ? (cartProducts.map((product)=>(
        <Card sx={{ maxWidth: 300 }}>
        <CardContent>
          <Typography variant="body2">
            Product: {product.name}
          </Typography>
          <Typography variant="body2">
            Price: {product.price}
          </Typography>
          <Typography variant="body2">
            Category: {product.category}
          </Typography>
          <Typography variant="body2">
            Sub-category: {product.subcategory}
          </Typography>
          <Typography variant="body2">
          <Button onClick={()=>handleDecrease(product.product_id)}><RemoveCircleIcon/></Button> Count: {product.count} <Button onClick={()=>handleIncrease(product.product_id)}><AddCircleIcon /></Button>
          </Typography>
        </CardContent>
      </Card>
      ))) : (
        <Typography variant="body2">
    No products in the cart
  </Typography>
      )}
    </Box>
    <Button onClick={handlePlaceOrder}>Place Order</Button>
    </Box>
  );
};

export default Cart;
