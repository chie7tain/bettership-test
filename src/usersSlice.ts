import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import type {User} from "./types";

interface UsersState {
  data: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {data: [], loading: false, error: null};

 export const fetchUsers = createAsyncThunk<User[]>("users/fetchUsers", async ()=> {
  const res = await axios.get<User[]>("https://jsonplaceholder.typicode.com/users");
  return res.data;
})

const usersSlice = createSlice({
  name:"users",
  initialState,
  reducers: {},
  extraReducers:(builder) => {
    builder
     .addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
     })
     .addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
     })
     .addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Failed to load users";
     })
  }
})

export default usersSlice.reducer;
