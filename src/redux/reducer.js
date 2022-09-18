const {
  GET_ALL_PRODUCTS,
  ACTIVE_LOADING,
  GET_ALL_BRANDS
} = require('./actions.js')

const initialState = {
  products: [],
  isLoading: true,
  brands:[]
}

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_ALL_PRODUCTS:
      if (!payload) { return state }
      return {
        ...state,
        products: payload,
        isLoading: false
      }
    //-----------------
    //-----------------
    case ACTIVE_LOADING:
      return {
        ...state,
        isLoading: true
      }

    case GET_ALL_BRANDS:
      return {
        ...state,
        brands: payload
      }   
    default:
      return state
  }
}