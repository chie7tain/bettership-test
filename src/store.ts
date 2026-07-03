import {configureStore} from "@reduxjs/toolkit";
import usersReducer from "./usersSlice"
import favoritesReducer from "./favoritesSlice"

const store = configureStore({
  reducer:{
    users:usersReducer,
    favorites:favoritesReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
