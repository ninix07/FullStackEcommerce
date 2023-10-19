import {createStore,combineReducers,applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import { productDetailReducer, productReducer } from "./reducers/productReducer";

const reducer= combineReducers({
products:productReducer,
productDetails: productDetailReducer
});
let initialState= {};
const midleware=[thunk];
const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...midleware)))

export default store;