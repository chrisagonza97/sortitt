import { createSlice, createSelector } from '@reduxjs/toolkit';


const initialState ={
    posts: [],
    
    selectedSub: 'all',
    rendering: 'allSubredditPosts'
}

const redditSlice = createSlice({
    name: 'redditPosts',
    initialState,
    reducers:{
        
        setPosts(state,action){
            state.posts=action.payload
        },
        setRendering(state,action){
            state.rendering=action.payload
        }
    }
})

export const {
    setPosts,
    setRendering
} = redditSlice.actions;

export default redditSlice.reducer