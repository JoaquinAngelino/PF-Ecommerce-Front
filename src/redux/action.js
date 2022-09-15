import axios from 'axios';
import {
   POST_PRODUCT
} from './typeAction';

export const postProductCel = (payload) => {
   // console.log(payload, 'soy el payload de postProduct')
   return async (dispatch) => {
      const createProduct = await axios.post("http://localhost:3001/cel", payload)
      // console.log(createProduct, 'soy la variable')
      return dispatch({
         type: POST_PRODUCT,
         payload: createProduct
      })
   }
}