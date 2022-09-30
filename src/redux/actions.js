import axios from "axios";

export const RUTA_ID = "/celulares/home/"
export const GET_ADMIN = "GET_ADMIN";
export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
export const GET_ALL_BRANDS = "GET_ALL_BRANDS";
export const GET_ALL_QUESTION = "GET_ALL_QUESTION";
export const ACTIVE_LOADING = "ACTIVE_LOADING";
export const CELL_DETAIL = "CELL_DETAIL"
export const POST_PRODUCT = "POST_PRODUCT";
export const POST_QUESTION = "POST_QUESTION";
export const PUT_QUESTION = "PUT_QUESTION";
export const PUT_CELL = "PUT_CELL";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const PUT_USERS = "PUT_USERS";
export const RUTA_USER="/users"
export const POST_USER="POST USER"
export const ALL_USER="ALL USER"
export const RUTA_USER_ID="/users/id/"
export const USER_ID="USER ID"
export const DELETE_FOR_CART="DELETE_FOR_CART"






export const getAllProducts = () => {
   return async function (dispatch) {
      const products = await axios('/celulares/home');
      return dispatch({
         type: GET_ALL_PRODUCTS,
         payload: products.data
      });
   };
};
export const getFilteredProducts = (payload) => {
   return async function (dispatch) {
      const products = await axios(`/celulares/home?${payload}`);
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
export function cellDetail(id) {
   return async function (dispatch) {
      try {
         var cellDetail = await axios.get(RUTA_ID + id)
         return dispatch({
            type: CELL_DETAIL,
            payload: cellDetail.data
         })
      } catch (error) {
         console.log(error)
      }
   }
}
export function cleanStatus(payload) {
   return {
      type: "clean estado",
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
//GET USER
export function allUser(){
   return async function(dispatch){
      const allUser= await axios(RUTA_USER)
      return dispatch({
         type:ALL_USER,
         payload:allUser.data
      })
   }

}
//GET USER
export const getAllBrands = () => {
   return async function (dispatch) {
      const products = await axios('/marcas');

      return dispatch({
         type: GET_ALL_BRANDS,
         payload: products.data
      });
   };
};

export function createPost(product) {
   return async function (dispatch) {
      return await axios
         .post("/celulares", product)
         .then((response) => {
            dispatch({
               type: POST_PRODUCT,
               payload: response.data,
            });
         });
   };
}
//USER ID
export function userId(id){
   return async function(dispatch){
      try{
         var userId=await axios.get(RUTA_USER_ID +id)
         return dispatch({
            type:USER_ID,
            payload:userId.data
         })
      }catch(error){
         console.log(error)
      }
   } 
}
//USER ID

export function createQuestion(question) {
   return async function (dispatch) {
      return await axios
         .post(`/questions/${question.id}`, question)
         .then((response) => {
            dispatch({
               type: POST_QUESTION,
               payload: response.data,
            });
         });
   };
}

export function getRole(email) {
   return async function (dispatch) {
      try {
         var admin = await axios.get(`/questions/role/${email}`)
         return dispatch({
            type: GET_ADMIN,
            payload: admin.data
         })
      } catch (error) {
         console.log(error)
      }
   }
}

export function createAnswer(a) {
   return async function (dispatch) {
      return await axios
         .put(`/questions/${a.id}`, a)
         .then((response) => {
            dispatch({
               type: PUT_QUESTION,
               payload: response.data,
            });
         });
   };
}

export function putCell(a) {
   return async function (dispatch) {
      return await axios
         .put(`/celulares/${a.id}`, a)
         .then((response) => {
            dispatch({
               type: PUT_CELL,
               payload: response.data,
            });
         });
   };
}

export const getAllUsers = () => {
   return async function (dispatch) {
      const users = await axios('/users/admin');
      return dispatch({
         type: GET_ALL_USERS,
         payload: users.data
      });
   };
};

export function putUser(a) {
   return async function (dispatch) {
      return await axios
         .put(`/users/${a.id}`, a)
         .then((response) => {
            dispatch({
               type: PUT_USERS,
               payload: response.data,
            });
         });
   };
}

export function updateProduct(id,payload){
   return  function(){
       axios.put(`/celulares/${id}`,payload)
   }
}


export const getFiltersProductsAdmin = (filters) => {
   return async function (dispatch) {
      const p = await axios(`/celulares/panel/?${filters}`);
      return dispatch({
         type: GET_ALL_PRODUCTS,
         payload: p.data
      });
   };
};

export function deleteItemFromCart(id) {
   return {
       type: DELETE_FOR_CART,
       payload: id
   }
}

export const getAllProductsAdmin = () => {
   return async function (dispatch) {
      const p = await axios(`/celulares/panel`);
      return dispatch({
         type: GET_ALL_PRODUCTS,
         payload: p.data
      });
   };
};