import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProducts, fetchProduct } from '../States/Actions/productsActions';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';



const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products ); 

  useEffect(() => {
    dispatch(fetchProducts());
  },[]);

  return (
    <div>
      <h1>All Products</h1>
      <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
                justifyContent: 'center',
              }}>
        {products.map((product) => (
          <Card sx={{minWidth: '500'}}>
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
            <Button size="small" onClick={()=> navigate(`/product/${product.product_id}`)}>Details</Button>
          </CardActions>
        </Card>

        ))}
      </Box>
    </div>
  );
};

export default Home;
