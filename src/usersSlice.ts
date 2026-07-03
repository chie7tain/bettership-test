import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

 export const fetchUsers = createAsyncThunk("users/fetchUsers",async ()=> {
  const res = await axios.get("https://jsonplaceholder.typicode.com/users");
  console.log({res})
  return res.data;
})

const usersSlice = createSlice({
  name:"users",
  initialState:{data: [], loading:false, error:null},
  extraReducers:(builder) => {
    builder
     .addCase(fetchUsers.pending, (state) => {state.loading = true})
     .addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
     })
     .addCase(fetchUsers.rejected, (state,action) => {
      state.loading = false;
      state.error = action.error.messages;
     })
  }
})

export default usersSlice.reducer;