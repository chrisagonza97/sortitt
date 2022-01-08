import { createSlice } from '@reduxjs/toolkit';

const initialState= {
    searchTerm:'',
    searchPosts:true,
    searchThisSub:false,
    searchSubreddits: false
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers:{
        setSearchPosts(state,action){
            state.searchPosts=action.payload;
        },
        setSearchThisSub(state,action){
            state.searchThisSub=action.payload;
        },
        setSearchSubreddits(state,action){
            state.searchSubreddits=action.payload;
        },
        setSearchTerm(state, action) {
            state.searchTerm=action.payload
        }
    }
})

export const{
    setSearchPosts,
    setSearchThisSub,
    setSearchSubreddits,
    setSearchTerm
} = searchSlice.actions;

export default searchSlice.reducer