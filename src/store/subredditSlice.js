import { createSlice } from '@reduxjs/toolkit';
//import { getSubreddits } from '../api/reddit';

const initialState = {
    subreddits:[],

}

const subredditSlice = createSlice({
    name: 'subreddits',
    initialState,
    reducers:{
        setSubreddits(state,action){
            state.subreddits= action.payload;
        }
    }
})

export const {
    setSubreddits
} = subredditSlice.actions;

export default subredditSlice.reducer;