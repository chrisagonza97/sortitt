import React, { useState, useEffect } from 'react';
import './Subreddit.css';
import Time from '../../util/Time'
import Reddit from '../../api/Reddit'
import { setRendering, setSelectedSub } from '../../store/redditSlice'
import { useDispatch} from 'react-redux';



//{props.subreddit}
//<img src={subredditObject.community_icon} alt="subreddit-icon"/>
//{subredditObject.public_description}

export const Subreddit = (props) => {
    const [subredditObject, setSubredditObject] = useState('');
    const dispatch = useDispatch()
    //const [icon, setIcon] = useState('')
    //const [description, setDescription] = useState('')
    useEffect(() => {
        if(props.subreddit!=='all'){
            Reddit.getSubreddit(props.subreddit).then(result => {
                //subRedditObj = result.toJSON();
                console.log(result)
                setSubredditObject({ ...result })
            })
        }
        
        
    }, [props.subreddit])

    const handleSubClick = () =>{
        dispatch(setSelectedSub(props.subreddit));
        dispatch(setRendering('allSubredditPosts'))
    }

    

    //console.log('23'+subredditObject.public_description)



    return (
        <div onClick={handleSubClick} className="subreddit-card">
            <span>
            {subredditObject.community_icon ? <img className='sub-icon' src={subredditObject.community_icon} ></img>: <img className='sub-icon' src='https://i.redd.it/qs4l8uy79r171.png' ></img>}
            </span>
            <div className = 'sub-text-wrapper'>
            <div className = 'subreddit-name'>
                <strong>{props.subreddit}</strong>
             
             </div>
            
            <div>
                <i> {subredditObject.public_description ? subredditObject.public_description: ''}</i>
            
            </div>
            
            </div>
             
        </div>
    )
}