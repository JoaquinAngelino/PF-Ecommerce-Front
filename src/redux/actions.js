import axios from "axios";

export const GET_ALL_PRODUCTS  = 'GET_ALL_PRODUCTS'
export const ACTIVE_LOADING = "ACTIVE_LOADING";


export const getAllProducts = () => {
  return async function (dispatch) {
      const products = await axios('/celulares');
      return dispatch({
          type: GET_ALL_PRODUCTS,
          payload: products.data
      });
  };
};
export const getFilteredProducts = (payload) => {
  return async function (dispatch) {
      const products = await axios(`/celulares?${payload}`);
      return dispatch({
          type: GET_ALL_PRODUCTS,
          payload: products.data
      });
  };
};

export const activeLoading = () => {
  return function (dispatch) {
      return dispatch({
          type: ACTIVE_LOADING
      });
  };
}