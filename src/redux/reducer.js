// import { POST_PRODUCT } from './typeAction.js'
// import { CELL_DETAIL } from './actions.js'

const {
  GET_ALL_PRODUCTS,
  CELL_DETAIL,
  POST_PRODUCT
} = require('./typeAction.js')

const initialState = {
  products: [],
  details: []
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload
      }
    case CELL_DETAIL:
      return ({
        ...state,
        details:action.payload 
      })
    case POST_PRODUCT:
      return {
        ...state,
      }
      case "clean estado":
        return({
          ...state,
          details:[]
        })
    default:
      return state
  }
}

export default rootReducer;