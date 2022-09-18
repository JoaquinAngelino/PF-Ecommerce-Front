import axios from "axios";

export const GET_ALL_PRODUCTS  = 'GET_ALL_PRODUCTS'
export const ACTIVE_LOADING = "ACTIVE_LOADING";
export const POST_PRODUCT = "POST_PRODUCT";
export const GET_ALL_BRANDS = "GET_ALL_BRANDS"; 


export const getAllProducts = () => {
  return async function (dispatch) {
      const products = await axios('http://localhost:3001/celulares');
      return dispatch({
          type: GET_ALL_PRODUCTS,
          payload: products.data
      });
  };
};
export const getFilteredProducts = (payload) => {
  return async function (dispatch) {
      const products = await axios(`http://localhost:3001/celulares?${payload}`);
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

export const getAllBrands = () => {
  return async function (dispatch) {
     const products = await axios('http://localhost:3001/marcas');

     return dispatch({
        type: GET_ALL_BRANDS,
        payload: products.data
     });
  };
};

export function createPost(product) {
  return async function (dispatch) {
    return await axios
      .post("http://localhost:3001/celulares", product)
      .then((response) => {
        dispatch({
          type: POST_PRODUCT,
          payload: response.data,
        });
      });
  };
}