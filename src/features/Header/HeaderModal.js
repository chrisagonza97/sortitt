import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
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
  setSafeSearch,
} from '../../store/searchSlice';
import { setRendering, setSelectedSub } from '../../store/redditSlice';
import { BsSearch } from 'react-icons/bs';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Header.css';


export const HeaderModal = () => {
  const [show, setShow] = useState(false);
  const [checkBefore, setCheckBefore] = useState(
    useSelector((state) => state.search.beforeSearch),
  );
  const [checkAfter, setCheckAfter] = useState(
    useSelector((state) => state.search.afterSearch),
  );
  const [beforeDate, setBeforeD] = useState(
    useSelector((state) => state.search.beforeDate),
  );
  const [afterDate, setAfterD] = useState(
    useSelector((state) => state.search.afterDate),
  );
  let selectedR;
  if (useSelector((state) => state.search.searchPosts) === true) {
    //either searchSubs or searchPosts
    selectedR = 'searchPosts';
  } else {
    selectedR = 'searchSubs';
  }
  const [selectedRadio, setSelectedRadio] = useState(selectedR);
  const [searchSub, setSearchSub] = useState(
    useSelector((state) => state.search.searchThisSub),
  );
  const [safeSearch, setSafeS] = useState(
    useSelector((state) => state.search.safeSearch),
  );
  const dispatch = useDispatch();

  const subreddit = useSelector((state) => state.reddit.selectedSub);

  const handleClose = () => {
    setShow(false);
    let searchPosts;
    let searchThisSub;
    let searchSubreddits;

    if (selectedRadio === 'searchPosts') {
      searchPosts = true;
      searchSubreddits = false;
      if (searchSub) {
        searchThisSub = true;
        //dispatch(setRendering('searchInSubreddit'));
      } else {
        searchThisSub = false;
        //dispatch(setRendering('searchAllPosts'));
      }
    } else {
      searchPosts = false;
      searchThisSub = false;
      searchSubreddits = true;
      //dispatch(setRendering('searchSubreddits'));
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
    //console.log(parseInt((beforeDate.getTime() / 1000).toFixed(0)));
    dispatch(setBeforeDate(parseInt((beforeDate.getTime() / 1000).toFixed(0))));

    dispatch(setAfterDate(parseInt((afterDate.getTime() / 1000).toFixed(0))));
    //console.log(parseInt((afterDate.getTime() / 1000).toFixed(0)));
    dispatch(setBeforeSearch(checkBefore));

    dispatch(setAfterSearch(checkAfter));
    dispatch(setSafeSearch(safeSearch));
    dispatch(setSearchPosts(searchPosts));
    dispatch(setSearchThisSub(searchThisSub));
    dispatch(setSearchSubreddits(searchSubreddits));
  };
  const handleShow = () => setShow(true);
  const onRadioChange = (e) => {
    setSelectedRadio(e.target.value);
    if (e.target.value === 'searchSubs') {
      setSearchSub(false);
    }
  };
  const onCheckClick = (e) => {
    if (selectedRadio === 'searchSubs') {
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
  const handleSafeCheck = (e) => {
    setSafeS(!safeSearch);
  };
  return (
    <>
      <Button variant='primary' className='modal-btn' onClick={handleShow}>
        Set Search Filters
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title>Search Filters</Modal.Title>
        </Modal.Header>
        <Modal.Body className='center'>
          <div className='search-posts-container'>
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
            {/*<div className='search-subs-butn'>*/}
            <div></div>
            <div>
              <input
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
              </label>
            </div>
            {/*</div>*/}
          </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>Close</Button>
          <Button variant='primary' onClick={handleClose}>
            Save Filters
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
