import React, { useState, useEffect } from 'react';
import './Home.css';
import { useDispatch, useSelector } from 'react-redux';
import Reddit from '../../api/Reddit';
import { setPosts } from '../../store/redditSlice';
import { Post } from '../../components/Post/Post';
import { Subreddit } from '../../components/Subreddit/Subreddit';

export const Home = () => {
  //first time Home gets rendered, there will be 0 Post components rendered but immediately
  //posts from popular will be fetched and rendered after
  const posts = useSelector((state) => state.reddit.posts);
  const selectedSub = useSelector((state) => state.reddit.selectedSub);
  const nsfwFilter = useSelector((state)=> state.search.safeSearch)
  const dispatch = useDispatch();
  //getPosts('popular').then(result=>{console.log(result)})
  //Reddit.getSubredditPosts('popular').then(console.log)

  //console.log(posts)

  //useEffect is to fetch posts on first render
  useEffect(() => {
    Reddit.getSubredditPosts(selectedSub).then((result) => {
      //console.log(result)
      //console.log('what1')
      const res = result.toJSON();
      //console.log(res)
      //console.log('what2')
      //const res = JSON.stringify(result)
      dispatch(setPosts(res));
    });
  }, [selectedSub,nsfwFilter]);
  //let testPost;
  //.filter((post)=> post.over_18===false)
  let postComponents;
  if(nsfwFilter===false){
    postComponents = posts.map((post, index) => {
      return <Post key={index} post={post} />;
    });
  }
  else{
    postComponents = posts.filter((post)=> post.over_18===false).map((post, index) => {
      return <Post key={index} post={post} />;
    });
  }
  if(postComponents.length<1){
    postComponents = "No Results Found"
  }
  /*if(posts.length>0){
        testPost=<Post post={posts[0]}/>
    }*/
  //console.log(postComponents)
  return (
    <main className='home'>
      <Subreddit subreddit={selectedSub} />
      <ul>{postComponents}</ul>
    </main>
  );
};
