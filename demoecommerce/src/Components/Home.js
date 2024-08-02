import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../States/Actions/productsActions';
import { updateCart } from '../States/Actions/cartActions';

// import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products || []); // Provide a default empty array
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  console.log("products",products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleAddToCart = (newProduct) => {
    console.log("Clicked",newProduct);
    dispatch(updateCart(newProduct));
  }

  return (
    <div>
      <h1>All Products</h1>
      <ul>
        {products.map((product) => (
          <Card sx={{ minWidth: 275 }}>
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
          </CardContent>
          <CardActions>
            <Button size="small" onClick={()=> handleAddToCart({product})}>Add to Cart</Button>
          </CardActions>
        </Card>

        ))}
      </ul>
    </div>
  );
};

export default Home;
