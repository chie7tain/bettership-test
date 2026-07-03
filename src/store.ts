import {configureStore} from "@reduxjs/toolkit";
import usersReducer from "./usersSlice"
import favoritesReducer from "./favoritesSlice"

export default configureStore({
  reducer:{
    users:usersReducer,
    favorites:favoritesReducer
  }
})