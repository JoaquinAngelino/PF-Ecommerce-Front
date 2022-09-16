import axios from 'axios';

// export const GET_ALL_PRODUCTS = ''
// export const GET_CELLS_BY_ID = 'G'
import {
   GET_ALL_PRODUCTS,
   ET_CELLS_BY_ID,
   POST_PRODUCT
} from './typeAction'

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
      const products = await axios(`http://localhost:3001/celulares/${payload}`);

      return dispatch({
         type: GET_ALL_PRODUCTS,
         payload: products.data
      });
   };
}
export const createPost = (payload) => {
   console.log(payload, 'soy lo que llega del front')
   return async (dispatch) => {
      const createProduct = await axios.post('https://localhost:3001/celulares', payload)
      console.log(createProduct, 'soy lo que llega hacia el back')
      return dispatch({
         type: POST_PRODUCT,
         payload: createProduct.data
      })
   }
}
