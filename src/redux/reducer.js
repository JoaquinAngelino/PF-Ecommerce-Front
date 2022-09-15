import { GET_CELL, POST_PRODUCT } from './typeAction';
const initialState = {
  celulares: []
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CELL:
      return {
        ...state,
        celulares: action.payload
      }
    case POST_PRODUCT:
      return {
        ...state,
      }
    default:
      return state
  }
}

export default rootReducer;