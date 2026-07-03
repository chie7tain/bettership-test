import {createSlice} from  "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name:"favorites",
  initialState:[],
  reducers:{
    addFavorite: (state, action) => {
      if(!state.find(user => user.id === action.payload.id)){
        state.push(action.payload)
      }
    },
    removeFavorite:(state, action) => {
      return state.filter(user => user.id !== action.payload)
    }
  }
})

export const {addFavorite, removeFavorite} = favoritesSlice.actions;
export default favoritesSlice.reducer;