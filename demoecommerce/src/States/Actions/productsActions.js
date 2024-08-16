export const fetchProductsSuccess = (products) => ({
    type: "All Products",
    payload: products,
});

export const fetchSingleProduct = (product) => ({
    type: "fetch single product",
    payload: product,
});


export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('https://hcsuugifgl.execute-api.ap-south-1.amazonaws.com/beta/products'); 
      const data = await response.json();

      console.log('API response data:', data); 

      const products = data.body;

      if (Array.isArray(products)) {
        dispatch(fetchProductsSuccess(products));
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      console.error('Error fetching products:', error); 
    }
  };
};

export const fetchProduct = (product_id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://hcsuugifgl.execute-api.ap-south-1.amazonaws.com/beta/products/single",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product_id: product_id
          }),
        }
      );
      const data = await response.json();
      const singleProduct = data.body;
      if (response.status === 200) {
        dispatch(fetchSingleProduct(singleProduct));
      } else {
        throw new Error('Error failing fetching products')
      }
    } catch (error) {
      throw new Error('Enexpected Error Occured')
    }
  };
};
