import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import {  fetchProduct } from '../States/Actions/productsActions';
import Button from '@mui/material/Button';
import { updateCart } from '../States/Actions/cartActions';
import 'react-toastify/dist/ReactToastify.css';
import { Typography, Paper, Box } from "@mui/material";

const SingleProduct = () => {
    const navigate = useNavigate();
    const { product_id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector((state) => state.products.product ); 
    
    const handleAddCart = (product) => {
        dispatch(updateCart(product))
    }

    useEffect(() => {
        dispatch(fetchProduct(product_id)); 
      },[dispatch,product_id]);
      console.log(product)
    return(
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh', // Makes sure the box takes up the full height of the viewport
            backgroundColor: '#f0f0f0', // Optional: background color for the container
          }}>
            <Paper elevation={3}
        sx={{
          padding: '20px',
          width: '300px',
          textAlign: 'center',
        }} >
            <Typography>Name: {product.name}</Typography>
            <Typography>Category: {product.category}</Typography>
            <Typography>Sub-Category: {product.subcategory}</Typography>
            <Typography>Price: {product.price}</Typography>
            <Typography>Product_ID: {product.product_id}</Typography>
            <Button onClick={()=> handleAddCart(product)}>Add to Cart</Button>
        </Paper>
        </Box>
        
    )
}

export default SingleProduct;