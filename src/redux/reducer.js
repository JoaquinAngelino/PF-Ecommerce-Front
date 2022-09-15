import { GET_CELL, POST_PRODUCT } from './typeAction';
const initialState = {
  cells: [],
  allCell: []
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CELL:
      return {
        ...state,
        cells: action.payload,
        allCell: action.payload
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