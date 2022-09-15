import {
   POST_PRODUCT
} from './typeAction.js';

let initialState = {
   celular: []
}

const rootReducer = (state = initialState, action) => {
   switch (action.type) {
      case POST_PRODUCT:
         return {
            ...state,
         }
      default:
         return state
   }
}