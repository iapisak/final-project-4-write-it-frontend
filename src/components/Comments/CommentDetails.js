import React from 'react';
import axios from 'axios';

import './Comment.css'

const CommentDetails = (props) => {
    return (

            <fieldset className="comment-detail">
                <legend>
                    <div className="text-center">Comment <span>{ props.index + 1 }</span></div>
                </legend>
                <div className="comment-detail-content">{ props.detail.comment }</div>
                <div className="comment-user-detail float-right">By 
                    <span>
                        <a href={`/profile/${props.detail.user}`}>
                        { props.detail.userSlug }
                        </a>
                    </span>
                    | 
                    <span>
                        { new Date(props.detail.date).toLocaleTimeString() }
                    </span>
                </div>

                { props.currentUser === props.detail.user ?
                <button 
                    onClick={()=> {
                        const comment_Id = props.detail._id
                        axios.delete(`${process.env.REACT_APP_API_URL}/comment/delete/${comment_Id}`)
                        .then(res => window.location.reload())
                        .catch(err => console.log(err));
                    } }
                    className="btn-danger">
                    Delete</button>
                : null }
            </fieldset>
    )
}

export default CommentDetails