const {
  GET_ALL_PRODUCTS
} = require('./actions.js')

const initialState = {
  products: []
}

export default function rootReducer(state = initialState, {type, payload}) {
  switch (type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: payload
      }
    default:
       return state
  }
}