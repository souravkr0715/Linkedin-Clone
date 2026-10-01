import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";
// removed: import { connection } from "next/server";  (unused, not needed)

export const loginUser = createAsyncThunk(
    "user/login",
    async(user,thunkAPI)=>{
       try{
        const response = await clientServer.post(`/login`,{
            email:user.email,
            password:user.password
        });

        if(response.data.token){
localStorage.setItem("token",response.data.token)
        }
else{
    return thunkAPI.rejectWithValue({
        message:"token not provided"
    })
}

return thunkAPI.fulfillWithValue(response.data.token)

       }catch(error){
        return thunkAPI.rejectWithValue(error.response.data)
       }
    }
)

export const registerUser = createAsyncThunk(
    "user/register",
    async(user,thunkAPI)=>{
        try{
            const request  = await clientServer.post("/register",{
                username:user.username,

                password:user.password,

                email:user.email,
                name:user.name,
            })
        }catch(err){

  console.log("Registration error:", err.response?.data);

  return thunkAPI.rejectWithValue(err.response?.data);

        }
    }
)

export const getAboutUser = createAsyncThunk(
    "user/getAboutUser",
    async(user,thunkAPI)=>{
        try{
            const response = await clientServer.get("/get_user_and_profile",{
              params:{
                  token:user.token
              }
            })

            return thunkAPI.fulfillWithValue(response.data)
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data)
        }
    }
)

export const getAllUsers = createAsyncThunk(
    "user/getAllUsers",
    async(_,thunkAPI)=>{
        try{
            const response = await clientServer.get("/user/get_all_users")
            return thunkAPI.fulfillWithValue(response.data)
        }catch(err){
           return thunkAPI.rejectWithValue(err.response.data)
        }
    }
)

export const sendConnectionRequest = createAsyncThunk(
    "user/sendConnectionRequest",
    async(user,thunkAPI)=>{
        try{
            const response = await clientServer.post("/user/send_connection_request",{
                token:user.token,
                connectionId:user.connectionId
            })

            // refetch both lists so the button changes to Pending without a reload
            thunkAPI.dispatch(getConnectionRequests({token:user.token}))
            thunkAPI.dispatch(getMyConnectionRequests({token:user.token}))

            return thunkAPI.fulfillWithValue(response.data)
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data)
        }
    }
)

export const getConnectionRequests = createAsyncThunk(
    "user/user_connection_request",
    async(user,thunkAPI)=>{
        try{
            const response = await clientServer.get("/user/user_connection_request", {  // was "/user/getConnectionRequests"
              params:{
                  token:user.token
              }
            })
            return thunkAPI.fulfillWithValue(response.data)
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data)
        }
    }
)

export const getMyConnectionRequests = createAsyncThunk(
    "user/getMyConnectionRequests",
    async(user,thunkAPI)=>{
        try{
            const response = await clientServer.get("/user/getMyConnectionRequests",{
              params:{
                  token:user.token
              }
            })
            return thunkAPI.fulfillWithValue(response.data)
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data)
        }
    }
)

export const AcceptConnection = createAsyncThunk(
    "user/AcceptConnection",
    async (user, thunkAPI) => {
        try {
            const response = await clientServer.post(
                "/user/accept_connection_request",
                {
                    token: user.token,
                    requestId: user.connectionId,
                    action_type: user.action
                }
            );

            // refetch both lists so the accepted status shows up immediately
            thunkAPI.dispatch(getConnectionRequests({token:user.token}))
            thunkAPI.dispatch(getMyConnectionRequests({token:user.token}))

            return thunkAPI.fulfillWithValue(response.data);

        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data);
        }
    }
);