import { toast } from 'react-toastify';

export const fetchOrderSuccess = (orders, lastEvaluatedKey) => ({
    type: 'FETCH_ORDERS',
    payload: { orders, lastEvaluatedKey }
  });

export const fetchOrders = (startKey = null) => async (dispatch) => {  
    try {
      const response = await fetch('https://hcsuugifgl.execute-api.ap-south-1.amazonaws.com/beta/order/lastFiveOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ LastEvaluatedKey: startKey }),
      });
  
      const data = await response.json();
      console.log("Response data from action page",data)
      if (data.statusCode === 200) {
        dispatch(fetchOrderSuccess(data.data, data.LastEvaluatedKey));
      } else {
        toast.error('Error Occured while fetching orders!');
        throw new Error('Data not fetched from API')
      }
    } catch (error) {
        toast.error('Error Occured while fetching orders!');
        throw new Error('Error occured while fetching')
    }
  };