import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../../store/redditSlice'
import './Header.css'

export const Header = () => {
    const [searchTermLocal, setSearchTermLocal] = useState('')
    const searchTerm = useSelector((state) => state.reddit.searchTerm)
    const dispatch = useDispatch();

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
    }

    return (
        <header className="header">
            <img src={require('./redditsnoo.jpg')} alt="snoo logo" />
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTermLocal}
                    onChange={handleChange}
                />
                <button type="submit" onClick={handleSubmit}>
                    Search
                </button>
            </form>
        </header>
    )
}
