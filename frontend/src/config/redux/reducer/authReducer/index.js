import { createSlice } from "@reduxjs/toolkit";
import {
  getAboutUser,
  getAllUsers,
  getConnectionRequests,
  getMyConnectionRequests,
  loginUser,
  registerUser,
  sendConnectionRequest,
} from "../../action/authAction";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  loggedIn: false,
  message: "",
  isTokenThere: false,
  profileFetched: false,
  connection: [],
  connectionRequest: [],
  all_users: [],
  all_profiles_fetched: false,
  all_profiles: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState,
    handleLoginUser: (state) => {
      state.message = "hello";
    },
    emptyMessage: (state) => {
      state.message = "";
    },
    setTokenIsThere: (state) => {
      state.isTokenThere = true;
    },
    setTokenIsNotThere: (state) => {
      state.isTokenThere = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.message = "knocking the door ...";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.loggedIn = true;
        state.message = "Login is Successfull";
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.message = "Registering You...";
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;

        state.message = {
          message: "Registration is Successfull! Please Log In ",
        };
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAboutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.profileFetched = true;
        state.user = action.payload;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.all_users = action.payload.profiles;
        state.all_profiles = action.payload.profiles;
        state.all_profiles_fetched = true;
      })
      .addCase(getConnectionRequests.fulfilled,(state,action)=>{
        state.connection = action.payload
      })
      .addCase(getConnectionRequests.rejected,(state,action)=>{
        state.message = action.payload
      })
      .addCase(getMyConnectionRequests.fulfilled,(state,action)=>{
        state.connectionRequest = action.payload.connections
      })
      .addCase(getMyConnectionRequests.rejected,(state,action)=>{
        state.message = action.payload;
      })
      // removed the state.connection.push(action.payload) here: the API response is
      // just a message, not a connection record, so it corrupted the list.
      // The thunk now refetches the real lists instead.
      .addCase(sendConnectionRequest.rejected, (state, action) => {
        state.message = action.payload;
      })
  },
});

export const { reset, emptyMessage, setTokenIsThere, setTokenIsNotThere } =
  authSlice.actions;
export default authSlice.reducer;