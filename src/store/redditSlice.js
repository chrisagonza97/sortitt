import { createSlice, createSelector } from '@reduxjs/toolkit';


const initialState ={
    posts: [],
    searchTerm: '',
    selectedSub: 'popular'
}

const redditSlice = createSlice({
    name: 'redditPosts',
    initialState,
    reducers:{
        setSearchTerm(state, action) {
            state.searchTerm=action.payload
        },
        setPosts(state,action){
            state.posts=action.payload
        }
    }
})

export const {
    setSearchTerm,
    setPosts
} = redditSlice.actions;

export default redditSlice.reducer