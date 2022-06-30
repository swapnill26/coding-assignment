import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import AdminReducer from "../_reducers/_rootReucer/RootReducer";
import AuthReducer from "../_reducers/_AuthReducer/AuthReducer";
import CartReducer from "../_reducers/_CastReducer/CartReducer";

const rootReducer = combineReducers({
  AdminReducer,
  AuthReducer,
  CartReducer,
});

const Middleware = applyMiddleware(thunk);

const Store = createStore(rootReducer, compose(Middleware));

export default Store;
