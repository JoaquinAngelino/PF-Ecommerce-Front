import axios from "axios";

export const GET_ALL_PRODUCTS  = 'GET_ALL_PRODUCTS'
export const ACTIVE_LOADING = "ACTIVE_LOADING";
export const POST_PRODUCT = "POST_PRODUCT";
export const GET_ALL_BRANDS = "GET_ALL_BRANDS"; 
export const CELL_DETAIL="CELL_DETAIL"
export const RUTA_ID="http://localhost:3001/celulares/"
export const POST_USER="POST USER"
export const RUTA_USER="http://localhost:3001/users"


// export const RUTA_ID="http://localhost:3001/celulares/"
// export const CELL_DETAIL="DOG DETAIL"

// export const GET_ALL_PRODUCTS = ''
// export const GET_CELLS_BY_ID = 'G'



export const getAllProducts = () => {
  return async function (dispatch) {
      const products = await axios('http://localhost:3001/celulares');
      return dispatch({
          type: GET_ALL_PRODUCTS,
          payload: products.data
      });
  };
};
export const getFilteredProducts = (payload) => {
  return async function (dispatch) {
      const products = await axios(`http://localhost:3001/celulares?${payload}`);
      return dispatch({
          type: GET_ALL_PRODUCTS,
          payload: products.data
      });
  };
};

export const activeLoading = () => {
  return function (dispatch) {
      return dispatch({
          type: ACTIVE_LOADING
      });
  };
}


//CELL_DETAIL
export function cellDetail(id){
   return async function(dispatch){
      try{
         var cellDetail=await axios.get(RUTA_ID +id)
         return dispatch({
            type:CELL_DETAIL,
            payload:cellDetail.data
         })
      }catch(error){
         console.log(error)
      }
   }
}
export function cleanStatus(payload){
   return {
      type:"clean estado",
      payload
   }
}
//CELL_DETAIL
//POST USER
export function postUser(user){
return async function(dispatch){
   return await axios.post(RUTA_USER, user)
   .then((response)=>{
      dispatch({
         type:POST_USER,
         payload:response.data
      })
   })
}
}
//POST USER
export const getAllBrands = () => {
  return async function (dispatch) {
     const products = await axios('http://localhost:3001/marcas');

     return dispatch({
        type: GET_ALL_BRANDS,
        payload: products.data
     });
  };
};

export function createPost(product) {
  return async function (dispatch) {
    return await axios
      .post("http://localhost:3001/celulares", product)
      .then((response) => {
        dispatch({
          type: POST_PRODUCT,
          payload: response.data,
        });
      });
  };
}

