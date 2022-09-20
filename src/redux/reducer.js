const {
  GET_ALL_PRODUCTS,
  ACTIVE_LOADING,
  GET_ALL_BRANDS,
  CELL_DETAIL,
  POST_PRODUCT,
  GET_ADMIN
  
} = require('./actions.js')

const initialState = {
  products: [],
  isLoading: true,
  brands:[],
  admin: false
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

    case CELL_DETAIL:
      return ({
        ...state,
        details:payload 
      })
    case POST_PRODUCT:
      return {
        ...state,
      }
    case GET_ADMIN:
      return {
        ...state,
        admin:payload
      }  
      case "clean estado":
        return({
          ...state,
          details:[]
        })

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