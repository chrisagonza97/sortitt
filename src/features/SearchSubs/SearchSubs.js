import React, { useState, useEffect } from 'react';
import './SearchSubs.css';
import { useDispatch, useSelector } from 'react-redux';
import Reddit from '../../api/Reddit'
import { setSubreddits } from '../../store/redditSlice'
//import { Post } from '../../components/Post/Post'
import { Subreddit } from '../../components/Subreddit/Subreddit'


export const SearchSubs = () => {
    //first time Home gets rendered, there will be 0 Post components rendered but immediately
    //posts from popular will be fetched and rendered after
    const subreddits = useSelector((state) => state.reddit.subreddits)

    const selectedSub = useSelector((state) => state.reddit.selectedSub)
    const searchTerm = useSelector((state) => state.search.searchTerm)
    const dispatch = useDispatch();
    //const searchThisSub = useSelector((state) => state.search.searchThisSub)
    //getPosts('popular').then(result=>{console.log(result)})
    //Reddit.getSubredditPosts('popular').then(console.log)

    //console.log(posts)


    //useEffect is to fetch posts on first render
    useEffect(() => {

        Reddit.searchForSubreddits(searchTerm).then(result => {
            //console.log(result)
            //console.log('what1')
            //const res = result.toJSON()
            //console.log(result)
            //console.log('what2')
            //const res = JSON.stringify(result)
            dispatch(setSubreddits(result));

        })



    }, [searchTerm])
    //let testPost;

    let postComponents = subreddits.map((subreddit, index) => {
        return (
            <Subreddit key={index} subreddit={subreddit} />

        )

    })
    if (subreddits.length < 1) {
        postComponents = 'No Search Results Found'
    }
    /*if(posts.length>0){
        testPost=<Post post={posts[0]}/>
    }*/
    //console.log(postComponents)
    return (
        <main className="home">
            <ul>

                {postComponents}

            </ul>
        </main>
    )
}