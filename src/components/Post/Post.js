import React, { useState, useEffect } from 'react';
import './Post.css';
//
export const Post = (props) => {
    //console.log(props.post)
    let image;
    if ('preview' in props.post) {
        image = <img src={props.post.preview.images[0].source.url} />
    } else {
        image = <span></span>
    }
    const link=`reddit.com${props.post.permalink}`
    return (
        <div className="post">
            <div className="votes-title">
                <div className="upvotes-wrapper">
                    <div className="upvotes">

                        <i className="fas fa-arrow-up vote-up"></i>

                        {props.post.ups}

                        <i className="fas fa-arrow-down vote-down"></i>

                    </div>
                </div>
                <div className="title">
                <a href={link} target="_blank" >{props.post.title}  </a>
                </div>
            </div>

            <div className="thumbnail-wrapper">
                <div className='thumbnail'>
                    {image}
                </div>
            </div>
            <div className="post-details">

            </div>





        </div>
    )
}