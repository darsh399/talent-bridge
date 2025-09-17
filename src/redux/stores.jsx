import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";

import userReducer from "./reducers/userReducer";
import jobReducer from "./reducers/job/jobReducer";
const rootReducer = combineReducers({
  user: userReducer,
  job: jobReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
