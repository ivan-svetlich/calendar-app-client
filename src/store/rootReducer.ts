import { AnyAction, combineReducers, Reducer } from "@reduxjs/toolkit";
import { eraseCookie } from "../services/cookies/cookies";
import messageReducer from "./slices/messageSlice";
import userReducer, { LOGOUT } from "./slices/userSlice";
import { RootState } from "./store";

const rootReducer = combineReducers({
  user: userReducer,
  message: messageReducer,
});

const appReducer: Reducer<any, any> = (state: RootState, action: AnyAction) => {
  if (action.type === LOGOUT) {
    eraseCookie("id_token");

    return rootReducer(undefined, action);
  }
  return rootReducer(state, action);
};

export default appReducer;
