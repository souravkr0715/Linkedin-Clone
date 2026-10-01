import {createSlice} from "@reduxjs/toolkit"
import { getAllComments, getAllPosts, incrementPostLike } from "../../action/postAction"
     import { getAboutUser, getAllUsers, loginUser, registerUser, getMyConnectionRequests } from "../../action/authAction"

const initialState = {
    posts:[],
    isError:false,
    postFetched:false,
    isLoading:false,
    loggedIn:false,
    message:"",
    comments:[],
    postId:"",
}


const postSlice = createSlice({
    name:"post",
    initialState,
    reducers:{
        reset:()=>initialState,
        resetPostId:(state)=>{
            state.postId=""
        },
    },
extraReducers:(builder)=>{
builder
    .addCase(getAllPosts.pending,(state)=>{
        state.isLoading = true
        state.message = "Fetching all the posts..."
    })
    .addCase(getAllPosts.fulfilled,(state , action)=>{
        state.isLoading = false;
        state.isError= false;
        state.postFetched=true;
        state.posts = action.payload.posts.reverse()
    })
    .addCase(getAllPosts.rejected, (state, action) => {
    state.isLoading = false;
    state.isError = true;
    state.message = action.payload;
})
.addCase(incrementPostLike.fulfilled, (state, action) => {
    const post = state.posts.find(p => p._id === action.meta.arg.post_id);
    if (post) post.likes += 1;
})

.addCase(getAllComments.fulfilled,(state,action)=>{
    state.postId = action.payload.post_id
    state.comments = action.payload.comments
})
     .addCase(getMyConnectionRequests.fulfilled,(state,action)=>{
         state.connection = action.payload
     })
}
})

export const{resetPostId} = postSlice.actions;
export default postSlice.reducer