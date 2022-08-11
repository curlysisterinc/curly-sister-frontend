import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";

const combinedReducer = combineReducers({
  authState: authReducer,
});

const rootReducer = (state, action) => {
  // if (action.type === "user/logOut") {
  //   state = undefined;
  // }
  return combinedReducer(state, action);
};

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [],
        // // Ignore these field paths in all actions
        // ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // // Ignore these paths in the state
        // ignoredPaths: ['items.dates'],
      },
    }),
});
