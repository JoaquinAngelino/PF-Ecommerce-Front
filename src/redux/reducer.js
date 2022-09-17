const {
  GET_ALL_PRODUCTS,
  ACTIVE_LOADING,
} = require('./actions.js')

const initialState = {
  products: [],
  isLoading: true
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
    default:
      return state
  }
}