// import { POST_PRODUCT } from './typeAction.js'

const {
  GET_ALL_PRODUCTS,
  GET_ALL_BRANDS,
  GET_CELLS_BY_ID,
  POST_PRODUCT
} = require('./typeAction.js')

const initialState = {
  products: [],
  details: [],
  brands: [],
  product: {}

}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload
      }
      case GET_ALL_BRANDS:
        return {
          ...state,
          brands: action.payload
        } 
    
    case GET_CELLS_BY_ID:
      return {
        ...state,
        details: { ...action.payload },
      }
    default:
      return state
  }
}

export default rootReducer;