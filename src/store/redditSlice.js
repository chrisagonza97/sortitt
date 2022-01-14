import { createSlice, createSelector } from '@reduxjs/toolkit';


const initialState ={
    posts: [],
    subreddits:[],
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
        },
        setSubreddits(state,action){
            state.subreddits = action.payload
        },
        setSelectedSub(state,action){
            state.selectedSub = action.payload
        }
    }
})

export const {
    setPosts,
    setRendering,
    setSubreddits,
    setSelectedSub
} = redditSlice.actions;

export default redditSlice.reducer