import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { setSearchTerm } from '../../store/redditSlice';
import { HeaderModal } from './HeaderModal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {
  setSearchPosts,
  setSearchThisSub,
  setSearchSubreddits,
  setSearchTerm,
  setBeforeDate,
  setAfterDate,
  setBeforeSearch,
  setAfterSearch,
  setSafeSearch,
} from '../../store/searchSlice';
import { setRendering, setSelectedSub } from '../../store/redditSlice';
import { BsSearch } from 'react-icons/bs';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Header.css';

export const Header = () => {
  const [searchTermLocal, setSearchTermLocal] = useState('');

  const searchTerm = useSelector((state) => state.search.searchTerm);
  const subreddit = useSelector((state) => state.reddit.selectedSub);
  let searchPosts = useSelector((state) => state.search.searchPosts);
  let searchThisSub = useSelector((state) => state.search.searchThisSub);
  let searchSubreddits = useSelector((state) => state.search.searchSubreddits);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSearchTermLocal(e.target.value);
  };

  useEffect(() => {
    setSearchTermLocal(searchTerm);
  }, [searchTerm]);

  const handleSnooClick = () => {
    dispatch(setSelectedSub('all'));
    dispatch(setRendering('allSubredditPosts'));
  };

  const handleSubmit = (e) => {
    //first set state search term to the local search searchTerm
    //then set state's posts to search results
    e.preventDefault();
    if (searchTermLocal === '') {
      return;
    }
    dispatch(setSearchTerm(searchTermLocal));
    if (searchSubreddits) {
      dispatch(setRendering('searchSubreddits'));
    } else if (searchPosts && searchThisSub === false) {
      dispatch(setRendering('searchAllPosts'));
    } else if (searchPosts && searchThisSub) {
      dispatch(setRendering('searchInSubreddit'));
    }
  };

  return (
    <div className='header-container'>
      <div className='header'>
        <div className='snoo-img-container'>
          <img
            className='snoo-img'
            onClick={handleSnooClick}
            src={require('./redditsnoo.jpg')}
            alt='snoo logo'
          />
          <span className='snoo-tooltip'>Go Back To /r/all</span>
        </div>
        <form className='search-bar' onSubmit={handleSubmit}>
          <div className='input-container'>
            <div className='textin-contain'>
              <input
                type='text'
                placeholder='Search reddit'
                value={searchTermLocal}
                onChange={handleChange}
                className='form-control textin'
              />
            </div>

            <Button type='submit' onClick={handleSubmit}>
              <BsSearch />
            </Button>
          </div>
          <div>
            {/*<input
              className='form-check-input'
              type='checkbox'
              onChange={handleSafeCheck}
              checked={safeSearch}
              name='safe-search'
              id='safe-search-btn'
              value='Safe Search Filter'
            />
            <label className='form-check-label' htmlFor='safe-search-btn'>
              Explicit Content Filter
            </label>*/}
          </div>
        </form>
      </div>
      {/*<div className='search-params'>*/}
      {/*Instead of check boxes that take a bunch of space, put button to open modal*/}
      <div className='modal-container'>
        <HeaderModal />
      </div>

      {/*<div className='search-posts-container'>
        <div className='if-subreddit'>
          <div className='search-posts'>
            <input
              className='form-check-input'
              onChange={onRadioChange}
              checked={selectedRadio === 'searchPosts'}
              type='radio'
              name='posts-or-subs-buttons'
              id='inlineRadio1'
              value='searchPosts'
            />

            <label className='form-check-label' htmlFor='inlineRadio1'>
              Search reddit Posts
            </label>
          </div>
          <div className='subreddit-check'>
            <input
              className='form-check-input'
              onChange={onCheckClick}
              type='checkbox'
              checked={searchSub}
              value='searchSub'
              id='defaultCheck1'
            />
            <label className='form-check-label' htmlFor='defaultCheck1'>
              Search /r/{subreddit}
            </label>
          </div>
        </div>
        <div className='calendar-inputs'>
          <div className='calendar-before'>
            <div className='label-flex-container'>
              <label htmlFor='before-checkbox'>Before</label>
            </div>

            <div className='check-flex-container'>
              <input
                type='checkbox'
                onChange={handleBeforeCheck}
                checked={checkBefore}
                id='before-checkbox'
              />
            </div>
            <div className='label-flex-container'>
              <DatePicker
                className='date-picker'
                onChange={(date) => setBeforeD(date)}
                selected={beforeDate}
              />
            </div>
          </div>
          <div className='calendar-after'>
            <div className='label-flex-container'>
              <label htmlFor='after-checkbox'>After</label>
            </div>

            <div className='check-flex-container'>
              <input
                type='checkbox'
                onChange={handleAfterCheck}
                checked={checkAfter}
                id='after-checkbox'
              />
            </div>
            <div className='label-flex-container'>
              <DatePicker
                className='date-picker'
                onChange={(date) => setAfterD(date)}
                selected={afterDate}
              />
            </div>
          </div>
        </div>
        <div className='search-subs-butn'>
          <div>
            <input
              className='form-check-input'
              type='radio'
              onChange={onRadioChange}
              checked={selectedRadio === 'searchSubs'}
              name='posts-or-subs-buttons'
              id='inlineRadio2'
              value='searchSubs'
            />
            <label className='form-check-label' htmlFor='inlineRadio2'>
              Search Subreddits
            </label>
          </div>
        </div>
      </div>*/}
      {/*</div>*/}
    </div>
  );
};
