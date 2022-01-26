import { createSlice } from '@reduxjs/toolkit';

const initialState= {
    searchTerm:'',
    searchPosts:true,
    searchThisSub:false,
    searchSubreddits: false,
    beforeDate:'',
    afterDate:'',
    beforeSearch:false,
    afterSearch:false,
    safeSearch:true
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
        },
        setBeforeDate(state,action){
            state.beforeDate=action.payload
        },
        setAfterDate(state,action){
            state.afterDate=action.payload;
        },
        setBeforeSearch(state, action){
            state.beforeSearch = action.payload
        },
        setAfterSearch(state,action){
            state.afterSearch = action.payload
        },
        setSafeSearch(state,action){
            state.safeSearch = action.payload
        }
    }
})

export const{
    setSearchPosts,
    setSearchThisSub,
    setSearchSubreddits,
    setSearchTerm,
    setBeforeDate,
    setAfterDate,
    setBeforeSearch,
    setAfterSearch,
    setSafeSearch
} = searchSlice.actions;

export default searchSlice.reducer