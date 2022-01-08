import React, { useState, useEffect } from 'react';
import './Post.css';
import Time from '../../util/Time'
//
export const Post = (props) => {
    //console.log(props.post)
    let image;
    if ('preview' in props.post) {
        image = <img src={props.post.preview.images[0].source.url} />
    } else {
        image = <span></span>
    }
    const link = `https://www.reddit.com${props.post.permalink}`
    //console.log(link)
    return (
        <div className="post">
            <a href={link} target="_blank">
                <div className="votes-title">
                    <div className="upvotes-wrapper">
                        <div className="upvotes">

                            <i className="fas fa-arrow-up fa-2x vote-up"></i>
                            
                            <span className="ups-num"><strong>{props.post.ups}</strong></span>

                            <i className="fas fa-arrow-down fa-2x vote-down"></i>

                        </div>
                    </div>
                    <div className="title">
                        <strong>{props.post.title}  </strong>
                    </div>
                </div>

                <div className="thumbnail-wrapper">
                    <div className='thumbnail'>
                        {image}
                    </div>
                </div>
                <div className="post-details">
                    <span>/r/{props.post.subreddit} </span>
                    <span>Posted by /u/{props.post.author} </span>
                    <span>Posted on: {Time.utcToDate(props.post.created_utc)}, {Time.utcToAgo(props.post.created_utc)} </span>
                </div>
            </a>






        </div>
    )
}