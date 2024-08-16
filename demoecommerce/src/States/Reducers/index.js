// we will export all reducers by combining in one form
import { combineReducers } from "redux";
import productReducer from "./productReducer";
import cartReducer from './cartReducer'
import orderReducer from "./orderReducer";

const  reducers = combineReducers({
    products: productReducer,   
    cartProducts: cartReducer,
    orderProducts: orderReducer
})

export default reducers;