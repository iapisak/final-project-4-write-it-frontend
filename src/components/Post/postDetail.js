import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import './posts.css'

const postDetail = (props) => {
    return (
        <div className="posts-detail d-flex">
            <img src={ props.detail.photo } alt={ props.detail.photo} / >

            

            <div className="posts-content-box">
                <a href={`/post/${props.detail._id}`}>
                    <h5>{props.detail.title}</h5>
                </a>
                
                <p>By : 
                    <Link to={`/profile/${props.detail.user}`}>
                    {props.detail.userSlug}
                    </Link>
                </p>
                <p className="posts-content">{props.detail.content}</p>
            </div>
            
        </div>
    )
}

export default withRouter(postDetail)