import React from 'react';
import { withRouter, Link } from 'react-router-dom';

const postDetail = (props) => {
    
    return (
        <div>
            <Link to={`/post/${props.detail._id}`}>
                <h3>{props.detail.title}</h3>
            </Link>
            <p>{props.detail.content}</p>
            <p>Post By : {props.detail.userSlug}</p>
        </div>
    )
}

export default withRouter(postDetail)