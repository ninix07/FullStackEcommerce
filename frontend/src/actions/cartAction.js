import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstant";
import axios from "axios";

export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  console.log("Entered");
  const { data } = await axios.get(`/api/v1/products/${id}`);
  console.log(data);
  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0],
      stock: data.product.stock,
      quantity,
    },
  });
  console.log(getState());
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
