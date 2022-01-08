import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { setSearchTerm } from '../../store/redditSlice';
import { setSearchPosts, setSearchThisSub, setSearchSubreddits, setSearchTerm } from '../../store/searchSlice'
import {  setRendering } from '../../store/redditSlice'
import { BsSearch } from "react-icons/bs";
import './Header.css'

export const Header = () => {
    const [searchTermLocal, setSearchTermLocal] = useState('')
    const searchTerm = useSelector((state) => state.search.searchTerm)
    const subreddit = useSelector((state)=> state.reddit.selectedSub)
    const dispatch = useDispatch();

    const [selectedRadio, setSelectedRadio]=useState('searchPosts')
    const [searchSub,setSearchSub]=useState(true)

    const handleChange = (e) => {
        setSearchTermLocal(e.target.value)
    }

    useEffect(() => {
        setSearchTermLocal(searchTerm);
    }, [searchTerm]);

    const handleSubmit = (e) => {
        //first set state search term to the local search searchTerm
        //then set state's posts to search results
        e.preventDefault();
        dispatch(setSearchTerm(searchTermLocal))
        let searchPosts;
        let searchThisSub;
        let searchSubreddits;

        if (selectedRadio==='searchPosts'){
            searchPosts=true;
            searchSubreddits=false;
            if(searchSub){
                searchThisSub = true;
                dispatch(setRendering('searchInSubreddit'))
            }
            else{
                searchThisSub = false;
                dispatch(setRendering('searchAllPosts'))
            }
        }
        else{
            searchPosts=false;
            searchThisSub=false;
            searchSubreddits=true;
            dispatch(setRendering('searchSubreddits'))
        }
        dispatch(setSearchPosts(searchPosts))
        dispatch(setSearchThisSub(searchThisSub))
        dispatch(setSearchSubreddits(searchSubreddits))
    }
    const onRadioChange = (e) => {
        setSelectedRadio(e.target.value);
        if(e.target.value=='searchSubs'){
            setSearchSub(false)
        }
    }
    const onCheckClick = (e) => {
        if(selectedRadio=='searchSubs'){
            setSelectedRadio('searchPosts')
        }
        setSearchSub(!searchSub)
    }

    return (
        <div className="header">
            <img src={require('./redditsnoo.jpg')} alt="snoo logo" />
            <form className="searchBar" onSubmit={handleSubmit} >
                <div className="input-container">
                    <input

                        type="text"
                        placeholder="Search reddit"
                        value={searchTermLocal}
                        onChange={handleChange}
                    />
                    <button type="submit" onClick={handleSubmit}>
                        
                        <BsSearch/>
                    </button>
                    </div>
                <div className = "search-posts-container">
                    <div className = "search-posts">
                        <input className="form-check-input" onChange={onRadioChange} checked={selectedRadio=='searchPosts'} type="radio" name="posts-or-subs-buttons" id="inlineRadio1" value="searchPosts" />
                        <label className="form-check-label" htmlFor="inlineRadio1">Search reddit Posts</label>
                    </div>
                    <div className='subreddit-check'>
                        <input className="form-check-input" onChange={onCheckClick} type="checkbox" checked={searchSub} value='searchSub' id="defaultCheck1" />
                        <label className="form-check-label" htmlFor="defaultCheck1">
                            Search /r/{subreddit}
                        </label>
                    </div>
                </div>

                <input className="form-check-input" type="radio" onChange={onRadioChange} checked={selectedRadio=='searchSubs'} name="posts-or-subs-buttons" id="inlineRadio2" value="searchSubs" />
                <label className="form-check-label" htmlFor="inlineRadio2">Search Subreddits</label>
                
            </form>
        </div>
    )
}
