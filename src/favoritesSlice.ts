import {createSlice} from  "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import type {User} from "./types";
import {loadFavorites} from "./storage";

const initialState: User[] = loadFavorites();

const favoritesSlice = createSlice({
  name:"favorites",
  initialState,
  reducers:{
    addFavorite: (state, action: PayloadAction<User>) => {
      if(!state.some(user => user.id === action.payload.id)){
        state.push(action.payload)
      }
    },
    removeFavorite:(state, action: PayloadAction<number>) => {
      return state.filter(user => user.id !== action.payload)
    }
  }
})

export const {addFavorite, removeFavorite} = favoritesSlice.actions;
export default favoritesSlice.reducer;
