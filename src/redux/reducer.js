const {
  GET_ALL_PRODUCTS,
  ACTIVE_LOADING,
  GET_ALL_BRANDS,
  CELL_DETAIL,
  POST_PRODUCT,
  GET_ADMIN,
  GET_ALL_USERS
} = require('./actions.js')

const initialState = {
  products: [],
  allProducts: [],
  isLoading: true,
  brands: [],
  admin: false,
  users: []
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
        details: payload
      })
    case POST_PRODUCT:
      return {
        ...state,
      }
    case GET_ADMIN:
      return {
        ...state,
        admin: payload
      }
    case "clean estado":
      return ({
        ...state,
        details: []
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

      case GET_ALL_USERS:
        return {
          ...state,
          users: payload
        }

    default:
      return state
  }
}