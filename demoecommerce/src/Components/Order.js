import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { fetchOrders } from "../States/Actions/orderAction";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { Paper } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Order = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orders = useSelector((state) => state.orderProducts.orderProducts);
  const lastEvaluatedKey = useSelector(
    (state) => state.orderProducts.lastEvaluatedKey
  );
  const loading = useSelector((state) => state.orderProducts.loading);
  const hasMore = useSelector((state) => state.orderProducts.hasMore);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const loadMoreOrders = () => {
    if (!loading && hasMore) {
      dispatch(fetchOrders(lastEvaluatedKey));
    }
  };

  return (
    <div>
        <Typography><h2>Recent Orders</h2></Typography>
        <Box sx={{ display: 'flex' }}>
    {orders.map(order=> (
        // <div>
            <Paper >
        <CardContent>
          <Typography variant="h7" component="div">
            Order ID: {order.PK.slice(6)}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Time: {order.time}
          </Typography>
          {order.items.map(item=>(
            <Paper sx={{
                backgroundColor: '#fbfdc2',
                margin: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center', 
              }}>
                <Typography variant="h7" component="div">
                    Product: {item.name}
                </Typography>
                <Typography variant="h7" component="div">
                    Quantity: {item.count}
                </Typography>
                <Typography variant="h7" component="div">
                    Price: {item.price}
                </Typography>
            </Paper>
          ))}
        </CardContent>
        </Paper>
        // </div>
    ))}
    </Box>
    </div>
  );
};

export default Order;
