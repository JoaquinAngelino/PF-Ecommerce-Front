/*import { compose, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";
import thunk from "redux-thunk";

const composeEnhancers =
    (typeof window !== 'undefined' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const store = configureStore(
    { reducer: rootReducer },
    composeEnhancers(applyMiddleware(thunk)),
);

export default store;*/
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from "./reducer";
import thunk from 'redux-thunk';


const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);


export default store;