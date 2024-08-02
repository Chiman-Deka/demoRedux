export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const fetchProductsRequest = () => ({
    type: FETCH_PRODUCTS_REQUEST,
});
export const fetchProductsSuccess = (products) => ({
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products,
});
export const fetchProductsFailure = (error) => ({
    type: FETCH_PRODUCTS_FAILURE,
    payload: error,
});

export const fetchProducts = () => {
  return async (dispatch) => {
    dispatch(fetchProductsRequest());
    try {
      const response = await fetch('https://xb49ytvjqi.execute-api.ap-south-1.amazonaws.com/beta/getAllProducts'); // Replace with your API endpoint
      const data = await response.json();

      console.log('API response data:', data); // Log the response data

      // Parse the JSON string in the body field
      const products = JSON.parse(data.body);

      // Check if the parsed data is an array
      if (Array.isArray(products)) {
        dispatch(fetchProductsSuccess(products));
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      console.error('Error fetching products:', error); // Log the error
      dispatch(fetchProductsFailure(error.message));
    }
  };
};

