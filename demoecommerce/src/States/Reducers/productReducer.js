const initialState = {
    products: [],
    product: [],
};

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "All Products":
            return {
                ...state,
                products: action.payload,
            };   
        case "fetch single product":
            return {
                ...state,
                product: action.payload,
            };   
        default:
            return state;
    }
};

export default productsReducer;