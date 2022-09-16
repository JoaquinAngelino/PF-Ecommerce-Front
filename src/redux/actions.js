import axios from 'axios';

export const GET_ALL_PRODUCTS  = 'GET_ALL_PRODUCTS'
export const GET_CELLS_BY_ID= 'GET_CELLS_BY_ID'


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
  // export function getCellsById() {
  //   return async (dispatch)=> {
  //       const cellDetails = await axios("http://localhost:3001/celulares"/+id);
  
  //       return dispatch({
  //           type: GET_CELLS_BY_ID,
  //           payload: cellDetails.data
  //       });
  //   };
  // }
}