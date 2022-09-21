import axios from "axios";

export const RUTA_ID = "http://localhost:3001/celulares/"
export const GET_ADMIN = "GET_ADMIN";
export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
export const GET_ALL_BRANDS = "GET_ALL_BRANDS";
export const GET_ALL_QUESTION = "GET_ALL_QUESTION";
export const ACTIVE_LOADING = "ACTIVE_LOADING";
export const CELL_DETAIL = "CELL_DETAIL"
export const POST_PRODUCT = "POST_PRODUCT";
export const POST_QUESTION = "POST_QUESTION";
export const PUT_QUESTION = "PUST_QUESTION";


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

export function createQuestion(question) {
   return async function (dispatch) {
      try {
         return await axios
            .post(`http://localhost:3001/questions/${question.id}`, question)
            .then((response) => {
               dispatch({
                  type: POST_QUESTION,
                  payload: response.data,
               });
            });
      } catch (error) {
         console.log(error)
      }
   };
}

export function createAnswer(a) {
   return async function (dispatch) {
      return await axios
         .put(`http://localhost:3001/questions/${a.id}`, a)
         .then((response) => {
            dispatch({
               type: PUT_QUESTION,
               payload: response.data,
            });
         });
   };
}

export function getRole(email) {
   return async function (dispatch) {
      try {
         var admin = await axios.get(`http://localhost:3001/questions/role/${email}`)
         return dispatch({
            type: GET_ADMIN,
            payload: admin.data
         })
      } catch (error) {
         console.log(error)
      }
   }
}
