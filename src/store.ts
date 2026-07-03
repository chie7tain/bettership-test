import {configureStore} from "@reduxjs/toolkit";
import usersReducer from "./usersSlice"
import favoritesReducer from "./favoritesSlice"
import {saveFavorites} from "./storage";

const store = configureStore({
  reducer:{
    users:usersReducer,
    favorites:favoritesReducer
  }
})

// Persist favorites to localStorage whenever they change.
let lastFavorites = store.getState().favorites;
store.subscribe(() => {
  const favorites = store.getState().favorites;
  if (favorites !== lastFavorites) {
    lastFavorites = favorites;
    saveFavorites(favorites);
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
