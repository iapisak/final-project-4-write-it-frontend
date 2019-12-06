import React from 'react';
import axios from 'axios';

const CommentDetails = (props) => {
    return (
        <>
        <div>{ props.detail.comment }</div>
        <div>Comment by : { props.detail.userSlug }</div>
        { props.currentUser === props.detail.user ?
        <button 
            onClick={()=> {
                const comment_Id = props.detail._id
                axios.delete(`${process.env.REACT_APP_API_URL}/comment/delete/${comment_Id}`)
                .then(res => window.location.reload())
                .catch(err => console.log(err));
            } }
            className="btn btn-primary">
            Delete</button>
        : null }
        </>
    )
}

export default CommentDetails