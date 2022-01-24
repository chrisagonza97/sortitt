import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { setSearchTerm } from '../../store/redditSlice';
import {
  setSearchPosts,
  setSearchThisSub,
  setSearchSubreddits,
  setSearchTerm,
  setBeforeDate,
  setAfterDate,
  setBeforeSearch,
  setAfterSearch,
} from '../../store/searchSlice';
import { setRendering, setSelectedSub } from '../../store/redditSlice';
import { BsSearch } from 'react-icons/bs';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Header.css';

export const Header = () => {
  const [searchTermLocal, setSearchTermLocal] = useState('');
  const [beforeDate, setBeforeD] = useState(new Date());
  const [afterDate, setAfterD] = useState(new Date());
  const [checkBefore, setCheckBefore] = useState(false);
  const [checkAfter, setCheckAfter] = useState(false);
  const searchTerm = useSelector((state) => state.search.searchTerm);
  const subreddit = useSelector((state) => state.reddit.selectedSub);
  const dispatch = useDispatch();

  const [selectedRadio, setSelectedRadio] = useState('searchPosts');
  const [searchSub, setSearchSub] = useState(true);

  const handleChange = (e) => {
    setSearchTermLocal(e.target.value);
  };
  const ExampleVar = 5;

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
    let searchPosts;
    let searchThisSub;
    let searchSubreddits;

    if (selectedRadio === 'searchPosts') {
      searchPosts = true;
      searchSubreddits = false;
      if (searchSub) {
        searchThisSub = true;
        dispatch(setRendering('searchInSubreddit'));
      } else {
        searchThisSub = false;
        dispatch(setRendering('searchAllPosts'));
      }
    } else {
      searchPosts = false;
      searchThisSub = false;
      searchSubreddits = true;
      dispatch(setRendering('searchSubreddits'));
    }
    //console.log(beforeDate)
    //set before date to beginning of day utc
    beforeDate.setUTCHours(0, 0, 0, 0);
    let newBefore = beforeDate;
    setBeforeD(newBefore);
    //set after date to end of day utc
    afterDate.setUTCHours(23, 59, 59, 0);
    let newAfter = afterDate;
    setAfterD(newAfter);
    console.log(parseInt((beforeDate.getTime() / 1000).toFixed(0)));
    dispatch(setBeforeDate(parseInt((beforeDate.getTime() / 1000).toFixed(0))));

    dispatch(setAfterDate(parseInt((afterDate.getTime() / 1000).toFixed(0))));
    console.log(parseInt((afterDate.getTime() / 1000).toFixed(0)));
    dispatch(setBeforeSearch(checkBefore));

    dispatch(setAfterSearch(checkAfter));
    dispatch(setSearchPosts(searchPosts));
    dispatch(setSearchThisSub(searchThisSub));
    dispatch(setSearchSubreddits(searchSubreddits));
  };

  const onRadioChange = (e) => {
    setSelectedRadio(e.target.value);
    if (e.target.value == 'searchSubs') {
      setSearchSub(false);
    }
  };
  const onCheckClick = (e) => {
    if (selectedRadio == 'searchSubs') {
      setSelectedRadio('searchPosts');
    }
    setSearchSub(!searchSub);
  };
  const handleBeforeCheck = (e) => {
    setCheckBefore(!checkBefore);
  };
  const handleAfterCheck = (e) => {
    setCheckAfter(!checkAfter);
  };
  return (
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
      <form className='searchBar' onSubmit={handleSubmit}>
        <div className='input-container'>
          <input
            type='text'
            placeholder='Search reddit'
            value={searchTermLocal}
            onChange={handleChange}
          />
          <button type='submit' onClick={handleSubmit}>
            <BsSearch />
          </button>
        </div>
        {/*<div className='search-params'>*/}
        <div className='search-posts-container'>
          <div className='if-subreddit'>
            <div className='search-posts'>
              <input
                className='form-check-input'
                onChange={onRadioChange}
                checked={selectedRadio == 'searchPosts'}
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
              <label htmlFor='before-checkbox'>Before</label>
              <input
                type='checkbox'
                onChange={handleBeforeCheck}
                checked={checkBefore}
                id='before-checkbox'
              />
              <DatePicker
                onChange={(date) => setBeforeD(date)}
                selected={beforeDate}
              />
            </div>
            <div className='calendar-after'>
              <label htmlFor='after-checkbox'>After</label>
              <input
                type='checkbox'
                onChange={handleAfterCheck}
                checked={checkAfter}
                id='after-checkbox'
              />
              <DatePicker
                onChange={(date) => setAfterD(date)}
                selected={afterDate}
              />
            </div>
          </div>
          <div className='search-subs-butn'>
            <input
              className='form-check-input'
              type='radio'
              onChange={onRadioChange}
              checked={selectedRadio == 'searchSubs'}
              name='posts-or-subs-buttons'
              id='inlineRadio2'
              value='searchSubs'
            />
            <label className='form-check-label' htmlFor='inlineRadio2'>
              Search Subreddits
            </label>
          </div>
        </div>
        {/*</div>*/}
      </form>
    </div>
  );
};
