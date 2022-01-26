import React, { useState, useEffect } from 'react';
import './SearchPosts.css';
import { useDispatch, useSelector } from 'react-redux';
import Reddit from '../../api/Reddit';
import { setPosts } from '../../store/redditSlice';
import { Post } from '../../components/Post/Post';
import { Subreddit } from '../../components/Subreddit/Subreddit';

export const SearchPosts = () => {
  //first time Home gets rendered, there will be 0 Post components rendered but immediately
  //posts from popular will be fetched and rendered after
  const posts = useSelector((state) => state.reddit.posts);
  const selectedSub = useSelector((state) => state.reddit.selectedSub);
  const searchTerm = useSelector((state) => state.search.searchTerm);
  const searchThisSub = useSelector((state) => state.search.searchThisSub);
  const beforeSearch = useSelector((state) => state.search.beforeSearch);
  const afterSearch = useSelector((state) => state.search.afterSearch);
  const beforeDate = useSelector((state) => state.search.beforeDate);
  const afterDate = useSelector((state) => state.search.afterDate);
  const nsfwFilter = useSelector((state) => state.search.safeSearch);
  const dispatch = useDispatch();
  //getPosts('popular').then(result=>{console.log(result)})
  //Reddit.getSubredditPosts('popular').then(console.log)

  //console.log(posts)

  //useEffect is to fetch posts on first render
  useEffect(() => {
    if (searchThisSub === false) {
      //if neither before or after a date
      //console.log(beforeSearch + ' here ' + afterSearch);
      if (beforeSearch === false && afterSearch === false) {
        Reddit.searchAllReddit(searchTerm).then((result) => {
          //console.log(result)
          //console.log('what1')
          const res = result.toJSON();
          //console.log(res);
          //console.log('what2')
          //const res = JSON.stringify(result)
          dispatch(setPosts(res));
        });
      }
      //if only before a date
      else if (beforeSearch === true && afterSearch === false) {
        Reddit.searchAllRedditBefore(searchTerm, beforeDate).then((result) => {
          const res = result.toJSON();

          dispatch(setPosts(res));
        });
      }
      //if only after a date
      else if (afterSearch === true && beforeSearch === false) {
        Reddit.searchAllRedditAfter(searchTerm, afterDate).then((result) => {
          const res = result.toJSON();

          dispatch(setPosts(res));
        });
      }
      //if both before and after a date
      else if (afterSearch === true && beforeSearch === true) {
        Reddit.searchAllRedditBeforeAfter(
          searchTerm,
          beforeDate,
          afterDate,
        ).then((result) => {
          const res = result.toJSON();

          dispatch(setPosts(res));
        });
      }
    } else {
      //if neither before or after a date
      if (beforeSearch === false && afterSearch === false) {
        Reddit.searchThroughSubreddit(searchTerm, selectedSub).then(
          (result) => {
            //console.log(result)
            //console.log('what1')
            const res = result.toJSON();
            //console.log(res);
            //console.log('what2')
            //const res = JSON.stringify(result)
            dispatch(setPosts(res));
          },
        );
      }
      //if only before a date
      else if (beforeSearch === true && afterSearch === false) {
        Reddit.searchThroughSubredditBefore(
          searchTerm,
          selectedSub,
          beforeDate,
        ).then((result) => {
          const res = result.toJSON();
          dispatch(setPosts(res));
        });
      }
      //if only after a date
      else if (beforeSearch === false && afterSearch === true) {
        Reddit.searchThroughSubredditAfter(
          searchTerm,
          selectedSub,
          afterDate,
        ).then((result) => {
          const res = result.toJSON();
          dispatch(setPosts(res));
        });
      }
      //if both before and after a date
      else if (beforeSearch === true && afterSearch === true) {
        Reddit.searchThroughSubredditBeforeAfter(
          searchTerm,
          selectedSub,
          beforeDate,
          afterDate,
        ).then((result) => {
          const res = result.toJSON();
          dispatch(setPosts(res));
        });
      }
    }
  }, [
    searchTerm,
    selectedSub,
    searchThisSub,
    beforeDate,
    afterDate,
    beforeSearch,
    afterSearch,
  ]);
  //let testPost;

  let postComponents;
  if (nsfwFilter === false) {
    postComponents = posts.map((post, index) => {
      return <Post key={index} post={post} />;
    });
  } else {
    postComponents = posts
      .filter((post) => post.over_18 === false)
      .map((post, index) => {
        return <Post key={index} post={post} />;
      });
  }

  if (posts.length < 1) {
    postComponents = 'No Search Results Found';
  }
  /*if(posts.length>0){
        testPost=<Post post={posts[0]}/>
    }*/
  //console.log(postComponents)
  return (
    <main className='home'>
      {searchThisSub ? <Subreddit subreddit={selectedSub} /> : ''}
      <ul>{postComponents}</ul>
    </main>
  );
};
