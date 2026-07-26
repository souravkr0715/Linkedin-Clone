import { createSlice } from "@reduxjs/toolkit"
import { getAboutUser, loginUser, registerUser } from "../../action/authAction"

const initialState = {
    user:[],
    isError:false,
    isSuccess:false,
    isLoading:false,
    loggedIn:false,
    message:"",
    profileFetched:false,
    connection:[],
    connectionRequest:[]
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        reset:()=>initialState,
        handleLoginUser:(state)=>{
           state.message ="hello" 
        },
        emptyMessage:(state)=>{
            state.message = ""
        }
    },

    extraReducers:(builder)=>{
        builder
        .addCase(loginUser.pending,(state)=>{
            state.isLoading = true
            state.message = "knocking the door ..."
        })
        .addCase(loginUser.fulfilled,(state , action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.loggedIn = true;
            state.message = "Login is Successfull";
        })

       .addCase(loginUser.rejected,(state,action)=>{
        state.isLoading = false;
        state.isError= true;
        state.message = action.payload
       })

       .addCase(registerUser.pending,(state)=>{
                    state.isLoading = true
            state.message = "Registering You..."
       })

       .addCase(registerUser.fulfilled,(state , action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
           
            state.message = {
                message:"Registration is Successfull! Please Log In "
            }
        })
        .addCase(registerUser.rejected,(state,action)=>{
        state.isLoading = false;
        state.isError= true;
        state.message = action.payload
       })
       .addCase(getAboutUser.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.isError = false;
        state.profileFetched = true;
        state.user = action.payload.profile
        state.connection = action.payload.connection
        state.connectionRequest = action.payload.connectionRequest

       })
    }

})

export const{reset,emptyMessage} = authSlice.actions;
export default authSlice.reducer;