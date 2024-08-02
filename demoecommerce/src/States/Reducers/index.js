// we will export all reducers by combining in one form
import { combineReducers } from "redux";
import productReducer from "./productReducer";
import cartReducer from './cartReducer'

const  reducers = combineReducers({
    products: productReducer,   // here amount is a reducer.... we can add other reducer functions here
    cartProducts: cartReducer
})

export default reducers;