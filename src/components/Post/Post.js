import React, { useState, useEffect } from 'react';
import './Post.css';
import Time from '../../util/Time';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
//
export const Post = (props) => {
  //console.log(props.post)
  let image;
  if ('preview' in props.post) {
    image = <img src={props.post.preview.images[0].source.url} />;
  } else {
    image = <span></span>;
  }
  const link = `https://www.reddit.com${props.post.permalink}`;
  //console.log(link)
  return (
    <div className='post-grid-container'>
      <div className='post-grid-one'></div>
      <div className='post-grid-two'>
        <div className='post'>
          <a href={link} target='_blank'>
            <div className='votes-title'>
              <div className='upvotes-wrapper'>
                <div className='upvotes'>
                  <FaArrowUp/>

                  <span className='ups-num'>
                    <strong>{props.post.ups}</strong>
                  </span>

                  <FaArrowDown/>
                </div>
              </div>
              <div className='title'>
                <strong>{props.post.title} </strong>
              </div>
            </div>

            <div className='thumbnail-wrapper'>
              <div className='thumbnail'>{image}</div>
            </div>
            <div className='post-details'>
              <span className="detail-subreddit">/r/{props.post.subreddit}  </span>
              <span>Posted by /u/{props.post.author} </span>
              <span>
                Posted on: {Time.utcToDate(props.post.created_utc)},{' '}
                {Time.utcToAgo(props.post.created_utc)}{' '}
              </span>
            </div>
          </a>
        </div>
      </div>

      <div className='post-grid-three'></div>
    </div>
  );
};
