import {
   GET_CELL,
   POST_PRODUCT
} from './typeAction';
import axios from 'axios';


export const getCelulares = () => {
   return async (dispatch) => {
      const getCell = await axios.get('http://localhost:3001/celulares')
      return dispatch({
         type: GET_CELL,
         payload: getCell
      })
   }
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