const {
  GET_ALL_PRODUCTS,
  GET_CELLS_BY_ID
} = require('./actions.js')

const initialState = {
  products: [],
  details:[]
}

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload
      }
      case GET_CELLS_BY_ID:
        return{
          ...state,
          details: {...action.payload},
        }
    default:
       return state
  }
}